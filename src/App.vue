<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col p-4">
    <header></header>
    <main class="flex flex-col grow border-2 border-lightblue rounded-xl p-4 gradient">
      <RouterView  />
    </main>
    <footer></footer>
  </div>
</template>