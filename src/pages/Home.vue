<template>
  <div id="app">
  <div id="centercontent">
   <div v-show="suggestedCharactersError">
     <p class="error">Error loading suggested characters. Please try again.</p>
   </div>
   <div>
   <div class="helptext">
   <h1>Home</h1>
   <h2>Explore some random super people:</h2>
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
        const charactersWithStats = []
        characters.data.forEach((currectCharacter) => {
          if(this.hasKnownStats(currectCharacter)) {
            charactersWithStats.push({ '_id': currectCharacter['_id'], 'name': currectCharacter['Name'] });
          }
        });
        this.suggestedCharacters = charactersWithStats.sort(() => Math.random() - 0.5).slice(0, 40);
        this.suggestedCharactersLoaded = true;
        this.suggestedCharactersError = false;
      } else {
        this.suggestedCharactersLoaded = false;
        this.suggestedCharactersError = true;
        console.log(`Request Status: ${characters.status}`);
      }
    } catch(exception) {
      this.suggestedCharactersLoaded = false;
      this.suggestedCharactersError = true;
      console.log(exception);
    }
  },
  methods: {
    hasKnownStats: function (characterStats) {
      for (const stat of statsColumns) {
        if(characterStats[stat] === '') {
          return false;
        }
      }
      return true;
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
  min-width: 100%;
}
#suggested-characters {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
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
.helptext{
  padding-top: 10px;
  padding-left: 25px;
  width: 100%;
}

#centercontent{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-left: 25px;
}

h1 {
  font-size: 75px;
}
</style>
