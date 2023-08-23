<script>
import WriteComment from '@/components/feed/WriteComment.vue'
import ListComments from '@/components/feed/ListComments.vue'
import Like from '@/components/feed/Like.vue'
import deletePost from '@/components/feed/DeletePost.vue'
export default {
  name: 'ListPosts',
  components: {
    WriteComment,
    ListComments,
    Like,
    deletePost
  },

  props: ['posts']
}
</script>
<template>
  <div class="post-container" v-for="post in posts" :key="post.id">
    <div class="post-header">
      <h3>{{ post.user }}</h3>
      <p>{{ post.expirationDate }}</p>
    </div>
    <deletePost :post-id="post._id" />
    <p class="post-body">
      {{ post.body }}
    </p>
    <Like :post-id="post._id" />
    <ListComments :post-id="post._id" />
    <WriteComment :post-id="post._id" />
  </div>
</template>

<style scoped>
.post-container {
  padding: 30px 40px;
  width: 100%;
  background: transparent;
  border: 2px solid var(--tertiary-color, 0.2);
  color: var(--text-color);
  border-radius: 10px;
}
.post-container .post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.post-container .post-header h3 {
  font-size: 1.2rem;
}
.post-container .post-header p {
  font-size: 0.8rem;
}
.post-container .post-body {
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
