import * as d3 from 'd3';
import heroes from './data/hero_ids';
import { getPlayersNetWorth } from './util';

const graphAllPlayerNetWorth = (options) => {
  const { playersData, width, height, id } = options;
  const xOffset = 80;

  if (id) d3.select(`#${id}`).remove();
  const { data, maximum } = getPlayersNetWorth(playersData);
  const chartArea = d3.select('section.chart').append('div').attr('class', 'player-area');
  const chart = chartArea.append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('id', id)
                .style('background-color', 'rgb(36, 47, 57)');

  const time = data[0].gold.length - 1;
  const xScale = d3.scaleLinear()
                  .domain([0, time])
                  .range([xOffset, width - 10]);
  const yScale = d3.scaleLinear()
                  .domain([0, maximum])
                  .range([height - 80, 80])
                  .nice();

  const valueline = d3.line()
        .x((d, i) => xScale(i))
        .y( d => yScale(d))
        .curve(d3.curveCardinal.tension(0.65));

  data.forEach((playerData, idx) => {
    const gold = playerData.gold;
    chart.append('path')
    .attr('class', `player-line player-${idx} hover-highlight`)
    .attr('d', valueline(gold));
  });

  const xAxis = d3.axisBottom(xScale).tickArguments([10]);
  const horizontalGuide = chart.append('g');
  horizontalGuide.attr('transform',`translate(0, 620)`);
  xAxis(horizontalGuide);
  horizontalGuide.selectAll('text').attr('x','5');

  const yAxis = d3.axisLeft(yScale).tickArguments([12,'s']);
  const verticalGuide = chart.append('g');
  yAxis(verticalGuide);
  verticalGuide.attr('transform',`translate(${xOffset}, 0)`);

  const legend = chartArea.append('table').attr('class', 'player-legend').append('tbody');
  const legendData = data.map((playerData) => {
    return playerData.hero;
  });
  const legendRows = legend.selectAll('tr')
    .data(legendData)
    .enter()
    .append('tr');

  let rowIdx = -1;

  legendRows.selectAll('div')
    .data((dateum) => {
      return [dateum];
    })
    .enter()
    .append('div')
    .text('')
    .attr('class', (dateum) => {
      rowIdx += 1;
      let heroName = heroes[dateum - 1].localized_name;
      heroName = heroName.toLowerCase();
      heroName = heroName.replace(/ /g,"_");
      return `miniheroes-sprite-${heroName} player-legend-${rowIdx} hover-highlight`;
    })
      .append('div')
      .text((dateum) => {
          return heroes[dateum - 1].localized_name;
        })
      .attr('class', 'hidden-hero-text');

  chart.append('text')
  .attr('x', (xOffset + 20 + width / 2))
  .attr('y', (40))
  .attr('text-anchor', 'middle')
  .attr('class', 'title-text')
  .text('Net Worth By Player');

  chart.append('text')
    .attr('x', xOffset + (width / 2))
    .attr('y', height - 25)
    .attr('text-anchor', 'middle')
    .attr('class', 'label-text')
    .text('Game Time (min)');
};

export default graphAllPlayerNetWorth;
