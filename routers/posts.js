const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");

//Middlewares
const statusError = require("../middlewares/statusError.js");
const validateProperties = require("../middlewares/validateProperties.js");
const modifyProperties = require("../middlewares/modifyProperties.js");
const limitFilter = require("../middlewares/limitFilter.js");
const tagFilter = require("../middlewares/tagFilter.js");

//Index
router.get("/", tagFilter, limitFilter, postController.index);

//Show
router.get("/:id", statusError, postController.show);

//Store
router.post("/", postController.store);

//Update
router.put("/:id", statusError, validateProperties, postController.update);

//Modify
router.patch("/:id", statusError, modifyProperties, postController.modify);

//Destroy
router.delete("/:id", statusError, postController.destroy);


module.exports = router;