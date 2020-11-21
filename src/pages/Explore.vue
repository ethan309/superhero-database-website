<template>
  <div class="stats">
    <div v-show="!resultsFound" class="error">
      <p>There was an error loading data for the requested character. Please try again.</p>
    </div>
    <div>View by intelligence</div>
    <div>View by strength</div>
    <div v-show="resultsFound" id="stats"></div>
    <div v-show="resultsFound" id="powers"></div>
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
    const characterData = await axios.get(`/api/characters/`);
    console.log(characterData);
    if(characterData.status === 200) {
      this.parseCharacterData(characterData.data);
      this.displayStatsGraph();
      this.resultsFound = true;
    } else {
      this.resultsFound = false;
    }
  },
  methods: {
    parseCharacterData: function(data) {
      this.data = data;
    },
    displayStatsGraph: function() {
      const numericalStats = this.stats.filter((stat) => { return typeof stat.value === 'number' });

      // Template from https://bl.ocks.org/mbostock/3885304
      var svg = d3.select("svg"),
          margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;
      
      //Generates a categorical x axis and a numeric y axis
      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]);
      
      //Generates chart container that is adjusted by margin parameters
      var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      //Reads data from tsv
      d3.tsv("data.tsv", function(d) {
        //set up your data transforms here
        d.name = "";
        d.value = + 0;
        return d;
      }, function(error, data) {
        if (error) throw error;
      
        //Sets categorical x domain based on given column
        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
      
        //Draw x axis and adjust for container size
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        //Draw y axis with various styling and transforms
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "%"))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Value");
        //Draw bars for each name and value in data
        g.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.value); });//draws bars on screen from top to bottom
      });
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
