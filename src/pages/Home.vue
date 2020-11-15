<template>
  <div id="app">
    <NavBar></NavBar>
    <div id="content">
      <div v-for="name in suggestedNames" v-bind:key="name">
        <CharacterCard v-bind:name="name"></CharacterCard>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'
import NavBar from '../components/NavBar.vue'

export default {
  name: 'Home',
  components: {
    CharacterCard,
    NavBar
  },
  data: function() {
    return {
      suggestedNames: [
        'John Smith',
        'John Doe',
        'Jane Doe'
      ]
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
