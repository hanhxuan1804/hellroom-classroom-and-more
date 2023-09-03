import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Face6Rounded,
  Fullscreen,
  FullscreenExit,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { SocketContext } from "../../context/socket-context";
import ErrorPage from "../common/ErrorPage";
import { MultiChoiceSlideShow } from "../../component/presentation/slide/multichoice";
import { openFullscreen, closeFullscreen, checkFullscreen } from "./scripts";
import { showPresentation } from "../../api";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "../common/LoadingPage";

const KEY_ARROW_RIGHT = "ArrowRight";
const KEY_ARROW_LEFT = "ArrowLeft";

const ShowPresentationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { list, slide } = location.state;
  const { presentationId } = useParams();
  const [passcode, setPasscode] = useState();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    slide ? list.findIndex((item) => item._id === slide._id) : 0
  );
  const [listSlide, setListSlide] = useState(
    list.map((item) => ({
      ...item,
      options: item.options.map((option) => ({
        ...option,
        count: 0,
      })),
    }))
  );
  const createMutation = useMutation({
    mutationFn: showPresentation,
    onSuccess: (data) => {
      setPasscode(data.data.presentationHistory.code);
      const sortedList = data.data.presentationHistory.slidesRecord.sort(
        (a, b) => a.index - b.index
      );
      setListSlide(sortedList);
      setCurrentSlideIndex(data.data.presentationHistory.currentSlideIndex);
      socket.emit("join", {
        presentationId: data.data.presentationHistory.presentationId,
        code: data.data.presentationHistory.code,
      });
    },
  });
  const [numberOfJoiner, setNumberOfJoiner] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNextSlide = () => {
    if (currentSlideIndex === list.length - 1) return;
    const newIndex = currentSlideIndex + 1;
    setCurrentSlideIndex((prev) => (prev + 1) % list.length);
    socket.emit("next", {
      presentationId,
      slideId: listSlide[newIndex]._id,
    });
  };

  const handlePreviousSlide = () => {
    if (currentSlideIndex === 0) return;
    const newIndex = currentSlideIndex - 1;
    setCurrentSlideIndex((prev) => (prev - 1) % list.length);
    socket.emit("previous", {
      presentationId,
      slideId: listSlide[newIndex]._id,
    });
  };

  const handleFullscreen = () => {
    if (isFullscreen) {
      closeFullscreen("show-presentation-page");
    } else {
      openFullscreen("show-presentation-page");
    }
  };

  const pressKeyHandler = (e) => {
    if (e.key === KEY_ARROW_RIGHT) {
     handleNextSlide();
    }
    if (e.key === KEY_ARROW_LEFT) {
      handlePreviousSlide();
    }
  };


  useEffect(() => {
    createMutation.mutate({
      presentationId,
      currentSlideIndex,
    });

    socket.on("joined", (data) => {
      setNumberOfJoiner(data.numberOfJoiner);
    });

    socket.on("answerChanged", (data) => {
      const { currentSlide, currentSlideIndex } = data;
      setListSlide((prev) => {
        const newList = [...prev];
        newList[currentSlideIndex] = currentSlide;
        return newList;
      });
    });

    socket.on("leaved", (data) => {
      console.log("leaved catched", data);
      setNumberOfJoiner(data.numberOfJoiner);
    });

    const onFullScreenChange = () => {
      setIsFullscreen(Boolean(checkFullscreen()));
    };


    document.addEventListener("fullscreenchange", onFullScreenChange);
    //window.addEventListener("keydown", pressKeyHandler);
    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange);
      //window.removeEventListener("keydown", pressKeyHandler);

      socket.emit("end", {
        presentationId,
      });
      socket.off("joined");
      socket.off("answerChanged");
      socket.off("leaved");

    };
    // eslint-disable-next-line
  }, []);

  const handleExit = () => {
    closeFullscreen("show-presentation-page");
    navigate(-1);
  };

  if (createMutation.isLoading) {
    return <LoadingPage />;
  }
  if (createMutation.isError) {
    return <ErrorPage />;
  }

  return (
    <div
      id="show-presentation-page"
      style={{
        backgroundColor: "white",
        height: "90vh",
      }}
      tabIndex={-1}
      onKeyDown={pressKeyHandler}
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
          <SlideView
            type={
              listSlide.length !== 0 ? listSlide[currentSlideIndex]?.type : ""
            }
            slide={listSlide[currentSlideIndex]}
          />
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

const SlideView = ({ type, ...props }) => {
  const media = useMediaQuery("(max-width: 600px)");
  const widthRatio = media ? 0.9 : 0.5;

  if (type === "multipleChoice") {
    return <MultiChoiceSlideShow widthRatio={widthRatio} {...props} />;
  }

  return <ErrorPage />;
};

export default ShowPresentationPage;
