import * as d3 from 'd3';
import { getItemName, formatTime, getItemCategory } from './util';
import heroes from './data/hero_ids';

const graphItemProgression = (options) => {
  const { playersData, width, height, id, tooltip } = options;
  const xOffset = 80;
  if (id) d3.select(`#${id}`).remove();
  const chartArea = d3.select('section.chart').append('div').attr('class', 'item-area');
  const chart = chartArea.append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('id', id)
                .style('background-color', 'rgb(36, 47, 57)');
  const data = playersData.map((playerData) => {
    return playerData.purchase_log;
  });

  let maxTime = 0;
  data.forEach((dateum) => {
    const curTime = dateum[dateum.length - 1].time;
    if (curTime > maxTime) maxTime = curTime;
  });

  const xScale = d3.scaleLinear()
                  .domain([-120, maxTime])
                  .range([xOffset, width - 50]);

  const yScale = d3.scaleLinear()
                  .domain([9, 0])
                  .range([height - 80, 80]);

  let zigZagOffset = 0;

  data.forEach((purchaseLog, idx) => {
    chart.append('line')
      .attr('class', 'item-line')
      .attr('x1', xOffset)
      .attr('x2', width - 40)
      .attr('y1', yScale(idx))
      .attr('y2', yScale(idx));

    function yZigZag(d) {
      const zigZag = 9;
      let offset = 0;
      if (zigZagOffset === 0) {
        zigZagOffset = 1;
      } else if (zigZagOffset === 1) {
        offset = zigZag;
        zigZagOffset += 1;
      } else if (zigZagOffset === 2) {
        offset = 0;
        zigZagOffset += 1;
      } else if (zigZagOffset === 3) {
        offset = -zigZag;
        zigZagOffset = 0;
      }
      return yScale(idx) + offset;
    }

    chart.selectAll('dot')
      .data(purchaseLog)
      .enter()
        .append('circle')
        .attr('class', (d) => {
          const category = getItemCategory(d.key);
          if (idx < 5) {
            return `item-dot radiant-dot ${category}-item-dot`;
          } else {
            return `item-dot dire-dot ${category}-item-dot`;
          }
        })
        .attr('r', 8)
        .attr('cx', (d) => xScale(d.time))
        .attr('cy', yZigZag)
        .on('mouseover', (d) => {
          tooltip.transition().duration(150).style('opacity', 0.9);
          tooltip.html(`<h3>${getItemName(d.key)}</h3><h4>${formatTime(d.time)}</h4>`)
            .attr('class', `items-sprite-${d.key} item-tooltip`)
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 30) + 'px');
        })
        .on('mouseout', (d) => {
          tooltip.transition().duration(220).style('opacity', 0);
        });
  });

  const legendData = playersData.map((playerData) => {
    return heroes[playerData.hero_id - 1].localized_name;
  });

  chartArea
    .selectAll('div')
    .data(legendData)
    .enter()
      .append('div')
      .attr('class', (d) => {
        let heroName = d;
        heroName = heroName.toLowerCase();
        heroName = heroName.replace(/ /g,"_");
        return `miniheroes-sprite-${heroName} item-hero-legend`;
      })
      .style('top', (d, idx) => (yScale(idx) - 21) + 'px');

  chart.append('text')
    .attr('x', (xOffset + 20 + width / 2))
    .attr('y', (40))
    .attr('text-anchor', 'middle')
    .attr('class', 'title-text')
    .text('Item Progression');

  $('html, body').animate({
       scrollTop: $("#items-area").offset().top
   }, 800);
};

export default graphItemProgression;
