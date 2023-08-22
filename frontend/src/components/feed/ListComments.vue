<script>
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import { usePostHandler } from '../../stores/postHandler'
export default {
  name: 'ListComments',
  props: ['post-id'],
  computed: {
    ...mapState(usePostHandler, ['comments'])
  },
  methods: {
    ...mapActions(usePostHandler, ['fetchComments']),
    async fetchCommentsForPost(postId) {
      await this.fetchComments(postId)
    }
  },
  async mounted() {
    console.log('mounted')
    await this.fetchCommentsForPost(this.postId)
  }
}
</script>
<template>
  <div class="comment-container">
    <div class="comment-list" v-for="(comment, index) in comments" :key="index">
      <p class="comment-text">{{ comment.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.comment-list {
  padding: var(--m-padding);
  width: 90vh;
  background: transparent;
  border: 2px solid var(--primary-color, rgba(0, 0, 0, 0.2));
  color: var(--text-color);
  border-radius: 10px;
  transition: border-color 0.3s;
  outline: none;
}
.comment-list:focus {
  border-color: var(--primary-color);
}
.comment-list .comment-text {
  font-size: 1rem;
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  border: 2px solid var(--text-color, 0.2);
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
  padding: 20px 45px 20px 20px;
}
</style>
