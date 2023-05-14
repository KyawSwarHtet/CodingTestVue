"use strict";

import multer from 'multer'
import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import multerS3 from "multer-sharp-s3";
import path from 'path'
import {config} from 'dotenv';
config();

const { S3_ENDPOINT, BUCKET_NAME } = process.env;


type FileData = {
    originalname: string,
    fieldname: string,
    mimetype : string
}

//declare data type for multer-  S3 Strorage data
interface S3dataType {
    s3: AWS.S3,
    dirname: string,
    Bucket : string,
    ACL : string,
    resize? : Resize,
    max : Boolean,
    limits : Limit,
    metadata : any,
    Key : any,
}

type Resize = {
    width: number,
    height: number,
   
}
type Limit = {
    fileSize: number
   
}

const spacesEndpoint = new AWS.Endpoint(S3_ENDPOINT as any);


const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});


const storageposts = multerS3({
  s3,
  dirname: "/",
  Bucket: `${BUCKET_NAME}/codetest`,
  ACL: "public-read",
  resize: {
    width: 850,
    height: 700,
  },
  max: true,
  limits: { fileSize: 1024 * 1024 * 5 }, //  allowed only 5 MB files
  // limits: Imagelimit(file), //  allowed only 5 MB files
  metadata: (req:Request, file: FileData, cb:any) => {
    cb(null, {
      fieldname: file.fieldname,
    });
  },

  Key: (req:Request, file: FileData, cb:any) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
} as S3dataType);

// Check File Type
const filefilter = (req: Request, file: FileData, cb: any) => {
  

 //Allow ext
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    //Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null,true)
    } else {
      const error = new Error("Wrong file Type");
     error.name = "LIMIT_FILE_TYPES";
     return cb(error,false)
    }
};

const uploadImgs = multer({
    storage: storageposts,
  fileFilter: filefilter,
}).array("files");

export const UploadData = {uploadImgs, s3}



