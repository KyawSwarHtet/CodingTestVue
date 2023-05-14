export interface APIResponse {
  data?: (DataEntity)[] | null;
}
export interface DataEntity {
  _id: string;
  files: (FilesEntity)[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface FilesEntity {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
}
