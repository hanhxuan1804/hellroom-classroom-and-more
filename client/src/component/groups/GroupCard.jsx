import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GroupCard = (props) => {
  const navigate = useNavigate();
  const { group } = props;
  return (
    <Card
      sx={{
        maxWidth: 250,
        minWidth: 250,
        mr: 2,
        mb: 2,
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
        height="140"
        image={group.background}
        alt="random"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {group.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            fontStyle={"italic"}
            fontWeight={"bold"}
          >
            {group.description}
          </Typography>
          <Avatar alt="avatar" src={group.ownerData.avatar} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
