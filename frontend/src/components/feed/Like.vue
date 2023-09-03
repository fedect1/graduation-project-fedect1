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
        return 'Like'
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
  <button class="like-button" @click="toggleLike" :class="{'liked': liked}">
    <i class="bx bx-like"></i>
    <span class="like-count">{{ likeText }}</span>
  </button>
</template>

<style scoped>
.like-button {
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
}

.span {
  margin-left: 0.5rem;
}
.like-button .like-count {
  margin-left: 5px;
}
.like-button .fas {
  color: var(--primary-color);
  transition: all 0.3s ease-in-out;
}
.like-button .fas:hover {
  color: var(--primary-color-hover);
}
.like-button .bx {
  color: var(--primary-color);
  transition: all 0.3s ease-in-out;
}
.like-button .bx:hover {
  color: var(--primary-color-hover);
}

.like-button.liked{
  background-color: var(--tertiary-color);
  color: var(--text-color);
}
</style>
