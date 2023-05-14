"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const imageController_1 = require("../controller/imageController");
const router = express_1.default.Router();
// get all image route
router.get("/upload", imageController_1.ImageController.getImages);
// add image route
router.post("/upload", uploadMiddleware_1.UploadData.uploadImgs, imageController_1.ImageController.multipleFileUpload);
//detail image
router.get("/detail/:id", imageController_1.ImageController.getImageDetail);
// delete image route
router.delete("/delete/:id", imageController_1.ImageController.deletepost);
exports.default = router;
