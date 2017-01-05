import getData from './get_data';
import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', ()=> {
  const dotaData = getData(2883822225);

  //  the size of the overall svg element
  const height = 600;
  const width = 1000;
  const barOffset = 5;

  const svg = d3.select('section.chart').append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background', '#dff0d8');
  //  the width of each bar and the offset between each bar

  const svg2 = d3.select('section.chart').append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background', '#dff0d8');

  if (dotaData.radiant_gold_adv)
  {
    drawGraph(dotaData.radiant_gold_adv, svg);
    drawGraph(dotaData.radiant_xp_adv, svg2);
  }
  else {
    dotaData.then((data) => {
      drawGraph(data.radiant_gold_adv, svg);
      drawGraph(data.radiant_xp_adv, svg2);
    });
  }

  function drawGraph(gold, chart) {
    if (gold) {
      const maxGold = Math.max(...gold);
      const minGold = Math.min(...gold);
      let scale = 280/maxGold;
      if (maxGold < Math.abs(minGold)) scale = 280/Math.abs(minGold);

      const barWidth = (width - gold.length * 5)/gold.length ;

      chart.selectAll('rect').data(gold)
      .enter()
      .append('rect')
      .attr('width', barWidth)
      .attr('height', (data) => { return Math.abs(data * scale); } )
      .attr('x', (data, i) => {
        return i * (barWidth + barOffset);
      })
      .attr('y', (data) => {
        if (data >= 0) {
          return height / 2 - Math.abs(data * scale);
        } else if (data < 0) {
          return height/2;
        }
      });
    } else {
      svg.append("text")
      .text("Replay not parsed")
      .attr('x',500)
      .attr('y', (data) => { return height/2; });
    }
  }


});
