<script>
import { defineComponent } from 'vue'
import WritePost from '@/components/feed/WritePost.vue'
export default defineComponent({
  name: 'FeedView',
  components: {
    WritePost
  }
})
</script>
<template>
  <div class="feed-container">
    <WritePost />
  </div>
</template>
