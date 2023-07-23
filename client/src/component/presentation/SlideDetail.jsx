import React, { useEffect } from "react";
import {
  MultiChoiceSlideEdit,
  MultiChoiceSlideView,
} from "./slide/multichoice";
import { Grid } from "@mui/material";

const SlideDetail = (props) => {
  const { slide, updateSlide } = props;
  const type = slide.type;
  const [slideData, setSlideData] = React.useState(JSON.parse(JSON.stringify(slide)));
  const SlideView = type === "multichoice" ? MultiChoiceSlideView : null;
  const SlideEdit = type === "multichoice" ? MultiChoiceSlideEdit : null;
  const discardChanges = () => {
    setSlideData(JSON.parse(JSON.stringify(slide)));
  };
  useEffect(() => {
    setSlideData(JSON.parse(JSON.stringify(slide)));
  }, [slide]);
  if (type === "shortanswer") {
    return <div>Short Answer</div>;
  }
  return (
    <Grid container spacing={2} sx={{
      height: "100%",
    }}>
      <Grid item xs={12} md={8}>
        <SlideView slide={slideData} />
      </Grid>
      <Grid item xs={12} md={4}>
        <SlideEdit slide={slideData} setSlide={setSlideData} updateSlide={updateSlide}
          discardChanges={discardChanges}
         />
      </Grid>
    </Grid>
  );
};

export default SlideDetail;
