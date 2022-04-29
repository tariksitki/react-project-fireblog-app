import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CountryInput from "../../components/countryInput/CountryInput";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Register.scss";
import { signUp } from "../../helpers/firebase";
import { useEffect, useState } from "react";
import { signUpProvider } from "../../helpers/firebase";
import googleIcon from "../../assets/Google_Icon.webp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.auth);

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

    if (currentUser) {
      alert("You are already Log In. If you want to log in with another username, please log out first");
      setRegisterState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        country : ""
      });
    
    } else if (!(registerState.firstName && registerState.lastName && registerState.email && registerState.password && registerState.country)) {
      alert ("Please fill in all fields")

    } else if ((registerState.firstName && registerState.lastName && registerState.email && registerState.password && registerState.country) && !currentUser) {
      signUp(registerState, displayName, navigate);
    }
  };

  const handleRegisterGoogle = () => {
    if (currentUser) {
        alert("You are already Log In. If you want to log in with another username, please log out first");

    } else if (!currentUser) {
        signUpProvider(navigate);
    }
  }


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
            <div className="register-title-div">
              <h2>REGISTER</h2>
            </div>

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
                <Button variant="contained" className="register-google-button" onClick={handleRegisterGoogle} >REGISTER With <img src={googleIcon} alt="" /> </Button>
            </Stack>
          </Box>
    </main>
  );
};

export default Register;
