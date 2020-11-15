<template>
    <div id="NavBar">
      <h1>NavBar</h1>
      <span>
          <router-link to="/Home">Home</router-link> &nbsp;
          <router-link to="/Search">Search</router-link>
      </span>
    </div>
</template>

<script>

export default {
  name: 'NavBar',
  data: function() {
    return {
        
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
