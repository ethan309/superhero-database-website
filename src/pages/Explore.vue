<template>
  <div class="stats">
    <select v-on:change="displayStatsGraph($event.target.value)" name="Options" id="statOptions">
      <option v-for="option in statOptions" v-bind:key="option" v-bind:value="option">{{option}}</option>
    </select>
    <div v-show="!resultsFound" class="error">
      <p>There was an error loading data for the requested character. Please try again.</p>
    </div>
    <div v-show="resultsFound" id="stats"></div>
    <div v-show="resultsFound" id="details"></div>
    <div id="matches">
      <ul v-for="match in selectedCharacters" v-bind:key="match.name">
        <router-link v-bind:to="{ name: 'Details', params: { id: match._id }}">
          <CharacterCard v-bind:name="match.name"/>
        </router-link>
      </ul>
    </div>
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
        resultsFound: false,
        statOptions: [
          'Height',
          'Weight',
          'Intelligence',
          'Strength',
          'Speed',
          'Durability',
          'Combat'
        ],
        selectedCharacters: []
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
      this.data.forEach((currentCharacter) => {
        if(currentCharacter[stat] !== '') {
          const existing = data.findIndex((entry) => entry['value'] === currentCharacter[stat])
          if(existing === -1) {
            data.push({ 'names': [currentCharacter['Name']], 'value': currentCharacter[stat] });
          } else {
            data[existing]['names'].push(currentCharacter['Name']);
          }
        }
      });

      data.sort(function(a, b) {
        return d3.descending(a.value, b.value)
      });

      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 80, bottom: 40, left: 90};
      var width = 1600 - margin.left - margin.right;
      var height = (20 * data.length) - margin.top - margin.bottom;

      // remove old graph
      d3.select("#stats").selectAll("svg").remove();

      // append the new svg object to the body of the page
      var svg = d3.select("#stats")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      
      var svg_details = d3.select("#details")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", 50)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis
      const MAX_X = 125;
      var x = d3.scaleLinear()
        .domain([ 0, MAX_X ])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      // Y axis
      var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return `${d.value} (${d.names.length} names)`; }))
        .padding(.1);
      svg.append("g")
        .call(d3.axisLeft(y));

      var tooltip = svg_details.append("text")
        .style("visibility", "hidden")
        .style("width", `${width}px`)
        .style("overflow-wrap", "break-word");

      const allCharacterData = this.data.slice(0);

      //Bars
      svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(`${d.value} (${d.names.length} names)`); })
        .attr("width", function(d) { return x(d.value); })
        .attr("height", 10 ) // y.bandwidth()
        .attr("fill", "#69b3a2")
        .on("mouseover", function(d, barData) {
          // var tipx = 10 * i;
          // var tipy = d3.select(this).attr("height");
          d3.select(this).attr("r", 10).style("fill", "orange");
          tooltip.attr("x", 2);
          tooltip.attr("y", 2);
          // tooltip.attr("dx", ((width/MAX_X) * barData.value) + 2);
          // tooltip.attr("dy", y(barData.value) + 5);
          tooltip.style("visibility", "visible");
          tooltip.style("fill", "black");
          tooltip.text(`${stat} ${barData.value}: click to view characters.`);
        })
        .on("click", function(d, barData) {
          var _selected = allCharacterData.filter((s) => { return barData.names.includes(s['Name']) });
          var selected = [];
          _selected.forEach((currectCharacter) => {
            selected.push({ '_id': currectCharacter['_id'], 'name': currectCharacter['Name'] });
          });
          this.selectedCharacters = selected;
        })
        .on("mouseout", function() {
          d3.select(this).attr("r", 10).style("fill", "#69b3a2");
          tooltip.style("visibility", "hidden");
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
#matches {
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
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
