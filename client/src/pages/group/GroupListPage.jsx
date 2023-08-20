import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Avatar,
  Input,
  Grid,
  } from "@mui/material";
import { useSelector } from "react-redux";
import { groupsS } from "../../redux/selector";


const GroupListPage = () => {
  const navigate = useNavigate();
  const groups = useSelector(groupsS).groups;
  const [GroupsShow, setGroupsShow] = useState(groups);
  useEffect(() => {
    setGroupsShow([...groups]);
  }, [groups]);

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
            All Groups
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography fontStyle={"italic"} sx={{ mt: 2, mb: 2 }}>
            Search
          </Typography>
          <Input
            placeholder="Group Name"
            sx={{ ml: 2, mt: 2, mb: 2 }}
            onChange={(e) => {
              setGroupsShow(
                groups.filter((group) =>
                  group.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
      >
        {GroupsShow.map((group) => (
          <Card
            key={group._id}
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
        ))}
      </Box>
    </Container>
  );
};
export default GroupListPage;
