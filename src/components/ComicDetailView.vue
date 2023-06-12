<template>
  <div>
    <h1>Comic Detail Page</h1>
    <div v-if="comic">
      <h2>{{ comic.title }}</h2>
      <img :src="comic.thumbnail" alt="Comic Thumbnail">
      <p>{{ comic.description }}</p>
      <p>Creators:</p>
      <ul>
        <li v-for="creator in comic.creators" :key="creator.id">
          {{ creator.name }}
        </li>
      </ul>
      <button @click="addToFavorites(comic)" :disabled="isComicFavorite(comic.id)">
        {{ isComicFavorite(comic.id) ? 'Added to Favorites' : 'Add to Favorites' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['favoriteComics', 'isComicFavorite']),
    comic() {
      const comicId = this.$route.params.id;
      return this.$store.state.comics.find((comic) => comic.id === comicId);
    },
  },
  methods: {
    ...mapActions(['addFavoriteComic']),
    addToFavorites(comic) {
      this.addFavoriteComic(comic);
    },
  },
};
</script>

<style scoped>
/* Add component styles here */
</style>
