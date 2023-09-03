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
    // async createUser(name, email, password) {
    //   console.log('name', name, 'email', email, 'password', password);
    //   this.user = (
    //     await axios.post('/users', {
    //       name: name,
    //       email: email,
    //       password: password
    //     })
    //   ).data
    // }
    async createUser(name, email, password) {
      this.user = (
        await axios.post('/users', {
          name: name,
          email: email,
          password: password
        })
      ).data
    }
  }
})
