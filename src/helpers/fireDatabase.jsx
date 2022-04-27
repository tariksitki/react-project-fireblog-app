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

// import Toastify from "../toastify/Toastify";

/// Writing a new Data to Database:

export const addUser = function ({title, url, content, userEmail, userName, date, userCountry}) {
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
    userCountry : userCountry
  });
};






// calling data from database:

export const CallUser = () => {
    // const [isLoading, setIsLoading] = useState();
    const [blogList, setBlogList] = useState();
    // const dispatch = useDispatch();

    useEffect(() => {
        // setIsLoading(true);

        const db = getDatabase();
        const userRef = ref(db, "database");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const databaseArray = [];

            for (let id in data) {
                databaseArray.push({id, ...data[id]});
            }
            setBlogList(databaseArray);
            // setIsLoading(false);
          });
    }, []);
      
    return blogList;
};






////////////// delete data from database:

export const deleteUser = (dataId, navigate) => {
  const db = getDatabase();
  const userRef = ref(db, "database");
  // Toastify("Data is deleted");
  remove(ref(db, "database/" + dataId));
  alert("ver silindi");
  navigate("/");
};






////// Edit User:

export const EditUser = (info) => {
  const db = getDatabase();
  const updates = {};
  updates["database/" + info.id] = info;
  // bizim database imiz icine gir, edit tusuna tiklanan kisinin id numarasini al ve bunun bilgilerini güncelle demek

  return update(ref(db), updates);
};

