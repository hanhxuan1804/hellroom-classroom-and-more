import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../../api";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Avatar,
  Button,
  Input,
} from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";

const GroupsDataTemplate = [
  {
    id: 1,
    name: "Group 1",
    owner: "User 1",
  },
  {
    id: 2,
    name: "Group 2",
    owner: "User 2",
  },
  {
    id: 3,
    name: "Group 3",
    owner: "User 3",
  },
  {
    id: 4,
    name: "Group 1",
    owner: "User 1",
  },
  {
    id: 5,
    name: "Group 2",
    owner: "User 2",
  },
  {
    id: 6,
    name: "Group 3",
    owner: "User 3",
  },
  {
    id: 7,
    name: "Group 1",
    owner: "User 1",
  },
  {
    id: 8,
    name: "Group 2",
    owner: "User 2",
  },
  {
    id: 9,
    name: "Group 3",
    owner: "User 3",
  },
  {
    id: 10,
    name: "Group 1",
    owner: "User 1",
  },
  {
    id: 11,
    name: "Group 2",
    owner: "User 2",
  },
  {
    id: 12,
    name: "Group 3",
    owner: "User 3",
  },
  {
    id: 13,
    name: "Group 1",
    owner: "User 1",
  },
  {
    id: 14,
    name: "Group 2",
    owner: "User 2",
  },
  {
    id: 15,
    name: "Group 3",
    owner: "User 3",
  },
];

const GroupListPage = () => {
  const navigate = useNavigate();
  const [GroupsData, setGroupsData] = React.useState(GroupsDataTemplate);
  const { user, setUser } = useLocalStorage("user", null);
  // const { data, isLoading, error, refetch } = useQuery('groups', getGroups);

  // useEffect(() => {
  //     refetch();
  // }, [refetch]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
          Groups
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        <Typography fontStyle={"italic"} sx={{ mt: 2, mb: 2 }}>
            Search
        </Typography>
        <Input
          placeholder="Group Name"
          sx={{ ml: 2, mt: 2, mb: 2 }}
          onChange={(e) => {
            let data = GroupsDataTemplate.filter((group) =>
                group.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setGroupsData(data);
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {GroupsData.map((group) => (
          <Card
            key={group.id}
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
              navigate(`/groups/${group.id}`);
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
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
                <Typography variant="body2" color="text.secondary">
                  {group.owner}
                </Typography>
                <Avatar alt="avatar" src="https://source.unsplash.com/random" />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
export default GroupListPage;
