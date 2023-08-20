import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export const usePostHandler = defineStore('postHandler', {
  state: () => ({
    posts: [],
    post: null,
    comments: [],
    comment: null
  }),
  actions: {
    async getPosts() {
      this.posts = (await axios.get('/posts')).data
    },
    async createPost(bodyPost) {
      this.post = (await axios.post('/posts', { bodyPost })).data
    }
  }
})
