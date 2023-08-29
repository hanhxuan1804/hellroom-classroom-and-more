import { useEffect, useState } from "react";
import PresentationCard from "../../component/presentation/PresentionCard";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box, Container, Input, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getPresentations } from "../../api";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";
// const sampleData = [
//   {
//     _id: "0",
//     name: "Mobile App Development Workshop",
//     type: "private",
//     group: "6125c8f6b8ebea001c8e88d7",
//     owner: "6125c8f6b8ebea001c8e88e7",
//     slides: [
//       "6125c8f6b8ebea001c8e8902",
//       "6125c8f6b8ebea001c8e8903",
//       "6125c8f6b8ebea001c8e8904",
//     ],
//     createdAt: new Date("2023-07-25T14:00:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "1",
//     name: "Data Visualization Techniques",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d5",
//     owner: "6125c8f6b8ebea001c8e88e5",
//     slides: ["6125c8f6b8ebea001c8e88fd", "6125c8f6b8ebea001c8e88fe"],
//     createdAt: new Date("2023-08-05T16:30:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "2",
//     name: "Artificial Intelligence Ethics",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d8",
//     owner: "6125c8f6b8ebea001c8e88e8",
//     slides: ["6125c8f6b8ebea001c8e8905", "6125c8f6b8ebea001c8e8906"],
//     createdAt: new Date("2023-07-20T09:30:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "3",
//     name: "Introduction to JavaScript",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d0",
//     owner: "6125c8f6b8ebea001c8e88e0",
//     slides: [
//       "6125c8f6b8ebea001c8e88f0",
//       "6125c8f6b8ebea001c8e88f1",
//       "6125c8f6b8ebea001c8e88f2",
//     ],
//     createdAt: new Date("2023-08-28T12:00:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "4",
//     name: "Web Development Fundamentals",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d2",
//     owner: "6125c8f6b8ebea001c8e88e2",
//     slides: ["6125c8f6b8ebea001c8e88f5", "6125c8f6b8ebea001c8e88f6"],
//     createdAt: new Date("2023-08-20T10:45:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "5",
//     name: "Machine Learning Basics",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d3",
//     owner: "6125c8f6b8ebea001c8e88e3",
//     slides: [
//       "6125c8f6b8ebea001c8e88f7",
//       "6125c8f6b8ebea001c8e88f8",
//       "6125c8f6b8ebea001c8e88f9",
//     ],
//     createdAt: new Date("2023-08-15T14:20:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "6",
//     name: "Data Visualization Techniques",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d5",
//     owner: "6125c8f6b8ebea001c8e88e5",
//     slides: ["6125c8f6b8ebea001c8e88fd", "6125c8f6b8ebea001c8e88fe"],
//     createdAt: new Date("2023-08-05T16:30:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "7",
//     name: "Artificial Intelligence Ethics",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d8",
//     owner: "6125c8f6b8ebea001c8e88e8",
//     slides: ["6125c8f6b8ebea001c8e8905", "6125c8f6b8ebea001c8e8906"],
//     createdAt: new Date("2023-07-20T09:30:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "17",
//     name: "Cloud Computing Technologies",
//     type: "private",
//     group: "6125c8f6b8ebea001c8e88d9",
//     owner: "6125c8f6b8ebea001c8e88e9",
//     slides: [
//       "6125c8f6b8ebea001c8e8907",
//       "6125c8f6b8ebea001c8e8908",
//       "6125c8f6b8ebea001c8e8909",
//     ],
//     createdAt: new Date("2023-07-15T13:15:00Z"),
//     isDeleted: false,
//   },
//   {
//     _id: "18",
//     name: "Introduction to JavaScript",
//     type: "public",
//     group: "6125c8f6b8ebea001c8e88d0",
//     owner: "6125c8f6b8ebea001c8e88e0",
//     slides: [
//       "6125c8f6b8ebea001c8e88f0",
//       "6125c8f6b8ebea001c8e88f1",
//       "6125c8f6b8ebea001c8e88f2",
//     ],
//     createdAt: new Date("2023-08-28T12:00:00Z"),
//     isDeleted: false,
//   },
// ];

const PresentationsPage = () => {
  const [presentations, setPresentations] = useState([]);
  const [presentationsShow, setPresentationsShow] = useState([]);
  const mutation = useMutation({
    mutationFn: getPresentations,
    onSuccess: (data) => {
      setPresentations(data.data.presentations);
      setPresentationsShow(data.data.presentations);
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line
  }, []);
  const handleEdit = (presentation) => {
    navigate(`/presentation/${presentation._id}/edit`);
  };
  const handleView = (presentation) => {
    navigate(`/presentation/${presentation._id}/show`,
    {state: {list: presentation.slides}});
  };
  if (mutation.isLoading) return <LoadingPage />;
  if (mutation.isError)
    return <ErrorPage error={JSON.stringify(mutation.error)} />;
  return (
    <Container>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
            All Presentations
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
              setPresentationsShow(
                presentations.filter((presentation) =>
                  presentation.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
        </Grid>
      </Grid>
      {presentationsShow?.length !== 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
        >
          {presentationsShow?.map((presentation) => (
            <PresentationCard
              presentation={presentation}
              key={presentation._id}
              onEdit={handleEdit}
              onClick={handleView}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          No Presentations
        </Typography>
      )}
    </Container>
  );
};

export default PresentationsPage;
