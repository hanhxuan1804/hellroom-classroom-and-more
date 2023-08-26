import React, { useEffect } from "react";
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import { ListSlide, SlideDetail } from "../../component/presentation";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { presentationsS } from "../../redux/selector";
import { useMutation } from "@tanstack/react-query";
import { getPresentation, updatePresentationSlides } from "../../api";
import { useSnackbar } from "notistack";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";
import { setPresentations as setPresentationRedux } from "../../redux/slice/presentationSlice";
import ObjectId from "bson-objectid";

const sampleSlide = {
  _id: ObjectId(),
  name: "Slide 1",
  type: "multipleChoice",
  question: "What is the capital of Vietnam?",
  options: [
    { option: "Hanoi", count: 10 },
    { option: "Ho Chi Minh", count: 5 },
    { option: "Da Nang", count: 3 },
    { option: "Hue", count: 2 },
  ],
};

const EditPresentationPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const presentationId = useParams().presentationId;
  const presentations = useSelector(presentationsS).presentations;
  const presentationRedux = presentations.find(
    (presentation) => presentation._id === presentationId
  );
  const [list, setList] = useState(null);
  const [selected, setSelected] = useState(null);

  const mutation = useMutation({
    mutationFn: getPresentation,
    onSuccess: (data) => {
      const presentation = data.data.presentation;
      const slides = data.data.slides;
      presentation.slides = slides;
      dispatch(setPresentationRedux([...presentations, presentation]));
      if (slides.length === 0) {
        setList([sampleSlide]);
        setSelected(sampleSlide);
        enqueueSnackbar("Presentation is empty the sample slide is added", {
          variant: "warning",
        });
      } else {
        setList(
          slides.map((slide) => {
            return {
              _id: slide._id,
              name: slide.name,
              type: slide.type,
              question: slide.question,
              options: slide.options,
            };
          })
        );
        setSelected(slides[0]);
      }
    },
  });
  const updateMutation = useMutation({
    mutationFn: updatePresentationSlides,
    onSuccess: (data) => {
      const newPresentation = {
        ...presentationRedux,
        slides: data.data.slides,
      };
      dispatch(setPresentationRedux([...presentations, newPresentation]));
      enqueueSnackbar("Presentation is updated", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  useEffect(() => {
    if (presentationRedux) {
      const slides = presentationRedux.slides.map((element) => {
        return {
          _id: element._id,
          name: element.name,
          type: element.type,
          question: element.question,
          options: element.options,
        };
      });
      setList([...slides]);
      setSelected(slides[0]);
    } else {
      mutation.mutateAsync(presentationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateSlide = (slide) => {
    const newList = list.map((item) => {
      if (item._id === slide._id) {
        return slide;
      }
      return item;
    });
    setList(newList);
    setSelected(slide);
  };
  const handlePresentationShow = () => {
    savePresentation();
    navigate(`/presentation/${presentationId}/show`, {
      state: { slide: selected, list: list },
    });
  };
  const savePresentation = () => {
    const data = {
      _id: presentationId,
      slides: list,
    };
    updateMutation.mutateAsync(data);
  };

  if (mutation.isLoading) return <LoadingPage />;
  if (mutation.isError) return <ErrorPage error={mutation.error} />;

  return (
    <Grid container sx={{ maxWidth: "100vw", m: 0, p: 0 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={updateMutation.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item xs={12} md={3}>
        {list && (
          <ListSlide
            list={list}
            setList={setList}
            selected={selected}
            setSelected={setSelected}
            handlePresentationShow={handlePresentationShow}
          />
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        {selected && (
          <SlideDetail
            slide={selected}
            setSlide={setSelected}
            updateSlide={updateSlide}
            savePresentation={savePresentation}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default EditPresentationPage;
