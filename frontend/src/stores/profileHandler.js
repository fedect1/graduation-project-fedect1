import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export const useProfileHandler = defineStore('profileHandler', {
  actions: {
    async updateName(user, name) {
      await axios.put(`/users/profile/${user._id}/name`, { name })
    },
    async updateDescription(user, description) {
      await axios.put(`/users/profile/${user._id}/description`, { description })
    },
    async updateAvatar(user, avatar) {
      axios.put(`/users/profile/${user._id}/avatar`, { avatar })
      this.avatar = response.data.avatar
    }
  }
})
