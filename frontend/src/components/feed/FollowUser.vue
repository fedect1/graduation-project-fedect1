<script>
import { mapState,mapActions } from 'pinia'
import { useAccountStore } from '../../stores/account'
import { useProfileHandler } from '../../stores/profileHandler'
export default {
  name: 'FollowUser',
  props: ['postUser'],
  data() {
    return {
      following: false
    }
  },
  computed: {
    //...mapState(usePostHandler, ['posts']),
    ...mapState(useAccountStore, ['user']),
    isCurrentUserPostOwner() {
      const currentUser = this.user
      return this.postUser === currentUser._id
    }
  },
  methods: {
    ...mapActions(useProfileHandler, ['followUser', 'unfollowUser']),
    async handleFollowUser() {
      await this.followUser(useAccountStore().user, this.postUser)
    },
    async handleUnfollowUser() {
      await this.unfollowUser(useAccountStore().user, this.postUser)
    },
    async checkIfFollowing() {
      const user = useAccountStore().user._id
      const profile = await this.fetchProfileById(user)
      const following = profile.following
      if (following.includes(this.postUser)) {
        this.following = true
      } else {
        this.following = false
      }
    }
  }
}
</script>

<template>
  <button v-if="!isCurrentUserPostOwner" @click="handleFollowUser" class="follow-button">Follow</button>
</template>

<style scoped>
.follow-button {
  background-color: var(--tertiary-color);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.follow-button:hover {
  background-color: #2680c2;
}
</style>
