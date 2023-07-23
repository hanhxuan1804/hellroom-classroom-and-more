import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
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

const getFileExtension = (filename) => {
  if (!filename) return "png";
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

const SamplePostData = [
  {
    id: 1,
    title: "Post 1",
    content: "This is post 1",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is post 2",
    file: "https://source.unsplash.com/random",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is post 3",
  },
  {
    id: 4,
    title: "Post 4",
    content: "This is post 4",
    file: "https://source.unsplash.com/random",
  },
  {
    id: 5,
    title: "Post 5",
    content: "This is post 5",
    file: "https://source.unsplash.com/random",
  },
];

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const GroupData = {
    id: groupId,
    name: "Group 1",
    owner: "User 1",
    description: "This is a group",
    members: ["User 1", "User 2", "User 3"],
    background: "https://source.unsplash.com/random",
  };
  const [isPost, setIsPost] = useState(false);
  const [posts, setPosts] = useState(SamplePostData);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handlePost = (post) => {
    setPosts([post, ...posts]);
    setIsPost(false);
  };
  //   const [group, setGroup] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const getGroup = async () => {
  //       try {
  //         const { data } = await axios.get(`/api/groups/${id}`);
  //         setGroup(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     getGroup();
  //   }, [id]);

  //   if (loading) return <Loading />;
  //   if (error) return <Error error={error} />;
  const hanhdleEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          height: 200,
          background: `url(${GroupData.background})`,
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
          groupData={GroupData}
        />
        <Typography
          variant="h3"
          sx={{ color: "white", mb: 2, ml: 2 }}
          fontWeight="bold"
        >
          {GroupData.name}
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
                {GroupData.id}
              </Typography>
              <IconButton size="small" color="primary">
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
                alert("Generate QR");
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
                src="https://source.unsplash.com/random"
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
    </Container>
  );
};

export default GroupDetailsPage;
