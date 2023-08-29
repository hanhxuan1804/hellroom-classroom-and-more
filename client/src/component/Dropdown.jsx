import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Dropdown = (props) => {
  const { name, listChild, handleChildClick } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleItemClick = (value) => {
    handleChildClick(value);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        sx={{ m: 2,
          backgroundColor: "#0b5c6d",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#0b5c6d",
            color: "#fff",
            opacity: 0.8,
          },
          borderRadius: "20px",
         }
        }
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {listChild.map((item, index) => {
          return (
            <MenuItem key={index} value={item} onClick={()=>handleItemClick(item)}>
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default Dropdown;
