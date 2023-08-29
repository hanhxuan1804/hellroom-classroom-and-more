const Presentation = require("../../mongooseModel/Presentation");
const Slide = require("../../mongooseModel/Slide");
const Group = require("../../mongooseModel/Group");

exports.getPresentations = async (req, res) => {
  const userId = req.user._id;
  try {
    const presentations = await Presentation.find({
      owner: userId,
      isDeleted: false,
    });
    if (presentations.length !== 0) {
      for (const presentation of presentations) {
        const slides = await Slide.find({
          presentation: presentation._id,
          isDeleted: false,
        });
        presentation.slides = slides;
        const group = await Group.findById(presentation.group);
        presentation.group = group;
      }
    }
    res.status(200).send({
      presentations: presentations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createPresentation = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const presentation = await Presentation.create(data);
    const sampleSlide = {
      name: "Sample Slide",
      type: "multipleChoice",
      question: "Sample Question",
      options: [
        { option: "Sample Option 1", count: Math.floor(Math.random() * 100) },
        { option: "Sample Option 2", count: Math.floor(Math.random() * 100) },
        { option: "Sample Option 3", count: Math.floor(Math.random() * 100) },
        { option: "Sample Option 4", count: Math.floor(Math.random() * 100) },
      ],
      history: [],
      presentation: presentation._id,
    };
    const slide = await Slide.create(sampleSlide);
    presentation.slides.push(slide._id);
    if (presentation.type === "public") {
      presentation.group = null;
    }
    await presentation.save();
    res.status(200).send({
      presentation: presentation,
      slides: [slide],
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getPresentation = async (req, res) => {
  const presentationId = req.params.presentationId;
  try {
    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      res.status(404).send({ message: "Presentation not found" });
    }
    const slides = await Slide.find({
      presentation: presentationId,
      isDeleted: false,
    });
    res.status(200).send({
      presentation: presentation,
      slides: slides,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updatePresentationSlides = async (req, res) => {
  const data = req.body;
  try {
    const presentation = await Presentation.findById(data._id);
    if (!presentation) {
      return res.status(404).send({ message: "Presentation not found" });
    }

    const slides = await Slide.find({
      presentation: data._id,
      isDeleted: false,
    });

    const updatedSlides = [];

    for (const element of data.slides) {
      const existingSlide = slides.find((slide) =>
        slide._id.equals(element._id)
      );

      if (!existingSlide) {
        element.presentation = data._id;
        const newSlide = await Slide.create(element);
        updatedSlides.push(newSlide);
      } else {
        await Slide.findByIdAndUpdate(existingSlide._id, element);
        updatedSlides.push({ ...existingSlide.toObject(), ...element });
      }
    }
    const slideDeleted = await Slide.find({
      presentation: data._id,
      isDeleted: false,
      _id: { $nin: data.slides.map((slide) => slide._id) },
    });
    for (const element of slideDeleted) {
      await Slide.findByIdAndUpdate(element._id, { isDeleted: true });
    }
    res.status(200).send({
      slides: updatedSlides,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
