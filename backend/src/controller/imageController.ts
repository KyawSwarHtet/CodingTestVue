import ImageModel from "../model/imageModel";
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import AWS from "aws-sdk";
import { config } from "dotenv";
config();

const { S3_ENDPOINT, BUCKET_NAME } = process.env;

const spacesEndpoint = new AWS.Endpoint(S3_ENDPOINT as string);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

export interface RequestData {
  id: ObjectId;
  files: Array<ProfileData | null>;
}

export type ProfileData = {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
};

// for all getImage
//@route Get/api/getImage
const getImages = async (req: Request, res: Response) => {
  try {
    const files = await ImageModel.find().sort({ _id: -1 });
    res.status(200).json({ data: files });
  } catch (error) {
    res.status(404).json({
      message: " something is wrong while fetching data from database",
    });
  }
};

// for all addImage
//@route Post/api/addImage
const multipleFileUpload = async (req: Request, res: Response) => {
  try {
    const fileData: RequestData[] | any = req.files;

    //if user upload without image
    if (fileData?.length === 0) {
      return res.status(400).json({ message: "Please upload an Image" });
    }

    let filesArray: any = [];
    fileData.forEach((element: any) => {
      const file: any = {
        fileName: element.key,
        // filePath: element.path,
        filePath: element.Location,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });

    const post = await ImageModel.create({
      files: filesArray,
    });

    // await post.save();
    res.status(201).json({ message: "Upload the Images Successfully" }); //send(post)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something is wrong during uploading image " });
  }
};

//for img file format
const fileSizeFormatter = (bytes: number, decimal: number) => {
  if (bytes === 0) {
    return "0 byte";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
  );
};

//Image Detail Function
const getImageDetail = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const imagedetail: RequestData | null = await ImageModel.findById(id);
    res.status(200).send(imagedetail);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Image Delete Function
const deletepost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // let postId: any;
    await ImageModel.findById(id)
      .then((postId: any) => {
        postId.files[0] === null || undefined || postId.files.length <= 0
          ? res.status(400).json({ message: "user have no image" })
          : postId.files.map(async (data: any) => {
              /* for AWS stored image file also need to delete when user delete post */
              const reqfileName = data.fileName;
              const imgName = reqfileName.replace("codetest/", "");

              return (
                await s3
                  .deleteObject({
                    Bucket: `${BUCKET_NAME}/codetest`,
                    Key: imgName,
                  })
                  .promise(),
                (error: any) => {
                  if (error) {
                    console.log("error occur", error);
                  }
                  return console.log("file is deleted successully");
                }
              );
            });

        ImageModel.findByIdAndRemove(id).exec();
        res.status(200).json({ message: "Images deleted successfully" });
      })
      .catch((error: any) =>
        res.status(404).json({ messag: "user not found" })
      );
  } catch (error) {
    console.log("error delete", error);
    res.status(404).json({ message: "Something happen during deleting image" });
  }
};

export const ImageController = {
  getImages,
  multipleFileUpload,
  deletepost,
  getImageDetail,
};
