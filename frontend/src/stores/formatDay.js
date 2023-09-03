import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export const useFormatDay = defineStore('formatDay', {
  actions: {
    formatDay(dateStr) {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        return 'Invalid Date'
      }
      const dayPassed = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
      if (dayPassed === 0) {
        return 'Today'
      } else if (dayPassed === 1) {
        return 'Yesterday'
      } else if (dayPassed < 7) {
        return `${dayPassed} days ago`
      } else if (dayPassed < 30) {
        return `${Math.floor(dayPassed / 7)} weeks ago`
      } else if (dayPassed < 365) {
        return `${Math.floor(dayPassed / 30)} months ago`
      } else {
        return `${Math.floor(dayPassed / 365)} years ago`
      }
    },
    expirationTime(dateExp) { //Pass in the date of expiration to ListPosts.vue
      const date = new Date(dateExp)
      if (isNaN(date.getTime())) {
        return 'Invalid Date'
      }
      const minutesLeft = Math.floor((date.getTime() - Date.now()) / (1000 * 60))
      if (minutesLeft < 60) {
        return `${minutesLeft} minutes left`
      }
      const hoursLeft = Math.floor(minutesLeft / 60)
      if (hoursLeft < 24) {
        return `${hoursLeft} hours ${minutesLeft % 60} minutes left`
      }
    }
  }
})
