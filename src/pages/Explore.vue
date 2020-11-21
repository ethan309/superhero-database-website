<template>
  <div class="stats">
    <div v-show="!resultsFound" class="error">
      <p>There was an error loading data for the requested character. Please try again.</p>
    </div>
    <div>View by intelligence</div>
    <div>View by strength</div>
    <div v-show="resultsFound" id="stats"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';

export default {
  name: 'Explore',
  data: function() {
    return {
        data: [],
        resultsFound: false
      };
  },
  async mounted() {
    const characterData = await axios.get(`/api/characters`);
    
    if(characterData.status === 200) {
      this.parseCharacterData(characterData.data);
      this.displayStatsGraph('Intelligence');
      this.resultsFound = true;
    } else {
      this.resultsFound = false;
    }
  },
  methods: {
    parseCharacterData: function(data) {
      this.data = data;
    },
    displayStatsGraph: function(stat) {
      const data = [];
      this.data.forEach((currectCharacter) => {
        if(currectCharacter[stat] !== '') {
          data.push({ 'name': currectCharacter['Name'], 'value': currectCharacter[stat] });
        }
      });

      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 30, bottom: 40, left: 90};
      var width = 1600 - margin.left - margin.right;
      var height = (10 * data.length) - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#stats")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 125])
        .range([ 0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      // Y axis
      var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.name; }))
        .padding(.1);
      svg.append("g")
        .call(d3.axisLeft(y));

      //Bars
      svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return x(d.value); })
        .attr("height", 5 ) // y.bandwidth()
        .attr("fill", "#69b3a2")


        // .attr("x", function(d) { return x(d.name); })
        // .attr("y", function(d) { return y(d.value); })
        // .attr("width", x.bandwidth())
        // .attr("height", function(d) { return height - y(d.value); })
        // .attr("fill", "#69b3a2")
    }
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
.error {
  color: red;
}
</style>
