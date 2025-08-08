
import { getBlog, getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_component/BlogContainer";
import Header from "@/ui_component/Header";
import { useQuery ,QueryClientProvider } from '@tanstack/react-query'

const HomePage = () => {
 
const {data} = useQuery({
  queryKey : ['blogs'],
  queryFn: getBlogs(1)
})
console.log(data)
  return (
    <>
      <Header />
      <BlogContainer  />
    </>
  );
};

export default HomePage;