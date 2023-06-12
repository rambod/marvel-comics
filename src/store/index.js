import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      favoriteComics: []
    }
  },
  mutations: {
    addFavoriteComic(state, comic) {
      state.favoriteComics.push(comic)
    },
    removeFavoriteComic(state, comicId) {
      state.favoriteComics = state.favoriteComics.filter(comic => comic.id !== comicId)
    }
  },
  actions: {
    addFavoriteComic({ commit }, comic) {
      commit('addFavoriteComic', comic)
    },
    removeFavoriteComic({ commit }, comicId) {
      commit('removeFavoriteComic', comicId)
    }
  },
  getters: {
    favoriteComics(state) {
      return state.favoriteComics
    },
    isComicFavorite: (state) => (comicId) => {
      return state.favoriteComics.some(comic => comic.id === comicId)
    }
  }
})
