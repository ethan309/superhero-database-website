<template>
  <div id="app">
   <div id="suggested-characters">
      <ul v-for="name in suggestedNames" v-bind:key="name">
        <li>
          <router-link v-bind:to="{ name: 'Details', params: { id: match._id }}">
            <CharacterCard v-bind:name="name"/>
          </router-link>
        </li>
      </ul>
   </div>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'

export default {
  name: 'Home',
  components: {
    CharacterCard
  },
  data: function() {
    return {
      suggestedNames: [
        'John Smith II',
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
