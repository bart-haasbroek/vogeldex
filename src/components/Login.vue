<script setup lang="ts">
import { ref } from 'vue'
import { useAuthtore } from '../store/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const authStore = useAuthtore()

async function handleSubmit() {
    await authStore.login(email.value, password.value);
    router.push('/')
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <div>
                <router-link to="/" class="block mb-4 text-pokedex-red hover:text-pokedex-dark-red">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Terug naar overzicht
                    </div>
                </router-link>
                <h2 class="text-center text-3xl font-bold text-gray-900">Log in bij Vogeldex</h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label for="email" class="sr-only">E-mailadres</label>
                        <input v-model="email" id="email" name="email" type="text" required
                            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pokedex-red focus:border-transparent"
                            placeholder="E-mailadres" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Wachtwoord</label>
                        <input v-model="password" id="password" name="password" type="password" required
                            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pokedex-red focus:border-transparent"
                            placeholder="Wachtwoord" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pokedex-red hover:bg-pokedex-dark-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pokedex-red">
                        Inloggen
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
