import getData from './get_data';
import * as d3 from 'd3';

class Graph {
  constructor(options) {
    this.chart = options.chart;
    this.width = options.width;
    this.height = options.height;
    this.title = options.title;
    this.xAxisLabel = options.xAxisLabel;

    this.drawGraph = this.drawGraph.bind(this);
  }

  drawGraph(data) {
    const chart = this.chart;
    if (data) {
      const maxData = Math.max(...data);
      const minData = Math.min(...data);
      let maxScale = maxData;
      if (maxData < Math.abs(minData)) maxScale = Math.abs(minData);
      const maxCount = data.length;
      const time = data.map((_, idx)=> {
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
                      .range([0, this.width - xOffset])
                      .padding([0.2]);

      const xScaleFormatted = d3.scaleBand()
                      .domain(timeMapped)
                      .range([0, this.width - xOffset])
                      .padding([0.2]);

      const yScale = d3.scaleLinear()
                      .domain([0, maxScale])
                      .range([0, this.height/2 - 40]);

      const yScaleNegative = d3.scaleLinear()
                      .domain([Math.abs(maxScale), -Math.abs(maxScale)])
                      .range([0, this.height - 80])
                      .nice();

      chart.selectAll('rect').data(data)
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', (dateum) => { return Math.abs(yScale(dateum)); } )
      .attr('x', (dateum, i) => {
        return xScale(i * 5);
      })
      .attr('class',(dateum) => {
        if (dateum > 0) {
          return 'color-green';
        } else {
          return '';
        }
      })
      .attr('transform',`translate(${xOffset}, 0)`)
      .attr('y', (dateum) => {
        if (dateum >= 0) {
          return this.height / 2 - Math.abs(yScale(dateum));
        } else if (dateum < 0) {
          return this.height/2;
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
      middleLine.style('stroke', 'black')
        .attr('x1', xOffset)
        .attr('x2', this.width)
        .attr('y1', 300)
        .attr('y2',300);

      this.drawTitle(xOffset);
      this.drawAxisLabels(xOffset);

    } else {
      chart.append("text")
      .text("Replay not parsed")
      .attr('x',500)
      .attr('y', (dateum) => { return this.height/2; });
    }

  }

  drawTitle(xOffset) {
    this.chart.append('text')
    .attr('x', (xOffset + 20 + this.width / 2))
    .attr('y', (80))
    .attr('text-anchor', 'middle')
    .attr('class', 'title-text')
    .text(this.title);
  }

  drawAxisLabels(xOffset) {
    this.chart.append('text')
      .attr('x', xOffset - 20 + (this.width / 2))
      .attr('y', this.height)
      .attr('text-anchor', 'middle')
      .attr('class', 'label-text')
      .text(this.xAxisLabel);

    this.chart.append('text')
      .attr('x', -this.height/4 + 20)
      .attr('y', 30)
      .attr("transform", "rotate(-90)")
      .attr('text-anchor', 'middle')
      .attr('class', 'label-text radiant y-label')
      .text('Radiant');

    this.chart.append('text')
      .attr('x', (-this.height * 3/4) + 20)
      .attr('y', 30)
      .attr("transform", "rotate(-90)")
      .attr('text-anchor', 'middle')
      .attr('class', 'label-text dire y-label')
      .text('Dire');

  }

}

export default Graph;
