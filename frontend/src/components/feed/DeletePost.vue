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
      <span class="btn-delete">Delete</span>
    </button>

</template>

<style scoped>
.delete-button {
  line-height: 0.5;
  border: 2px solid var(--primary-color);
  background: transparent;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  color: var(--text-color);
  font-size: 1rem;
  margin-right: 1rem;
}

.btn-delete {
  margin-left: 0.5rem;
}


</style>
