"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadData = void 0;
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_sharp_s3_1 = __importDefault(require("multer-sharp-s3"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { S3_ENDPOINT, BUCKET_NAME } = process.env;
const spacesEndpoint = new aws_sdk_1.default.Endpoint(S3_ENDPOINT);
const s3 = new aws_sdk_1.default.S3({
    endpoint: spacesEndpoint,
});
const storageposts = (0, multer_sharp_s3_1.default)({
    s3,
    dirname: "/",
    Bucket: `${BUCKET_NAME}/codetest`,
    ACL: "public-read",
    resize: {
        width: 850,
        height: 700,
    },
    max: true,
    limits: { fileSize: 1024 * 1024 * 5 },
    // limits: Imagelimit(file), //  allowed only 5 MB files
    metadata: (req, file, cb) => {
        cb(null, {
            fieldname: file.fieldname,
        });
    },
    Key: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});
// Check File Type
const filefilter = (req, file, cb) => {
    //Allow ext
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLocaleLowerCase());
    //Check mime type
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        const error = new Error("Wrong file Type");
        error.name = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
};
const uploadImgs = (0, multer_1.default)({
    storage: storageposts,
    fileFilter: filefilter,
}).array("files");
exports.UploadData = { uploadImgs, s3 };
