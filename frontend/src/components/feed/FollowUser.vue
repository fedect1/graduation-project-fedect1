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
  mounted() {
    this.checkIfFollowing()

    console.log(this.following)
  },
  computed: {
    //...mapState(usePostHandler, ['posts']),
    ...mapState(useAccountStore, ['user']),
    isCurrentUserPostOwner() {
      const currentUser = this.user
      console.log(this.postUser._id)
      console.log(currentUser._id)
      return this.postUser._id === currentUser._id
    }
  },
  methods: {
    ...mapActions(useProfileHandler, ['followUser', 'unfollowUser', 'getFollowings']),
    async handleFollowUser() {
      await this.followUser(useAccountStore().user, this.postUser)
    },
    async handleUnfollowUser() {
      await this.unfollowUser(useAccountStore().user, this.postUser)
    },
    async checkIfFollowing() {
      const user = useAccountStore().user
      const followings = await this.getFollowings(user)
      const followingCheck = followings.some((following) => following._id === this.postUser)
      if (followingCheck) {
        this.following = true
      } else {
        this.following = false
      }
    }
  }
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
</style>
