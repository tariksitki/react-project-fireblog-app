
import "./BlogCard.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {EditBlog} from "../../helpers/fireDatabase";
import ToastifyError from "../../helpers/toastify/ToastError";

const BlogCard = ({ blog }) => {
  const { blogDate, title, id, content, url, userName, userEmail, likes } = blog;
  const {currentUser} = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleLikes = useSelector(state => state.likes_func );
  
  // const handleLikes = (currentUser, blog, EditBlog) => {
  //   if (!currentUser) {
  //     ToastifyError("Please Login to Like");

  //   } else {
  //     if (likes) {
  //         if (blog.likes.includes(currentUser?.email)) {
  //             EditBlog({
  //               ...blog,
  //               likes : likes?.filter(item => (item !== currentUser?.email))
  //             })
  //         } else {
  //           blog.likes?.push(currentUser?.email);
  //           EditBlog({
  //             ...blog,
  //             likes : blog?.likes
  //           });
  //         }

  //     } else {
  //       EditBlog({
  //         ...blog,
  //         likes : [currentUser?.email]
  //       })
  //     }
  //   }
  // };

  const handleCard = () => {
    navigate(`/details/${id}`)
};

  return (
    <main className="card-main">
      <section className="image-container">
        <img
          className="card-image"
          src={url}
          alt="blog-image"
          onClick={handleCard}
        />
      </section>

      <section className="info-section">
        <div className="date-div">
          <p>{blogDate}</p>
          <span className="user-icon"> {userName && userName[0].toUpperCase()} </span>
        </div>

        <div className="title-div">
          <h3 onClick={handleCard}>{title?.slice(0, 35)} </h3>
        </div>

        <div className="content-div">
          <p onClick={handleCard}>{content?.slice(0, 130)}... </p>
        </div>

        <div className="info-section-down">
          <div className="user-info-div">
            <div>
              <span>From</span>
              <span className="span-email"> {userEmail} </span>
            </div>
            {/* <span className="user-icon">R</span> */}
          </div>

          <div className="icons-div">
            <div className="icons-div-inner">
              <div className="likes-icon-div" >
                {blog.likes?.includes(currentUser?.email) ? (
                  // <FavoriteIcon className="info-icon" onClick = {handleLikes} style = {{color : "red"}} />
                  <FavoriteIcon className="info-icon" onClick = {() => handleLikes(currentUser, blog, EditBlog)} style = {{color : "#ff7e4a"}} />
                  ) : (
                    // <FavoriteBorderIcon className="info-icon" onClick = {handleLikes}  />
                    <FavoriteBorderIcon className="info-icon" onClick = {() => handleLikes(currentUser, blog, EditBlog)}  />
                ) }
                <span> {blog.likes ? blog.likes.length : 0 } </span>
              </div>

              <div>
                    <ChatBubbleOutlineIcon className="info-icon" onClick = {handleCard} />
                {/* <ChatBubbleIcon /> */}
              </div>

              <div>
                <VisibilityOutlinedIcon className="info-icon" />
              </div>

              <div>
                <BookmarkBorderOutlinedIcon className="info-icon" />
              </div>
            </div>

            <div className="icons-div-right">
              <span onClick={handleCard}>VIEW MORE</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogCard;
