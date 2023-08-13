<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="containter">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped></style>
