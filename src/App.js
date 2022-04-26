import "./App.css";
import AppRouter from "./router/AppRouter";
import { auth } from "./helpers/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/actions/AuthActions";
import { setLoading, clearLoading } from "./redux/actions/AppActions";
import {CallUser} from "./helpers/fireDatabase";
import {setBlog} from "./redux/actions/BlogActions"

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.app);
  const blogData = CallUser();
  // console.log(currentUser);
  
  const [ state ] = useSelector((state) => state.blog);

  useEffect(() => {
    // dispatch(clearLoading());
  
    dispatch(setBlog(blogData));
  
    const userInfo = auth.onAuthStateChanged((user) => {
      dispatch(setCurrentUser(user));
    });
      // this return to delete memory
    return userInfo;
  }, [currentUser, loading, blogData]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
