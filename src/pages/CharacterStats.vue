<template>
  <div class="stats">
    <h1>{{name}}</h1>
    <div v-show="!resultsFound" class="error">
      <p>There was an error loading data for the requested character. Please try again.</p>
    </div>
    <div class="info">
      <div class="statlist">
        <p>Alignment: {{this.characterData.Alignment !== '' ? this.characterData.Alignment : 'Unknown'}}</p>
        <p>Eyecolor: {{this.characterData.Eyecolor !== '' ? this.characterData.Eyecolor : 'Unknown'}}</p> 
        <p>Haircolor: {{this.characterData.Haircolor !== '' ? this.characterData.Haircolor : 'Unknown'}}</p>
        <p>Skincolor: {{this.characterData.Skincolor !== '' ? this.characterData.Skincolor : 'Unknown'}}</p>
        <p>Race: {{this.characterData.Race !== '' ? this.characterData.Race : 'Unknown'}}</p>
        <p>Publisher: {{this.characterData.Publisher !== '' ? this.characterData.Publisher : 'Unknown'}}</p>
        <p>Height: {{this.characterData.Height !== '' ? this.characterData.Height : 'Unknown'}}</p>
        <p>Weight: {{this.characterData.Weight !== '' ? this.characterData.Weight : 'Unknown'}}</p>
        <p>Gender: {{this.characterData.Gender !== '' ? this.characterData.Gender : 'Unknown'}}</p>
      </div>
      <div id="statdisplay">
        <h2>Stats</h2>
        <div v-show="resultsFound" id="stats"></div>
      </div>
    </div>
      <div class="info" v-if="this.characterData.Powers">
        <div v-for="character in this.characterData.Powers" v-bind:key="character">
          <PowerCard class="power" v-bind:name="character"></PowerCard> 
        </div>
      </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';
import { powerStats, powerColors } from '../constants.js';
import PowerCard from '../components/PowerCard.vue';

export default {
  name: 'CharacterStats',
  components: {
    PowerCard,
  },
  data: function() {
    return {
        id: this.$route.params.id,
        name: '',
        stats: [],
        powers: [],
        resultsFound: false,
        characterData: ''
      };
  },
  async mounted() {
    const characterData = await axios.get(`/api/id/${this.id}`);
    if(characterData.status === 200) {
      this.resultsFound = true;
      this.characterData = characterData.data;
      this.parseCharacterData(characterData.data);
      this.displayStatsGraph();

    } else {
      this.resultsFound = false;
    }
  },
  methods: {
    getHsv: function(stat) {
      let hue = 1;
      let light = 0;
      if (stat.value <= 100 ){
        light = (100 - stat.value) * 0.75 + 25;
      } else {
        hue = 45;
        light = (140 - stat.value)  * 0.75 + 25;
      }
      return [hue, light];
    },
    parseCharacterData: function(data) {
      this.powers = data['Powers'] !== undefined ? data['Powers'].slice(0) : [];
      this.name = data['Name'];

      Object.entries(data).forEach(([key, entry]) => {
        if(powerStats.has(key)) {
          this.stats.push({
            category: key,
            value: entry
          });
        }
      });
    },
    displayStatsGraph: function() {
      const numericalStats = this.stats.filter((stat) => { return typeof stat.value === 'number' });

      const w = 500;
      const h = 500;

      const svg = d3
        .select("#stats")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // const sortedStats = numericalStats.sort((a, b) => (a.value > b.value ? 1 : -1));
      const max_stats = 120;

      const angleScale = d3
        .scaleLinear()
        .domain([0, max_stats])
        .range([0, 1.5 * Math.PI]);

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) * 25)
        .outerRadius((d, i) => (i + 2) * 25)
        .startAngle(angleScale(0))
        .endAngle(d => angleScale(d.value));

      const g = svg.append("g");
      var myColor = d3.scaleOrdinal().domain(numericalStats)
        .range(powerColors)
      g.selectAll("path")
        .data(numericalStats)
        .enter()
        .append("path")
        .attr("d", arc)
        .style("fill", (d) => {
          const color = this.getHsv(d)
          return "hsl(" + color[0] + ",100%," + color[1] + "%)";
          })
        .attr("stroke", "#FFF")
        .attr("stroke-width", "1px")
        .on("mouseenter", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 0.5);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 1);
        });
      g.selectAll("text")
        .data(numericalStats)
        .enter()
        .append("text")
        .text(d => `${d.category}: ${d.value}`)
        .attr("x", -150)
        .attr("dy", -8)
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .style("fill", function(d, i){return myColor(i)})
        .attr("y", (d, i) => -(i + 1) * 25);

      g.attr("transform", "translate(200,300)");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  padding-left: 20px;
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

text {
  font-size: 30px;
  font-weight: bold;
}

.info {
  display: flex;
  flex-direction: row;
  overflow: wrap;
  width: 100%;
  flex-flow: row wrap;
}

#stats{
  padding-left: 250px;
  margin-top: -40px;
}

.statlist {
  font-size: 20px;
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 50px;
}

#statdisplay {
  display: flex;
  flex-direction: column;
}

h2 {
  padding-left: 300px;
  margin-bottom: -40px;
}
</style>
