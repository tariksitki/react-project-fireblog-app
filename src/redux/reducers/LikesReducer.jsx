
import { call_likes_func } from "../types/LikesTypes";
import ToastifyError from "../../helpers/toastify/ToastError";
import ToastifySuccess from "../../helpers/toastify/ToastSuccess";

const handleLikes = (currentUser, blog, EditBlog) => {
    if (!currentUser) {
      ToastifyError("Please Login to Like");

    } else {
      if (blog?.likes) {
          if (blog.likes.includes(currentUser?.email)) {
              EditBlog({
                ...blog,
                likes : blog?.likes?.filter(item => (item !== currentUser?.email))
              })
          } else {
            blog.likes?.push(currentUser?.email);
            EditBlog({
              ...blog,
              likes : blog?.likes
            });
          }

      } else {
        EditBlog({
          ...blog,
          likes : [currentUser?.email]
        })
      }
    }
  };

const LikesReducer = (state = handleLikes, {type, payload} ) => {
    switch (type) {
        case call_likes_func:
            return handleLikes();
        default:
            return state;
    }
};

export default LikesReducer;