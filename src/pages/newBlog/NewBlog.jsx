import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { addUser } from "../../helpers/fireDatabase";
import "./NewBlog.scss";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const NewBlog = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    title: "",
    url: "",
    content: "",
    userEmail : "",
    userName : "",
    date : "",
    userCountry : "",
    likes : []
  });

  const {currentUser} = useSelector(state => state.auth);
  const {email, displayName, photoURL} = currentUser;
  // firebase de user a ait country bilgisi olmadigi icin photoURL kullandik

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    // setInfo({...info, userEmail : email, userName : displayName, date : date, userCountry : photoURL})
    setInfo({...info, userEmail : email, userName : displayName, date : date, userCountry : ((currentUser && currentUser.providerData[0].providerId) === "password") ? photoURL : "unknown" })
  }, [currentUser]);

  const handleInfo = () => {
    if (!currentUser) {
      alert("Please login to Add a New Blog");
    } else if (!(info.title && info.url && info.content)) {
      alert("Please Fill All Fields")
    } else if ((info.title && info.url && info.content) && currentUser) {
      addUser(info);
      setInfo({
        ...info,
        title : "",
        url : "",
        content : ""
       })
       navigate("/");
    }
  };

  return (
    <main className="newBlog-main">
      <div className="newBlog-back-container">
        <ArrowBackOutlinedIcon
          className="newBlog-back-icon"
          onClick={() => navigate("/")}
        />
        <span onClick={() => navigate("/")}>Back</span>
      </div>

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
        
          <Stack spacing={2} direction="row" className="new-button-container" >
            <Button className="newBlog-submit" variant="contained" onClick={handleInfo}>
              SUBMIT NEW BLOG
            </Button>
          </Stack>
        
      </Box>
    </main>


  );
};

export default NewBlog;
