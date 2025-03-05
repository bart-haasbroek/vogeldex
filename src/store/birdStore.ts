    import { defineStore } from 'pinia';
    import { Bird } from '../types/Bird';

   export const useBirdStore = defineStore('bird', {
     state: () => ({
       birds: [] as Bird[],
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
            }
          });
          this.birds = list;
       },
       addBird(bird: Bird) {
         this.birds.push(bird)
       },
    },
  });
