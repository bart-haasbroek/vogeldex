<script setup lang="ts">
import { ref } from 'vue';
import { Bird } from '../types/Bird';

const props = defineProps<{
  bird: Bird | null;
  onClose: () => void;
}>();

const activeSection = ref<string | null>(null);

function toggleSection(section: string) {
  activeSection.value = activeSection.value === section ? null : section;
}

function isActive(section: string): boolean {
  return activeSection.value === section;
}
console.log(props.bird);
</script>

<template>
  <div v-if="bird" class="pokedex-container">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h2 class="text-xl font-bold text-slate-50">{{ bird.name }}</h2>
        <p class="text-sm italic text-gray-900">{{ bird.scientificName }}</p>
      </div>
      <button @click="onClose"
        class="bg-pokedex-yellow hover:bg-pokedex-gold text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
        X
      </button>
    </div>

    <div class="pokedex-screen mb-4">
      <div v-if="bird.imageUrl" class="relative">
        <img :src="bird.imageUrl" :alt="bird.name" class="w-full h-64 object-cover rounded" />
      </div>
      <div v-else class="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
        <button class="pokedex-button flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Add Photo
        </button>
      </div>
    </div>

    <div class="pokedex-screen">

      <div class="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div class="bg-gray-100 p-2 rounded">
          <span class="font-bold">Location:</span> {{ bird.location }}
        </div>
        <div class="bg-gray-100 p-2 rounded">
          <span class="font-bold">Date:</span> {{ bird.date }}
        </div>
      </div>

      <p class="text-gray-700 mb-4">{{ bird.description }}</p>

      <!-- Collapsible sections -->
      <div class="space-y-2">
        <!-- Habitat section -->
        <div v-for="property of bird.properties" class="border border-gray-200 rounded overflow-hidden">
          <button @click="toggleSection(property.key)"
            class="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center">
            <span class="font-semibold">{{ property.name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300"
              :class="{ 'rotate-180': isActive(property.key) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="overflow-hidden transition-all duration-300 ease-in-out"
            :class="isActive(property.key) ? 'max-h-auto' : 'max-h-0'">
            <div class="p-3 bg-white">
              <p>
                {{ property.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="pokedex-container">
    <p class="text-white text-center">Select a bird to view details</p>
  </div>
</template>