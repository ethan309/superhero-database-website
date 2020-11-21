<template>
  <div id="app">
   <div v-show="suggestedCharactersError">
     <p class="error">Error loading suggested characters. Please try again.</p>
   </div>
   <div v-show="suggestedCharactersLoaded" id="suggested-characters">
      <ul v-for="character in suggestedCharacters" v-bind:key="character.name">
        <li>
          <router-link v-bind:to="{ name: 'Details', params: { id: character._id }}">
            <CharacterCard v-bind:name="character.name"/>
          </router-link>
        </li>
      </ul>
   </div>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'
import axios from 'axios';
import { statsColumns } from '../constants.js';

const hasKnownStats = (character) => {
  statsColumns.forEach((stat) => {
    if(typeof character[stat] === 'string' && character[stat].length === 0) {
      return false;
    }
  });
  return true;
};

export default {
  name: 'Home',
  components: {
    CharacterCard
  },
  data: function() {
    return {
      suggestedCharacters: [],
      suggestedCharactersLoaded: false,
      suggestedCharactersError: false
    };
  },
  async mounted() {
    try {
      const characters = await axios.get(`/api/characters`);
      if(characters.status === 200) {
        const allCharacters  = characters.data.reduce((allFilteredCharacters, currectCharacter) => 
          hasKnownStats(currectCharacter.data) ? 
            [ ...allFilteredCharacters, {'_id': currectCharacter['_id'], 'name': currectCharacter['Name']} ] : 
            [ ...allFilteredCharacters],
          []
        );
        this.suggestedCharacters = allCharacters.sort(() => Math.random() - 0.5).slice(0, 40);
        this.suggestedCharactersLoaded = true;
      } else {
        this.suggestedCharactersError = true;
      }
    } catch(exception) {
      this.suggestedCharactersError = true;
      console.log(exception);
    }
  },
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
  min-width: 100%;
}
#suggested-characters {
  display: flex;
  flex-flow: row wrap;
  max-height: 700px;
  overflow: hidden;
}
ul {
  padding-left: 0;
}
li {
  list-style-type: none;
  padding: 10px 10px;
}
.error {
  color: red !important;
}
</style>
