<template>
  <div>
    <h1>Home Page</h1>
    <div v-if="comics.length === 0">
      Loading comics...
    </div>
    <div v-else>
      <div v-for="comic in comics" :key="comic.id">
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
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = '5d0380427d854a1243be8e5434ecb8e8';
const PRIVATE_KEY = 'e21cb3c98c93cfaa361c4c7fee196e5b8680a73b';

export default {
computed: {
  ...mapGetters(['favoriteComics', 'isComicFavorite']),
  comics() {
    return this.$store.state.comics || [];
  },
},
  methods: {
    ...mapActions(['addFavoriteComic']),
    async fetchComics() {
      try {
        const timestamp = Date.now().toString();
        const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
        const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
          params: {
            ts: timestamp,
            apikey: PUBLIC_KEY,
            hash: hash,
          },
        });
        const comics = response.data.data.results.map((comic) => ({
          id: comic.id,
          title: comic.title,
          description: comic.description || 'No description available.',
          thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          creators: comic.creators.items.map((creator) => ({
            id: creator.resourceURI,
            name: creator.name,
          })),
        }));
        this.$store.commit('setComics', comics);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    },
    addToFavorites(comic) {
      this.addFavoriteComic(comic);
    },
  },
  mounted() {
    this.fetchComics();
  },
};
</script>

<style scoped>
/* Add component styles here */
</style>
