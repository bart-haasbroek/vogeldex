<script setup lang="ts">
import { ref, computed } from 'vue';
import { Bird } from '../types/Bird';
import { birds } from '../data/birds';
import BirdCard from './BirdCard.vue';
import BirdDetail from './BirdDetail.vue';

const selectedBird = ref<Bird | null>(null);
const searchQuery = ref('');
const showDetailView = ref(false);

const filteredBirds = computed(() => {
  if (!searchQuery.value) return birds;

  const query = searchQuery.value.toLowerCase();
  return birds.filter(bird =>
    bird.name.toLowerCase().includes(query) ||
    bird.scientificName.toLowerCase().includes(query)
  );
});

function selectBird(bird: Bird) {
  selectedBird.value = bird;
  showDetailView.value = true;
}

function clearSelection() {
  showDetailView.value = false;
  setTimeout(() => {
    selectedBird.value = null;
  }, 300); // Small delay to allow for transition
}
</script>

<template>
  <div class="p-2 max-w-[968px] mx-auto">
    <h1 class="text-3xl font-bold text-center text-pokedex-red mt-2">Vogeldex</h1>

    <div v-if="!showDetailView" class="transition-opacity duration-300 ease-in-out">
      <div class="mb-3 sticky top-0 bg-slate-100 py-2 z-[90]">
        <input v-model="searchQuery" type="text" placeholder="Zoeken naar vogels..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pokedex-red focus:border-transparent" />
      </div>

      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <BirdCard v-for="bird in filteredBirds" :key="bird.id" :bird="bird" :onClick="selectBird" />
      </div>
    </div>

    <div v-if="showDetailView" class="transition-opacity duration-300 ease-in-out">
      <button @click="clearSelection" class="mb-4 flex items-center text-pokedex-red hover:text-pokedex-dark-red">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to gallery
      </button>

      <BirdDetail :bird="selectedBird" :onClose="clearSelection" />
    </div>
  </div>
</template>