<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Blog</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="register">Register</router-link>
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>

      <div class="text-center">
        <h1>Nest Blog Tutorial</h1>
       <p> This is the description of the blog built with Nest.js, Vue.js and MongoDB</p>

       <div v-if="posts.length === 0">
            <h2> No post found at the moment </h2>
        </div>
      </div>

        <div class="row">
           <div class="col-md-4" v-for="post in posts" :key="post._id">
              <div class="card mb-4 shadow-sm">
                <div class="card-body">
                   <h2 class="card-img-top">{{ post.title }}</h2>
                  <p class="card-text">{{ post.body }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" style="margin-bottom: 20px;">
                      <router-link :to="{name: 'post', params: {id: post._id}}" class="btn btn-sm btn-outline-secondary">View Post </router-link>
                       <router-link :to="{name: 'edit', params: {id: post._id}}" class="btn btn-sm btn-outline-secondary">Edit Post </router-link>
                       <button class="btn btn-sm btn-outline-secondary" v-on:click="deletePost(post._id)">Delete Post</button>
                    </div>
                  </div>

                  <div class="card-footer">
                    <small class="text-muted">Posted on: {{ post.date_posted}}</small><br/>
                    <small class="text-muted">by: {{ post.author}}</small>
                  </div>

                </div>
              </div>
            </div>
      </div>
    </div>
</template>


<script>
// @ is an alias to /src
import { server } from "@/utils/helper";
import axios from "axios";
import router from "@/router";


export default {
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get(`${server.baseURL}/blog/posts`)
        .then(data => (this.posts = data.data));
    },
    deletePost(id) {
      axios.delete(`${server.baseURL}/blog/delete?postID=${id}`).then(data => {
        console.log(data);
        window.location.reload();
      });
    },
    logout() {
      axios.post(`${server.baseURL}/user/logout`, {}, { withCredentials: true })
        .then(() => {
          console.log('Logout successful');
          router.push('/login');
        })
        .catch(error => {
          console.error('There was an error logging out:', error);
        });
    }
  }
};
</script>