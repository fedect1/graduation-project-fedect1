<script>
import { RouterLink, RouterView } from 'vue-router'
import { Suspense } from 'vue'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    Suspense
  },
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    await this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        this.user = (
          await axios.get('http://127.0.0.1:3000/accounts/session', {
            withCredentials: true
          })
        ).data
      } catch (e) {
        this.user = null
      }
    }
  }
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/signup">Sign up</RouterLink>
    </nav>
  </header>
  <main class="containter">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped></style>
