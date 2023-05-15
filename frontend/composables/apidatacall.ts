// import { APIResponse } from "~~/types/APIResponse";

// import { defineStore } from "pinia";
// import useToast from "./useToast";

// export const {
//   data: apidata,
//   pending,
//   refresh,
//   error,
// } = await useFetch<APIResponse>(`https://kshcodetest.onrender.com/api/upload`);

// const Filedata = apidata.value?.data;

// // console.log("post ", Filedata);
// watch(apidata, (newPosts) => {
//   // Because posts might start out null, you will not have access
//   // return newPosts.data
//   // to its contents immediately, but you can watch it.
// });

// export const useAuthorStore = defineStore("author-store", {
//   state: () => ({
//     imageFiles: [] as APIResponse[],
//   }),
//   actions: {
//     // Get all authors from DB
//     async getAll() {
//       try {
//         let data = await $fetch<APIResponse[]>(
//           "`https://kshcodetest.onrender.com/api/upload"
//         );
//         this.imageFiles = data;
//         return data as APIResponse[];
//       } catch (e: any) {
//         useToast().error(e.message);
//       }
//     },
//     // Create a new author
//     async create(formdata: any) {
//       await $fetch("`https://kshcodetest.onrender.com/api/upload", {
//         method: "POST",
//         body: { formdata },
//       })
//         .catch((e) => {
//           useToast().error(e.data.message);
//         })
//         .then(async () => {
//           await this.getAll();
//           useToast().success("Author created");
//         });
//     },

//     // delete an author
//     async remove(id: string) {
//       await $fetch(`https://kshcodetest.onrender.com/api/delete/${id}`, {
//         method: "DELETE",
//       })
//         .catch((e) => {
//           useToast().error(e.data.message);
//         })
//         .then(async () => {
//           await this.getAll();
//           useToast().success("Author removed");
//         });
//     },
//   },
// });
