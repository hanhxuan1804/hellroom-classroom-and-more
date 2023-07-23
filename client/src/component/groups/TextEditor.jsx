import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropzone from "react-dropzone";

function TextEditor(props) {
  const titleType = ["Announcement", "Event", "Question", "Discussion"]
  const setIsPost = props.setIsPost;
  const handlePost = props.handlePost;
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(titleType[0]); // "Announcement"

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Text:", text);
    console.log("File:", file);
    console.log("Title:", title);
    const newPost = {
      id: 1,
      title: title,
      content: text,
      file: file,
    }
    handlePost(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: 250,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems:'center', mb:2 }}>
          <Typography variant="h6" marginRight={5}>Title:</Typography>
          <Select
            label="Title"
            value={title}
            size="small"
            sx={{ width: 200 }}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          >
            {titleType.map((title) => (
              <MenuItem value={title}>{title}</MenuItem>
            ))}
          </Select>
        </Box>
        <TextField
          label="Text"
          value={text}
          onChange={handleTextChange}
          multiline
          rows={4}
          fullWidth
        />
        <Box
          sx={{
            height: 20,
            mt: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          fullWidth
        >
          <Dropzone onDrop={handleFileChange}>
            {({ getRootProps, getInputProps }) => (
              <section>
                {file ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div>File selected: {file.name}</div>
                    <Button sx={{ pt: "10px" }} onClick={handleFileRemove}>
                      Remove file
                    </Button>
                  </div>
                ) : (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button startIcon={<CloudUploadIcon />} variant="outlined">
                      Upload file
                    </Button>
                  </div>
                )}
              </section>
            )}
          </Dropzone>
          <Box>
            <Button
              variant="text"
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => {
                setIsPost(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ background: "#0b5c6d", borderRadius: 5 }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default TextEditor;
