import { createRouter, createWebHistory } from "vue-router";

import login from '../components/login.vue';
import register from '../components/register.vue';

import productIndex from '../components/products/index.vue';
import productNew from '../components/products/new.vue';
import productEdit from '../components/products/edit.vue'
import notFound from '../components/notFound.vue';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
    meta: {
        requiresAuth:false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: register,
    meta: {
        requiresAuth:false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: productIndex,
    meta: {
        requiresAuth:true
    }
  },
  {
    path: '/product/new',
    component: productNew,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/product/edit/:id',
    component: productEdit,
    props: true,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: notFound,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to,from)=>{

  if(to.meta.requiresAuth && !localStorage.getItem('token')){
      return { name: 'Login' }
  }

  if(to.meta.requiresAuth == false && localStorage.getItem('token')){
      return { name: 'Dashboard' }
  }

})

export default router