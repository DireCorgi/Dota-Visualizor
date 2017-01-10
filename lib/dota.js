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
    return players.map((player) => {
      return {
        assists: player.assists,
        deaths: player.deaths,
        denies: player.denies,
        gold_per_min: player.gold_per_min,
        hero_damage: player.hero_damage,
        kills: player.kills,
        last_hits: player.last_hits,
        level: player.level,
        xp_per_min: player.xp_per_min,
        tower_damage: player.tower_damage,
        win: player.win,
        total_gold: player.total_gold,
        total_exp: player.total_exp,
        actions_per_min: player.actions_per_min,
        isRadiant: player.isRadiant,
        player_slot: player.player_slot,
        personaname: player.personaname,
      };
    });
  }

  function drawTable(data, columns) {
    const table = d3.select('section.chart')
                    .append('table')
                    .attr('class', 'game-stat-table');
    const thead = table.append('thead');
    const tbody = table.append('tbody');
  }

  goldButton.addEventListener('click', handleClickGold);
});
