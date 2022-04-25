import { useSelector } from "react-redux";
import BlogCard from "../../components/blogCard/BlogCard";
import "./Dashboard.scss";

const Dashboard = () => {
  const [state] = useSelector((state) => state.blog);

  return (
    // <div style={{display : "flex", flexWrap : "wrap"}} >
    // {state?.map(blog => {
    //   return (
    //     <BlogCard blog = { blog } key = {blog.id} />
    //   )
    // })}
    // </div>

    <main className="dashboard-main">
      <div className="container">
        <section className="main-up">
          <div className="logo-div">
            <h1 className="logo">BLOGGER</h1>
          </div>

          <div className="categories-div">
            <p>Politics</p>
            <p>Society</p>
            <p>Economy</p>
            <p>Culture</p>
            <p>Science</p>
            <p>Health</p>
            <p>Sport</p>
            <p>Magazine</p>
            <p>World</p>
          </div>
        </section>

        <section className="main-down">
          {state?.map((blog) => {
            return <BlogCard blog={blog} key={blog.id} />;
          })}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
