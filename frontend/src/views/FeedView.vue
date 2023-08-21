<script>
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import { usePostHandler } from '../stores/postHandler'
import { defineComponent } from 'vue'
import WritePost from '@/components/feed/WritePost.vue'
import ListPosts from '@/components/feed/ListPosts.vue'
export default defineComponent({
  name: 'FeedView',
  components: {
    WritePost,
    ListPosts
  },
  async mounted() {
    await this.fetchPosts()
  },

  methods: {
    ...mapActions(usePostHandler, ['createPost', 'fetchPosts']),
    async submitPost(bodyPost) {
      await this.createPost(bodyPost)
    }
  },
  computed: {
    ...mapState(usePostHandler, ['posts'])
  }
})
</script>
<template>
  <div class="feed-container">
    <WritePost :submitPost="submitPost" />
    <h3 style="color: white">List of posts:</h3>
    <ListPosts :posts="posts" />
  </div>
</template>
