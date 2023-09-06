import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export const usePostHandler = defineStore('postHandler', {
  state: () => ({
    posts: [],
    post: null,
    comments: [],
    comment: null,
    likes: [],
    like: null,

  }),
  actions: {
    async fetchPosts() {
      this.posts = (await axios.get('/posts')).data
    },
    async fetchPostById(postId) {
      this.post = (await axios.get(`/posts/${postId}`)).data
    },
    async createPost(bodyPost) {
      this.post = (await axios.post('/posts', { bodyPost })).data
    },
    async createComment(postId, text, user) {
      return (await axios.post(`/posts/${postId}/comments`, { text, user })).data
    },
    async fetchComments(postId) {
      this.comments = (await axios.get(`/posts/${postId}/comments`)).data
    },
    async likePost(postId, userId) {
      this.like = (await axios.post(`/posts/${postId}/likes`, { userId })).data
    },
    async dislikePost(postId, userId) {
      this.like = (await axios.delete(`/posts/unlike/${postId}/${userId}`)).data
    },
    async deletePost(postId, userId) {
      await axios.delete(`/posts/${postId}/${userId}`)
    },
    async deleteComment(postId, commentId, userId) {
      await axios.delete(`/posts/${postId}/comments/${commentId}/${userId}`)
    },
    async fetchValidPosts() {
      return (await axios.get('/posts/valid')).data
    }
  }
})
