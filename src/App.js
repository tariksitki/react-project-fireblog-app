import "./App.css";
import AppRouter from "./router/AppRouter";
import { auth } from "./helpers/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/actions/AuthActions";
import { setLoading, clearLoading } from "./redux/actions/AppActions";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.app);

  useEffect(() => {
    // dispatch(clearLoading());
    console.log(currentUser);
    // console.log(loading);

    const userInfo = auth.onAuthStateChanged((user) => {
      dispatch(setCurrentUser(user));
    });
    return userInfo;
  }, [currentUser, loading]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
