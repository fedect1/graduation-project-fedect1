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

<template lang="pug">
header
  navbar(v-if='user' :user='user')
main.containter
  Suspense
    RouterView
</template>

<style scoped></style>
