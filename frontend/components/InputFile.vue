<style lang="ts"></style>
<template>
  <v-sheet class="py-1 mt-6 px-3">
      <v-form validate-on="submit" @submit.prevent="sendFile">
        <v-file-input
        type="file"
        ref="file"
            multiple
            label="File input"
            variant="filled"
            :rules="rules"
            prepend-icon="mdi-camera"
            @change="selectFile"
          ></v-file-input>
          
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
    </v-sheet>
                
</template>

<script>
import axios from 'axios';

export default {
  name: "SimpleUpload",

  data() {
    return {
      file:""
    }
  },

  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
   async sendFile() {
      const formData = new FormData(); 
      for (let i = 0; i < this.file.length; i++) {
        formData.append("files", this.file[i]);
     }
     const data1 = Object.fromEntries(formData.entries());
     console.log("form data", data1)

     try {
       await axios.post("http://localhost:8000/api/upload",formData)
     } catch (error) {
      console.log(error)
     }
    }
  }
 
}
</script>




