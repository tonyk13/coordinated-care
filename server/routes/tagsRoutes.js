const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

// GET request for all the tags.
router.get("/tags", tagsController.tags_list);

// POST request for creating a tag.
router.post("/tags/", tagsController.tags_post);

// GET request for a tag. (might not need this)
router.get("/tags/:_id", tagsController.tag_get);

//PUT request for a tag
router.put("/tags/:_id", tagsController.tag_put);

//DELETE request for a tag
router.delete("/tags/:_id", tagsController.tag_delete);

module.exports = router;
