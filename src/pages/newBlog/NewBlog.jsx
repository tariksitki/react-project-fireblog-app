import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { addUser } from "../../helpers/fireDatabase";


const NewBlog = () => {
  const [info, setInfo] = useState({
    title: "",
    url: "",
    content: "",
    userEmail : "",
    userName : "",
    date : ""
  });

  const {currentUser} = useSelector(state => state.auth);
  const {email, displayName} = currentUser;

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setInfo({...info, userEmail : email, userName : displayName, date : date})
  }, [currentUser]);


  const handleInfo = () => {
    addUser(info);
  };

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
          value={info.title}
          onChange={(e) => setInfo({ ...info, title: e.target.value })}
        />

        <TextField
          id="outlined-basic"
          label="Image URL*"
          variant="outlined"
          value={info.url}
          onChange={(e) => setInfo({ ...info, url: e.target.value })}
        />

        <TextField
          id="outlined-textarea"
          label="Content*"
          placeholder="Content*"
          multiline
          rows={7}
          value={info.content}
          onChange={(e) => setInfo({ ...info, content: e.target.value })}
        />
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleInfo}>
              SUBMIT NEW BLOG
            </Button>
          </Stack>
        </div>
      </Box>
    </main>
  );
};

export default NewBlog;
