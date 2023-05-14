"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const image_route_1 = __importDefault(require("./router/image-route"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
//middleware
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//image folder route
app.use("/codetest", express_1.default.static(path_1.default.join(__dirname, "codetest")));
//connect to mongodb
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected with MONGODB", process.env.MONGO_URL))
    .catch((err) => {
    console.log(err);
});
// api path
app.use("/api", image_route_1.default);
//checking image type and response
app.use((err, req, res, next) => {
    if (err.name === "LIMIT_FILE_TYPES") {
        return res.status(422).json({ message: "Only images are allowed" });
    }
    if (err.name === "LIMIT_FILE_SIZE") {
        return res
            .status(422)
            .json({ message: "Too large. Max size is allowed only 5MB" });
    }
    next();
});
const PORT = process.env.PORT || 5000;
console.log("server is running on ", PORT);
app.listen(PORT);
