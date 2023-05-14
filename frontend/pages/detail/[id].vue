<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-toolbar-title>Coding Test by Kyaw Swar Htet</v-toolbar-title>
      <NuxtLink :to="`/`">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </NuxtLink>
      <NuxtLink :to="`/`">
        <v-btn color="red-lighten-1" variant="text"> Home </v-btn>
      </NuxtLink>
    </v-app-bar>
    <v-main class="bg-grey-lighten-2">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="12">
            <v-row>
              <v-col
                v-for="(post, i) in imgURL"
                :key="i"
                cols="12"
                md="6"
                sm="6"
                xl="6"
              >
                <v-card class="mx-auto">
                  <v-img :src="post.filePath" height="300px" cover alt="">
                    <template v-slot:placeholder>
                      <v-row
                        align="center"
                        class="full-height ma-0"
                        justify="center"
                      >
                        <v-progress-circular
                          color="grey lighten-5"
                          indeterminate
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>

                  <v-card-title>
                    {{ post.fileName }}
                  </v-card-title>

                  <v-card-subtitle>
                    {{ post.fileSize }}
                  </v-card-subtitle>

                  <v-card-subtitle>
                    {{ post.fileType }}
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { DataEntity, FilesEntity } from "~/types/APIResponse";
const route = useRoute();
const config = useRuntimeConfig();
const postId = computed(() => route.params.id);

const { data } = await useFetch<DataEntity>(
  `https://kshcodetest.onrender.com/api/detail/${postId.value}`
);

const imgURL = computed(() => data.value?.files);

console.log("image url is", imgURL);
</script>
