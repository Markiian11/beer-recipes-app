import create from 'zustand';

const useBeerStore = create((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
}));

export default useBeerStore;
