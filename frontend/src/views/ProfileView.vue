<script>
import { mapActions, mapState } from 'pinia'
import { useProfileHandler } from '../stores/profileHandler'
import { useAccountStore } from '../stores/account'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
export default {
  name: 'ProfileView',
  data() {
    return {
      newUsername: "",
      newDescription: "",
      posts: []
    }
  },
  async mounted() {
    this.posts = await this.fetchUserPosts(this.user)
    this.newUsername = this.user.name
    this.newDescription = this.user.description
  },

  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser']),
    ...mapActions(useProfileHandler, ['updateName', 'updateDescription', 'updateAvatar', 'fetchUserPosts']),
    async handleNameChange() {
      const newName = this.newUsername
      await this.updateName(this.user, newName)
      this.newUsername = ''
      await this.fetchUser()
    },
    async handleDescriptionChange() {
      const newDescription = this.newDescription
      await this.updateDescription(this.user, newDescription)
      this.newDescription = ''
      await this.fetchUser()
    },

    formatDay(dateStr) {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        return 'Invalid Date'
      }
      const dayPassed = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
      if (dayPassed === 0) {
        const hourPassed = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
        if (hourPassed === 0) {
          const minutePassed = Math.floor((Date.now() - date.getTime()) / (1000 * 60))
          if (minutePassed === 0) {
            return 'Just now'
          } else if (minutePassed === 1) {
            return '1 minute ago'
          } else {
            return `${minutePassed} minutes ago`
          }
        } else if (hourPassed === 1) {
          return '1 hour ago'
        } else {
          return `${hourPassed} hours ago`
        }
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
  }
}
</script>

<template>

  <div class="profile-edit-container">
    <div class="card">
      <div class="card-content">
        <div class="username">
          <p>Username</p>
          <input
            v-model="newUsername"
            type="text"
            name="username"
            id="username"
            :placeholder="newUsername"
          />
          <button @click="handleNameChange">Save</button>
        </div>
        <div class="description">
          <p>Description</p>
          <input
            v-model="newDescription"
            type="text"
            name="description"
            id="description"
            :placeholder="newDescription"
          />
          <button @click="handleDescriptionChange">Save</button>
        </div>
      </div>
    </div>
  </div>
    <div class="list-post">
      <p>Posts</p>
      <div v-for="post in posts" :key="post._id">
        <p>{{ post.body }}</p>
        <p>{{ formatDay(post.createdAt) }}</p>
        <div v-for="comment in post.comments">
          <p>{{ comment.author }}</p>
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>


</template>

<style scoped>
.profile-edit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding-bottom: 10px;
}
.username,
.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding-bottom: 10px;
}

.username input,
.description input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid var(--primary-color, rgba(0, 0, 0, 0.2));
  border-radius: 5px;
  background: var(--card-background);
  color: var(--text-color);
}

.username button,
.description button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid var(--primary-color, rgba(0, 0, 0, 0.2));
  border-radius: 5px;
  background: var(--card-background);
  color: var(--text-color);
}
.list-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding-bottom: 10px;
  color: white;
}

</style>
