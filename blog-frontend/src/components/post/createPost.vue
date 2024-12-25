<template>
  <div>
    <h2>Create Post</h2>
    <form @submit.prevent="createPost">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" name="title" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" name="description" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea id="body" v-model="body" name="body" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="text" id="author" v-model="author" name="author" class="form-control" required>
      </div>
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="submit">Create Post</button>
      </div>
    </form>
  </div>
</template>

<script>
// filepath: /d:/NodeJS/blog-frontend/src/components/post/createPost.vue
import axios from "axios";
import { server } from "../../utils/helper";
import router from "../../router";
import Cookies from "js-cookie";

export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      description: "",
      body: "",
      author: "",
      date_posted: ""
    };
  },
  created() {
    
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    createPost() {

      const jwt = Cookies.get("jwt");
      if (!jwt) {
        console.warn("No JWT cookie found, redirecting to login page.");
        router.push({ name: "login" });
        return;
      }
      let postData = {
        title: this.title,
        description: this.description,
        body: this.body,
        author: this.author,
        date_posted: this.date_posted
      };
      axios.post(`${server.baseURL}/blog/create`, postData)
        .then(response => {
          console.log("Post created successfully:", response.data);
          router.push({ name: "home" });
        })
        .catch(error => {
          console.error("There was an error creating the post:", error);
        });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>