import * as d3 from 'd3';

const graphItemProgression = (options) => {
  const { playersData, width, height, id } = options;
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
                  .range([xOffset, width - 10]);

  const yScale = d3.scaleLinear()
                  .domain([0, 9])
                  .range([height - 80, 80]);

  data.forEach((purchaseLog, idx) => {
    chart.selectAll('dot')
      .data(purchaseLog)
      .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 3.5)
        .attr('cx', (d) => xScale(d.time))
        .attr('cy', yScale(idx));
  });

};

export default graphItemProgression;
