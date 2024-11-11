import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserInfoStore = defineStore("counter", () => {
  const detailInfo = ref({});

  return { detailInfo };
});
