<template>
  <div>
    <div class="banner">
      <!-- Placeholder for the banner image -->
    </div>
    <h1>Home Page</h1>
    <div v-if="comics.length === 0">
      Loading comics...
    </div>
    <div v-else>
      <div class="grid">
        <div v-for="(comic, index) in comics" :key="comic.id" :style="getComicStyle(index)">
          <img :src="comic.thumbnail" alt="Comic Thumbnail">
          <button @click="addToFavorites(comic)" :disabled="isComicFavorite(comic.id)">
            {{ isComicFavorite(comic.id) ? 'Added to Favorites' : 'Add to Favorites' }}
          </button>
          <router-link :to="`/comic/${comic.id}`">View Details</router-link>
        </div>
      </div>
    </div>

    <div class="favorites">
      <i class="favorite-icon"></i>
      <span class="favorites-count-badge">{{ favoritesCount }}</span>
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
    favoritesCount() {
      return this.favoriteComics.length;
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
          thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        }));
        this.$store.dispatch('setComics', comics);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    },
    addToFavorites(comic) {
      this.addFavoriteComic(comic);
    },
    getComicStyle(index) {
      const row = Math.floor(index / 6);
      const col = index % 6;
      return {
        gridRow: `${row + 1}`,
        gridColumn: `${col + 1}`,
        height: '200px', // Set your desired height
        width: '150px', // Set your desired width
      };
    },
  },
  mounted() {
    this.fetchComics();
  },
};
</script>

<style scoped>
.banner {
  /* Add styles for the banner image placeholder */
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
}

.grid > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid img {
  height: 100px; /* Set your desired image height */
  width: 100px; /* Set your desired image width */
}

.favorites {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.favorite-icon {
  /* Add the styles for the favorites icon (e.g., heart icon) here */
}

.favorites-count-badge {
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 50%;
  background-color: #ff0000;
  color: #ffffff;
  font-weight: bold;
}
</style>
