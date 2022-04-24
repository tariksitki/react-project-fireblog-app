import { useSelector } from "react-redux";
import BlogCard from "../../components/blogCard/BlogCard";

const Dashboard = () => {
  const [ state ] = useSelector((state) => state.blog);

  return (
    <div style={{display : "flex"}} >
      {state?.map(blog => {
        return (
          <BlogCard state = {state} />
        )
      })}
    </div>
  )
}

export default Dashboard;