<template>
  <div>
    <h1>Comic Detail Page</h1>
    <div class="back-button">
      <BackButton />
    </div>
    <div class="comic-details" v-if="comic">
      <div class="comic-image">
        <img :src="comic.thumbnail" :style="getComicImageStyle" alt="Comic Thumbnail" class="ratio-comic-image">
      </div>
      <div class="comic-info">
        <h2>{{ comic.title }}</h2>
        <p>{{ comic.description }}</p>
        <p>Creators:</p>
        <ul>
          <li v-for="creator in comic.creators" :key="creator.id">
            {{ creator.name }}
          </li>
        </ul>
        <button @click="toggleFavorite(comic)" class="favorite-button">
          <i :class="isComicFavorite(comic.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BackButton from './BackButton.vue';

export default {
  computed: {
    ...mapGetters(['favoriteComics', 'isComicFavorite']),
    comic() {
      const comicId = parseInt(this.$route.params.id); // Convert the id to an integer
      return this.$store.state.comics.find((comic) => comic.id === comicId);
    },
    getComicImageStyle() {
      return {
        maxHeight: '80vh',
      };
    },
  },
  methods: {
    ...mapActions(['addFavoriteComic', 'removeFavoriteComic']),
    toggleFavorite(comic) {
      if (this.isComicFavorite(comic.id)) {
        this.removeFavoriteComic(comic.id);
      } else {
        this.addFavoriteComic(comic);
      }
    },
  },
  mounted() {
    console.log('mounted');
  },
  components: { BackButton },
};
</script>

<style scoped>
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}

.comic-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
}

.comic-image {
  flex: 1;
}

.comic-image img {
  width: 100%;
  margin: 10px;
}

.comic-info {
  flex: 1;
  margin-left: 20px;
}

.comic-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.comic-info p {
  margin-bottom: 10px;
}
.ratio-comic-image{
  max-height: 80vh; /* Set the maximum height to 60% of the viewport height */
  width: auto; /* Let the width adjust automatically based on the image's aspect ratio */
  max-width: 100%; /* Set the maximum width to prevent image overflow */
}

.favorite-button {
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 24px;
  cursor: pointer;
}

.favorite-button i {
  color: #000000;
}

.favorite-button i:hover {
  color: #ff0000;
}

.favorite-button i.fas {
  /* Add styles for the filled heart icon */
}

.favorite-button i.far {
  /* Add styles for the outlined heart icon */
}
</style>
