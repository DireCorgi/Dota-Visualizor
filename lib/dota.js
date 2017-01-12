import getData from './get_data';
import * as d3 from 'd3';
import Graph from './graph';
import drawTable from './chart';

document.addEventListener('DOMContentLoaded', ()=> {

  const dataButton = document.getElementById('graph-gold');
  const height = 700;
  const width = 1000;

  const handleClick = (e) => {
    const matchId = document.getElementById('match-id');
    let dotaData = getData();
    if (Number(matchId.value)) {
      dotaData = getData(Number(matchId.value));
    }
    d3.select('section.chart').selectAll('*').remove(); //clears svg elements

    const textArea = d3.select('section.chart')
                    .append('div')
                    .attr('class', 'win-text')
                    .append('text');

    const table = d3.select('section.chart')
                    .append('table')
                    .attr('class', 'game-stat-table')
                    .style('background-image','url(./assets/images/loading.gif)');

    const svg = d3.select('section.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-image','url(./assets/images/loading.gif)');

    const svg2 = d3.select('section.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-image','url(./assets/images/loading.gif)');

    const graph = new Graph({
                    height,
                    width,
                    chart: svg,
                    title: "Gold Advantage",
                    xAxisLabel: "Game Time (min)",
                  });

    const graphXp = new Graph({
                      height,
                      width,
                      chart: svg2,
                      title: "XP Advantage",
                      xAxisLabel: "Game Time (min)",
                    });

    if (dotaData.players) {
      let winner = 'Dire';
      if (dotaData.radiant_win) winner = 'Radiant';
      drawWinText(textArea, winner);
      drawTable(dotaData.players, table);
    } else {
      dotaData.then((data) => {
        let winner = 'Dire';
        if (data.radiant_win) winner = 'Radiant';
        drawWinText(textArea, winner);
        drawTable(data.players, table);
      });
    }
    if (dotaData.radiant_gold_adv)
    {
      graph.drawGraph(dotaData.radiant_gold_adv);
      graphXp.drawGraph(dotaData.radiant_xp_adv);
    } else {
      dotaData.then((data) => {
        graph.drawGraph(data.radiant_gold_adv);
        graphXp.drawGraph(data.radiant_xp_adv);
      });
    }
  };

  function drawWinText(textArea, winner) {
    textArea.text(`${winner} Victory!`).attr('class', `${winner}-text`);
  }

  dataButton.addEventListener('click', handleClick);
});
