<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="account">Account</label>
          <input type="text" id="account" v-model="account" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  // filepath: /d:/NodeJS/blog-frontend/src/components/user/userLogin.vue
  import axios from 'axios';
  import { server } from '../../utils/helper';
  import router from '../../router';
  
  export default {
    name: 'UserLogin',
    data() {
      return {
        account: '',
        password: ''
      };
    },
    methods: {
      login() {
        axios.post(`${server.baseURL}/user/login`, {
          account: this.account,
          password: this.password
        }, { 
  withCredentials: true // Đảm bảo gửi cookie cùng với yêu cầu
    })
        .then(response => {
          console.log('Login successful:', response.data);
          router.push('/home');
        })
        .catch(error => {
          console.error('There was an error logging in:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  </style>