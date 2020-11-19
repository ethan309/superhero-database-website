<template>
  <div id="app">
    <label>Search Characters
        <input v-on:keypress.enter="updateSearch" v-model="query" type="text" id="query">
        <button v-on:click="updateSearch" id="trigger-query">GO</button>
    </label>
    <br>
    <div id="results" v-show="characterName.length > 0">
      <p>Results for {{characterName}}:</p>
      <ul v-for="match in searchResults" v-bind:key="match.name">
        <router-link v-bind:to="{ name: 'Details', params: { name: match.name }}">
          <CharacterCard v-bind:name="match.name"/>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import CharacterCard from './CharacterCard.vue'

export default {
  name: 'App',
  components: {
    CharacterCard
  },
  data: function() {
    return {
        query: '',
        characterName: '',
        searchResults: [{ name: 'John Doe' }, { name: 'Jane Doe' }]
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
