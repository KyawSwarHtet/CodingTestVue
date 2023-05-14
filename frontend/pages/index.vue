<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-toolbar-title>Coding Test by Kyaw Swar Htet</v-toolbar-title>
    </v-app-bar>
    <v-main class="bg-grey-lighten-2">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="2">
            <h3 class="my-2 text-center">Please Add Your Images</h3>
            <p class="text-body-1 text-red-lighten-1">
              Note: You should upload maximun file size 5MB. <br />
              we allow only (JPEG/JPG/PNG/GIF) file types
            </p>

            <!-- calling infut file component to upload image -->
            <!-- <InputFile/> -->
            <InputFile2 />
          </v-col>
          <v-col cols="12" md="10">
            <div v-if="Filedata === undefined || null">Loading ...</div>
            <div v-else>
              <v-row>
                <v-col
                  v-for="(post, i) in Filedata"
                  :key="i"
                  cols="12"
                  md="3"
                  sm="6"
                  xl="2"
                >
                  <ImageCard :post="post"></ImageCard>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { APIResponse } from "~~/types/APIResponse";
// const { pending, data } = await useLazyFetch< APIResponse>('http://localhost:8000/api/upload')
const {
  data: apidata,
  pending,
  refresh,
  error,
} = await useFetch<APIResponse>(`http://localhost:8000/api/upload`);
const Filedata = apidata.value?.data;

console.log("post ", Filedata);
watch(apidata, (newPosts) => {
  // Because posts might start out null, you will not have access
  // return newPosts.data
  // to its contents immediately, but you can watch it.
});
</script>
