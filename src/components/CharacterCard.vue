<template>
  <div class="card">
    <p>{{name}}</p>
  </div>
</template>

<script>

export default {
  name: 'CharacterCard',
  props: {
    name: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
  transition: all 0.3s ease;
}
.card:hover {
  transform: scale(1.1);
}
</style>
