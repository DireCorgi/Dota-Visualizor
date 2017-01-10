import matchData from './data/sample_data';

const getData = (matchId) => {
  if (matchId) {
    const dataPromise = $.ajax({
      url: `https://api.opendota.com/api/matches/${matchId}`,
      method: 'GET',
    });
    return dataPromise;
  }
  return {
    'radiant_gold_adv': matchData.radiant_gold_adv,
    'radiant_xp_adv': matchData.radiant_xp_adv,
    'players': matchData.players,
  };
};

export default getData;
