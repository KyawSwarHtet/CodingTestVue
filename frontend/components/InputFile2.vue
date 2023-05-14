<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
    <div v-if="message" :class="`message ${error ? 'danger' : 'success'}`">
      <div class="message-body">
        {{ message }}
      </div>
    </div>

    <div class="field">
      <div class="file is-boxed is-primary">
        <label for="file" class="file-label">
          <input
            type="file"
            multiple
            required
            @change="selectFile"
            ref="files"
            class="file-input"
          />

          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
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
        <div class="level-right">
          <div class="level-item">
            <a @click.prevent="files.splice(index, 1)" class="delete"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <v-btn color="green-lighten-1" variant="elevated">upload</v-btn>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SimpleUpload",

  data() {
    return {
      files: [],
      message: "",
      error: false,
    };
  },

  methods: {
    selectFile() {
      // const files = this.$refs.files.files
      // this.files = [...this.files,...files]

      this.files = this.$refs.files.files;
      this.error = false;
      this.message = "";
    },
    async sendFile() {
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append("files", this.files[i]);
      }
      const data1 = Object.fromEntries(formData.entries());
      console.log("form data", data1);

      try {
        await axios
          .post("http://localhost:8000/api/upload", formData)
          .then((result) => {
            this.message = result.data.message;
            this.files = [];
            this.error = false;
          });
      } catch (error) {
        this.message = error.response.data.message;
        this.error = true;
      }
    },
  },
};
</script>
