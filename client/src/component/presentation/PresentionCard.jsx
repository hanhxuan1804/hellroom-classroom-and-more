import { ArrowForward, Public, PublicOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import React from "react";

const PresentionCard = (props) => {
  const { presentation } = props;
  console.log(presentation);
  const typeColors = {
    card: {
      public: "#4CAF50", // Green for public presentations
      private: "#1976D2", // Blue for private presentations
    },
    present: {
      public: "#84d885", // Green for public presentations
      private: "#689ed1", // Blue for private presentations
    },
  };
  //"2023-08-28T09:24:24.085Z" convert to date time
  const date = new Date(presentation.createdAt).toLocaleString();
  const cardColor = typeColors.card[presentation.type] || "#888"; // Default color if type is not recognized
  const presentColor = typeColors.present[presentation.type] || "#888"; // Default color if type is not recognized
  return (
    <Card
      sx={{
        width: 275,
        height: 200,
        position: "relative",
        margin: 1,
        backgroundColor: "grey.100",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <>
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            marginTop: 1,
            color: "black",
          }}
          onClick={() => props.onEdit(presentation)}
        >
          <svg
            className="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </IconButton>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {presentation.type === "public" ? (
                  <>
                    <Public sx={{ marginRight: 1 }} />
                    <Typography color="inherit">Public Presentation</Typography>
                  </>
                ) : (
                  <>
                    <PublicOff sx={{ marginRight: 1 }} />
                    <div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography color="inherit">
                        Private Presentation
                      </Typography>
                      <Typography color="inherit">
                        {"Group: " +
                          presentation.group.name.slice(0, 6) +
                          "..."}
                      </Typography>
                    </div>
                  </>
                )}
              </Box>
            </React.Fragment>
          }
          arrow
          placement="top"
        >
          <CardHeader
            title={presentation.name}
            subheader={date}
            avatar={
              <Avatar
                sx={{
                  backgroundColor: cardColor,
                }}
              >
                {presentation.type === "public" ? <Public /> : <PublicOff />}
              </Avatar>
            }
            sx={{
              paddingRight: 3,
            }}
          ></CardHeader>
        </HtmlTooltip>
        <CardContent
          sx={{
            paddingY: 1,
            paddingX: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={16}
            fontWeight={600}
          >
            {presentation.slides.length} slides
          </Typography>
        </CardContent>
        <CardActionArea onClick={() => props.onClick(presentation)}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: presentColor,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={12}
              fontWeight={600}
            >
              Present
            </Typography>
            <ArrowForward />
          </CardContent>
        </CardActionArea>
      </>
    </Card>
  );
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default PresentionCard;
