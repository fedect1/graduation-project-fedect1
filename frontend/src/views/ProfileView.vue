<script>
import { mapActions, mapState } from 'pinia'
import { useProfileHandler } from '../stores/profileHandler'
import { useAccountStore } from '../stores/account'
export default {
  name: 'ProfileView',
  async mounted() {
    await this.fetchUser()
    await this.fetchProfile(this.user)
  },
  methods: {
    ...mapActions(useProfileHandler, [
      'fetchProfile',
      'updateName',
      'updateDescription',
      'updateAvatar'
    ]),
    ...mapActions(useAccountStore, ['fetchUser'])
  },
  computed: {
    ...mapState(useProfileHandler, ['username', 'description', 'avatar']),
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template>
  <div class="profile-container">
    <h2>Profile</h2>
    <div class="profile-info">
      <div class="profile-info-username">
        <p>Username</p>
        <p>{{ username }}</p>
      </div>
      <div class="profile-info-description">
        <p>Description</p>
        <p>{{ description }}</p>
      </div>
      <div class="profile-info-avatar">
        <p>Avatar</p>
        <img :src="avatar" alt="avatar" />
      </div>
    </div>
  </div>
  <div class="profile-edit-container">
    <div class="username">
      <p>Username</p>
      <input type="text" name="username" id="username" placeholder="Username" />
      <button>Save</button>
    </div>
    <div class="description">
      <p>Description</p>
      <input type="text" name="description" id="description" placeholder="Description" />
      <button>Save</button>
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
