<template>
  <div id="app">
    <label>Search
        <input v-on:keypress.enter="updateSearch" v-model="query" type="text" id="query">
        <button v-on:click="updateSearch" id="trigger-query">GO</button>
    </label>
    <br>
    <div id="results" v-show="characterName.length > 0">
      <p>Results for {{characterName}}:</p>
      <p v-show="searchResults.length === 0">No matches. Double-check your search term.</p>
      <p v-show="error" class="error">There was an error completing your search. Please try again.</p>
      <div id="matches">
        <ul v-for="match in searchResults" v-bind:key="match.name">
        <router-link v-bind:to="{ name: 'Details', params: { id: match._id }}">
          <CharacterCard v-bind:name="match.name"/>
        </router-link>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterCard from './CharacterCard.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    CharacterCard
  },
  data: function() {
    return {
        query: '',
        characterName: '',
        searchResults: [],
        queryError: false
      };
  },
  methods: {
    updateSearch: async function() {
      this.characterName = this.query;
      const characters = await axios.get(`/api/characters/${this.characterName}`);
      if(characters.status === 200) {
        this.searchResults = characters.data.reduce((allFilteredCharacters, currectCharacter) => 
          [ ...allFilteredCharacters, {'_id': currectCharacter['_id'], 'name': currectCharacter['Name']} ],
          []
        );
      } else {
        this.queryError = true;
      }
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
#matches {
  display: flex;
  flex-flow: row wrap;
  max-height: 700px;
  overflow: hidden;
}
</style>
