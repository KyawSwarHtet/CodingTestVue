<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
    <div
      v-if="message"
      :class="`message ${error ? 'is-danger' : 'is-success'}`"
    >
      <div class="message-body">
        {{ message }}
      </div>
    </div>

    <div class="field">
      <div class="file is-boxed is-primary">
        <label for="files" class="file-label">
          <input
            type="file"
            multiple
            required
            @change="selectFile"
            ref="files"
            id="files"
            class="file-input"
          />

          <span class="file-cta">
            <span class="file-label"> Choose a file </span>
          </span>
        </label>
      </div>
    </div>

    <div class="field">
      <div v-for="(file, index) in files" :key="index" class="level">
        <div class="level-left">
          <div class="level-item">{{ file.name }}</div>
        </div>
        <!-- <div class="level-right">
          <div class="level-item">
            <a
              @click.prevent="
                files.splice(index, 1);
                uploadFiles.splice(index, 1);
              "
              class="delete"
            ></a>
          </div>
        </div> -->
      </div>
    </div>

    <div class="field">
      <v-btn v-if="loading" disabled color="red-lighten-1" variant="elevated">
        Upload
      </v-btn>
      <v-btn v-else type="submit" color="green-lighten-1" variant="elevated">
        Upload
      </v-btn>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import useToast from "../composables/useToast";
// const [loading, setLoading] = useState < Boolean > false;

export default {
  name: "SimpleUpload",

  data() {
    return {
      files: [],
      uploadFiles: [],
      message: "",
      error: false,
      loading: false,
    };
  },

  methods: {
    selectFile() {
      this.files = this.$refs.files.files;
      this.uploadFiles = [...this.uploadFiles, ...this.files];
      this.error = false;
      this.message = "";
      this.loading = false;
    },
    async sendFile() {
      this.loading = true;
      const formData = new FormData();
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("files", this.uploadFiles[i]);
      }

      try {
        await axios
          .post("https://kshcodetest.onrender.com/api/upload", formData)
          .then((result) => {
            useToast().success(result.data.message);
            this.message = result.data.message;
            this.files = [];
            this.error = false;
            this.loading = false;
            setTimeout(async () => {
              await location.reload();
            }, 2000);
          });
      } catch (error) {
        useToast().error(error.response.data.message);
        this.message = error.response.data.message;
        this.error = true;
        this.loading = false;
        location.reload();
      }
    },
  },
};
</script>
