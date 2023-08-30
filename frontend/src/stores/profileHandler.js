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
      await axios.put(`/users/profile/${user._id}/avatar`, { avatar })
      this.avatar = response.data.avatar
    },
    async followUser(user, userToFollow) {
      await axios.put(`/users/profile/${user._id}/follow`, { userToFollow })
    },
    async unfollowUser(user, userToUnfollow) {
      console.log('userToUnfollow',userToUnfollow)
      await axios.delete(`/users/profile/${user._id}/unfollowing`, { userToUnfollow })
    },
    async getFollowers(user) {
      const response = await axios.get(`/users/profile/${user._id}/followers`)
      return response.data.followers
    },
    async getFollowings(user) {
      const response = await axios.get(`/users/profile/${user._id}/followings`)
      return response.data.followings
    }
  }
})
