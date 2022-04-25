import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoginPassword from "./LoginPassword";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";
import { signUpProvider, signIn } from "../../helpers/firebase";
import "./Login.scss";
import googleIcon from "../../assets/Google_Icon.webp";

const Login = () => {
  const [loginState, setLoginState] = useState({
    email : "",
    password : ""
  });

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
            <h2>LOGIN</h2>

            <TextField
              className="login-email"
              id="outlined-basic"
              label="E-Mail*"
              variant="outlined"
              value={loginState.email}
              onChange = {(e) => setLoginState({...loginState, email : e.target.value })}
            />
            <LoginPassword loginState = {loginState} setLoginState = {setLoginState}  />

            <Stack spacing={2} direction="row" className="login-login-div" >
                <Button variant="contained" className="login-login-button" onClick= {() => signIn(loginState)} >LOGIN</Button>
            </Stack>

          
            <Stack spacing={2} direction="row" className="login-google-div" >
                <Button variant="contained" className="login-google-button" onClick={() => signUpProvider()} >LOGIN With <img src={googleIcon} alt="" /> </Button>
            </Stack>
          
          </Box>
    </main>
  );
};

export default Login;
