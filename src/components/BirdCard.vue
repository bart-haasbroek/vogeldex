<script setup lang="ts">
import { Bird } from '../types/Bird';

defineProps<{
  bird: Bird;
}>();
</script>

<template>
  <div class="bird-card cursor-pointer">
    <div class="relative pb-[75%]" :class="{ 'bg-slate-200': !bird.image }">
      <img src="/src/assets/bird-unknown.png" :alt="bird.title" class="opacity-50 absolute w-[60%] object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <img
        v-if="bird.image"
        :src="bird.image" :alt="bird.title" class="absolute h-full w-full object-cover" />
    </div>
    <div class="p-4">
      <h3 class="text-sm md:text-lg font-bold text-gray-800">{{ bird.title }}</h3>
      <p class="text-xs md:text-sm italic text-gray-600">{{ bird.scientificName }}</p>
    </div>
  </div>
</template>