<template>
  <div>
    <div class="banner">
      <img :src="bannerImage" alt="Banner Image">
      <h1 class="banner-title">Marvel Comics</h1>
      
      <div class="banner-buttons">
        <button class="banner-button signup-button">Sign up</button>
        <button class="banner-button login-button">Login</button>
      </div>
    </div>
    <div v-if="comics.length === 0">
      Loading comics...
      <div v-if="isLoading" class="loading-indicator">
  <div class="loading-spinner"></div>
</div>
    </div>
    <div v-else>
      <div class="grid-container">
        <div v-for="(comic, index) in comics" :key="comic.id" :style="getComicStyle(index)" class="card">
          <img :src="comic.thumbnail" alt="Comic Thumbnail">
          <button @click="toggleFavorite(comic)" class="favorite-button">
            <i v-if="!isComicFavorite(comic.id)" class="fas fa-heart"></i>
            <i v-else class="fas fa-heartbeat"></i>
          </button>
          <router-link :to="`/comic/${comic.id}`" class="view-details-button">
            View Details
          </router-link>
          <p class="card-title">{{ comic.title }}</p>
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
import bannerImage from '@/assets/Leonardo.jpg';

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
  data() {
    return {
      bannerImage: bannerImage,
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(['addFavoriteComic', 'removeFavoriteComic']),
    async fetchComics() {
      try {
        this.isLoading = true;
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
      }finally {
    this.isLoading = false; // Hide the loading indicator
  }
    },
    toggleFavorite(comic) {
      if (this.isComicFavorite(comic.id)) {
        this.removeFavoriteComic(comic.id);
      } else {
        this.addFavoriteComic(comic);
      }
    },
    getComicStyle(index) {
      const row = Math.floor(index / 6);
      const col = index % 6;
      return {
        gridRow: `${row + 1}`,
        gridColumn: `${col + 1}`,
        height: '200px',
        width: '150px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  height: 300px;
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.139);
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-title {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  font-size: 44px;
  font-weight: bold;
}

.banner-buttons {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.banner-button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.signup-button {
  background-color: rgba(0, 0, 0, 0.7);
}

.login-button {
  background-color: rgba(0, 0, 0, 0.5);
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
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 10px;
  text-align: center;
}


.view-details-button {
  background-color: rgba(255, 0, 0, 0.5);
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px;
  opacity: 0.9;
}

.view-details-button:hover {
  background-color: rgba(255, 0, 0, 0.7);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  margin: 20px; /* Centers the grid horizontally */
}

.card {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  min-height: 350px; /* Adjust the min-height as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.card img {
  width: auto;
  object-fit: contain;
  height: auto;
  width: 80%; /* Adjust the width as needed */
  max-height: 50%; /* Adjust the maximum height as needed */
  object-fit: contain;
}

.card-title {
  color: #ffffff;
  font-size: 14px;
  margin-top: 10px;
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

.loading-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f33a3a;
  border-top-color: transparent;
  border-radius: 50%;
  animation: loading 0.8s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
