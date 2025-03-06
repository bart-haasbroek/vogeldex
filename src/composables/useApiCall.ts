import { ref } from 'vue';




export function useApiCall() {
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function callApi(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`API aanroep mislukt: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Er is een fout opgetreden');
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  async function uploadImage(image: string, recordId: string) {
    loading.value = true;
    error.value = null;

    const response = await callApi("/.netlify/functions/upload", {
      method: "POST",
      body: JSON.stringify({ image, recordId })
    });
    return response;
  }

  return {
    loading,
    error,
    callApi,
    uploadImage
  };
}
