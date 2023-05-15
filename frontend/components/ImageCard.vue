<template>
  <v-card class="mx-auto">
    <v-img :src="post?.files[0].filePath" height="200px" cover alt="">
      <template v-slot:placeholder>
        <v-row align="center" class="full-height ma-0" justify="center">
          <v-progress-circular
            color="grey lighten-5"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title>
      {{ post?.files[0].fileName }}
    </v-card-title>

    <v-card-subtitle>
      {{ post?.files[0].fileType }}
    </v-card-subtitle>
    <v-card-actions>
      <NuxtLink :to="`/detail/${post?._id}`">
        <v-btn color="orange-lighten-1" variant="text"> See More </v-btn>
      </NuxtLink>

      <v-spacer></v-spacer>

      <v-btn
        color="red-lighten-1"
        variant="text"
        @click.prevent="DeleteImg(post?._id)"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { DataEntity } from "~/types/APIResponse";
import axios from "axios";
import useToast from "../composables/useToast";

const props = defineProps({
  post: {
    type: Object as PropType<DataEntity>,
  },
});

const DeleteImg = async (_id: string | undefined) => {
  try {
    await axios
      .delete(`https://kshcodetest.onrender.com/api/delete/` + _id)
      .then((result) => {
        useToast().success(result.data.message);
        const message = result.data.message;
        setTimeout(async () => {
          await location.reload();
        }, 2000);
      });
  } catch (error: any) {
    useToast().error(error.response.data.message);
    const message = error.response.data.message;
  }
};
</script>
