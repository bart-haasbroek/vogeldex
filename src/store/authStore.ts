import { defineStore } from "pinia";
import { useApiCall } from "../composables/useApiCall";
import { User } from "@supabase/supabase-js";

const { callApi } = useApiCall();

export const useAuthtore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    error: null as string | null,
    isLoggedIn: false as boolean,
    loading: false as boolean,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        this.loading = true;
        const response = await callApi("/.netlify/functions/login", {
          method: "POST",
          body: JSON.stringify({ email, password })
        });
        this.user = response.user;
        this.isLoggedIn = true;
        this.error = null;
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Er is iets misgegaan";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
