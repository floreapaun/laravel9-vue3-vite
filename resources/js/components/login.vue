<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">

                <h2>Login</h2>

                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email Address:</label>
                        <input type="email" class="form-control" id="email" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" v-model="form.password">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router"

const userStore = useUserStore()
const router = useRouter()

let form = reactive({
    email: '',
    password: ''
});

const login = async() => {
    await userStore.login(form)
    router.push({name:'Dashboard'})
}
</script>
