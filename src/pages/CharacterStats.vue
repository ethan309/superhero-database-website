<template>
  <div class="stats">
    <h3>{{name}} (id: {{id}})</h3>
    <div v-show="!resultsFound" class="error">
      <p>There was an error loading data for the requested character. Please try again.</p>
    </div>
    <div v-show="resultsFound" id="stats"></div>
    <div v-show="resultsFound" id="powers"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';

export default {
  name: 'CharacterStats',
  data: function() {
    return {
        id: this.$route.params.id,
        name: '',
        stats: [],
        powers: [],
        resultsFound: false
      };
  },
  async mounted() {
    const characterData = await axios.get(`/api/id/${this.id}`);
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
      this.powers = data['Powers'] !== undefined ? data['Powers'].slice(0) : [];
      this.name = data['Name'];

      const statsColumns = new Set([
        "Alignment",
        "Gender",
        "Eyecolor",
        "Race",
        "Haircolor",
        "Publisher",
        "Skincolor",
        "Height",
        "Weight",
        "Intelligence",
        "Strength",
        "Speed",
        "Durability",
        "Power",
        "Combat"
      ]);

      Object.entries(data).forEach(([key, entry]) => {
        if(statsColumns.has(key) && entry.length > 0) {
          this.stats.push({
            category: key,
            value: entry
          });
        }
      });
    },
    displayStatsGraph: function() {
      const numericalStats = this.stats.filter((stat) => { return typeof stat.value === 'number' })

      const w = 500;
      const h = 500;

      const svg = d3
        .select("#stats")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
      const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_stats = d3.max(numericalStats, o => o.value);

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

      g.selectAll("path")
        .data(numericalStats)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
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
        .data(this.stats)
        .enter()
        .append("text")
        .text(d => `${d.category}: ${d.value}`)
        .attr("x", -150)
        .attr("dy", -8)
        .attr("y", (d, i) => -(i + 1) * 25);

      g.attr("transform", "translate(200,300)");
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
