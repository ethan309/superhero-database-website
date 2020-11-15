<template>
    <div id="NavBar">
      <router-link to="/Home">
        <img alt="Main logo" src="../assets/main.png">
      </router-link>
      <ul v-for="link in links" v-bind:key="link.title">
        <router-link v-bind:to="'/' + link.destination">{{link.title}}</router-link>
      </ul>
    </div>
</template>

<script>

export default {
  name: 'NavBar',
  data: function() {
    return {
        links: [
          {title: 'VS', destination: 'Vs' },
          {title: 'Search Characters', destination: 'Search' }
        ]
      };
  }, 
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.NavBar {
  display: inline;
}

</style>
