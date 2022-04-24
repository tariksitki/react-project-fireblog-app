import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";
import { signUpProvider, signIn } from "../../helpers/firebase";

const Login = () => {
  const [newBlogState, setnewBlogState] = useState({
    email : "",
    url : "",
    content : ""
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
              label="Title*"
              variant="outlined"
              value={newBlogState.email}
              onChange = {(e) => setnewBlogState({...newBlogState, email : e.target.value})}
            />

            <TextField
              id="outlined-basic"
              label="Image URL*"
              variant="outlined"
              value={newBlogState.url}
              onChange = {(e) => setnewBlogState({...newBlogState, url : e.target.value})}
            />

            <TextField
              id="outlined-textarea"
              label="Content*"
              placeholder="Content*"
              multiline
              rows={7}
              value={newBlogState.content}
              onChange = {(e) => setnewBlogState({...newBlogState, content : e.target.value})}
          />
          <div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick= {() => console.log(newBlogState)} >LOG IN</Button>
            </Stack>
          </div>
          </Box>
    </main>
  );
};

export default Login;
