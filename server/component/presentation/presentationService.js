const Presentation = require("../../mongooseModel/Presentation");
const Slide = require("../../mongooseModel/Slide");
const Group = require("../../mongooseModel/Group");
const PresentationHistory = require("../../mongooseModel/PresentationHistory");

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
      index: 0,
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

exports.showPresentation = async (req, res) => {
  const data = req.body;

  try {
    const presentationHistorys = await PresentationHistory.find({
      presentationId: data.presentationId,
      onShow: true,
    });

    let presentationHistory;

    if (presentationHistorys.length > 1) {
      presentationHistory = presentationHistorys.pop(); // Get the last element
      presentationHistorys.forEach(async (history) => {
        history.onShow = false;
        await history.save();
      });
    } else {
      presentationHistory = presentationHistorys[0];
    }

    if (!presentationHistory) {
      const presentation = await Presentation.findById(data.presentationId);

      if (!presentation) {
        return res.status(404).send({ message: 'Presentation not found' });
      }

      const slides = await Slide.find({
        presentation: data.presentationId,
        isDeleted: false,
      });

      let code, checkcode;
      do {
        code = Math.random().toString(36).substring(2, 7).toUpperCase();
        checkcode = await PresentationHistory.findOne({
          code: code,
          onShow: true,
        });
      } while (checkcode);

      const newPresentationHistory = await PresentationHistory.create({
        presentationId: data.presentationId,
        code: code,
        slidesRecord: slides.map((slide) => ({
          slideId: slide._id,
          index: slide.index,
          question: slide.question,
          type: slide.type,
          results: slide.options.map((option) => ({
            option: option.option,
            count: 0,
          })),
          members: [],
        })),
        currentSlideIndex: data.currentSlideIndex,
        onShow: true,
        joinMembers: [],
        chats: [],
      });

      return res.status(200).send({
        presentationHistory: newPresentationHistory,
      });
    }

    presentationHistory.currentSlideIndex = data.currentSlideIndex;
    await presentationHistory.save();

    return res.status(200).send({ presentationHistory: presentationHistory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};


exports.joinPresentation = async (req, res) => {
  const data = req.body;
  try {
    const presentationHistory = await PresentationHistory.findOne({
      code: data.code,
      onShow: true,
    });
    if (!presentationHistory) {
      return res.status(404).send({ message: "Presentation not found" });
    }
    const currentSlide = presentationHistory.slidesRecord.find(
      (slide) => slide.index === presentationHistory.currentSlideIndex
    );
    if (!currentSlide) {
      return res.status(404).send({ message: "Slide not found" });
    }
    res.status(200).send({
      currentSlide: currentSlide,
      presentationId: presentationHistory.presentationId,
      currentSlideIndex: presentationHistory.currentSlideIndex,
      totalSlide: presentationHistory.slidesRecord.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
