<template>
  <div class="stats">
    <div v-show="resultsFound" id="stats"></div>
    <div v-show="resultsFound" id="powers"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'CharacterStats',
  props: {
    name: String
  },
  data: function() {
    return {
        resultsFound: true,
        stats: [
          {category: 'Intelligence', value: 70 },
          {category: 'Strength', value: 83 },
          {category: 'Speed', value: 44 },
          {category: 'Stamina', value: 49 },
          {category: 'Energy', value: 80 }
        ],
        powers: [
          'Super Strength',
          'Super Speed',
          'Thirstokenesis'
        ]
      };
  },
  mounted() {
    this.loadStats();
  },
  methods: {
    loadStats: function() {
      this.getStatsGraph();
      const w = 500;
      const h = 500;

      const svg = d3
        .select("#powers")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
      
      svg.selectAll("text")
        .data(this.powers)
        .enter()
        .append("text")
        .text(d => `${d}`)
        .attr("dy", -8)
        .attr("y", (d, i) => (i + 1) * 25);
    },
    getStatsGraph: function() {
      const w = 500;
      const h = 500;

      const svg = d3
        .select("#stats")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
      const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_stats = d3.max(this.stats, o => o.value);

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
        .data(this.stats)
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
</style>
