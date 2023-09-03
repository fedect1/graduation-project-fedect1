<script>
export default {
  name: 'WritePost',
  props: ['submitPost'],
  data() {
    return {
      bodyPost: '',
      wordsQuantity: 0,
      textareaHeight: 200
    }
  },
  methods: {
    async handleSubmit() {
      if (this.bodyPost.trim() !== '') {
        await this.submitPost(this.bodyPost)
        this.bodyPost = ''
      }
    }
  },
  watch: {
    bodyPost() {

      this.wordsQuantity = this.bodyPost.trim().split(/\s+/).length
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
  <div class="post-container">
    <textarea
      v-model="bodyPost"
      name="post"
      id="post"
      cols="20"
      class="write-post-container"
      placeholder="What's on your mind?"
      :style="{'border-color': wordsQuantity > 250 ? 'red' : 'var(--primary-color, rgba(0, 0, 0, 0.2)'}"
      ref="textarea"
    ></textarea>
    <button @click="handleSubmit" type="submit" class="btn" :class="{'btn-alert':wordsQuantity>250}" :disabled="wordsQuantity === 0 || wordsQuantity > 250">{{ wordsQuantity > 250 ? `Delete ${wordsQuantity - 250} words to send` : 'Send' }}</button>
  </div>
</template>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding-bottom: 10px;
}
.write-post-container {
  padding: 30px 40px;
  width: 100vh;
  background: var(--card-background);
  border: 2px solid var(--primary-color, rgba(0, 0, 0, 0.2));
  color: var(--text-color);
  border-radius: 10px;
  transition: border-color 0.3s;
  outline: none;
}
.write-post-container:focus {
  border-color: var(--tertiary-color);
}

.btn {
  align-self: flex-end;
  margin-top: 10px;
  width: 10%;
  height: auto;
  background-color: var(--tertiary-color);
  border: none;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 0 5px var(--text-color, 0.1);
  cursor: pointer;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}
.btn:hover {
  background-color: var(--page-background);
}
.btn-alert {
  width: auto;
  background-color: red;
  color: white;
}

</style>
