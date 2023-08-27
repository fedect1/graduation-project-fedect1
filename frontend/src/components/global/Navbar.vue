<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>
<template lang="pug">
h2.logo White Dwarfs Messenger
nav.navbar
  p Hi Fede
  a(href='#') Log out
</template>
