import store from "../../store";

export const clearSearchResolver = async () => {
  await store.dispatch("clearSearch");
};
