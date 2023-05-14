"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const imageModel_1 = __importDefault(require("../model/imageModel"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { S3_ENDPOINT, BUCKET_NAME } = process.env;
const spacesEndpoint = new aws_sdk_1.default.Endpoint(S3_ENDPOINT);
const s3 = new aws_sdk_1.default.S3({
    endpoint: spacesEndpoint,
});
// for all getImage
//@route Get/api/getImage
const getImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield imageModel_1.default.find().sort({ _id: -1 });
        res.status(200).json({ data: files });
    }
    catch (error) {
        res.status(404).json({
            message: " something is wrong while fetching data from database",
        });
    }
});
// for all addImage
//@route Post/api/addImage
const multipleFileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileData = req.files;
        //if user upload without image
        if ((fileData === null || fileData === void 0 ? void 0 : fileData.length) === 0) {
            return res.status(400).json({ message: "Please upload an Image" });
        }
        let filesArray = [];
        fileData.forEach((element) => {
            const file = {
                fileName: element.key,
                // filePath: element.path,
                filePath: element.Location,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2),
            };
            filesArray.push(file);
        });
        const post = yield imageModel_1.default.create({
            files: filesArray,
        });
        // await post.save();
        res.status(201).json({ message: "Upload the Images Successfully" }); //send(post)
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Something is wrong during uploading image " });
    }
});
//for img file format
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 byte";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]);
};
//Image Detail Function
const getImageDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const imagedetail = yield imageModel_1.default.findById(id);
        res.status(200).send(imagedetail);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Image Delete Function
const deletepost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // let postId: any;
        yield imageModel_1.default.findById(id)
            .then((postId) => {
            postId.files[0] === null || undefined || postId.files.length <= 0
                ? res.status(400).json({ message: "user have no image" })
                : postId.files.map((data) => __awaiter(void 0, void 0, void 0, function* () {
                    /* for AWS stored image file also need to delete when user delete post */
                    const reqfileName = data.fileName;
                    const imgName = reqfileName.replace("codetest/", "");
                    return (yield s3
                        .deleteObject({
                        Bucket: `${BUCKET_NAME}/codetest`,
                        Key: imgName,
                    })
                        .promise(),
                        (error) => {
                            if (error) {
                                console.log("error occur", error);
                            }
                            return console.log("file is deleted successully");
                        });
                }));
            imageModel_1.default.findByIdAndRemove(id).exec();
            res.status(200).json({ message: "Images deleted successfully" });
        })
            .catch((error) => res.status(404).json({ messag: "user not found" }));
    }
    catch (error) {
        console.log("error delete", error);
        res.status(404).json({ message: "Something happen during deleting image" });
    }
});
exports.ImageController = {
    getImages,
    multipleFileUpload,
    deletepost,
    getImageDetail,
};
