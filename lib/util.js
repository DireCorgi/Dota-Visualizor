import * as d3 from 'd3';

export const parsePlayers = (players) => {
  const format = d3.format(',');
  return players.map((player) => {
    let name = "anonymous";
    if (player.personaname) name = player.personaname;
    return {
      Hero: player.hero_id,
      Level: player.level,
      Name: name,
      KDA: `${player.kills}/${player.deaths}/${player.assists}`,
      'LH/D': `${player.last_hits}/${player.denies}`,
      'GPM': player.gold_per_min,
      'XPM': player.xp_per_min,
      'Gold': format(player.total_gold),
      'EXP': format(player.total_xp),
      'HDmg': format(player.hero_damage),
      'TDmg': format(player.tower_damage),
      APM: player.actions_per_min,
    };
  });
};