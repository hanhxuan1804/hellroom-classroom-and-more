import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcons from "@mui/icons-material/Add";

const SlideEdit = (props) => {
  const { slide, setSlide, updateSlide, discardChanges } = props;
  const [slideData, setSlideData] = useState(slide);
  const [backDropOpen, setBackDropOpen] = useState(false);
  const listAnswerScrollRef = useRef(null);

  useEffect(() => {
    setSlideData(slide);
  }, [slide]);
  useEffect(() => {
    listAnswerScrollRef.current.scrollTop =
      listAnswerScrollRef.current.scrollHeight;
  }, [slideData.slide_listAnswer]);
  return (
    <Box>
      {/* <Typography
        fontSize={"1.5rem"}
        fontWeight={"bold"}
        textAlign={"center"}
        p={1}
      >
        MultiChoice Slide
      </Typography> */}
      <div style={{ padding: "5px" }}>
        <FormControl fullWidth margin={"normal"}>
          <Typography fontSize={"1rem"} fontWeight={"bold"}>
            Name:
          </Typography>
          <OutlinedInput
            size="small"
            value={slideData.name}
            onChange={(e) => setSlide({ ...slideData, name: e.target.value })}
            placeholder={"Enter slide name"}
            multiline
          />
          <FormHelperText error={slideData.name === ""}>
            {slideData.name === "" ? "*Name is required" : ""}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin={"normal"}>
          <Typography fontSize={"1rem"} fontWeight={"bold"}>
            Question:
          </Typography>
          <OutlinedInput
            size="small"
            value={slideData.slide_question}
            onChange={(e) =>
              setSlide({ ...slideData, slide_question: e.target.value })
            }
            placeholder={"Enter your question"}
            multiline
          />

          <FormHelperText error={slideData.slide_question === ""}>
            {slideData.slide_question === "" ? "*Question is required" : ""}
          </FormHelperText>
        </FormControl>
        <Typography fontSize={"1rem"} fontWeight={"bold"}>
          List Answer:
        </Typography>
        <div
          ref={listAnswerScrollRef}
          style={{
            height: "250px",
            overflowY: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          {slideData.slide_listAnswer.map((item, index) => (
            <FormControl key={index}
            >
              <Typography fontSize={"0.8rem"} fontWeight={"bold"}>
                Answer {index + 1}:
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <OutlinedInput
                  size="small"
                  value={item.answer}
                  onChange={(e) => {
                    let newList = [...slideData.slide_listAnswer];
                    newList[index].answer = e.target.value;
                    setSlide({ ...slideData, slide_listAnswer: newList });
                  }}
                  placeholder={"Enter your answer"}
                  multiline
                />
                <IconButton
                  variant="contained"
                  color="error"
                  onClick={() => {
                    let newList = [...slideData.slide_listAnswer];
                    newList.splice(index, 1);
                    setSlide({ ...slideData, slide_listAnswer: newList });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <FormHelperText error={item.answer === ""}>
                {item.answer === "" ? "*Answer is required" : ""}
              </FormHelperText>
            </FormControl>
          ))}
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              let newList = [...slideData.slide_listAnswer];
              newList.push({ answer: "", Count: 0 });
              setSlide({ ...slideData, slide_listAnswer: newList });
            }}
            sx={{ marginTop: "10px", borderRadius: "10px", width: "100%" }}
          >
            <AddIcons />
          </IconButton>
        </div>
        <Divider />
        <div
          style={{
            width: "100%",
            height: "80px",
            paddingBottom: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: 100,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#e0e0e0",
              color: "black",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                color: "black",
              },
            }}
            onClick={() => {
              discardChanges();
            }}
          >
            Discard
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: 100,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#0b5c6d",
              color: "white",
              "&:hover": {
                backgroundColor: "#0b5c6d",
                color: "white",
              },
            }}
            onClick={() => {
              setBackDropOpen(true);
              updateSlide(slideData);
              setTimeout(() => {
                setBackDropOpen(false);
              }, 1000);
            }}
          >
            Save
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDropOpen}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
    </Box>
  );
};

export default SlideEdit;
