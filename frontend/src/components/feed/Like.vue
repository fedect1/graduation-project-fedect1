<script>
import { mapActions, mapState } from 'pinia'
import { usePostHandler } from '../../stores/postHandler'
import { useAccountStore } from '../../stores/account'
export default {
  name: 'Like',
  props: ['postLikes', 'postId'],
  data() {
    return {
      liked: false,
      likeCount: 0
    }
  },
  methods: {
    ...mapActions(usePostHandler, ['likePost', 'dislikePost', 'fetchPostById']),
    async toggleLike() {
      const user = useAccountStore().user._id
      if (this.liked) {
        await this.dislikePost(this.postId, user)
        this.liked = false
        this.likeCount--
      } else {
        await this.likePost(this.postId, user)
        this.liked = true
        this.likeCount++
      }
    },
    async checkIfLiked() {
      const userId = useAccountStore().user._id
      if (this.postLikes.includes(userId)) {
        this.liked = true
      } else {
        this.liked = false
      }
    }
  },
  computed: {
    likeText() {
      if (this.likeCount === 0) {
        return ''
      } else if (this.likeCount === 1) {
        return '1 like'
      } else {
        return `${this.likeCount} likes`
      }
    }
  },
  async mounted() {
    await this.checkIfLiked()
    this.likeCount = this.postLikes.length
  }
}

</script>

<template>
  <button class="like-button" @click="toggleLike">
    <i class="bx bx-like"></i>
    <span class="like-count">{{ likeText }}</span>
  </button>
</template>

<style scoped>
.like-button {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--text-color);
  font-size: 1rem;
}
.like-button .like-count {
  margin-left: 5px;
}
.like-button .fas {
  color: var(--primary-color);
}
.like-button .fas:hover {
  color: var(--primary-color-hover);
}
</style>
