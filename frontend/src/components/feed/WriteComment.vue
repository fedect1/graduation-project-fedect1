<script>
export default {
  name: 'WriteComment',
  data() {
    return {
      bodyComment: ''
    }
  }
}
</script>

<template>
  <div class="comment-container">
    <textarea
      v-model="bodyComment"
      name="comment"
      id="comment"
      cols="30"
      rows="1"
      class="write-comment-container"
      placeholder="Write a comment..."
    ></textarea>
    <button class="btn-comment">Send</button>
  </div>
</template>

<style scoped>
.comment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.write-comment-container {
  padding: var(--m-padding);
  width: 90vh;
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
  width: 10%;
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
.btn-comment:hover {
  background-color: var(--secondary-color);
}
</style>
```
