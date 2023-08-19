<script>
import { RouterLink, RouterView } from 'vue-router'
import { Suspense } from 'vue'
import { useAccountStore } from './stores/account'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'

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
    ...mapActions(useAccountStore, ['fetchUser', 'logout'])
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template>
  <header>
    <nav>
      <a v-if="user" @click="logout">Log out</a>
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
