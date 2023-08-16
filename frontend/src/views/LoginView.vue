<script>
import axios from 'axios'
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      user: null
    }
  },
  methods: {
    async login() {
      this.user = (
        await axios.post('http://localhost:3000/accounts/session', {
          email: this.email,
          password: this.password
        })
      ).data
    }
  }
}
</script>
<template lang="pug">
h2 Login

p(v-if="user") You are logged in as {{ user.email }}
form(@submit.prevent="login")
  div
    label(for="email") email
    input#email(v-model="email")
  div
    label(for="password") Password
    input#password(v-model="password")
  div
  button(type="submit") Login
</template>
