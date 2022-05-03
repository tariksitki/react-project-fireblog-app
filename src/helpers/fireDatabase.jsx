import firebase from "./firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {setBlog} from "../redux/actions/BlogActions";
import {setLoading, clearLoading} from "../redux/actions/AppActions";
import ToastifySuccess from "./toastify/ToastSuccess";
import ToastifyError from "./toastify/ToastError";

// import Toastify from "../toastify/Toastify";

/// Writing a new Data to Database:

export const addUser = function ({title, url, content, userEmail, userName, date, userCountry, likes}) {
    try {
      const db = getDatabase();
      const userRef = ref(db, "database");
      const newUserRef = push(userRef);
      set(newUserRef, {
        title: title,
        url: url,
        content: content,
        blogDate : date,
        userEmail : userEmail,
        userName : userName,
        userCountry : userCountry,
        likes : likes
      });
      ToastifySuccess("Blog was succesfully added");
    } catch (error) {
      ToastifyError(error)
    } 
};






// calling data from database:

export const CallUser = () => {
    const [blogList, setBlogList] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading());

        const db = getDatabase();
        const userRef = ref(db, "database");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const databaseArray = [];

            for (let id in data) {
                databaseArray.push({id, ...data[id]});
            }
            setBlogList(databaseArray);
            dispatch(clearLoading())
          });
    }, []);
      
    return blogList;
};






////////////// delete data from database:

export const deleteUser = (dataId, navigate) => {
    try {
      const db = getDatabase();
      const userRef = ref(db, "database");
      remove(ref(db, "database/" + dataId));
      navigate("/");
      ToastifySuccess("Blog was deleted succesfully");
    } catch (error) {
      ToastifyError(error);
    }
};






////// Edit Blog:

export const EditBlog = (updateInfo) => {
    try {
      const db = getDatabase();
      const updates = {};
      updates["database/" + updateInfo.id] = updateInfo;
      // bizim database imiz icine gir, edit tusuna tiklanan kisinin id numarasini al ve bunun bilgilerini güncelle demek
      return update(ref(db), updates);
    } catch (error) {
      ToastifyError(error);
    }
};

