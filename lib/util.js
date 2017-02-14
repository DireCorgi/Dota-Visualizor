import * as d3 from 'd3';
import itemMappings from './data/items';

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

export const getPlayersNetWorth = (players) => {
  let maximum = 0;
  const data = players.map((player) => {
    const curMax = player.gold_t[player.gold_t.length - 1];
    if (curMax > maximum) maximum = curMax;
    return {
      hero: player.hero_id,
      gold: player.gold_t
    };
  });
  return { data, maximum };
};

export const getItemName = (item) => {
  return itemMappings[item].formattedName;
};

export const getItemCategory = (item) => {
  return itemMappings[item].category;
};

export const formatTime = (secs) => {
  let sign = '';
  let totalSeconds = secs;
  if (secs < 0) {
    sign = '-';
    totalSeconds = totalSeconds * -1;
  }
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  if (minutes < 10) minutes = `0${minutes}`;
  if (minutes === 0) minutes = '00';
  if (seconds < 10) seconds = `0${seconds}`;
  if (seconds === 0) seconds = '00';
  return `${sign}${minutes}:${seconds}`;
};
