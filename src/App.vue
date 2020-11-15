<template>
  <div id="app">
    <NavBar></NavBar>
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-for="name in suggestedNames" :key="name">
      <CharacterCard name="name"></CharacterCard>
    </div>
  </div>
</template>

<script>
import CharacterCard from './components/CharacterCard.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    CharacterCard,
    NavBar
  },
  data: function() {
    return {

      };
  },
  methods: {

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
