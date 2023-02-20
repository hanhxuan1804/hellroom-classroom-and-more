import "./Header.css";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Menu, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../../context/auth-context";
import LogoutIcon from '@mui/icons-material/Logout';
import { AccountCircle, Groups3, Slideshow } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b5c6d",
    },
  },
});

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuName, setMenuName] = useState(null);
  const navbarItems = [
    {
      name: "Group",
      link: "/group",
      icon: <Groups3/>,
      options: [
        {
          name: "Join Group",
          link: "/group/join",
        },
        {
          name: "My Groups",
          link: "/group/mygroups",
        },
        {
          name: "Create Group",
          link: "/group/create",
        },
      ],
    },
    {
      name: "Presentation",
      link: "/presentation",
      icon: <Slideshow/>,
      options: [
        {
          name: "Join Presentation",
          link: "/presentation/join",
        },
        {
          name: "My Presentations",
          link: "/presentation/my",
        },
        {
          name: "Create Presentation",
          link: "/presentation/create",
        },
      ],
    },
    {
      name: `${auth.user?.lastName}`,
      link: "/user",
      icon: <AccountCircle/>,
      options: [
        {
          name: "Profile",
          link: "/user/profile",
        },
        {
          name: "Logout",
          link: "/auth/login",
        },
      ],
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <div className="Header__left">
          <div onClick={() => navigate("/")} className="Header__logo">
            <img className="logo" src={logo} alt="logo" />
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
            >
              Join
            </Button>
          </div>
        </div>
        <div className="Header__right">
          {navbarItems.map((item, index) => {
            return (
              <div key={index}>
                <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: "20px",
                    marginRight: "10px",
                  }}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setMenuName(item.name);
                  }}
                  startIcon={item.icon}
                  className="Header__right__item"
                >
                  {item.name}
                </Button>
                {menuName === item.name && (
                  <Menu
                    id={`${item.name}-menu`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => {
                      setAnchorEl(null);
                      setMenuName(null);
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {item.options.map((option, index) => {
                      return option.name === "Logout" ? (
                        <div key={index}>
                          <Divider />
                          <MenuItem
                            key={index}
                            onClick={() => {
                              auth.logout();
                              setAnchorEl(null);
                              navigate(option.link);
                            }}
                          >
                            <Button color="error" startIcon={<LogoutIcon/>}>Logout</Button>
                          </MenuItem>
                        </div>
                      ) : (
            
                        <MenuItem
                          key={index}
                          onClick={() => {
                            setAnchorEl(null);
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
          })}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Header;
