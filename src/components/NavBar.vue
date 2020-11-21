<template>
    <div id="NavBar">
      <router-link id='home' to="/Home">
        <img alt="Main logo" src="../assets/main.png">
      </router-link>
      <ul v-for="link in links" v-bind:key="link.title">
        <router-link class="link" v-bind:to="'/' + link.destination">
          <img v-bind:alt="link.title" v-bind:src="'../assets/' + link.asset">
        </router-link>
      </ul>
    </div>
</template>

<script>

export default {
  name: 'NavBar',
  data: function() {
    return {
        links: [
          { title: 'Explore', destination: 'Explore', asset: 'explore.png' },
          { title: 'Search', destination: 'Search', asset: 'query.png' }
        ]
      };
  }, 
}
</script>

<style scoped>
#NavBar {
  background-color: blanchedalmond;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 2 px;
}
#home {
  float: left;
  display: block;
  padding: 10px;
}
.link {
  color: #42b983;
  float: right;
  display: block;
  /* padding: 10px;
  padding-top: 50px;
  padding-bottom: 50px; */
  align-self: center;
}
ul {
  display: inline;
  width: 100%;
  text-align: center;
  padding-right: 100px;
}
img {
  height: 100px;
  object-fit: contain;
}

</style>
