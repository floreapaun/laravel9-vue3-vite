<script setup>
  import { useRouter } from "vue-router"
  import { useUserStore } from '../stores/user'
  import { storeToRefs } from 'pinia'

  const router = useRouter()
  const userStore = useUserStore()
  const { getToken } = storeToRefs(userStore)

  const logOut = () => {
    userStore.logout()
    router.push({name:'Login'})
  }

  let isLoggedIn = getToken
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
        <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="text-white" :to="{ name: 'Login' }">Login</router-link>
        </li>
        <li class="nav-item">
            <router-link class="text-white ml-2" :to="{ name: 'Register' }">Register</router-link>
        </li>
        <li class="nav-item">
            <router-link class="text-white ml-2" :to="{ name: 'Dashboard' }">Dashboard</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link class="text-white" :to="{}" @click="logOut">Logout</router-link>
        </li>
    </ul>
  </nav>
  <router-view/>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>
