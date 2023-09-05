<script>
import { mapActions, mapState } from 'pinia'
import { usePostHandler } from '../../stores/postHandler'
import { useAccountStore } from '../../stores/account'
export default {
  name: 'DeletePost',
  props: ['postUser', 'postId'],
  computed: {
    ...mapState(usePostHandler, ['posts']),
    ...mapState(useAccountStore, ['user']),
    isCurrentUserPostOwner() {
      const currentUser = this.user

      if (currentUser) return this.postUser._id === currentUser._id

    }
  },
  methods: {
    ...mapActions(usePostHandler, ['deletePost']),
    async handleDeletePost() {
      await this.deletePost(this.postId, useAccountStore().user._id)
    }
  }
}
</script>

<template>
  <button v-if="isCurrentUserPostOwner" class="delete-button" @click="handleDeletePost">
    <i class="bx bx-trash"></i>
  </button>
</template>
