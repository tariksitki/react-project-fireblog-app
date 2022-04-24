import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CountryInput from "../../components/countryInput/CountryInput";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Register.scss";
import { signUp } from "../../helpers/firebase";
import { useState } from "react";

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
    <main className="main">
          <Box
            className="form" onSubmit={handleRegister}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic firstname"
              label="FirstName*"
              variant="outlined"
              onChange={(e) => setRegisterState({...registerState, firstName : e.target.value})}
              value = {registerState.firstName}
            />

            <TextField
              id="outlined-basic lastname"
              label="LastName*"
              variant="outlined"
              onChange={(e) => setRegisterState({...registerState, lastName : e.target.value})}
              value = {registerState.lastName}
            />

            <TextField
              id="outlined-basic email"
              label="E-Mail*"
              variant="outlined"
              onChange={(e) => setRegisterState({...registerState, email : e.target.value})}
              value = {registerState.email}
            />

            <PasswordInput registerState = {registerState} setRegisterState = {setRegisterState} />

            <CountryInput registerState = {registerState} setRegisterState = {setRegisterState}
            />

            <div>
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleRegister} >REGISTER</Button>
              </Stack>
            </div>
          </Box>
      
    </main>
  );
};

export default Register;
