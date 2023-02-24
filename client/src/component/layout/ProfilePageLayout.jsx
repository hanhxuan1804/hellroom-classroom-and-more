    import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    useMediaQuery,
    } from "@mui/material";
    import { useTheme } from "@mui/material/styles";
    import { Outlet, useNavigate, useLocation } from "react-router-dom";
    import { Edit, EditOff } from "@mui/icons-material";
    import { useEffect, useState } from "react";
    import { useAuth } from "../../context/auth-context";


    function ProfilePageLayout() {
    const user = useAuth().user;
    const navigate=useNavigate();
    const [isEidt, setIsEdit] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/user/edit") {
            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    }, [location.pathname]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Container maxWidth="lg">
        <Card sx={{ marginTop: "20px"}}>
            <Grid container spacing={2} >
            <Grid item xs={12} sm={6} >
            <CardHeader  title={`${user.firstName} ${user.lastName}`}/>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'center', padding:0 }}>
               {!isSmallScreen && <Button
                variant="outlined"
                style={{
                    borderColor: "#778899",
                    height: "30px",
                    marginRight: "10px",
                    padding: "0 10px",
                }}
                size="small"
                color={isEidt ? "error" : "primary"}
                startIcon={isEidt ? <EditOff /> : <Edit />}
                onClick={() => {
                    if (isEidt) {
                    navigate(-1);
                    } else {
                    navigate("edit");
                    }
                }}
                >
               
                {isEidt ? "Cancel" : "Edit Profile"}
                </Button>}
            </Grid>
            </Grid>
            <Divider />
            <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar src={user.avatar} sx={{ width: 150, height: 150 }}>
                    {user.firstName.charAt(0)}
                    </Avatar>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                    variant="outlined"
                    style={{
                        borderColor: "#778899",
                    }}
                    size="small"
                    >
                    Update Avatar
                    </Button>
                </Box>
                </Grid>
                <Outlet />
            </Grid>
            {isSmallScreen && !isEidt && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                    variant="outlined"
                    style={{
                    borderColor: "#778899",
                    height: "30px",
                    marginRight: "10px",
                    padding: "0 10px",
                    }}
                    size="small"
                    color={isEidt ? "error" : "primary"}
                    startIcon={isEidt ? <EditOff /> : <Edit />}
                    onClick={() => {
                    if (isEidt) {
                        navigate(-1);
                    } else {
                        navigate("edit");
                    }
                    }}
                >
                    {isEidt ? "Cancel" : "Edit Profile"}
                </Button>
                </Box>
            )}
            </CardContent>
        </Card>
        </Container>
    );
    }

    export default ProfilePageLayout;
