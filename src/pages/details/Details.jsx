import { useEffect, useState } from "react";
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
import { deleteUser } from "../../helpers/fireDatabase";
import { EditBlog } from "../../helpers/fireDatabase";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import ToastifyError from "../../helpers/toastify/ToastError";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Details = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  const [state] = useSelector((state) => state.blog);
  const { currentUser } = useSelector((state) => state.auth);

  const blog = state?.filter((item) => {
    return item.id === id;
  });

  const emailFromBlog = blog && blog[0].userEmail;
  const emailFromCurrentUser = currentUser?.email;


  // const [updateInfo, setUpdateInfo] = useState(blog ? blog : blog);

  // useEffect(() => {
  //   setUpdateInfo(blog)
  // }, []);

  // console.log(updateInfo);

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

  const handleLikes = useSelector((state) => state.likes_func);

  const handleComment = () => {
    const date = new Date().toLocaleDateString();
    if (!currentUser) {
        ToastifyError("Please Log in to Rating and to Write a Comment!");
        setComment("");
        setRating(0);
    } else if (!(comment && rating)) {
      ToastifyError("Please Enter a Comment and a Rating !!!");
      setComment("");
      setRating(0);
    } else if (comment && rating) {
        // eger database deki veride kullanicinin hic userComment i yoksa
      if (!blog[0].userComments) {
        const updateInfo = {
          ...blog[0],
          userComments: [
            { email: emailFromCurrentUser, comment, rating, date },
          ],
        };
        EditBlog(updateInfo);
        setComment("");
        setRating(0);
      } else {
        const updateInfo = {
          ...blog[0],
          userComments: [
            ...blog[0].userComments,
            { email: emailFromCurrentUser, comment, rating, date },
          ],
        };
        EditBlog(updateInfo);
        setComment("");
        setRating(0);
      }
    }
  };

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
              <span>Country : {blog && blog[0].userCountry} </span>
              {blog && blog[0].updateDate && (
                <span>
                  Last Edit : {blog && blog[0].updateDate} from{" "}
                  {blog && blog[0].userName}
                </span>
              )}
            </div>

            <div className="details-bottom-icons">
              <div className="details-bottom-icons-left">
                <div className="likes-icon-div">
                  {blog && blog[0].likes?.includes(currentUser?.email) ? (
                    <FavoriteIcon
                      className="details-like-icon"
                      onClick={() =>
                        handleLikes(currentUser, blog[0], EditBlog)
                      }
                      style={{ color: "#ff7e4a" }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="details-like-icon"
                      onClick={() =>
                        handleLikes(currentUser, blog[0], EditBlog)
                      }
                    />
                  )}
                  <span>
                    {" "}
                    {blog && blog[0].likes ? blog[0].likes.length : 0}{" "}
                  </span>
                </div>

                <ChatBubbleOutlineIcon className="details-info-icon" />
                {/* <ChatBubbleIcon /> */}
                <VisibilityOutlinedIcon className="details-info-icon" />
                <BookmarkBorderOutlinedIcon className="details-info-icon" />
              </div>

              {emailFromBlog === emailFromCurrentUser && (
                <div className="details-bottom-buttons">
                  <button
                    className="details-edit-button"
                    onClick={handleBlogEdit}
                  >
                    {" "}
                    Edit Your Blog{" "}
                    <EditIcon
                      style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}
                    />
                  </button>
                  <button
                    className="details-delete-button"
                    onClick={handleBlogDelete}
                  >
                    Delete Your Blog{" "}
                    <DeleteIcon
                      style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}
                    />
                  </button>
                </div>
              )}
            </div>

            <div className="details-comment-rating-container">
              <div>
                <h3>ENTER A COMMENT AND RATING</h3>
              </div>

              <div className="comment-rating-div">
                <TextField
                  className="details-comment-input"
                  id="outlined-textarea"
                  label="Enter a Comment*"
                  placeholder="Enter a Comment*"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="rating-div">
                  {rating > 0 ? (
                    <StarIcon onClick={() => setRating(1)} />
                  ) : (
                    <StarBorderIcon onClick={() => setRating(1)} />
                  )}

                  {rating > 1 ? (
                    <StarIcon onClick={() => setRating(2)} />
                  ) : (
                    <StarBorderIcon onClick={() => setRating(2)} />
                  )}

                  {rating > 2 ? (
                    <StarIcon onClick={() => setRating(3)} />
                  ) : (
                    <StarBorderIcon onClick={() => setRating(3)} />
                  )}
                  {rating > 3 ? (
                    <StarIcon onClick={() => setRating(4)} />
                  ) : (
                    <StarBorderIcon onClick={() => setRating(4)} />
                  )}
                  {rating > 4 ? (
                    <StarIcon onClick={() => setRating(5)} />
                  ) : (
                    <StarBorderIcon onClick={() => setRating(5)} />
                  )}
                </div>
              </div>

              <div className="details-comment-button-div">
                <button
                  className="details-comment-button"
                  onClick={handleComment}
                >
                  Send Your Comment
                  <ChatBubbleOutlineRoundedIcon
                    style={{ marginLeft: "1rem" }}
                  />
                </button>
              </div>
            </div>

            <h3 className="user-comment-title" >USER COMMENTS</h3>

            {(blog && blog[0].userComments)?.map((comment, index) => {
              return (
                <div className="details-user-comments-container" key={index}>
                  <section className="details-user-comments-left">
                    <AccountCircleOutlinedIcon />
                  </section>

                  <section className="details-user-comments-right">
                    <div className="details-user-comments-rightUp">
                      <span style={{color : "rgb(55, 55, 55)"}} >{comment?.email}</span>
                      <span className="details-comment-date" >{comment?.date} </span>
                    </div>

                    <div className="details-user-comments-rightMiddle">
                      {comment?.rating === 1 && (
                        <>
                          <StarIcon />
                          <StarBorderIcon />
                          <StarBorderIcon />
                          <StarBorderIcon />
                          <StarBorderIcon />
                        </>
                      )}
                      {comment?.rating === 2 && (
                        <>
                          <StarIcon />
                          <StarIcon />
                          <StarBorderIcon />
                          <StarBorderIcon />
                          <StarBorderIcon />
                        </>
                      )}
                      {comment?.rating === 3 && (
                        <>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarBorderIcon />
                          <StarBorderIcon />
                        </>
                      )}
                      {comment?.rating === 4 && (
                        <>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarBorderIcon />
                        </>
                      )}
                      {comment?.rating === 5 && (
                        <>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </>
                      )}
                    </div>

                    <div className="details-user-comments-rightDown">
                      {comment?.comment}
                    </div>
                  </section>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Details;
