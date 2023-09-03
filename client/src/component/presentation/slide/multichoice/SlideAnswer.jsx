import {
  Button,
  Grid,
  Select,
  Typography,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React from "react";

const SlideAnswer = (props) => {
  const slide = props.slide;
  const numberOption = slide.results.length;
  const Options = slide.results.map((option) => option.option);

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <Typography
          variant="h3"
          fontWeight={700}
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          {slide.question}
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <AnswerLayout
          numberOption={numberOption}
          Options={Options}
          handleAnswer={props.handleAnswer}
        />
      </div>
    </Container>
  );
};
const answerColor = {
  0: "#C71835",
  1: "#1257AE",
  2: "#F5A31A",
  3: "#1D9A5F",
};
const AnswerLayout = (props) => {
  const { numberOption, Options } = props;
  const [answer, setAnswer] = React.useState(0);
  switch (numberOption) {
    case 2:
      return (
        <Grid spacing={2} container>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(0)}
              bgcolor={answerColor[0]}
            >
              <Typography fontWeight={700} color="white">
                {Options[0]}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(1)}
              bgcolor={answerColor[1]}
            >
              <Typography fontWeight={700} color="white">
                {Options[1]}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    case 3:
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(0)}
              bgcolor={answerColor[0]}
            >
              <Typography fontWeight={700} color="white">
                {Options[0]}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(1)}
              bgcolor={answerColor[1]}
            >
              <Typography fontWeight={700} color="white">
                {" "}
                {Options[1]}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(2)}
              bgcolor={answerColor[2]}
            >
              <Typography fontWeight={700} color="white">
                {" "}
                {Options[2]}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    case 4:
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(0)}
              bgcolor={answerColor[0]}
            >
              <Typography fontWeight={700} color="white">
                {" "}
                {Options[0]}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(1)}
              bgcolor={answerColor[1]}
            >
              <Typography fontWeight={700} color="white">
                {" "}
                {Options[1]}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(2)}
              bgcolor={answerColor[2]}
            >
              <Typography fontWeight={700} color="white">
                {" "}
                {Options[2]}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={80}
              onClick={() => props.handleAnswer(3)}
              bgcolor={answerColor[3]}
            >
              <Typography fontWeight={700} color="white">
                {" "}
                {Options[3]}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    default:
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Answer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={answer}
              label="Answer"
              onChange={(e) => setAnswer(e.target.value)}
            >
              {Options.map((option, index) => (
                <MenuItem value={index}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              m: 1,
              minWidth: 120,
              backgroundColor: "#1D9A5F",
              color: "white",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#1D9A5F",
                color: "white",
                opacity: 0.8,
              },
            }}
            onClick={() => props.handleAnswer(answer)}
          >
            Submit
          </Button>
        </div>
      );
  }
};

export default SlideAnswer;
