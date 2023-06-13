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
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=KoHo:ital@1&display=swap');
@font-face {
  font-family: "Raleway";
  src: local("Raleway"),
   url(./assets/fonts/Raleway.ttf) format("truetype");
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
  color: #fbf8f8;

}
.dark-bg {
  background-color: #333;
  color: #fff;
}
</style>
