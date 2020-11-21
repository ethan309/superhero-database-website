<template>
  <div id="app">
   <div id="suggested-characters">
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

export default {
  name: 'Home',
  components: {
    CharacterCard
  },
  data: function() {
    return {
      suggestedCharacters: []
    };
  },
  async mounted() {
    const characters = await axios.get(`/api/characters`);
    if(characters.status === 200) {
      this.suggestedCharacters = Object.keys(characters.data)
        .filter(key => ['_id', 'name'].includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: characters.data[key]
          };
        }, {});
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
}
ul {
  padding-left: 0;
}
li {
  list-style-type: none;
  padding: 10px 10px;
}
</style>
