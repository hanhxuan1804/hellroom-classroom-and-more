const router = require("express").Router();
const groupPostService = require("./groupPostService");

router.get("/:id", groupPostService.getPostOfGroup);
router.post("/create", groupPostService.create);

module.exports = router;