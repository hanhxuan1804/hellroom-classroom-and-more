
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../context/auth-context";
import { getUser } from "../../api";

const GroupsCard = ({ group, onGroupClick }) => {
    const { name, description, image, owner  } = group;
    const { data: OwnerUser } = useQuery("user", getUser(owner), {
        staleTime: Infinity,
    });
    const { user } = useAuth();
    const isOwner = user._id === owner;
    const handleGroupClick = () => {
        onGroupClick(group);
    }
    return (
        <Card sx={{ width: 345, height: 345, margin: "10px" }}>
            <CardActionArea onClick={handleGroupClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="group image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {isOwner && (
                <CardActions>
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                </CardActions>
            )}
        </Card>
    );
}

export default GroupsCard;


    