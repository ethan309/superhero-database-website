<template>
  <div class="stats">
    <select v-on:change="displayGraph($event.target.value)" name="Options" id="statOptions">
      <option v-for="option in statOptions" v-bind:key="option" v-bind:value="option">{{option}}</option>
    </select>
    <div v-show="error" class="error">
      <p>There was an error loading data for the requested character. Please try again.</p>
    </div>
    <div v-show="!error && !resultsFound">
      <p>Compiling character data...</p>
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
import * as venn from 'venn.js';
import CharacterCard from '../components/CharacterCard.vue';

export default {
  name: 'Explore',
  components: {
    CharacterCard
  },
  data: function() {
    return {
        data: [],
        resultsFound: false,
        error: false,
        statOptions: [
          'Height',
          'Weight',
          'Intelligence',
          'Strength',
          'Speed',
          'Durability',
          'Combat',
          'Powers'
        ],
        selectedCharacters: []
      };
  },
  async mounted() {
    const characterData = await axios.get(`/api/characters`);
    
    if(characterData.status === 200) {
      this.parseCharacterData(characterData.data);
      this.displayGraph(this.statOptions[0]);
      this.resultsFound = true;
      this.error = false;
    } else {
      this.resultsFound = false;
      this.error = true;
    }
  },
  methods: {
    parseCharacterData: function(data) {
      this.data = data;
    },
    displayGraph: function(stat) {
      // remove old graph
      d3.select("#stats").selectAll("svg").remove();
      d3.select("#details").selectAll("svg").remove();
      this.selectedCharacters = [];

      // display new graph
      if(stat === 'Powers') { this.displayPowersGraph(); }
      else { this.displayStatsGraph(stat); }
    },
    displayPowersGraph: async function() {
      const _possiblePowers = await axios.get(`/api/powers`);
      const possiblePowers = _possiblePowers.data;
      console.log('1');
      console.log(_possiblePowers);
      console.log('1..');
      console.log(possiblePowers);

      const singlePowers = [];
      for(var p = 0; p < possiblePowers.length; p++) {
        const power = possiblePowers[p];
        const _matches = await axios.get(`/api/haspowertwo/${power}`);
        const matches = _matches.data;
        singlePowers.push({ 'sets': [power], 'size': matches });
        if(p < 5) {
          console.log('1a');
          console.log(`${power}: ${matches}`);
        }
      }
      console.log('2');
      console.log(singlePowers);

      const combinedPowers = [];
      for(var p1 = 0; p1 < possiblePowers.length; p1++) {
        for (var p2 = p1 + 1; p2 < possiblePowers.length; p2++) {
          const power1 = possiblePowers[p1];
          const power2 = possiblePowers[p2];
          const _matches = await axios.get(`/api/haspowertwo/${power1}/${power2}`);
          const matches = _matches.data;
          singlePowers.push({ 'sets': [power1, power2], 'size': matches });
          if(p1 < 5 && p2 < 5) {
            console.log('2a');
            console.log(`${power1}, ${power2}: ${matches}`);
          }
        }
      }
      console.log('3');
      console.log(combinedPowers);

      var sets = new Set([
        ...singlePowers,
        ...combinedPowers
      ]);
      console.log('4');
      console.log(sets);

      var chart = venn.VennDiagram();

      d3.select("#stats").datum(sets).call(chart);
      var tooltip = d3.select("body").append("div")
        .attr("class", "venntooltip");

      var colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple'];

      d3.selectAll("#stats .venn-circle path")
        .style("fill-opacity", 0)
        .style("stroke-width", 10)
        .style("stroke-opacity", .5)
        .style("stroke", function(d, i) { return colors[i % colors.length]; });

      d3.selectAll("#stats .venn-circle text")
        .style("fill", function(d, i) { return colors[i % colors.length] })
        .style("font-size", "24px")
        .style("font-weight", "100");
      
      d3.selectAll("#stats .venn-circle")
        .on("mouseover", function(d) {
          var node = d3.select(this).transition();
          node.select("path").style("fill-opacity", .2);
          node.select("text").style("font-weight", "100")
            .style("font-size", "36px");
          // sort all the areas relative to the current item
          venn.sortAreas(chart, d);

          // Display a tooltip with the current size
          tooltip.transition().duration(400).style("opacity", .9);
          tooltip.text(d.size + " users");
          
          // highlight the current path
          var selection = d3.select(this).transition("tooltip").duration(400);
          selection.select("path")
            .style("stroke-width", 3)
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
        })
        .on("mousemove", function() {
          tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          var node = d3.select(this).transition();
          node.select("path").style("fill-opacity", 0);
          node.select("text").style("font-weight", "100")
            .style("font-size", "24px");
          tooltip.transition().duration(400).style("opacity", 0);
          var selection = d3.select(this).transition("tooltip").duration(400);
          selection.select("path")
            .style("stroke-width", 0)
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
        });
    },
    displayStatsGraph: function(stat) {
      const data = [];
      var MAX_X = 1;
      this.data.forEach((currentCharacter) => {
        if(currentCharacter[stat] !== '') {
          const existing = data.findIndex((entry) => entry['value'] === currentCharacter[stat]);
          if(existing === -1) {
            data.push({ 'names': [currentCharacter['Name']], 'value': currentCharacter[stat] });
          } else {
            data[existing]['names'].push(currentCharacter['Name']);
          }
          if(currentCharacter[stat] > MAX_X) {
            MAX_X = currentCharacter[stat];
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

      const vm = this;

      //Bars
      svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(`${d.value} (${d.names.length} names)`); })
        .attr("width", function(d) { return x(d.value < 1 ? 1 : d.value); })
        .attr("height", 10 ) // y.bandwidth()
        .attr("fill", "#69b3a2")
        .on("mouseover", function(d, barData) {
          vm.selectedCharacters = [];
          // var tipx = 10 * i;
          // var tipy = d3.select(this).attr("height");
          d3.select(this).attr("r", 10).style("fill", "orange");
          tooltip.attr("x", 2);
          tooltip.attr("y", 2);
          // tooltip.attr("dx", ((width/MAX_X) * barData.value) + 2);
          // tooltip.attr("dy", y(barData.value) + 5);
          tooltip.style("visibility", "visible");
          tooltip.style("fill", "black");
          tooltip.text(`${stat} ${barData.value}: view ${barData.names.length} characters below:`);
          var selected = vm.data.filter((s) => { return barData.names.includes(s['Name']) });
          selected.forEach((currectCharacter) => {
            vm.selectedCharacters.push({ '_id': currectCharacter['_id'], 'name': currectCharacter['Name'] });
          });
        })
        .on("mouseout", function() {
          d3.select(this).attr("r", 10).style("fill", "#69b3a2");
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
