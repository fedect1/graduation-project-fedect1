<script>
import { mapActions, mapState } from 'pinia'
import { useProfileHandler } from '../stores/profileHandler'
import { useAccountStore } from '../stores/account'
export default {
  name: 'ProfileView',
  data() {
    return {
      newUsername: '',
      newDescription: '',
      newAvatar: ''
    }
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
    }
  }
}
</script>

<template>
  <div v-if="user" class="profile-container">
    <h2>Profile</h2>
    <div class="profile-info">
      <div class="profile-info-username">
        <p>Username</p>
        <p>{{ user.name }}</p>
      </div>
      <div class="profile-info-description">
        <p>Description</p>
        <p>{{ user.description }}</p>
      </div>
      <div class="profile-info-avatar">
        <p>Avatar</p>
        <p>{{ this.user.avatar }}</p>
        <img alt="avatar" />
      </div>
    </div>
  </div>

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
    <div class="avatar">
      <p>Avatar</p>
      <input type="file" name="avatar" id="avatar" />
      <button>Save</button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 30px 40px;
  width: 100%;
  background: transparent;
  border: 2px solid var(--tertiary-color, 0.2);
  color: var(--text-color);
  border-radius: 10px;
}
.profile-container h2 {
  font-size: 1.2rem;
}
.profile-edit-container {
  padding: 30px 40px;
  width: 100%;
  background: transparent;
  border: 2px solid var(--tertiary-color, 0.2);
  color: var(--text-color);
  border-radius: 10px;
}
.profile-edit-container .username {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.profile-edit-container .username p {
  font-size: 1.2rem;
}
.profile-edit-container .username input {
  font-size: 0.8rem;
}
.profile-edit-container .description {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.profile-edit-container .description p {
  font-size: 1.2rem;
}
.profile-edit-container .description input {
  font-size: 0.8rem;
}
.profile-edit-container .avatar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.profile-edit-container .avatar p {
  font-size: 1.2rem;
}
.profile-edit-container .avatar input {
  font-size: 0.8rem;
}
</style>
```
