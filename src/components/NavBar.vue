<template>
    <div id="NavBar">
      <span>
          <router-link to="/Home">
            <img alt="Vue logo" src="../assets/logo.png">
          </router-link>
          &nbsp;
          <router-link to="/Search">Search</router-link>
      </span>
    </div>
</template>

<script>

export default {
  name: 'NavBar'
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
