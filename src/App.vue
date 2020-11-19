<template>
  <div id="window">
    <NavBar class="header"></NavBar>
    <router-view id="content">
    </router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style scoped>
#window {
  min-width: 100%;
  width: 100%;
}

.header {
  z-index: 999;
}

#content {
  margin-top: 150px;
  min-width: 100%;
  width: 100%;
}
</style>