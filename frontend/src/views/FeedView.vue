<script>
import { mapActions } from 'pinia'
import { usePostHandler } from '../stores/postHandler'
import { defineComponent } from 'vue'
import WritePost from '@/components/feed/WritePost.vue'
export default defineComponent({
  name: 'FeedView',
  components: {
    WritePost
  },
  methods: {
    ...mapActions(usePostHandler, ['createPost']),
    async submitPost(bodyPost) {
      await this.createPost(bodyPost)
    }
  }
})
</script>
<template>
  <div class="feed-container">
    <WritePost :submitPost="submitPost" />
  </div>
</template>
