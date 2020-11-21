<template>
    <div id="NavBar">
      <router-link id='home' to="/Home">
        <img alt="Main logo" src="../assets/main.png">
      </router-link>
      <ul>
        <router-link class="link" to="/Search">
          <img class="link-img" alt="Search" src="../assets/query.svg"><br>
          <label>Search</label>
        </router-link>
        <router-link class="link" to="/Explore">
          <img class="link-img" alt="Explore" src="../assets/explore.svg"><br>
          <label>Explore</label>
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
  background-color: rgba(165, 227, 243, 0.9);
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
  padding: 10px;
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
  align-self: center;
}
.link-img {
  height: 70px;
  object-fit: contain;
  align-self: center;
}

</style>
