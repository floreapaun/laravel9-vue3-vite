import { defineStore } from 'pinia'
import { useRouter } from "vue-router"
import axios from 'axios'

const router = useRouter()

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: false,
  }),

  getters: {
    getToken: (state) => {
      return state.token
    }
  },

  actions: {
    logout() {
      window.localStorage.removeItem('token')
      this.$patch({
        token: false,
      })
    },

    async register(form) {
      await axios.post('/api/register',form).then(res => {
        if(res.data.success){
          window.localStorage.setItem('token',res.data.data.token)
          this.$patch({
            token: res.data.data.token
          })
        }
      }).catch(e => {
        console.log(e)
      })
    },
    
    async login(form) {
      await axios.post('/api/login', form).then(res => {
        window.localStorage.setItem('token',res.data.data.token)
        this.$patch({
          token: res.data.data.token
        })
      }).catch(e => {
        console.log(e)
      })
    }
  },

})
