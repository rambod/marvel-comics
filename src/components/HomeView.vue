<template>
  <div>
    <div class="banner">
      <!-- Placeholder for the banner image -->
    </div>
    <h1>Marvel Comics</h1>
    <div v-if="comics.length === 0">
      Loading comics...
    </div>
    <div v-else>
      <div class="grid">
        <div v-for="(comic, index) in comics" :key="comic.id" :style="getComicStyle(index)" class="card">
          <img :src="comic.thumbnail" alt="Comic Thumbnail">
      <button @click="toggleFavorite(comic)"  class="favorite-button">
        <i v-if="!isComicFavorite(comic.id)" class="fas fa-heart"></i>
        <i v-else class="fas fa-heartbeat"></i>
      </button>

          <router-link :to="`/comic/${comic.id}`">View Details</router-link>
        </div>
      </div>
    </div>

    <div class="favorites-badge">
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
    ...mapActions(['addFavoriteComic', 'removeFavoriteComic']),
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
       toggleFavorite(comic) {
      if (this.isComicFavorite(comic.id)) {
        this.removeFavoriteComic(comic.id);
      } else {
        this.addFavoriteComic(comic);
      }
    },
    addToFavorites(comic) {
      this.addFavoriteComic(comic);
    },

        removeFromFavorites(comic) {
      this.$store.dispatch('removeFavoriteComic', comic.id);
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
  position: relative;
  height: 300px; /* Set the desired height of the banner */
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.6); /* Set the background color with opacity */
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner h2 {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #ffffff;
  font-size: 32px; /* Adjust the font size */
}

.banner p {
  position: absolute;
  bottom: 60px;
  left: 20px;
  color: #ffffff;
  font-size: 16px; /* Adjust the font size */
}
.remove-fav-button {
  background-color: #ff0000; /* Set the background color */
  color: #ffffff; /* Set the text color */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px; 
}

.remove-fav-button:hover {
  background-color: #ff3333; /* Adjust the hover background color */
}

.remove-fav-button:disabled {
  opacity: 0.4; /* Adjust the opacity for the disabled state */
  /* cursor: not-allowed; */
}
/* Add any additional styles or modifications as needed */

/* Example styles for the card */
.grid .card {
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  
}

/* Example styles for the favorites icon and count badge */
.favorite-icon {
  /* Add the styles for the favorites icon (e.g., heart icon) here */
}

.favorite-button {
  background-color: rgba(255, 0, 0, 0.6); /* Set the background color with opacity */
  color: #000000; /* Set the text color */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px; 
}

.favorite-button:hover {
  background-color: rgba(255, 0, 0, 0.8); /* Adjust the hover background color */
}

.favorite-button:disabled {
  opacity: 0.4; /* Adjust the opacity for the disabled state */
  /* cursor: not-allowed; */
}

.favorites-count-badge {
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 50%;
  background-color: #ff0000;
  color: #ffffff;
  font-weight: bold;
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
.favorites-badge {
  position: fixed;
  top: 20px;
  left: 20px;
  margin: 10px;
  z-index: 9999;
}
</style>
