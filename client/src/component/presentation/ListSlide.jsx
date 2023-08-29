import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  Divider,
  IconButton,
} from "@mui/material";
import SlideShowIcon from "@mui/icons-material/Slideshow";
import BarChartIcon from "@mui/icons-material/BarChart";
import React from "react";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Dropdown from "../Dropdown";
import ObjectID from "bson-objectid";
import { useSnackbar } from "notistack";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SlideTemplate = {
  list: ["Multiple Choice"],
  "Multiple Choice": {
    name: "Slide Name",
    type: "multipleChoice",
    question: "Your question here",
    options: [
      {
        option: "Option 1",
        count: 5,
      },
      {
        option: "Option 2",
        count: 3,
      },
      {
        option: "Option 3",
        count: 2,
      },
    ],
  },
  // "Short Answer": {
  //   id: 1,
  //   name: "Slide 1",
  //   type: "shortoption",
  //   question: "Your question here",
  //   options: [],
  // },
};

const ListSlide = (props) => {
  const { setList, selected, setSelected } = props;
  const listSlideRef = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const list = Object.preventExtensions(props.list);
  const [isAddSlide, setIsAddSlide] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const media = useMediaQuery("(max-width: 900px)");
  const handleContextMenu = (event, item, index) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      item,
      index,
    });
  };
  const handleContextMenuDoubleClick = (event, item, index) => {
    event.preventDefault();
    const newItems = { ...item, name: `${item.name} - Copy` };
    newItems._id = ObjectID();
    let newList = [...list];
    newList.splice(index + 1, 0, newItems);
    setList(newList);
    setSelected(newItems);
    setContextMenu(null);
  };
  const handleContextMenuDeleteClick = (event, item, index) => {
    event.preventDefault();
    if (list.length === 1) {
      setContextMenu(null);
      enqueueSnackbar("The presentation must have at least one slide", {
        variant: "error",
      });
      return;
    }
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setSelected(index === 0 ? newList[0] : newList[index - 1]);
    setContextMenu(null);
  };
  const handleAddSlide = (value) => {
    setIsAddSlide(true);
    const newSlide = JSON.parse(JSON.stringify(SlideTemplate[value]));
    newSlide.name = `Slide ${list.length + 1}`;
    newSlide._id = ObjectID();
    setList([...list, newSlide]);
    setSelected(newSlide);
  };
  useEffect(() => {
    if (isAddSlide === false) return;
    if (media) {
      listSlideRef.current.scrollLeft = listSlideRef.current.scrollWidth;
    } else {
      listSlideRef.current.scrollTop = listSlideRef.current.scrollHeight;
    }
    setIsAddSlide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddSlide]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IconButton
            onClick={() => {
              navigate("/presentation/mypresentations");
            }}
          >
            <ArrowBack />
          </IconButton>
          <Dropdown
            name="Add Slide"
            listChild={SlideTemplate.list}
            handleChildClick={handleAddSlide}
          />
        </div>
        <IconButton
          variant="contained"
          color="success"
          sx={{
            mt: "15px",
            borderRadius: "15px",
            height: "40px",
            width: "40px",
          }}
          onClick={() => {
            props.handlePresentationShow();
          }}
        >
          <SlideShowIcon />
        </IconButton>
      </div>
      <List
        ref={listSlideRef}
        sx={{
          overflowX: media ? "scroll" : "hidden",
          overflowY: media ? "hidden" : "scroll",
        }}
      >
        <ReactSortable
          list={list}
          setList={setList}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          style={{
            display: "flex",
            height: media ? 150 : "75vh",
            flexDirection: media ? "row" : "column",
          }}
        >
          {list.map((slide, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Tooltip
                title={
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography fontSize={20} fontWeight="bold" color="white">
                      Name: {slide.name}
                    </Typography>
                    <Typography fontSize={16} color="white">
                      Type:{" "}
                      {slide.type === "multipleChoice"
                        ? "Multiple Choice"
                        : "Short Answer"}
                    </Typography>
                  </Box>
                }
                placement="right"
              > */}
              <Card
                sx={{
                  width: media ? 250 : "100%",
                  maxWidth: 250,
                  minHeight: 120,
                  borderRadius: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "3",
                  cursor: "pointer",
                  border: selected === slide ? "2px solid #000" : "none",
                }}
                onClick={() => {
                  setSelected(list[index]);
                }}
                onContextMenu={(event) =>
                  handleContextMenu(event, slide, index)
                }
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {slide.type === "multipleChoice" ? (
                    <BarChartIcon
                      sx={{
                        fontSize: 50,
                        color: "text.secondary",
                      }}
                    />
                  ) : (
                    <SlideShowIcon
                      sx={{
                        fontSize: 50,
                        color: "text.secondary",
                      }}
                    />
                  )}
                  <Typography
                    fontSize={20}
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    {slide.name.length > 20
                      ? slide.name.substring(0, 20) + "..."
                      : slide.name}
                  </Typography>
                </CardContent>
              </Card>
              {/* </Tooltip> */}
            </ListItem>
          ))}
          <Menu
            open={contextMenu !== null}
            onClose={() => setContextMenu(null)}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem
              onClick={(e) =>
                handleContextMenuDoubleClick(
                  e,
                  contextMenu.item,
                  contextMenu.index
                )
              }
            >
              Double
            </MenuItem>
            <MenuItem
              onClick={(e) =>
                handleContextMenuDeleteClick(
                  e,
                  contextMenu.item,
                  contextMenu.index
                )
              }
            >
              Delete
            </MenuItem>
          </Menu>
        </ReactSortable>
        <Divider />
      </List>
    </div>
  );
};

export default ListSlide;
