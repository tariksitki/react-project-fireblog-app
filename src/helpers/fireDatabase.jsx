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

export const addUser = function ({title, url, content, userEmail, userName, date}) {
  const db = getDatabase();
  const userRef = ref(db, "database");
  const newUserRef = push(userRef);
  set(newUserRef, {
    title: title,
    url: url,
    content: content,
    blogDate : date,
    userEmail : userEmail,
    userName : userName
  });
};






// calling data from database:

export const CallUser = () => {
    // const [isLoading, setIsLoading] = useState();
    const [blogList, setBlogList] = useState();
    const dispatch = useDispatch();

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
