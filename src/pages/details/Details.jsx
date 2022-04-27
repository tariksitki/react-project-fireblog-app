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

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state] = useSelector((state) => state.blog);
  const { currentUser } = useSelector((state) => state.auth);

  const data = state?.filter((item) => {
    return item.id === id;
  });


  const toCapitalize = (str) => {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase() + " ";
    }
    return arr;
  };

  return (
    <main className="details-main">
      <div className="details-container">
        <section className="details-main-up">
          <div className="details-logo-div">
            <h1 className="details-logo" onClick={() => (navigate("/")) } >BLOGGER</h1>
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
            <img className="details-image" src={data && data[0].url} alt="" />
          </div>

          <div className="details-info-container">
            <div className="details-info-up">
              <div className="details-info-up-left">
                <span>{data && data[0].userName[0].toUpperCase()} </span>
                <p>{data && toCapitalize(data[0].userName)}</p>
              </div>

              <div className="details-info-up-right">
                <p>{data && data[0].blogDate} </p>
              </div>
            </div>

            <div className="details-info-title-div">
              <h2 className="details-info-title"><p>{data && toCapitalize(data[0].title)}</p> </h2>
            </div>

            <div className="details-info-content-div">
              <p className="details-info-content">
                {data && data[0].content}
              </p>
            </div>

            <div className="author-info-div">
              <span>Author : {data && toCapitalize(data[0].userName)} </span>
              <span>E-Mail : {data && (data[0].userEmail)} </span>
              <span>Country : {data && (data[0].userCountry)} </span>
            </div>

            <div className="details-bottom-icons">
              <FavoriteBorderIcon className="details-info-icon" />
              {/* <FavoriteIcon /> */}
              <ChatBubbleOutlineIcon className="details-info-icon" />
              {/* <ChatBubbleIcon /> */}
              <VisibilityOutlinedIcon className="details-info-icon" />
              <BookmarkBorderOutlinedIcon className="details-info-icon" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Details;
