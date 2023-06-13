<template>
  <div>
    <button @click="goBack" class="back-button">Back</button> <!-- Add the back button -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['removeFavoriteComic']),
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: $secondary-color;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.favorite-button {
  background-color: rgba(229, 9, 20, 0.8); /* Use an rgba value with transparency */
  color: $secondary-color;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
