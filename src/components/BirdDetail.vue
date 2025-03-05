<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Bird } from '../types/Bird';
import { useBirdStore } from '../store/birdStore';
import { storeToRefs } from 'pinia';


const activeSection = ref<string | null>(null);
const route = useRoute();
const router = useRouter();
const birdStore = useBirdStore();
const { birds } = storeToRefs(birdStore);

function toggleSection(section: string) {
  activeSection.value = activeSection.value === section ? null : section;
}

function isActive(section: string): boolean {
  return activeSection.value === section;
}

const bird: ComputedRef<Bird | null> = computed(() => {
  const birdId = route.params.id as string;
  return birds.value.find(b => b.id === birdId) || null;
});

onMounted(() => {
  birdStore.getBirds();
});

const selectedImage = ref<string | null>(null);
const uploadedImage = ref("");

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      selectedImage.value = typeof reader.result === 'string' ? reader.result.split(",")[1] : null;
      uploadImage();
    };
    reader.readAsDataURL(file);
  }
};

const uploadImage = async () => {
  if (!selectedImage.value || !bird.value) return;
  try {
    const response = await fetch("/.netlify/functions/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: selectedImage.value, recordId: bird.value.id }),
    });

    const data = await response.json();
    uploadedImage.value = data.url;
    bird.value.image = data.url;
  } catch (error) {
    console.error("Upload mislukt:", error);
  }
};

</script>

<template>
  <div v-if="bird">
    <button @click="router.back()" class="mb-4 flex items-center text-pokedex-red hover:text-pokedex-dark-red">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to gallery
    </button>
    <div class="pokedex-container">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-xl font-bold text-slate-50">{{ bird.title }}</h2>
          <p class="text-sm italic text-gray-900">{{ bird.scientificName }}</p>
        </div>
        <button @click="router.back()"
          class="bg-pokedex-yellow hover:bg-pokedex-gold text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
          X
        </button>
      </div>

      <div class="pokedex-screen mb-4">
        <div v-if="bird.image" class="relative">
          <img :src="bird.image" :alt="bird.title" class="w-full h-64 object-cover rounded" />
        </div>
        <div v-else class="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
          <input type="file" id="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
          <label for="fileInput" class="pokedex-button flex items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Add foto
          </label>
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
  </div>
</template>