import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordInput({registerState, setRegisterState}) {
  const [values, setValues] = React.useState({
    // password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    // setValues({ ...values, [prop]: event.target.value });

    setRegisterState({
      ...registerState,
      password : event.target.value
    })
  };

  // React.useEffect(() => {
  //   setRegisterState({...registerState, password : values.password})
  // }, []);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className='register-input' >
          <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            // value={values.password}
            value={registerState.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
  );
}
