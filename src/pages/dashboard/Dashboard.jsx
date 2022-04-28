import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/blogCard/BlogCard";
import "./Dashboard.scss";
import loadingGif from "../../assets/loading.gif";

const Dashboard = () => {
  const [state] = useSelector((state) => state.blog);
  const {loading} = useSelector((state) => state.app);
  const {currentUser} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // console.log(currentUser)

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
          {loading && <img className="loadingGif" src={loadingGif} alt="loadingGif" style={{width : "10rem"}} />  }

          {state?.map((blog) => {
            return <BlogCard blog={blog} key={blog.id} />;
          })}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
