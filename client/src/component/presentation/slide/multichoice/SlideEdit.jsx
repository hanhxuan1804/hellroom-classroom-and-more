import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcons from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const SlideEdit = (props) => {
  const { slide, setSlide } = props;
  const navigate = useNavigate();
  const [slideData, setSlideData] = useState(slide);
  const listAnswerScrollRef = useRef(null);

  useEffect(() => {
    setSlideData(slide);
  }, [slide]);
  useEffect(() => {
    listAnswerScrollRef.current.scrollTop =
      listAnswerScrollRef.current.scrollHeight;
  }, [slideData.options]);
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
            value={slideData.question}
            onChange={(e) =>
              setSlide({ ...slideData, question: e.target.value })
            }
            placeholder={"Enter your question"}
            multiline
          />

          <FormHelperText error={slideData.question === ""}>
            {slideData.question === "" ? "*Question is required" : ""}
          </FormHelperText>
        </FormControl>
        <Typography fontSize={"1rem"} fontWeight={"bold"}>
          List Options:
        </Typography>
        <div
          ref={listAnswerScrollRef}
          style={{
            height: "250px",
            overflowY: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          {slideData.options.map((item, index) => (
            <FormControl key={index}
            >
              <Typography fontSize={"0.8rem"} fontWeight={"bold"}>
                Option {index + 1}:
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
                  value={item.option}
                  onChange={(e) => {
                    let newList = [...slideData.options];
                    newList[index].option = e.target.value;
                    setSlide({ ...slideData, options: newList });
                  }}
                  placeholder={"Enter your option"}
                  multiline
                />
                <IconButton
                  variant="contained"
                  color="error"
                  onClick={() => {
                    let newList = [...slideData.options];
                    newList.splice(index, 1);
                    setSlide({ ...slideData, options: newList });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <FormHelperText error={item.option === ""}>
                {item.option === "" ? "*Answer is required" : ""}
              </FormHelperText>
            </FormControl>
          ))}
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              let newList = [...slideData.options];
              newList.push({ option: "", count: 0 });
              setSlide({ ...slideData, options: newList });
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
              navigate("/presentation");
            }}
          >
            Cancle
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
                props.savePresentation();
              }}
          >
            Save
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default SlideEdit;
