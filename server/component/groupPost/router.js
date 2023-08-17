const router = require("express").Router();

router.use("/", require("./groupPostController"));

module.exports = router;