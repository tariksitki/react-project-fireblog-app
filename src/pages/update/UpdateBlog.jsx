import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { addUser } from "../../helpers/fireDatabase";
import { useNavigate, useParams } from "react-router-dom";
import { CallUser, EditBlog } from "../../helpers/fireDatabase";
import { async } from "@firebase/util";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import "./Update.scss";

const UpdateBlog = () => {
  const navigate = useNavigate();

  const [updateInfo, setUpdateInfo] = useState({
    id : "",
    title: "",
    blogDate : "",
    updateDate : "",
    url: "",
    content: "",
    userCountry: "",
    userEmail: "",
    userName: ""
  });

  const date = new Date().toLocaleDateString();
  const {id} = useParams();
  const blogListFromDatabase = CallUser();
  // CallUser icinde de useEffect calisir. Bu nedenle buradaki useEffect icinde kullanilmaz
  const dataToEdit = blogListFromDatabase?.filter((data) => {
    return (
      data.id === id
    )
  }, []);

  useEffect(() => {
    // callUser icinde de useEffect oldugu icin, buradaki useEffect tüm sayfa render edildikten sonra calissa da, dataToEdit ilk etap da yine undefined geliyor. o nedenle asagida ? ile tekrar bir kontrol den geciriyoruz.
    
    setUpdateInfo({
      ...updateInfo,
      id:  dataToEdit && dataToEdit[0].id,
      title:  dataToEdit && dataToEdit[0].title,
      blogDate : dataToEdit && dataToEdit[0].blogDate,
      updateDate : date,
      url: dataToEdit && dataToEdit[0].url,
      content: dataToEdit && dataToEdit[0].content,
      userCountry: dataToEdit && dataToEdit[0].userCountry,
      userEmail: dataToEdit && dataToEdit[0].userEmail,
      userName: dataToEdit && dataToEdit[0].userName
    })
    
  }, [blogListFromDatabase]);

  const handleEdit = () => {
    if (window.confirm("Are You Sure to Edit This Blog?")) {
      EditBlog(updateInfo)
      navigate(-1);
    }
  }

  return (
    <main className="update-main">
        <div className="update-back-container">
        <ArrowBackOutlinedIcon
          className="update-back-icon"
          onClick={() => navigate("/")}
        />
        <span onClick={() => navigate("/")}>Back</span>
      </div>

      <Box
        className="update-form"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="update-title-div">
          <h2 >EDIT BLOG</h2>
        </div>

        <TextField
          className="update-input update-title-input"
          id="outlined-basic"
          label="Title*"
          variant="outlined"
          value={updateInfo.title}
          onChange={(e) => setUpdateInfo({ ...updateInfo, title: e.target.value })}
          autoFocus
        />

        <TextField
          className="update-input"
          id="outlined-basic"
          label="Image URL*"
          variant="outlined"
          value={updateInfo.url}
          onChange={(e) => setUpdateInfo({ ...updateInfo, url: e.target.value })}
        />

        <TextField
          className="update-input"
          id="outlined-textarea"
          label="Content*"
          placeholder="Content*"
          multiline
          rows={7}
          value={updateInfo.content}
          onChange={(e) => setUpdateInfo({ ...updateInfo, content: e.target.value })}
        />
        
          <Stack spacing={2} direction="row" className="update-new-button-container" >
            <Button className="update-submit" variant="contained" 
            onClick={handleEdit}
            >
              EDIT YOUR BLOG
            </Button>
          </Stack>
      </Box>
    </main>


  );
};

export default UpdateBlog;
