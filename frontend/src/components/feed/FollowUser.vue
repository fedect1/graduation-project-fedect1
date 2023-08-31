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
  async mounted() {
    this.checkIfFollowing()
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    isCurrentUserPostOwner() {
      const currentUser = this.user
      return this.postUser._id === currentUser._id
    }
  },
  methods: {
    ...mapActions(useProfileHandler, ['followUser', 'unfollowUser', 'getFollowings']),
    async handleFollowUser() {
      await this.followUser(useAccountStore().user, this.postUser._id)
    },
    async handleUnfollowUser() {
      await this.unfollowUser(useAccountStore().user, this.postUser._id)
    },
    checkIfFollowing() {
      const user = useAccountStore().user
      const followings = user.following
      const followingCheck = followings.some((following) => following._id === this.postUser._id)
      if (followingCheck) {
        this.following = true
      } else {
        this.following = false
      }
    }
  },
}
</script>

<template>
  <button v-if="!isCurrentUserPostOwner && !following" @click="handleFollowUser" class="follow-button">Follow</button>
  <button v-if="!isCurrentUserPostOwner && following" @click="handleUnfollowUser" class="unfollow-button">Unfollow</button>
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
.unfollow-button {
  background-color: var(--tertiary-color);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.unfollow-button:hover {
  background-color: #2680c2;
}
</style>
