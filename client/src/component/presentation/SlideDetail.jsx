import {
  MultiChoiceSlideEdit,
  MultiChoiceSlideView,
} from "./slide/multichoice";
import { Grid } from "@mui/material";
import ErrorPage from "../../pages/common/ErrorPage";

const SlideView = (props) => {
  const type = props.type;
  if (type === "multipleChoice") {
    return <MultiChoiceSlideView {...props} />;
  }
  // add more slide type here

  return <ErrorPage />;
};
const SlideEdit = (props) => {
  const type = props.type;
  if (type === "multipleChoice") {
    return <MultiChoiceSlideEdit {...props} />;
  }
  // add more slide type here

  return <ErrorPage />;
};

const SlideDetail = (props) => {
  const { slide, updateSlide } = props;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: "100%",
      }}
    >
      <Grid item xs={12} md={8}>
        <SlideView type={slide.type} slide={slide} />
      </Grid>
      <Grid item xs={12} md={4}>
        <SlideEdit
          type={slide.type}
          slide={slide}
          setSlide={updateSlide}
          savePresentation={props.savePresentation}
        />
      </Grid>
    </Grid>
  );
};

export default SlideDetail;
