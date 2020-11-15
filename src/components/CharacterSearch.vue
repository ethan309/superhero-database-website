<template>
  <div id="app">
    <label for="back">Search
        <input v-on:keypress.enter="updateSearch" v-model="query" type="text" id="query">
        <button v-on:click="updateSearch" id="trigger-query">GO</button>
    </label>
    <br>
    <p v-show="characterName.length > 0">Results for {{characterName}}:</p>
    <CharacterStats v-show="characterName.length > 0" v-bind:name="characterName"/>
  </div>
</template>

<script>
import CharacterStats from './components/CharacterStats.vue'

export default {
  name: 'App',
  components: {
    CharacterStats
  },
  data: function() {
    return {
        query: '',
        characterName: '',
        empty: true
      };
  },
  methods: {
    updateSearch: function(){
      this.characterName = this.query;
    }
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
