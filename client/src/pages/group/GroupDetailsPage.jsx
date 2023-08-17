import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Edit, Fullscreen } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import TextEditor from "../../component/groups/TextEditor";
import { useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import GroupEdit from "../../component/groups/GroupEdit";
import { getGroupPosts, createGroupPost } from "../../api";
import { useSelector } from "react-redux";
import { authS, groupsS } from "../../redux/selector";
import { useQuery, useMutation } from "@tanstack/react-query";

const getFileExtension = (filename) => {
  if (!filename) return "png";
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const groups = useSelector(groupsS).groups;
  const groupData = groups.find((group) => group._id === groupId);
  const [showCode, setShowCode] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const user = useSelector(authS).user;
  const postQuery = useQuery(["group", groupId, "posts"], async () => {
    const result = await getGroupPosts(groupId);
    return result;
  });
  const postMutation = useMutation((post) => {
    return createGroupPost(groupId, post);
  });
  const handlePost = (post) => {
    postMutation.mutate(post);
    setIsPost(false);
  };

  const hanhdleEdit = () => {
    setIsEditOpen(true);
  };
  if (!groupData) return <div>Group not found</div>;
  const isMember = groupData.members?.includes(user._id);
  if (!isMember) return <div>Not a member</div>;
  const inviteLink = `${window.location.origin}/groups/join/${groupData.code}`;
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
        <GroupEdit
          open={isEditOpen}
          handleClose={() => setIsEditOpen(false)}
          groupData={groupData}
        />
        <Typography
          variant="h3"
          sx={{ color: "white", mb: 2, ml: 2 }}
          fontWeight="bold"
        >
          {groupData.name}
        </Typography>
      </Paper>
      <Grid container spacing={2} sx={{ mt: 2 }}>
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
          {postQuery.data?.data.groupPost?.map((post) => (
            <Card
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: 40, height: 40, ml: 2, mt: 1, mb: 1 }}
                  src="https://source.unsplash.com/random"
                />
                <Typography sx={{ ml: 2, fontWeight: "bold" }}>
                  {post.title}
                </Typography>
                <Typography sx={{ ml: 2 }}>{post.content}</Typography>
              </Box>
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
              {groupData.name + ' : '} 
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
    </Container>
  );
};

export default GroupDetailsPage;
