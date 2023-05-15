"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var aws_sdk_1 = require("aws-sdk");
var multer_sharp_s3_1 = require("multer-sharp-s3");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
dotenv_1.config();
var _a = process.env, S3_ENDPOINT = _a.S3_ENDPOINT, BUCKET_NAME = _a.BUCKET_NAME;
var spacesEndpoint = new aws_sdk_1["default"].Endpoint(S3_ENDPOINT);
var s3 = new aws_sdk_1["default"].S3({
    endpoint: spacesEndpoint
});
var storageposts = multer_sharp_s3_1["default"]({
    s3: s3,
    dirname: "/",
    Bucket: BUCKET_NAME + "/codetest",
    ACL: "public-read",
    resize: {
        width: 850,
        height: 700
    },
    max: true,
    limits: { fileSize: 1024 * 1024 * 5 },
    // limits: Imagelimit(file), //  allowed only 5 MB files
    metadata: function (req, file, cb) {
        cb(null, {
            fieldname: file.fieldname
        });
    },
    Key: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    }
});
// Check File Type
var filefilter = function (req, file, cb) {
    //Allow ext
    var filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    var extname = filetypes.test(path_1["default"].extname(file.originalname).toLocaleLowerCase());
    //Check mime type
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        var error = "Wrong file Type";
        //  error.name = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
};
var uploadImgs = multer_1["default"]({
    storage: storageposts,
    fileFilter: filefilter
}).array("files");
exports.UploadData = { uploadImgs: uploadImgs, s3: s3 };

//# sourceMappingURL=uploadMiddleware.js.map
