<template>
  <div class="error-container">
    <h2>Unauthorized Access</h2>
    <p>You are not authorized to access this page.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAccountStore } from '../stores/account'
import { useRouter } from 'vue-router'

export default {
  name: 'ErrorView',
  methods: {
    logout() {
      const accountStore = useAccountStore()
      accountStore.logout() // Implementa tu lógica de deslogueo aquí
      const router = useRouter()
      router.push({ name: 'home' }) // Redirige al usuario a la página de inicio después del deslogueo
    }
  }
}
</script>

<style scoped>
/* Agrega estilos según tus preferencias */
.error-container {
  text-align: center;
  margin-top: 50px;
}
.error-container h2 {
  color: red;
}
</style>
