import './bootstrap';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
window.Swal = Swal
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  timer: 10000,
})
window.toast = toast

import App from './components/App.vue'
import router from './router';
import { createApp } from 'vue'

createApp(App).use(router).mount("#app")
