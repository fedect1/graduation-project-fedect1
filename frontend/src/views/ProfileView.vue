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
      newUsername: '',
      newDescription: '',
      newAvatar: '',
      posts: []
    }
  },
  async mounted() {
    this.posts = await this.fetchPosts()
  },

  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser']),
    ...mapActions(useProfileHandler, ['updateName', 'updateDescription', 'updateAvatar']),
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
    async handleAvatarChange() {
      const newAvatar = this.newAvatar
      await this.updateAvatar(this.user, newAvatar)
      this.newAvatar = ''
      await this.fetchUser()
    },
    async fetchPosts() {
      return (await axios.get(`/users/${this.user._id}/posts`)).data
    }
  }
}
</script>

<template>
  <div class="profile-edit-container">
    <div class="username">
      <p>Username</p>
      <input
        v-model="newUsername"
        type="text"
        name="username"
        id="username"
        placeholder="Username"
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
        placeholder="Description"
      />
      <button @click="handleDescriptionChange">Save</button>
    </div>
    <div class="list-post">
      <p>Posts</p>
      <div v-for="post in posts" :key="post._id">
        <p>{{ post.body }}</p>
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
