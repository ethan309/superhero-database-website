<template>
  <div id="app">
    <NavBar></NavBar>
    <p>VS HERE</p>
  </div>
</template>

<script>
// import CharacterMatchups from '../components/CharacterMatchups.vue'
import NavBar from '../components/NavBar.vue'

export default {
  name: 'Home',
  components: {
    //CharacterMatchups,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
