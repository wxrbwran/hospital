<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 320px;
}
.nav{
  .van-nav-bar__title{
    @extend %title-style;
  }
  .van-icon-arrow-left:before{
    color: #000;
    font-size: 18px;
  }
}
</style>
