import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  useMediaQuery,
  Skeleton,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authS, groupsS } from "../../redux/selector";
import { Link, useNavigate } from "react-router-dom";
import redhell from "../../assets/images/redhell.png";
import LoadingPage from "../common/LoadingPage";
import OwnGroupCard from "../../component/groups/OwnGroupCard";
import { useMutation } from "@tanstack/react-query";
import { getPresentations } from "../../api";

const HomePage = () => {
  const navigate = useNavigate();
  const { loading, groups } = useSelector(groupsS);
  const user = useSelector(authS).user;
  const media = useMediaQuery("(max-width:600px)");
  const [presentations, setPresentations] = React.useState([]);
  const mutation = useMutation({
    mutationFn: getPresentations,
    onSuccess: (data) => {
      console.log(data.data.presentations);
      setPresentations(data.data.presentations);
    },
  });
  const [listOwnGroup, setListOwnGroup] = React.useState(
    groups.filter((group) => group.owner === user?._id)
  );
  // eslint-disable-next-line no-unused-vars
  const [listOtherGroup, setListOtherGroup] = React.useState(
    groups.filter((group) => group.owner !== user?._id)
  );
  const [recentActivity] = React.useState([]);
  useEffect(() => {
    if (groups.length > 0) {
      setListOwnGroup(groups.filter((group) => group.owner === user?._id));
      setListOtherGroup(groups.filter((group) => group.owner !== user?._id));
    }
  }, [groups, user?._id]);
  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingPage />;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={8}
          borderRight={media ? 0 : 1}
          borderColor="grey.500"
          style={{ paddingRight: "10px", marginTop: "20px" }}
        >
          {groups && groups.length > 0 ? (
            <>
              <Box height={300}>
                <Typography variant="h6" gutterBottom component="div">
                  My groups
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    overflowX: "auto",
                  }}
                >
                  {mutation.isLoading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection={"row"}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={350}
                        height={200}
                        style={{ margin: "10px" }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={350}
                        height={200}
                        style={{ margin: "10px" }}
                      />
                    </Box>
                  ) : (
                    listOwnGroup.map((group) => (
                      <>
                        <OwnGroupCard
                          key={group._id}
                          group={group}
                          presentations={presentations.filter(
                            (presentation) =>
                              presentation.type === "private" &&
                              presentation.group?._id === group._id
                          )}
                        />
                        
                      </>
                    ))
                  )}
                </div>
              </Box>
              <Box height={300}>
                <Typography variant="h6" gutterBottom component="div">
                  Other groups
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  There is no other group
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              <img
                src={redhell}
                alt="redhell"
                style={{ width: "40%", height: "40%", marginTop: "10px" }}
              />
              <div>
                <Typography
                  variant="caption"
                  display="block"
                  style={{
                    margin: "10px 0",
                  }}
                >
                  You have not joined any group yet
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to="/groups/create"
                    style={{ textDecoration: "none", marginBottom: "3.5px" }}
                  >
                    Create a group
                  </Link>
                  <Typography display="block" style={{ margin: "0 10px" }}>
                    or
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/groups/join")}
                  >
                    Join a group
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom component="div" align="center">
            Recent Activity
          </Typography>
          {recentActivity.length > 0 ? (
            <>
              <Box height={300}></Box>
            </>
          ) : (
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              align="center"
            >
              There is no recent activity
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
