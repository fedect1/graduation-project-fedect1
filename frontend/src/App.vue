<script>
import { RouterLink, RouterView } from 'vue-router'
import { Suspense } from 'vue'
import { useAccountStore } from './stores/account'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import Navbar from './components/global/Navbar.vue'
export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  async mounted() {
    await this.fetchUser()
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template>
  <header>
    <!-- <Navbar /> -->
    <nav>
      <a v-if="user" @click="handleLogout">Log out</a>
    </nav>
  </header>

  <h1>DW for {{ user?.email }}</h1>
  <main class="containter">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped></style>
