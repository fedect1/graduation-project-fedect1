import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users')
        if (response.status === 200) {
          this.users = response.data
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error request')
      }
    }
  }
})
