import express from 'express';
import {UploadData} from '../middleware/uploadMiddleware'
import {ImageController} from '../controller/imageController'

const router = express.Router();

// get all image route
router.get("/upload", ImageController.getImages);
// add image route
router.post("/upload", UploadData.uploadImgs, ImageController.multipleFileUpload);
//detail image
router.get("/detail/:id", ImageController.getImageDetail);
// delete image route
router.delete("/delete/:id",ImageController.deletepost);




export default router
