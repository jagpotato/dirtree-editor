<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
$fontColor: #2c3e50;
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fontColor;
  width: 100%;
  height: 100%;
}
ul {
  list-style: none;
  padding-left: 60px;
}
</style>
