<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="p-3 md:p-4 max-w-[968px] mx-auto">
      <h1 class="text-3xl font-bold text-center text-pokedex-red mt-2">Vogeldex</h1>

      <router-view />
    </div>
    <footer class="h-8 left-0 right-0 bg-pokedex-red flex items-center justify-center text-sm">
      <div class="flex justify-between w-full px-4">
        <span class="text-white text-center">Made by Bart</span>
        <router-link to="/login" class="text-white hover:text-slate-200">
          Inloggen
        </router-link>
      </div>
    </footer>
  </div>
</template>