
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "../components/navbar/Navbar";
import About from "../pages/about/About";
import Dashboard from "../pages/dashboard/Dashboard"
import Details from "../pages/details/Details";
import Login from "../pages/login/Login";
import NewBlog from "../pages/newBlog/NewBlog";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import UpdateBlog from "../pages/update/UpdateBlog";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Dashboard />} />
        <Route path="/about" element = {<About />} />
        <Route path="/details/:id" element = {<Details />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/newBlog" element = {<NewBlog />} />
        <Route path="/profile" element = {<Profile />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/updateBlog" element = {<UpdateBlog />} />
      </Routes>
    </Router>
  )
};

export default AppRouter;