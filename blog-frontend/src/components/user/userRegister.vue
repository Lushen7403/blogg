<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="account">Account</label>
          <input type="text" id="account" v-model="account" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  // filepath: /d:/NodeJS/blog-frontend/src/components/user/userRegister.vue
  import axios from 'axios';
  import { server } from '../../utils/helper';
  import router from '../../router';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        account: '',
        password: ''
      };
    },
    methods: {
      register() {
        axios.post(`${server.baseURL}/user/register`, {
          account: this.account,
          password: this.password
        })
        .then(response => {
          console.log('Registration successful:', response.data);
          router.push('/login');
        })
        .catch(error => {
          console.error('There was an error registering:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  </style>