import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { addUser } from "../../helpers/fireDatabase";
import "./NewBlog.scss";

const NewBlog = () => {
  const [info, setInfo] = useState({
    title: "",
    url: "",
    content: "",
    userEmail : "",
    userName : "",
    date : "",
    userCountry : ""
  });

  const {currentUser} = useSelector(state => state.auth);
  const {email, displayName, photoURL} = currentUser;
  // firebase de user a ait country bilgisi olmadigi icin photoURL kullandik

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setInfo({...info, userEmail : email, userName : displayName, date : date, userCountry : photoURL})
  }, [currentUser]);

  const handleInfo = () => {
    addUser(info);
  };

  return (
    <main className="newBlog-main">
      <Box
        className="newBlog-form"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="title-div">
          <h2 >NEW BLOG</h2>
        </div>

        <TextField
          className="newBlog-input newBlog-title-input"
          id="outlined-basic"
          label="Title*"
          variant="outlined"
          value={info.title}
          onChange={(e) => setInfo({ ...info, title: e.target.value })}
        />

        <TextField
          className="newBlog-input"
          id="outlined-basic"
          label="Image URL*"
          variant="outlined"
          value={info.url}
          onChange={(e) => setInfo({ ...info, url: e.target.value })}
        />

        <TextField
          className="newBlog-input"
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
            <Button className="newBlog-submit" variant="contained" onClick={handleInfo}>
              SUBMIT NEW BLOG
            </Button>
          </Stack>
        </div>
      </Box>
    </main>


  );
};

export default NewBlog;
