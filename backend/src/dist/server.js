"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var compression_1 = require("compression");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var image_route_1 = require("./router/image-route");
var app = express_1["default"]();
dotenv_1.config();
//middleware
app.use(cors_1["default"]({
    credentials: true
}));
app.use(compression_1["default"]());
app.use(body_parser_1["default"].json());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
//image folder route
app.use("/codetest", express_1["default"].static(path_1["default"].join(__dirname, "codetest")));
//connect to mongodb
mongoose_1["default"]
    .connect(process.env.MONGO_URL)
    .then(function () { return console.log("connected with MONGODB", process.env.MONGO_URL); })["catch"](function (err) {
    console.log(err);
});
// api path
app.use("/api", image_route_1["default"]);
//checking image type and response
app.use(function (err, req, res, next) {
    if (err.name === "LIMIT_FILE_TYPES") {
        res.status(422).json({ message: "Only images are allowed" });
        next();
    }
    if (err.name === "LIMIT_FILE_SIZE") {
        res
            .status(422)
            .json({ message: "Too large. Max size is allowed only 5MB" });
        next();
    }
    next();
});
var PORT = process.env.PORT || 5000;
console.log("server is running on ", PORT);
app.listen(PORT);

//# sourceMappingURL=server.js.map
