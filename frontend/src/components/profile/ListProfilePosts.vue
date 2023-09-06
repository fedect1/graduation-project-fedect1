<script>
import ListComments from '@/components/feed/ListComments.vue'

export default {
  name: 'ListPosts',
  props: ['posts'],

  components: {
    ListComments
  },
  computed: {
    sortedPosts() {
      return this.posts.sort((a, b) => {
        return new Date(b.expirationDate) - new Date(a.expirationDate)
      })
    }
  },
  methods: {
    formatDay(dateStr) {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        return 'Invalid Date'
      }
      const dayPassed = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
      if (dayPassed === 0) {
        const hourPassed = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
        if (hourPassed === 0) {
          const minutePassed = Math.floor((Date.now() - date.getTime()) / (1000 * 60))
          if (minutePassed === 0) {
            return 'Just now'
          } else if (minutePassed === 1) {
            return '1 minute ago'
          } else {
            return `${minutePassed} minutes ago`
          }
        } else if (hourPassed === 1) {
          return '1 hour ago'
        } else {
          return `${hourPassed} hours ago`
        }
      } else if (dayPassed === 1) {
        return 'Yesterday'
      } else if (dayPassed < 7) {
        return `${dayPassed} days ago`
      } else if (dayPassed < 30) {
        return `${Math.floor(dayPassed / 7)} weeks ago`
      } else if (dayPassed < 365) {
        return `${Math.floor(dayPassed / 30)} months ago`
      } else {
        return `${Math.floor(dayPassed / 365)} years ago`
      }
    }
  }
}
</script>
<template>
  <div class="post-container" v-for="post in sortedPosts" :key="post.id">
    <div class="formatDate">
      {{ formatDay(post.createdAt) }}
    </div>
    <p class="post-body">
      {{ post.body }}
    </p>
    <div class="line"></div>
    <div class="comment-container">
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
