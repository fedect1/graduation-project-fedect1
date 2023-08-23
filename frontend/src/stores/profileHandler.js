import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export const useProfileHandler = defineStore('profileHandler', {
  state: () => ({
    name: null,
    description: null,
    avatar: null
  }),
  actions: {
    async fetchProfile(user) {
      console.log(user)
      const response = await axios.get(`/users/profile/${user._id}`)
      this.name = response.data.name
      this.description = response.data.description
      this.avatar = response.data.avatar
    },
    async updateName(user, name) {
      const response = await axios.put(`/users/profile/${user._id}/name`, { name })
      this.name = response.data.name
    },
    async updateDescription(user, description) {
      const response = await axios.put(`/users/profile/${user._id}/description`, { description })
      this.description = response.data.description
    },
    async updateAvatar(user, avatar) {
      const response = await axios.put(`/users/profile/${user._id}/avatar`, { avatar })
      this.avatar = response.data.avatar
    }
  }
})
