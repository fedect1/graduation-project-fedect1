<script>
export default {
  name: 'WritePost'
}
</script>
<template>
  <div class="post-container">
    <textarea
      v-model="postContent"
      name="post"
      id="post"
      cols="30"
      rows="10"
      class="write-post-container"
      placeholder="What's on your mind?"
    ></textarea>
    <button @click="submitPost" type="submit" class="btn">Send</button>
  </div>
</template>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.write-post-container {
  padding: 30px 40px;
  width: 100vh;
  background: transparent;
  border: 2px solid var(--tertiary-color, rgba(0, 0, 0, 0.2));
  color: var(--text-color);
  border-radius: 10px;
  transition: border-color 0.3s;
  outline: none;
}
.write-post-container:focus {
  border-color: var(--primary-color);
}

.btn {
  align-self: flex-end;
  margin-top: 20px;
  width: 15%;
  height: 50px;
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
</style>
