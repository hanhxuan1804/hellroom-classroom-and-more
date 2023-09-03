const PresentationHistory = require("../mongooseModel/PresentationHistory");

const presentationSocket = (io, socket, userId) => {
  socket.on("join", async (payload) => {
    const { presentationId, code } = payload;
    console.log("join", presentationId);
    const presentationHistory = await PresentationHistory.findOne({
      presentationId: presentationId,
      code: code,
      onShow: true,
    });
    if (presentationHistory) {
      if (!presentationHistory.joinMembers.includes(userId)) {
        presentationHistory.joinMembers.push(userId);
        await presentationHistory.save();
        socket.join(presentationId);
        io.to(presentationId).emit("joined", {
          userId: userId,
          numberOfJoiner: presentationHistory.joinMembers.length,
        });
      } else {
        socket.join(presentationId);
        io.to(presentationId).emit("joined", {
          userId: userId,
          numberOfJoiner: presentationHistory.joinMembers.length,
        });
      }
    }
  });
  socket.on("next", async (payload) => {
    const { presentationId, slideId } = payload;
    console.log("next", presentationId);
    const presentationHistory = await PresentationHistory.findOne({
      presentationId: presentationId,
      onShow: true,
    });
    if (presentationHistory) {
      const slide = presentationHistory.slidesRecord.find((slide) =>
        slide.slideId.equals(slideId)
      );
      presentationHistory.currentSlideIndex += 1;
      await presentationHistory.save();
      
      io.to(presentationId).emit("slideChanged", {
        currentSlide: slide,
        currentSlideIndex: presentationHistory.currentSlideIndex,
      });
    }
  });
  socket.on("previous", async (payload) => {
    const { presentationId, slideId } = payload;
    console.log("previous", presentationId);
    const presentationHistory = await PresentationHistory.findOne({
      presentationId: presentationId,
      onShow: true,
    });
    if (presentationHistory) {
      const slide = presentationHistory.slidesRecord.find((slide) =>
        slide.slideId.equals(slideId)
      );
      presentationHistory.currentSlideIndex -= 1;
      await presentationHistory.save();
      io.to(presentationId).emit("slideChanged", {
        currentSlide: slide,
        currentSlideIndex: presentationHistory.currentSlideIndex,
      });
    }
  });
  socket.on("answer", async (payload) => {
    const { presentationId, slideId, optionIndex } = payload;
    console.log("answer", presentationId, slideId, optionIndex);
    const presentationHistory = await PresentationHistory.findOne({
      presentationId: presentationId,
      onShow: true,
    });
    if (presentationHistory) {
      const slide = presentationHistory.slidesRecord.find((slide) =>
        slide.slideId.equals(slideId)
      );
      slide.members.push(userId);
      const option = slide.results[optionIndex];
      option.count += 1;
      await presentationHistory.save();
      io.to(presentationId).emit("answerChanged", {
        currentSlide: slide,
        currentSlideIndex: presentationHistory.currentSlideIndex,
      });
    }
  });


  socket.on("leave", async (data) => {
    const { code } = data; 
    const presentationHistory = await PresentationHistory.findOne({
      code: code,
      onShow: true,
    });
    if (presentationHistory) {
      const presentation = JSON.stringify(presentationHistory.presentationId).replace(/"/g, "");
    
      presentationHistory.joinMembers = presentationHistory.joinMembers.filter(
        (member) => !member.equals(userId)
      );
      presentationHistory.joinMembers = [...new Set(presentationHistory.joinMembers)];
      await presentationHistory.save();
      console.log("leave", presentation);

      io.to(presentation).emit("leaved", {
        userId: userId,
        numberOfJoiner: presentationHistory.joinMembers.length,
      });
    }
  });

  socket.on("end", async (data) => {
    const { presentationId } = data;
    console.log("end", presentationId);
    const presentationHistory = await PresentationHistory.findOne({
      presentationId: presentationId,
      onShow: true,
    });
    if (presentationHistory) {
      presentationHistory.onShow = false;
      await presentationHistory.save();
      io.to(presentationId).emit("ended", {
        userId: userId,
      });
    }
  });
};

module.exports = presentationSocket;
