import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Edit, Fullscreen, MoreHoriz, MoreVert } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../../component/groups/TextEditor";
import { useEffect, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import GroupEdit from "../../component/groups/GroupEdit";
import { getGroupPosts, createGroupPost, getGroupMembers } from "../../api";
import { useSelector } from "react-redux";
import { authS, groupsS } from "../../redux/selector";
import { useQuery, useMutation } from "@tanstack/react-query";
import TabPanel from "../../component/TabPanel";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";
import { getGroup } from "../../api";
import { useDispatch } from "react-redux";
import { updateGroup } from "../../redux/slice/groupSlice";

const getFileExtension = (filename) => {
  if (!filename) return "png";
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const dispath = useDispatch();
  const groups = useSelector(groupsS).groups;
  const groupDataR = groups.find((group) => group._id === groupId);
  const [groupData, setGroupData] = useState(groupDataR);
  const groupMutation = useMutation(getGroup);
  useEffect(() => {
    if (groupDataR) setGroupData(groupDataR);
    else {
      async function fetchGroup() {
        const result = await groupMutation.mutateAsync(groupId);
        setGroupData(result.data.group);
      }
      fetchGroup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const [showCode, setShowCode] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [options, setOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery({
    queryKey: ["groups-members", groupData?._id],
    queryFn: () => getGroupMembers(groupData?._id),
  });
  useEffect(() => {
    if (data) {
      const fetchOwnerData = async () => {
        const updatedMembers = data.data.members;
        const destmembers = updatedMembers.map((member) => {
          return {
            _id: member._id,
            name: member.firstName + " " + member.lastName,
            avatar: member.avatar,
            role:
              member._id === groupData.owner
                ? "Owner"
                : groupData.coowners.includes(member._id)
                ? "Co-owner"
                : "Member",
          };
        });
        setMembers(destmembers);
      };
      fetchOwnerData();
    }
    // eslint-disable-next-line
  }, [data]);

  const user = useSelector(authS).user;
  const postQuery = useQuery({
    queryKey: ["group-posts", groupData?._id],
    queryFn: () => getGroupPosts(groupData?._id),
  });
  useEffect(() => {
    if (postQuery.data) {
      const fetchOwnerData = async () => {
        const updatedPosts = postQuery.data.data.groupPost;
        const destPosts = updatedPosts.map((post) => {
          return {
            _id: post._id,
            title: post.title,
            content: post.content,
            file: post.file,
            date: new Date(post.createdAt).toLocaleString(),
            owner: post.owner,
          };
        });
        destPosts.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setPosts(destPosts);
      };
      fetchOwnerData();
    }
    // eslint-disable-next-line
  }, [postQuery.data]);
  const postMutation = useMutation({
    mutationFn: createGroupPost,
    onSuccess: () => {
      setIsPost(false);
    },
  });
  const handlePost = async (post) => {
    const postData = {
      ...post,
      group: groupId,
      date: new Date().toLocaleString(),
      owner: {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        avatar: user.avatar,
      }
    };
    await postMutation.mutate(postData);
    setPosts([postData, ...posts]);
  };

  const hanhdleEdit = () => {
    setIsEditOpen(true);
  };
  const handleEditSubmit = (data) => {
    const updatedGroupD = {
      ...groupData,
      name: data.groupName,
      description: data.groupDescription,
      background: data.groupImage,
    };
    dispath(updateGroup(updatedGroupD));
  };
  if (groupMutation.isLoading) return <LoadingPage />;
  if (groupMutation.isError) return <ErrorPage />;
  if (!groupData) return <div>Group not found</div>;
  const isMember = groupData.members?.includes(user._id);
  if (!isMember) return <div>Not a member</div>;
  const inviteLink = `${window.location.origin}/groups/join/${groupData.code}`;
  const isOwner = groupData.owner === user._id;
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          height: 200,
          background: `url(${groupData.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {isOwner && (
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#0b5c6d",
            }}
            onClick={hanhdleEdit}
            startIcon={<Edit />}
          >
            Edit
          </Button>
        )}
        <GroupEdit
          open={isEditOpen}
          handleClose={() => setIsEditOpen(false)}
          groupData={groupData}
          handleEditSubmit={handleEditSubmit}
        />
        <Typography
          variant="h3"
          sx={{ color: "white", mb: 2, ml: 2 }}
          fontWeight="bold"
        >
          {groupData.name}
        </Typography>
        <IconButton
          size="large"
          sx={{ mb: 2 }}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setOptions(true);
          }}
        >
          <MoreHoriz sx={{ color: "white" }} />
        </IconButton>
        {options && (
          <Menu
            anchorEl={anchorEl}
            open={options}
            onClose={() => setOptions(false)}
          >
            <MenuItem
              key="1"
              onClick={() => {
                setOptions(false);
              }}
            >
              Leave group
            </MenuItem>
            <MenuItem
              key="2"
              onClick={() => {
                setOptions(false);
              }}
            >
              Invite by mail
            </MenuItem>
          </Menu>
        )}
      </Paper>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => {
          setTabValue(newValue);
        }}
        sx={{ mt: 1 }}
        centered
      >
        <Tab value={0} label="Home"></Tab>
        <Tab value={1} label="Members"></Tab>
      </Tabs>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Card sx={{ p: 1, mt: 2, boxShadow: 2 }}>
            <Typography fontSize={14} fontWeight={"bold"}>
              Group code:
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={16} fontWeight={"bold"} color={"#3367d5"}>
                {groupData.code}
              </Typography>
              <IconButton
                size="small"
                color="primary"
                onClick={() => {
                  setShowCode(true);
                }}
              >
                <Fullscreen />
              </IconButton>
            </div>
            <Typography
              fontSize={14}
              fontStyle={"italic"}
              color={"#3367d5"}
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "#0b5c6d",
                },
              }}
              onClick={() => {
                setShowQR(true);
              }}
            >
              Generate QR
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TabPanel value={tabValue} index={0}>
            {isPost ? (
              <TextEditor handlePost={handlePost} setIsPost={setIsPost} />
            ) : (
              <Card
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  boxShadow: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                  ":hover": {
                    background: "#e0e0e0",
                  },
                }}
                onClick={() => {
                  setIsPost(true);
                }}
              >
                <Avatar
                  sx={{ width: 40, height: 40, ml: 2, mt: 1, mb: 1 }}
                  src={user.avatar}
                />

                <Typography
                  sx={{
                    ml: 2,
                    cursor: "pointer",
                    ":hover": {
                      color: "#0b5c6d",
                    },
                  }}
                >
                  Post something to the group
                </Typography>
              </Card>
            )}
            {posts.map((post) => (
              <Card
                key={post._id}
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                {post.owner.id === user._id && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        // show mo}re options
                      }}
                      >
                        <MoreVert sx={{ color: "black" }} />
                      </IconButton>
                  </div>)
                  }
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: 40, height: 40, ml: 2, mt: 1, mb: 1 }}
                    src={post.owner.avatar}
                  />
                  <div>
                    <Typography sx={{ ml: 2, fontWeight: "bold" }}>
                      {post.owner.name}
                    </Typography>
                    <Typography sx={{ ml: 2, fontSize: 12 }}>
                      {post.date}
                    </Typography>
                  </div>
                </Box>
                <Grid
                  container
                  spacing={2}
                  mb={2}
                >
                  <Grid item xs={12} sm={3}>
                    <Typography
                      sx={{
                        ml: 2,
                        mt: 2,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {post.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography sx={{ ml: 2, mt: 2, fontSize: 14 }}>
                      {post.content}
                    </Typography>
                  </Grid>
                </Grid>
                {post.file && (
                  <a href={post.file.path} download>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: 48, margin: 10 }}>
                        <FileIcon
                          extension={getFileExtension(post.file.name)}
                          {...defaultStyles[getFileExtension(post.file.name)]}
                        />
                      </div>
                      <div>{post.file.name}</div>
                    </div>
                  </a>
                )}
              </Card>
            ))}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Card sx={{ p: 1, mt: 2, boxShadow: 2 }}>
              <Typography fontSize={14} fontWeight={"bold"}>
                Members:
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {members?.map((member) => (
                  <div
                    key={member._id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      ":hover": {
                        boxShadow: 2,
                      },
                    }}
                    onClick={() => {
                      navigate("/user/" + member._id);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{ width: 40, height: 40, ml: 2, mt: 1, mb: 1 }}
                        src={member.avatar}
                      ></Avatar>
                      <Typography fontSize={16} fontWeight={"bold"} ml={2}>
                        {member.name}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize={16} fontWeight={"bold"}>
                        {member.role}
                      </Typography>
                      <IconButton size="small" color="primary">
                        <MoreVert sx={{ color: "black" }} />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabPanel>
        </Grid>
      </Grid>
      <Dialog
        open={showCode}
        onClose={() => setShowCode(false)}
        maxWidth="md"
        fullWidth
      >
        <Paper sx={{ p: 2 }}>
          <Typography
            fontSize={54}
            color={"#3367d5"}
            fontWeight="bold"
            align="center"
            justifyItems={"center"}
          >
            {groupData.code}
          </Typography>
        </Paper>
      </Dialog>
      <Dialog
        open={showQR}
        onClose={() => setShowQR(false)}
        maxWidth="md"
        fullWidth
      >
        <Paper
          sx={{
            p: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontSize={14} fontStyle={"italic"} mb={2}>
            Scan to join group
          </Typography>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inviteLink}`}
            alt="qr"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontSize={14}
              fontWeight={"bold"}
              color={"#3367d5"}
              mt={2}
            >
              {groupData.name + " : "}
            </Typography>
            <Typography
              fontSize={20}
              fontWeight={"bold"}
              color={"#3367d5"}
              mt={2}
              pl={2}
            >
              {groupData.code}
            </Typography>
          </div>
        </Paper>
      </Dialog>
      <Backdrop
        open={postMutation.isLoading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default GroupDetailsPage;
