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
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getGroups, getUser } from "../../api";
import { authS, groupsS } from "../../redux/selector";
import ErrorPage from "../common/ErrorPage";
import LoadingPage from "../common/LoadingPage";
import { setGroups } from "../../redux/slice/groupSlice";

const GroupListPage = () => {
  const navigate = useNavigate();
  const user = useSelector(authS).user;
  const groups = useSelector(groupsS).groups;
  const [GroupsData, setGroupsData] = useState(groups);
  const [GroupsShow, setGroupsShow] = useState(groups);
  const { isLoading, error, data } = useQuery({
    queryKey: ["groups", user._id],
    queryFn: () => getGroups(user._id),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const fetchOwnerData = async () => {
        const changedGroups = data.data.groups.filter((group) => {
          const isExist = groups.find((g) => g._id === group._id);
          return !isExist;
        });

        const updatedGroups = await Promise.all(
          changedGroups.map(async (group) => {
            const owner = await getUser(group.owner);
            return {
              ...group,
              ownerData: owner.data,
            };
          })
        );

        setGroupsData([...GroupsData, ...updatedGroups]);
        setGroupsShow([...GroupsData, ...updatedGroups]);
        dispatch(setGroups([...GroupsData, ...updatedGroups]));
      };

      fetchOwnerData();
    }
    // eslint-disable-next-line
  }, [data]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  console.log(GroupsShow);
  return (
    <Container>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
            Groups
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
                GroupsData.filter((group) =>
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
