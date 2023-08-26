import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { openFullscreen, closeFullscreen, checkFullscreen } from "./scripts";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Face6Rounded,
  Fullscreen,
  FullscreenExit,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { getSocket } from "../../context/socket-context";

const ShowPresentationPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = getSocket();
  const { list, slide } = location.state;
  const { presentationId } = useParams();
  const [currentSlide, setCurrentSlide] = useState(slide || list[0]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    slide ? list.findIndex((item) => item._id === slide._id) : 0
  );

  const [numberOfJoiner, setNumberOfJoiner] = useState(0);
  const [listAnswers, setListAnswers] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleNextSlide = () => {
    if (currentSlideIndex === list.length - 1) return;
    setCurrentSlide(list[currentSlideIndex + 1]);
    setCurrentSlideIndex(currentSlideIndex + 1);
  };
  const handlePreviousSlide = () => {
    if (currentSlideIndex === 0) return;
    setCurrentSlide(list[currentSlideIndex - 1]);
    setCurrentSlideIndex(currentSlideIndex - 1);
  };
  const handleFullscreen = () => {
    if (isFullscreen) {
      closeFullscreen("show-presentation-page");
    } else {
      openFullscreen("show-presentation-page");
    }
  };
  useEffect(() => {
    const pressKeyHandler = (e) => {
      if (e.key === "ArrowRight") {
        handleNextSlide();
      }
      if (e.key === "ArrowLeft") {
        handlePreviousSlide();
      }
    };
    const onFullScreenChange = () => {
      setIsFullscreen(Boolean(checkFullscreen()));
    };
    document.addEventListener("fullscreenchange", onFullScreenChange);
    window.addEventListener("keydown", pressKeyHandler);
    return () => {
      window.removeEventListener("keydown", () => {});
      document.removeEventListener("fullscreenchange", onFullScreenChange);
    };
    //eslint-disable-next-line
  }, []);
  const handleExit = () => {
    closeFullscreen("show-presentation-page");
    navigate(-1);
  };
  const passcode = "123456";
  return (
    <div
      id="show-presentation-page"
      style={{
        backgroundColor: "white",
        height: "90vh",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="space-between"
        flexDirection="column"
        height={"100%"}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="space-between"
          flexDirection="row"
        >
          <IconButton onClick={handleExit}>
            <ArrowBackIcon />
          </IconButton>
          <h1>Code: {passcode}</h1>
          <IconButton onClick={handleFullscreen}>
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <div>{JSON.stringify(currentSlide)}</div>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="space-between"
          flexDirection="row"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <IconButton>
              <Face6Rounded />
            </IconButton>
            <div>{numberOfJoiner}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <IconButton onClick={handlePreviousSlide}>
              <NavigateBefore />
            </IconButton>
            <Typography>
              {currentSlideIndex + 1}/{list.length}
            </Typography>
            <IconButton onClick={handleNextSlide}>
              <NavigateNext />
            </IconButton>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ShowPresentationPage;
