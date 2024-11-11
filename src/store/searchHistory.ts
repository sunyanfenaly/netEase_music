import { defineStore } from "pinia";
import { ref } from "vue";
export const useCounterStore = defineStore("counter", () => {
  const SearchHistoryList = ref<string[]>([]);

  return {SearchHistoryList};
});
