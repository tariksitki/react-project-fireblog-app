import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Details.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

const Details = () => {
  const { id } = useParams();
  const [state] = useSelector((state) => state.blog);
  const data = state?.filter((item) => {
    return item.id === id;
  });
  console.log(data && data[0].url);

  return (
    <main className="details-main">
      <div className="details-container">
        <section className="details-main-up">
          <div className="details-logo-div">
            <h1 className="details-logo">BLOGGER</h1>
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
                <span>T</span>
                <p>Tarik Sitki</p>
              </div>

              <div className="details-info-up-right">
                <p>22.04.2022</p>
              </div>
            </div>

            <div className="details-info-title-div">
              <h2 className="details-info-title">Lorem Lorem Lorem LOrem </h2>
            </div>

            <div className="details-info-content-div">
              <p className="details-info-content">
                {" "}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
                itaque dolores architecto iusto, minima veniam aliquam quam a
                repellat optio hic eum quidem autem soluta distinctio ad ullam
                consequuntur delectus labore officia magnam? Dicta, sequi.
                Temporibus vero, accusantium commodi quaerat laudantium ratione
                mollitia aspernatur delectus porro, sapiente, maiores natus et
                magnam error modi nulla non. Ea doloribus eligendi magni sequi
                odit nemo quod voluptates est, error fugiat necessitatibus enim
                beatae qui aperiam tempora voluptatem officia quam, quas rem
                quo, hic veritatis eos tempore. Cum dolor nisi minima saepe sed
                amet vero ab, praesentium modi pariatur, ea voluptates,
                voluptatum ipsam et!{" "}
              </p>
            </div>

            <div className="author-info-div">
              <span>Author : </span>
              <span>E-Mail : </span>
              <span>Country : </span>
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
