import { useEffect, useState } from "react";
import { Box, Container, Typography, Input, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { groupsS } from "../../redux/selector";
import GroupCard from "../../component/groups/GroupCard";

const GroupListPage = () => {
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
      {GroupsShow.length !== 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
        >
          {GroupsShow.map((group) => (
            <GroupCard group={group} key={group._id} />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          No Groups
        </Typography>
      )}
    </Container>
  );
};
export default GroupListPage;
