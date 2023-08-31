<script>
import WriteComment from '@/components/feed/WriteComment.vue'
import ListComments from '@/components/feed/ListComments.vue'
import Like from '@/components/feed/Like.vue'
import DeletePost from '@/components/feed/DeletePost.vue'
import FollowUser from '@/components/feed/FollowUser.vue'

import { mapActions } from 'pinia'
import { useFormatDay } from '../../stores/formatDay'


export default {
  name: 'ListPosts',
  props: ['posts'],

  components: {
    WriteComment,
    ListComments,
    Like,
    DeletePost,
    FollowUser
  },
  computed: {
    sortedPosts () {
      return this.posts.sort((a, b) => {
        return new Date(b.expirationDate) - new Date(a.expirationDate)
      })
    },
  },
  methods: {
    ...mapActions(useFormatDay, ['formatDay','expirationTime']),
  }
}
</script>
<template>
  <div class="post-container" v-for="(post) in sortedPosts" :key="post.id">
    <div class="post-header">
      <div class="user-image">
        <img src="https://picsum.photos/200" alt="user" class="user-avatar" />
      </div>
      <div class="user-info">
        <h3>{{ post.user.email }}</h3>
        <FollowUser :postUser="post.user"/>
        <p class="formatDate">{{ expirationTime(post.expirationDate) }}</p>
      </div>
      <DeletePost :post-id="post._id" />
    </div>
    <p class="post-body">
      {{ post.body }}
    </p>
    <p>{{ post.likes }}</p>
    <Like :post-id="post._id" :postLikes="post.likes"/>
    <ListComments :postComments="post.comments" />
    <WriteComment :post-id="post._id" />
  </div>
</template>

<style scoped>
.post-container {
  padding: 30px 40px;
  width: 100%;
  background: transparent;
  border: 2px solid var(--card-background-light);
  color: var(--text-color);
  border-radius: 3px;
  margin-bottom: var(--xs-margin);
}
.post-container .post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items at the top */
  margin-bottom: var(--xs-margin);
}
.user-image {
  margin-right: 20px; /* Add space to the right of the image */
}
.user-image img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-info {
  flex-grow: 1; /* Allow user info to grow and take remaining space */
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
  border: 2px solid var(--card-background-light, 0.2);
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
  padding: 20px 45px 20px 20px;
}

.formatDate {
  font-size: 0.8rem;
  color: var(--text-color);
}
</style>
