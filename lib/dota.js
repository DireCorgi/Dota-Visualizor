import getData from './get_data';
import * as d3 from 'd3';
import Graph from './graph';

document.addEventListener('DOMContentLoaded', ()=> {

  const button = document.getElementById('graph-gold');
  const height = 600;
  const width = 1200;

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

    const graph = new Graph({ height, width, chart: svg });

    if (dotaData.radiant_gold_adv)
    {
      graph.drawGraph(dotaData.radiant_gold_adv);
    }
    else {
      dotaData.then((data) => {
        graph.drawGraph(data.radiant_gold_adv);
      });
    }
  };

  button.addEventListener('click', handleClick);
});
