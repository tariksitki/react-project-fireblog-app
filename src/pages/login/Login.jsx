import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoginPassword from "./LoginPassword";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";
import { signUpProvider, signIn } from "../../helpers/firebase";

const Login = () => {
  const [loginState, setLoginState] = useState({
    email : "",
    password : ""
  });

  return (
    <main className="main">
          <Box
            className="form"
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="E-Mail*"
              variant="outlined"
              value={loginState.email}
              onChange = {(e) => setLoginState({...loginState, email : e.target.value })}
            />
            <LoginPassword loginState = {loginState} setLoginState = {setLoginState} />

          <div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick= {() => signIn(loginState)} >LOG IN</Button>
            </Stack>
          </div>

          <div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => signUpProvider()} >Sign in With Google</Button>
            </Stack>
          </div>
          </Box>
    </main>
  );
};

export default Login;
