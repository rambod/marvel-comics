import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      favoriteComics: [],
      comics: [] // Add a new state property for storing fetched comics
    }
  },
  mutations: {
    addFavoriteComic(state, comic) {
      state.favoriteComics.push(comic)
    },
    removeFavoriteComic(state, comicId) {
      state.favoriteComics = state.favoriteComics.filter(comic => comic.id !== comicId)
    },
    setComics(state, comics) {
      state.comics = comics // Define the setComics mutation
    }
  },
  actions: {
    addFavoriteComic({ commit }, comic) {
      commit('addFavoriteComic', comic)
    },
    removeFavoriteComic({ commit }, comicId) {
      commit('removeFavoriteComic', comicId)
    },
    setComics({ commit }, comics) {
      commit('setComics', comics) // Define the setComics action
    }
  },
  getters: {
    favoriteComics(state) {
      return state.favoriteComics
    },
    isComicFavorite: (state) => (comicId) => {
      return state.favoriteComics.some(comic => comic.id === comicId)
    },
    comics(state) {
      return state.comics // Define the comics getter
    }
  }
})
