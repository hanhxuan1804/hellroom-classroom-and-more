import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  Container,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { authS } from "../../redux/selector";
import {
  MultiChoiceSlideAnswer,
  MultiChoiceSlideShow,
} from "../../component/presentation/slide/multichoice";
import { joinPresentation } from "../../api";
import { Face6Rounded, Send } from "@mui/icons-material";
import { SocketContext } from "../../context/socket-context";
import { useSnackbar } from "notistack";
import LoadingPage from "../common/LoadingPage";

const ViewPresentationPage = () => {
  const { presentationCode } = useParams();
  const user = useSelector(authS).user;
  const media = useMediaQuery("(max-width: 600px)");
  const socket = useContext(SocketContext);
  const [presentation, setPresentation] = useState({});
  const [currentSlide, setCurrentSlide] = useState({});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [totalSlide, setTotalSlide] = useState(0);
  const [numberOfJoiner, setNumberOfJoiner] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const joinMutation = useMutation({
    mutationFn: joinPresentation,
    onSuccess: (data) => {
      setPresentation(data.data.presentationId);
      setCurrentSlide(data.data.currentSlide);
      setCurrentSlideIndex(data.data.currentSlideIndex);
      setTotalSlide(data.data.totalSlide);
      const members = data.data.currentSlide.members;
      setNumberOfJoiner(members?.length);
      setIsAnswered(members.includes(user._id));
      socket.emit("join", {
        presentationId: data.data.presentationId,
        code: presentationCode,
      });
    },
    onError: (error) => {
      console.log(error);
      navigate("/");
      enqueueSnackbar("Presentation not found", {
        variant: "error",
      });
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    joinMutation.mutate({ code: presentationCode });

    socket.on("joined", (data) => {
      setNumberOfJoiner(data.numberOfJoiner);
    });
    socket.on("slideChanged", (data) => {
      setIsAnswered(data.currentSlide.members.includes(user._id));
      setCurrentSlide(data.currentSlide);
      setCurrentSlideIndex(data.currentSlideIndex);
    });
    socket.on("answerChanged", (data) => {
      setCurrentSlide(data.currentSlide);
      setCurrentSlideIndex(data.currentSlideIndex);
    });
    socket.on("leaved", (data) => {
      setNumberOfJoiner(data.numberOfJoiner);
    });
    socket.on("ended", () => {
      navigate("/");
      enqueueSnackbar("Presentation ended", {
        variant: "info",
      });
    });

    return () => {
      socket.emit("leave", {
        code: presentationCode,
      });
      socket.off("joined");
      socket.off("slideChanged");
      socket.off("answerChanged");
      socket.off("leaved");
      socket.off("ended");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAnswer = (index) => {
    setIsAnswered(true);
    socket.emit("answer", {
      presentationId: presentation,
      slideId: currentSlide._id,
      optionIndex: index,
    });
  };
  if (joinMutation.isLoading) return <LoadingPage />;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Container>
          {isAnswered ? (
            <Box
              sx={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SlideView type={currentSlide?.type} slide={currentSlide} />
            </Box>
          ) : (
            <Box>
              <NotAnsweredSlideView
                type={currentSlide?.type}
                slide={currentSlide}
                handleAnswer={handleAnswer}
              />
            </Box>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Face6Rounded />
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
              <div>
                {currentSlideIndex + 1}/{totalSlide}
              </div>
            </div>
          </div>
        </Container>
      </Grid>
      <Grid item xs={12} md={4}>
        {!media && <ChatBox />}
      </Grid>
    </Grid>
  );
};
const SlideView = (props) => {
  const { type, slide } = props;
  const widthRatio = 0.9;
  switch (type) {
    case "multipleChoice":
      return <MultiChoiceSlideShow widthRatio={widthRatio} slide={slide} />;
    default:
      return <div>Unknown slide type</div>;
  }
};
const NotAnsweredSlideView = (props) => {
  const { type, slide } = props;
  switch (type) {
    case "multipleChoice":
      return (
        <MultiChoiceSlideAnswer
          slide={slide}
          handleAnswer={props.handleAnswer}
        />
      );
    default:
      return <div>Unknown slide type</div>;
  }
};

const sampleChatData = [
  {
    name: "John Doe",
    message: "Hello",
    createdAt: "2023-09-01T00:00:00.000Z",
    userId: 1,
  },
  {
    name: "Alice Smith",
    message: "Hi there!",
    createdAt: "2023-09-02T00:15:00.000Z",
    userId: 2,
  },
  {
    name: "Bob Johnson",
    message: "Hey!",
    createdAt: "2023-09-01T00:30:00.000Z",
    userId: 3,
  },
  {
    name: "Eve Brown",
    message: "Good morning!",
    createdAt: "2023-09-01T00:45:00.000Z",
    userId: 4,
  },
];

const ChatBox = () => {
  const [messages, setMessages] = useState(
    sampleChatData.sort((a, b) => a.createdAt - b.createdAt)
  );
  const user = useSelector(authS).user;
  const messagesEndRef = useRef(null); // Tham chiếu đến phần tử cuối cùng trong danh sách
  const [newMessage, setNewMessage] = useState(""); // Tin nhắn mới
  useEffect(() => {
    // Cuộn xuống đến tin nhắn cuối cùng sau khi thêm tin nhắn mới
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleNewMessage = () => {
    if (newMessage === "") return;
    //check if newMessage is empty
    if (newMessage.trim() === "") {
      setNewMessage("");
      return;
    }
    const newMessages = [
      ...messages,
      {
        name: user.firstName + " " + user.lastName,
        message: newMessage,
        createdAt: new Date().toISOString(),
        userId: user._id,
      },
    ];
    setMessages(newMessages.sort((a, b) => a.createdAt - b.createdAt));
    setNewMessage("");
  };

  return (
    <Container
      border="1px solid #e0e0e0"
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #e0e0e0",
          padding: "10px",
        }}
      >
        <Typography variant="h6">Live Chat</Typography>
      </div>
      <div>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          {messages.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid #e0e0e0",
                padding: "10px",
              }}
            >
              <Box
                display={"flex"}
                justifyContent={
                  item.userId === user._id ? "flex-end" : "flex-start"
                }
                alignItems={"center"}
                flexDirection={"row"}
                width={"100%"}
              >
                {item.userId !== user._id ? (
                  <div>
                    <div
                      style={{
                        backgroundColor: "#e0e0e0",
                        color: "black",
                        borderRadius: "10px",
                        paddingLeft: "10px",
                        paddingRight: "15px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        maxWidth: "100%",
                        width: "fit-content",
                      }}
                    >
                      <Typography variant="body2" sx={{ marginLeft: "10px" }}>
                        {item.message}
                      </Typography>
                    </div>
                    <Typography
                      variant="caption"
                      sx={{
                        marginLeft: "10px",
                      }}
                    >
                      {item.name} at{" "}
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </Typography>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#4690ea",
                        color: "white",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        maxWidth: "100%",
                        width: "fit-content",
                      }}
                    >
                      <Typography variant="body2" flexWrap={"wrap"}>
                        {item.message}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography variant="caption" sx={{ marginLeft: "10px" }}>
                        You
                      </Typography>
                      <Typography variant="caption" sx={{ marginLeft: "5px" }}>
                        at {new Date(item.createdAt).toLocaleTimeString()}
                      </Typography>
                    </div>
                  </div>
                )}
              </Box>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>

        <div
          style={{
            borderTop: "1px solid #e0e0e0",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            id="standard-basic"
            fullWidth
            size="small"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (newMessage === "") return;
                if (e.shiftKey) return;
                handleNewMessage();
              }
            }}
          />
          <IconButton
            style={{
              float: "right",
              color: "blue",
            }}
            onClick={() => {
              handleNewMessage();
            }}
          >
            <Send />
          </IconButton>
        </div>
      </div>
    </Container>
  );
};
export default ViewPresentationPage;
