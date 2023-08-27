<script>
import { mapActions, mapState } from 'pinia'
import { usePostHandler } from '../../stores/postHandler'
import { useAccountStore } from '../../stores/account'
export default {
  name: 'DeleteComment',
  props: ['comment-index'],
  methods: {
    ...mapActions(usePostHandler, ['deleteComment']),
    async handleDeleteComment() {
      await this.deleteComment(this.commentId, useAccountStore().user._id)
    }
  },
  computed: {
    ...mapState(usePostHandler, ['posts']),
    isCurrentUserCommentOwner() {
      const currentUser = useAccountStore().user
      const post = this.posts.find((post) => post._id === this.commentId)
      return post && post.user === currentUser._id
    }
  }
}
</script>
<template>
  <button v-if="isCurrentUserCommentOwner" class="delete-button" @click="handleDeleteComment">
    <i class="bx bx-trash"></i>
  </button>
</template>
