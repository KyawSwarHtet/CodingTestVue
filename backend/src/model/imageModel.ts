import mongoose from "mongoose"
const { Schema } = mongoose;
const ImageSchema = new Schema(
    {
          files: {
            type: [Object],
            default: null,
            required: true,
    },
         
    }, {
        timestamps:true
    }
)
const ImageModel = mongoose.model("userupload", ImageSchema)
export default ImageModel