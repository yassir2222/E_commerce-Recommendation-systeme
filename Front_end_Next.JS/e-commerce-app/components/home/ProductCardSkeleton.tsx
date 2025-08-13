const ProductCardSkeleton = () => {
return (
<div className="w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6 animated">

{/* Image Skeleton */}
<div className="w-[200px] h-[200px] bg-gray-300 rounded-md"></div>


<div className="w-36 h-4 bg-gray-300 rounded-md"></div>


<div className="w-20 h-5  bg-gray-300 rounded-md"></div>
</div>






);

};

export default ProductCardSkeleton;