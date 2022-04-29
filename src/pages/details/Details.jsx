import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Details.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteUser} from "../../helpers/fireDatabase";
import { EditBlog } from "../../helpers/fireDatabase";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state] = useSelector((state) => state.blog);
  const { currentUser } = useSelector((state) => state.auth);

  const blog = state?.filter((item) => {
    return item.id === id;
  });
  console.log(blog);

  const emailFromBlog = blog && blog[0].userEmail;
  const emailFromCurrentUser = currentUser?.email;

  const toCapitalize = (str) => {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] =
        arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase() + " ";
    }
    return arr;
  };

  const handleBlogDelete = () => {
    if (window.confirm("Are You Sure to Delete This Blog?")) {
      const blogId = blog && blog[0].id;
      deleteUser(blogId, navigate);
    }
  };

  const handleBlogEdit = () => {
    const blogId = blog && blog[0].id;
    navigate(`/updateBlog/${blogId}`);
  };

  const handleLikes = useSelector(state => state.likes_func);

  return (
    <main className="details-main">
      <div className="details-back-container">
        <ArrowBackOutlinedIcon
          className="details-back-icon"
          onClick={() => navigate("/")}
        />
        <span onClick={() => navigate("/")}>Back</span>
      </div>

      <div className="details-container">
        <section className="details-main-up">
          <div className="details-logo-div">
            <h1 className="details-logo" onClick={() => navigate("/")}>
              BLOGGER
            </h1>
          </div>

          <div className="details-categories-div">
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

        <section className="details-main-down">
          <div className="image-div">
            <img className="details-image" src={blog && blog[0].url} alt="" />
          </div>

          <div className="details-info-container">
            <div className="details-info-up">
              <div className="details-info-up-left">
                <span>{blog && blog[0].userName[0].toUpperCase()} </span>
                <p>{blog && toCapitalize(blog[0].userName)}</p>
              </div>

              <div className="details-info-up-right">
                <p>{blog && blog[0].blogDate} </p>
              </div>
            </div>

            <div className="details-info-title-div">
              <h2 className="details-info-title">
                <p>{blog && toCapitalize(blog[0].title)}</p>{" "}
              </h2>
            </div>

            <div className="details-info-content-div">
              <p className="details-info-content">{blog && blog[0].content}</p>
            </div>

            <div className="author-info-div">
              <span>Author : {blog && toCapitalize(blog[0].userName)} </span>
              <span>E-Mail : {blog && blog[0].userEmail} </span>
              <span>Country : {blog &&  blog[0].userCountry } </span>
              {(blog && blog[0].updateDate) && (
                <span> 
                  Last Edit : {blog && blog[0].updateDate} from {blog && blog[0].userName }
                </span>
              )  }

            </div>

            <div className="details-bottom-icons">
              <div className="details-bottom-icons-left">
              <div className="likes-icon-div" >
                {(blog &&  blog[0].likes?.includes(currentUser?.email)) ? (
                  <FavoriteIcon className="details-like-icon" onClick = {() => handleLikes(currentUser, blog[0], EditBlog)} style = {{color : "#ff7e4a"}} />
                  ) : (
                    <FavoriteBorderIcon className="details-like-icon" onClick = {() => handleLikes(currentUser, blog[0] , EditBlog)}  />
                ) }
                <span> {(blog && blog[0].likes) ? blog[0].likes.length : 0 } </span>
              </div>


                <ChatBubbleOutlineIcon className="details-info-icon" />
                {/* <ChatBubbleIcon /> */}
                <VisibilityOutlinedIcon className="details-info-icon" />
                <BookmarkBorderOutlinedIcon className="details-info-icon" />
              </div>

              {emailFromBlog === emailFromCurrentUser && (
                <div className="details-bottom-buttons">
                  <button className="details-edit-button" onClick={handleBlogEdit} >
                    {" "}
                    Edit Your Blog{" "}
                    <EditIcon
                      style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}
                    />
                  </button>
                  <button className="details-delete-button" onClick = {handleBlogDelete}>
                    Delete Your Blog{" "}
                    <DeleteIcon
                      style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}
        
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Details;
