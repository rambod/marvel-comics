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
@font-face {
  font-family: 'Raleway';
  src: url('@/assets/fonts/Raleway.ttf') format('truetype'),
}
body {
  background-color: #1c1c1c; /* Replace with your desired dark color */
  margin: 0;
  padding: 0;
 font-family: 'Raleway', sans-serif;
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary-color;
  margin-top: 60px;
  color: #000;

}
.dark-bg {
  background-color: #333;
  color: #fff;
}
</style>
