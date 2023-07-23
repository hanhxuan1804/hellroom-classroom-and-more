import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  useMediaQuery,
  Divider,
  IconButton,
} from "@mui/material";
import SlideShowIcon from "@mui/icons-material/Slideshow";
import React from "react";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Dropdown from "../Dropdown";

const SlideTemplate = {
  list: ["Multiple Choice", "Short Answer"],
  "Multiple Choice": {
    id: 1,
    name: "Slide 1",
    type: "multichoice",
    slide_question: "Your question here",
    slide_listAnswer: [
      {
        answer: "Answer 1",
        Count: 5,
      },
      {
        answer: "Answer 2",
        Count: 3,
      },
      {
        answer: "Answer 3",
        Count: 2,
      },
    ],
  },
  "Short Answer": {
    id: 1,
    name: "Slide 1",
    type: "shortanswer",
    slide_question: "Your question here",
    slide_listAnswer: [],
  },
};

const ListSlide = (props) => {
  const { list, setList, selected, setSelected } = props;
  const listSlideRef = React.useRef(null);
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
    let newList = [...list];
    newList.splice(index + 1, 0, newItems);
    setList(newList);
    setSelected(newItems);
    setContextMenu(null);
  };
  const handleContextMenuDeleteClick = (event, item, index) => {
    event.preventDefault();
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
    newSlide.id = list.length + 1;
    setList([...list, newSlide]);
    setSelected(newSlide);
  };
  useEffect(() => {
    if(isAddSlide === false) return;
    if (media ) {
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
      <Dropdown
        name="Add Slide"
        listChild={SlideTemplate.list}
        handleChildClick={handleAddSlide}
      />
      <IconButton 
      variant="contained"
      color="success"
      sx={{
        mt: "15px",
        borderRadius: "15px",
        height: "40px",
        width: "40px",
      }}
      onClick={() => {console.log("presentclick")}}>
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
            <ListItem key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip
                title={
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography fontSize={20} fontWeight="bold" color="white">
                      Name: {slide.name}
                    </Typography>
                    <Typography fontSize={16} color="white">
                      Type:{" "}
                      {slide.type === "multichoice"
                        ? "Multiple Choice"
                        : "Short Answer"}
                    </Typography>
                  </Box>
                }
                placement="right"
              >
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
                  <CardContent>
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
              </Tooltip>
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
