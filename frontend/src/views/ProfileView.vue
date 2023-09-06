<script>
import { mapActions, mapState } from 'pinia'
import { useProfileHandler } from '../stores/profileHandler'
import { useAccountStore } from '../stores/account'
import ListProfilePosts from '@/components/profile/ListProfilePosts.vue'
import Swal from 'sweetalert2'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
export default {
  name: 'ProfileView',
  data() {
    return {
      newUsername: '',
      newDescription: '',
      posts: [],
      followedByQuantity: 0,
      followingQuantity: 0
    }
  },
  components: {
    ListProfilePosts
  },

  async mounted() {
    this.posts = await this.fetchUserPosts(this.user)
    this.newUsername = this.user.name
    this.newDescription = this.user.description
    this.followedByQuantity = this.user.followedBy.length
    this.followingQuantity = this.user.following.length
  },

  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useProfileHandler, [
      'updateName',
      'updateDescription',
      'updateAvatar',
      'fetchUserPosts'
    ]),
    async handleNameChange() {
      const newName = this.newUsername
      await this.updateName(this.user, newName)
      Swal.fire('Success!', 'Your name has been updated.', 'success')
    },
    async handleDescriptionChange() {
      const newDescription = this.newDescription
      await this.updateDescription(this.user, newDescription)
      Swal.fire('Success!', 'Your description has been updated.', 'success')
    }
  }
}
</script>

<template>
  <div class="profile-edit-container">
    <div class="card">
      <div class="card-content">
        <div class="username">
          <p>Username: {{ newUsername }}</p>
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
          <p>Description: {{ newDescription }}</p>
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
        <span>Following: {{ followingQuantity }}</span>
      </div>
    </div>
    <div class="card followers-card">
      <div class="card-content">
        <span>Followers: {{ followedByQuantity }}</span>
      </div>
    </div>
  </div>
  <p class="post-title">Posts</p>
  <div class="post-profile-container">
    <ListProfilePosts :posts="posts" />
  </div>
</template>

<style scoped>
.profile-edit-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50vh;
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
  background: #007bff;
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
.post-profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
  padding-left: 10rem;
  color: var(--text-color);
}
</style>
