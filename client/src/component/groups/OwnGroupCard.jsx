import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Slideshow } from "@mui/icons-material";

const OwnGroupCard = (props) => {
  const { group, presentations } = props;
  const navigate = useNavigate();
  console.log(presentations);
  return (
    <div
      style={{
        height: "250x",
        width: "350px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Card
        sx={{
          height: 200,
          minWidth: 200,
          maxWidth: 350,
          mr: 0.5,
          cursor: "pointer",
          ":hover": {
            boxShadow: 4,
            transition: "box-shadow 0.3s ease-in-out",
            "& .MuiCardMedia-root": {
              transform: "scale(1.1)",
              transition: "transform 0.3s ease-in-out",
            },
          },
        }}
        onClick={() => {
          navigate(`/groups/${group._id}`);
        }}
      >
        <CardMedia
          component="img"
          height="100"
          image={group.background}
          alt="group background"
        />
        <CardContent
          sx={{
            height: 100,
            width: 200,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflowWrap: "break-word",
          }}
        >
          <Typography variant="h5" component="div">
            {group.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {group.description}
          </Typography>
        </CardContent>
      </Card>
      {presentations && presentations.length > 0 && (
        <div
          style={{
            height: "200px",
            width: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "120",
              height: "90",
              mr: 2,
              cursor: "pointer",
              ":hover": {
                boxShadow: 4,
                transition: "box-shadow 0.3s ease-in-out",
                "& .MuiCardMedia-root": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              },
            }}
            onClick={() => {
              navigate(`/presentations/${presentations[0]._id}/show`);
            }}
            title="Click to show presentation"
          >
            <div
              style={{
                height: "90px",
                width: "120px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                backgroundImage: `url(https://res.cloudinary.com/dcs2ih8fj/image/upload/v1693754840/how-to-start-a-presentation-header_k9snou.jpg)`,
                backgroundSize: "cover",
              }}
            >
              <Typography
                variant="caption"
                textAlign={"center"}
                color={"white"}
                fontWeight={700}
              >
                {presentations[0].name}
              </Typography>
              <Slideshow
                sx={{
                  color: "green",
                }}
              />
            </div>
          </Card>
          {presentations[1] && (
            <Card
              sx={{
                width: "120",
                height: "90",
                mr: 2,
                cursor: "pointer",
                ":hover": {
                  boxShadow: 4,
                  transition: "box-shadow 0.3s ease-in-out",
                  "& .MuiCardMedia-root": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                  },
                },
              }}
              onClick={() => {
                navigate(`/presentations/${presentations[1]._id}/show`);
              }}
              title="Click to show presentation"
            >
              <div
                style={{
                  height: "90px",
                  width: "120px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  backgroundImage: `url(https://res.cloudinary.com/dcs2ih8fj/image/upload/v1693754840/how-to-start-a-presentation-header_k9snou.jpg)`,
                  backgroundSize: "cover",
                }}
              >
                <Typography
                  variant="caption"
                  textAlign={"center"}
                  color={"white"}
                  fontWeight={700}
                >
                  {presentations[1].name}
                </Typography>
                <Slideshow
                  sx={{
                    color: "green",
                  }}
                />
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnGroupCard;
