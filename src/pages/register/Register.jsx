import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CountryInput from "../../components/countryInput/CountryInput";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Register.scss";
import { signUp } from "../../helpers/firebase";
import { useState } from "react";
import { signUpProvider, signIn } from "../../helpers/firebase";
import googleIcon from "../../assets/Google_Icon.webp";

const Register = () => {
  const [registerState, setRegisterState] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    country : ""
  });

  const displayName = `${registerState.firstName} ${registerState.lastName}`;

  const handleRegister = (e) => {
    e.preventDefault();
    signUp(registerState, displayName);
    console.log(registerState)
  };

  return (
    <main className="register-main">
          <Box
            className="register-form" onSubmit={handleRegister}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h2>REGISTER</h2>

            <TextField
              className="register-input"
              id="outlined-basic firstname"
              label="FirstName*"
              variant="outlined"
              onChange={(e) => setRegisterState({...registerState, firstName : e.target.value})}
              value = {registerState.firstName}
            />

            <TextField
              className="register-input"
              id="outlined-basic lastname"
              label="LastName*"
              variant="outlined"
              onChange={(e) => setRegisterState({...registerState, lastName : e.target.value})}
              value = {registerState.lastName}
            />

            <TextField
              className="register-input"
              id="outlined-basic email"
              label="E-Mail*"
              variant="outlined"
              onChange={(e) => setRegisterState({...registerState, email : e.target.value})}
              value = {registerState.email}
            />

            <PasswordInput registerState = {registerState} setRegisterState = {setRegisterState} />

            <CountryInput registerState = {registerState} setRegisterState = {setRegisterState}
            />

              <Stack spacing={2} direction="row" className="register-button-div" >
                <Button variant="contained" onClick={handleRegister} className = "register-register-button" >REGISTER</Button>
              </Stack>

              <Stack spacing={2} direction="row" className="register-google-div" >
                <Button variant="contained" className="register-google-button" onClick={() => signUpProvider()} >REGISTER With <img src={googleIcon} alt="" /> </Button>
            </Stack>
          </Box>
    </main>
  );
};

export default Register;
