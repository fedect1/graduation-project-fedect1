<script>
import { mapActions } from 'pinia'
import { usePostHandler } from '../../stores/postHandler'
import { useAccountStore } from '../../stores/account'

export default {
  name: 'WriteComment',
  props: ['post-id'],
  data() {
    return {
      text: '',
      wordsQuantity: 0,
      textareaHeight: 200
    }
  },
  methods: {
    ...mapActions(usePostHandler, ['createComment']),
    async handleSubmitComment() {
      const userName = useAccountStore().user.name
      if (this.text.trim() !== '') {
        const newComment = await this.createComment(this.postId, this.text, userName)
        this.$emit('commentAdded', newComment, this.postId);
        this.text = ''
      }
    }
  },
  watch: {
    text() {
      this.wordsQuantity = this.text.trim().split(/\s+/).length
      const textarea = this.$refs.textarea
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 5 + 'px'
      }
    }
  }
}
</script>

<template>
  <div class="comment-container">
    <textarea
      v-model="text"
      name="comment"
      id="comment"
      cols="20"
      rows="1"
      class="write-comment-container"
      placeholder="Write a comment... (max 100 words)"
      ref="textarea"
    ></textarea>
    <button
      @click="handleSubmitComment"
      type="submit"
      class="btn-comment"
      :disabled="wordsQuantity === 0 || wordsQuantity > 100"
    >
      {{ wordsQuantity > 100 ? `Delete ${wordsQuantity - 100} words to send` : 'Send' }}
    </button>
  </div>
</template>

<style scoped>
.comment-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  align-items: flex-end;
  margin: 20px 0;
}
.write-comment-container {
  width: 90%;
  padding: var(--m-padding);
  background: transparent;
  border: 2px solid var(--primary-color, rgba(0, 0, 0, 0.2));
  color: var(--text-color);
  border-radius: 10px;
  transition: border-color 0.3s;
  outline: none;
}
.write-comment-container:focus {
  border-color: var(--secondary-color);
}

.btn-comment {
  align-self: flex-end;
  margin-top: var(--m-margin);
  width: auto;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 0 5px var(--text-color, 0.1);
  cursor: pointer;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 2px 10px;
}
.btn-comment:hover {
  background-color: var(--secondary-color);
}
</style>
```
