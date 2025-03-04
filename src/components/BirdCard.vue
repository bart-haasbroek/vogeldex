<script setup lang="ts">
import { Bird } from '../types/Bird';

defineProps<{
  bird: Bird;
  onClick: (bird: Bird) => void;
}>();
</script>

<template>
  <div class="bird-card cursor-pointer" @click="onClick(bird)">
    <div class="relative pb-[75%]">
      <img :src="bird.imageUrl" :alt="bird.name" class="absolute h-full w-full object-cover" />
    </div>
    <div class="p-4">
      <h3 class="text-sm md:text-lg font-bold text-gray-800">{{ bird.name }}</h3>
      <p class="text-xs md:text-sm italic text-gray-600">{{ bird.scientificName }}</p>
    </div>
  </div>
</template>