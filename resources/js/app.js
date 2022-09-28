import './bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import router from './router';
import App from './components/App.vue'
import { useUserStore } from './stores/user'

window.Swal = Swal
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  timer: 10000,
})
window.toast = toast

const app = createApp(App)

app.use(createPinia())
const userStore = useUserStore()
app.use(router)
app.mount("#app")



//app.use(router).mount("#app")
