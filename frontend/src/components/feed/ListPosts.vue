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
    updateComments(newComment, postId) {
      const postToUpdate = this.posts.find(post => post._id === postId);
      if (postToUpdate) {
        postToUpdate.comments.push(newComment);
      }
    }
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
        <h3>{{ post.user.name }}</h3>
        <FollowUser :postUser="post.user"/>
        <p class="formatDate">{{ expirationTime(post.expirationDate) }}</p>
      </div>
      <DeletePost :postUser="post.user" :postId="post._id" />
      <Like :post-id="post._id" :postLikes="post.likes"/>
    </div>
    <p class="post-body">
      {{ post.body }}
    </p>
    <div class="line"></div>
    <div class="comment-container">
      <WriteComment :post-id="post._id" @commentAdded="updateComments" />
      <span class="comment-count">{{ post.comments.length }} comments</span>
      <ListComments :postComments="post.comments" />
    </div>
  </div>
</template>

<style scoped>
.post-container {
  padding: 30px 40px;
  width: 100vh;
  background: transparent;
  border: 2px solid var(--card-background-light, 0.2);
  color: var(--text-color);
  border-radius: 14px;
  margin-bottom: var(--xs-margin);

}
.post-container .post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--m-margin);
}
.user-image {
  margin-right: 20px;
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
  background-color: #292929;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
  padding: 20px 45px 20px 20px;
}

.formatDate {
  font-size: 0.8rem;
  color: var(--text-color);
}

.comment-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: var(--xs-margin);
}

.comment-count {
  font-size: 0.8rem;
  color: var(--text-color);
  margin: var(--m-margin) 0;
}

.line {
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background-color: var(--card-background-light);
  margin: var(--m-margin) 0;
}
</style>
