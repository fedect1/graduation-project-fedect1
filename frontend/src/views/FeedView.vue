<script>
import { mapActions } from 'pinia'
import { usePostHandler } from '../stores/postHandler'
import { defineComponent } from 'vue'
import WritePost from '@/components/feed/WritePost.vue'
import ListPosts from '@/components/feed/ListPosts.vue'
export default defineComponent({
  name: 'FeedView',
  data() {
    return {
      validPosts: []
    }
  },

  components: {
    WritePost,
    ListPosts
  },
  async mounted() {
    //await this.fetchPosts()
    this.validPosts = await this.fetchValidPosts()
  },

  methods: {
    ...mapActions(usePostHandler, ['createPost', 'fetchPosts', 'fetchValidPosts']),
    async submitPost(bodyPost) {
      await this.createPost(bodyPost)
      this.validPosts = await this.fetchValidPosts()
    },
    async refreshPosts() {
      this.validPosts = await this.fetchValidPosts()
    }
  }
  // computed: {
  //   ...mapState(usePostHandler, ['posts'])
  // }
})
</script>
<template>
  <div class="feed-container">
    <WritePost :submitPost="submitPost" />
    <ListPosts :posts="validPosts" @postDeleted="refreshPosts" />
  </div>
</template>
<style scoped>
.feed-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
