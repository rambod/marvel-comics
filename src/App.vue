<template>
  <div id="app" class="dark-bg">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Boogaloo&display=swap');
body {
  background-color: #1c1c1c; /* Replace with your desired dark color */
  margin: 0;
  padding: 0;
font-family: 'KoHo', sans-serif;}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary-color;
  margin-top: 60px;
  color: #fbf8f8;
font-family: 'Boogaloo', cursive;
}
.dark-bg {
  background-color: #333;
  color: #fff;
}
</style>
