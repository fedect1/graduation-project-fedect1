<script>
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    userStore.fetchUsers()
    function redirectToUserDetails(id) {
      this.$router.push({ name: 'user-details', params: { id } })
    }
    return {
      userStore,
      redirectToUserDetails
    }
  }
})
</script>

<template>
  <div class="card mb-3 text-bg-secondary">
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action">List of users</a>

      <a
        v-for="user in userStore.users"
        :key="user._id"
        @click="redirectToUserDetails(user._id)"
        class="list-group-item list-group-item-action list-group-item-primary"
        >{{ user.email }} {{ user._id }}</a
      >
    </div>
  </div>
</template>
