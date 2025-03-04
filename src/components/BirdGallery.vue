<script setup lang="ts">
import { ref, computed } from 'vue';
import { birds } from '../data/birds';
import BirdCard from './BirdCard.vue';

const searchQuery = ref('');

const filteredBirds = computed(() => {
  if (!searchQuery.value) return birds;

  const query = searchQuery.value.toLowerCase();
  return birds.filter(bird =>
    bird.name.toLowerCase().includes(query) ||
    bird.scientificName.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="transition-opacity duration-300 ease-in-out">
    <div class="mb-3 sticky top-0 bg-slate-100 py-2 z-[90]">
      <input v-model="searchQuery" type="text" placeholder="Zoeken naar vogels..."
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pokedex-red focus:border-transparent" />
    </div>

    <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      <router-link v-for="bird in filteredBirds" :key="bird.id" :to="{ name: 'bird', params: { id: bird.id } }">
        <BirdCard :bird="bird" />
      </router-link>
    </div>
  </div>
</template>