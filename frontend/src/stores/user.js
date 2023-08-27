import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
//Change this to user.js
export const useUserStore = defineStore('User', {
  state: () => ({
    user: null
  }),
  actions: {
    async createUser(email, password) {
      this.user = (
        await axios.post('/users', {
          email: email,
          password: password
        })
      ).data
    }
  }
})
