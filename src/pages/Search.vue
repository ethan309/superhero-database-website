<template>
  <div id="app">
    <CharacterSearch></CharacterSearch>
  </div>
</template>

<script>
import CharacterSearch from '../components/CharacterSearch.vue'

export default {
  name: 'Home',
  components: {
    CharacterSearch
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
