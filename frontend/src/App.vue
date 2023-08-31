<script>
import { RouterView } from 'vue-router'
import { Suspense } from 'vue'
import { useAccountStore } from './stores/account'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import Navbar from './components/global/Navbar.vue'
export default {
  name: 'App',
  components: {
    RouterView,
    Navbar
  },
  // async mounted() {
  //   await this.fetchUser()
  // },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
    async handleLogout() {
      this.$router.push('/')
      await this.logout()
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template>
  <header>
    <Navbar v-if="user" :user="user" />
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
