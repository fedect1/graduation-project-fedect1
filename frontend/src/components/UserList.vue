<script>
import axios from 'axios'
export default {
  name: 'UserList',
  data() {
    return {
      users: []
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users')
        if (response.status === 200) {
          this.users = response.data
          console.log(this.users)
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error request')
      }
    }
  }
}
</script>

<template>
  <div class="card mb-3 text-bg-secondary">
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action">List of users</a>

      <a
        href="#"
        class="list-group-item list-group-item-action list-group-item-primary"
        v-for="user in users"
        :key="user.id"
        >{{ user }}</a
      >
    </div>
  </div>
</template>
