import { defineStore } from "pinia";
import { Bird } from "../types/Bird";
import { useApiCall } from "../composables/useApiCall";

const { uploadImage } = useApiCall();

export const useBirdStore = defineStore("bird", {
  state: () => ({
    birds: [] as Bird[],
    loading: false,
    lastUpdated: null as Date | null,
  }),
  actions: {
    async getBirds() {
      if (this.birds.length > 0) {
        return this.birds;
      }
      const response = await fetch("/.netlify/functions/getBirds2", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const list = data.records.map((record: any) => {
        const properties = record.fields.properties || "";

        return {
          id: record.id,
          ...record.fields,
          properties: properties ? JSON.parse(properties) : [],
        };
      });
      this.birds = list;
    },
    async uploadImage(event: Event, bird: Bird) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.loading = true;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const image: string | null =
            typeof reader.result === "string"
              ? reader.result.split(",")[1]
              : null;
          if (image) {
            const response = await uploadImage(image, bird.id);
            const birdToUpdate = this.birds.find((b) => b.id === bird.id);
            if (birdToUpdate) {
              birdToUpdate.image = response.url;
            }
          }
          this.loading = false;
        };
      }
    },
    addBird(bird: Bird) {
      this.birds.push(bird);
    },
  },
});
