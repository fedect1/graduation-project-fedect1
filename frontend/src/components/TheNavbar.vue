<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Index</router-link></li>
      <li><router-link to="/">About</router-link></li>
      <li><router-link to="/">Contact</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
}

li {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>

<script>
export default {
  name: 'TheNavbar'
}
</script>
