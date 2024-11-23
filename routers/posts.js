const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");
const statusError = require("../middlewares/statusError.js");

//Index
router.get("/", postController.index);

//Show
router.get("/:id", statusError, postController.show);

//Store
router.post("/", postController.store);

//Update
router.put("/:id", postController.update);

//Modify
router.patch("/:id", postController.modify);

//Destroy
router.delete("/:id", postController.destroy);


module.exports = router;