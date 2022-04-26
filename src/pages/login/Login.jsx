import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoginPassword from "./LoginPassword";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";
import { signUpProvider, signIn } from "../../helpers/firebase";
import "./Login.scss";
import googleIcon from "../../assets/Google_Icon.webp";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.auth);
  console.log(currentUser);

  const [loginState, setLoginState] = useState({
    email : "",
    password : ""
  });

  const handleLogin = () => {
    if (loginState.email && loginState.password && !currentUser) {
      signIn(loginState, navigate);
      loginState.email = "";
      loginState.password = "";

    } else if ((loginState.email && loginState.password) && (currentUser) ) {
      alert("You are already Log In. If you want to log in with another username, please log out first");

    }  else if (!(loginState.email && loginState.password)) {
      alert("Please fill in all fields");
    } 
  };

  const handleGoogleLogin = () => {
    if (!currentUser) {
      signUpProvider(navigate);
    } else {
      alert("You are already Log In. If you want to log in with another username, please log out first")
    }
  };

  return (
    <main className="login-main">
          <Box
            className="form"
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="login-title-div" >
                <h2>LOGIN</h2>
            </div>

            <TextField
              className="login-email"
              id="outlined-basic"
              label="E-Mail*"
              variant="outlined"
              value={loginState.email}
              onChange = {(e) => setLoginState({...loginState, email : e.target.value })}
            />
            <LoginPassword loginState = {loginState} setLoginState = {setLoginState}  />

            <p className="no-account" >You have not a account? Please <span className="no-account-span"> <Link to={"/register"} >Register</Link></span> </p>

            <Stack spacing={2} direction="row" className="login-login-div" >
                <Button variant="contained" className="login-login-button" onClick= {handleLogin} >LOGIN</Button>
            </Stack>

          
            <Stack spacing={2} direction="row" className="login-google-div" >
                <Button variant="contained" className="login-google-button" onClick={handleGoogleLogin} >LOGIN With <img src={googleIcon} alt="" /> </Button>
            </Stack>
          
          </Box>
    </main>
  );
};

export default Login;
