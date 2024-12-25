import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/HomePage.vue'
import EditComponent from '@/components/post/editPost.vue'
import CreateComponent from '@/components/post/createPost.vue'
import PostComponent from '@/components/post/PostView.vue'
import LoginComponent from '@/components/user/userLogin.vue'
import RegisterComponent from '@/components/user/userRegister.vue'
import Cookies from 'js-cookie'

const routes = [
  { path: '/', redirect: { name: 'home' } },
  { path: '/home', name: 'home', component: HomeComponent },
  { path: '/create', name: 'create', component: CreateComponent },
  { path: '/update/:id', name: 'edit', component: EditComponent },
  { path: '/post/:id', name: 'post', component: PostComponent },
  { path: '/login', name: 'login', component: LoginComponent },
  { path: '/register', name: 'register', component: RegisterComponent }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('jwt'); // Kiểm tra cookie jwt
  console.log(token);
  // Nếu route yêu cầu người dùng đã đăng nhập và không có token
  if ((to.name === 'create' || to.name === 'edit') && !token) {
    // Chuyển hướng sang trang login
    return next({ name: 'login' });
  }

  // Nếu người dùng đã đăng nhập hoặc route không yêu cầu đăng nhập
  next();  // Tiếp tục điều hướng đến trang yêu cầu
});

export default router