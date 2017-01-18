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
    chart.style('background', '#242F39');
    if (data) {
      const maxData = Math.max(...data);
      const minData = Math.min(...data);
      let maxScale = maxData;
      if (maxData < Math.abs(minData)) maxScale = Math.abs(minData);
      const time = data.map((_, idx)=> {
        return idx * 5;
      });
      const xOffset = 80;

      const xScale = d3.scaleBand()
                      .domain(time)
                      .range([0, this.width - xOffset])
                      .padding([0.2]);

      const timeScale = d3.scaleLinear()
                      .domain([0, time.length])
                      .range([0, this.width - xOffset - 5]);

      const yScale = d3.scaleLinear()
                      .domain([0, maxScale + 1000])
                      .range([0, this.height/2 - 60]);

      const yScaleNegative = d3.scaleLinear()
                      .domain([Math.abs(maxScale) + 1000, -Math.abs(maxScale) - 1000])
                      .range([0, this.height - 120])
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
          return this.height / 2 - Math.abs(yScale(dateum)) - 20;
        } else if (dateum < 0) {
          return this.height/2 - 20;
        }
      });
      const middleLine = chart.append('line');
      middleLine.style('stroke', '#525252')
      .attr('x1', xOffset)
      .attr('x2', this.width)
      .attr('y1', this.height / 2 - 19.5)
      .attr('y2', this.height / 2 - 19.5);

      const valueline = d3.line()
            .x((d, i) => xScale(i * 5))
            .y( d => -yScale(d) + this.height / 2 - 20)
            .curve(d3.curveCardinal.tension(0.65));

      const lineGraph = chart.append('path')
        .attr('class', 'line')
        .attr('d', valueline(data));

      lineGraph.attr('transform',`translate(${xOffset}, 0)`);

      const yAxis = d3.axisLeft(yScaleNegative).tickArguments([12,'s']);
      const verticalGuide = chart.append('g');
      yAxis(verticalGuide);
      verticalGuide.attr('transform',`translate(${xOffset}, 40)`);

      const xAxis = d3.axisBottom(timeScale).tickArguments([10]);
      const horizontalGuide = chart.append('g');
      horizontalGuide.attr('transform',`translate(${xOffset}, 620)`);
      xAxis(horizontalGuide);
      horizontalGuide.selectAll('text').attr('x','5');


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
    .attr('y', (40))
    .attr('text-anchor', 'middle')
    .attr('class', 'title-text')
    .text(this.title);
  }

  drawAxisLabels(xOffset) {
    this.chart.append('text')
      .attr('x', xOffset - 20 + (this.width / 2))
      .attr('y', this.height - 25)
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
      .attr('x', (-this.height * 3/4) + 60)
      .attr('y', 30)
      .attr("transform", "rotate(-90)")
      .attr('text-anchor', 'middle')
      .attr('class', 'label-text dire y-label')
      .text('Dire');
  }

}

export default Graph;
