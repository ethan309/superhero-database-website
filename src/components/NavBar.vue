<template>
    <div id="NavBar">
      <router-link id='home' to="/Home">
        <img alt="Main logo" src="../assets/main.png">
      </router-link>
      <h1>Superpeople database website</h1>
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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: rgba(165, 227, 243);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 2 px;
}
#home {
  float: left;
  padding: 10px;
}
.link {
  color: #42b983;
  float: right;
  padding: 10px;
  align-self: center;
}
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: center;
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
h1 {
  height: 100px;  
  margin: 0px;
  padding: 0px;
  margin-top: 35px;
  font-size: 50px;
}

</style>
