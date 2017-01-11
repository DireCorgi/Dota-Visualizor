import getData from './get_data';
import * as d3 from 'd3';
import Graph from './graph';
import heroes from './data/hero_ids';

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
    d3.select('section.chart').selectAll('*').remove(); //clears svg elements

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

  function parsePlayers(players) {
    const format = d3.format(',');
    return players.map((player) => {
      let name = "anonymous";
      if (player.personaname) name = player.personaname;
      return {
        Hero: player.hero_id,
        Level: player.level,
        Name: name,
        KDA: `${player.kills}/${player.deaths}/${player.assists}`,
        'Creep Score': `${player.last_hits}/${player.denies}`,
        'Gold Per Min': player.gold_per_min,
        'Total Gold': format(player.total_gold),
        'XP Per Min': player.xp_per_min,
        'Total EXP': format(player.total_xp),
        'Hero Damage': format(player.hero_damage),
        'Tower Damage': format(player.tower_damage),
        APM: player.actions_per_min,
      };
    });
  }

  function drawTable(data, columns) {
    const table = d3.select('section.chart')
                    .append('table')
                    .attr('class', 'game-stat-table');
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
        .text((column) => {
          return column;
        });

    const rows = tbody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr')
        .attr('class', (_, idx) => {
          let className = 'radiant';
          if (idx > 4) className = 'dire';
          return className;
        });

    const cells = rows.selectAll('td')
      .data((row) => {
        return columns.map((column) => {
          let value = row[column];
          if (column === 'Hero') {
            value = heroes[value - 1].localized_name;
          }
          return { column: column, value: value };
        });
      })
      .enter()
      .append('td')
      .text((d) => { return d.value; });

    return table;
  }

  const players = getData().players;
  const parsedPlayerData = parsePlayers(players);
  drawTable(parsedPlayerData, Object.keys(parsedPlayerData[0]));

  goldButton.addEventListener('click', handleClickGold);
});
