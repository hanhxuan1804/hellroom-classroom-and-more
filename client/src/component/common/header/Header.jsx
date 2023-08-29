import "./Header.css";
import { logo, logosmall } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  useMediaQuery,
  IconButton,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Groups3, Slideshow } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { authS } from "../../../redux/selector";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { logout } from "../../../redux/slice/authSlice";
import { clearGroups } from "../../../redux/slice/groupSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b5c6d",
    },
  },
});

function Header(props) {
  const user = useSelector(authS).user;
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [authLocal, setAuthLocal] = useLocalStorage("auth", null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuName, setMenuName] = useState(null);
  const navbarItems = [
    {
      name: "Group",
      link: "/groups",
      icon: <Groups3 />,
      options: [
        {
          name: "Join Group",
          link: "/groups/join",
        },
        {
          name: "All Groups",
          link: "/groups/mygroups",
        },
        {
          name: "Create Group",
          link: "/groups/create",
        },
      ],
    },
    {
      name: "Presentation",
      link: "/presentation",
      icon: <Slideshow />,
      options: [
        {
          name: "My Presentations",
          link: "/presentation/mypresentations",
        },
        {
          name: "Create Presentation",
          link: "/presentation/create",
        },
      ],
    },
    {
      name: `${
        user?.lastName.length > 10
          ? user?.lastName.slice(0, 10) + "..."
          : user?.lastName
      }`,
      link: "/user",
      icon: (
        <Avatar
          alt="avatar"
          sx={{ width: 25, height: 25 }}
          src={user?.avatar}
        />
      ),
      options: [
        {
          name: "Profile",
          link: `/user/${user?._id}`,
        },
        {
          name: "Change Password",
          link: "/user/changepassword",
        },
        {
          name: "Logout",
          link: "/auth/login",
        },
      ],
    },
  ];
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearGroups());
    setAuthLocal(null);
    navigate("/auth/login");
  };
  let timeoutId = null;

  const handleClose = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setAnchorEl(null);
      setMenuName(null);
    }, 0);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuName(null);
  };

  const handleMenuEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <div className="Header__left">
          <div onClick={() => navigate("/")} className="Header__logo">
            <img
              className="logo"
              src={isSmallScreen ? logosmall : logo}
              alt="logo"
            />
          </div>
          <div className="Header__joinbox">
            <TextField
              id="outlined-basic"
              label="Presentation Code"
              variant="outlined"
              color="primary"
              size="small"
              autoComplete="off"
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: {
                  borderRadius: "25px",
                  backgroundColor: "white",
                  borderColor: "black",
                },
              }}
            />
            <Button
              variant="contained"
              style={{
                marginLeft: "10px",
                borderRadius: "25px",
                backgroundColor: "#0b5c6d",
                borderColor: "#0b5c6d",
              }}
              size="small"
            >
              Join
            </Button>
          </div>
        </div>
        <div className="Header__right">
          {isSmallScreen ? (
            <Toolbar
              sx={{
                paddingRight: 0,
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                  setMenuName("Menu");
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={Boolean(anchorEl)}
                onClose={() => {
                  setAnchorEl(null);
                  setMenuName(null);
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "250px",
                  },
                }}
              >
                {navbarItems.map((item, index) => {
                  return (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        {item.icon}
                        <Typography sx={{ marginLeft: "5px" }}>
                          {item.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {item.options.map((option, index) => {
                          return (
                            <div key={index}>
                              <Divider />
                              {option.name === "Logout" ? (
                                <MenuItem
                                  key={index}
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    handleLogout();
                                  }}
                                >
                                  <LogoutIcon />
                                  {option.name}
                                </MenuItem>
                              ) : (
                                <MenuItem
                                  key={index}
                                  onClick={() => {
                                    setAnchorEl(null);
                                    setMenuName(null);
                                    navigate(option.link);
                                  }}
                                >
                                  {option.name}
                                </MenuItem>
                              )}
                            </div>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Drawer>
            </Toolbar>
          ) : (
            navbarItems.map((item, index) => {
              return (
                <div key={index} style={{ display: "inline-block" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      zIndex: (theme) => theme.zIndex.modal + 1,
                      border: "none",
                      color: "white",
                      marginRight: "10px",
                      maxHeight: "40px",
                      fontSize: {
                        sm: "12px",
                        md: "14px",
                      },
                      "&:hover": {
                        border: "none",
                      },
                    }}
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget);
                      setMenuName(item.name);
                    }}
                    startIcon={item.icon}
                    className="Header__right__item"
                    onMouseEnter={(event) => {
                      setAnchorEl(event.currentTarget);
                      setMenuName(item.name);
                    }}
                    onMouseLeave={handleClose}
                  >
                    {item.name}
                  </Button>
                  {menuName === item.name && (
                    <Menu
                      id={`${item.name}-menu`}
                      anchorEl={anchorEl}
                      keepMounted={true}
                      open={Boolean(anchorEl)}
                      onClose={() => {
                        setAnchorEl(null);
                        setMenuName(null);
                      }}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                        onMouseEnter: handleMenuEnter,
                        onMouseLeave: handleMenuClose,
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      {item.options.map((option, index) => {
                        return option.name === "Logout" ? (
                          <div key={index}>
                            <Divider />
                            <MenuItem
                              key={index}
                              onClick={() => {
                                setAnchorEl(null);
                                handleLogout();
                              }}
                            >
                              <Button color="error" startIcon={<LogoutIcon />}>
                                Logout
                              </Button>
                            </MenuItem>
                          </div>
                        ) : (
                          <MenuItem
                            key={index}
                            onClick={() => {
                              setAnchorEl(null);
                              setMenuName(null);
                              navigate(option.link);
                            }}
                          >
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Header;
