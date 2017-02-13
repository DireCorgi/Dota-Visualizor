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

  const tooltip = d3.select(`.item-area`).append('div')
                    .attr('class','item-tooltip')
                    .style('opacity', 0);

  data.forEach((purchaseLog, idx) => {
    chart.selectAll('dot')
      .data(purchaseLog)
      .enter()
        .append('circle')
        .attr('class', (d) => {
          if (idx > 4) {
            return 'item-dot radiant-dot';
          } else {
            return 'item-dot dire-dot';
          }
        })
        .attr('r', 8)
        .attr('cx', (d) => xScale(d.time))
        .attr('cy', yScale(idx))
        .on('mouseover', (d) => {
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip.html(d.key)
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 30) + 'px');
        })
        .on('mouseout', (d) => {
          tooltip.transition().duration(300).style('opacity', 0);
        });
  });

};

export default graphItemProgression;
