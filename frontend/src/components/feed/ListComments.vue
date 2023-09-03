<script>
export default {
  name: 'ListComments',
  props: ['postComments'],
}
</script>
<template>
  <div class="comment-container">
    <div class="comment-list" v-for="(comment, index) in postComments" :key="index">
      <p class="comment-text">{{ comment.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 20px 0;
}
.comment-list {
  padding: var(--m-padding);
  width: 90%;
  background: transparent;
  border: 2px solid var(--primary-color, rgba(0, 0, 0, 0.2));
  color: var(--text-color);
  border-radius: 10px;
  transition: border-color 0.3s;
  outline: none;
}
.comment-list:focus {
  border-color: var(--primary-color);
}
.comment-list .comment-text {
  font-size: 1rem;
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  border: 2px solid var(--text-color, 0.2);
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
  padding: 20px 45px 20px 20px;
}
</style>
