import getData from './get_data';
import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', ()=> {

  const button = document.getElementById('graph-button');
  const height = 600;
  const width = 1200;
  const barOffset = 5;

  const handleClick = (e) => {
    const matchId = document.getElementById('match-id');
    let dotaData = getData();
    if (Number(matchId.value)) {
      dotaData = getData(Number(matchId.value));
    }
    //  the size of the overall svg element
    const svg = d3.select('section.chart').append('svg')
    .attr('width', width)
    .attr('height', height);

    if (dotaData.radiant_gold_adv)
    {
      drawGraph(dotaData.radiant_gold_adv, svg);
      // drawGraph(dotaData.radiant_xp_adv, svg2);
    }
    else {
      dotaData.then((data) => {
        drawGraph(data.radiant_gold_adv, svg);
        // drawGraph(data.radiant_xp_adv, svg2);
      });
    }
  };

  button.addEventListener('click', handleClick);

  function drawGraph(gold, chart) {
    if (gold) {
      const maxGold = Math.max(...gold);
      const minGold = Math.min(...gold);
      let maxScale = maxGold;
      if (maxGold < Math.abs(minGold)) maxScale = Math.abs(minGold);
      const maxCount = gold.length;
      const time = gold.map((_, idx)=> {
        return idx * 5;
      });
      const xOffset = 80;
      const timeMapped = time.map((mins, idx) => {
        const hours = Math.floor((mins/5) / 60);
        const minutes = (mins/5) % 60;
        let formatMinutes = `${minutes}`;
        if (minutes < 10) formatMinutes = `0${minutes}`;
        return `${hours}:${formatMinutes}`;
      });

      const xScale = d3.scaleBand()
                      .domain(time)
                      .range([0, width - xOffset])
                      .padding([0.2]);

      const xScaleFormatted = d3.scaleBand()
                      .domain(timeMapped)
                      .range([0, width - xOffset])
                      .padding([0.2]);

      const yScale = d3.scaleLinear()
                      .domain([0, maxScale])
                      .range([0, height/2 - 40]);

      const yScaleNegative = d3.scaleLinear()
                      .domain([Math.abs(maxScale), -Math.abs(maxScale)])
                      .range([0, height - 80])
                      .nice();

      chart.selectAll('rect').data(gold)
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', (data) => { return Math.abs(yScale(data)); } )
      .attr('x', (data, i) => {
        return xScale(i * 5);
      })
      .attr('class',(data) => {
        if (data > 0) {
          return 'color-green';
        } else {
          return '';
        }
      })
      .attr('transform',`translate(${xOffset}, 0)`)
      .attr('y', (data) => {
        if (data >= 0) {
          return height / 2 - Math.abs(yScale(data));
        } else if (data < 0) {
          return height/2;
        }
      });
      const yAxis = d3.axisLeft(yScaleNegative).tickArguments([15, 's']);
      const verticalGuide = chart.append('g');
      yAxis(verticalGuide);
      verticalGuide.attr('transform',`translate(${xOffset}, 40)`);

      const xAxis = d3.axisBottom(xScaleFormatted);
      const horizontalGuide = chart.append('g');
      horizontalGuide.attr('transform',`translate(${xOffset}, 570)`);
      xAxis(horizontalGuide);
      horizontalGuide.selectAll('text').attr('x','10');

      const middleLine = chart.append('line');
      middleLine.style('stroke', 'black').attr('x1', xOffset).attr('x2', width).attr('y1', 300).attr('y2',300);

    } else {
      chart.append("text")
      .text("Replay not parsed")
      .attr('x',500)
      .attr('y', (data) => { return height/2; });
    }
  }

});
