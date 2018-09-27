<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  img {
    width: 100%;
    display: block;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }
  .el-submenu__title i {
    color: #fff !important;
  }

</style>
