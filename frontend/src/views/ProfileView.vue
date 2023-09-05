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
  <div class="card following-card">
    <div class="card-content">
      <span>Following</span>
      <ul>
        <li v-for="following in user.following" :key="following._id">
          <p>{{ following }}</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="card followers-card">
    <div class="card-content">
      <span>Followers</span>
      <ul>
        <li v-for="follower in user.followedBy" :key="follower._id">
          <p>{{ follower }}</p>
        </li>
      </ul>
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
  justify-content: space-between;
  align-items: center;
  height: 80vh;
  background-color: transparent;
  padding: 0 20px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
}

.card-content {
  padding: 20px;
}

.username,
.description {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.username p,
.description p {
  margin-bottom: 10px;
  font-weight: bold;
}

.username input,
.description input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.username button,
.description button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #007BFF;
  color: white;
  font-weight: bold;
}

.username button:hover,
.description button:hover {
  background: #0056b3;
}

.following-card,
.followers-card {
  width: 200px;
}

.following-card span,
.followers-card span {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.following-card p,
.followers-card p {
  font-weight: bold;
  margin-bottom: 10px;
}

.following-card ul,
.followers-card ul {
  list-style-type: none;
  padding: 0;
}

.following-card li,
.followers-card li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.following-card li:last-child,
.followers-card li:last-child {
  border-bottom: none;
}

.list-post {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
