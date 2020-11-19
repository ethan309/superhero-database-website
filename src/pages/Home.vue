<template>
  <div id="app">
    <ul class="character-cards" v-for="name in suggestedNames" v-bind:key="name">
      <li><CharacterCard v-bind:name="name"></CharacterCard></li>
    </ul>
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
  min-width: 100%;
}

ul {
  min-width: 100%;
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
}
  
li {
  list-style-type: none;
  padding: 10px 10px;
  transition: all 0.3s ease;
}

li:hover {
  transform: scale(1.1);
}
  
.card {
  display: block;
  width: 100px;
  height: 125px;
  padding: 80px 50px;
  background-color: #74717e;
  border-radius: 10px;
  margin: 5px;
  position: relative;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #fff;
  -webkit-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
  -moz-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
  box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
  cursor: pointer;
  will-change: transform;
}
</style>
