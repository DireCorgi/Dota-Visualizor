import getData from './get_data';
import * as d3 from 'd3';
import Graph from './graph';

document.addEventListener('DOMContentLoaded', ()=> {

  const goldButton = document.getElementById('graph-gold');
  const height = 600;
  const width = 1200;

  const handleClickGold = (e) => {
    const matchId = document.getElementById('match-id');
    let dotaData = getData();
    if (Number(matchId.value)) {
      dotaData = getData(Number(matchId.value));
    }
    //  the size of the overall svg elementa
    const svg = d3.select('section.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background','white');

    const svg2 = d3.select('section.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background','white');

    const graph = new Graph({
                    height,
                    width,
                    chart: svg,
                    title: "Gold Advantage",
                    xAxisLabel: "Game Time",
                  });

    const graphXp = new Graph({
                      height,
                      width,
                      chart: svg2,
                      title: "XP Advantage",
                      xAxisLabel: "Game Time",
                    });

    if (dotaData.radiant_gold_adv)
    {
      graph.drawGraph(dotaData.radiant_gold_adv);
      graphXp.drawGraph(dotaData.radiant_xp_adv);
    }
    else {
      dotaData.then((data) => {
        graph.drawGraph(data.radiant_gold_adv);
        graphXp.drawGraph(data.radiant_xp_adv);
      });
    }
  };

  goldButton.addEventListener('click', handleClickGold);
});
