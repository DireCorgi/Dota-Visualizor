import * as Buttons from './buttons.js';
import configuration from './configuration';
import getData from './get_data';
import * as d3 from 'd3';
import Graph from './graph';
import drawTable from './chart';
import drawWinText from './win_text';

const _getDotaData = () => {
  const matchId = document.getElementById('match-id');
  let dotaData = getData();
  if (Number(matchId.value)) {
    dotaData = getData(Number(matchId.value));
  }
  return dotaData;
};

const _clearScreen = () => {
  d3.select('section.chart').selectAll('*').remove();
};

const _setTableArea = () => {
  const textArea = d3.select('section.chart')
                  .append('div')
                  .attr('class', 'win-text')
                  .append('text');

  const table = d3.select('section.chart')
                  .append('table')
                  .attr('class', 'game-stat-table')
                  .style('background-image','url(./assets/images/loading.gif)');
  return { textArea, table };
};

const _createTable = (options) => {
  const { dotaData, textArea, table } = options;
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
};

const _setGraphArea = (options) => {
  const { height, width } = options;
  const svg = d3.select('section.chart').append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background-image','url(./assets/images/loading.gif)');
  return svg;
};

const _graphAdvantage = (options) => {
  const { dotaData, graphGold, graphXp } = options;
  if (dotaData.radiant_gold_adv)
  {
    graphGold.drawGraph(dotaData.radiant_gold_adv);
    graphXp.drawGraph(dotaData.radiant_xp_adv);
  } else {
    dotaData.then((data) => {
      graphGold.drawGraph(data.radiant_gold_adv);
      graphXp.drawGraph(data.radiant_xp_adv);
    });
  }
};

const setButtons = () => {

  const dotaData = _getDotaData();
  const { height, width } = configuration;

  const handleGraphAdv = (e) => {
    const svg = _setGraphArea({ height, width });
    const svg2 = _setGraphArea({ height, width });

    const graphGold = new Graph({
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

    _graphAdvantage({ dotaData, graphGold, graphXp });
  };

  const handleGetData = (e) => {
    _clearScreen();
    const { textArea, table } = _setTableArea();
    _createTable({ dotaData, textArea, table });
  };

  Buttons.dataButton.addEventListener('click', handleGetData);
  Buttons.advButton.addEventListener('click', handleGraphAdv);
};

export default setButtons;
