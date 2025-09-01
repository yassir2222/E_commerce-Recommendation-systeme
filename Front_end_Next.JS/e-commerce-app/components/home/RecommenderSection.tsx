import React from "react";
import ProductSection from "@/components/home/ProductSection";
import { Product } from "@/lib/type";

type Props = {
  userId?: string | null;
};

const RECOMMENDER_URL = "http://127.0.0.1:8001/api/recommend/";
const BACKEND_URL = "http://127.0.0.1:8008";

// Token fourni — vérifiez qu'il n'est pas expiré et qu'il est accepté par le service
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2MzYwMTA0LCJpYXQiOjE3NTYxMjAxMDQsImp0aSI6Ijc4OTdmMmIyYjEyODQ1MGM4YWQ4NzhkOTczZGFjMDkxIiwidXNlcl9pZCI6IjIifQ.FKMJbK9nt74juuDdaYo1mfmv90MfmIsASWY8_MTDw7s";
// ...existing code...
export async function getRecommendedProducts(
  userId?: string | null,
  model = "cf",
  k = 5
): Promise<Product[]> {
  if (!userId) return [];

  const url = new URL(RECOMMENDER_URL);
  url.searchParams.set("user_id", "123");
  url.searchParams.set("model", model);
  url.searchParams.set("k", String(k));

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  };

  try {
    const res = await fetch(url.toString(), { headers, cache: "no-store" });
    if (!res.ok) {
      console.error("Recommender service error", res.status);
      return [];
    }

    const payload = await res.json();
    const recs = payload.recommendations ?? [];

    const products: Product[] = [];

    for (const rec of recs) {
      const id = rec.id;
      if (!id) continue;

      // Encode the title WITHOUT adding extra quotes
      const query = encodeURIComponent(rec.title ?? "");
      const searchUrl = `${BACKEND_URL}/search?query=${query}`;
      console.log("Fetching product from backend:", searchUrl);

      try {
        const pRes = await fetch(searchUrl, { headers, cache: "no-store" });
        if (pRes.ok) {
          const pData = await pRes.json();
          console.log("Hydrated product (raw):", pData);

          // backend /search returns an array — use first item if exists
          if (Array.isArray(pData) && pData.length > 0) {
            products.push(pData[0] as Product);
            continue;
          }

          // If backend returns single object
          if (pData && typeof pData === "object" && Object.keys(pData).length > 0) {
            products.push(pData as Product);
            continue;
          }

          console.warn(`No product found for recommendation title="${rec.title}"`);
        } else {
          console.warn(`Backend product fetch failed (${pRes.status}) for title="${rec.title}"`);
        }
      } catch (err) {
        console.warn("Error fetching product from backend:", err);
      }

      // fallback minimal shape if hydration fails
      products.push({
        id: rec.id,
        name: rec.title ?? rec.name ?? "",
        slug: rec.slug ?? "",
        image: rec.image ?? "",
        price: rec.price ?? 0,
      } as unknown as Product);
    }

    return products;
  } catch (err) {
    console.error("getRecommendedProducts error:", err);
    return [];
  }
}
export default async function RecommenderSection({ userId }: Props) {
  if (!userId) return null;

  const recommended = await getRecommendedProducts(userId);

  if (!recommended || recommended.length === 0) return null;

  return (
    <section className="main-max-width padding-x mx-auto my-12">
      <h2 className="text-2xl font-semibold mb-6">Recommended for you</h2>
      {/* Pass detailPage=true so ProductSection uses the provided similar_products */}
      <ProductSection title="Recommended" similar_products={recommended} detailPage={true} />
    </section>
  );
}