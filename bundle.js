/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _set_buttons = __webpack_require__(1);
	
	var _set_buttons2 = _interopRequireDefault(_set_buttons);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  (0, _set_buttons2.default)();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _buttons = __webpack_require__(2);
	
	var _buttons2 = _interopRequireDefault(_buttons);
	
	var _configuration = __webpack_require__(3);
	
	var _configuration2 = _interopRequireDefault(_configuration);
	
	var _get_data = __webpack_require__(4);
	
	var _get_data2 = _interopRequireDefault(_get_data);
	
	var _d = __webpack_require__(6);
	
	var d3 = _interopRequireWildcard(_d);
	
	var _graph = __webpack_require__(7);
	
	var _graph2 = _interopRequireDefault(_graph);
	
	var _chart = __webpack_require__(8);
	
	var _chart2 = _interopRequireDefault(_chart);
	
	var _win_text = __webpack_require__(11);
	
	var _win_text2 = _interopRequireDefault(_win_text);
	
	var _graph_player = __webpack_require__(12);
	
	var _graph_player2 = _interopRequireDefault(_graph_player);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _getDotaData = function _getDotaData() {
	  var matchId = document.getElementById('match-id');
	  var dotaData = (0, _get_data2.default)();
	  if (Number(matchId.value)) {
	    dotaData = (0, _get_data2.default)(Number(matchId.value));
	  }
	  return dotaData;
	};
	
	var _clearScreen = function _clearScreen() {
	  d3.select('section.chart').selectAll('*').remove();
	};
	
	var _setTableArea = function _setTableArea() {
	  var textArea = d3.select('section.chart').append('div').attr('class', 'win-text').append('text');
	
	  var table = d3.select('section.chart').append('table').attr('class', 'game-stat-table').style('background-image', 'url(./assets/images/loading.gif)');
	  return { textArea: textArea, table: table };
	};
	
	var _createTable = function _createTable(options) {
	  var dotaData = options.dotaData,
	      textArea = options.textArea,
	      table = options.table;
	
	  if (dotaData.players) {
	    var winner = 'Dire';
	    if (dotaData.radiant_win) winner = 'Radiant';
	    (0, _win_text2.default)(textArea, winner);
	    (0, _chart2.default)(dotaData.players, table);
	  } else {
	    dotaData.then(function (data) {
	      var winner = 'Dire';
	      if (data.radiant_win) winner = 'Radiant';
	      (0, _win_text2.default)(textArea, winner);
	      (0, _chart2.default)(data.players, table);
	    });
	  }
	};
	
	var _setGraphArea = function _setGraphArea(options) {
	  var height = options.height,
	      width = options.width,
	      id = options.id;
	
	  var svg = d3.select('section.chart').append('svg').attr('width', width).attr('height', height).attr('id', id).style('background-image', 'url(./assets/images/loading.gif)');
	  return svg;
	};
	
	var _graphAdvantage = function _graphAdvantage(options) {
	  var dotaData = options.dotaData,
	      graphGold = options.graphGold,
	      graphXp = options.graphXp;
	
	  if (dotaData.radiant_gold_adv) {
	    graphGold.drawGraph(dotaData.radiant_gold_adv);
	    graphXp.drawGraph(dotaData.radiant_xp_adv);
	  } else {
	    dotaData.then(function (data) {
	      graphGold.drawGraph(data.radiant_gold_adv);
	      graphXp.drawGraph(data.radiant_xp_adv);
	    });
	  }
	};
	
	var setButtons = function setButtons() {
	  var height = _configuration2.default.height,
	      width = _configuration2.default.width;
	
	  var buttons = (0, _buttons2.default)();
	  var dotaData = null;
	
	  var clearGraphs = function clearGraphs(e) {
	    d3.select('section.chart').selectAll('svg').remove();
	    d3.select('section.chart').selectAll('div.player-area').remove();
	  };
	
	  var handleGraphAdv = function handleGraphAdv(e) {
	    clearGraphs();
	    var svg = _setGraphArea({ height: height, width: width, id: 'graphs-start' });
	    var svg2 = _setGraphArea({ height: height, width: width });
	
	    var graphGold = new _graph2.default({
	      height: height,
	      width: width,
	      chart: svg,
	      title: "Gold Advantage",
	      xAxisLabel: "Game Time (min)"
	    });
	
	    var graphXp = new _graph2.default({
	      height: height,
	      width: width,
	      chart: svg2,
	      title: "XP Advantage",
	      xAxisLabel: "Game Time (min)"
	    });
	    if (dotaData.players) {
	      (0, _graph_player2.default)({
	        playersData: dotaData.players,
	        height: height,
	        width: width,
	        id: 'networth-area'
	      });
	    } else {
	      dotaData.then(function (data) {
	        (0, _graph_player2.default)({
	          playersData: data.players,
	          height: height,
	          width: width,
	          id: 'networth-area'
	        });
	      });
	    }
	
	    _graphAdvantage({ dotaData: dotaData, graphGold: graphGold, graphXp: graphXp });
	    $('html, body').animate({
	      scrollTop: $('#graphs-start').offset().top
	    }, 500);
	  };
	
	  var handleGetData = function handleGetData(e) {
	    dotaData = _getDotaData();
	    _clearScreen();
	    buttons.advButton.className = 'clear';
	    buttons.clearButton.className = 'clear';
	    setTimeout(function () {
	      buttons.advButton.className = '';
	      buttons.clearButton.className = '';
	    }, 1);
	
	    var _setTableArea2 = _setTableArea(),
	        textArea = _setTableArea2.textArea,
	        table = _setTableArea2.table;
	
	    _createTable({ dotaData: dotaData, textArea: textArea, table: table });
	  };
	
	  buttons.dataButton.addEventListener('click', handleGetData);
	  buttons.advButton.addEventListener('click', handleGraphAdv);
	  buttons.clearButton.addEventListener('click', clearGraphs);
	};
	
	exports.default = setButtons;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getButtons = function getButtons() {
	  var dataButton = document.getElementById('get-data');
	  var advButton = document.getElementById('graph-advantage');
	  var clearButton = document.getElementById('clear-button');
	  return { dataButton: dataButton, advButton: advButton, clearButton: clearButton };
	};
	
	exports.default = getButtons;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var configuration = {
	  height: 700,
	  width: 1000
	};
	
	exports.default = configuration;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _sample_data = __webpack_require__(5);
	
	var _sample_data2 = _interopRequireDefault(_sample_data);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getData = function getData(matchId) {
	  if (matchId) {
	    var dataPromise = $.ajax({
	      url: 'https://api.opendota.com/api/matches/' + matchId,
	      method: 'GET'
	    });
	    return dataPromise;
	  }
	  return {
	    'radiant_gold_adv': _sample_data2.default.radiant_gold_adv,
	    'radiant_xp_adv': _sample_data2.default.radiant_xp_adv,
	    'players': _sample_data2.default.players,
	    'radiant_win': _sample_data2.default.radiant_win
	  };
	};
	
	exports.default = getData;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// 20170105153604
	// https://api.opendota.com/api/matches/2890465108
	
	var matchData = {
	  "match_id": 2890465108,
	  "barracks_status_dire": 63,
	  "barracks_status_radiant": 0,
	  "chat": [{
	    "time": -81,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "gg?",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -67,
	    "type": "chat",
	    "unit": "Tyrone",
	    "key": "REPORT TEAM ",
	    "slot": 1,
	    "player_slot": 1
	  }, {
	    "time": -64,
	    "type": "chat",
	    "unit": "road 1k",
	    "key": "movistar sorry",
	    "slot": 2,
	    "player_slot": 2
	  }, {
	    "time": -47,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "xD",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -47,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "estos mens",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -47,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "cuando no tienes plata pa tu cabina xd",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -47,
	    "type": "chat",
	    "unit": "DeathDealer",
	    "key": "gg mi vieja me llamo ",
	    "slot": 0,
	    "player_slot": 0
	  }, {
	    "time": -47,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "agg niño rata",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -47,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "XD",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -47,
	    "type": "chat",
	    "unit": "DeathDealer",
	    "key": "ya no hay plata pa la media hora ptm",
	    "slot": 0,
	    "player_slot": 0
	  }, {
	    "time": -45,
	    "type": "chat",
	    "unit": "road 1k",
	    "key": "x2",
	    "slot": 2,
	    "player_slot": 2
	  }, {
	    "time": -43,
	    "type": "chat",
	    "unit": "Tyrone",
	    "key": "RECLAMA TU HORA GRATIS PEE",
	    "slot": 1,
	    "player_slot": 1
	  }, {
	    "time": -41,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "x3",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -34,
	    "type": "chat",
	    "unit": "Tyrone",
	    "key": "te regalo sellos ",
	    "slot": 1,
	    "player_slot": 1
	  }, {
	    "time": -32,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "david es malo",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -30,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "}:V",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -28,
	    "type": "chat",
	    "unit": "DeathDealer",
	    "key": "no hay ptm david mas duro ",
	    "slot": 0,
	    "player_slot": 0
	  }, {
	    "time": -26,
	    "type": "chat",
	    "unit": "road 1k",
	    "key": "report",
	    "slot": 2,
	    "player_slot": 2
	  }, {
	    "time": -20,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "report david :V",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": -8,
	    "type": "chat",
	    "unit": "Tyrone",
	    "key": "kimbo se lo esta montando",
	    "slot": 1,
	    "player_slot": 1
	  }, {
	    "time": -7,
	    "type": "chat",
	    "unit": "Tyrone",
	    "key": ":v",
	    "slot": 1,
	    "player_slot": 1
	  }, {
	    "time": -1,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "a ramon :V",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": 1,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "xD",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": 642,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "ty suport",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": 657,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "espero q te reputee tu team xd",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": 711,
	    "type": "chat",
	    "unit": "Cici",
	    "key": ":)",
	    "slot": 8,
	    "player_slot": 131
	  }, {
	    "time": 1494,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "mucho ven a sumail :V",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": 1504,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "q ratas :V",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": 2112,
	    "type": "chat",
	    "unit": "Tyrone",
	    "key": "QUE PASO AMIGUITO",
	    "slot": 1,
	    "player_slot": 1
	  }, {
	    "time": 2115,
	    "type": "chat",
	    "unit": "ShadowDitya",
	    "key": "XD",
	    "slot": 4,
	    "player_slot": 4
	  }, {
	    "time": 2620,
	    "type": "chat",
	    "unit": "Cheez - Its",
	    "key": "gg wp",
	    "slot": 5,
	    "player_slot": 128
	  }, {
	    "time": 2629,
	    "type": "chat",
	    "unit": "Cheerios",
	    "key": "gg",
	    "slot": 7,
	    "player_slot": 130
	  }, {
	    "time": 2629,
	    "type": "chat",
	    "unit": "Cici",
	    "key": "gg",
	    "slot": 8,
	    "player_slot": 131
	  }, {
	    "time": 2631,
	    "type": "chat",
	    "unit": "road 1k",
	    "key": "ez mid",
	    "slot": 2,
	    "player_slot": 2
	  }, {
	    "time": 2632,
	    "type": "chat",
	    "unit": "itou96",
	    "key": "Ez",
	    "slot": 3,
	    "player_slot": 3
	  }, {
	    "time": 2633,
	    "type": "chat",
	    "unit": "DeathDealer",
	    "key": "Gg",
	    "slot": 0,
	    "player_slot": 0
	  }, {
	    "time": 2633,
	    "type": "chat",
	    "unit": "road 1k",
	    "key": ":*",
	    "slot": 2,
	    "player_slot": 2
	  }],
	  "cluster": 122,
	  "cosmetics": {
	    "602": 129,
	    "4054": 129,
	    "4224": 129,
	    "4266": 131,
	    "4710": 129,
	    "5578": 3,
	    "5660": 128,
	    "6134": 128,
	    "6155": 3,
	    "6157": 3,
	    "7090": 131,
	    "7093": 131,
	    "7468": 128,
	    "7580": 131,
	    "8185": 2,
	    "8200": 2,
	    "8958": 131,
	    "9822": 2,
	    "9823": 2,
	    "9824": 2,
	    "9825": 2,
	    "9826": 2,
	    "10068": 1,
	    "10400": 3,
	    "11125": 3,
	    "11266": 129,
	    "11425": 131,
	    "11903": 4,
	    "16315": 132
	  },
	  "dire_score": 55,
	  "duration": 2625,
	  "engine": 1,
	  "first_blood_time": 165,
	  "game_mode": 22,
	  "human_players": 10,
	  "leagueid": 0,
	  "lobby_type": 7,
	  "match_seq_num": 2521356646,
	  "negative_votes": 0,
	  "objectives": [{
	    "time": 166,
	    "type": "CHAT_MESSAGE_FIRSTBLOOD",
	    "slot": 5,
	    "player_slot": 128
	  }, {
	    "time": 1097,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": -1
	  }, {
	    "time": 1148,
	    "type": "CHAT_MESSAGE_TOWER_DENY",
	    "team": 80,
	    "slot": 8,
	    "player_slot": 131
	  }, {
	    "time": 1292,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": -1
	  }, {
	    "time": 1303,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 2,
	    "slot": -1
	  }, {
	    "time": 1409,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": 7,
	    "player_slot": 130
	  }, {
	    "time": 1460,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 2,
	    "slot": 0,
	    "player_slot": 0
	  }, {
	    "time": 1466,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": 6,
	    "player_slot": 129
	  }, {
	    "time": 2190,
	    "type": "CHAT_MESSAGE_ROSHAN_KILL",
	    "team": 3
	  }, {
	    "time": 2191,
	    "type": "CHAT_MESSAGE_AEGIS",
	    "slot": 5,
	    "player_slot": 128
	  }, {
	    "time": 2228,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": -1
	  }, {
	    "time": 2292,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": 5,
	    "player_slot": 128
	  }, {
	    "time": 2328,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": 5,
	    "player_slot": 128
	  }, {
	    "time": 2333,
	    "type": "CHAT_MESSAGE_BARRACKS_KILL",
	    "key": "256"
	  }, {
	    "time": 2336,
	    "type": "CHAT_MESSAGE_BARRACKS_KILL",
	    "key": "512"
	  }, {
	    "time": 2348,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": 5,
	    "player_slot": 128
	  }, {
	    "time": 2355,
	    "type": "CHAT_MESSAGE_BARRACKS_KILL",
	    "key": "64"
	  }, {
	    "time": 2357,
	    "type": "CHAT_MESSAGE_BARRACKS_KILL",
	    "key": "128"
	  }, {
	    "time": 2452,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 2,
	    "slot": -1
	  }, {
	    "time": 2548,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": 5,
	    "player_slot": 128
	  }, {
	    "time": 2556,
	    "type": "CHAT_MESSAGE_BARRACKS_KILL",
	    "key": "1024"
	  }, {
	    "time": 2562,
	    "type": "CHAT_MESSAGE_BARRACKS_KILL",
	    "key": "2048"
	  }, {
	    "time": 2613,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": -1
	  }, {
	    "time": 2614,
	    "type": "CHAT_MESSAGE_TOWER_KILL",
	    "team": 3,
	    "slot": 9,
	    "player_slot": 132
	  }],
	  "picks_bans": null,
	  "positive_votes": 0,
	  "radiant_gold_adv": [0, -185, -263, -595, -876, -1285, -1484, -1538, -1201, -596, -406, -396, 1103, 1299, 1350, 2003, -3020, -2930, -2646, -3767, 3246, 3605, 2781, -3432, -4480, -3239, -3660, -2634, -2899, -3157, -3321, -2465, -2400, 3909, 4943, 4055, 4472, 6309, -8593, -15125, -20369, -20992, -21968, -28608, -36770, -36830, -36890],
	  "radiant_score": 29,
	  "radiant_win": false,
	  "radiant_xp_adv": [0, -289, -190, -252, -623, -844, -828, -1544, -1093, -616, -315, -469, -1538, -2096, -2422, -4006, -5641, -5328, -5687, -6627, -7140, -7525, -5886, -7630, -8335, -6540, -7441, -5018, -5193, -5543, -6063, -4125, -4946, -7840, -9179, -7334, -9103, -11532, -16153, -18296, -20603, -22575, -24326, -26957, -33150, -33150, -33150],
	  "start_time": 1483413306,
	  "teamfights": [{
	    "start": 269,
	    "end": 326,
	    "last_death": 311,
	    "deaths": 5,
	    "players": [{
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {
	        "ring_of_aquila": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 205,
	      "xp_delta": 763,
	      "xp_start": 726,
	      "xp_end": 1489
	    }, {
	      "deaths_pos": {
	        "78": {
	          "138": 1
	        }
	      },
	      "ability_uses": {
	        "bristleback_quill_spray": 6
	      },
	      "item_uses": {
	        "magic_wand": 1,
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 1048,
	      "healing": 60,
	      "gold_delta": 455,
	      "xp_delta": 652,
	      "xp_start": 1276,
	      "xp_end": 1928
	    }, {
	      "deaths_pos": {
	        "140": {
	          "116": 1
	        }
	      },
	      "ability_uses": {
	        "tusk_ice_shards": 2,
	        "tusk_snowball": 2,
	        "tusk_launch_snowball": 1
	      },
	      "item_uses": {
	        "bottle": 3
	      },
	      "killed": {
	        "npc_dota_hero_omniknight": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 857,
	      "healing": 180,
	      "gold_delta": 162,
	      "xp_delta": 246,
	      "xp_start": 1651,
	      "xp_end": 1897
	    }, {
	      "deaths_pos": {
	        "136": {
	          "98": 1
	        }
	      },
	      "ability_uses": {
	        "mirana_starfall": 1,
	        "mirana_arrow": 1,
	        "mirana_leap": 1
	      },
	      "item_uses": {
	        "enchanted_mango": 1,
	        "tpscroll": 1,
	        "ward_observer": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 154,
	      "healing": 0,
	      "gold_delta": -120,
	      "xp_delta": 45,
	      "xp_start": 545,
	      "xp_end": 590
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ogre_magi_bloodlust": 1
	      },
	      "item_uses": {
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 0,
	      "xp_start": 635,
	      "xp_end": 635
	    }, {
	      "deaths_pos": {
	        "76": {
	          "144": 1
	        }
	      },
	      "ability_uses": {
	        "weaver_the_swarm": 1,
	        "weaver_shukuchi": 1
	      },
	      "item_uses": {
	        "magic_stick": 1,
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 509,
	      "healing": 150,
	      "gold_delta": -103,
	      "xp_delta": 112,
	      "xp_start": 1209,
	      "xp_end": 1321
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "witch_doctor_paralyzing_cask": 1,
	        "witch_doctor_maledict": 1
	      },
	      "item_uses": {
	        "clarity": 1
	      },
	      "killed": {
	        "npc_dota_hero_bristleback": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 442,
	      "healing": 0,
	      "gold_delta": 467,
	      "xp_delta": 515,
	      "xp_start": 941,
	      "xp_end": 1456
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ember_spirit_searing_chains": 1,
	        "ember_spirit_flame_guard": 1,
	        "ember_spirit_fire_remnant": 2
	      },
	      "item_uses": {
	        "bottle": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 250,
	      "healing": 90,
	      "gold_delta": 111,
	      "xp_delta": 210,
	      "xp_start": 2045,
	      "xp_end": 2255
	    }, {
	      "deaths_pos": {
	        "144": {
	          "116": 1
	        }
	      },
	      "ability_uses": {
	        "omniknight_purification": 2,
	        "omniknight_repel": 1
	      },
	      "item_uses": {
	        "clarity": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 267,
	      "healing": 216,
	      "gold_delta": -114,
	      "xp_delta": 0,
	      "xp_start": 934,
	      "xp_end": 934
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "monkey_king_boundless_strike": 1
	      },
	      "item_uses": {},
	      "killed": {
	        "npc_dota_hero_mirana": 1,
	        "npc_dota_hero_tusk": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 1063,
	      "healing": 91,
	      "gold_delta": 585,
	      "xp_delta": 410,
	      "xp_start": 821,
	      "xp_end": 1231
	    }]
	  }, {
	    "start": 381,
	    "end": 423,
	    "last_death": 408,
	    "deaths": 4,
	    "players": [{
	      "deaths_pos": {
	        "166": {
	          "80": 1
	        }
	      },
	      "ability_uses": {},
	      "item_uses": {
	        "quelling_blade": 1,
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": -37,
	      "xp_delta": 135,
	      "xp_start": 1555,
	      "xp_end": 1690
	    }, {
	      "deaths_pos": {
	        "82": {
	          "168": 1
	        }
	      },
	      "ability_uses": {
	        "bristleback_quill_spray": 4
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 599,
	      "healing": 0,
	      "gold_delta": 101,
	      "xp_delta": 345,
	      "xp_start": 2198,
	      "xp_end": 2543
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "tusk_ice_shards": 1,
	        "tusk_snowball": 1,
	        "tusk_launch_snowball": 1,
	        "tusk_walrus_punch": 1
	      },
	      "item_uses": {
	        "bottle": 4,
	        "tango": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 395,
	      "healing": 23,
	      "gold_delta": 494,
	      "xp_delta": 527,
	      "xp_start": 2099,
	      "xp_end": 2626
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "mirana_arrow": 1
	      },
	      "item_uses": {},
	      "killed": {
	        "npc_dota_hero_weaver": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 144,
	      "healing": 0,
	      "gold_delta": 338,
	      "xp_delta": 313,
	      "xp_start": 747,
	      "xp_end": 1060
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ogre_magi_bloodlust": 1
	      },
	      "item_uses": {
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 135,
	      "xp_start": 701,
	      "xp_end": 836
	    }, {
	      "deaths_pos": {
	        "92": {
	          "170": 1
	        }
	      },
	      "ability_uses": {
	        "weaver_shukuchi": 2
	      },
	      "item_uses": {
	        "magic_stick": 1,
	        "tpscroll": 1,
	        "ring_of_aquila": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 72,
	      "healing": 150,
	      "gold_delta": 54,
	      "xp_delta": 225,
	      "xp_start": 1657,
	      "xp_end": 1882
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "witch_doctor_paralyzing_cask": 2,
	        "witch_doctor_maledict": 1
	      },
	      "item_uses": {
	        "arcane_boots": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 232,
	      "healing": 0,
	      "gold_delta": 75,
	      "xp_delta": 224,
	      "xp_start": 1602,
	      "xp_end": 1826
	    }, {
	      "deaths_pos": {
	        "102": {
	          "114": 1
	        }
	      },
	      "ability_uses": {
	        "ember_spirit_fire_remnant": 1,
	        "ember_spirit_activate_fire_remnant": 1,
	        "ember_spirit_searing_chains": 1,
	        "ember_spirit_flame_guard": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 198,
	      "healing": 0,
	      "gold_delta": -105,
	      "xp_delta": 134,
	      "xp_start": 2795,
	      "xp_end": 2929
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 135,
	      "xp_delta": 298,
	      "xp_start": 1227,
	      "xp_end": 1525
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "monkey_king_boundless_strike": 1
	      },
	      "item_uses": {
	        "tango": 1,
	        "phase_boots": 3
	      },
	      "killed": {
	        "npc_dota_hero_spectre": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 485,
	      "healing": 146,
	      "gold_delta": 332,
	      "xp_delta": 298,
	      "xp_start": 1749,
	      "xp_end": 2047
	    }]
	  }, {
	    "start": 511,
	    "end": 562,
	    "last_death": 547,
	    "deaths": 4,
	    "players": [{
	      "deaths_pos": {
	        "150": {
	          "100": 1
	        }
	      },
	      "ability_uses": {
	        "spectre_spectral_dagger": 1
	      },
	      "item_uses": {
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 555,
	      "healing": 0,
	      "gold_delta": -97,
	      "xp_delta": 129,
	      "xp_start": 1982,
	      "xp_end": 2111
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "bristleback_quill_spray": 7
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 388,
	      "healing": 0,
	      "gold_delta": 213,
	      "xp_delta": 405,
	      "xp_start": 3261,
	      "xp_end": 3666
	    }, {
	      "deaths_pos": {
	        "158": {
	          "102": 1
	        }
	      },
	      "ability_uses": {
	        "tusk_snowball": 2,
	        "tusk_launch_snowball": 2,
	        "tusk_ice_shards": 1
	      },
	      "item_uses": {
	        "bottle": 3
	      },
	      "killed": {
	        "npc_dota_hero_witch_doctor": 1,
	        "npc_dota_hero_omniknight": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 740,
	      "healing": 115,
	      "gold_delta": 331,
	      "xp_delta": 413,
	      "xp_start": 3553,
	      "xp_end": 3966
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "mirana_leap": 1,
	        "mirana_arrow": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 355,
	      "healing": 0,
	      "gold_delta": 74,
	      "xp_delta": 129,
	      "xp_start": 1396,
	      "xp_end": 1525
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ogre_magi_fireblast": 1,
	        "ogre_magi_ignite": 1
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "magic_stick": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 191,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 0,
	      "xp_start": 1148,
	      "xp_end": 1148
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "weaver_shukuchi": 2
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 153,
	      "healing": 0,
	      "gold_delta": 38,
	      "xp_delta": 201,
	      "xp_start": 2466,
	      "xp_end": 2667
	    }, {
	      "deaths_pos": {
	        "150": {
	          "100": 1
	        }
	      },
	      "ability_uses": {
	        "witch_doctor_paralyzing_cask": 2
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "arcane_boots": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 771,
	      "healing": 0,
	      "gold_delta": -142,
	      "xp_delta": 22,
	      "xp_start": 2188,
	      "xp_end": 2210
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ember_spirit_fire_remnant": 2,
	        "ember_spirit_activate_fire_remnant": 2,
	        "ember_spirit_flame_guard": 1,
	        "ember_spirit_searing_chains": 1
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "bottle": 5
	      },
	      "killed": {
	        "npc_dota_hero_spectre": 1,
	        "npc_dota_hero_tusk": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 499,
	      "healing": 3,
	      "gold_delta": 813,
	      "xp_delta": 776,
	      "xp_start": 3242,
	      "xp_end": 4018
	    }, {
	      "deaths_pos": {
	        "156": {
	          "110": 1
	        }
	      },
	      "ability_uses": {
	        "omniknight_repel": 1,
	        "omniknight_purification": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 355,
	      "healing": 230,
	      "gold_delta": 1,
	      "xp_delta": 190,
	      "xp_start": 1702,
	      "xp_end": 1892
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {
	        "tpscroll": 1,
	        "phase_boots": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 0,
	      "xp_start": 2456,
	      "xp_end": 2456
	    }]
	  }, {
	    "start": 557,
	    "end": 588,
	    "last_death": 573,
	    "deaths": 3,
	    "players": [{
	      "deaths_pos": {},
	      "ability_uses": {
	        "spectre_spectral_dagger": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 114,
	      "healing": 0,
	      "gold_delta": 77,
	      "xp_delta": 44,
	      "xp_start": 2111,
	      "xp_end": 2133
	    }, {
	      "deaths_pos": {
	        "82": {
	          "166": 1
	        }
	      },
	      "ability_uses": {
	        "bristleback_quill_spray": 4,
	        "bristleback_viscous_nasal_goo": 2
	      },
	      "item_uses": {
	        "magic_wand": 1
	      },
	      "killed": {
	        "npc_dota_hero_witch_doctor": 1,
	        "npc_dota_hero_weaver": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 1612,
	      "healing": 255,
	      "gold_delta": 599,
	      "xp_delta": 785,
	      "xp_start": 3666,
	      "xp_end": 4451
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {
	        "tpscroll": 1,
	        "phase_boots": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 46,
	      "xp_delta": 90,
	      "xp_start": 3966,
	      "xp_end": 4056
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 0,
	      "xp_start": 1525,
	      "xp_end": 1525
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ogre_magi_bloodlust": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 44,
	      "xp_start": 1148,
	      "xp_end": 1170
	    }, {
	      "deaths_pos": {
	        "82": {
	          "168": 1
	        }
	      },
	      "ability_uses": {
	        "weaver_shukuchi": 1,
	        "weaver_the_swarm": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 547,
	      "healing": 0,
	      "gold_delta": -83,
	      "xp_delta": 67,
	      "xp_start": 2645,
	      "xp_end": 2712
	    }, {
	      "deaths_pos": {
	        "86": {
	          "170": 1
	        }
	      },
	      "ability_uses": {
	        "witch_doctor_paralyzing_cask": 1,
	        "witch_doctor_maledict": 1
	      },
	      "item_uses": {
	        "arcane_boots": 1
	      },
	      "killed": {
	        "npc_dota_hero_bristleback": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 333,
	      "healing": 0,
	      "gold_delta": 246,
	      "xp_delta": 67,
	      "xp_start": 2188,
	      "xp_end": 2255
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {
	        "bottle": 2
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 1,
	      "gold_delta": 118,
	      "xp_delta": 276,
	      "xp_start": 3922,
	      "xp_end": 4198
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 0,
	      "xp_start": 1892,
	      "xp_end": 1892
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "monkey_king_boundless_strike": 1
	      },
	      "item_uses": {
	        "phase_boots": 3
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 275,
	      "healing": 71,
	      "gold_delta": 123,
	      "xp_delta": 405,
	      "xp_start": 2456,
	      "xp_end": 2861
	    }]
	  }, {
	    "start": 1035,
	    "end": 1097,
	    "last_death": 1082,
	    "deaths": 8,
	    "players": [{
	      "deaths_pos": {
	        "144": {
	          "88": 1
	        }
	      },
	      "ability_uses": {
	        "spectre_haunt": 1,
	        "spectre_reality": 1,
	        "spectre_spectral_dagger": 1
	      },
	      "item_uses": {
	        "ring_of_aquila": 5,
	        "urn_of_shadows": 1,
	        "phase_boots": 1
	      },
	      "killed": {
	        "npc_dota_hero_witch_doctor": 1,
	        "npc_dota_hero_omniknight": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 1990,
	      "healing": 0,
	      "gold_delta": 362,
	      "xp_delta": 724,
	      "xp_start": 4566,
	      "xp_end": 5290
	    }, {
	      "deaths_pos": {
	        "134": {
	          "106": 1
	        }
	      },
	      "ability_uses": {
	        "bristleback_viscous_nasal_goo": 1,
	        "bristleback_quill_spray": 5
	      },
	      "item_uses": {
	        "buckler": 1,
	        "phase_boots": 1,
	        "magic_wand": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 1563,
	      "healing": 135,
	      "gold_delta": -81,
	      "xp_delta": 135,
	      "xp_start": 6622,
	      "xp_end": 6757
	    }, {
	      "deaths_pos": {
	        "144": {
	          "108": 1
	        }
	      },
	      "ability_uses": {
	        "tusk_ice_shards": 2,
	        "tusk_snowball": 1,
	        "tusk_launch_snowball": 1,
	        "tusk_walrus_punch": 1
	      },
	      "item_uses": {
	        "phase_boots": 4,
	        "bottle": 3
	      },
	      "killed": {
	        "npc_dota_hero_monkey_king": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 706,
	      "healing": 27,
	      "gold_delta": 764,
	      "xp_delta": 1318,
	      "xp_start": 6376,
	      "xp_end": 7694
	    }, {
	      "deaths_pos": {
	        "120": {
	          "106": 1
	        }
	      },
	      "ability_uses": {
	        "mirana_arrow": 2,
	        "mirana_starfall": 1,
	        "mirana_leap": 1
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "magic_wand": 1,
	        "arcane_boots": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 271,
	      "healing": 60,
	      "gold_delta": -62,
	      "xp_delta": 231,
	      "xp_start": 2538,
	      "xp_end": 2769
	    }, {
	      "deaths_pos": {
	        "132": {
	          "108": 1
	        }
	      },
	      "ability_uses": {
	        "ogre_magi_bloodlust": 1,
	        "ogre_magi_fireblast": 2,
	        "ogre_magi_ignite": 1
	      },
	      "item_uses": {
	        "magic_stick": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 492,
	      "healing": 0,
	      "gold_delta": 203,
	      "xp_delta": 724,
	      "xp_start": 2950,
	      "xp_end": 3674
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "weaver_shukuchi": 6,
	        "weaver_the_swarm": 1
	      },
	      "item_uses": {},
	      "killed": {
	        "npc_dota_hero_spectre": 1,
	        "npc_dota_hero_tusk": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 1955,
	      "healing": 0,
	      "gold_delta": 1004,
	      "xp_delta": 1610,
	      "xp_start": 6966,
	      "xp_end": 8576
	    }, {
	      "deaths_pos": {
	        "144": {
	          "112": 1
	        }
	      },
	      "ability_uses": {},
	      "item_uses": {
	        "magic_wand": 1,
	        "arcane_boots": 1,
	        "tpscroll": 1,
	        "ward_dispenser": 2
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 670,
	      "healing": 150,
	      "gold_delta": 23,
	      "xp_delta": 19,
	      "xp_start": 3596,
	      "xp_end": 3615
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ember_spirit_fire_remnant": 4,
	        "ember_spirit_activate_fire_remnant": 3,
	        "ember_spirit_sleight_of_fist": 2,
	        "ember_spirit_searing_chains": 3,
	        "ember_spirit_flame_guard": 1
	      },
	      "item_uses": {
	        "veil_of_discord": 1,
	        "magic_wand": 2,
	        "bottle": 5
	      },
	      "killed": {
	        "npc_dota_hero_bristleback": 1,
	        "npc_dota_hero_mirana": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 1789,
	      "healing": 372,
	      "gold_delta": 980,
	      "xp_delta": 1739,
	      "xp_start": 7867,
	      "xp_end": 9606
	    }, {
	      "deaths_pos": {
	        "138": {
	          "108": 1
	        }
	      },
	      "ability_uses": {
	        "omniknight_repel": 1,
	        "omniknight_purification": 2,
	        "omniknight_guardian_angel": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 532,
	      "gold_delta": 167,
	      "xp_delta": 674,
	      "xp_start": 4149,
	      "xp_end": 4823
	    }, {
	      "deaths_pos": {
	        "134": {
	          "108": 1
	        }
	      },
	      "ability_uses": {
	        "monkey_king_boundless_strike": 1,
	        "monkey_king_wukongs_command": 1
	      },
	      "item_uses": {
	        "phase_boots": 3
	      },
	      "killed": {
	        "npc_dota_hero_ogre_magi": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 2913,
	      "healing": 33,
	      "gold_delta": 285,
	      "xp_delta": 512,
	      "xp_start": 6009,
	      "xp_end": 6521
	    }]
	  }, {
	    "start": 1318,
	    "end": 1356,
	    "last_death": 1341,
	    "deaths": 3,
	    "players": [{
	      "deaths_pos": {},
	      "ability_uses": {
	        "spectre_spectral_dagger": 1
	      },
	      "item_uses": {
	        "phase_boots": 3
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 28,
	      "healing": 250,
	      "gold_delta": 0,
	      "xp_delta": 90,
	      "xp_start": 6686,
	      "xp_end": 6686
	    }, {
	      "deaths_pos": {
	        "178": {
	          "114": 1
	        }
	      },
	      "ability_uses": {
	        "bristleback_quill_spray": 4,
	        "bristleback_viscous_nasal_goo": 1
	      },
	      "item_uses": {
	        "phase_boots": 1,
	        "crimson_guard": 1,
	        "magic_wand": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 3063,
	      "healing": 180,
	      "gold_delta": -69,
	      "xp_delta": 111,
	      "xp_start": 8370,
	      "xp_end": 8481
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "tusk_ice_shards": 1,
	        "tusk_snowball": 1,
	        "tusk_launch_snowball": 1,
	        "tusk_walrus_punch": 1
	      },
	      "item_uses": {
	        "phase_boots": 3,
	        "bottle": 2
	      },
	      "killed": {
	        "npc_dota_hero_witch_doctor": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 1589,
	      "healing": 90,
	      "gold_delta": 764,
	      "xp_delta": 1496,
	      "xp_start": 10298,
	      "xp_end": 11794
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "mirana_arrow": 2,
	        "mirana_starfall": 1,
	        "mirana_leap": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 531,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 66,
	      "xp_start": 4153,
	      "xp_end": 4219
	    }, {
	      "deaths_pos": {
	        "176": {
	          "122": 1
	        }
	      },
	      "ability_uses": {
	        "ogre_magi_bloodlust": 1,
	        "ogre_magi_fireblast": 1
	      },
	      "item_uses": {
	        "magic_stick": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 84,
	      "healing": 60,
	      "gold_delta": -154,
	      "xp_delta": 0,
	      "xp_start": 4955,
	      "xp_end": 4955
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "weaver_shukuchi": 3,
	        "weaver_the_swarm": 1,
	        "weaver_time_lapse": 1
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "magic_stick": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 313,
	      "healing": 150,
	      "gold_delta": 128,
	      "xp_delta": 755,
	      "xp_start": 9643,
	      "xp_end": 10398
	    }, {
	      "deaths_pos": {
	        "80": {
	          "130": 1
	        }
	      },
	      "ability_uses": {
	        "witch_doctor_voodoo_restoration": 1
	      },
	      "item_uses": {
	        "arcane_boots": 1,
	        "tpscroll": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 39,
	      "gold_delta": -103,
	      "xp_delta": 0,
	      "xp_start": 4447,
	      "xp_end": 4447
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ember_spirit_flame_guard": 1,
	        "ember_spirit_searing_chains": 2,
	        "ember_spirit_sleight_of_fist": 2,
	        "ember_spirit_fire_remnant": 3,
	        "ember_spirit_activate_fire_remnant": 1
	      },
	      "item_uses": {
	        "travel_boots": 1,
	        "veil_of_discord": 1,
	        "bottle": 4,
	        "magic_wand": 1,
	        "blink": 1
	      },
	      "killed": {
	        "npc_dota_hero_ogre_magi": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 1590,
	      "healing": 351,
	      "gold_delta": 613,
	      "xp_delta": 827,
	      "xp_start": 12007,
	      "xp_end": 12834
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "omniknight_purification": 2
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "arcane_boots": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 6,
	      "healing": 410,
	      "gold_delta": 108,
	      "xp_delta": 650,
	      "xp_start": 5834,
	      "xp_end": 6484
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "monkey_king_wukongs_command": 1,
	        "monkey_king_boundless_strike": 1
	      },
	      "item_uses": {
	        "invis_sword": 1,
	        "phase_boots": 1
	      },
	      "killed": {
	        "npc_dota_hero_bristleback": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 2139,
	      "healing": 164,
	      "gold_delta": 307,
	      "xp_delta": 710,
	      "xp_start": 8417,
	      "xp_end": 9127
	    }]
	  }, {
	    "start": 1575,
	    "end": 1629,
	    "last_death": 1614,
	    "deaths": 5,
	    "players": [{
	      "deaths_pos": {
	        "110": {
	          "146": 1
	        }
	      },
	      "ability_uses": {
	        "spectre_haunt": 1,
	        "spectre_spectral_dagger": 2
	      },
	      "item_uses": {
	        "ring_of_aquila": 4,
	        "phase_boots": 3,
	        "ancient_janggo": 1,
	        "urn_of_shadows": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 2158,
	      "healing": 0,
	      "gold_delta": -95,
	      "xp_delta": 675,
	      "xp_start": 8052,
	      "xp_end": 8727
	    }, {
	      "deaths_pos": {
	        "106": {
	          "152": 1
	        }
	      },
	      "ability_uses": {
	        "bristleback_quill_spray": 10,
	        "bristleback_viscous_nasal_goo": 8
	      },
	      "item_uses": {
	        "magic_wand": 2,
	        "crimson_guard": 1,
	        "blade_mail": 2,
	        "phase_boots": 3
	      },
	      "killed": {
	        "npc_dota_hero_omniknight": 1,
	        "npc_dota_hero_weaver": 1
	      },
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 3335,
	      "healing": 195,
	      "gold_delta": 756,
	      "xp_delta": 2002,
	      "xp_start": 11367,
	      "xp_end": 13369
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "tusk_ice_shards": 2,
	        "tusk_walrus_punch": 1,
	        "tusk_snowball": 1,
	        "tusk_launch_snowball": 1
	      },
	      "item_uses": {
	        "phase_boots": 5,
	        "bottle": 5,
	        "dust": 1,
	        "invis_sword": 2,
	        "tpscroll": 1
	      },
	      "killed": {
	        "npc_dota_hero_monkey_king": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 1512,
	      "healing": 288,
	      "gold_delta": 602,
	      "xp_delta": 1714,
	      "xp_start": 14405,
	      "xp_end": 16119
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "mirana_arrow": 3,
	        "mirana_starfall": 1,
	        "mirana_leap": 1
	      },
	      "item_uses": {
	        "arcane_boots": 1,
	        "magic_wand": 2,
	        "dust": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 362,
	      "healing": 330,
	      "gold_delta": 418,
	      "xp_delta": 1183,
	      "xp_start": 5435,
	      "xp_end": 6618
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ogre_magi_ignite": 3,
	        "ogre_magi_bloodlust": 2,
	        "ogre_magi_fireblast": 2
	      },
	      "item_uses": {
	        "arcane_boots": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 388,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 72,
	      "xp_start": 5158,
	      "xp_end": 5230
	    }, {
	      "deaths_pos": {
	        "104": {
	          "148": 1
	        }
	      },
	      "ability_uses": {
	        "weaver_the_swarm": 1,
	        "weaver_shukuchi": 3,
	        "weaver_time_lapse": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 533,
	      "healing": 0,
	      "gold_delta": -312,
	      "xp_delta": 0,
	      "xp_start": 13069,
	      "xp_end": 13069
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "witch_doctor_voodoo_restoration": 2,
	        "witch_doctor_paralyzing_cask": 1,
	        "witch_doctor_maledict": 1,
	        "witch_doctor_death_ward": 1
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "arcane_boots": 1,
	        "magic_wand": 1
	      },
	      "killed": {
	        "npc_dota_hero_spectre": 1,
	        "npc_dota_hero_bristleback": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 471,
	      "healing": 736,
	      "gold_delta": 814,
	      "xp_delta": 1620,
	      "xp_start": 5233,
	      "xp_end": 6853
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ember_spirit_sleight_of_fist": 3,
	        "ember_spirit_searing_chains": 3,
	        "ember_spirit_flame_guard": 1,
	        "ember_spirit_fire_remnant": 2,
	        "ember_spirit_activate_fire_remnant": 2
	      },
	      "item_uses": {
	        "bottle": 3,
	        "magic_wand": 2,
	        "blink": 2
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 2856,
	      "healing": 248,
	      "gold_delta": 405,
	      "xp_delta": 2030,
	      "xp_start": 14840,
	      "xp_end": 16685
	    }, {
	      "deaths_pos": {
	        "94": {
	          "126": 1
	        }
	      },
	      "ability_uses": {
	        "omniknight_purification": 2,
	        "omniknight_guardian_angel": 1,
	        "omniknight_repel": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 880,
	      "healing": 600,
	      "gold_delta": -210,
	      "xp_delta": 0,
	      "xp_start": 7705,
	      "xp_end": 7705
	    }, {
	      "deaths_pos": {
	        "94": {
	          "126": 1
	        }
	      },
	      "ability_uses": {},
	      "item_uses": {
	        "invis_sword": 1,
	        "phase_boots": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 342,
	      "healing": 105,
	      "gold_delta": -292,
	      "xp_delta": 0,
	      "xp_start": 10679,
	      "xp_end": 10679
	    }]
	  }, {
	    "start": 2567,
	    "end": 2610,
	    "last_death": 2595,
	    "deaths": 4,
	    "players": [{
	      "deaths_pos": {
	        "88": {
	          "88": 1
	        }
	      },
	      "ability_uses": {
	        "spectre_spectral_dagger": 1
	      },
	      "item_uses": {
	        "phase_boots": 2
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 1,
	      "damage": 897,
	      "healing": 0,
	      "gold_delta": -1359,
	      "xp_delta": 36,
	      "xp_start": 16171,
	      "xp_end": 16207
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {},
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 0,
	      "healing": 0,
	      "gold_delta": 0,
	      "xp_delta": 0,
	      "xp_start": 19238,
	      "xp_end": 19238
	    }, {
	      "deaths_pos": {
	        "80": {
	          "96": 1
	        }
	      },
	      "ability_uses": {
	        "tusk_snowball": 1,
	        "tusk_launch_snowball": 1,
	        "tusk_walrus_punch": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 1197,
	      "healing": 0,
	      "gold_delta": -417,
	      "xp_delta": 12,
	      "xp_start": 21971,
	      "xp_end": 21983
	    }, {
	      "deaths_pos": {
	        "76": {
	          "80": 1
	        }
	      },
	      "ability_uses": {
	        "mirana_leap": 1,
	        "mirana_arrow": 1
	      },
	      "item_uses": {
	        "tpscroll": 1,
	        "cyclone": 1
	      },
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 550,
	      "healing": 0,
	      "gold_delta": -306,
	      "xp_delta": 102,
	      "xp_start": 13101,
	      "xp_end": 13203
	    }, {
	      "deaths_pos": {
	        "80": {
	          "90": 1
	        }
	      },
	      "ability_uses": {
	        "ogre_magi_bloodlust": 1,
	        "ogre_magi_fireblast": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 1,
	      "buybacks": 0,
	      "damage": 85,
	      "healing": 0,
	      "gold_delta": -166,
	      "xp_delta": 36,
	      "xp_start": 8117,
	      "xp_end": 8153
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "weaver_shukuchi": 4,
	        "weaver_the_swarm": 1
	      },
	      "item_uses": {},
	      "killed": {
	        "npc_dota_hero_spectre": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 2228,
	      "healing": 0,
	      "gold_delta": 1215,
	      "xp_delta": 2087,
	      "xp_start": 25651,
	      "xp_end": 27736
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "witch_doctor_voodoo_restoration": 4
	      },
	      "item_uses": {
	        "arcane_boots": 1,
	        "magic_wand": 2,
	        "force_staff": 1,
	        "ward_sentry": 1
	      },
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 97,
	      "healing": 794,
	      "gold_delta": 586,
	      "xp_delta": 1002,
	      "xp_start": 14861,
	      "xp_end": 15857
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "ember_spirit_sleight_of_fist": 3,
	        "ember_spirit_searing_chains": 3
	      },
	      "item_uses": {
	        "blink": 1,
	        "dagon_2": 1
	      },
	      "killed": {
	        "npc_dota_hero_mirana": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 1559,
	      "healing": 321,
	      "gold_delta": 1085,
	      "xp_delta": 0,
	      "xp_start": 27505,
	      "xp_end": 27505
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "omniknight_purification": 2,
	        "omniknight_repel": 1
	      },
	      "item_uses": {},
	      "killed": {},
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 328,
	      "healing": 600,
	      "gold_delta": 568,
	      "xp_delta": 1003,
	      "xp_start": 15801,
	      "xp_end": 16800
	    }, {
	      "deaths_pos": {},
	      "ability_uses": {
	        "monkey_king_wukongs_command": 1,
	        "monkey_king_boundless_strike": 1
	      },
	      "item_uses": {},
	      "killed": {
	        "npc_dota_hero_ogre_magi": 1,
	        "npc_dota_hero_tusk": 1
	      },
	      "deaths": 0,
	      "buybacks": 0,
	      "damage": 3710,
	      "healing": 0,
	      "gold_delta": 1176,
	      "xp_delta": 946,
	      "xp_start": 21776,
	      "xp_end": 22716
	    }]
	  }],
	  "tower_status_dire": 1972,
	  "tower_status_radiant": 0,
	  "version": 17,
	  "replay_salt": 291549381,
	  "series_id": 0,
	  "series_type": 0,
	  "skill": 3,
	  "players": [{
	    "match_id": 2890465108,
	    "player_slot": 0,
	    "ability_upgrades_arr": [5334, 5335, 5334, 5335, 5334, 5337, 5334, 5335, 5335, 5960, 5336, 5337, 5336, 5336, 5336, 5922, 5337],
	    "ability_uses": {
	      "spectre_spectral_dagger": 50,
	      "spectre_haunt": 9,
	      "spectre_reality": 6
	    },
	    "account_id": null,
	    "actions": {
	      "1": 3405,
	      "2": 54,
	      "3": 415,
	      "4": 534,
	      "5": 47,
	      "6": 42,
	      "7": 7,
	      "8": 144,
	      "9": 1,
	      "10": 13,
	      "11": 15,
	      "15": 22,
	      "16": 47,
	      "17": 6,
	      "19": 37,
	      "23": 1,
	      "27": 1,
	      "31": 1
	    },
	    "additional_units": null,
	    "assists": 13,
	    "backpack_0": 0,
	    "backpack_1": 46,
	    "backpack_2": 0,
	    "buyback_log": [{
	      "time": 2605,
	      "slot": 0,
	      "type": "buyback_log",
	      "player_slot": 0
	    }],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_creep_badguys_melee": 43031,
	      "npc_dota_creep_goodguys_ranged": 432,
	      "npc_dota_hero_monkey_king": 3999,
	      "npc_dota_creep_badguys_ranged": 12543,
	      "npc_dota_creep_goodguys_melee": 1270,
	      "npc_dota_hero_omniknight": 4263,
	      "npc_dota_badguys_siege": 2969,
	      "npc_dota_hero_witch_doctor": 3629,
	      "npc_dota_hero_ember_spirit": 2883,
	      "npc_dota_hero_weaver": 3726,
	      "npc_dota_goodguys_siege": 101,
	      "npc_dota_badguys_tower1_bot": 351,
	      "npc_dota_badguys_tower1_mid": 29,
	      "npc_dota_badguys_tower2_bot": 257,
	      "npc_dota_badguys_tower1_top": 191,
	      "npc_dota_neutral_mud_golem": 5380,
	      "npc_dota_neutral_mud_golem_split": 3746,
	      "npc_dota_neutral_enraged_wildkin": 121,
	      "npc_dota_neutral_wildkin": 18,
	      "npc_dota_neutral_big_thunder_lizard": 1370,
	      "npc_dota_neutral_small_thunder_lizard": 1011,
	      "npc_dota_neutral_dark_troll_warlord": 3474,
	      "npc_dota_neutral_dark_troll": 3520,
	      "npc_dota_dark_troll_warlord_skeleton_warrior": 2177,
	      "npc_dota_neutral_ogre_magi": 801,
	      "npc_dota_neutral_ogre_mauler": 2653,
	      "npc_dota_neutral_giant_wolf": 3227,
	      "npc_dota_neutral_alpha_wolf": 1896,
	      "npc_dota_neutral_black_drake": 416,
	      "npc_dota_neutral_black_dragon": 62,
	      "npc_dota_neutral_granite_golem": 42,
	      "npc_dota_neutral_rock_golem": 112,
	      "npc_dota_neutral_harpy_scout": 818,
	      "npc_dota_neutral_harpy_storm": 575,
	      "npc_dota_neutral_centaur_outrunner": 384,
	      "npc_dota_neutral_centaur_khan": 1136,
	      "npc_dota_weaver_swarm": 2,
	      "npc_dota_creep_badguys_melee_upgraded": 7124,
	      "npc_dota_creep_badguys_ranged_upgraded": 1197,
	      "npc_dota_badguys_siege_upgraded": 542,
	      "npc_dota_creep_badguys_melee_upgraded_mega": 1808,
	      "npc_dota_creep_badguys_ranged_upgraded_mega": 49
	    },
	    "damage_inflictor": {
	      "null": 4003,
	      "spectre_spectral_dagger": 4173,
	      "spectre_desolate": 4453,
	      "urn_of_shadows": 247,
	      "spectre_dispersion": 5624
	    },
	    "damage_inflictor_received": {
	      "null": 13686,
	      "orb_of_venom": 197,
	      "omniknight_purification": 881,
	      "witch_doctor_paralyzing_cask": 432,
	      "ember_spirit_activate_fire_remnant": 1591,
	      "ember_spirit_flame_guard": 514,
	      "witch_doctor_maledict": 713,
	      "ember_spirit_searing_chains": 2528,
	      "weaver_shukuchi": 720,
	      "weaver_the_swarm": 239,
	      "maelstrom": 184,
	      "mjollnir": 428
	    },
	    "damage_taken": {
	      "npc_dota_hero_monkey_king": 8556,
	      "npc_dota_creep_badguys_melee": 1028,
	      "npc_dota_creep_badguys_ranged": 494,
	      "npc_dota_hero_omniknight": 1291,
	      "npc_dota_hero_witch_doctor": 1787,
	      "npc_dota_hero_ember_spirit": 6460,
	      "npc_dota_badguys_siege": 35,
	      "npc_dota_hero_weaver": 4244,
	      "npc_dota_badguys_tower1_bot": 288,
	      "npc_dota_neutral_mud_golem": 235,
	      "npc_dota_neutral_mud_golem_split": 32,
	      "npc_dota_neutral_wildkin": 8,
	      "npc_dota_neutral_enraged_wildkin": 24,
	      "npc_dota_neutral_small_thunder_lizard": 69,
	      "npc_dota_neutral_dark_troll": 34,
	      "npc_dota_neutral_dark_troll_warlord": 261,
	      "npc_dota_dark_troll_warlord_skeleton_warrior": 74,
	      "npc_dota_neutral_ogre_mauler": 71,
	      "npc_dota_neutral_giant_wolf": 63,
	      "npc_dota_neutral_alpha_wolf": 85,
	      "npc_dota_neutral_ogre_magi": 31,
	      "npc_dota_neutral_big_thunder_lizard": 120,
	      "npc_dota_neutral_harpy_scout": 11,
	      "npc_dota_neutral_harpy_storm": 12,
	      "npc_dota_neutral_centaur_khan": 74,
	      "npc_dota_neutral_centaur_outrunner": 5,
	      "npc_dota_creep_badguys_melee_upgraded": 238,
	      "npc_dota_creep_badguys_ranged_upgraded": 66,
	      "npc_dota_badguys_siege_upgraded": 15
	    },
	    "deaths": 12,
	    "denies": 10,
	    "dn_t": [0, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10],
	    "gold": 125,
	    "gold_per_min": 353,
	    "gold_reasons": {
	      "0": 1130,
	      "1": -3059,
	      "2": -1083,
	      "6": 840,
	      "11": 768,
	      "12": 1318,
	      "13": 8511
	    },
	    "gold_spent": 12870,
	    "gold_t": [0, 277, 731, 1031, 1206, 1585, 1802, 2016, 2239, 2492, 2708, 3062, 3162, 3353, 3655, 3970, 4418, 4861, 5531, 5944, 6164, 6395, 7005, 7105, 7302, 8279, 8489, 8752, 8991, 9623, 9929, 10584, 11228, 11328, 11868, 12311, 12812, 12912, 13593, 14272, 14489, 14789, 14922, 15315, 15479, 15479, 15479],
	    "hero_damage": 18500,
	    "hero_healing": 0,
	    "hero_hits": {
	      "null": 113,
	      "spectre_spectral_dagger": 30,
	      "spectre_desolate": 73,
	      "urn_of_shadows": 13,
	      "spectre_dispersion": 320
	    },
	    "hero_id": 67,
	    "item_0": 50,
	    "item_1": 185,
	    "item_2": 174,
	    "item_3": 92,
	    "item_4": 170,
	    "item_5": 212,
	    "item_uses": {
	      "quelling_blade": 3,
	      "tango_single": 4,
	      "branches": 1,
	      "ring_of_aquila": 43,
	      "tpscroll": 10,
	      "phase_boots": 90,
	      "urn_of_shadows": 8,
	      "ancient_janggo": 2
	    },
	    "kill_streaks": {},
	    "killed": {
	      "npc_dota_creep_badguys_melee": 114,
	      "npc_dota_creep_goodguys_ranged": 3,
	      "npc_dota_creep_badguys_ranged": 32,
	      "npc_dota_creep_goodguys_melee": 6,
	      "npc_dota_goodguys_siege": 1,
	      "npc_dota_hero_witch_doctor": 1,
	      "npc_dota_hero_omniknight": 1,
	      "npc_dota_badguys_tower1_top": 1,
	      "npc_dota_neutral_mud_golem": 6,
	      "npc_dota_neutral_mud_golem_split": 12,
	      "npc_dota_neutral_dark_troll": 6,
	      "npc_dota_dark_troll_warlord_skeleton_warrior": 6,
	      "npc_dota_neutral_dark_troll_warlord": 3,
	      "npc_dota_neutral_ogre_magi": 2,
	      "npc_dota_neutral_ogre_mauler": 4,
	      "npc_dota_badguys_siege": 3,
	      "npc_dota_neutral_giant_wolf": 6,
	      "npc_dota_neutral_alpha_wolf": 3,
	      "npc_dota_neutral_big_thunder_lizard": 1,
	      "npc_dota_neutral_small_thunder_lizard": 1,
	      "npc_dota_neutral_harpy_scout": 2,
	      "npc_dota_neutral_harpy_storm": 1,
	      "npc_dota_neutral_centaur_outrunner": 1,
	      "npc_dota_neutral_centaur_khan": 1,
	      "npc_dota_weaver_swarm": 2,
	      "npc_dota_creep_badguys_melee_upgraded": 11,
	      "npc_dota_badguys_siege_upgraded": 1,
	      "npc_dota_creep_badguys_ranged_upgraded": 1
	    },
	    "killed_by": {
	      "npc_dota_hero_monkey_king": 5,
	      "npc_dota_hero_ember_spirit": 3,
	      "npc_dota_hero_weaver": 3,
	      "npc_dota_hero_witch_doctor": 1
	    },
	    "kills": 2,
	    "kills_log": [{
	      "time": 1050,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 1061,
	      "key": "npc_dota_hero_omniknight"
	    }],
	    "lane_pos": {
	      "72": {
	        "72": 1,
	        "78": 5
	      },
	      "74": {
	        "74": 12
	      },
	      "76": {
	        "74": 47,
	        "76": 10,
	        "78": 10
	      },
	      "78": {
	        "78": 1
	      },
	      "80": {
	        "78": 1
	      },
	      "82": {
	        "78": 1
	      },
	      "84": {
	        "78": 1
	      },
	      "86": {
	        "78": 1
	      },
	      "88": {
	        "78": 1
	      },
	      "90": {
	        "78": 1
	      },
	      "92": {
	        "78": 1
	      },
	      "94": {
	        "78": 1
	      },
	      "98": {
	        "78": 1
	      },
	      "100": {
	        "78": 1
	      },
	      "102": {
	        "78": 1
	      },
	      "104": {
	        "78": 1
	      },
	      "106": {
	        "78": 1
	      },
	      "108": {
	        "78": 1
	      },
	      "110": {
	        "78": 1
	      },
	      "112": {
	        "78": 1
	      },
	      "116": {
	        "78": 1
	      },
	      "118": {
	        "78": 1
	      },
	      "120": {
	        "78": 1
	      },
	      "122": {
	        "78": 1
	      },
	      "124": {
	        "80": 1
	      },
	      "126": {
	        "80": 1
	      },
	      "128": {
	        "82": 1
	      },
	      "130": {
	        "84": 2,
	        "98": 2,
	        "106": 6
	      },
	      "132": {
	        "86": 1,
	        "96": 3,
	        "98": 1,
	        "100": 1,
	        "102": 1,
	        "104": 1,
	        "106": 3
	      },
	      "134": {
	        "88": 1,
	        "100": 1,
	        "102": 1
	      },
	      "136": {
	        "90": 1,
	        "92": 1,
	        "94": 1,
	        "98": 2
	      },
	      "138": {
	        "92": 2,
	        "96": 1,
	        "98": 1
	      },
	      "140": {
	        "94": 1,
	        "96": 1
	      },
	      "142": {
	        "92": 2,
	        "96": 1
	      },
	      "144": {
	        "92": 1,
	        "96": 1,
	        "98": 2,
	        "100": 1,
	        "102": 2,
	        "104": 2
	      },
	      "146": {
	        "90": 2
	      },
	      "148": {
	        "88": 2,
	        "104": 1
	      },
	      "150": {
	        "86": 1,
	        "88": 1,
	        "100": 1,
	        "102": 1
	      },
	      "152": {
	        "86": 1,
	        "100": 25,
	        "102": 1
	      },
	      "154": {
	        "86": 1
	      },
	      "156": {
	        "86": 2
	      },
	      "158": {
	        "82": 1,
	        "86": 1
	      },
	      "160": {
	        "78": 1,
	        "82": 4,
	        "84": 1,
	        "86": 1
	      },
	      "162": {
	        "78": 1,
	        "80": 7,
	        "86": 1,
	        "88": 1
	      },
	      "164": {
	        "80": 3,
	        "86": 1,
	        "88": 2
	      },
	      "166": {
	        "80": 17,
	        "82": 3,
	        "84": 1,
	        "86": 2,
	        "88": 1
	      },
	      "168": {
	        "80": 8,
	        "82": 2,
	        "84": 5,
	        "86": 4,
	        "88": 1
	      },
	      "170": {
	        "80": 5,
	        "82": 15,
	        "84": 11,
	        "86": 9,
	        "88": 1,
	        "98": 1,
	        "100": 1
	      },
	      "172": {
	        "80": 7,
	        "82": 8,
	        "84": 23,
	        "86": 9,
	        "88": 4,
	        "90": 7,
	        "92": 3,
	        "94": 1,
	        "96": 1,
	        "98": 1,
	        "100": 1,
	        "102": 2,
	        "104": 1
	      },
	      "174": {
	        "80": 1,
	        "82": 3,
	        "84": 9,
	        "86": 13,
	        "88": 14,
	        "90": 16,
	        "92": 16,
	        "94": 8,
	        "96": 7,
	        "98": 9,
	        "100": 10,
	        "102": 7,
	        "104": 7,
	        "106": 10,
	        "108": 1
	      },
	      "176": {
	        "82": 1,
	        "84": 4,
	        "88": 3,
	        "90": 5,
	        "92": 19,
	        "94": 18,
	        "96": 11,
	        "98": 17,
	        "100": 12,
	        "102": 11,
	        "104": 3,
	        "106": 2
	      },
	      "178": {
	        "84": 4,
	        "90": 2,
	        "92": 6,
	        "94": 4,
	        "96": 7,
	        "98": 15,
	        "100": 12,
	        "104": 1
	      },
	      "180": {
	        "84": 1,
	        "86": 1,
	        "90": 3,
	        "92": 3,
	        "96": 1,
	        "100": 2,
	        "104": 1
	      },
	      "182": {
	        "88": 1,
	        "94": 1,
	        "96": 8,
	        "98": 2
	      },
	      "184": {
	        "96": 1,
	        "98": 2
	      }
	    },
	    "last_hits": 220,
	    "leaver_status": 0,
	    "level": 19,
	    "lh_t": [0, 2, 11, 15, 17, 24, 27, 30, 33, 33, 36, 42, 42, 44, 49, 52, 60, 68, 68, 75, 76, 79, 83, 83, 83, 96, 102, 102, 107, 122, 128, 136, 148, 148, 158, 165, 173, 173, 185, 198, 204, 204, 205, 214, 220, 220, 220],
	    "life_state": {
	      "0": 2250,
	      "1": 24,
	      "2": 498
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 1609,
	      "max": true,
	      "inflictor": null,
	      "unit": "npc_dota_hero_spectre",
	      "key": "npc_dota_hero_witch_doctor",
	      "value": 220,
	      "slot": 0,
	      "player_slot": 0
	    },
	    "multi_kills": {
	      "2": 1
	    },
	    "obs": {},
	    "obs_left_log": [],
	    "obs_log": [],
	    "obs_placed": 0,
	    "party_id": 0,
	    "permanent_buffs": [],
	    "purchase": {
	      "quelling_blade": 1,
	      "circlet": 2,
	      "branches": 1,
	      "boots": 1,
	      "sobi_mask": 3,
	      "slippers": 4,
	      "recipe_wraith_band": 3,
	      "ring_of_protection": 1,
	      "wraith_band": 1,
	      "ring_of_basilius": 1,
	      "ring_of_aquila": 1,
	      "tpscroll": 11,
	      "gauntlets": 3,
	      "recipe_urn_of_shadows": 1,
	      "urn_of_shadows": 1,
	      "wind_lace": 1,
	      "blades_of_attack": 2,
	      "phase_boots": 1,
	      "bracer": 1,
	      "recipe_bracer": 1,
	      "recipe_ancient_janggo": 1,
	      "ancient_janggo": 1,
	      "poor_mans_shield": 1,
	      "blade_of_alacrity": 3,
	      "boots_of_elves": 1,
	      "recipe_yasha": 1,
	      "yasha": 1,
	      "recipe_diffusal_blade": 1,
	      "robe": 1,
	      "diffusal_blade": 1,
	      "recipe_manta": 1,
	      "ward_sentry": null,
	      "dust": null
	    },
	    "purchase_log": [{
	      "time": -83,
	      "key": "quelling_blade"
	    }, {
	      "time": -18,
	      "key": "circlet"
	    }, {
	      "time": -16,
	      "key": "branches"
	    }, {
	      "time": 94,
	      "key": "boots"
	    }, {
	      "time": 183,
	      "key": "sobi_mask"
	    }, {
	      "time": 213,
	      "key": "slippers"
	    }, {
	      "time": 219,
	      "key": "slippers"
	    }, {
	      "time": 222,
	      "key": "ring_of_protection"
	    }, {
	      "time": 287,
	      "key": "wraith_band"
	    }, {
	      "time": 287,
	      "key": "ring_of_basilius"
	    }, {
	      "time": 287,
	      "key": "ring_of_aquila"
	    }, {
	      "time": 321,
	      "key": "sobi_mask"
	    }, {
	      "time": 411,
	      "key": "tpscroll"
	    }, {
	      "time": 536,
	      "key": "gauntlets"
	    }, {
	      "time": 536,
	      "key": "gauntlets"
	    }, {
	      "time": 554,
	      "key": "urn_of_shadows"
	    }, {
	      "time": 555,
	      "key": "tpscroll"
	    }, {
	      "time": 611,
	      "key": "wind_lace"
	    }, {
	      "time": 724,
	      "key": "tpscroll"
	    }, {
	      "time": 747,
	      "key": "tpscroll"
	    }, {
	      "time": 877,
	      "key": "blades_of_attack"
	    }, {
	      "time": 878,
	      "key": "blades_of_attack"
	    }, {
	      "time": 902,
	      "key": "phase_boots"
	    }, {
	      "time": 906,
	      "key": "tpscroll"
	    }, {
	      "time": 973,
	      "key": "circlet"
	    }, {
	      "time": 973,
	      "key": "gauntlets"
	    }, {
	      "time": 974,
	      "key": "bracer"
	    }, {
	      "time": 1009,
	      "key": "sobi_mask"
	    }, {
	      "time": 1107,
	      "key": "ancient_janggo"
	    }, {
	      "time": 1111,
	      "key": "tpscroll"
	    }, {
	      "time": 1226,
	      "key": "tpscroll"
	    }, {
	      "time": 1367,
	      "key": "slippers"
	    }, {
	      "time": 1368,
	      "key": "poor_mans_shield"
	    }, {
	      "time": 1368,
	      "key": "slippers"
	    }, {
	      "time": 1412,
	      "key": "tpscroll"
	    }, {
	      "time": 1533,
	      "key": "blade_of_alacrity"
	    }, {
	      "time": 1533,
	      "key": "boots_of_elves"
	    }, {
	      "time": 1556,
	      "key": "yasha"
	    }, {
	      "time": 1655,
	      "key": "tpscroll"
	    }, {
	      "time": 1782,
	      "key": "blade_of_alacrity"
	    }, {
	      "time": 1884,
	      "key": "robe"
	    }, {
	      "time": 1978,
	      "key": "tpscroll"
	    }, {
	      "time": 2039,
	      "key": "blade_of_alacrity"
	    }, {
	      "time": 2068,
	      "key": "diffusal_blade"
	    }, {
	      "time": 2219,
	      "key": "tpscroll"
	    }],
	    "rune_pickups": 5,
	    "runes": {},
	    "runes_log": [],
	    "sen": {},
	    "sen_left_log": [],
	    "sen_log": [],
	    "sen_placed": 0,
	    "stuns": 0,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 828,
	    "xp_per_min": 372,
	    "xp_reasons": {
	      "0": 698,
	      "1": 2826,
	      "2": 12767
	    },
	    "xp_t": [0, 31, 226, 460, 570, 1264, 1555, 1690, 1845, 2111, 2222, 2626, 2747, 3017, 3309, 3621, 4116, 4566, 5290, 5500, 5589, 5859, 6686, 6776, 6945, 7798, 7962, 8727, 8994, 9559, 10185, 10924, 11760, 11760, 12589, 13129, 13802, 13802, 14702, 15652, 15828, 15828, 15864, 16195, 16288, 16288, 16288],
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": true,
	    "win": 0,
	    "lose": 1,
	    "total_gold": 15443,
	    "total_xp": 16275,
	    "kills_per_min": 0.045714285714285714,
	    "kda": 1,
	    "abandons": 0,
	    "neutral_kills": 49,
	    "tower_kills": 1,
	    "courier_kills": 0,
	    "lane_kills": 167,
	    "hero_kills": 2,
	    "observer_kills": 0,
	    "sentry_kills": 0,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 2,
	    "buyback_count": 1,
	    "observer_uses": 0,
	    "sentry_uses": 0,
	    "lane_efficiency": 0.533806426177804,
	    "lane_efficiency_pct": 53,
	    "lane": 1,
	    "lane_role": 1,
	    "purchase_time": {
	      "quelling_blade": -83,
	      "circlet": 955,
	      "branches": -16,
	      "boots": 94,
	      "sobi_mask": 1513,
	      "slippers": 3167,
	      "ring_of_protection": 222,
	      "wraith_band": 287,
	      "ring_of_basilius": 287,
	      "ring_of_aquila": 287,
	      "tpscroll": 12944,
	      "gauntlets": 2045,
	      "urn_of_shadows": 554,
	      "wind_lace": 611,
	      "blades_of_attack": 1755,
	      "phase_boots": 902,
	      "bracer": 974,
	      "ancient_janggo": 1107,
	      "poor_mans_shield": 1368,
	      "blade_of_alacrity": 5354,
	      "boots_of_elves": 1533,
	      "yasha": 1556,
	      "robe": 1884,
	      "diffusal_blade": 2068
	    },
	    "first_purchase_time": {
	      "quelling_blade": -83,
	      "circlet": -18,
	      "branches": -16,
	      "boots": 94,
	      "sobi_mask": 183,
	      "slippers": 213,
	      "ring_of_protection": 222,
	      "wraith_band": 287,
	      "ring_of_basilius": 287,
	      "ring_of_aquila": 287,
	      "tpscroll": 411,
	      "gauntlets": 536,
	      "urn_of_shadows": 554,
	      "wind_lace": 611,
	      "blades_of_attack": 877,
	      "phase_boots": 902,
	      "bracer": 974,
	      "ancient_janggo": 1107,
	      "poor_mans_shield": 1368,
	      "blade_of_alacrity": 1533,
	      "boots_of_elves": 1533,
	      "yasha": 1556,
	      "robe": 1884,
	      "diffusal_blade": 2068
	    },
	    "item_win": {
	      "quelling_blade": 0,
	      "circlet": 0,
	      "branches": 0,
	      "boots": 0,
	      "sobi_mask": 0,
	      "slippers": 0,
	      "ring_of_protection": 0,
	      "wraith_band": 0,
	      "ring_of_basilius": 0,
	      "ring_of_aquila": 0,
	      "tpscroll": 0,
	      "gauntlets": 0,
	      "urn_of_shadows": 0,
	      "wind_lace": 0,
	      "blades_of_attack": 0,
	      "phase_boots": 0,
	      "bracer": 0,
	      "ancient_janggo": 0,
	      "poor_mans_shield": 0,
	      "blade_of_alacrity": 0,
	      "boots_of_elves": 0,
	      "yasha": 0,
	      "robe": 0,
	      "diffusal_blade": 0
	    },
	    "item_usage": {
	      "quelling_blade": 1,
	      "circlet": 1,
	      "branches": 1,
	      "boots": 1,
	      "sobi_mask": 1,
	      "slippers": 1,
	      "ring_of_protection": 1,
	      "wraith_band": 1,
	      "ring_of_basilius": 1,
	      "ring_of_aquila": 1,
	      "tpscroll": 1,
	      "gauntlets": 1,
	      "urn_of_shadows": 1,
	      "wind_lace": 1,
	      "blades_of_attack": 1,
	      "phase_boots": 1,
	      "bracer": 1,
	      "ancient_janggo": 1,
	      "poor_mans_shield": 1,
	      "blade_of_alacrity": 1,
	      "boots_of_elves": 1,
	      "yasha": 1,
	      "robe": 1,
	      "diffusal_blade": 1
	    },
	    "purchase_ward_sentry": null,
	    "purchase_tpscroll": 11,
	    "actions_per_min": 109,
	    "life_state_dead": 522,
	    "solo_competitive_rank": null,
	    "cosmetics": [],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 353,
	        "pct": 0.1630820137083432
	      },
	      "xp_per_min": {
	        "raw": 372,
	        "pct": 0.1333018199007327
	      },
	      "kills_per_min": {
	        "raw": 0.045714285714285714,
	        "pct": 0.07825059101654847
	      },
	      "last_hits_per_min": {
	        "raw": 5.0285714285714285,
	        "pct": 0.650354609929078
	      },
	      "hero_damage_per_min": {
	        "raw": 422.85714285714283,
	        "pct": 0.18817966903073285
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.9333333333333333
	      },
	      "tower_damage": {
	        "raw": 828,
	        "pct": 0.42188607894114866
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 1,
	    "ability_upgrades_arr": [5549, 5550, 5549, 5550, 5549, 5551, 5549, 5548, 5550, 6115, 5550, 5551, 5548, 5548, 5918, 5548, 5551, 6224],
	    "ability_uses": {
	      "bristleback_quill_spray": 239,
	      "bristleback_viscous_nasal_goo": 27
	    },
	    "account_id": 142172924,
	    "actions": {
	      "1": 4832,
	      "2": 109,
	      "3": 59,
	      "4": 811,
	      "5": 14,
	      "6": 45,
	      "7": 4,
	      "8": 539,
	      "10": 239,
	      "11": 15,
	      "15": 2,
	      "16": 37,
	      "19": 16,
	      "23": 1,
	      "24": 1
	    },
	    "additional_units": null,
	    "assists": 6,
	    "backpack_0": 0,
	    "backpack_1": 0,
	    "backpack_2": 0,
	    "buyback_log": [{
	      "time": 2508,
	      "slot": 1,
	      "type": "buyback_log",
	      "player_slot": 1
	    }],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_hero_witch_doctor": 5453,
	      "npc_dota_creep_badguys_melee": 54516,
	      "npc_dota_hero_weaver": 9884,
	      "npc_dota_creep_badguys_ranged": 18094,
	      "npc_dota_creep_goodguys_melee": 2034,
	      "npc_dota_creep_goodguys_ranged": 608,
	      "npc_dota_neutral_forest_troll_high_priest": 61,
	      "npc_dota_neutral_forest_troll_berserker": 57,
	      "npc_dota_goodguys_siege": 168,
	      "npc_dota_badguys_siege": 3619,
	      "npc_dota_hero_ember_spirit": 4913,
	      "npc_dota_hero_monkey_king": 5357,
	      "npc_dota_hero_omniknight": 3796,
	      "npc_dota_neutral_black_drake": 3944,
	      "npc_dota_neutral_black_dragon": 4191,
	      "npc_dota_badguys_tower1_mid": 260,
	      "npc_dota_neutral_dark_troll": 1059,
	      "npc_dota_neutral_dark_troll_warlord": 1256,
	      "npc_dota_dark_troll_warlord_skeleton_warrior": 518,
	      "npc_dota_neutral_alpha_wolf": 715,
	      "npc_dota_neutral_giant_wolf": 1140,
	      "npc_dota_badguys_tower1_bot": 165,
	      "npc_dota_badguys_tower2_bot": 278,
	      "npc_dota_neutral_harpy_storm": 669,
	      "npc_dota_neutral_harpy_scout": 1051,
	      "npc_dota_neutral_centaur_khan": 2273,
	      "npc_dota_neutral_centaur_outrunner": 1719,
	      "npc_dota_neutral_small_thunder_lizard": 256,
	      "npc_dota_neutral_big_thunder_lizard": 74,
	      "npc_dota_weaver_swarm": 1,
	      "npc_dota_neutral_ogre_mauler": 3813,
	      "npc_dota_neutral_ogre_magi": 1572,
	      "npc_dota_neutral_mud_golem": 1847,
	      "npc_dota_neutral_mud_golem_split": 1460,
	      "npc_dota_neutral_wildkin": 836,
	      "npc_dota_neutral_enraged_wildkin": 966,
	      "npc_dota_sentry_wards": 288,
	      "npc_dota_creep_badguys_melee_upgraded": 3769,
	      "npc_dota_creep_badguys_ranged_upgraded": 913
	    },
	    "damage_inflictor": {
	      "null": 4110,
	      "bristleback_quill_spray": 20714,
	      "blade_mail": 4579
	    },
	    "damage_inflictor_received": {
	      "null": 17931,
	      "witch_doctor_paralyzing_cask": 673,
	      "weaver_shukuchi": 1703,
	      "witch_doctor_maledict": 1415,
	      "weaver_the_swarm": 420,
	      "ember_spirit_flame_guard": 1797,
	      "ember_spirit_searing_chains": 3376,
	      "ember_spirit_activate_fire_remnant": 1174,
	      "orb_of_venom": 65,
	      "monkey_king_tree_dance": 283,
	      "omniknight_purification": 1488,
	      "maelstrom": 352,
	      "mjollnir": 276
	    },
	    "damage_taken": {
	      "npc_dota_hero_witch_doctor": 5856,
	      "npc_dota_hero_weaver": 8342,
	      "npc_dota_creep_badguys_melee": 963,
	      "npc_dota_creep_badguys_ranged": 376,
	      "npc_dota_neutral_forest_troll_high_priest": 9,
	      "npc_dota_neutral_forest_troll_berserker": 5,
	      "npc_dota_badguys_tower1_top": 735,
	      "npc_dota_badguys_siege": 38,
	      "npc_dota_hero_ember_spirit": 8280,
	      "npc_dota_hero_monkey_king": 9131,
	      "npc_dota_hero_omniknight": 1558,
	      "npc_dota_badguys_tower1_mid": 388,
	      "npc_dota_neutral_dark_troll": 34,
	      "npc_dota_dark_troll_warlord_skeleton_warrior": 16,
	      "npc_dota_neutral_dark_troll_warlord": 49,
	      "npc_dota_neutral_giant_wolf": 21,
	      "npc_dota_neutral_alpha_wolf": 29,
	      "npc_dota_badguys_tower1_bot": 41,
	      "npc_dota_badguys_tower2_bot": 292,
	      "npc_dota_neutral_black_drake": 111,
	      "npc_dota_neutral_black_dragon": 197,
	      "npc_dota_neutral_harpy_scout": 25,
	      "npc_dota_neutral_harpy_storm": 23,
	      "npc_dota_neutral_centaur_khan": 96,
	      "npc_dota_neutral_centaur_outrunner": 71,
	      "npc_dota_neutral_ogre_magi": 50,
	      "npc_dota_neutral_ogre_mauler": 27,
	      "npc_dota_neutral_mud_golem": 21,
	      "npc_dota_neutral_mud_golem_split": 5,
	      "npc_dota_neutral_enraged_wildkin": 22,
	      "npc_dota_neutral_wildkin": 8
	    },
	    "deaths": 15,
	    "denies": 21,
	    "dn_t": [0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 10, 12, 15, 16, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21],
	    "gold": 1372,
	    "gold_per_min": 400,
	    "gold_reasons": {
	      "0": 879,
	      "1": -3738,
	      "2": -1085,
	      "11": 600,
	      "12": 3263,
	      "13": 9051
	    },
	    "gold_spent": 11890,
	    "gold_t": [0, 99, 199, 499, 678, 1315, 1578, 1917, 2265, 2696, 3648, 3946, 4337, 4731, 4996, 5404, 5504, 5876, 6188, 6495, 7133, 7596, 7900, 8167, 8500, 9726, 10356, 11651, 11751, 12106, 12459, 12946, 13535, 13725, 13825, 14716, 15391, 16078, 16517, 16617, 16792, 17118, 17367, 17467, 17545, 17545, 17545],
	    "hero_damage": 29403,
	    "hero_healing": 0,
	    "hero_hits": {
	      "null": 28,
	      "bristleback_quill_spray": 222,
	      "blade_mail": 73
	    },
	    "hero_id": 99,
	    "item_0": 36,
	    "item_1": 242,
	    "item_2": 50,
	    "item_3": 210,
	    "item_4": 127,
	    "item_5": 46,
	    "item_uses": {
	      "ward_observer": 1,
	      "tango": 4,
	      "tpscroll": 13,
	      "magic_wand": 12,
	      "flask": 1,
	      "phase_boots": 70,
	      "buckler": 2,
	      "crimson_guard": 10,
	      "blade_mail": 10
	    },
	    "kill_streaks": {},
	    "killed": {
	      "npc_dota_creep_badguys_melee": 112,
	      "npc_dota_creep_badguys_ranged": 43,
	      "npc_dota_creep_goodguys_melee": 15,
	      "npc_dota_goodguys_siege": 1,
	      "npc_dota_badguys_siege": 7,
	      "npc_dota_creep_goodguys_ranged": 5,
	      "npc_dota_hero_witch_doctor": 2,
	      "npc_dota_hero_weaver": 2,
	      "npc_dota_neutral_dark_troll": 2,
	      "npc_dota_dark_troll_warlord_skeleton_warrior": 2,
	      "npc_dota_neutral_dark_troll_warlord": 1,
	      "npc_dota_neutral_giant_wolf": 2,
	      "npc_dota_neutral_alpha_wolf": 1,
	      "npc_dota_neutral_black_dragon": 2,
	      "npc_dota_neutral_black_drake": 4,
	      "npc_dota_neutral_harpy_scout": 2,
	      "npc_dota_neutral_harpy_storm": 1,
	      "npc_dota_hero_omniknight": 1,
	      "npc_dota_neutral_centaur_khan": 2,
	      "npc_dota_neutral_centaur_outrunner": 4,
	      "npc_dota_weaver_swarm": 1,
	      "npc_dota_neutral_ogre_mauler": 4,
	      "npc_dota_neutral_ogre_magi": 2,
	      "npc_dota_neutral_mud_golem": 2,
	      "npc_dota_neutral_mud_golem_split": 4,
	      "npc_dota_neutral_enraged_wildkin": 1,
	      "npc_dota_neutral_wildkin": 2,
	      "npc_dota_sentry_wards": 1,
	      "npc_dota_creep_badguys_melee_upgraded": 5,
	      "npc_dota_creep_badguys_ranged_upgraded": 1
	    },
	    "killed_by": {
	      "npc_dota_hero_weaver": 4,
	      "npc_dota_hero_witch_doctor": 3,
	      "npc_dota_badguys_tower1_top": 1,
	      "npc_dota_hero_ember_spirit": 4,
	      "npc_dota_hero_monkey_king": 3
	    },
	    "kills": 6,
	    "kills_log": [{
	      "time": 572,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 572,
	      "key": "npc_dota_hero_weaver"
	    }, {
	      "time": 1154,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 1592,
	      "key": "npc_dota_hero_omniknight"
	    }, {
	      "time": 1604,
	      "key": "npc_dota_hero_weaver"
	    }],
	    "lane_pos": {
	      "72": {
	        "142": 1,
	        "154": 1,
	        "160": 2,
	        "162": 2
	      },
	      "74": {
	        "74": 4,
	        "76": 28,
	        "78": 1,
	        "142": 3,
	        "144": 1,
	        "152": 3,
	        "154": 3,
	        "158": 1,
	        "160": 1,
	        "164": 5
	      },
	      "76": {
	        "78": 3,
	        "80": 4,
	        "82": 1,
	        "86": 1,
	        "88": 1,
	        "90": 1,
	        "92": 1,
	        "94": 1,
	        "138": 1,
	        "140": 2,
	        "142": 2,
	        "144": 9,
	        "146": 5,
	        "148": 10,
	        "150": 5,
	        "152": 5,
	        "154": 6,
	        "156": 4,
	        "158": 4,
	        "160": 1,
	        "162": 3,
	        "164": 2
	      },
	      "78": {
	        "96": 1,
	        "98": 1,
	        "100": 1,
	        "102": 1,
	        "104": 1,
	        "106": 1,
	        "108": 1,
	        "110": 1,
	        "114": 1,
	        "116": 1,
	        "138": 19,
	        "142": 1,
	        "144": 13,
	        "146": 7,
	        "148": 18,
	        "150": 17,
	        "152": 19,
	        "154": 10,
	        "156": 12,
	        "158": 12,
	        "160": 7,
	        "162": 10,
	        "164": 5,
	        "166": 8,
	        "168": 1
	      },
	      "80": {
	        "118": 1,
	        "120": 1,
	        "122": 1,
	        "136": 1,
	        "144": 17,
	        "146": 10,
	        "148": 18,
	        "150": 17,
	        "152": 5,
	        "154": 3,
	        "156": 9,
	        "158": 4,
	        "160": 1,
	        "162": 6,
	        "164": 10,
	        "166": 14,
	        "168": 18,
	        "170": 2
	      },
	      "82": {
	        "124": 1,
	        "126": 1,
	        "134": 1,
	        "136": 1,
	        "140": 1,
	        "142": 2,
	        "144": 4,
	        "152": 1,
	        "154": 2,
	        "156": 3,
	        "162": 1,
	        "164": 1,
	        "166": 39,
	        "168": 61,
	        "170": 7
	      },
	      "84": {
	        "128": 1,
	        "132": 2,
	        "134": 1,
	        "136": 1,
	        "138": 2,
	        "140": 1,
	        "142": 1,
	        "156": 1,
	        "158": 2,
	        "160": 1,
	        "164": 1,
	        "166": 1,
	        "168": 10,
	        "170": 6,
	        "172": 1
	      },
	      "86": {
	        "130": 2,
	        "132": 1,
	        "138": 1,
	        "160": 2,
	        "162": 1,
	        "170": 4,
	        "172": 3
	      },
	      "88": {
	        "128": 1,
	        "130": 1,
	        "132": 1,
	        "136": 1,
	        "156": 1,
	        "158": 1,
	        "170": 1,
	        "172": 3
	      },
	      "90": {
	        "128": 1,
	        "132": 2,
	        "134": 2,
	        "136": 3,
	        "172": 1
	      },
	      "92": {
	        "130": 3,
	        "134": 1,
	        "136": 40,
	        "156": 1,
	        "158": 1,
	        "174": 1
	      },
	      "94": {
	        "128": 4,
	        "130": 1,
	        "156": 1,
	        "158": 1
	      },
	      "96": {
	        "156": 1,
	        "158": 1
	      },
	      "100": {
	        "156": 2
	      },
	      "102": {
	        "158": 3
	      },
	      "104": {
	        "160": 2
	      },
	      "106": {
	        "160": 1
	      }
	    },
	    "last_hits": 208,
	    "leaver_status": 0,
	    "level": 21,
	    "lh_t": [0, 0, 0, 5, 7, 11, 15, 18, 24, 31, 34, 39, 46, 53, 57, 62, 62, 68, 73, 77, 78, 89, 90, 94, 99, 107, 120, 122, 122, 127, 133, 139, 150, 152, 152, 170, 179, 194, 201, 201, 202, 203, 208, 208, 208, 208, 208],
	    "life_state": {
	      "0": 2086,
	      "1": 22,
	      "2": 664
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2373,
	      "max": true,
	      "inflictor": "blade_mail",
	      "unit": "npc_dota_hero_bristleback",
	      "key": "npc_dota_hero_monkey_king",
	      "value": 304,
	      "slot": 1,
	      "player_slot": 1
	    },
	    "multi_kills": {
	      "2": 2
	    },
	    "obs": {
	      "86": {
	        "162": 1
	      }
	    },
	    "obs_left_log": [{
	      "time": 386,
	      "type": "obs_left_log",
	      "key": "[86, 162]",
	      "slot": 1,
	      "x": 86,
	      "y": 162,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 12304490,
	      "player_slot": 1
	    }],
	    "obs_log": [{
	      "time": 20,
	      "type": "obs_log",
	      "key": "[86, 162]",
	      "slot": 1,
	      "x": 86,
	      "y": 162,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 12304490,
	      "player_slot": 1
	    }],
	    "obs_placed": 1,
	    "party_id": 0,
	    "permanent_buffs": [],
	    "purchase": {
	      "tpscroll": 14,
	      "magic_stick": 1,
	      "branches": 3,
	      "magic_wand": 1,
	      "boots": 1,
	      "ring_of_health": 1,
	      "vanguard": 1,
	      "vitality_booster": 1,
	      "blades_of_attack": 2,
	      "phase_boots": 1,
	      "chainmail": 2,
	      "recipe_buckler": 1,
	      "buckler": 1,
	      "crimson_guard": 1,
	      "recipe_crimson_guard": 1,
	      "robe": 1,
	      "broadsword": 1,
	      "blade_mail": 1,
	      "ogre_axe": 1,
	      "recipe_sange": 1,
	      "sange": 1,
	      "belt_of_strength": 1,
	      "heavens_halberd": 1,
	      "talisman_of_evasion": 1,
	      "ward_sentry": null,
	      "dust": null
	    },
	    "purchase_log": [{
	      "time": 168,
	      "key": "tpscroll"
	    }, {
	      "time": 172,
	      "key": "magic_stick"
	    }, {
	      "time": 174,
	      "key": "branches"
	    }, {
	      "time": 174,
	      "key": "branches"
	    }, {
	      "time": 175,
	      "key": "magic_wand"
	    }, {
	      "time": 291,
	      "key": "tpscroll"
	    }, {
	      "time": 295,
	      "key": "boots"
	    }, {
	      "time": 402,
	      "key": "tpscroll"
	    }, {
	      "time": 470,
	      "key": "ring_of_health"
	    }, {
	      "time": 615,
	      "key": "tpscroll"
	    }, {
	      "time": 615,
	      "key": "tpscroll"
	    }, {
	      "time": 626,
	      "key": "vanguard"
	    }, {
	      "time": 626,
	      "key": "vitality_booster"
	    }, {
	      "time": 714,
	      "key": "blades_of_attack"
	    }, {
	      "time": 714,
	      "key": "phase_boots"
	    }, {
	      "time": 714,
	      "key": "blades_of_attack"
	    }, {
	      "time": 858,
	      "key": "chainmail"
	    }, {
	      "time": 860,
	      "key": "branches"
	    }, {
	      "time": 931,
	      "key": "buckler"
	    }, {
	      "time": 933,
	      "key": "tpscroll"
	    }, {
	      "time": 933,
	      "key": "tpscroll"
	    }, {
	      "time": 1105,
	      "key": "crimson_guard"
	    }, {
	      "time": 1197,
	      "key": "tpscroll"
	    }, {
	      "time": 1209,
	      "key": "chainmail"
	    }, {
	      "time": 1284,
	      "key": "tpscroll"
	    }, {
	      "time": 1285,
	      "key": "robe"
	    }, {
	      "time": 1286,
	      "key": "tpscroll"
	    }, {
	      "time": 1477,
	      "key": "broadsword"
	    }, {
	      "time": 1482,
	      "key": "blade_mail"
	    }, {
	      "time": 1567,
	      "key": "ogre_axe"
	    }, {
	      "time": 1681,
	      "key": "sange"
	    }, {
	      "time": 1681,
	      "key": "belt_of_strength"
	    }, {
	      "time": 1749,
	      "key": "tpscroll"
	    }, {
	      "time": 1749,
	      "key": "tpscroll"
	    }, {
	      "time": 1863,
	      "key": "heavens_halberd"
	    }, {
	      "time": 1863,
	      "key": "talisman_of_evasion"
	    }, {
	      "time": 2024,
	      "key": "tpscroll"
	    }, {
	      "time": 2024,
	      "key": "tpscroll"
	    }],
	    "rune_pickups": 2,
	    "runes": {},
	    "runes_log": [],
	    "sen": {},
	    "sen_left_log": [],
	    "sen_log": [],
	    "sen_placed": 0,
	    "stuns": 0,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 703,
	    "xp_per_min": 440,
	    "xp_reasons": {
	      "0": 459,
	      "1": 5457,
	      "2": 13386
	    },
	    "xp_t": [0, 22, 313, 763, 1143, 1703, 2153, 2543, 2948, 3486, 4451, 4811, 5349, 5640, 5849, 6318, 6318, 6578, 6757, 7011, 7600, 8251, 8370, 8481, 8793, 10534, 11125, 13369, 13369, 13836, 14170, 15095, 15802, 15854, 15854, 17036, 17537, 18435, 18940, 18940, 19038, 19062, 19232, 19238, 19299, 19299, 19299],
	    "personaname": "Tyrone",
	    "name": null,
	    "last_login": null,
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": true,
	    "win": 0,
	    "lose": 1,
	    "total_gold": 17500,
	    "total_xp": 19250,
	    "kills_per_min": 0.13714285714285715,
	    "kda": 0,
	    "abandons": 0,
	    "neutral_kills": 36,
	    "tower_kills": 0,
	    "courier_kills": 0,
	    "lane_kills": 181,
	    "hero_kills": 5,
	    "observer_kills": 0,
	    "sentry_kills": 1,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 6,
	    "buyback_count": 1,
	    "observer_uses": 1,
	    "sentry_uses": 0,
	    "lane_efficiency": 0.7191011235955056,
	    "lane_efficiency_pct": 71,
	    "lane": 3,
	    "lane_role": 3,
	    "purchase_time": {
	      "tpscroll": 15270,
	      "magic_stick": 172,
	      "branches": 1208,
	      "magic_wand": 175,
	      "boots": 295,
	      "ring_of_health": 470,
	      "vanguard": 626,
	      "vitality_booster": 626,
	      "blades_of_attack": 1428,
	      "phase_boots": 714,
	      "chainmail": 2067,
	      "buckler": 931,
	      "crimson_guard": 1105,
	      "robe": 1285,
	      "broadsword": 1477,
	      "blade_mail": 1482,
	      "ogre_axe": 1567,
	      "sange": 1681,
	      "belt_of_strength": 1681,
	      "heavens_halberd": 1863,
	      "talisman_of_evasion": 1863
	    },
	    "first_purchase_time": {
	      "tpscroll": 168,
	      "magic_stick": 172,
	      "branches": 174,
	      "magic_wand": 175,
	      "boots": 295,
	      "ring_of_health": 470,
	      "vanguard": 626,
	      "vitality_booster": 626,
	      "blades_of_attack": 714,
	      "phase_boots": 714,
	      "chainmail": 858,
	      "buckler": 931,
	      "crimson_guard": 1105,
	      "robe": 1285,
	      "broadsword": 1477,
	      "blade_mail": 1482,
	      "ogre_axe": 1567,
	      "sange": 1681,
	      "belt_of_strength": 1681,
	      "heavens_halberd": 1863,
	      "talisman_of_evasion": 1863
	    },
	    "item_win": {
	      "tpscroll": 0,
	      "magic_stick": 0,
	      "branches": 0,
	      "magic_wand": 0,
	      "boots": 0,
	      "ring_of_health": 0,
	      "vanguard": 0,
	      "vitality_booster": 0,
	      "blades_of_attack": 0,
	      "phase_boots": 0,
	      "chainmail": 0,
	      "buckler": 0,
	      "crimson_guard": 0,
	      "robe": 0,
	      "broadsword": 0,
	      "blade_mail": 0,
	      "ogre_axe": 0,
	      "sange": 0,
	      "belt_of_strength": 0,
	      "heavens_halberd": 0,
	      "talisman_of_evasion": 0
	    },
	    "item_usage": {
	      "tpscroll": 1,
	      "magic_stick": 1,
	      "branches": 1,
	      "magic_wand": 1,
	      "boots": 1,
	      "ring_of_health": 1,
	      "vanguard": 1,
	      "vitality_booster": 1,
	      "blades_of_attack": 1,
	      "phase_boots": 1,
	      "chainmail": 1,
	      "buckler": 1,
	      "crimson_guard": 1,
	      "robe": 1,
	      "broadsword": 1,
	      "blade_mail": 1,
	      "ogre_axe": 1,
	      "sange": 1,
	      "belt_of_strength": 1,
	      "heavens_halberd": 1,
	      "talisman_of_evasion": 1
	    },
	    "purchase_ward_sentry": null,
	    "purchase_tpscroll": 14,
	    "actions_per_min": 153,
	    "life_state_dead": 686,
	    "solo_competitive_rank": "3289",
	    "cosmetics": [{
	      "item_id": 10068,
	      "name": "Staff of Faith",
	      "prefab": "ward",
	      "creation_date": null,
	      "image_inventory": "econ/items/wards/chen_ward/chen_ward_npc_dota_observer_wards",
	      "image_path": "icons/econ/items/wards/chen_ward/chen_ward_npc_dota_observer_wards.bfc1ff3aa74c97c6e4b6ff7b5b9e681d907d01bc.png",
	      "item_description": "#DOTA_Item_Desc_Staff_of_Faith",
	      "item_name": "#DOTA_Item_Staff_of_Faith",
	      "item_rarity": null,
	      "item_type_name": null,
	      "used_by_heroes": null
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 400,
	        "pct": 0.4229452054794521
	      },
	      "xp_per_min": {
	        "raw": 440,
	        "pct": 0.3396832191780822
	      },
	      "kills_per_min": {
	        "raw": 0.13714285714285715,
	        "pct": 0.4336472602739726
	      },
	      "last_hits_per_min": {
	        "raw": 4.754285714285714,
	        "pct": 0.9116010273972602
	      },
	      "hero_damage_per_min": {
	        "raw": 672.0685714285714,
	        "pct": 0.6639554794520548
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.889554794520548
	      },
	      "tower_damage": {
	        "raw": 703,
	        "pct": 0.429152397260274
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 2,
	    "ability_upgrades_arr": [5566, 5565, 5565, 5566, 5565, 5568, 5565, 5566, 5566, 5939, 5567, 5568, 5567, 5567, 6145, 5567, 5568, 5933],
	    "ability_uses": {
	      "tusk_ice_shards": 51,
	      "tusk_snowball": 27,
	      "tusk_launch_snowball": 25,
	      "tusk_walrus_punch": 24,
	      "tusk_frozen_sigil": 7
	    },
	    "account_id": null,
	    "actions": {
	      "1": 6357,
	      "2": 150,
	      "3": 99,
	      "4": 480,
	      "5": 72,
	      "6": 74,
	      "7": 4,
	      "8": 331,
	      "10": 221,
	      "11": 15,
	      "15": 33,
	      "16": 40,
	      "17": 3,
	      "19": 32,
	      "20": 18,
	      "24": 1,
	      "27": 1,
	      "33": 221
	    },
	    "additional_units": null,
	    "assists": 4,
	    "backpack_0": 0,
	    "backpack_1": 0,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_creep_goodguys_ranged": 107,
	      "npc_dota_creep_badguys_melee": 37342,
	      "npc_dota_creep_goodguys_melee": 391,
	      "npc_dota_creep_badguys_ranged": 12402,
	      "npc_dota_hero_ember_spirit": 5938,
	      "illusion_npc_dota_hero_ember_spirit": 486,
	      "npc_dota_goodguys_siege": 164,
	      "npc_dota_hero_omniknight": 3657,
	      "npc_dota_hero_monkey_king": 10903,
	      "npc_dota_hero_witch_doctor": 8459,
	      "npc_dota_badguys_siege": 514,
	      "npc_dota_hero_weaver": 3537,
	      "npc_dota_weaver_swarm": 3,
	      "npc_dota_badguys_tower1_bot": 411,
	      "npc_dota_neutral_centaur_khan": 1357,
	      "npc_dota_neutral_centaur_outrunner": 1191,
	      "npc_dota_neutral_ogre_magi": 609,
	      "npc_dota_neutral_ogre_mauler": 1784,
	      "npc_dota_neutral_enraged_wildkin": 1065,
	      "npc_dota_neutral_wildkin": 1301,
	      "npc_dota_neutral_satyr_soulstealer": 1362,
	      "npc_dota_neutral_satyr_trickster": 699
	    },
	    "damage_inflictor": {
	      "tusk_ice_shards": 8841,
	      "null": 19925,
	      "tusk_snowball": 3728
	    },
	    "damage_inflictor_received": {
	      "ember_spirit_flame_guard": 1894,
	      "null": 15114,
	      "omniknight_purification": 1905,
	      "orb_of_venom": 69,
	      "ember_spirit_searing_chains": 916,
	      "ember_spirit_activate_fire_remnant": 374,
	      "witch_doctor_paralyzing_cask": 38,
	      "witch_doctor_maledict": 522,
	      "weaver_the_swarm": 853,
	      "weaver_shukuchi": 209,
	      "monkey_king_tree_dance": 73,
	      "maelstrom": 243,
	      "mjollnir": 138
	    },
	    "damage_taken": {
	      "npc_dota_creep_badguys_melee": 770,
	      "npc_dota_hero_ember_spirit": 5297,
	      "npc_dota_creep_badguys_ranged": 279,
	      "npc_dota_hero_omniknight": 1978,
	      "npc_dota_hero_monkey_king": 9300,
	      "npc_dota_badguys_tower1_mid": 206,
	      "npc_dota_hero_witch_doctor": 1299,
	      "npc_dota_hero_weaver": 4874,
	      "npc_dota_badguys_siege": 23,
	      "npc_dota_badguys_tower1_bot": 221,
	      "npc_dota_neutral_centaur_outrunner": 93,
	      "npc_dota_neutral_centaur_khan": 103,
	      "npc_dota_neutral_ogre_magi": 12,
	      "npc_dota_neutral_ogre_mauler": 75,
	      "npc_dota_neutral_forest_troll_berserker": 10,
	      "npc_dota_neutral_enraged_wildkin": 63,
	      "npc_dota_neutral_wildkin": 69,
	      "npc_dota_neutral_satyr_trickster": 7,
	      "npc_dota_neutral_satyr_soulstealer": 27,
	      "npc_dota_neutral_black_dragon": 25,
	      "npc_dota_creep_badguys_melee_upgraded": 34
	    },
	    "deaths": 8,
	    "denies": 3,
	    "dn_t": [0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	    "gold": 743,
	    "gold_per_min": 412,
	    "gold_reasons": {
	      "0": 1583,
	      "1": -2172,
	      "6": 200,
	      "11": 600,
	      "12": 7725,
	      "13": 4391
	    },
	    "gold_spent": 16660,
	    "gold_t": [0, 199, 419, 675, 821, 921, 1403, 1997, 2582, 3040, 3531, 3887, 4070, 4665, 4969, 5367, 5467, 5782, 6870, 7094, 8051, 8332, 9327, 10191, 10617, 11977, 12512, 13214, 13314, 13414, 14413, 14895, 15263, 15456, 15646, 15879, 15979, 16432, 16565, 16868, 16968, 17773, 17873, 17973, 18051, 18051, 18051],
	    "hero_damage": 32494,
	    "hero_healing": 0,
	    "hero_hits": {
	      "tusk_ice_shards": 52,
	      "null": 74,
	      "tusk_snowball": 26
	    },
	    "hero_id": 100,
	    "item_0": 50,
	    "item_1": 168,
	    "item_2": 249,
	    "item_3": 41,
	    "item_4": 73,
	    "item_5": 116,
	    "item_uses": {
	      "branches": 1,
	      "tango": 4,
	      "clarity": 1,
	      "bottle": 76,
	      "tpscroll": 12,
	      "phase_boots": 112,
	      "invis_sword": 6,
	      "dust": 2,
	      "silver_edge": 15,
	      "black_king_bar": 2
	    },
	    "kill_streaks": {
	      "3": 2,
	      "4": 2,
	      "5": 1,
	      "6": 1,
	      "7": 1,
	      "8": 1
	    },
	    "killed": {
	      "npc_dota_creep_badguys_melee": 63,
	      "npc_dota_creep_badguys_ranged": 25,
	      "npc_dota_creep_goodguys_melee": 3,
	      "npc_dota_hero_omniknight": 3,
	      "npc_dota_hero_ember_spirit": 2,
	      "npc_dota_hero_witch_doctor": 6,
	      "npc_dota_hero_monkey_king": 4,
	      "npc_dota_weaver_swarm": 3,
	      "npc_dota_hero_weaver": 1,
	      "npc_dota_badguys_siege": 1,
	      "npc_dota_neutral_centaur_khan": 1,
	      "npc_dota_neutral_centaur_outrunner": 2,
	      "npc_dota_neutral_ogre_magi": 1,
	      "npc_dota_neutral_ogre_mauler": 2,
	      "npc_dota_neutral_enraged_wildkin": 1,
	      "npc_dota_neutral_wildkin": 2,
	      "npc_dota_neutral_satyr_soulstealer": 2,
	      "npc_dota_neutral_satyr_trickster": 2
	    },
	    "killed_by": {
	      "npc_dota_hero_monkey_king": 4,
	      "npc_dota_hero_ember_spirit": 2,
	      "npc_dota_hero_weaver": 2
	    },
	    "kills": 17,
	    "kills_log": [{
	      "time": 300,
	      "key": "npc_dota_hero_omniknight"
	    }, {
	      "time": 473,
	      "key": "npc_dota_hero_ember_spirit"
	    }, {
	      "time": 526,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 541,
	      "key": "npc_dota_hero_omniknight"
	    }, {
	      "time": 763,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 871,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 1073,
	      "key": "npc_dota_hero_monkey_king"
	    }, {
	      "time": 1188,
	      "key": "npc_dota_hero_weaver"
	    }, {
	      "time": 1266,
	      "key": "npc_dota_hero_monkey_king"
	    }, {
	      "time": 1333,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 1467,
	      "key": "npc_dota_hero_ember_spirit"
	    }, {
	      "time": 1557,
	      "key": "npc_dota_hero_witch_doctor"
	    }, {
	      "time": 1590,
	      "key": "npc_dota_hero_monkey_king"
	    }, {
	      "time": 1773,
	      "key": "npc_dota_hero_omniknight"
	    }, {
	      "time": 1818,
	      "key": "npc_dota_hero_monkey_king"
	    }, {
	      "time": 2440,
	      "key": "npc_dota_hero_witch_doctor"
	    }],
	    "lane_pos": {
	      "72": {
	        "78": 11
	      },
	      "74": {
	        "76": 6,
	        "78": 19
	      },
	      "76": {
	        "78": 2
	      },
	      "78": {
	        "80": 2
	      },
	      "80": {
	        "80": 1,
	        "82": 1
	      },
	      "82": {
	        "82": 1,
	        "84": 1
	      },
	      "84": {
	        "84": 1,
	        "86": 1,
	        "88": 1,
	        "90": 1
	      },
	      "86": {
	        "84": 1,
	        "86": 1,
	        "92": 1
	      },
	      "88": {
	        "88": 1,
	        "90": 1,
	        "94": 1
	      },
	      "90": {
	        "92": 1,
	        "96": 1,
	        "128": 2,
	        "130": 2
	      },
	      "92": {
	        "94": 1,
	        "98": 1,
	        "126": 1,
	        "128": 4
	      },
	      "94": {
	        "96": 1,
	        "98": 1,
	        "100": 1,
	        "124": 1,
	        "126": 1
	      },
	      "96": {
	        "98": 1,
	        "102": 1,
	        "116": 1,
	        "118": 1,
	        "120": 2,
	        "122": 19,
	        "124": 2
	      },
	      "98": {
	        "100": 1,
	        "104": 1,
	        "106": 1,
	        "116": 1,
	        "118": 1,
	        "120": 2
	      },
	      "100": {
	        "102": 1,
	        "104": 1,
	        "108": 1,
	        "112": 1,
	        "114": 1,
	        "116": 1,
	        "118": 1,
	        "120": 2
	      },
	      "102": {
	        "106": 1,
	        "110": 1,
	        "114": 6,
	        "116": 6,
	        "118": 2,
	        "120": 2
	      },
	      "104": {
	        "106": 1,
	        "112": 1,
	        "114": 1,
	        "120": 2
	      },
	      "106": {
	        "108": 1,
	        "114": 2,
	        "122": 2
	      },
	      "108": {
	        "110": 1,
	        "112": 3,
	        "114": 2
	      },
	      "110": {
	        "112": 2,
	        "114": 8,
	        "116": 3
	      },
	      "112": {
	        "114": 3,
	        "116": 7,
	        "118": 2,
	        "130": 4,
	        "132": 3,
	        "134": 2,
	        "136": 3,
	        "138": 1
	      },
	      "114": {
	        "114": 1,
	        "116": 8,
	        "118": 21,
	        "120": 3,
	        "122": 1,
	        "124": 2,
	        "126": 2,
	        "128": 5,
	        "130": 1,
	        "134": 1,
	        "136": 2
	      },
	      "116": {
	        "114": 2,
	        "116": 3,
	        "118": 31,
	        "120": 14,
	        "122": 9,
	        "124": 4,
	        "126": 4,
	        "132": 1
	      },
	      "118": {
	        "114": 2,
	        "116": 1,
	        "118": 4,
	        "120": 21,
	        "122": 29,
	        "124": 7,
	        "128": 1,
	        "130": 3,
	        "136": 1
	      },
	      "120": {
	        "116": 1,
	        "120": 3,
	        "122": 24,
	        "124": 21,
	        "126": 4,
	        "128": 2,
	        "136": 1
	      },
	      "122": {
	        "114": 1,
	        "122": 4,
	        "124": 23,
	        "126": 22,
	        "128": 7,
	        "138": 1
	      },
	      "124": {
	        "110": 1,
	        "112": 1,
	        "122": 1,
	        "124": 3,
	        "126": 8,
	        "128": 17,
	        "130": 2
	      },
	      "126": {
	        "108": 1,
	        "122": 1,
	        "126": 2,
	        "128": 5,
	        "130": 5,
	        "136": 1
	      },
	      "128": {
	        "108": 1,
	        "128": 3,
	        "130": 1,
	        "136": 1
	      },
	      "130": {
	        "86": 1,
	        "108": 1,
	        "122": 1,
	        "132": 1,
	        "134": 1
	      },
	      "132": {
	        "108": 1,
	        "120": 1,
	        "130": 1,
	        "132": 1
	      },
	      "134": {
	        "86": 1,
	        "88": 1,
	        "94": 5,
	        "120": 1,
	        "130": 1
	      },
	      "136": {
	        "94": 1,
	        "108": 1,
	        "118": 1
	      },
	      "138": {
	        "86": 1,
	        "90": 1,
	        "96": 1,
	        "108": 1,
	        "116": 1
	      },
	      "140": {
	        "98": 1,
	        "108": 1,
	        "114": 1,
	        "116": 4,
	        "118": 15
	      },
	      "142": {
	        "86": 1,
	        "102": 1,
	        "108": 1,
	        "114": 1,
	        "116": 1
	      },
	      "144": {
	        "102": 1,
	        "104": 1,
	        "106": 2,
	        "108": 2,
	        "110": 1,
	        "112": 2,
	        "114": 4
	      },
	      "146": {
	        "86": 1,
	        "98": 6,
	        "100": 1,
	        "110": 2,
	        "112": 2,
	        "114": 2
	      },
	      "148": {
	        "96": 1,
	        "98": 2,
	        "110": 1,
	        "112": 1
	      },
	      "150": {
	        "86": 1,
	        "98": 3,
	        "110": 2
	      },
	      "152": {
	        "86": 1,
	        "88": 1,
	        "98": 2,
	        "100": 1,
	        "108": 1
	      },
	      "154": {
	        "88": 2,
	        "90": 2,
	        "92": 1,
	        "96": 2,
	        "100": 1,
	        "102": 1,
	        "104": 1,
	        "106": 1
	      },
	      "156": {
	        "92": 2,
	        "94": 1,
	        "96": 2,
	        "102": 1,
	        "108": 1,
	        "110": 1
	      },
	      "158": {
	        "100": 30,
	        "102": 1,
	        "104": 3,
	        "108": 1
	      }
	    },
	    "last_hits": 105,
	    "leaver_status": 0,
	    "level": 22,
	    "lh_t": [0, 0, 3, 7, 8, 8, 10, 12, 14, 16, 18, 24, 26, 27, 32, 32, 32, 37, 41, 44, 51, 51, 59, 65, 73, 73, 73, 75, 75, 75, 84, 85, 88, 90, 94, 94, 94, 99, 100, 104, 104, 105, 105, 105, 105, 105, 105],
	    "life_state": {
	      "0": 2367,
	      "1": 16,
	      "2": 389
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2098,
	      "max": true,
	      "inflictor": null,
	      "unit": "npc_dota_hero_tusk",
	      "key": "npc_dota_hero_witch_doctor",
	      "value": 1324,
	      "slot": 2,
	      "player_slot": 2
	    },
	    "multi_kills": {
	      "2": 1
	    },
	    "obs": {},
	    "obs_left_log": [],
	    "obs_log": [],
	    "obs_placed": 0,
	    "party_id": 0,
	    "permanent_buffs": [],
	    "purchase": {
	      "bottle": 1,
	      "boots": 1,
	      "tpscroll": 12,
	      "circlet": 1,
	      "gauntlets": 1,
	      "bracer": 1,
	      "recipe_bracer": 1,
	      "infused_raindrop": 1,
	      "blades_of_attack": 2,
	      "phase_boots": 1,
	      "mithril_hammer": 3,
	      "blight_stone": 1,
	      "desolator": 1,
	      "claymore": 1,
	      "invis_sword": 1,
	      "shadow_amulet": 1,
	      "dust": 2,
	      "ultimate_orb": 1,
	      "recipe_silver_edge": 1,
	      "silver_edge": 1,
	      "ogre_axe": 1,
	      "black_king_bar": 1,
	      "recipe_black_king_bar": 1,
	      "ward_sentry": null
	    },
	    "purchase_log": [{
	      "time": 197,
	      "key": "bottle"
	    }, {
	      "time": 313,
	      "key": "boots"
	    }, {
	      "time": 322,
	      "key": "tpscroll"
	    }, {
	      "time": 434,
	      "key": "circlet"
	    }, {
	      "time": 434,
	      "key": "gauntlets"
	    }, {
	      "time": 434,
	      "key": "bracer"
	    }, {
	      "time": 436,
	      "key": "infused_raindrop"
	    }, {
	      "time": 437,
	      "key": "tpscroll"
	    }, {
	      "time": 546,
	      "key": "blades_of_attack"
	    }, {
	      "time": 546,
	      "key": "blades_of_attack"
	    }, {
	      "time": 550,
	      "key": "phase_boots"
	    }, {
	      "time": 577,
	      "key": "tpscroll"
	    }, {
	      "time": 646,
	      "key": "tpscroll"
	    }, {
	      "time": 773,
	      "key": "mithril_hammer"
	    }, {
	      "time": 792,
	      "key": "tpscroll"
	    }, {
	      "time": 919,
	      "key": "tpscroll"
	    }, {
	      "time": 985,
	      "key": "tpscroll"
	    }, {
	      "time": 1127,
	      "key": "mithril_hammer"
	    }, {
	      "time": 1206,
	      "key": "blight_stone"
	    }, {
	      "time": 1208,
	      "key": "tpscroll"
	    }, {
	      "time": 1223,
	      "key": "desolator"
	    }, {
	      "time": 1276,
	      "key": "claymore"
	    }, {
	      "time": 1346,
	      "key": "invis_sword"
	    }, {
	      "time": 1346,
	      "key": "shadow_amulet"
	    }, {
	      "time": 1357,
	      "key": "tpscroll"
	    }, {
	      "time": 1488,
	      "key": "tpscroll"
	    }, {
	      "time": 1491,
	      "key": "dust"
	    }, {
	      "time": 1668,
	      "key": "ultimate_orb"
	    }, {
	      "time": 1679,
	      "key": "tpscroll"
	    }, {
	      "time": 1684,
	      "key": "silver_edge"
	    }, {
	      "time": 1937,
	      "key": "tpscroll"
	    }, {
	      "time": 2273,
	      "key": "ogre_axe"
	    }, {
	      "time": 2273,
	      "key": "mithril_hammer"
	    }, {
	      "time": 2273,
	      "key": "black_king_bar"
	    }],
	    "rune_pickups": 14,
	    "runes": {},
	    "runes_log": [],
	    "sen": {},
	    "sen_left_log": [],
	    "sen_log": [],
	    "sen_placed": 0,
	    "stuns": 50.553223,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 411,
	    "xp_per_min": 502,
	    "xp_reasons": {
	      "0": 1385,
	      "1": 12163,
	      "2": 8439
	    },
	    "xp_t": [0, 135, 585, 1057, 1471, 1651, 2099, 2626, 3236, 3682, 4146, 4483, 4649, 5300, 5705, 5981, 6093, 6363, 7694, 7871, 9130, 9449, 10298, 11794, 12183, 13526, 14405, 16119, 16159, 16159, 17857, 18415, 18798, 18902, 19027, 19934, 20001, 20477, 20487, 20554, 20554, 21841, 21841, 21983, 21983, 21983, 21983],
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": true,
	    "win": 0,
	    "lose": 1,
	    "total_gold": 18025,
	    "total_xp": 21962,
	    "kills_per_min": 0.38857142857142857,
	    "kda": 2,
	    "abandons": 0,
	    "neutral_kills": 13,
	    "tower_kills": 0,
	    "courier_kills": 0,
	    "lane_kills": 91,
	    "hero_kills": 16,
	    "observer_kills": 0,
	    "sentry_kills": 0,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 0,
	    "buyback_count": 0,
	    "observer_uses": 0,
	    "sentry_uses": 0,
	    "lane_efficiency": 0.6960378474275577,
	    "lane_efficiency_pct": 69,
	    "lane": 2,
	    "lane_role": 2,
	    "purchase_time": {
	      "bottle": 197,
	      "boots": 313,
	      "tpscroll": 12347,
	      "circlet": 434,
	      "gauntlets": 434,
	      "bracer": 434,
	      "infused_raindrop": 436,
	      "blades_of_attack": 1092,
	      "phase_boots": 550,
	      "mithril_hammer": 4173,
	      "blight_stone": 1206,
	      "desolator": 1223,
	      "claymore": 1276,
	      "invis_sword": 1346,
	      "shadow_amulet": 1346,
	      "dust": 1491,
	      "ultimate_orb": 1668,
	      "silver_edge": 1684,
	      "ogre_axe": 2273,
	      "black_king_bar": 2273
	    },
	    "first_purchase_time": {
	      "bottle": 197,
	      "boots": 313,
	      "tpscroll": 322,
	      "circlet": 434,
	      "gauntlets": 434,
	      "bracer": 434,
	      "infused_raindrop": 436,
	      "blades_of_attack": 546,
	      "phase_boots": 550,
	      "mithril_hammer": 773,
	      "blight_stone": 1206,
	      "desolator": 1223,
	      "claymore": 1276,
	      "invis_sword": 1346,
	      "shadow_amulet": 1346,
	      "dust": 1491,
	      "ultimate_orb": 1668,
	      "silver_edge": 1684,
	      "ogre_axe": 2273,
	      "black_king_bar": 2273
	    },
	    "item_win": {
	      "bottle": 0,
	      "boots": 0,
	      "tpscroll": 0,
	      "circlet": 0,
	      "gauntlets": 0,
	      "bracer": 0,
	      "infused_raindrop": 0,
	      "blades_of_attack": 0,
	      "phase_boots": 0,
	      "mithril_hammer": 0,
	      "blight_stone": 0,
	      "desolator": 0,
	      "claymore": 0,
	      "invis_sword": 0,
	      "shadow_amulet": 0,
	      "dust": 0,
	      "ultimate_orb": 0,
	      "silver_edge": 0,
	      "ogre_axe": 0,
	      "black_king_bar": 0
	    },
	    "item_usage": {
	      "bottle": 1,
	      "boots": 1,
	      "tpscroll": 1,
	      "circlet": 1,
	      "gauntlets": 1,
	      "bracer": 1,
	      "infused_raindrop": 1,
	      "blades_of_attack": 1,
	      "phase_boots": 1,
	      "mithril_hammer": 1,
	      "blight_stone": 1,
	      "desolator": 1,
	      "claymore": 1,
	      "invis_sword": 1,
	      "shadow_amulet": 1,
	      "dust": 1,
	      "ultimate_orb": 1,
	      "silver_edge": 1,
	      "ogre_axe": 1,
	      "black_king_bar": 1
	    },
	    "purchase_ward_sentry": null,
	    "purchase_tpscroll": 12,
	    "actions_per_min": 186,
	    "life_state_dead": 405,
	    "solo_competitive_rank": null,
	    "cosmetics": [{
	      "item_id": 8185,
	      "name": "Broken Tusk of the Barrier Rogue",
	      "prefab": "wearable",
	      "creation_date": "2015-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/tuskarr/barrierrogue_tusk_neck/barrierrogue_tusk_neck",
	      "image_path": "icons/econ/items/tuskarr/barrierrogue_tusk_neck/barrierrogue_tusk_neck.7b4f05b9d8e6b43012f0f63c806fcdd8ac5f13a4.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Broken_Tusk_of_the_Barrier_Rogue",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_Tusk",
	      "used_by_heroes": "npc_dota_hero_tusk"
	    }, {
	      "item_id": 8200,
	      "name": "Pack of the Barrier Rogue",
	      "prefab": "wearable",
	      "creation_date": "2015-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/tuskarr/barrierrogue_tusk_back/barrierrogue_tusk_back",
	      "image_path": "icons/econ/items/tuskarr/barrierrogue_tusk_back/barrierrogue_tusk_back.ac494bb6a9535c2c8fce28b811ccb6618c97e747.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Pack_of_the_Barrier_Rogue",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_Pack",
	      "used_by_heroes": "npc_dota_hero_tusk"
	    }, {
	      "item_id": 9822,
	      "name": "Sigil of the Barrier Rogue",
	      "prefab": "wearable",
	      "creation_date": "2015-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/tuskarr/sigil/barrierrogue_tusk_sigil/barrierrogue_tusk_sigil_npc_dota_tusk_frozen_sigil",
	      "image_path": "icons/econ/items/tuskarr/sigil/barrierrogue_tusk_sigil/barrierrogue_tusk_sigil_npc_dota_tusk_frozen_sigil.5930f4f5e05dd17365ce870a32770bcdb44b88e6.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Sigil_of_the_Barrier_Rogue",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_Sigil",
	      "used_by_heroes": "npc_dota_hero_tusk"
	    }, {
	      "item_id": 9823,
	      "name": "Pauldron of the Barrier Rogue",
	      "prefab": "wearable",
	      "creation_date": "2015-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/tuskarr/barrierrogue_tusk_shoulder/barrierrogue_tusk_shoulder",
	      "image_path": "icons/econ/items/tuskarr/barrierrogue_tusk_shoulder/barrierrogue_tusk_shoulder.6d8dd12357a8239594038c41ba864fb248aedc5e.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Pauldron_of_the_Barrier_Rogue",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_Pauldron",
	      "used_by_heroes": "npc_dota_hero_tusk"
	    }, {
	      "item_id": 9824,
	      "name": "Scar of the Barrier Rogue",
	      "prefab": "wearable",
	      "creation_date": "2015-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/tuskarr/barrierrogue_tusk_head/barrierrogue_tusk_head",
	      "image_path": "icons/econ/items/tuskarr/barrierrogue_tusk_head/barrierrogue_tusk_head.bba709db504fca94bafa80fd8dffb0ab7ccbd36d.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Scar_of_the_Barrier_Rogue",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_Scar",
	      "used_by_heroes": "npc_dota_hero_tusk"
	    }, {
	      "item_id": 9825,
	      "name": "Cannon Punch of the Barrier Rogue",
	      "prefab": "wearable",
	      "creation_date": "2015-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/tuskarr/barrierrogue_tusk_arns/barrierrogue_tusk_arns",
	      "image_path": "icons/econ/items/tuskarr/barrierrogue_tusk_arns/barrierrogue_tusk_arns.f7079dd278102c5361cf854f9d869f1d30f01796.png",
	      "item_description": "#DOTA_Item_Desc_Cannon_Punch_of_the_Barrier_Rogue",
	      "item_name": "#DOTA_Item_Cannon_Punch_of_the_Barrier_Rogue",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_Cannon",
	      "used_by_heroes": "npc_dota_hero_tusk"
	    }, {
	      "item_id": 9826,
	      "name": "Maul of the Barrier Rogue",
	      "prefab": "wearable",
	      "creation_date": "2015-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/tuskarr/barrierrogue_tusk_weapon/barrierrogue_tusk_weapon",
	      "image_path": "icons/econ/items/tuskarr/barrierrogue_tusk_weapon/barrierrogue_tusk_weapon.71d037f4101c2584c7a998b6f6b1e375bb993a70.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Maul_of_the_Barrier_Rogue",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_Maul",
	      "used_by_heroes": "npc_dota_hero_tusk"
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 412,
	        "pct": 0.6442687747035574
	      },
	      "xp_per_min": {
	        "raw": 502,
	        "pct": 0.6648221343873518
	      },
	      "kills_per_min": {
	        "raw": 0.38857142857142857,
	        "pct": 0.9276393831553974
	      },
	      "last_hits_per_min": {
	        "raw": 2.4,
	        "pct": 0.7508896797153025
	      },
	      "hero_damage_per_min": {
	        "raw": 742.7199999999999,
	        "pct": 0.941083432186635
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.8335310399367339
	      },
	      "tower_damage": {
	        "raw": 411,
	        "pct": 0.5462450592885375
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 3,
	    "ability_upgrades_arr": [5048, 5051, 5050, 5051, 5051, 5049, 5051, 5048, 5048, 5048, 5050, 5049, 5050, 5050, 6014, 5948],
	    "ability_uses": {
	      "mirana_arrow": 54,
	      "mirana_starfall": 37,
	      "mirana_leap": 28,
	      "mirana_invis": 9
	    },
	    "account_id": null,
	    "actions": {
	      "1": 5143,
	      "2": 20,
	      "3": 47,
	      "4": 217,
	      "5": 101,
	      "6": 9,
	      "7": 2,
	      "8": 152,
	      "10": 176,
	      "11": 14,
	      "15": 60,
	      "16": 49,
	      "19": 29,
	      "27": 18
	    },
	    "additional_units": null,
	    "assists": 9,
	    "backpack_0": 0,
	    "backpack_1": 0,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 1,
	    "creeps_stacked": 3,
	    "damage": {
	      "npc_dota_hero_monkey_king": 2757,
	      "npc_dota_hero_omniknight": 2068,
	      "npc_dota_creep_badguys_melee": 22632,
	      "npc_dota_creep_badguys_ranged": 6970,
	      "npc_dota_hero_weaver": 2779,
	      "npc_dota_hero_witch_doctor": 1901,
	      "npc_dota_badguys_siege": 1873,
	      "npc_dota_hero_ember_spirit": 1160,
	      "npc_dota_neutral_enraged_wildkin": 1902,
	      "npc_dota_neutral_wildkin": 1815,
	      "npc_dota_neutral_ogre_mauler": 1948,
	      "npc_dota_neutral_giant_wolf": 1183,
	      "npc_dota_neutral_ogre_magi": 612,
	      "npc_dota_neutral_alpha_wolf": 601,
	      "npc_dota_neutral_satyr_trickster": 1767,
	      "npc_dota_neutral_big_thunder_lizard": 81,
	      "npc_dota_observer_wards": 371,
	      "npc_dota_neutral_centaur_outrunner": 786,
	      "npc_dota_neutral_centaur_khan": 1160,
	      "npc_dota_sentry_wards": 202,
	      "npc_dota_neutral_satyr_soulstealer": 2480,
	      "npc_dota_neutral_satyr_hellcaller": 2290,
	      "npc_dota_creep_badguys_melee_upgraded": 14087,
	      "npc_dota_creep_badguys_ranged_upgraded": 3067,
	      "npc_dota_creep_goodguys_melee": 100,
	      "npc_dota_badguys_siege_upgraded": 182
	    },
	    "damage_inflictor": {
	      "null": 1120,
	      "mirana_arrow": 4276,
	      "mirana_starfall": 5269
	    },
	    "damage_inflictor_received": {
	      "null": 7678,
	      "orb_of_venom": 46,
	      "omniknight_purification": 1184,
	      "ember_spirit_flame_guard": 303,
	      "ember_spirit_activate_fire_remnant": 1156,
	      "monkey_king_tree_dance": 283,
	      "ember_spirit_searing_chains": 1330,
	      "witch_doctor_paralyzing_cask": 282,
	      "weaver_the_swarm": 231,
	      "maelstrom": 134,
	      "weaver_shukuchi": 281,
	      "mjollnir": 551,
	      "dagon_2": 460
	    },
	    "damage_taken": {
	      "npc_dota_creep_badguys_melee": 335,
	      "npc_dota_creep_badguys_ranged": 318,
	      "npc_dota_hero_monkey_king": 4470,
	      "npc_dota_hero_omniknight": 1289,
	      "npc_dota_hero_witch_doctor": 878,
	      "npc_dota_hero_ember_spirit": 4923,
	      "npc_dota_neutral_black_dragon": 167,
	      "npc_dota_neutral_black_drake": 85,
	      "npc_dota_neutral_wildkin": 65,
	      "npc_dota_neutral_alpha_wolf": 23,
	      "npc_dota_neutral_giant_wolf": 9,
	      "npc_dota_neutral_ogre_mauler": 27,
	      "npc_dota_neutral_ogre_magi": 12,
	      "npc_dota_hero_weaver": 2764,
	      "npc_dota_neutral_enraged_wildkin": 69,
	      "npc_dota_neutral_centaur_outrunner": 18,
	      "npc_dota_neutral_centaur_khan": 274,
	      "npc_dota_neutral_satyr_hellcaller": 56,
	      "npc_dota_neutral_satyr_trickster": 4,
	      "npc_dota_neutral_satyr_soulstealer": 22,
	      "npc_dota_creep_badguys_melee_upgraded": 396,
	      "npc_dota_creep_badguys_ranged_upgraded": 250
	    },
	    "deaths": 8,
	    "denies": 1,
	    "dn_t": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	    "gold": 1143,
	    "gold_per_min": 307,
	    "gold_reasons": {
	      "0": 2059,
	      "1": -1562,
	      "11": 600,
	      "12": 2651,
	      "13": 4415
	    },
	    "gold_spent": 11455,
	    "gold_t": [0, 99, 199, 535, 731, 889, 1049, 1549, 1713, 2408, 2508, 2748, 2974, 3074, 3174, 3353, 3494, 3717, 3913, 4220, 4783, 4934, 5194, 5495, 5786, 6221, 6363, 6836, 7227, 7596, 7784, 7984, 8631, 8775, 9355, 10546, 10775, 10875, 11197, 11347, 11647, 12454, 13056, 13399, 13477, 13477, 13477],
	    "hero_damage": 10665,
	    "hero_healing": 0,
	    "hero_hits": {
	      "null": 32,
	      "mirana_arrow": 17,
	      "mirana_starfall": 30
	    },
	    "hero_id": 9,
	    "item_0": 36,
	    "item_1": 40,
	    "item_2": 100,
	    "item_3": 46,
	    "item_4": 180,
	    "item_5": 108,
	    "item_uses": {
	      "courier": 1,
	      "tango": 4,
	      "ward_observer": 7,
	      "clarity": 1,
	      "enchanted_mango": 1,
	      "tpscroll": 14,
	      "smoke_of_deceit": 3,
	      "flask": 1,
	      "arcane_boots": 19,
	      "magic_wand": 6,
	      "dust": 4,
	      "ward_sentry": 2,
	      "cyclone": 2
	    },
	    "kill_streaks": {},
	    "killed": {
	      "npc_dota_hero_monkey_king": 2,
	      "npc_dota_creep_badguys_melee": 40,
	      "npc_dota_hero_weaver": 1,
	      "npc_dota_creep_badguys_ranged": 15,
	      "npc_dota_badguys_siege": 4,
	      "npc_dota_neutral_enraged_wildkin": 2,
	      "npc_dota_neutral_wildkin": 4,
	      "npc_dota_neutral_giant_wolf": 2,
	      "npc_dota_neutral_alpha_wolf": 1,
	      "npc_dota_neutral_ogre_magi": 1,
	      "npc_dota_neutral_ogre_mauler": 2,
	      "npc_dota_neutral_satyr_trickster": 5,
	      "npc_dota_observer_wards": 2,
	      "npc_dota_neutral_centaur_outrunner": 2,
	      "npc_dota_neutral_centaur_khan": 1,
	      "npc_dota_sentry_wards": 1,
	      "npc_dota_hero_witch_doctor": 1,
	      "npc_dota_neutral_satyr_soulstealer": 4,
	      "npc_dota_neutral_satyr_hellcaller": 2,
	      "npc_dota_creep_badguys_melee_upgraded": 20,
	      "npc_dota_creep_badguys_ranged_upgraded": 4,
	      "npc_dota_creep_goodguys_melee": 1
	    },
	    "killed_by": {
	      "npc_dota_hero_monkey_king": 4,
	      "npc_dota_hero_ember_spirit": 3,
	      "npc_dota_hero_omniknight": 1
	    },
	    "kills": 4,
	    "kills_log": [{
	      "time": 169,
	      "key": "npc_dota_hero_monkey_king"
	    }, {
	      "time": 396,
	      "key": "npc_dota_hero_weaver"
	    }, {
	      "time": 509,
	      "key": "npc_dota_hero_monkey_king"
	    }, {
	      "time": 2098,
	      "key": "npc_dota_hero_witch_doctor"
	    }],
	    "lane_pos": {
	      "70": {
	        "74": 31,
	        "76": 1
	      },
	      "72": {
	        "74": 1,
	        "76": 1,
	        "78": 14
	      },
	      "74": {
	        "74": 12,
	        "76": 12
	      },
	      "76": {
	        "78": 2
	      },
	      "78": {
	        "78": 2,
	        "158": 3,
	        "162": 1,
	        "164": 1
	      },
	      "80": {
	        "144": 1,
	        "146": 3,
	        "148": 1,
	        "150": 1,
	        "152": 3,
	        "154": 1,
	        "156": 1,
	        "158": 3,
	        "160": 3,
	        "166": 2
	      },
	      "82": {
	        "78": 2,
	        "140": 2,
	        "142": 1,
	        "144": 2,
	        "150": 1,
	        "154": 1,
	        "158": 4,
	        "160": 6,
	        "166": 1
	      },
	      "84": {
	        "78": 2,
	        "138": 3,
	        "140": 1,
	        "150": 1,
	        "156": 1,
	        "164": 2
	      },
	      "86": {
	        "78": 2,
	        "136": 3,
	        "150": 1,
	        "158": 1,
	        "164": 2
	      },
	      "88": {
	        "78": 1,
	        "134": 1,
	        "136": 1,
	        "148": 1,
	        "158": 1
	      },
	      "90": {
	        "78": 2,
	        "132": 1,
	        "148": 1,
	        "158": 1
	      },
	      "92": {
	        "78": 2,
	        "130": 1,
	        "132": 1,
	        "134": 1,
	        "136": 1
	      },
	      "94": {
	        "78": 2,
	        "124": 1,
	        "126": 2,
	        "128": 2,
	        "138": 1,
	        "148": 1,
	        "158": 1
	      },
	      "96": {
	        "78": 1,
	        "122": 1,
	        "124": 1,
	        "140": 1,
	        "144": 1,
	        "146": 1,
	        "158": 1
	      },
	      "98": {
	        "78": 1,
	        "120": 2,
	        "122": 1,
	        "156": 1
	      },
	      "100": {
	        "78": 2,
	        "116": 1,
	        "118": 1
	      },
	      "102": {
	        "78": 2,
	        "114": 1,
	        "116": 1,
	        "156": 1
	      },
	      "104": {
	        "78": 1,
	        "114": 2,
	        "156": 1,
	        "158": 1
	      },
	      "106": {
	        "78": 2,
	        "114": 2,
	        "154": 1
	      },
	      "108": {
	        "78": 2,
	        "112": 1,
	        "116": 1
	      },
	      "110": {
	        "78": 2,
	        "112": 1
	      },
	      "112": {
	        "116": 1
	      },
	      "114": {
	        "80": 2,
	        "108": 1,
	        "110": 1,
	        "118": 1
	      },
	      "116": {
	        "80": 2,
	        "106": 1,
	        "118": 1
	      },
	      "118": {
	        "80": 1,
	        "82": 1,
	        "84": 1,
	        "106": 1,
	        "118": 1,
	        "120": 1
	      },
	      "120": {
	        "80": 1,
	        "86": 1,
	        "88": 1,
	        "118": 2
	      },
	      "122": {
	        "80": 1,
	        "106": 1,
	        "114": 1,
	        "116": 2,
	        "118": 1
	      },
	      "124": {
	        "80": 1,
	        "90": 1,
	        "106": 1,
	        "110": 11,
	        "112": 2,
	        "118": 1
	      },
	      "126": {
	        "80": 1,
	        "92": 1,
	        "106": 1,
	        "108": 6
	      },
	      "128": {
	        "82": 1,
	        "94": 1,
	        "106": 4
	      },
	      "130": {
	        "84": 1,
	        "96": 1,
	        "100": 1,
	        "106": 12
	      },
	      "132": {
	        "84": 1,
	        "98": 1,
	        "102": 1,
	        "104": 3,
	        "106": 2
	      },
	      "134": {
	        "86": 1,
	        "88": 1,
	        "94": 2,
	        "96": 4,
	        "98": 5,
	        "100": 4,
	        "102": 3,
	        "104": 6,
	        "106": 3
	      },
	      "136": {
	        "90": 5,
	        "94": 6,
	        "98": 15,
	        "100": 1,
	        "106": 4
	      },
	      "138": {
	        "90": 1,
	        "92": 3,
	        "96": 7,
	        "98": 1,
	        "100": 1,
	        "106": 3,
	        "108": 1,
	        "110": 2
	      },
	      "140": {
	        "90": 1,
	        "92": 2,
	        "94": 1,
	        "96": 18,
	        "100": 4,
	        "106": 1,
	        "108": 1
	      },
	      "142": {
	        "88": 1,
	        "94": 7,
	        "96": 5,
	        "98": 4,
	        "100": 5,
	        "108": 1,
	        "110": 2,
	        "112": 1,
	        "114": 1,
	        "118": 1
	      },
	      "144": {
	        "92": 1,
	        "94": 1,
	        "96": 2,
	        "98": 1,
	        "106": 1,
	        "112": 1,
	        "114": 1,
	        "116": 2,
	        "118": 1,
	        "120": 3
	      },
	      "146": {
	        "88": 1,
	        "90": 1,
	        "96": 3,
	        "100": 2,
	        "102": 1,
	        "104": 1,
	        "108": 1,
	        "112": 2,
	        "114": 3,
	        "116": 4,
	        "118": 1,
	        "120": 2
	      },
	      "148": {
	        "86": 1,
	        "88": 1,
	        "96": 2,
	        "110": 1,
	        "112": 4,
	        "114": 3,
	        "116": 3,
	        "120": 4,
	        "122": 1
	      },
	      "150": {
	        "86": 1,
	        "96": 3,
	        "112": 2,
	        "122": 3
	      },
	      "152": {
	        "84": 1,
	        "96": 3,
	        "106": 1,
	        "108": 2,
	        "124": 3,
	        "126": 3
	      },
	      "154": {
	        "82": 1,
	        "86": 1,
	        "96": 3,
	        "104": 1,
	        "110": 1,
	        "120": 1,
	        "122": 1,
	        "124": 1,
	        "126": 1,
	        "128": 3
	      },
	      "156": {
	        "82": 1,
	        "86": 1,
	        "96": 3,
	        "100": 1,
	        "102": 1,
	        "112": 1,
	        "116": 1,
	        "118": 2
	      },
	      "158": {
	        "80": 1,
	        "86": 1,
	        "96": 1,
	        "108": 1,
	        "110": 1,
	        "112": 1,
	        "114": 3,
	        "116": 2
	      },
	      "160": {
	        "96": 2,
	        "106": 1,
	        "114": 3,
	        "116": 1
	      },
	      "162": {
	        "80": 1,
	        "86": 1,
	        "96": 1,
	        "106": 1,
	        "114": 1
	      },
	      "164": {
	        "78": 1,
	        "86": 1,
	        "96": 2,
	        "106": 1
	      },
	      "166": {
	        "78": 1,
	        "86": 2,
	        "96": 2,
	        "106": 1,
	        "112": 1,
	        "114": 1
	      },
	      "168": {
	        "78": 1,
	        "86": 1,
	        "94": 1,
	        "96": 1,
	        "106": 1,
	        "110": 1
	      },
	      "170": {
	        "90": 2,
	        "92": 1,
	        "94": 1,
	        "96": 7,
	        "106": 1,
	        "108": 1,
	        "110": 3
	      },
	      "172": {
	        "80": 1,
	        "86": 1,
	        "90": 3,
	        "92": 3,
	        "94": 7,
	        "96": 1,
	        "98": 7,
	        "106": 2,
	        "108": 8
	      },
	      "174": {
	        "82": 1,
	        "88": 1,
	        "90": 1,
	        "94": 3,
	        "96": 4,
	        "98": 3
	      },
	      "176": {
	        "82": 1,
	        "90": 2,
	        "96": 3,
	        "98": 2
	      },
	      "178": {
	        "82": 1,
	        "84": 1,
	        "90": 4,
	        "92": 1,
	        "96": 2,
	        "98": 1,
	        "100": 2,
	        "102": 1
	      },
	      "180": {
	        "84": 1,
	        "86": 4,
	        "92": 1,
	        "96": 2,
	        "98": 7,
	        "100": 2,
	        "102": 1
	      },
	      "182": {
	        "86": 1,
	        "88": 11,
	        "90": 3,
	        "92": 3,
	        "94": 1,
	        "96": 2,
	        "98": 3
	      }
	    },
	    "last_hits": 112,
	    "leaver_status": 0,
	    "level": 17,
	    "lh_t": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 5, 6, 6, 8, 9, 10, 10, 13, 19, 23, 24, 25, 29, 32, 34, 35, 47, 48, 57, 69, 72, 72, 79, 80, 84, 89, 103, 112, 112, 112, 112],
	    "life_state": {
	      "0": 2505,
	      "1": 18,
	      "2": 249
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2525,
	      "max": true,
	      "inflictor": "mirana_arrow",
	      "unit": "npc_dota_hero_mirana",
	      "key": "npc_dota_hero_witch_doctor",
	      "value": 376,
	      "slot": 3,
	      "player_slot": 3
	    },
	    "multi_kills": {},
	    "obs": {
	      "86": {
	        "162": 1
	      },
	      "92": {
	        "116": 1
	      },
	      "116": {
	        "148": 1
	      },
	      "120": {
	        "92": 1
	      },
	      "132": {
	        "106": 1
	      },
	      "140": {
	        "106": 1
	      },
	      "168": {
	        "98": 1
	      }
	    },
	    "obs_left_log": [{
	      "time": 446,
	      "type": "obs_left_log",
	      "key": "[168, 98]",
	      "slot": 3,
	      "x": 168,
	      "y": 98,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 8946783,
	      "player_slot": 3
	    }, {
	      "time": 689,
	      "type": "obs_left_log",
	      "key": "[140, 106]",
	      "slot": 3,
	      "x": 140,
	      "y": 106,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 1802437,
	      "player_slot": 3
	    }, {
	      "time": 957,
	      "type": "obs_left_log",
	      "key": "[86, 162]",
	      "slot": 3,
	      "x": 86,
	      "y": 162,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 15597796,
	      "player_slot": 3
	    }, {
	      "time": 1191,
	      "type": "obs_left_log",
	      "key": "[116, 148]",
	      "slot": 3,
	      "x": 116,
	      "y": 148,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 5244773,
	      "player_slot": 3
	    }, {
	      "time": 1804,
	      "type": "obs_left_log",
	      "key": "[120, 92]",
	      "slot": 3,
	      "x": 120,
	      "y": 92,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 9471605,
	      "player_slot": 3
	    }, {
	      "time": 2220,
	      "type": "obs_left_log",
	      "key": "[132, 106]",
	      "slot": 3,
	      "x": 132,
	      "y": 106,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 12781424,
	      "player_slot": 3
	    }],
	    "obs_log": [{
	      "time": 80,
	      "type": "obs_log",
	      "key": "[168, 98]",
	      "slot": 3,
	      "x": 168,
	      "y": 98,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 8946783,
	      "player_slot": 3
	    }, {
	      "time": 323,
	      "type": "obs_log",
	      "key": "[140, 106]",
	      "slot": 3,
	      "x": 140,
	      "y": 106,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 1802437,
	      "player_slot": 3
	    }, {
	      "time": 591,
	      "type": "obs_log",
	      "key": "[86, 162]",
	      "slot": 3,
	      "x": 86,
	      "y": 162,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 15597796,
	      "player_slot": 3
	    }, {
	      "time": 825,
	      "type": "obs_log",
	      "key": "[116, 148]",
	      "slot": 3,
	      "x": 116,
	      "y": 148,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 5244773,
	      "player_slot": 3
	    }, {
	      "time": 1438,
	      "type": "obs_log",
	      "key": "[120, 92]",
	      "slot": 3,
	      "x": 120,
	      "y": 92,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 9471605,
	      "player_slot": 3
	    }, {
	      "time": 1854,
	      "type": "obs_log",
	      "key": "[132, 106]",
	      "slot": 3,
	      "x": 132,
	      "y": 106,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 12781424,
	      "player_slot": 3
	    }, {
	      "time": 2458,
	      "type": "obs_log",
	      "key": "[92, 116]",
	      "slot": 3,
	      "x": 92,
	      "y": 116,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 2606348,
	      "player_slot": 3
	    }],
	    "obs_placed": 7,
	    "party_id": 0,
	    "permanent_buffs": [],
	    "purchase": {
	      "tpscroll": 15,
	      "flying_courier": 1,
	      "boots": 1,
	      "ward_observer": 6,
	      "wind_lace": 1,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "circlet": 1,
	      "branches": 2,
	      "magic_wand": 1,
	      "magic_stick": 1,
	      "dust": 6,
	      "point_booster": 1,
	      "smoke_of_deceit": 2,
	      "ogre_axe": 1,
	      "staff_of_wizardry": 2,
	      "blade_of_alacrity": 1,
	      "ultimate_scepter": 1,
	      "ward_sentry": 2,
	      "void_stone": 1,
	      "recipe_cyclone": 1,
	      "cyclone": 1
	    },
	    "purchase_log": [{
	      "time": 86,
	      "key": "tpscroll"
	    }, {
	      "time": 198,
	      "key": "flying_courier"
	    }, {
	      "time": 298,
	      "key": "boots"
	    }, {
	      "time": 299,
	      "key": "ward_observer"
	    }, {
	      "time": 559,
	      "key": "tpscroll"
	    }, {
	      "time": 560,
	      "key": "tpscroll"
	    }, {
	      "time": 560,
	      "key": "tpscroll"
	    }, {
	      "time": 561,
	      "key": "ward_observer"
	    }, {
	      "time": 562,
	      "key": "ward_observer"
	    }, {
	      "time": 569,
	      "key": "wind_lace"
	    }, {
	      "time": 580,
	      "key": "arcane_boots"
	    }, {
	      "time": 580,
	      "key": "energy_booster"
	    }, {
	      "time": 909,
	      "key": "tpscroll"
	    }, {
	      "time": 916,
	      "key": "circlet"
	    }, {
	      "time": 916,
	      "key": "branches"
	    }, {
	      "time": 916,
	      "key": "branches"
	    }, {
	      "time": 916,
	      "key": "magic_wand"
	    }, {
	      "time": 916,
	      "key": "magic_stick"
	    }, {
	      "time": 921,
	      "key": "tpscroll"
	    }, {
	      "time": 922,
	      "key": "dust"
	    }, {
	      "time": 1109,
	      "key": "tpscroll"
	    }, {
	      "time": 1109,
	      "key": "tpscroll"
	    }, {
	      "time": 1255,
	      "key": "point_booster"
	    }, {
	      "time": 1259,
	      "key": "smoke_of_deceit"
	    }, {
	      "time": 1309,
	      "key": "tpscroll"
	    }, {
	      "time": 1406,
	      "key": "tpscroll"
	    }, {
	      "time": 1420,
	      "key": "ward_observer"
	    }, {
	      "time": 1513,
	      "key": "ogre_axe"
	    }, {
	      "time": 1641,
	      "key": "staff_of_wizardry"
	    }, {
	      "time": 1669,
	      "key": "tpscroll"
	    }, {
	      "time": 1683,
	      "key": "ward_observer"
	    }, {
	      "time": 1804,
	      "key": "tpscroll"
	    }, {
	      "time": 1912,
	      "key": "blade_of_alacrity"
	    }, {
	      "time": 1914,
	      "key": "smoke_of_deceit"
	    }, {
	      "time": 1937,
	      "key": "ultimate_scepter"
	    }, {
	      "time": 1973,
	      "key": "ward_sentry"
	    }, {
	      "time": 2027,
	      "key": "dust"
	    }, {
	      "time": 2114,
	      "key": "void_stone"
	    }, {
	      "time": 2153,
	      "key": "staff_of_wizardry"
	    }, {
	      "time": 2155,
	      "key": "tpscroll"
	    }, {
	      "time": 2264,
	      "key": "tpscroll"
	    }, {
	      "time": 2420,
	      "key": "cyclone"
	    }, {
	      "time": 2426,
	      "key": "ward_observer"
	    }, {
	      "time": 2488,
	      "key": "dust"
	    }, {
	      "time": 2571,
	      "key": "tpscroll"
	    }],
	    "rune_pickups": 17,
	    "runes": {},
	    "runes_log": [],
	    "sen": {
	      "100": {
	        "88": 1
	      },
	      "106": {
	        "80": 1
	      }
	    },
	    "sen_left_log": [{
	      "time": 2232,
	      "type": "sen_left_log",
	      "key": "[106, 80]",
	      "slot": 3,
	      "x": 106,
	      "y": 80,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 11814523,
	      "player_slot": 3
	    }, {
	      "time": 2243,
	      "type": "sen_left_log",
	      "key": "[100, 88]",
	      "slot": 3,
	      "x": 100,
	      "y": 88,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 6735818,
	      "player_slot": 3
	    }],
	    "sen_log": [{
	      "time": 1986,
	      "type": "sen_log",
	      "key": "[106, 80]",
	      "slot": 3,
	      "x": 106,
	      "y": 80,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 11814523,
	      "player_slot": 3
	    }, {
	      "time": 1997,
	      "type": "sen_log",
	      "key": "[100, 88]",
	      "slot": 3,
	      "x": 100,
	      "y": 88,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 6735818,
	      "player_slot": 3
	    }],
	    "sen_placed": 2,
	    "stuns": 69.067444,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 0,
	    "xp_per_min": 301,
	    "xp_reasons": {
	      "0": 2049,
	      "1": 4589,
	      "2": 6566
	    },
	    "xp_t": [0, 30, 225, 409, 475, 545, 667, 1060, 1168, 1525, 1525, 1726, 1781, 1825, 1943, 2310, 2332, 2525, 2769, 3089, 4033, 4153, 4153, 4551, 4907, 5241, 5390, 6573, 7032, 7397, 7530, 7664, 8018, 8229, 8678, 9984, 10185, 10185, 10613, 10703, 10995, 12307, 12914, 13113, 13203, 13203, 13203],
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": true,
	    "win": 0,
	    "lose": 1,
	    "total_gold": 13431,
	    "total_xp": 13168,
	    "kills_per_min": 0.09142857142857143,
	    "kda": 1,
	    "abandons": 0,
	    "neutral_kills": 26,
	    "tower_kills": 0,
	    "courier_kills": 0,
	    "lane_kills": 80,
	    "hero_kills": 4,
	    "observer_kills": 2,
	    "sentry_kills": 1,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 0,
	    "buyback_count": 0,
	    "observer_uses": 7,
	    "sentry_uses": 2,
	    "lane_efficiency": 0.4943820224719101,
	    "lane_efficiency_pct": 49,
	    "lane": 4,
	    "lane_role": 4,
	    "purchase_time": {
	      "tpscroll": 18991,
	      "flying_courier": 198,
	      "boots": 298,
	      "ward_observer": 6951,
	      "wind_lace": 569,
	      "arcane_boots": 580,
	      "energy_booster": 580,
	      "circlet": 916,
	      "branches": 1832,
	      "magic_wand": 916,
	      "magic_stick": 916,
	      "dust": 5437,
	      "point_booster": 1255,
	      "smoke_of_deceit": 3173,
	      "ogre_axe": 1513,
	      "staff_of_wizardry": 3794,
	      "blade_of_alacrity": 1912,
	      "ultimate_scepter": 1937,
	      "ward_sentry": 1973,
	      "void_stone": 2114,
	      "cyclone": 2420
	    },
	    "first_purchase_time": {
	      "tpscroll": 86,
	      "flying_courier": 198,
	      "boots": 298,
	      "ward_observer": 299,
	      "wind_lace": 569,
	      "arcane_boots": 580,
	      "energy_booster": 580,
	      "circlet": 916,
	      "branches": 916,
	      "magic_wand": 916,
	      "magic_stick": 916,
	      "dust": 922,
	      "point_booster": 1255,
	      "smoke_of_deceit": 1259,
	      "ogre_axe": 1513,
	      "staff_of_wizardry": 1641,
	      "blade_of_alacrity": 1912,
	      "ultimate_scepter": 1937,
	      "ward_sentry": 1973,
	      "void_stone": 2114,
	      "cyclone": 2420
	    },
	    "item_win": {
	      "tpscroll": 0,
	      "flying_courier": 0,
	      "boots": 0,
	      "ward_observer": 0,
	      "wind_lace": 0,
	      "arcane_boots": 0,
	      "energy_booster": 0,
	      "circlet": 0,
	      "branches": 0,
	      "magic_wand": 0,
	      "magic_stick": 0,
	      "dust": 0,
	      "point_booster": 0,
	      "smoke_of_deceit": 0,
	      "ogre_axe": 0,
	      "staff_of_wizardry": 0,
	      "blade_of_alacrity": 0,
	      "ultimate_scepter": 0,
	      "ward_sentry": 0,
	      "void_stone": 0,
	      "cyclone": 0
	    },
	    "item_usage": {
	      "tpscroll": 1,
	      "flying_courier": 1,
	      "boots": 1,
	      "ward_observer": 1,
	      "wind_lace": 1,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "circlet": 1,
	      "branches": 1,
	      "magic_wand": 1,
	      "magic_stick": 1,
	      "dust": 1,
	      "point_booster": 1,
	      "smoke_of_deceit": 1,
	      "ogre_axe": 1,
	      "staff_of_wizardry": 1,
	      "blade_of_alacrity": 1,
	      "ultimate_scepter": 1,
	      "ward_sentry": 1,
	      "void_stone": 1,
	      "cyclone": 1
	    },
	    "purchase_ward_observer": 6,
	    "purchase_ward_sentry": 2,
	    "purchase_tpscroll": 15,
	    "actions_per_min": 137,
	    "life_state_dead": 267,
	    "solo_competitive_rank": null,
	    "cosmetics": [{
	      "item_id": 5578,
	      "name": "Bramblehorn",
	      "prefab": "wearable",
	      "creation_date": "2013-10-31T00:00:00.000Z",
	      "image_inventory": "econ/items/mirana/bramblehorn/bramblehorn",
	      "image_path": "icons/econ/items/mirana/bramblehorn/bramblehorn.03a384ddafb659abbb55498ae05e8fe129c3ffda.png",
	      "item_description": "#DOTA_Item_Desc_Bramblehorn",
	      "item_name": "#DOTA_Item_Bramblehorn",
	      "item_rarity": "rare",
	      "item_type_name": "#DOTA_WearableType_Mount",
	      "used_by_heroes": "npc_dota_hero_mirana"
	    }, {
	      "item_id": 6155,
	      "name": "Heavenly Guardian Crest",
	      "prefab": "wearable",
	      "creation_date": "2014-02-24T00:00:00.000Z",
	      "image_inventory": "econ/items/mirana/heavenlyguardian_shoulder/heavenlyguardian_shoulder",
	      "image_path": "icons/econ/items/mirana/heavenlyguardian_shoulder/heavenlyguardian_shoulder.699f32e6d37b3633331b8c832b1314d8c7e481cd.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Heavenly_Guardian_Crest",
	      "item_rarity": null,
	      "item_type_name": "#DOTA_WearableType_Shoulders",
	      "used_by_heroes": "npc_dota_hero_mirana"
	    }, {
	      "item_id": 6157,
	      "name": "Heavenly Guardian Locks",
	      "prefab": "wearable",
	      "creation_date": "2014-02-24T00:00:00.000Z",
	      "image_inventory": "econ/items/mirana/heavenlyguardian_hair/heavenlyguardian_hair",
	      "image_path": "icons/econ/items/mirana/heavenlyguardian_hair/heavenlyguardian_hair.a4e707cf01e01b105c30415fd486e68fd784da0e.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Heavenly_Guardian_Locks",
	      "item_rarity": null,
	      "item_type_name": "#DOTA_WearableType_Hair",
	      "used_by_heroes": "npc_dota_hero_mirana"
	    }, {
	      "item_id": 10400,
	      "name": "Eye of Lyralei",
	      "prefab": "ward",
	      "creation_date": "2013-10-29T00:00:00.000Z",
	      "image_inventory": "econ/items/wards/eye_of_lyralei/eye_of_lyralei_npc_dota_observer_wards",
	      "image_path": "icons/econ/items/wards/eye_of_lyralei/eye_of_lyralei_npc_dota_observer_wards.ad047c5be573db934a65c2358498038088da2a9b.png",
	      "item_description": "#DOTA_Item_Desc_Eye_of_Lyralei",
	      "item_name": "#DOTA_Item_Eye_of_Lyralei",
	      "item_rarity": "rare",
	      "item_type_name": null,
	      "used_by_heroes": null
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 307,
	        "pct": 0.16105626263827763
	      },
	      "xp_per_min": {
	        "raw": 301,
	        "pct": 0.1005114785297966
	      },
	      "kills_per_min": {
	        "raw": 0.09142857142857143,
	        "pct": 0.2593694229625223
	      },
	      "last_hits_per_min": {
	        "raw": 2.56,
	        "pct": 0.38108268887566926
	      },
	      "hero_damage_per_min": {
	        "raw": 243.7714285714286,
	        "pct": 0.15133848899464605
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.9771564544913742
	      },
	      "tower_damage": {
	        "raw": 0,
	        "pct": 0.09444510526941834
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 4,
	    "ability_upgrades_arr": [5439, 5440, 5439, 5438, 5440, 5441, 5439, 5439, 5440, 6003, 5440, 5441, 5438],
	    "ability_uses": {
	      "ogre_magi_ignite": 35,
	      "ogre_magi_bloodlust": 73,
	      "ogre_magi_fireblast": 24
	    },
	    "account_id": null,
	    "actions": {
	      "1": 3061,
	      "2": 132,
	      "4": 291,
	      "5": 28,
	      "6": 315,
	      "8": 64,
	      "10": 27,
	      "11": 12,
	      "15": 3,
	      "16": 39,
	      "19": 5,
	      "24": 1,
	      "27": 4,
	      "31": 1,
	      "33": 27
	    },
	    "additional_units": null,
	    "assists": 9,
	    "backpack_0": 28,
	    "backpack_1": 44,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_hero_monkey_king": 3600,
	      "npc_dota_creep_goodguys_melee": 703,
	      "npc_dota_creep_badguys_ranged": 2039,
	      "npc_dota_badguys_siege": 67,
	      "npc_dota_hero_omniknight": 1119,
	      "npc_dota_hero_witch_doctor": 1412,
	      "npc_dota_creep_badguys_melee": 4641,
	      "npc_dota_hero_weaver": 633,
	      "npc_dota_hero_ember_spirit": 994,
	      "npc_dota_badguys_tower2_bot": 35,
	      "npc_dota_observer_wards": 349,
	      "npc_dota_sentry_wards": 463,
	      "npc_dota_creep_badguys_melee_upgraded": 1760,
	      "npc_dota_creep_badguys_ranged_upgraded": 202
	    },
	    "damage_inflictor": {
	      "ogre_magi_ignite": 6228,
	      "null": 396,
	      "ogre_magi_fireblast": 1134
	    },
	    "damage_inflictor_received": {
	      "null": 11690,
	      "orb_of_venom": 74,
	      "omniknight_purification": 395,
	      "witch_doctor_paralyzing_cask": 194,
	      "witch_doctor_maledict": 320,
	      "ember_spirit_searing_chains": 2251,
	      "ember_spirit_flame_guard": 538,
	      "weaver_shukuchi": 139,
	      "ember_spirit_activate_fire_remnant": 1754,
	      "maelstrom": 323,
	      "weaver_the_swarm": 91,
	      "mjollnir": 892
	    },
	    "damage_taken": {
	      "npc_dota_hero_monkey_king": 10190,
	      "npc_dota_creep_badguys_ranged": 270,
	      "npc_dota_creep_badguys_melee": 134,
	      "npc_dota_hero_omniknight": 438,
	      "npc_dota_badguys_siege": 41,
	      "npc_dota_hero_witch_doctor": 889,
	      "npc_dota_hero_ember_spirit": 6807,
	      "npc_dota_hero_weaver": 555,
	      "npc_dota_neutral_small_thunder_lizard": 108,
	      "npc_dota_neutral_big_thunder_lizard": 170,
	      "npc_dota_neutral_ogre_mauler": 95,
	      "npc_dota_neutral_ogre_magi": 54,
	      "npc_dota_neutral_black_drake": 24,
	      "npc_dota_creep_badguys_melee_upgraded": 176,
	      "npc_dota_creep_badguys_ranged_upgraded": 90
	    },
	    "deaths": 12,
	    "denies": 5,
	    "dn_t": [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
	    "gold": 807,
	    "gold_per_min": 156,
	    "gold_reasons": {
	      "0": 835,
	      "1": -1763,
	      "11": 600,
	      "12": 776,
	      "13": 903
	    },
	    "gold_spent": 5060,
	    "gold_t": [0, 99, 199, 369, 469, 569, 669, 769, 869, 969, 1118, 1218, 1318, 1535, 1717, 1985, 2135, 2235, 2678, 2778, 2958, 3140, 3612, 3712, 3812, 4072, 4272, 4372, 4607, 4707, 4807, 5168, 5268, 5368, 5560, 5660, 5760, 5958, 6058, 6158, 6288, 6588, 6688, 6788, 6866, 6866, 6866],
	    "hero_damage": 7758,
	    "hero_healing": 0,
	    "hero_hits": {
	      "ogre_magi_ignite": 199,
	      "null": 6,
	      "ogre_magi_fireblast": 22
	    },
	    "hero_id": 84,
	    "item_0": 46,
	    "item_1": 36,
	    "item_2": 0,
	    "item_3": 180,
	    "item_4": 0,
	    "item_5": 40,
	    "item_uses": {
	      "ward_observer": 9,
	      "clarity": 1,
	      "enchanted_mango": 1,
	      "flask": 1,
	      "tango": 2,
	      "tpscroll": 7,
	      "magic_stick": 8,
	      "smoke_of_deceit": 2,
	      "arcane_boots": 9,
	      "ward_dispenser": 16,
	      "dust": 1,
	      "magic_wand": 3,
	      "ward_sentry": 1
	    },
	    "kill_streaks": {},
	    "killed": {
	      "npc_dota_creep_goodguys_melee": 5,
	      "npc_dota_creep_badguys_ranged": 5,
	      "npc_dota_creep_badguys_melee": 15,
	      "npc_dota_observer_wards": 1,
	      "npc_dota_sentry_wards": 1,
	      "npc_dota_creep_badguys_melee_upgraded": 1
	    },
	    "killed_by": {
	      "npc_dota_hero_monkey_king": 7,
	      "npc_dota_hero_witch_doctor": 1,
	      "npc_dota_hero_ember_spirit": 3,
	      "npc_dota_hero_weaver": 1
	    },
	    "kills": 0,
	    "kills_log": [],
	    "lane_pos": {
	      "72": {
	        "74": 1,
	        "76": 1,
	        "78": 40
	      },
	      "74": {
	        "74": 3,
	        "76": 9,
	        "78": 28
	      },
	      "76": {
	        "74": 1,
	        "76": 28,
	        "78": 4
	      },
	      "78": {
	        "78": 2,
	        "80": 1
	      },
	      "80": {
	        "78": 1,
	        "80": 1
	      },
	      "82": {
	        "78": 1
	      },
	      "84": {
	        "78": 1,
	        "82": 1
	      },
	      "86": {
	        "78": 1,
	        "82": 1
	      },
	      "88": {
	        "78": 1,
	        "82": 1
	      },
	      "90": {
	        "78": 1,
	        "82": 1
	      },
	      "92": {
	        "78": 1,
	        "82": 1
	      },
	      "94": {
	        "78": 2,
	        "82": 1
	      },
	      "96": {
	        "78": 2,
	        "82": 1
	      },
	      "98": {
	        "78": 2
	      },
	      "100": {
	        "78": 1
	      },
	      "102": {
	        "78": 1
	      },
	      "104": {
	        "78": 2
	      },
	      "106": {
	        "78": 2
	      },
	      "108": {
	        "78": 2
	      },
	      "110": {
	        "78": 2
	      },
	      "112": {
	        "78": 2
	      },
	      "114": {
	        "78": 2
	      },
	      "116": {
	        "78": 1
	      },
	      "118": {
	        "78": 1
	      },
	      "120": {
	        "78": 2
	      },
	      "122": {
	        "78": 2
	      },
	      "124": {
	        "80": 2,
	        "108": 1,
	        "110": 2
	      },
	      "126": {
	        "80": 2,
	        "106": 1,
	        "108": 1
	      },
	      "128": {
	        "80": 2,
	        "106": 1,
	        "108": 1
	      },
	      "130": {
	        "80": 1,
	        "82": 1,
	        "94": 14,
	        "106": 1,
	        "108": 1
	      },
	      "132": {
	        "82": 1,
	        "84": 1,
	        "94": 4,
	        "104": 1,
	        "106": 2
	      },
	      "134": {
	        "82": 1,
	        "84": 1,
	        "98": 1,
	        "100": 1,
	        "102": 1,
	        "106": 1
	      },
	      "136": {
	        "82": 1,
	        "86": 1,
	        "88": 1,
	        "94": 1,
	        "98": 1,
	        "106": 1,
	        "108": 1
	      },
	      "138": {
	        "84": 1,
	        "88": 1,
	        "90": 2,
	        "92": 1,
	        "94": 1,
	        "96": 1,
	        "106": 1,
	        "108": 1
	      },
	      "140": {
	        "82": 1,
	        "84": 1,
	        "86": 2,
	        "92": 1,
	        "94": 1,
	        "96": 2,
	        "106": 2,
	        "108": 1
	      },
	      "142": {
	        "80": 1,
	        "86": 1,
	        "94": 6,
	        "106": 5,
	        "108": 1
	      },
	      "144": {
	        "78": 1,
	        "86": 1,
	        "90": 1,
	        "92": 2
	      },
	      "146": {
	        "78": 1,
	        "86": 1,
	        "88": 1,
	        "90": 1
	      },
	      "148": {
	        "78": 1,
	        "86": 1,
	        "88": 2
	      },
	      "150": {
	        "78": 1,
	        "80": 1,
	        "86": 1,
	        "88": 1
	      },
	      "152": {
	        "80": 1,
	        "86": 3
	      },
	      "154": {
	        "80": 1,
	        "86": 2,
	        "88": 1
	      },
	      "156": {
	        "80": 1,
	        "84": 1,
	        "86": 1,
	        "90": 1
	      },
	      "158": {
	        "80": 1,
	        "82": 1,
	        "86": 1,
	        "90": 9
	      },
	      "160": {
	        "80": 2,
	        "82": 1,
	        "84": 1,
	        "90": 1
	      },
	      "162": {
	        "80": 2,
	        "82": 3,
	        "88": 1
	      },
	      "164": {
	        "80": 1,
	        "82": 2,
	        "84": 1,
	        "86": 2,
	        "88": 2
	      },
	      "166": {
	        "80": 11,
	        "82": 6,
	        "84": 2,
	        "88": 3
	      },
	      "168": {
	        "76": 2,
	        "78": 2,
	        "80": 9,
	        "82": 4,
	        "84": 2,
	        "86": 4,
	        "88": 1,
	        "90": 2,
	        "92": 2,
	        "94": 10,
	        "96": 4,
	        "98": 8,
	        "100": 5
	      },
	      "170": {
	        "80": 3,
	        "82": 5,
	        "84": 2,
	        "86": 4,
	        "88": 4,
	        "90": 4,
	        "92": 5,
	        "94": 5,
	        "96": 13,
	        "98": 8,
	        "100": 9,
	        "102": 9
	      },
	      "172": {
	        "80": 1,
	        "82": 5,
	        "84": 7,
	        "86": 8,
	        "88": 5,
	        "90": 4,
	        "92": 1,
	        "94": 1,
	        "96": 2,
	        "98": 4,
	        "100": 2,
	        "102": 10,
	        "104": 2
	      },
	      "174": {
	        "82": 2,
	        "84": 2,
	        "86": 5,
	        "88": 17,
	        "90": 16,
	        "92": 5,
	        "94": 8,
	        "96": 7,
	        "98": 7,
	        "100": 8,
	        "102": 9,
	        "104": 2,
	        "106": 1
	      },
	      "176": {
	        "88": 5,
	        "90": 6,
	        "92": 11,
	        "94": 6,
	        "96": 5,
	        "98": 8,
	        "100": 5,
	        "102": 10,
	        "104": 4,
	        "106": 1
	      },
	      "178": {
	        "92": 5,
	        "94": 5,
	        "96": 4,
	        "98": 3,
	        "104": 1
	      },
	      "180": {
	        "94": 5,
	        "96": 3
	      },
	      "182": {
	        "94": 1,
	        "96": 3
	      },
	      "184": {
	        "96": 4
	      }
	    },
	    "last_hits": 23,
	    "leaver_status": 0,
	    "level": 13,
	    "lh_t": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 4, 6, 10, 11, 11, 11, 11, 11, 13, 13, 13, 13, 13, 14, 14, 17, 17, 17, 17, 17, 17, 20, 20, 20, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23],
	    "life_state": {
	      "0": 2392,
	      "1": 18,
	      "2": 362
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2250,
	      "max": true,
	      "inflictor": "ogre_magi_fireblast",
	      "unit": "npc_dota_hero_ogre_magi",
	      "key": "npc_dota_hero_omniknight",
	      "value": 85,
	      "slot": 4,
	      "player_slot": 4
	    },
	    "multi_kills": {},
	    "obs": {
	      "74": {
	        "108": 1
	      },
	      "92": {
	        "116": 1
	      },
	      "104": {
	        "132": 1
	      },
	      "116": {
	        "148": 1
	      },
	      "118": {
	        "92": 1
	      },
	      "120": {
	        "92": 1
	      },
	      "124": {
	        "130": 2
	      },
	      "130": {
	        "126": 1
	      },
	      "168": {
	        "120": 1
	      }
	    },
	    "obs_left_log": [{
	      "time": 1225,
	      "type": "obs_left_log",
	      "key": "[124, 130]",
	      "slot": 4,
	      "x": 124,
	      "y": 130,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 9815955,
	      "player_slot": 4
	    }, {
	      "time": 1596,
	      "type": "obs_left_log",
	      "key": "[130, 126]",
	      "slot": 4,
	      "x": 130,
	      "y": 126,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 2590626,
	      "player_slot": 4
	    }, {
	      "time": 1675,
	      "type": "obs_left_log",
	      "key": "[168, 120]",
	      "slot": 4,
	      "x": 168,
	      "y": 120,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 8275747,
	      "player_slot": 4
	    }, {
	      "time": 1696,
	      "type": "obs_left_log",
	      "key": "[124, 130]",
	      "slot": 4,
	      "x": 124,
	      "y": 130,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 7947846,
	      "player_slot": 4
	    }, {
	      "time": 1798,
	      "type": "obs_left_log",
	      "key": "[116, 148]",
	      "slot": 4,
	      "x": 116,
	      "y": 148,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 5342394,
	      "player_slot": 4
	    }, {
	      "time": 1953,
	      "type": "obs_left_log",
	      "key": "[120, 92]",
	      "slot": 4,
	      "x": 120,
	      "y": 92,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 11289777,
	      "player_slot": 4
	    }, {
	      "time": 2161,
	      "type": "obs_left_log",
	      "key": "[104, 132]",
	      "slot": 4,
	      "x": 104,
	      "y": 132,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 12552189,
	      "player_slot": 4
	    }, {
	      "time": 2245,
	      "type": "obs_left_log",
	      "key": "[92, 116]",
	      "slot": 4,
	      "x": 92,
	      "y": 116,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 8456170,
	      "player_slot": 4
	    }, {
	      "time": 2385,
	      "type": "obs_left_log",
	      "key": "[118, 92]",
	      "slot": 4,
	      "x": 118,
	      "y": 92,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 6341740,
	      "player_slot": 4
	    }, {
	      "time": 2528,
	      "type": "obs_left_log",
	      "key": "[74, 108]",
	      "slot": 4,
	      "x": 74,
	      "y": 108,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 4277321,
	      "player_slot": 4
	    }],
	    "obs_log": [{
	      "time": 858,
	      "type": "obs_log",
	      "key": "[124, 130]",
	      "slot": 4,
	      "x": 124,
	      "y": 130,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 9815955,
	      "player_slot": 4
	    }, {
	      "time": 1229,
	      "type": "obs_log",
	      "key": "[130, 126]",
	      "slot": 4,
	      "x": 130,
	      "y": 126,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 2590626,
	      "player_slot": 4
	    }, {
	      "time": 1309,
	      "type": "obs_log",
	      "key": "[168, 120]",
	      "slot": 4,
	      "x": 168,
	      "y": 120,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 8275747,
	      "player_slot": 4
	    }, {
	      "time": 1431,
	      "type": "obs_log",
	      "key": "[116, 148]",
	      "slot": 4,
	      "x": 116,
	      "y": 148,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 5342394,
	      "player_slot": 4
	    }, {
	      "time": 1670,
	      "type": "obs_log",
	      "key": "[124, 130]",
	      "slot": 4,
	      "x": 124,
	      "y": 130,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 7947846,
	      "player_slot": 4
	    }, {
	      "time": 1794,
	      "type": "obs_log",
	      "key": "[104, 132]",
	      "slot": 4,
	      "x": 104,
	      "y": 132,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 12552189,
	      "player_slot": 4
	    }, {
	      "time": 1884,
	      "type": "obs_log",
	      "key": "[120, 92]",
	      "slot": 4,
	      "x": 120,
	      "y": 92,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 11289777,
	      "player_slot": 4
	    }, {
	      "time": 2018,
	      "type": "obs_log",
	      "key": "[118, 92]",
	      "slot": 4,
	      "x": 118,
	      "y": 92,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 6341740,
	      "player_slot": 4
	    }, {
	      "time": 2125,
	      "type": "obs_log",
	      "key": "[92, 116]",
	      "slot": 4,
	      "x": 92,
	      "y": 116,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 8456170,
	      "player_slot": 4
	    }, {
	      "time": 2517,
	      "type": "obs_log",
	      "key": "[74, 108]",
	      "slot": 4,
	      "x": 74,
	      "y": 108,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 4277321,
	      "player_slot": 4
	    }],
	    "obs_placed": 10,
	    "party_id": 0,
	    "permanent_buffs": [],
	    "purchase": {
	      "sobi_mask": 1,
	      "magic_stick": 1,
	      "tpscroll": 8,
	      "boots": 1,
	      "ward_observer": 10,
	      "dust": 4,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "circlet": 1,
	      "branches": 2,
	      "magic_wand": 1,
	      "ward_sentry": 10,
	      "ward_dispenser": 6,
	      "smoke_of_deceit": 1
	    },
	    "purchase_log": [{
	      "time": 189,
	      "key": "sobi_mask"
	    }, {
	      "time": 226,
	      "key": "magic_stick"
	    }, {
	      "time": 274,
	      "key": "tpscroll"
	    }, {
	      "time": 390,
	      "key": "tpscroll"
	    }, {
	      "time": 519,
	      "key": "tpscroll"
	    }, {
	      "time": 661,
	      "key": "tpscroll"
	    }, {
	      "time": 759,
	      "key": "boots"
	    }, {
	      "time": 830,
	      "key": "ward_observer"
	    }, {
	      "time": 830,
	      "key": "ward_observer"
	    }, {
	      "time": 832,
	      "key": "ward_observer"
	    }, {
	      "time": 945,
	      "key": "tpscroll"
	    }, {
	      "time": 945,
	      "key": "tpscroll"
	    }, {
	      "time": 1233,
	      "key": "ward_observer"
	    }, {
	      "time": 1233,
	      "key": "ward_observer"
	    }, {
	      "time": 1243,
	      "key": "dust"
	    }, {
	      "time": 1289,
	      "key": "arcane_boots"
	    }, {
	      "time": 1289,
	      "key": "energy_booster"
	    }, {
	      "time": 1388,
	      "key": "ward_observer"
	    }, {
	      "time": 1397,
	      "key": "tpscroll"
	    }, {
	      "time": 1397,
	      "key": "tpscroll"
	    }, {
	      "time": 1405,
	      "key": "circlet"
	    }, {
	      "time": 1405,
	      "key": "branches"
	    }, {
	      "time": 1405,
	      "key": "magic_wand"
	    }, {
	      "time": 1405,
	      "key": "branches"
	    }, {
	      "time": 1522,
	      "key": "ward_sentry"
	    }, {
	      "time": 1730,
	      "key": "ward_observer"
	    }, {
	      "time": 1730,
	      "key": "ward_sentry"
	    }, {
	      "time": 1869,
	      "key": "ward_observer"
	    }, {
	      "time": 1869,
	      "key": "ward_sentry"
	    }, {
	      "time": 1930,
	      "key": "dust"
	    }, {
	      "time": 2024,
	      "key": "ward_observer"
	    }, {
	      "time": 2025,
	      "key": "smoke_of_deceit"
	    }, {
	      "time": 2025,
	      "key": "ward_sentry"
	    }, {
	      "time": 2226,
	      "key": "ward_observer"
	    }, {
	      "time": 2226,
	      "key": "ward_sentry"
	    }],
	    "rune_pickups": 1,
	    "runes": {},
	    "runes_log": [],
	    "sen": {
	      "76": {
	        "108": 1
	      },
	      "100": {
	        "118": 1
	      },
	      "102": {
	        "118": 1
	      },
	      "104": {
	        "132": 1
	      },
	      "106": {
	        "100": 1,
	        "122": 1
	      },
	      "118": {
	        "120": 1
	      },
	      "120": {
	        "92": 1,
	        "122": 1
	      },
	      "122": {
	        "94": 1
	      }
	    },
	    "sen_left_log": [{
	      "time": 1786,
	      "type": "sen_left_log",
	      "key": "[122, 94]",
	      "slot": 4,
	      "x": 122,
	      "y": 94,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 5735708,
	      "player_slot": 4
	    }, {
	      "time": 1901,
	      "type": "sen_left_log",
	      "key": "[120, 122]",
	      "slot": 4,
	      "x": 120,
	      "y": 122,
	      "z": 128,
	      "entityleft": true,
	      "ehandle": 1525634,
	      "player_slot": 4
	    }, {
	      "time": 2039,
	      "type": "sen_left_log",
	      "key": "[104, 132]",
	      "slot": 4,
	      "x": 104,
	      "y": 132,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 12666866,
	      "player_slot": 4
	    }, {
	      "time": 2083,
	      "type": "sen_left_log",
	      "key": "[106, 122]",
	      "slot": 4,
	      "x": 106,
	      "y": 122,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 15566477,
	      "player_slot": 4
	    }, {
	      "time": 2247,
	      "type": "sen_left_log",
	      "key": "[100, 118]",
	      "slot": 4,
	      "x": 100,
	      "y": 118,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 13910520,
	      "player_slot": 4
	    }, {
	      "time": 2251,
	      "type": "sen_left_log",
	      "key": "[106, 100]",
	      "slot": 4,
	      "x": 106,
	      "y": 100,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 3507870,
	      "player_slot": 4
	    }, {
	      "time": 2259,
	      "type": "sen_left_log",
	      "key": "[120, 92]",
	      "slot": 4,
	      "x": 120,
	      "y": 92,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 6046842,
	      "player_slot": 4
	    }, {
	      "time": 2261,
	      "type": "sen_left_log",
	      "key": "[102, 118]",
	      "slot": 4,
	      "x": 102,
	      "y": 118,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 8455798,
	      "player_slot": 4
	    }, {
	      "time": 2268,
	      "type": "sen_left_log",
	      "key": "[118, 120]",
	      "slot": 4,
	      "x": 118,
	      "y": 120,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 8931135,
	      "player_slot": 4
	    }, {
	      "time": 2543,
	      "type": "sen_left_log",
	      "key": "[76, 108]",
	      "slot": 4,
	      "x": 76,
	      "y": 108,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 4605533,
	      "player_slot": 4
	    }],
	    "sen_log": [{
	      "time": 1539,
	      "type": "sen_log",
	      "key": "[122, 94]",
	      "slot": 4,
	      "x": 122,
	      "y": 94,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 5735708,
	      "player_slot": 4
	    }, {
	      "time": 1654,
	      "type": "sen_log",
	      "key": "[120, 122]",
	      "slot": 4,
	      "x": 120,
	      "y": 122,
	      "z": 128,
	      "entityleft": false,
	      "ehandle": 1525634,
	      "player_slot": 4
	    }, {
	      "time": 1792,
	      "type": "sen_log",
	      "key": "[104, 132]",
	      "slot": 4,
	      "x": 104,
	      "y": 132,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 12666866,
	      "player_slot": 4
	    }, {
	      "time": 1837,
	      "type": "sen_log",
	      "key": "[106, 122]",
	      "slot": 4,
	      "x": 106,
	      "y": 122,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 15566477,
	      "player_slot": 4
	    }, {
	      "time": 2005,
	      "type": "sen_log",
	      "key": "[106, 100]",
	      "slot": 4,
	      "x": 106,
	      "y": 100,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 3507870,
	      "player_slot": 4
	    }, {
	      "time": 2013,
	      "type": "sen_log",
	      "key": "[120, 92]",
	      "slot": 4,
	      "x": 120,
	      "y": 92,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 6046842,
	      "player_slot": 4
	    }, {
	      "time": 2122,
	      "type": "sen_log",
	      "key": "[100, 118]",
	      "slot": 4,
	      "x": 100,
	      "y": 118,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 13910520,
	      "player_slot": 4
	    }, {
	      "time": 2213,
	      "type": "sen_log",
	      "key": "[118, 120]",
	      "slot": 4,
	      "x": 118,
	      "y": 120,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 8931135,
	      "player_slot": 4
	    }, {
	      "time": 2244,
	      "type": "sen_log",
	      "key": "[102, 118]",
	      "slot": 4,
	      "x": 102,
	      "y": 118,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 8455798,
	      "player_slot": 4
	    }, {
	      "time": 2516,
	      "type": "sen_log",
	      "key": "[76, 108]",
	      "slot": 4,
	      "x": 76,
	      "y": 108,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 4605533,
	      "player_slot": 4
	    }],
	    "sen_placed": 10,
	    "stuns": 28.031128,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 35,
	    "xp_per_min": 186,
	    "xp_reasons": {
	      "0": 262,
	      "1": 1756,
	      "2": 6138
	    },
	    "xp_t": [0, 30, 225, 459, 569, 635, 701, 701, 1148, 1148, 1259, 1281, 1336, 1696, 1836, 2241, 2556, 2906, 3674, 3928, 3994, 4181, 4955, 4955, 5043, 5043, 5068, 5185, 5545, 5766, 5788, 6522, 6729, 6829, 7065, 7198, 7373, 7708, 7708, 7955, 8042, 8091, 8117, 8141, 8153, 8153, 8153],
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": true,
	    "win": 0,
	    "lose": 1,
	    "total_gold": 6825,
	    "total_xp": 8137,
	    "kda": 0,
	    "abandons": 0,
	    "neutral_kills": 0,
	    "tower_kills": 0,
	    "courier_kills": 0,
	    "lane_kills": 26,
	    "hero_kills": 0,
	    "observer_kills": 1,
	    "sentry_kills": 1,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 0,
	    "buyback_count": 0,
	    "observer_uses": 9,
	    "sentry_uses": 1,
	    "lane_efficiency": 0.22038241671594716,
	    "lane_efficiency_pct": 22,
	    "lane": 1,
	    "lane_role": 1,
	    "purchase_time": {
	      "sobi_mask": 189,
	      "magic_stick": 226,
	      "tpscroll": 6528,
	      "boots": 759,
	      "ward_observer": 14195,
	      "dust": 3173,
	      "arcane_boots": 1289,
	      "energy_booster": 1289,
	      "circlet": 1405,
	      "branches": 2810,
	      "magic_wand": 1405,
	      "ward_sentry": 9372,
	      "smoke_of_deceit": 2025
	    },
	    "first_purchase_time": {
	      "sobi_mask": 189,
	      "magic_stick": 226,
	      "tpscroll": 274,
	      "boots": 759,
	      "ward_observer": 830,
	      "dust": 1243,
	      "arcane_boots": 1289,
	      "energy_booster": 1289,
	      "circlet": 1405,
	      "branches": 1405,
	      "magic_wand": 1405,
	      "ward_sentry": 1522,
	      "smoke_of_deceit": 2025
	    },
	    "item_win": {
	      "sobi_mask": 0,
	      "magic_stick": 0,
	      "tpscroll": 0,
	      "boots": 0,
	      "ward_observer": 0,
	      "dust": 0,
	      "arcane_boots": 0,
	      "energy_booster": 0,
	      "circlet": 0,
	      "branches": 0,
	      "magic_wand": 0,
	      "ward_sentry": 0,
	      "smoke_of_deceit": 0
	    },
	    "item_usage": {
	      "sobi_mask": 1,
	      "magic_stick": 1,
	      "tpscroll": 1,
	      "boots": 1,
	      "ward_observer": 1,
	      "dust": 1,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "circlet": 1,
	      "branches": 1,
	      "magic_wand": 1,
	      "ward_sentry": 1,
	      "smoke_of_deceit": 1
	    },
	    "purchase_ward_observer": 10,
	    "purchase_ward_sentry": 10,
	    "purchase_tpscroll": 8,
	    "actions_per_min": 91,
	    "life_state_dead": 380,
	    "solo_competitive_rank": null,
	    "cosmetics": [{
	      "item_id": 11903,
	      "name": "Starecrow",
	      "prefab": "ward",
	      "creation_date": "2016-09-23T00:00:00.000Z",
	      "image_inventory": "econ/items/wards/relentless_warden_ward/relentless_warden_ward_npc_dota_observer_wards",
	      "image_path": "icons/econ/items/wards/relentless_warden_ward/relentless_warden_ward_npc_dota_observer_wards.5d80a8388a0c41f6640c515b28b886b3f710b15b.png",
	      "item_description": "#DOTA_Item_Desc_Starecrow",
	      "item_name": "#DOTA_Item_Starecrow",
	      "item_rarity": "rare",
	      "item_type_name": "#DOTA_WearableType_Weapon",
	      "used_by_heroes": null
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 156,
	        "pct": 0.01278857332668992
	      },
	      "xp_per_min": {
	        "raw": 186,
	        "pct": 0.030061451586115263
	      },
	      "kills_per_min": {
	        "raw": 0,
	        "pct": 0.05465116279069768
	      },
	      "last_hits_per_min": {
	        "raw": 0.5257142857142858,
	        "pct": 0.179734219269103
	      },
	      "hero_damage_per_min": {
	        "raw": 177.3257142857143,
	        "pct": 0.12940199335548172
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.7089700996677741
	      },
	      "tower_damage": {
	        "raw": 35,
	        "pct": 0.2190666002325195
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 128,
	    "ability_upgrades_arr": [5290, 5291, 5290, 5289, 5290, 5292, 5290, 5289, 5289, 5289, 6200, 5292, 5291, 5291, 5291, 6009, 5292, 5959, 6131],
	    "ability_uses": {
	      "weaver_shukuchi": 151,
	      "weaver_the_swarm": 28,
	      "weaver_time_lapse": 5
	    },
	    "account_id": 33225134,
	    "actions": {
	      "1": 5145,
	      "2": 127,
	      "3": 5,
	      "4": 737,
	      "5": 35,
	      "6": 1,
	      "7": 4,
	      "8": 199,
	      "9": 2,
	      "11": 15,
	      "13": 1,
	      "14": 2,
	      "15": 6,
	      "16": 30,
	      "17": 2,
	      "19": 9,
	      "24": 1,
	      "27": 1
	    },
	    "additional_units": null,
	    "assists": 23,
	    "backpack_0": 16,
	    "backpack_1": 212,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_creep_badguys_melee": 244,
	      "npc_dota_creep_goodguys_melee": 67391,
	      "npc_dota_creep_goodguys_ranged": 19149,
	      "npc_dota_hero_bristleback": 8342,
	      "npc_dota_goodguys_siege": 3501,
	      "npc_dota_creep_badguys_ranged": 478,
	      "npc_dota_neutral_forest_troll_berserker": 1658,
	      "npc_dota_neutral_forest_troll_high_priest": 513,
	      "illusion_npc_dota_hero_spectre": 7365,
	      "npc_dota_hero_spectre": 4244,
	      "npc_dota_hero_tusk": 4874,
	      "npc_dota_neutral_enraged_wildkin": 2094,
	      "npc_dota_neutral_wildkin": 1624,
	      "npc_dota_neutral_ghost": 617,
	      "npc_dota_neutral_fel_beast": 884,
	      "npc_dota_goodguys_tower1_top": 584,
	      "npc_dota_neutral_kobold_taskmaster": 416,
	      "npc_dota_neutral_black_dragon": 2210,
	      "npc_dota_neutral_black_drake": 2788,
	      "npc_dota_goodguys_tower2_top": 643,
	      "npc_dota_hero_ogre_magi": 555,
	      "npc_dota_goodguys_tower1_bot": 331,
	      "npc_dota_goodguys_tower2_bot": 913,
	      "npc_dota_neutral_centaur_outrunner": 1160,
	      "npc_dota_neutral_centaur_khan": 1305,
	      "npc_dota_hero_mirana": 2764,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 265,
	      "npc_dota_neutral_small_thunder_lizard": 371,
	      "npc_dota_roshan": 4846,
	      "npc_dota_neutral_rock_golem": 96,
	      "npc_dota_observer_wards": 360,
	      "npc_dota_sentry_wards": 1510,
	      "npc_dota_goodguys_tower2_mid": 916,
	      "npc_dota_goodguys_tower3_mid": 1040,
	      "npc_dota_neutral_dark_troll": 118,
	      "npc_dota_goodguys_melee_rax_mid": 690,
	      "npc_dota_goodguys_range_rax_mid": 267,
	      "npc_dota_goodguys_tower3_bot": 771,
	      "npc_dota_goodguys_melee_rax_bot": 681,
	      "npc_dota_goodguys_range_rax_bot": 131,
	      "npc_dota_goodguys_tower3_top": 1086,
	      "npc_dota_goodguys_healers": 1407,
	      "npc_dota_neutral_alpha_wolf": 399,
	      "npc_dota_neutral_giant_wolf": 578,
	      "npc_dota_goodguys_melee_rax_top": 1037,
	      "npc_dota_goodguys_range_rax_top": 1041,
	      "npc_dota_goodguys_fillers": 355,
	      "npc_dota_goodguys_fort": 729
	    },
	    "damage_inflictor": {
	      "null": 15893,
	      "weaver_shukuchi": 3052,
	      "weaver_the_swarm": 1834
	    },
	    "damage_inflictor_received": {
	      "bristleback_quill_spray": 7357,
	      "null": 3414,
	      "mirana_arrow": 804,
	      "spectre_desolate": 989,
	      "ogre_magi_ignite": 378,
	      "tusk_ice_shards": 1668,
	      "mirana_starfall": 1745,
	      "tusk_snowball": 309,
	      "spectre_dispersion": 1391,
	      "spectre_spectral_dagger": 778,
	      "blade_mail": 1471,
	      "ogre_magi_fireblast": 255
	    },
	    "damage_taken": {
	      "npc_dota_creep_goodguys_ranged": 549,
	      "npc_dota_creep_goodguys_melee": 949,
	      "npc_dota_hero_bristleback": 9884,
	      "npc_dota_goodguys_tower1_top": 701,
	      "npc_dota_hero_mirana": 2779,
	      "npc_dota_goodguys_siege": 96,
	      "npc_dota_neutral_forest_troll_berserker": 242,
	      "npc_dota_neutral_forest_troll_high_priest": 52,
	      "npc_dota_hero_spectre": 3726,
	      "npc_dota_hero_tusk": 3537,
	      "npc_dota_hero_ogre_magi": 633,
	      "npc_dota_neutral_enraged_wildkin": 156,
	      "npc_dota_neutral_wildkin": 115,
	      "npc_dota_neutral_ghost": 57,
	      "npc_dota_neutral_fel_beast": 62,
	      "npc_dota_goodguys_tower2_top": 521,
	      "npc_dota_goodguys_tower2_bot": 738,
	      "npc_dota_neutral_centaur_outrunner": 8,
	      "npc_dota_neutral_centaur_khan": 90,
	      "npc_dota_neutral_black_drake": 74,
	      "npc_dota_neutral_black_dragon": 63,
	      "npc_dota_roshan": 1498,
	      "npc_dota_goodguys_tower2_mid": 138,
	      "npc_dota_goodguys_tower3_mid": 421,
	      "npc_dota_goodguys_tower3_bot": 643,
	      "npc_dota_goodguys_tower3_top": 559,
	      "npc_dota_goodguys_tower4": 612,
	      "dota_fountain": 435
	    },
	    "deaths": 5,
	    "denies": 4,
	    "dn_t": [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	    "gold": 8717,
	    "gold_per_min": 618,
	    "gold_reasons": {
	      "0": 1277,
	      "1": -1024,
	      "6": 550,
	      "11": 6135,
	      "12": 5159,
	      "13": 10531,
	      "14": 200
	    },
	    "gold_spent": 18720,
	    "gold_t": [0, 311, 651, 1407, 1587, 1811, 2078, 2382, 2638, 2850, 3032, 3326, 3689, 4023, 4215, 4922, 5332, 5864, 6463, 7390, 7668, 7768, 8310, 8706, 9394, 9934, 10770, 11002, 11102, 11656, 12193, 12649, 13443, 13753, 14324, 15160, 15650, 16434, 17012, 19539, 21088, 21713, 22758, 25025, 27054, 27054, 27054],
	    "hero_damage": 20779,
	    "hero_healing": 0,
	    "hero_hits": {
	      "null": 139,
	      "weaver_shukuchi": 29,
	      "weaver_the_swarm": 136
	    },
	    "hero_id": 63,
	    "item_0": 0,
	    "item_1": 123,
	    "item_2": 168,
	    "item_3": 135,
	    "item_4": 30,
	    "item_5": 236,
	    "item_uses": {
	      "tango": 4,
	      "flask": 1,
	      "magic_stick": 5,
	      "tpscroll": 7,
	      "ring_of_aquila": 2
	    },
	    "kill_streaks": {
	      "3": 2,
	      "4": 1,
	      "5": 1,
	      "6": 1
	    },
	    "killed": {
	      "npc_dota_creep_goodguys_melee": 151,
	      "npc_dota_creep_badguys_melee": 2,
	      "npc_dota_creep_goodguys_ranged": 52,
	      "npc_dota_hero_bristleback": 4,
	      "npc_dota_creep_badguys_ranged": 2,
	      "npc_dota_neutral_forest_troll_berserker": 3,
	      "npc_dota_neutral_forest_troll_high_priest": 1,
	      "npc_dota_goodguys_siege": 5,
	      "npc_dota_hero_spectre": 3,
	      "npc_dota_neutral_enraged_wildkin": 2,
	      "npc_dota_neutral_wildkin": 4,
	      "npc_dota_neutral_ghost": 1,
	      "npc_dota_neutral_fel_beast": 2,
	      "npc_dota_neutral_kobold_taskmaster": 1,
	      "npc_dota_hero_tusk": 2,
	      "npc_dota_neutral_centaur_outrunner": 2,
	      "npc_dota_neutral_centaur_khan": 1,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 1,
	      "npc_dota_neutral_small_thunder_lizard": 1,
	      "npc_dota_neutral_black_dragon": 1,
	      "npc_dota_neutral_black_drake": 2,
	      "npc_dota_observer_wards": 1,
	      "npc_dota_sentry_wards": 4,
	      "npc_dota_goodguys_tower2_mid": 1,
	      "npc_dota_goodguys_tower3_mid": 1,
	      "npc_dota_goodguys_melee_rax_mid": 1,
	      "npc_dota_goodguys_tower3_bot": 1,
	      "npc_dota_goodguys_melee_rax_bot": 1,
	      "npc_dota_goodguys_healers": 1,
	      "npc_dota_hero_ogre_magi": 1,
	      "npc_dota_goodguys_tower3_top": 1,
	      "npc_dota_goodguys_melee_rax_top": 1,
	      "npc_dota_goodguys_range_rax_top": 1,
	      "npc_dota_goodguys_fillers": 1
	    },
	    "killed_by": {
	      "npc_dota_goodguys_tower1_top": 1,
	      "npc_dota_hero_mirana": 1,
	      "npc_dota_hero_bristleback": 2,
	      "npc_dota_hero_tusk": 1
	    },
	    "kills": 11,
	    "kills_log": [{
	      "time": 166,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 873,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 1073,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 1082,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 2320,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 2375,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 2493,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 2524,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 2530,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 2582,
	      "key": "npc_dota_hero_spectre"
	    }],
	    "lane_pos": {
	      "72": {
	        "160": 1,
	        "162": 3,
	        "164": 2,
	        "166": 11
	      },
	      "74": {
	        "158": 2,
	        "160": 3,
	        "164": 2,
	        "168": 1
	      },
	      "76": {
	        "144": 2,
	        "146": 16,
	        "148": 5,
	        "150": 7,
	        "152": 7,
	        "154": 12,
	        "156": 12,
	        "158": 3,
	        "160": 1,
	        "162": 5,
	        "164": 4,
	        "166": 3
	      },
	      "78": {
	        "148": 1,
	        "150": 1,
	        "152": 7,
	        "154": 19,
	        "156": 11,
	        "158": 17,
	        "160": 10,
	        "162": 12,
	        "164": 1,
	        "166": 9,
	        "168": 3,
	        "172": 1
	      },
	      "80": {
	        "146": 3,
	        "148": 2,
	        "150": 4,
	        "152": 12,
	        "154": 8,
	        "156": 13,
	        "158": 8,
	        "160": 5,
	        "162": 11,
	        "164": 13,
	        "166": 18,
	        "168": 7,
	        "170": 4,
	        "172": 1
	      },
	      "82": {
	        "152": 3,
	        "154": 10,
	        "156": 7,
	        "158": 2,
	        "160": 3,
	        "162": 1,
	        "164": 6,
	        "166": 24,
	        "168": 44,
	        "170": 3,
	        "172": 3
	      },
	      "84": {
	        "156": 2,
	        "158": 3,
	        "160": 4,
	        "162": 6,
	        "164": 5,
	        "168": 13,
	        "170": 4,
	        "172": 3,
	        "174": 2,
	        "176": 1
	      },
	      "86": {
	        "162": 1,
	        "164": 1,
	        "168": 1,
	        "170": 15,
	        "172": 6,
	        "174": 6,
	        "176": 1
	      },
	      "88": {
	        "164": 1,
	        "168": 1,
	        "170": 23,
	        "172": 8,
	        "174": 1,
	        "176": 1
	      },
	      "90": {
	        "164": 2,
	        "168": 2,
	        "170": 10,
	        "172": 2,
	        "176": 1
	      },
	      "92": {
	        "164": 2,
	        "170": 3,
	        "172": 17,
	        "174": 3,
	        "176": 1
	      },
	      "94": {
	        "164": 2,
	        "172": 1,
	        "174": 1
	      },
	      "96": {
	        "162": 1,
	        "172": 1,
	        "174": 1
	      },
	      "98": {
	        "162": 1,
	        "166": 2,
	        "172": 1
	      },
	      "100": {
	        "160": 1,
	        "164": 2,
	        "166": 1,
	        "168": 1,
	        "170": 1
	      },
	      "102": {
	        "160": 1,
	        "162": 6
	      },
	      "104": {
	        "160": 17
	      },
	      "106": {
	        "158": 2,
	        "160": 13
	      },
	      "108": {
	        "160": 2,
	        "162": 1,
	        "166": 1
	      },
	      "110": {
	        "164": 2,
	        "166": 2
	      },
	      "112": {
	        "166": 1
	      },
	      "114": {
	        "166": 1
	      },
	      "116": {
	        "166": 1
	      },
	      "120": {
	        "166": 1
	      },
	      "122": {
	        "168": 1
	      },
	      "124": {
	        "168": 1,
	        "170": 1
	      },
	      "128": {
	        "170": 1
	      },
	      "130": {
	        "170": 1
	      },
	      "132": {
	        "170": 1
	      },
	      "134": {
	        "170": 1
	      },
	      "136": {
	        "170": 1
	      },
	      "138": {
	        "170": 1
	      },
	      "140": {
	        "170": 1
	      },
	      "142": {
	        "168": 1
	      },
	      "144": {
	        "168": 1
	      },
	      "146": {
	        "170": 1
	      },
	      "148": {
	        "170": 1
	      },
	      "150": {
	        "172": 1
	      },
	      "152": {
	        "172": 1
	      },
	      "154": {
	        "174": 1
	      },
	      "156": {
	        "174": 1
	      },
	      "158": {
	        "176": 1
	      },
	      "160": {
	        "176": 1
	      },
	      "162": {
	        "176": 1
	      },
	      "164": {
	        "176": 1
	      },
	      "168": {
	        "174": 1
	      },
	      "170": {
	        "174": 1
	      },
	      "172": {
	        "176": 1
	      },
	      "174": {
	        "174": 1
	      },
	      "176": {
	        "174": 1
	      },
	      "178": {
	        "176": 1
	      },
	      "180": {
	        "176": 13,
	        "178": 6
	      },
	      "182": {
	        "176": 12,
	        "178": 2
	      }
	    },
	    "last_hits": 245,
	    "leaver_status": 0,
	    "level": 25,
	    "lh_t": [0, 3, 9, 17, 19, 22, 26, 27, 31, 32, 34, 40, 45, 49, 51, 53, 62, 70, 73, 77, 81, 81, 87, 92, 98, 103, 119, 122, 122, 130, 138, 143, 155, 158, 168, 183, 189, 199, 205, 214, 218, 224, 236, 241, 245, 245, 245],
	    "life_state": {
	      "0": 2613,
	      "1": 10,
	      "2": 149
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2585,
	      "max": true,
	      "inflictor": null,
	      "unit": "npc_dota_hero_weaver",
	      "key": "npc_dota_hero_mirana",
	      "value": 352,
	      "slot": 5,
	      "player_slot": 128
	    },
	    "multi_kills": {
	      "2": 2
	    },
	    "obs": {},
	    "obs_left_log": [],
	    "obs_log": [],
	    "obs_placed": 0,
	    "party_id": 1,
	    "permanent_buffs": [],
	    "purchase": {
	      "circlet": 1,
	      "recipe_wraith_band": 1,
	      "tango": 1,
	      "flask": 1,
	      "branches": 1,
	      "wraith_band": 1,
	      "slippers": 1,
	      "magic_stick": 1,
	      "ring_of_protection": 1,
	      "blight_stone": 1,
	      "ring_of_health": 1,
	      "ring_of_basilius": 1,
	      "ring_of_aquila": 1,
	      "sobi_mask": 1,
	      "tpscroll": 6,
	      "pers": 1,
	      "void_stone": 1,
	      "ultimate_orb": 1,
	      "recipe_sphere": 1,
	      "sphere": 1,
	      "mithril_hammer": 2,
	      "desolator": 1,
	      "ogre_axe": 1,
	      "boots_of_elves": 3,
	      "dragon_lance": 1,
	      "gem": 1,
	      "demon_edge": 1,
	      "javelin": 2,
	      "monkey_king_bar": 1,
	      "ward_sentry": null,
	      "dust": null
	    },
	    "purchase_log": [{
	      "time": -82,
	      "key": "circlet"
	    }, {
	      "time": -75,
	      "key": "tango"
	    }, {
	      "time": -74,
	      "key": "flask"
	    }, {
	      "time": -73,
	      "key": "branches"
	    }, {
	      "time": 27,
	      "key": "wraith_band"
	    }, {
	      "time": 27,
	      "key": "slippers"
	    }, {
	      "time": 90,
	      "key": "magic_stick"
	    }, {
	      "time": 111,
	      "key": "ring_of_protection"
	    }, {
	      "time": 143,
	      "key": "blight_stone"
	    }, {
	      "time": 269,
	      "key": "ring_of_health"
	    }, {
	      "time": 374,
	      "key": "ring_of_basilius"
	    }, {
	      "time": 374,
	      "key": "ring_of_aquila"
	    }, {
	      "time": 374,
	      "key": "sobi_mask"
	    }, {
	      "time": 402,
	      "key": "tpscroll"
	    }, {
	      "time": 591,
	      "key": "tpscroll"
	    }, {
	      "time": 663,
	      "key": "pers"
	    }, {
	      "time": 663,
	      "key": "void_stone"
	    }, {
	      "time": 983,
	      "key": "ultimate_orb"
	    }, {
	      "time": 1120,
	      "key": "sphere"
	    }, {
	      "time": 1130,
	      "key": "tpscroll"
	    }, {
	      "time": 1232,
	      "key": "tpscroll"
	    }, {
	      "time": 1348,
	      "key": "mithril_hammer"
	    }, {
	      "time": 1398,
	      "key": "tpscroll"
	    }, {
	      "time": 1492,
	      "key": "mithril_hammer"
	    }, {
	      "time": 1517,
	      "key": "desolator"
	    }, {
	      "time": 1658,
	      "key": "tpscroll"
	    }, {
	      "time": 1700,
	      "key": "ogre_axe"
	    }, {
	      "time": 1791,
	      "key": "boots_of_elves"
	    }, {
	      "time": 1791,
	      "key": "boots_of_elves"
	    }, {
	      "time": 1795,
	      "key": "dragon_lance"
	    }, {
	      "time": 1795,
	      "key": "boots_of_elves"
	    }, {
	      "time": 1898,
	      "key": "gem"
	    }, {
	      "time": 2125,
	      "key": "demon_edge"
	    }, {
	      "time": 2413,
	      "key": "javelin"
	    }, {
	      "time": 2414,
	      "key": "javelin"
	    }, {
	      "time": 2438,
	      "key": "monkey_king_bar"
	    }],
	    "rune_pickups": 6,
	    "runes": {},
	    "runes_log": [],
	    "sen": {},
	    "sen_left_log": [],
	    "sen_log": [],
	    "sen_placed": 0,
	    "stuns": 0.30092773,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 10131,
	    "xp_per_min": 633,
	    "xp_reasons": {
	      "0": 815,
	      "1": 12611,
	      "2": 13966,
	      "3": 367
	    },
	    "xp_t": [0, 112, 379, 716, 1029, 1231, 1567, 1882, 2263, 2600, 2712, 3060, 3518, 4110, 4424, 5745, 6283, 6912, 7941, 8988, 9370, 9370, 9643, 10555, 11422, 11811, 12934, 13069, 13069, 13612, 14442, 14940, 15724, 16450, 16898, 17683, 19161, 19993, 20951, 21823, 22491, 23800, 24722, 25662, 27736, 27736, 27736],
	    "personaname": "Cheez - Its",
	    "name": null,
	    "last_login": "2016-11-07T06:37:41.536Z",
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": false,
	    "win": 1,
	    "lose": 0,
	    "total_gold": 27037,
	    "total_xp": 27693,
	    "kills_per_min": 0.25142857142857145,
	    "kda": 5,
	    "abandons": 0,
	    "neutral_kills": 22,
	    "tower_kills": 4,
	    "courier_kills": 0,
	    "lane_kills": 207,
	    "hero_kills": 10,
	    "observer_kills": 1,
	    "sentry_kills": 4,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 4,
	    "buyback_count": 0,
	    "observer_uses": 0,
	    "sentry_uses": 0,
	    "lane_efficiency": 0.5976739601813522,
	    "lane_efficiency_pct": 59,
	    "lane": 3,
	    "lane_role": 1,
	    "purchase_time": {
	      "circlet": -82,
	      "tango": -75,
	      "flask": -74,
	      "branches": -73,
	      "wraith_band": 27,
	      "slippers": 27,
	      "magic_stick": 90,
	      "ring_of_protection": 111,
	      "blight_stone": 143,
	      "ring_of_health": 269,
	      "ring_of_basilius": 374,
	      "ring_of_aquila": 374,
	      "sobi_mask": 374,
	      "tpscroll": 6411,
	      "pers": 663,
	      "void_stone": 663,
	      "ultimate_orb": 983,
	      "sphere": 1120,
	      "mithril_hammer": 2840,
	      "desolator": 1517,
	      "ogre_axe": 1700,
	      "boots_of_elves": 5377,
	      "dragon_lance": 1795,
	      "gem": 1898,
	      "demon_edge": 2125,
	      "javelin": 4827,
	      "monkey_king_bar": 2438
	    },
	    "first_purchase_time": {
	      "circlet": -82,
	      "tango": -75,
	      "flask": -74,
	      "branches": -73,
	      "wraith_band": 27,
	      "slippers": 27,
	      "magic_stick": 90,
	      "ring_of_protection": 111,
	      "blight_stone": 143,
	      "ring_of_health": 269,
	      "ring_of_basilius": 374,
	      "ring_of_aquila": 374,
	      "sobi_mask": 374,
	      "tpscroll": 402,
	      "pers": 663,
	      "void_stone": 663,
	      "ultimate_orb": 983,
	      "sphere": 1120,
	      "mithril_hammer": 1348,
	      "desolator": 1517,
	      "ogre_axe": 1700,
	      "boots_of_elves": 1791,
	      "dragon_lance": 1795,
	      "gem": 1898,
	      "demon_edge": 2125,
	      "javelin": 2413,
	      "monkey_king_bar": 2438
	    },
	    "item_win": {
	      "circlet": 1,
	      "tango": 1,
	      "flask": 1,
	      "branches": 1,
	      "wraith_band": 1,
	      "slippers": 1,
	      "magic_stick": 1,
	      "ring_of_protection": 1,
	      "blight_stone": 1,
	      "ring_of_health": 1,
	      "ring_of_basilius": 1,
	      "ring_of_aquila": 1,
	      "sobi_mask": 1,
	      "tpscroll": 1,
	      "pers": 1,
	      "void_stone": 1,
	      "ultimate_orb": 1,
	      "sphere": 1,
	      "mithril_hammer": 1,
	      "desolator": 1,
	      "ogre_axe": 1,
	      "boots_of_elves": 1,
	      "dragon_lance": 1,
	      "gem": 1,
	      "demon_edge": 1,
	      "javelin": 1,
	      "monkey_king_bar": 1
	    },
	    "item_usage": {
	      "circlet": 1,
	      "tango": 1,
	      "flask": 1,
	      "branches": 1,
	      "wraith_band": 1,
	      "slippers": 1,
	      "magic_stick": 1,
	      "ring_of_protection": 1,
	      "blight_stone": 1,
	      "ring_of_health": 1,
	      "ring_of_basilius": 1,
	      "ring_of_aquila": 1,
	      "sobi_mask": 1,
	      "tpscroll": 1,
	      "pers": 1,
	      "void_stone": 1,
	      "ultimate_orb": 1,
	      "sphere": 1,
	      "mithril_hammer": 1,
	      "desolator": 1,
	      "ogre_axe": 1,
	      "boots_of_elves": 1,
	      "dragon_lance": 1,
	      "gem": 1,
	      "demon_edge": 1,
	      "javelin": 1,
	      "monkey_king_bar": 1
	    },
	    "purchase_ward_sentry": null,
	    "purchase_tpscroll": 6,
	    "purchase_gem": 1,
	    "actions_per_min": 144,
	    "life_state_dead": 159,
	    "solo_competitive_rank": null,
	    "cosmetics": [{
	      "item_id": 5660,
	      "name": "Antennae of the Master Weaver",
	      "prefab": "wearable",
	      "creation_date": "2013-11-07T00:00:00.000Z",
	      "image_inventory": "econ/items/weaver/master_weaver_head/master_weaver_head",
	      "image_path": "icons/econ/items/weaver/master_weaver_head/master_weaver_head.6e01258f0c97a40450c7199a4eb2dbc67b429281.png",
	      "item_description": "#DOTA_Item_Desc_Antennae_of_the_Master_Weaver",
	      "item_name": "#DOTA_Item_Antennae_of_the_Master_Weaver",
	      "item_rarity": "uncommon",
	      "item_type_name": "#DOTA_WearableType_Antennae",
	      "used_by_heroes": "npc_dota_hero_weaver"
	    }, {
	      "item_id": 6134,
	      "name": "Infesting Incubator",
	      "prefab": "wearable",
	      "creation_date": "2014-02-13T00:00:00.000Z",
	      "image_inventory": "econ/items/weaver/infesting_incubator/infesting_incubator",
	      "image_path": "icons/econ/items/weaver/infesting_incubator/infesting_incubator.1983b9b77aae69348c2aae1c4bcc68ba8d0be7b9.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Infesting_Incubator",
	      "item_rarity": "uncommon",
	      "item_type_name": "#DOTA_WearableType_Abdomen",
	      "used_by_heroes": "npc_dota_hero_weaver"
	    }, {
	      "item_id": 7468,
	      "name": "Skittering Desolation",
	      "prefab": "wearable",
	      "creation_date": "2015-01-09T00:00:00.000Z",
	      "image_inventory": "econ/items/weaver/skittering_desolation_arms/skittering_desolation_arms",
	      "image_path": "icons/econ/items/weaver/skittering_desolation_arms/skittering_desolation_arms.816ba3061988e55789971348be76e0a49425dd67.png",
	      "item_description": "#DOTA_Item_Desc_Skittering_Desolation",
	      "item_name": "#DOTA_Item_Skittering_Desolation",
	      "item_rarity": "immortal",
	      "item_type_name": "#DOTA_WearableType_Arms",
	      "used_by_heroes": "npc_dota_hero_weaver"
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 618,
	        "pct": 0.8686764873815234
	      },
	      "xp_per_min": {
	        "raw": 633,
	        "pct": 0.8253968253968254
	      },
	      "kills_per_min": {
	        "raw": 0.25142857142857145,
	        "pct": 0.5702535983550377
	      },
	      "last_hits_per_min": {
	        "raw": 5.6000000000000005,
	        "pct": 0.9219785241032671
	      },
	      "hero_damage_per_min": {
	        "raw": 474.9485714285714,
	        "pct": 0.3982179575051405
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.9810372401188028
	      },
	      "tower_damage": {
	        "raw": 10131,
	        "pct": 0.9453009021354345
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 129,
	    "ability_upgrades_arr": [5138, 5140, 5138, 5140, 5138, 5141, 5139, 5138, 5139, 5959, 5141, 5139, 5139, 5140, 6038, 5140, 5141],
	    "ability_uses": {
	      "witch_doctor_paralyzing_cask": 36,
	      "witch_doctor_maledict": 17,
	      "witch_doctor_death_ward": 11,
	      "witch_doctor_voodoo_restoration": 85
	    },
	    "account_id": 88826090,
	    "actions": {
	      "1": 5446,
	      "2": 120,
	      "3": 55,
	      "4": 301,
	      "5": 63,
	      "6": 66,
	      "7": 2,
	      "8": 71,
	      "9": 79,
	      "10": 222,
	      "11": 15,
	      "15": 20,
	      "16": 52,
	      "17": 1,
	      "19": 36,
	      "24": 2,
	      "27": 2,
	      "33": 8
	    },
	    "additional_units": null,
	    "assists": 20,
	    "backpack_0": 9,
	    "backpack_1": 118,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_hero_bristleback": 5856,
	      "npc_dota_creep_badguys_melee": 213,
	      "npc_dota_creep_badguys_ranged": 120,
	      "npc_dota_creep_goodguys_ranged": 4780,
	      "npc_dota_goodguys_siege": 253,
	      "npc_dota_creep_goodguys_melee": 14905,
	      "npc_dota_hero_tusk": 1299,
	      "npc_dota_goodguys_tower1_mid": 14,
	      "npc_dota_neutral_ogre_magi": 256,
	      "npc_dota_neutral_ogre_mauler": 512,
	      "npc_dota_hero_mirana": 878,
	      "npc_dota_hero_spectre": 1787,
	      "npc_dota_hero_ogre_magi": 889,
	      "npc_dota_neutral_enraged_wildkin": 54,
	      "npc_dota_tusk_frozen_sigil1": 4,
	      "illusion_npc_dota_hero_spectre": 2499,
	      "npc_dota_goodguys_tower1_top": 194,
	      "npc_dota_goodguys_tower2_top": 144,
	      "npc_dota_goodguys_tower1_bot": 104,
	      "npc_dota_goodguys_tower2_bot": 165,
	      "npc_dota_neutral_centaur_khan": 69,
	      "npc_dota_observer_wards": 729,
	      "npc_dota_neutral_polar_furbolg_champion": 436,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 436,
	      "npc_dota_roshan": 1161,
	      "npc_dota_goodguys_tower2_mid": 94,
	      "npc_dota_goodguys_tower3_mid": 227,
	      "npc_dota_goodguys_melee_rax_mid": 168,
	      "npc_dota_goodguys_range_rax_mid": 95,
	      "npc_dota_goodguys_tower3_bot": 192,
	      "npc_dota_goodguys_melee_rax_bot": 191,
	      "npc_dota_goodguys_range_rax_bot": 94,
	      "npc_dota_goodguys_healers": 374,
	      "npc_dota_goodguys_fillers": 108,
	      "npc_dota_goodguys_tower3_top": 184,
	      "npc_dota_goodguys_melee_rax_top": 208,
	      "npc_dota_goodguys_range_rax_top": 54,
	      "npc_dota_goodguys_tower4": 89,
	      "npc_dota_goodguys_fort": 99
	    },
	    "damage_inflictor": {
	      "null": 6120,
	      "witch_doctor_paralyzing_cask": 1619,
	      "witch_doctor_maledict": 2970
	    },
	    "damage_inflictor_received": {
	      "null": 8211,
	      "bristleback_quill_spray": 3545,
	      "tusk_snowball": 738,
	      "tusk_ice_shards": 1866,
	      "spectre_spectral_dagger": 581,
	      "ogre_magi_fireblast": 83,
	      "ogre_magi_ignite": 1089,
	      "spectre_desolate": 636,
	      "mirana_arrow": 1564,
	      "spectre_dispersion": 1504,
	      "blade_mail": 792,
	      "mirana_starfall": 245
	    },
	    "damage_taken": {
	      "npc_dota_hero_bristleback": 5453,
	      "npc_dota_creep_goodguys_ranged": 193,
	      "npc_dota_creep_goodguys_melee": 582,
	      "npc_dota_goodguys_siege": 88,
	      "npc_dota_goodguys_tower1_mid": 161,
	      "npc_dota_hero_tusk": 8459,
	      "npc_dota_hero_mirana": 1901,
	      "npc_dota_hero_spectre": 3629,
	      "npc_dota_goodguys_tower1_bot": 900,
	      "npc_dota_hero_ogre_magi": 1412,
	      "npc_dota_neutral_enraged_wildkin": 44,
	      "npc_dota_goodguys_tower2_top": 115,
	      "npc_dota_neutral_small_thunder_lizard": 102,
	      "npc_dota_neutral_big_thunder_lizard": 129,
	      "npc_dota_goodguys_tower3_top": 104,
	      "npc_dota_goodguys_tower4": 94
	    },
	    "deaths": 11,
	    "denies": 4,
	    "dn_t": [0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	    "gold": 4472,
	    "gold_per_min": 353,
	    "gold_reasons": {
	      "0": 2273,
	      "1": -1876,
	      "6": 50,
	      "11": 5114,
	      "12": 2955,
	      "13": 912,
	      "14": 469
	    },
	    "gold_spent": 10080,
	    "gold_t": [0, 99, 199, 401, 600, 1185, 1361, 1598, 1808, 1994, 2479, 2749, 2849, 3116, 3216, 3394, 3575, 3765, 3879, 4272, 4372, 4649, 4909, 5009, 5269, 5978, 6178, 7092, 7297, 7592, 7775, 7895, 7995, 8309, 8526, 8626, 8726, 9418, 9932, 11191, 12233, 12661, 12761, 14203, 15475, 15475, 15475],
	    "hero_damage": 10709,
	    "hero_healing": 10905,
	    "hero_hits": {
	      "null": 160,
	      "witch_doctor_paralyzing_cask": 47,
	      "witch_doctor_maledict": 169
	    },
	    "hero_id": 30,
	    "item_0": 102,
	    "item_1": 40,
	    "item_2": 36,
	    "item_3": 0,
	    "item_4": 180,
	    "item_5": 73,
	    "item_uses": {
	      "tango": 4,
	      "flask": 1,
	      "clarity": 2,
	      "arcane_boots": 30,
	      "enchanted_mango": 1,
	      "tpscroll": 10,
	      "ward_observer": 1,
	      "smoke_of_deceit": 2,
	      "magic_wand": 15,
	      "ward_dispenser": 19,
	      "dust": 7,
	      "ward_sentry": 9,
	      "force_staff": 7
	    },
	    "kill_streaks": {},
	    "killed": {
	      "npc_dota_creep_badguys_melee": 3,
	      "npc_dota_creep_badguys_ranged": 1,
	      "npc_dota_creep_goodguys_ranged": 6,
	      "npc_dota_creep_goodguys_melee": 13,
	      "npc_dota_hero_bristleback": 3,
	      "npc_dota_hero_ogre_magi": 1,
	      "npc_dota_tusk_frozen_sigil1": 1,
	      "npc_dota_goodguys_tower2_bot": 1,
	      "npc_dota_hero_spectre": 1,
	      "npc_dota_observer_wards": 3,
	      "npc_dota_roshan": 1,
	      "npc_dota_goodguys_range_rax_mid": 1
	    },
	    "killed_by": {
	      "npc_dota_hero_tusk": 6,
	      "npc_dota_hero_bristleback": 2,
	      "npc_dota_hero_spectre": 1,
	      "npc_dota_neutral_big_thunder_lizard": 1,
	      "npc_dota_hero_mirana": 1
	    },
	    "kills": 5,
	    "kills_log": [{
	      "time": 287,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 573,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 634,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 1611,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 1614,
	      "key": "npc_dota_hero_bristleback"
	    }],
	    "lane_pos": {
	      "72": {
	        "164": 3,
	        "166": 5
	      },
	      "74": {
	        "152": 2,
	        "160": 1,
	        "164": 5
	      },
	      "76": {
	        "148": 1,
	        "150": 1,
	        "152": 1,
	        "154": 5,
	        "156": 1,
	        "158": 3,
	        "160": 1,
	        "162": 3,
	        "164": 1
	      },
	      "78": {
	        "146": 1,
	        "148": 5,
	        "150": 19,
	        "152": 14,
	        "154": 9,
	        "156": 11,
	        "158": 5,
	        "160": 2,
	        "162": 4,
	        "164": 5
	      },
	      "80": {
	        "148": 1,
	        "150": 6,
	        "152": 22,
	        "154": 14,
	        "156": 16,
	        "158": 5,
	        "162": 2,
	        "164": 4,
	        "166": 4,
	        "168": 1
	      },
	      "82": {
	        "152": 2,
	        "154": 21,
	        "156": 15,
	        "160": 1,
	        "162": 1,
	        "164": 1,
	        "166": 3,
	        "168": 5
	      },
	      "84": {
	        "154": 2,
	        "156": 13,
	        "158": 12,
	        "160": 17,
	        "164": 2,
	        "168": 1,
	        "170": 3,
	        "172": 2
	      },
	      "86": {
	        "154": 1,
	        "156": 6,
	        "158": 5,
	        "160": 3,
	        "164": 1,
	        "170": 27
	      },
	      "88": {
	        "158": 5,
	        "162": 2,
	        "164": 1,
	        "170": 1,
	        "172": 2
	      },
	      "90": {
	        "156": 1,
	        "158": 3,
	        "162": 2,
	        "164": 3,
	        "170": 1
	      },
	      "92": {
	        "156": 1,
	        "158": 1,
	        "160": 21,
	        "162": 3,
	        "164": 1,
	        "170": 1,
	        "172": 2
	      },
	      "94": {
	        "158": 1,
	        "160": 1,
	        "164": 2,
	        "172": 2,
	        "174": 1
	      },
	      "96": {
	        "156": 2,
	        "158": 1,
	        "164": 2,
	        "172": 2
	      },
	      "98": {
	        "156": 1,
	        "158": 1,
	        "162": 1
	      },
	      "100": {
	        "156": 3,
	        "160": 1,
	        "162": 1,
	        "166": 1,
	        "168": 1,
	        "170": 1
	      },
	      "102": {
	        "158": 2,
	        "160": 2,
	        "162": 1
	      },
	      "104": {
	        "156": 1,
	        "160": 6
	      },
	      "106": {
	        "156": 1,
	        "158": 1,
	        "160": 1
	      },
	      "108": {
	        "156": 1,
	        "162": 1
	      },
	      "110": {
	        "156": 1,
	        "162": 1
	      },
	      "112": {
	        "116": 2,
	        "118": 1,
	        "156": 1,
	        "164": 1
	      },
	      "114": {
	        "118": 1,
	        "120": 2,
	        "134": 1,
	        "158": 1,
	        "164": 1
	      },
	      "116": {
	        "118": 1,
	        "122": 1,
	        "130": 1,
	        "132": 1,
	        "136": 1,
	        "158": 1,
	        "162": 1
	      },
	      "118": {
	        "124": 1,
	        "128": 2,
	        "136": 1,
	        "154": 1,
	        "158": 1,
	        "160": 2
	      },
	      "120": {
	        "120": 1,
	        "122": 2,
	        "124": 4,
	        "126": 1,
	        "152": 1,
	        "160": 1
	      },
	      "122": {
	        "120": 2,
	        "124": 1,
	        "126": 2,
	        "128": 1,
	        "138": 1,
	        "150": 1
	      },
	      "124": {
	        "126": 5,
	        "128": 1,
	        "138": 1,
	        "142": 1,
	        "148": 1,
	        "160": 1
	      },
	      "126": {
	        "126": 5,
	        "128": 1,
	        "144": 4,
	        "146": 3,
	        "160": 1
	      },
	      "128": {
	        "126": 1,
	        "162": 1
	      },
	      "130": {
	        "162": 1
	      },
	      "132": {
	        "126": 1,
	        "164": 1,
	        "166": 1
	      },
	      "134": {
	        "92": 1,
	        "94": 2,
	        "124": 1,
	        "168": 1
	      },
	      "136": {
	        "92": 9,
	        "122": 1,
	        "170": 1
	      },
	      "138": {
	        "92": 2,
	        "122": 1,
	        "170": 1
	      },
	      "140": {
	        "90": 1,
	        "172": 1
	      },
	      "142": {
	        "88": 1,
	        "94": 1,
	        "108": 1,
	        "110": 1,
	        "120": 1,
	        "174": 1
	      },
	      "144": {
	        "88": 1,
	        "96": 1,
	        "102": 1,
	        "104": 1,
	        "112": 1,
	        "114": 1,
	        "120": 1,
	        "174": 1
	      },
	      "146": {
	        "88": 1,
	        "96": 1,
	        "100": 1,
	        "116": 1,
	        "118": 1,
	        "120": 1
	      },
	      "148": {
	        "88": 1,
	        "98": 1,
	        "100": 3,
	        "120": 1,
	        "174": 1
	      },
	      "150": {
	        "86": 1,
	        "96": 1,
	        "98": 3,
	        "100": 26,
	        "122": 2,
	        "174": 1
	      },
	      "152": {
	        "86": 1,
	        "98": 1,
	        "120": 1,
	        "126": 1,
	        "174": 1
	      },
	      "154": {
	        "86": 1,
	        "96": 1,
	        "120": 1,
	        "122": 1,
	        "124": 1,
	        "126": 1,
	        "128": 1,
	        "174": 1
	      },
	      "156": {
	        "96": 1,
	        "116": 1,
	        "118": 1,
	        "120": 1,
	        "172": 1
	      },
	      "158": {
	        "86": 1,
	        "114": 4,
	        "116": 1,
	        "172": 1
	      },
	      "160": {
	        "88": 1,
	        "96": 1,
	        "172": 1
	      },
	      "162": {
	        "88": 1,
	        "96": 1
	      },
	      "164": {
	        "174": 1
	      },
	      "166": {
	        "88": 1,
	        "96": 2,
	        "98": 2,
	        "174": 1
	      },
	      "168": {
	        "90": 1,
	        "92": 1,
	        "94": 5,
	        "96": 8,
	        "174": 1
	      },
	      "170": {
	        "174": 1
	      },
	      "172": {
	        "174": 1
	      },
	      "176": {
	        "174": 1
	      },
	      "178": {
	        "174": 1
	      },
	      "180": {
	        "172": 1,
	        "174": 6,
	        "176": 25
	      },
	      "182": {
	        "174": 11,
	        "176": 6,
	        "178": 3
	      },
	      "184": {
	        "174": 1
	      }
	    },
	    "last_hits": 26,
	    "leaver_status": 0,
	    "level": 19,
	    "lh_t": [0, 0, 0, 0, 1, 4, 6, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 11, 11, 13, 13, 13, 13, 17, 17, 17, 17, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 23, 23, 23, 23, 26, 26, 26, 26],
	    "life_state": {
	      "0": 2420,
	      "1": 22,
	      "2": 330
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2528,
	      "max": true,
	      "inflictor": "witch_doctor_maledict",
	      "unit": "npc_dota_hero_witch_doctor",
	      "key": "npc_dota_hero_bristleback",
	      "value": 167,
	      "slot": 6,
	      "player_slot": 129
	    },
	    "multi_kills": {
	      "2": 1
	    },
	    "obs": {
	      "76": {
	        "96": 1
	      },
	      "78": {
	        "152": 1
	      },
	      "80": {
	        "154": 1
	      },
	      "108": {
	        "128": 2
	      },
	      "124": {
	        "110": 1
	      },
	      "140": {
	        "90": 1,
	        "106": 1
	      }
	    },
	    "obs_left_log": [{
	      "time": 1004,
	      "type": "obs_left_log",
	      "key": "[140, 106]",
	      "slot": 6,
	      "x": 140,
	      "y": 106,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 15467661,
	      "player_slot": 129
	    }, {
	      "time": 1172,
	      "type": "obs_left_log",
	      "key": "[80, 154]",
	      "slot": 6,
	      "x": 80,
	      "y": 154,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 575300,
	      "player_slot": 129
	    }, {
	      "time": 1281,
	      "type": "obs_left_log",
	      "key": "[108, 128]",
	      "slot": 6,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 3458185,
	      "player_slot": 129
	    }, {
	      "time": 1304,
	      "type": "obs_left_log",
	      "key": "[140, 90]",
	      "slot": 6,
	      "x": 140,
	      "y": 90,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 12912358,
	      "player_slot": 129
	    }, {
	      "time": 1463,
	      "type": "obs_left_log",
	      "key": "[124, 110]",
	      "slot": 6,
	      "x": 124,
	      "y": 110,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 12306207,
	      "player_slot": 129
	    }, {
	      "time": 1590,
	      "type": "obs_left_log",
	      "key": "[78, 152]",
	      "slot": 6,
	      "x": 78,
	      "y": 152,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 13698305,
	      "player_slot": 129
	    }, {
	      "time": 1849,
	      "type": "obs_left_log",
	      "key": "[108, 128]",
	      "slot": 6,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 16565346,
	      "player_slot": 129
	    }],
	    "obs_log": [{
	      "time": 638,
	      "type": "obs_log",
	      "key": "[140, 106]",
	      "slot": 6,
	      "x": 140,
	      "y": 106,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 15467661,
	      "player_slot": 129
	    }, {
	      "time": 806,
	      "type": "obs_log",
	      "key": "[80, 154]",
	      "slot": 6,
	      "x": 80,
	      "y": 154,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 575300,
	      "player_slot": 129
	    }, {
	      "time": 914,
	      "type": "obs_log",
	      "key": "[108, 128]",
	      "slot": 6,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 3458185,
	      "player_slot": 129
	    }, {
	      "time": 938,
	      "type": "obs_log",
	      "key": "[140, 90]",
	      "slot": 6,
	      "x": 140,
	      "y": 90,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 12912358,
	      "player_slot": 129
	    }, {
	      "time": 1096,
	      "type": "obs_log",
	      "key": "[124, 110]",
	      "slot": 6,
	      "x": 124,
	      "y": 110,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 12306207,
	      "player_slot": 129
	    }, {
	      "time": 1223,
	      "type": "obs_log",
	      "key": "[78, 152]",
	      "slot": 6,
	      "x": 78,
	      "y": 152,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 13698305,
	      "player_slot": 129
	    }, {
	      "time": 1555,
	      "type": "obs_log",
	      "key": "[108, 128]",
	      "slot": 6,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 16565346,
	      "player_slot": 129
	    }, {
	      "time": 2549,
	      "type": "obs_log",
	      "key": "[76, 96]",
	      "slot": 6,
	      "x": 76,
	      "y": 96,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 14517887,
	      "player_slot": 129
	    }],
	    "obs_placed": 8,
	    "party_id": 1,
	    "permanent_buffs": [],
	    "purchase": {
	      "tango": 1,
	      "clarity": 2,
	      "enchanted_mango": 1,
	      "flask": 1,
	      "branches": 2,
	      "boots": 1,
	      "tpscroll": 12,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "dust": 8,
	      "ward_observer": 8,
	      "circlet": 2,
	      "magic_stick": 1,
	      "magic_wand": 1,
	      "smoke_of_deceit": 2,
	      "ward_sentry": 12,
	      "ward_dispenser": 6,
	      "gauntlets": 1,
	      "bracer": 1,
	      "recipe_bracer": 1,
	      "staff_of_wizardry": 1,
	      "ring_of_regen": 1,
	      "recipe_force_staff": 1,
	      "force_staff": 1,
	      "platemail": 1,
	      "recipe_shivas_guard": 1
	    },
	    "purchase_log": [{
	      "time": -80,
	      "key": "tango"
	    }, {
	      "time": -72,
	      "key": "clarity"
	    }, {
	      "time": -67,
	      "key": "clarity"
	    }, {
	      "time": -55,
	      "key": "enchanted_mango"
	    }, {
	      "time": -47,
	      "key": "flask"
	    }, {
	      "time": -46,
	      "key": "branches"
	    }, {
	      "time": -46,
	      "key": "branches"
	    }, {
	      "time": 177,
	      "key": "boots"
	    }, {
	      "time": 293,
	      "key": "tpscroll"
	    }, {
	      "time": 328,
	      "key": "arcane_boots"
	    }, {
	      "time": 328,
	      "key": "energy_booster"
	    }, {
	      "time": 537,
	      "key": "tpscroll"
	    }, {
	      "time": 545,
	      "key": "dust"
	    }, {
	      "time": 552,
	      "key": "ward_observer"
	    }, {
	      "time": 555,
	      "key": "tpscroll"
	    }, {
	      "time": 588,
	      "key": "circlet"
	    }, {
	      "time": 588,
	      "key": "magic_stick"
	    }, {
	      "time": 590,
	      "key": "magic_wand"
	    }, {
	      "time": 596,
	      "key": "smoke_of_deceit"
	    }, {
	      "time": 695,
	      "key": "tpscroll"
	    }, {
	      "time": 696,
	      "key": "ward_observer"
	    }, {
	      "time": 697,
	      "key": "ward_observer"
	    }, {
	      "time": 777,
	      "key": "smoke_of_deceit"
	    }, {
	      "time": 779,
	      "key": "tpscroll"
	    }, {
	      "time": 782,
	      "key": "ward_sentry"
	    }, {
	      "time": 877,
	      "key": "tpscroll"
	    }, {
	      "time": 897,
	      "key": "ward_observer"
	    }, {
	      "time": 1011,
	      "key": "ward_observer"
	    }, {
	      "time": 1012,
	      "key": "dust"
	    }, {
	      "time": 1080,
	      "key": "tpscroll"
	    }, {
	      "time": 1084,
	      "key": "dust"
	    }, {
	      "time": 1167,
	      "key": "ward_observer"
	    }, {
	      "time": 1167,
	      "key": "ward_sentry"
	    }, {
	      "time": 1185,
	      "key": "tpscroll"
	    }, {
	      "time": 1346,
	      "key": "tpscroll"
	    }, {
	      "time": 1353,
	      "key": "circlet"
	    }, {
	      "time": 1353,
	      "key": "gauntlets"
	    }, {
	      "time": 1353,
	      "key": "bracer"
	    }, {
	      "time": 1482,
	      "key": "ward_sentry"
	    }, {
	      "time": 1482,
	      "key": "ward_sentry"
	    }, {
	      "time": 1483,
	      "key": "ward_observer"
	    }, {
	      "time": 1484,
	      "key": "tpscroll"
	    }, {
	      "time": 1875,
	      "key": "tpscroll"
	    }, {
	      "time": 1880,
	      "key": "ward_sentry"
	    }, {
	      "time": 1883,
	      "key": "staff_of_wizardry"
	    }, {
	      "time": 1883,
	      "key": "ring_of_regen"
	    }, {
	      "time": 2009,
	      "key": "force_staff"
	    }, {
	      "time": 2115,
	      "key": "tpscroll"
	    }, {
	      "time": 2425,
	      "key": "platemail"
	    }, {
	      "time": 2472,
	      "key": "dust"
	    }, {
	      "time": 2473,
	      "key": "ward_observer"
	    }, {
	      "time": 2474,
	      "key": "ward_sentry"
	    }],
	    "rune_pickups": 15,
	    "runes": {},
	    "runes_log": [],
	    "sen": {
	      "76": {
	        "100": 1
	      },
	      "78": {
	        "130": 1,
	        "156": 1,
	        "160": 1
	      },
	      "86": {
	        "94": 1
	      },
	      "108": {
	        "128": 1
	      },
	      "116": {
	        "134": 1
	      },
	      "120": {
	        "90": 1
	      },
	      "126": {
	        "144": 1
	      },
	      "128": {
	        "126": 1
	      },
	      "132": {
	        "106": 1
	      },
	      "142": {
	        "104": 1
	      }
	    },
	    "sen_left_log": [{
	      "time": 1058,
	      "type": "sen_left_log",
	      "key": "[78, 160]",
	      "slot": 6,
	      "x": 78,
	      "y": 160,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 15222603,
	      "player_slot": 129
	    }, {
	      "time": 1343,
	      "type": "sen_left_log",
	      "key": "[132, 106]",
	      "slot": 6,
	      "x": 132,
	      "y": 106,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 16548962,
	      "player_slot": 129
	    }, {
	      "time": 1473,
	      "type": "sen_left_log",
	      "key": "[78, 156]",
	      "slot": 6,
	      "x": 78,
	      "y": 156,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 6538356,
	      "player_slot": 129
	    }, {
	      "time": 1555,
	      "type": "sen_left_log",
	      "key": "[78, 130]",
	      "slot": 6,
	      "x": 78,
	      "y": 130,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 9815152,
	      "player_slot": 129
	    }, {
	      "time": 1797,
	      "type": "sen_left_log",
	      "key": "[116, 134]",
	      "slot": 6,
	      "x": 116,
	      "y": 134,
	      "z": 128,
	      "entityleft": true,
	      "ehandle": 6865122,
	      "player_slot": 129
	    }, {
	      "time": 1879,
	      "type": "sen_left_log",
	      "key": "[128, 126]",
	      "slot": 6,
	      "x": 128,
	      "y": 126,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 1574605,
	      "player_slot": 129
	    }, {
	      "time": 1890,
	      "type": "sen_left_log",
	      "key": "[142, 104]",
	      "slot": 6,
	      "x": 142,
	      "y": 104,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 13747887,
	      "player_slot": 129
	    }, {
	      "time": 1958,
	      "type": "sen_left_log",
	      "key": "[126, 144]",
	      "slot": 6,
	      "x": 126,
	      "y": 144,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 16712285,
	      "player_slot": 129
	    }, {
	      "time": 2022,
	      "type": "sen_left_log",
	      "key": "[120, 90]",
	      "slot": 6,
	      "x": 120,
	      "y": 90,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 4260492,
	      "player_slot": 129
	    }, {
	      "time": 2062,
	      "type": "sen_left_log",
	      "key": "[108, 128]",
	      "slot": 6,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 11502719,
	      "player_slot": 129
	    }],
	    "sen_log": [{
	      "time": 810,
	      "type": "sen_log",
	      "key": "[78, 160]",
	      "slot": 6,
	      "x": 78,
	      "y": 160,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 15222603,
	      "player_slot": 129
	    }, {
	      "time": 1098,
	      "type": "sen_log",
	      "key": "[132, 106]",
	      "slot": 6,
	      "x": 132,
	      "y": 106,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 16548962,
	      "player_slot": 129
	    }, {
	      "time": 1227,
	      "type": "sen_log",
	      "key": "[78, 156]",
	      "slot": 6,
	      "x": 78,
	      "y": 156,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 6538356,
	      "player_slot": 129
	    }, {
	      "time": 1309,
	      "type": "sen_log",
	      "key": "[78, 130]",
	      "slot": 6,
	      "x": 78,
	      "y": 130,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 9815152,
	      "player_slot": 129
	    }, {
	      "time": 1551,
	      "type": "sen_log",
	      "key": "[116, 134]",
	      "slot": 6,
	      "x": 116,
	      "y": 134,
	      "z": 128,
	      "entityleft": false,
	      "ehandle": 6865122,
	      "player_slot": 129
	    }, {
	      "time": 1633,
	      "type": "sen_log",
	      "key": "[128, 126]",
	      "slot": 6,
	      "x": 128,
	      "y": 126,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 1574605,
	      "player_slot": 129
	    }, {
	      "time": 1644,
	      "type": "sen_log",
	      "key": "[142, 104]",
	      "slot": 6,
	      "x": 142,
	      "y": 104,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 13747887,
	      "player_slot": 129
	    }, {
	      "time": 1713,
	      "type": "sen_log",
	      "key": "[126, 144]",
	      "slot": 6,
	      "x": 126,
	      "y": 144,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 16712285,
	      "player_slot": 129
	    }, {
	      "time": 1942,
	      "type": "sen_log",
	      "key": "[120, 90]",
	      "slot": 6,
	      "x": 120,
	      "y": 90,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 4260492,
	      "player_slot": 129
	    }, {
	      "time": 2048,
	      "type": "sen_log",
	      "key": "[108, 128]",
	      "slot": 6,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 11502719,
	      "player_slot": 129
	    }, {
	      "time": 2544,
	      "type": "sen_log",
	      "key": "[76, 100]",
	      "slot": 6,
	      "x": 76,
	      "y": 100,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 10897364,
	      "player_slot": 129
	    }, {
	      "time": 2583,
	      "type": "sen_log",
	      "key": "[86, 94]",
	      "slot": 6,
	      "x": 86,
	      "y": 94,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 8013747,
	      "player_slot": 129
	    }],
	    "sen_placed": 12,
	    "stuns": 52.648804,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 2217,
	    "xp_per_min": 373,
	    "xp_reasons": {
	      "0": 2169,
	      "1": 8814,
	      "2": 5009,
	      "3": 367
	    },
	    "xp_t": [0, 22, 289, 626, 825, 1411, 1522, 1781, 2033, 2188, 2255, 2323, 2383, 2884, 2884, 3004, 3416, 3551, 3615, 3756, 3935, 4130, 4447, 4447, 4629, 4955, 5233, 6853, 7040, 7424, 8061, 8081, 8081, 8429, 8835, 9035, 9035, 9740, 10954, 11826, 13137, 13854, 13954, 14861, 16332, 16332, 16332],
	    "personaname": "CeLeRoN",
	    "name": null,
	    "last_login": null,
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": false,
	    "win": 1,
	    "lose": 0,
	    "total_gold": 15443,
	    "total_xp": 16318,
	    "kills_per_min": 0.11428571428571428,
	    "kda": 2,
	    "abandons": 0,
	    "neutral_kills": 0,
	    "tower_kills": 1,
	    "courier_kills": 0,
	    "lane_kills": 23,
	    "hero_kills": 5,
	    "observer_kills": 3,
	    "sentry_kills": 0,
	    "roshan_kills": 1,
	    "necronomicon_kills": 0,
	    "ancient_kills": 0,
	    "buyback_count": 0,
	    "observer_uses": 1,
	    "sentry_uses": 9,
	    "lane_efficiency": 0.4886654839345555,
	    "lane_efficiency_pct": 48,
	    "lane": 3,
	    "lane_role": 1,
	    "purchase_time": {
	      "tango": -80,
	      "clarity": -139,
	      "enchanted_mango": -55,
	      "flask": -47,
	      "branches": -92,
	      "boots": 177,
	      "tpscroll": 12821,
	      "arcane_boots": 328,
	      "energy_booster": 328,
	      "dust": 5113,
	      "ward_observer": 8976,
	      "circlet": 1941,
	      "magic_stick": 588,
	      "magic_wand": 590,
	      "smoke_of_deceit": 1373,
	      "ward_sentry": 9267,
	      "gauntlets": 1353,
	      "bracer": 1353,
	      "staff_of_wizardry": 1883,
	      "ring_of_regen": 1883,
	      "force_staff": 2009,
	      "platemail": 2425
	    },
	    "first_purchase_time": {
	      "tango": -80,
	      "clarity": -72,
	      "enchanted_mango": -55,
	      "flask": -47,
	      "branches": -46,
	      "boots": 177,
	      "tpscroll": 293,
	      "arcane_boots": 328,
	      "energy_booster": 328,
	      "dust": 545,
	      "ward_observer": 552,
	      "circlet": 588,
	      "magic_stick": 588,
	      "magic_wand": 590,
	      "smoke_of_deceit": 596,
	      "ward_sentry": 782,
	      "gauntlets": 1353,
	      "bracer": 1353,
	      "staff_of_wizardry": 1883,
	      "ring_of_regen": 1883,
	      "force_staff": 2009,
	      "platemail": 2425
	    },
	    "item_win": {
	      "tango": 1,
	      "clarity": 1,
	      "enchanted_mango": 1,
	      "flask": 1,
	      "branches": 1,
	      "boots": 1,
	      "tpscroll": 1,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "dust": 1,
	      "ward_observer": 1,
	      "circlet": 1,
	      "magic_stick": 1,
	      "magic_wand": 1,
	      "smoke_of_deceit": 1,
	      "ward_sentry": 1,
	      "gauntlets": 1,
	      "bracer": 1,
	      "staff_of_wizardry": 1,
	      "ring_of_regen": 1,
	      "force_staff": 1,
	      "platemail": 1
	    },
	    "item_usage": {
	      "tango": 1,
	      "clarity": 1,
	      "enchanted_mango": 1,
	      "flask": 1,
	      "branches": 1,
	      "boots": 1,
	      "tpscroll": 1,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "dust": 1,
	      "ward_observer": 1,
	      "circlet": 1,
	      "magic_stick": 1,
	      "magic_wand": 1,
	      "smoke_of_deceit": 1,
	      "ward_sentry": 1,
	      "gauntlets": 1,
	      "bracer": 1,
	      "staff_of_wizardry": 1,
	      "ring_of_regen": 1,
	      "force_staff": 1,
	      "platemail": 1
	    },
	    "purchase_ward_observer": 8,
	    "purchase_ward_sentry": 12,
	    "purchase_tpscroll": 12,
	    "actions_per_min": 149,
	    "life_state_dead": 352,
	    "solo_competitive_rank": "4437",
	    "cosmetics": [{
	      "item_id": 4224,
	      "name": "Wooden Fetish Mask",
	      "prefab": "wearable",
	      "creation_date": null,
	      "image_inventory": "econ/items/witchdoctor/wooden_mask",
	      "image_path": "icons/econ/items/witchdoctor/wooden_mask.fc3c266dad1c44a700dfd8bee347208cb031d6cc.png",
	      "item_description": "#DOTA_Item_Desc_Wooden_Fetish_Mask",
	      "item_name": "#DOTA_Item_Wooden_Fetish_Mask",
	      "item_rarity": null,
	      "item_type_name": "#DOTA_WearableType_Mask",
	      "used_by_heroes": "npc_dota_hero_witch_doctor"
	    }, {
	      "item_id": 4710,
	      "name": "Tail of the Stormcrow",
	      "prefab": "wearable",
	      "creation_date": null,
	      "image_inventory": "econ/items/witchdoctor/stormcrow_belt/stormcrow_belt",
	      "image_path": "icons/econ/items/witchdoctor/stormcrow_belt/stormcrow_belt.2240f172664f7df933e0735e1fb7bb326e9b3eb9.png",
	      "item_description": "#DOTA_Item_Desc_Tail_of_the_Stormcrow",
	      "item_name": "#DOTA_Item_Tail_of_the_Stormcrow",
	      "item_rarity": "uncommon",
	      "item_type_name": "#DOTA_WearableType_Belt",
	      "used_by_heroes": "npc_dota_hero_witch_doctor"
	    }, {
	      "item_id": 11266,
	      "name": "The Watcher Below",
	      "prefab": "ward",
	      "creation_date": "2015-03-17T00:00:00.000Z",
	      "image_inventory": "econ/items/wards/watcher_below_ward/watcher_below_ward_npc_dota_observer_wards",
	      "image_path": "icons/econ/items/wards/watcher_below_ward/watcher_below_ward_npc_dota_observer_wards.f297081cfe7c864aa06afce8a621855f9b43dd8b.png",
	      "item_description": "#DOTA_Item_Desc_The_Watcher_Below_Ward",
	      "item_name": "#DOTA_Item_The_Watcher_Below",
	      "item_rarity": "legendary",
	      "item_type_name": null,
	      "used_by_heroes": null
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 353,
	        "pct": 0.584640989063243
	      },
	      "xp_per_min": {
	        "raw": 373,
	        "pct": 0.35805991440798857
	      },
	      "kills_per_min": {
	        "raw": 0.11428571428571428,
	        "pct": 0.3812128418549346
	      },
	      "last_hits_per_min": {
	        "raw": 0.5942857142857142,
	        "pct": 0.17074910820451844
	      },
	      "hero_damage_per_min": {
	        "raw": 244.77714285714285,
	        "pct": 0.2746730083234245
	      },
	      "hero_healing_per_min": {
	        "raw": 249.25714285714284,
	        "pct": 0.9581450653983353
	      },
	      "tower_damage": {
	        "raw": 2217,
	        "pct": 0.9457917261055635
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 130,
	    "ability_upgrades_arr": [5605, 5604, 5605, 5603, 5605, 5606, 5605, 5603, 5603, 6055, 5603, 5606, 5604, 5604, 5922, 5604, 5606, 5951, 6176],
	    "ability_uses": {
	      "ember_spirit_flame_guard": 48,
	      "ember_spirit_searing_chains": 58,
	      "ember_spirit_fire_remnant": 51,
	      "ember_spirit_activate_fire_remnant": 38,
	      "ember_spirit_sleight_of_fist": 43
	    },
	    "account_id": 107797242,
	    "actions": {
	      "1": 6806,
	      "2": 206,
	      "3": 85,
	      "4": 732,
	      "5": 266,
	      "6": 8,
	      "7": 2,
	      "8": 232,
	      "10": 16,
	      "11": 15,
	      "15": 45,
	      "16": 46,
	      "17": 5,
	      "19": 23,
	      "27": 1,
	      "33": 16
	    },
	    "additional_units": null,
	    "assists": 20,
	    "backpack_0": 0,
	    "backpack_1": 0,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 1,
	    "creeps_stacked": 3,
	    "damage": {
	      "npc_dota_creep_goodguys_melee": 74264,
	      "npc_dota_creep_badguys_ranged": 460,
	      "npc_dota_hero_tusk": 5297,
	      "npc_dota_creep_goodguys_ranged": 17354,
	      "npc_dota_creep_badguys_melee": 653,
	      "npc_dota_goodguys_siege": 3449,
	      "npc_dota_goodguys_tower1_mid": 168,
	      "npc_dota_hero_spectre": 6460,
	      "npc_dota_neutral_satyr_trickster": 3317,
	      "npc_dota_neutral_satyr_soulstealer": 7341,
	      "npc_dota_neutral_satyr_hellcaller": 1158,
	      "npc_dota_neutral_ogre_mauler": 4953,
	      "npc_dota_neutral_ogre_magi": 2024,
	      "npc_dota_hero_ogre_magi": 6807,
	      "npc_dota_hero_bristleback": 8280,
	      "npc_dota_neutral_forest_troll_berserker": 1561,
	      "npc_dota_neutral_kobold_taskmaster": 419,
	      "npc_dota_neutral_centaur_khan": 3400,
	      "npc_dota_neutral_centaur_outrunner": 1147,
	      "npc_dota_neutral_wildkin": 2325,
	      "npc_dota_neutral_enraged_wildkin": 2907,
	      "illusion_npc_dota_hero_spectre": 7290,
	      "npc_dota_hero_mirana": 4923,
	      "npc_dota_badguys_siege": 48,
	      "npc_dota_goodguys_tower2_top": 72,
	      "npc_dota_goodguys_tower1_bot": 25,
	      "npc_dota_neutral_small_thunder_lizard": 293,
	      "npc_dota_neutral_big_thunder_lizard": 114,
	      "npc_dota_neutral_mud_golem": 1729,
	      "npc_dota_neutral_mud_golem_split": 982,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 2338,
	      "npc_dota_neutral_polar_furbolg_champion": 1781,
	      "npc_dota_neutral_dark_troll": 2292,
	      "npc_dota_neutral_dark_troll_warlord": 2244,
	      "npc_dota_neutral_harpy_storm": 547,
	      "npc_dota_neutral_harpy_scout": 839,
	      "npc_dota_neutral_alpha_wolf": 624,
	      "npc_dota_neutral_giant_wolf": 1077,
	      "npc_dota_sentry_wards": 143,
	      "npc_dota_goodguys_tower2_mid": 154,
	      "npc_dota_goodguys_melee_rax_mid": 103,
	      "npc_dota_goodguys_range_rax_mid": 209,
	      "npc_dota_goodguys_tower3_bot": 157,
	      "npc_dota_goodguys_melee_rax_bot": 364,
	      "npc_dota_goodguys_range_rax_bot": 164,
	      "npc_dota_goodguys_fillers": 82,
	      "npc_dota_goodguys_healers": 243,
	      "npc_dota_goodguys_tower4": 217,
	      "npc_dota_goodguys_fort": 196
	    },
	    "damage_inflictor": {
	      "ember_spirit_flame_guard": 5046,
	      "null": 6290,
	      "ember_spirit_searing_chains": 10401,
	      "ember_spirit_activate_fire_remnant": 6049,
	      "maelstrom": 1236,
	      "mjollnir": 2285,
	      "dagon_2": 460
	    },
	    "damage_inflictor_received": {
	      "tusk_ice_shards": 1931,
	      "null": 4769,
	      "tusk_snowball": 338,
	      "spectre_desolate": 918,
	      "bristleback_quill_spray": 4137,
	      "ogre_magi_ignite": 868,
	      "spectre_dispersion": 931,
	      "mirana_starfall": 481,
	      "mirana_arrow": 637,
	      "ogre_magi_fireblast": 126,
	      "urn_of_shadows": 133,
	      "blade_mail": 305,
	      "spectre_spectral_dagger": 314
	    },
	    "damage_taken": {
	      "npc_dota_creep_goodguys_ranged": 989,
	      "npc_dota_creep_goodguys_melee": 1720,
	      "npc_dota_hero_tusk": 5938,
	      "npc_dota_goodguys_tower1_mid": 710,
	      "npc_dota_goodguys_siege": 274,
	      "npc_dota_neutral_satyr_soulstealer": 308,
	      "npc_dota_neutral_satyr_hellcaller": 116,
	      "npc_dota_neutral_satyr_trickster": 26,
	      "npc_dota_neutral_ogre_mauler": 176,
	      "npc_dota_neutral_ogre_magi": 99,
	      "npc_dota_hero_spectre": 2883,
	      "npc_dota_hero_bristleback": 4913,
	      "npc_dota_neutral_forest_troll_berserker": 59,
	      "npc_dota_neutral_kobold_taskmaster": 6,
	      "npc_dota_neutral_centaur_khan": 273,
	      "npc_dota_neutral_centaur_outrunner": 49,
	      "npc_dota_neutral_enraged_wildkin": 443,
	      "npc_dota_neutral_wildkin": 114,
	      "npc_dota_hero_ogre_magi": 994,
	      "npc_dota_hero_mirana": 1160,
	      "npc_dota_neutral_small_thunder_lizard": 166,
	      "npc_dota_neutral_big_thunder_lizard": 153,
	      "npc_dota_neutral_mud_golem": 85,
	      "npc_dota_neutral_mud_golem_split": 26,
	      "npc_dota_neutral_dark_troll_warlord": 134,
	      "npc_dota_neutral_dark_troll": 75,
	      "npc_dota_neutral_harpy_storm": 26,
	      "npc_dota_neutral_harpy_scout": 42,
	      "npc_dota_neutral_polar_furbolg_champion": 148,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 185,
	      "npc_dota_neutral_giant_wolf": 61,
	      "npc_dota_neutral_alpha_wolf": 16,
	      "npc_dota_goodguys_tower3_mid": 133,
	      "npc_dota_goodguys_tower4": 2117,
	      "npc_dota_goodguys_tower3_top": 66,
	      "dota_fountain": 425
	    },
	    "deaths": 3,
	    "denies": 9,
	    "dn_t": [0, 0, 1, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
	    "gold": 532,
	    "gold_per_min": 637,
	    "gold_reasons": {
	      "0": 2177,
	      "1": -639,
	      "6": 881,
	      "11": 4926,
	      "12": 5611,
	      "13": 11255,
	      "14": 200
	    },
	    "gold_spent": 28470,
	    "gold_t": [0, 314, 608, 869, 1213, 1631, 1963, 2240, 2579, 2914, 3642, 3956, 4260, 4730, 5074, 5420, 6220, 6525, 7336, 7908, 8868, 9382, 9691, 10404, 11218, 11712, 12224, 12625, 12968, 13426, 14153, 14646, 15316, 16044, 17109, 17525, 18266, 19505, 20516, 22173, 23798, 24324, 24815, 26169, 27921, 27921, 27921],
	    "hero_damage": 31767,
	    "hero_healing": 0,
	    "hero_hits": {
	      "ember_spirit_flame_guard": 597,
	      "null": 93,
	      "ember_spirit_searing_chains": 123,
	      "ember_spirit_activate_fire_remnant": 34,
	      "maelstrom": 11,
	      "mjollnir": 17,
	      "dagon_2": 1
	    },
	    "hero_id": 106,
	    "item_0": 1,
	    "item_1": 190,
	    "item_2": 204,
	    "item_3": 158,
	    "item_4": 48,
	    "item_5": 235,
	    "item_uses": {
	      "branches": 1,
	      "tango_single": 2,
	      "flask": 1,
	      "bottle": 70,
	      "tpscroll": 4,
	      "veil_of_discord": 20,
	      "magic_wand": 17,
	      "blink": 48,
	      "travel_boots": 11,
	      "dagon_2": 1
	    },
	    "kill_streaks": {
	      "3": 2,
	      "4": 2,
	      "5": 2,
	      "6": 1,
	      "7": 1,
	      "8": 1,
	      "9": 1,
	      "10": 1
	    },
	    "killed": {
	      "npc_dota_creep_goodguys_melee": 131,
	      "npc_dota_creep_badguys_ranged": 2,
	      "npc_dota_creep_goodguys_ranged": 53,
	      "npc_dota_creep_badguys_melee": 6,
	      "npc_dota_goodguys_siege": 7,
	      "npc_dota_hero_spectre": 3,
	      "npc_dota_hero_tusk": 2,
	      "npc_dota_neutral_satyr_trickster": 10,
	      "npc_dota_neutral_satyr_soulstealer": 11,
	      "npc_dota_neutral_satyr_hellcaller": 1,
	      "npc_dota_hero_bristleback": 4,
	      "npc_dota_neutral_forest_troll_berserker": 3,
	      "npc_dota_neutral_kobold_taskmaster": 1,
	      "npc_dota_neutral_centaur_outrunner": 3,
	      "npc_dota_neutral_centaur_khan": 3,
	      "npc_dota_neutral_wildkin": 6,
	      "npc_dota_neutral_enraged_wildkin": 3,
	      "npc_dota_neutral_ogre_magi": 2,
	      "npc_dota_neutral_ogre_mauler": 4,
	      "npc_dota_badguys_siege": 1,
	      "npc_dota_hero_mirana": 3,
	      "npc_dota_hero_ogre_magi": 3,
	      "npc_dota_goodguys_tower1_bot": 1,
	      "npc_dota_neutral_mud_golem": 2,
	      "npc_dota_neutral_mud_golem_split": 4,
	      "npc_dota_neutral_polar_furbolg_champion": 3,
	      "npc_dota_neutral_dark_troll_warlord": 2,
	      "npc_dota_neutral_dark_troll": 4,
	      "npc_dota_neutral_harpy_scout": 2,
	      "npc_dota_neutral_harpy_storm": 1,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 2,
	      "npc_dota_neutral_alpha_wolf": 1,
	      "npc_dota_neutral_giant_wolf": 2
	    },
	    "killed_by": {
	      "npc_dota_creep_goodguys_ranged": 1,
	      "npc_dota_hero_tusk": 2
	    },
	    "kills": 15,
	    "kills_log": [{
	      "time": 529,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 547,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 763,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 951,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 1050,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 1070,
	      "key": "npc_dota_hero_mirana"
	    }, {
	      "time": 1158,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 1195,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 1335,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 1381,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 1775,
	      "key": "npc_dota_hero_mirana"
	    }, {
	      "time": 2278,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 2329,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 2392,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 2595,
	      "key": "npc_dota_hero_mirana"
	    }],
	    "lane_pos": {
	      "100": {
	        "114": 27
	      },
	      "102": {
	        "114": 2
	      },
	      "104": {
	        "112": 1
	      },
	      "106": {
	        "112": 1
	      },
	      "108": {
	        "114": 1
	      },
	      "110": {
	        "114": 1
	      },
	      "112": {
	        "116": 1
	      },
	      "114": {
	        "118": 15,
	        "120": 3,
	        "122": 1,
	        "132": 1,
	        "134": 1,
	        "136": 2
	      },
	      "116": {
	        "118": 1,
	        "120": 8,
	        "122": 14,
	        "124": 3,
	        "130": 1,
	        "132": 2,
	        "136": 1
	      },
	      "118": {
	        "120": 6,
	        "122": 40,
	        "124": 15,
	        "128": 3,
	        "130": 2,
	        "132": 2,
	        "134": 1
	      },
	      "120": {
	        "120": 6,
	        "122": 12,
	        "124": 21,
	        "126": 8,
	        "128": 2,
	        "130": 1
	      },
	      "122": {
	        "122": 4,
	        "124": 22,
	        "126": 23,
	        "128": 3,
	        "136": 1
	      },
	      "124": {
	        "124": 7,
	        "126": 26,
	        "128": 21,
	        "130": 3,
	        "132": 1,
	        "134": 1,
	        "138": 1,
	        "140": 1,
	        "144": 1
	      },
	      "126": {
	        "122": 1,
	        "124": 2,
	        "126": 17,
	        "128": 12,
	        "130": 8,
	        "132": 3,
	        "134": 1,
	        "142": 1,
	        "144": 2
	      },
	      "128": {
	        "120": 1,
	        "122": 1,
	        "126": 3,
	        "128": 13,
	        "130": 12,
	        "132": 2,
	        "134": 2,
	        "136": 2,
	        "146": 2
	      },
	      "130": {
	        "120": 2,
	        "126": 1,
	        "128": 33,
	        "130": 10,
	        "132": 5,
	        "134": 1,
	        "146": 1
	      },
	      "132": {
	        "120": 1,
	        "126": 1,
	        "128": 1,
	        "130": 5,
	        "132": 1,
	        "144": 1
	      },
	      "134": {
	        "118": 1,
	        "126": 1,
	        "128": 1,
	        "130": 1,
	        "132": 3
	      },
	      "136": {
	        "118": 2,
	        "128": 2,
	        "130": 1,
	        "132": 2,
	        "134": 2,
	        "136": 1,
	        "144": 1
	      },
	      "138": {
	        "116": 3,
	        "124": 1,
	        "130": 1,
	        "134": 2,
	        "136": 1,
	        "140": 1,
	        "142": 1
	      },
	      "140": {
	        "114": 3,
	        "116": 2,
	        "124": 1,
	        "134": 1,
	        "136": 1
	      },
	      "142": {
	        "100": 1,
	        "112": 1,
	        "114": 1,
	        "124": 1,
	        "136": 1,
	        "138": 1
	      },
	      "144": {
	        "100": 2,
	        "110": 2,
	        "112": 1,
	        "122": 1,
	        "138": 2,
	        "140": 1
	      },
	      "146": {
	        "100": 2,
	        "140": 1,
	        "144": 4
	      },
	      "148": {
	        "100": 7,
	        "122": 1,
	        "138": 1,
	        "146": 1
	      },
	      "150": {
	        "100": 1,
	        "102": 2,
	        "110": 1,
	        "122": 1,
	        "138": 1,
	        "140": 1,
	        "148": 1
	      },
	      "152": {
	        "110": 1,
	        "124": 6,
	        "126": 10,
	        "128": 1,
	        "138": 1,
	        "140": 1,
	        "150": 1
	      },
	      "154": {
	        "100": 1,
	        "112": 1,
	        "120": 1,
	        "122": 1,
	        "124": 4,
	        "126": 25,
	        "128": 3,
	        "130": 12,
	        "132": 2,
	        "134": 1,
	        "136": 2,
	        "138": 1,
	        "152": 1
	      },
	      "156": {
	        "102": 4,
	        "104": 1,
	        "108": 1,
	        "112": 1,
	        "118": 1,
	        "134": 1,
	        "138": 1,
	        "140": 1,
	        "142": 1,
	        "144": 1,
	        "154": 1
	      },
	      "158": {
	        "102": 1,
	        "104": 1,
	        "110": 1,
	        "112": 1,
	        "116": 1,
	        "134": 1,
	        "146": 1,
	        "148": 1,
	        "152": 1,
	        "156": 1
	      },
	      "160": {
	        "154": 1,
	        "158": 1
	      },
	      "162": {
	        "156": 1,
	        "158": 2,
	        "160": 1
	      },
	      "164": {
	        "162": 2,
	        "164": 1
	      },
	      "166": {
	        "162": 1,
	        "164": 1,
	        "166": 1
	      },
	      "168": {
	        "168": 2,
	        "170": 1
	      },
	      "170": {
	        "170": 1
	      },
	      "172": {
	        "170": 2
	      },
	      "174": {
	        "170": 1,
	        "172": 1
	      },
	      "176": {
	        "172": 1,
	        "174": 1
	      },
	      "178": {
	        "172": 1,
	        "176": 1
	      },
	      "180": {
	        "174": 6,
	        "176": 2,
	        "178": 2
	      },
	      "182": {
	        "176": 4
	      },
	      "184": {
	        "174": 6
	      }
	    },
	    "last_hits": 262,
	    "leaver_status": 0,
	    "level": 25,
	    "lh_t": [0, 3, 8, 12, 18, 25, 29, 33, 38, 38, 39, 42, 45, 48, 55, 59, 67, 70, 70, 75, 82, 92, 93, 99, 102, 102, 111, 113, 118, 125, 138, 144, 154, 166, 185, 194, 209, 226, 233, 240, 249, 254, 257, 260, 262, 262, 262],
	    "life_state": {
	      "0": 2653,
	      "1": 9,
	      "2": 110
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2595,
	      "max": true,
	      "inflictor": "dagon_2",
	      "unit": "npc_dota_hero_ember_spirit",
	      "key": "npc_dota_hero_mirana",
	      "value": 460,
	      "slot": 7,
	      "player_slot": 130
	    },
	    "multi_kills": {},
	    "obs": {},
	    "obs_left_log": [],
	    "obs_log": [],
	    "obs_placed": 0,
	    "party_id": 1,
	    "permanent_buffs": [],
	    "purchase": {
	      "flask": 1,
	      "bottle": 1,
	      "boots": 1,
	      "helm_of_iron_will": 1,
	      "tpscroll": 5,
	      "infused_raindrop": 1,
	      "circlet": 4,
	      "mantle": 3,
	      "null_talisman": 3,
	      "recipe_null_talisman": 3,
	      "recipe_veil_of_discord": 1,
	      "veil_of_discord": 1,
	      "branches": 1,
	      "magic_stick": 1,
	      "magic_wand": 1,
	      "blink": 1,
	      "recipe_travel_boots": 1,
	      "travel_boots": 1,
	      "mithril_hammer": 1,
	      "gloves": 1,
	      "maelstrom": 1,
	      "recipe_maelstrom": 1,
	      "vitality_booster": 1,
	      "energy_booster": 1,
	      "soul_booster": 1,
	      "point_booster": 1,
	      "octarine_core": 1,
	      "mystic_staff": 1,
	      "hyperstone": 1,
	      "recipe_mjollnir": 1,
	      "mjollnir": 1,
	      "staff_of_wizardry": 1,
	      "dagon": 1,
	      "recipe_dagon": 5,
	      "dagon_2": 1,
	      "dagon_3": 1,
	      "dagon_4": 1,
	      "dagon_5": 1,
	      "ward_sentry": null,
	      "dust": null
	    },
	    "purchase_log": [{
	      "time": 4,
	      "key": "flask"
	    }, {
	      "time": 149,
	      "key": "bottle"
	    }, {
	      "time": 228,
	      "key": "boots"
	    }, {
	      "time": 376,
	      "key": "helm_of_iron_will"
	    }, {
	      "time": 378,
	      "key": "tpscroll"
	    }, {
	      "time": 439,
	      "key": "tpscroll"
	    }, {
	      "time": 512,
	      "key": "infused_raindrop"
	    }, {
	      "time": 566,
	      "key": "circlet"
	    }, {
	      "time": 566,
	      "key": "mantle"
	    }, {
	      "time": 566,
	      "key": "null_talisman"
	    }, {
	      "time": 566,
	      "key": "circlet"
	    }, {
	      "time": 567,
	      "key": "mantle"
	    }, {
	      "time": 581,
	      "key": "null_talisman"
	    }, {
	      "time": 585,
	      "key": "tpscroll"
	    }, {
	      "time": 738,
	      "key": "veil_of_discord"
	    }, {
	      "time": 779,
	      "key": "circlet"
	    }, {
	      "time": 779,
	      "key": "branches"
	    }, {
	      "time": 779,
	      "key": "magic_stick"
	    }, {
	      "time": 802,
	      "key": "magic_wand"
	    }, {
	      "time": 1027,
	      "key": "tpscroll"
	    }, {
	      "time": 1089,
	      "key": "blink"
	    }, {
	      "time": 1116,
	      "key": "tpscroll"
	    }, {
	      "time": 1256,
	      "key": "travel_boots"
	    }, {
	      "time": 1423,
	      "key": "mithril_hammer"
	    }, {
	      "time": 1424,
	      "key": "gloves"
	    }, {
	      "time": 1483,
	      "key": "maelstrom"
	    }, {
	      "time": 1892,
	      "key": "vitality_booster"
	    }, {
	      "time": 1892,
	      "key": "energy_booster"
	    }, {
	      "time": 1892,
	      "key": "soul_booster"
	    }, {
	      "time": 1892,
	      "key": "point_booster"
	    }, {
	      "time": 2078,
	      "key": "octarine_core"
	    }, {
	      "time": 2078,
	      "key": "mystic_staff"
	    }, {
	      "time": 2225,
	      "key": "hyperstone"
	    }, {
	      "time": 2293,
	      "key": "mjollnir"
	    }, {
	      "time": 2426,
	      "key": "staff_of_wizardry"
	    }, {
	      "time": 2427,
	      "key": "circlet"
	    }, {
	      "time": 2427,
	      "key": "mantle"
	    }, {
	      "time": 2427,
	      "key": "null_talisman"
	    }, {
	      "time": 2427,
	      "key": "dagon"
	    }, {
	      "time": 2427,
	      "key": "dagon_2"
	    }, {
	      "time": 2599,
	      "key": "dagon_3"
	    }, {
	      "time": 2599,
	      "key": "dagon_4"
	    }, {
	      "time": 2623,
	      "key": "dagon_5"
	    }],
	    "rune_pickups": 23,
	    "runes": {},
	    "runes_log": [],
	    "sen": {},
	    "sen_left_log": [],
	    "sen_log": [],
	    "sen_placed": 0,
	    "stuns": 140.2796,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 1633,
	    "xp_per_min": 628,
	    "xp_reasons": {
	      "0": 2275,
	      "1": 10130,
	      "2": 15106
	    },
	    "xp_t": [0, 270, 675, 1102, 1552, 2045, 2480, 2929, 3242, 3432, 4198, 4811, 5324, 5777, 6188, 6530, 7512, 7801, 8971, 9938, 11140, 11778, 12007, 12856, 13589, 14392, 14840, 16685, 17169, 17790, 18803, 19437, 20763, 21584, 23102, 23639, 24339, 26101, 27496, 27505, 27505, 27505, 27505, 27505, 27505, 27505, 27505],
	    "personaname": "Cheerios",
	    "name": null,
	    "last_login": null,
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": false,
	    "win": 1,
	    "lose": 0,
	    "total_gold": 27868,
	    "total_xp": 27475,
	    "kills_per_min": 0.34285714285714286,
	    "kda": 8,
	    "abandons": 0,
	    "neutral_kills": 70,
	    "tower_kills": 1,
	    "courier_kills": 0,
	    "lane_kills": 192,
	    "hero_kills": 15,
	    "observer_kills": 0,
	    "sentry_kills": 0,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 0,
	    "buyback_count": 0,
	    "observer_uses": 0,
	    "sentry_uses": 0,
	    "lane_efficiency": 0.7179183914843288,
	    "lane_efficiency_pct": 71,
	    "lane": 2,
	    "lane_role": 2,
	    "purchase_time": {
	      "flask": 4,
	      "bottle": 149,
	      "boots": 228,
	      "helm_of_iron_will": 376,
	      "tpscroll": 3545,
	      "infused_raindrop": 512,
	      "circlet": 4338,
	      "mantle": 3560,
	      "null_talisman": 3574,
	      "veil_of_discord": 738,
	      "branches": 779,
	      "magic_stick": 779,
	      "magic_wand": 802,
	      "blink": 1089,
	      "travel_boots": 1256,
	      "mithril_hammer": 1423,
	      "gloves": 1424,
	      "maelstrom": 1483,
	      "vitality_booster": 1892,
	      "energy_booster": 1892,
	      "soul_booster": 1892,
	      "point_booster": 1892,
	      "octarine_core": 2078,
	      "mystic_staff": 2078,
	      "hyperstone": 2225,
	      "mjollnir": 2293,
	      "staff_of_wizardry": 2426,
	      "dagon": 2427,
	      "dagon_2": 2427,
	      "dagon_3": 2599,
	      "dagon_4": 2599,
	      "dagon_5": 2623
	    },
	    "first_purchase_time": {
	      "flask": 4,
	      "bottle": 149,
	      "boots": 228,
	      "helm_of_iron_will": 376,
	      "tpscroll": 378,
	      "infused_raindrop": 512,
	      "circlet": 566,
	      "mantle": 566,
	      "null_talisman": 566,
	      "veil_of_discord": 738,
	      "branches": 779,
	      "magic_stick": 779,
	      "magic_wand": 802,
	      "blink": 1089,
	      "travel_boots": 1256,
	      "mithril_hammer": 1423,
	      "gloves": 1424,
	      "maelstrom": 1483,
	      "vitality_booster": 1892,
	      "energy_booster": 1892,
	      "soul_booster": 1892,
	      "point_booster": 1892,
	      "octarine_core": 2078,
	      "mystic_staff": 2078,
	      "hyperstone": 2225,
	      "mjollnir": 2293,
	      "staff_of_wizardry": 2426,
	      "dagon": 2427,
	      "dagon_2": 2427,
	      "dagon_3": 2599,
	      "dagon_4": 2599,
	      "dagon_5": 2623
	    },
	    "item_win": {
	      "flask": 1,
	      "bottle": 1,
	      "boots": 1,
	      "helm_of_iron_will": 1,
	      "tpscroll": 1,
	      "infused_raindrop": 1,
	      "circlet": 1,
	      "mantle": 1,
	      "null_talisman": 1,
	      "veil_of_discord": 1,
	      "branches": 1,
	      "magic_stick": 1,
	      "magic_wand": 1,
	      "blink": 1,
	      "travel_boots": 1,
	      "mithril_hammer": 1,
	      "gloves": 1,
	      "maelstrom": 1,
	      "vitality_booster": 1,
	      "energy_booster": 1,
	      "soul_booster": 1,
	      "point_booster": 1,
	      "octarine_core": 1,
	      "mystic_staff": 1,
	      "hyperstone": 1,
	      "mjollnir": 1,
	      "staff_of_wizardry": 1,
	      "dagon": 1,
	      "dagon_2": 1,
	      "dagon_3": 1,
	      "dagon_4": 1,
	      "dagon_5": 1
	    },
	    "item_usage": {
	      "flask": 1,
	      "bottle": 1,
	      "boots": 1,
	      "helm_of_iron_will": 1,
	      "tpscroll": 1,
	      "infused_raindrop": 1,
	      "circlet": 1,
	      "mantle": 1,
	      "null_talisman": 1,
	      "veil_of_discord": 1,
	      "branches": 1,
	      "magic_stick": 1,
	      "magic_wand": 1,
	      "blink": 1,
	      "travel_boots": 1,
	      "mithril_hammer": 1,
	      "gloves": 1,
	      "maelstrom": 1,
	      "vitality_booster": 1,
	      "energy_booster": 1,
	      "soul_booster": 1,
	      "point_booster": 1,
	      "octarine_core": 1,
	      "mystic_staff": 1,
	      "hyperstone": 1,
	      "mjollnir": 1,
	      "staff_of_wizardry": 1,
	      "dagon": 1,
	      "dagon_2": 1,
	      "dagon_3": 1,
	      "dagon_4": 1,
	      "dagon_5": 1
	    },
	    "purchase_ward_sentry": null,
	    "purchase_tpscroll": 5,
	    "actions_per_min": 194,
	    "life_state_dead": 119,
	    "solo_competitive_rank": null,
	    "cosmetics": [],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 637,
	        "pct": 0.8697798025816249
	      },
	      "xp_per_min": {
	        "raw": 628,
	        "pct": 0.8189066059225513
	      },
	      "kills_per_min": {
	        "raw": 0.34285714285714286,
	        "pct": 0.811087905828745
	      },
	      "last_hits_per_min": {
	        "raw": 5.988571428571428,
	        "pct": 0.7972280235428137
	      },
	      "hero_damage_per_min": {
	        "raw": 726.1028571428571,
	        "pct": 0.7024871843554206
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.9965824947788114
	      },
	      "tower_damage": {
	        "raw": 1633,
	        "pct": 0.6575550493545937
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 131,
	    "ability_upgrades_arr": [5263, 5264, 5263, 5264, 5263, 5266, 5263, 5264, 5264, 5956, 5265, 5266, 5265, 5265, 5265, 5947, 5266, 5980],
	    "ability_uses": {
	      "omniknight_purification": 57,
	      "omniknight_repel": 21,
	      "omniknight_guardian_angel": 6
	    },
	    "account_id": 165765109,
	    "actions": {
	      "1": 5351,
	      "2": 357,
	      "3": 1,
	      "4": 620,
	      "5": 17,
	      "6": 107,
	      "7": 4,
	      "8": 34,
	      "11": 15,
	      "13": 1,
	      "15": 21,
	      "16": 34,
	      "19": 17,
	      "27": 3
	    },
	    "additional_units": null,
	    "assists": 20,
	    "backpack_0": 0,
	    "backpack_1": 0,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_creep_badguys_ranged": 112,
	      "npc_dota_creep_goodguys_melee": 12856,
	      "npc_dota_creep_badguys_melee": 270,
	      "npc_dota_hero_spectre": 1291,
	      "npc_dota_hero_mirana": 1289,
	      "npc_dota_hero_tusk": 1978,
	      "npc_dota_hero_ogre_magi": 438,
	      "npc_dota_goodguys_siege": 664,
	      "illusion_npc_dota_hero_spectre": 2831,
	      "npc_dota_creep_goodguys_ranged": 1087,
	      "npc_dota_hero_bristleback": 1558,
	      "npc_dota_badguys_tower1_mid": 18,
	      "npc_dota_goodguys_tower1_top": 98,
	      "npc_dota_goodguys_tower2_bot": 117,
	      "npc_dota_roshan": 324,
	      "npc_dota_goodguys_tower2_mid": 26,
	      "npc_dota_goodguys_melee_rax_mid": 103,
	      "npc_dota_goodguys_range_rax_mid": 81,
	      "npc_dota_goodguys_melee_rax_bot": 132,
	      "npc_dota_goodguys_tower3_top": 119,
	      "npc_dota_goodguys_melee_rax_top": 149,
	      "npc_dota_goodguys_range_rax_top": 100,
	      "npc_dota_goodguys_healers": 96,
	      "npc_dota_goodguys_tower4": 84
	    },
	    "damage_inflictor": {
	      "null": 701,
	      "omniknight_purification": 5853
	    },
	    "damage_inflictor_received": {
	      "null": 4237,
	      "mirana_arrow": 718,
	      "spectre_spectral_dagger": 889,
	      "mirana_starfall": 857,
	      "tusk_ice_shards": 1205,
	      "tusk_snowball": 954,
	      "spectre_desolate": 1338,
	      "ogre_magi_fireblast": 211,
	      "ogre_magi_ignite": 908,
	      "bristleback_quill_spray": 2446,
	      "urn_of_shadows": 114,
	      "blade_mail": 158,
	      "spectre_dispersion": 868
	    },
	    "damage_taken": {
	      "npc_dota_hero_mirana": 2068,
	      "npc_dota_creep_goodguys_ranged": 295,
	      "npc_dota_creep_goodguys_melee": 314,
	      "npc_dota_hero_spectre": 4263,
	      "npc_dota_hero_tusk": 3657,
	      "npc_dota_hero_ogre_magi": 1119,
	      "npc_dota_goodguys_tower1_bot": 340,
	      "npc_dota_goodguys_siege": 25,
	      "npc_dota_hero_bristleback": 3796,
	      "npc_dota_neutral_granite_golem": 104,
	      "npc_dota_neutral_rock_golem": 30
	    },
	    "deaths": 5,
	    "denies": 1,
	    "dn_t": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	    "gold": 2700,
	    "gold_per_min": 338,
	    "gold_reasons": {
	      "0": 814,
	      "1": -832,
	      "11": 4760,
	      "12": 2367,
	      "13": 1352,
	      "14": 200
	    },
	    "gold_spent": 11940,
	    "gold_t": [0, 99, 199, 299, 399, 499, 599, 954, 1054, 1360, 1460, 1593, 1891, 1991, 2215, 2527, 2729, 2829, 3098, 3418, 3801, 4045, 4491, 4759, 5079, 5716, 6073, 6233, 6393, 6694, 7206, 7366, 7526, 7905, 8065, 8225, 8385, 8745, 9252, 10437, 11387, 11891, 12143, 13503, 14812, 14872, 14932],
	    "hero_damage": 6554,
	    "hero_healing": 8423,
	    "hero_hits": {
	      "null": 19,
	      "omniknight_purification": 22
	    },
	    "hero_id": 57,
	    "item_0": 232,
	    "item_1": 180,
	    "item_2": 46,
	    "item_3": 108,
	    "item_4": 102,
	    "item_5": 42,
	    "item_uses": {
	      "courier": 1,
	      "ward_observer": 8,
	      "tango": 4,
	      "clarity": 1,
	      "tpscroll": 4,
	      "arcane_boots": 17,
	      "flask": 1,
	      "ward_dispenser": 7,
	      "ward_sentry": 1,
	      "force_staff": 2
	    },
	    "kill_streaks": {},
	    "killed": {
	      "npc_dota_creep_goodguys_melee": 23,
	      "npc_dota_goodguys_siege": 2,
	      "npc_dota_badguys_tower1_mid": 1,
	      "npc_dota_hero_mirana": 1,
	      "npc_dota_creep_goodguys_ranged": 3
	    },
	    "killed_by": {
	      "npc_dota_hero_tusk": 3,
	      "npc_dota_hero_spectre": 1,
	      "npc_dota_hero_bristleback": 1
	    },
	    "kills": 1,
	    "kills_log": [{
	      "time": 1441,
	      "key": "npc_dota_hero_mirana"
	    }],
	    "lane_pos": {
	      "124": {
	        "136": 2
	      },
	      "126": {
	        "134": 1,
	        "136": 1
	      },
	      "128": {
	        "134": 2
	      },
	      "130": {
	        "132": 2
	      },
	      "132": {
	        "130": 1,
	        "132": 1
	      },
	      "134": {
	        "128": 1,
	        "130": 1,
	        "132": 1
	      },
	      "136": {
	        "92": 2,
	        "126": 1,
	        "134": 1
	      },
	      "138": {
	        "92": 2,
	        "94": 3,
	        "124": 1,
	        "136": 1,
	        "138": 1
	      },
	      "140": {
	        "90": 1,
	        "94": 2,
	        "122": 1,
	        "140": 5
	      },
	      "142": {
	        "88": 1,
	        "96": 1,
	        "122": 1,
	        "142": 1
	      },
	      "144": {
	        "88": 1,
	        "94": 1,
	        "96": 1,
	        "98": 2,
	        "102": 2,
	        "104": 4,
	        "114": 13,
	        "116": 1,
	        "120": 1,
	        "144": 1
	      },
	      "146": {
	        "88": 1,
	        "96": 1,
	        "98": 7,
	        "100": 4,
	        "116": 2,
	        "120": 1,
	        "144": 1
	      },
	      "148": {
	        "88": 1,
	        "96": 1,
	        "98": 2,
	        "100": 1,
	        "112": 1,
	        "114": 1,
	        "120": 1,
	        "146": 1
	      },
	      "150": {
	        "86": 1,
	        "96": 1,
	        "98": 1,
	        "110": 1,
	        "120": 2,
	        "148": 1
	      },
	      "152": {
	        "98": 2,
	        "100": 1,
	        "110": 1,
	        "120": 1,
	        "122": 24,
	        "148": 1
	      },
	      "154": {
	        "88": 1,
	        "98": 1,
	        "100": 4,
	        "106": 1,
	        "118": 1,
	        "150": 1
	      },
	      "156": {
	        "90": 1,
	        "102": 2,
	        "104": 2,
	        "108": 1,
	        "110": 16,
	        "118": 1,
	        "152": 1
	      },
	      "158": {
	        "90": 2,
	        "94": 1,
	        "98": 1,
	        "106": 1,
	        "108": 1,
	        "110": 1,
	        "114": 1,
	        "116": 1,
	        "154": 6,
	        "156": 1,
	        "158": 1,
	        "160": 1
	      },
	      "160": {
	        "90": 2,
	        "96": 1,
	        "98": 1,
	        "106": 1,
	        "162": 1
	      },
	      "162": {
	        "88": 2,
	        "106": 1,
	        "114": 6,
	        "164": 1
	      },
	      "164": {
	        "88": 2,
	        "96": 1,
	        "98": 2,
	        "106": 1,
	        "114": 2,
	        "164": 1
	      },
	      "166": {
	        "98": 4,
	        "112": 1,
	        "114": 1,
	        "166": 1
	      },
	      "168": {
	        "88": 2,
	        "98": 1,
	        "100": 5,
	        "104": 1,
	        "112": 1,
	        "168": 1
	      },
	      "170": {
	        "88": 2,
	        "98": 1,
	        "100": 8,
	        "102": 2,
	        "104": 1,
	        "110": 2,
	        "170": 1
	      },
	      "172": {
	        "84": 1,
	        "86": 1,
	        "88": 1,
	        "90": 1,
	        "100": 1,
	        "102": 5,
	        "104": 4,
	        "106": 3,
	        "108": 7,
	        "110": 3,
	        "112": 1,
	        "114": 1,
	        "170": 1
	      },
	      "174": {
	        "84": 2,
	        "86": 5,
	        "88": 1,
	        "90": 1,
	        "96": 1,
	        "98": 3,
	        "100": 7,
	        "102": 8,
	        "104": 13,
	        "106": 6,
	        "108": 15,
	        "110": 2,
	        "112": 1,
	        "114": 4,
	        "116": 2,
	        "144": 1,
	        "146": 1,
	        "148": 4,
	        "150": 1,
	        "172": 1,
	        "174": 2
	      },
	      "176": {
	        "82": 1,
	        "84": 3,
	        "86": 2,
	        "88": 5,
	        "90": 7,
	        "92": 4,
	        "94": 9,
	        "96": 2,
	        "98": 9,
	        "100": 12,
	        "102": 24,
	        "104": 23,
	        "106": 13,
	        "108": 9,
	        "110": 1,
	        "112": 4,
	        "116": 1,
	        "120": 1,
	        "122": 1,
	        "126": 1,
	        "128": 1,
	        "132": 1,
	        "136": 1,
	        "138": 1,
	        "142": 1,
	        "152": 1,
	        "154": 1,
	        "162": 1,
	        "166": 1,
	        "172": 4,
	        "174": 1
	      },
	      "178": {
	        "84": 2,
	        "86": 1,
	        "90": 10,
	        "92": 10,
	        "94": 1,
	        "96": 7,
	        "98": 7,
	        "100": 10,
	        "102": 9,
	        "104": 12,
	        "106": 8,
	        "108": 11,
	        "110": 4,
	        "112": 4,
	        "114": 1,
	        "130": 1,
	        "158": 1,
	        "160": 1,
	        "168": 1,
	        "170": 1,
	        "174": 1
	      },
	      "180": {
	        "84": 1,
	        "86": 1,
	        "88": 2,
	        "90": 2,
	        "92": 4,
	        "94": 2,
	        "98": 2,
	        "100": 2,
	        "102": 2,
	        "104": 1,
	        "106": 1,
	        "108": 8,
	        "110": 6,
	        "112": 15,
	        "174": 2
	      },
	      "182": {
	        "86": 1,
	        "90": 1,
	        "92": 1,
	        "94": 2,
	        "96": 1,
	        "108": 2,
	        "174": 2,
	        "176": 27
	      },
	      "184": {
	        "94": 1,
	        "96": 1
	      }
	    },
	    "last_hits": 28,
	    "leaver_status": 0,
	    "level": 20,
	    "lh_t": [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 6, 8, 11, 11, 11, 12, 14, 14, 14, 17, 24, 24, 24, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28],
	    "life_state": {
	      "0": 2617,
	      "1": 14,
	      "2": 141
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2583,
	      "max": true,
	      "inflictor": "omniknight_purification",
	      "unit": "npc_dota_hero_omniknight",
	      "key": "npc_dota_hero_tusk",
	      "value": 328,
	      "slot": 8,
	      "player_slot": 131
	    },
	    "multi_kills": {},
	    "obs": {
	      "94": {
	        "78": 1
	      },
	      "106": {
	        "78": 1
	      },
	      "108": {
	        "128": 1
	      },
	      "120": {
	        "90": 1
	      },
	      "122": {
	        "136": 1
	      },
	      "126": {
	        "126": 1
	      },
	      "128": {
	        "126": 1,
	        "144": 1
	      },
	      "160": {
	        "96": 1
	      }
	    },
	    "obs_left_log": [{
	      "time": 330,
	      "type": "obs_left_log",
	      "key": "[122, 136]",
	      "slot": 8,
	      "x": 122,
	      "y": 136,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 4063657,
	      "player_slot": 131
	    }, {
	      "time": 408,
	      "type": "obs_left_log",
	      "key": "[160, 96]",
	      "slot": 8,
	      "x": 160,
	      "y": 96,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 11059964,
	      "player_slot": 131
	    }, {
	      "time": 1197,
	      "type": "obs_left_log",
	      "key": "[126, 126]",
	      "slot": 8,
	      "x": 126,
	      "y": 126,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 12879730,
	      "player_slot": 131
	    }, {
	      "time": 1551,
	      "type": "obs_left_log",
	      "key": "[120, 90]",
	      "slot": 8,
	      "x": 120,
	      "y": 90,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 15320461,
	      "player_slot": 131
	    }, {
	      "time": 1995,
	      "type": "obs_left_log",
	      "key": "[106, 78]",
	      "slot": 8,
	      "x": 106,
	      "y": 78,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 4932626,
	      "player_slot": 131
	    }, {
	      "time": 2083,
	      "type": "obs_left_log",
	      "key": "[128, 144]",
	      "slot": 8,
	      "x": 128,
	      "y": 144,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 1262721,
	      "player_slot": 131
	    }, {
	      "time": 2234,
	      "type": "obs_left_log",
	      "key": "[128, 126]",
	      "slot": 8,
	      "x": 128,
	      "y": 126,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 11224169,
	      "player_slot": 131
	    }, {
	      "time": 2455,
	      "type": "obs_left_log",
	      "key": "[108, 128]",
	      "slot": 8,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 10126395,
	      "player_slot": 131
	    }],
	    "obs_log": [{
	      "time": -37,
	      "type": "obs_log",
	      "key": "[122, 136]",
	      "slot": 8,
	      "x": 122,
	      "y": 136,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 4063657,
	      "player_slot": 131
	    }, {
	      "time": 41,
	      "type": "obs_log",
	      "key": "[160, 96]",
	      "slot": 8,
	      "x": 160,
	      "y": 96,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 11059964,
	      "player_slot": 131
	    }, {
	      "time": 830,
	      "type": "obs_log",
	      "key": "[126, 126]",
	      "slot": 8,
	      "x": 126,
	      "y": 126,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 12879730,
	      "player_slot": 131
	    }, {
	      "time": 1436,
	      "type": "obs_log",
	      "key": "[120, 90]",
	      "slot": 8,
	      "x": 120,
	      "y": 90,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 15320461,
	      "player_slot": 131
	    }, {
	      "time": 1716,
	      "type": "obs_log",
	      "key": "[128, 144]",
	      "slot": 8,
	      "x": 128,
	      "y": 144,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 1262721,
	      "player_slot": 131
	    }, {
	      "time": 1867,
	      "type": "obs_log",
	      "key": "[128, 126]",
	      "slot": 8,
	      "x": 128,
	      "y": 126,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 11224169,
	      "player_slot": 131
	    }, {
	      "time": 1962,
	      "type": "obs_log",
	      "key": "[106, 78]",
	      "slot": 8,
	      "x": 106,
	      "y": 78,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 4932626,
	      "player_slot": 131
	    }, {
	      "time": 2088,
	      "type": "obs_log",
	      "key": "[108, 128]",
	      "slot": 8,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 10126395,
	      "player_slot": 131
	    }, {
	      "time": 2359,
	      "type": "obs_log",
	      "key": "[94, 78]",
	      "slot": 8,
	      "x": 94,
	      "y": 78,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 3966131,
	      "player_slot": 131
	    }],
	    "obs_placed": 9,
	    "party_id": 1,
	    "permanent_buffs": [],
	    "purchase": {
	      "boots": 1,
	      "tpscroll": 4,
	      "arcane_boots": 1,
	      "energy_booster": 2,
	      "ward_observer": 8,
	      "ring_of_health": 1,
	      "recipe_aether_lens": 1,
	      "aether_lens": 1,
	      "staff_of_wizardry": 2,
	      "ring_of_regen": 1,
	      "dust": 2,
	      "force_staff": 1,
	      "recipe_force_staff": 1,
	      "ward_sentry": 4,
	      "ward_dispenser": 2,
	      "point_booster": 1,
	      "ogre_axe": 1,
	      "blade_of_alacrity": 1,
	      "ultimate_scepter": 1
	    },
	    "purchase_log": [{
	      "time": 243,
	      "key": "boots"
	    }, {
	      "time": 388,
	      "key": "tpscroll"
	    }, {
	      "time": 645,
	      "key": "arcane_boots"
	    }, {
	      "time": 645,
	      "key": "energy_booster"
	    }, {
	      "time": 742,
	      "key": "ward_observer"
	    }, {
	      "time": 743,
	      "key": "ward_observer"
	    }, {
	      "time": 1107,
	      "key": "ring_of_health"
	    }, {
	      "time": 1138,
	      "key": "tpscroll"
	    }, {
	      "time": 1185,
	      "key": "energy_booster"
	    }, {
	      "time": 1302,
	      "key": "tpscroll"
	    }, {
	      "time": 1364,
	      "key": "aether_lens"
	    }, {
	      "time": 1393,
	      "key": "tpscroll"
	    }, {
	      "time": 1399,
	      "key": "ward_observer"
	    }, {
	      "time": 1531,
	      "key": "staff_of_wizardry"
	    }, {
	      "time": 1532,
	      "key": "ring_of_regen"
	    }, {
	      "time": 1665,
	      "key": "dust"
	    }, {
	      "time": 1666,
	      "key": "ward_observer"
	    }, {
	      "time": 1837,
	      "key": "force_staff"
	    }, {
	      "time": 1878,
	      "key": "ward_observer"
	    }, {
	      "time": 2003,
	      "key": "ward_sentry"
	    }, {
	      "time": 2003,
	      "key": "ward_sentry"
	    }, {
	      "time": 2004,
	      "key": "ward_observer"
	    }, {
	      "time": 2207,
	      "key": "ward_observer"
	    }, {
	      "time": 2208,
	      "key": "ward_observer"
	    }, {
	      "time": 2456,
	      "key": "point_booster"
	    }, {
	      "time": 2458,
	      "key": "staff_of_wizardry"
	    }, {
	      "time": 2458,
	      "key": "ogre_axe"
	    }, {
	      "time": 2507,
	      "key": "blade_of_alacrity"
	    }, {
	      "time": 2545,
	      "key": "ultimate_scepter"
	    }],
	    "rune_pickups": 3,
	    "runes": {},
	    "runes_log": [],
	    "sen": {
	      "90": {
	        "92": 1
	      },
	      "94": {
	        "116": 1
	      },
	      "108": {
	        "128": 1
	      },
	      "116": {
	        "120": 1
	      }
	    },
	    "sen_left_log": [{
	      "time": 2224,
	      "type": "sen_left_log",
	      "key": "[116, 120]",
	      "slot": 8,
	      "x": 116,
	      "y": 120,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 6457223,
	      "player_slot": 131
	    }, {
	      "time": 2326,
	      "type": "sen_left_log",
	      "key": "[108, 128]",
	      "slot": 8,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 7389607,
	      "player_slot": 131
	    }, {
	      "time": 2475,
	      "type": "sen_left_log",
	      "key": "[94, 116]",
	      "slot": 8,
	      "x": 94,
	      "y": 116,
	      "z": 132,
	      "entityleft": true,
	      "ehandle": 13043606,
	      "player_slot": 131
	    }, {
	      "time": 2584,
	      "type": "sen_left_log",
	      "key": "[90, 92]",
	      "slot": 8,
	      "x": 90,
	      "y": 92,
	      "z": 130,
	      "entityleft": true,
	      "ehandle": 11240553,
	      "player_slot": 131
	    }],
	    "sen_log": [{
	      "time": 2076,
	      "type": "sen_log",
	      "key": "[116, 120]",
	      "slot": 8,
	      "x": 116,
	      "y": 120,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 6457223,
	      "player_slot": 131
	    }, {
	      "time": 2079,
	      "type": "sen_log",
	      "key": "[108, 128]",
	      "slot": 8,
	      "x": 108,
	      "y": 128,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 7389607,
	      "player_slot": 131
	    }, {
	      "time": 2229,
	      "type": "sen_log",
	      "key": "[94, 116]",
	      "slot": 8,
	      "x": 94,
	      "y": 116,
	      "z": 132,
	      "entityleft": false,
	      "ehandle": 13043606,
	      "player_slot": 131
	    }, {
	      "time": 2337,
	      "type": "sen_log",
	      "key": "[90, 92]",
	      "slot": 8,
	      "x": 90,
	      "y": 92,
	      "z": 130,
	      "entityleft": false,
	      "ehandle": 11240553,
	      "player_slot": 131
	    }],
	    "sen_placed": 4,
	    "stuns": 0,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 1027,
	    "xp_per_min": 394,
	    "xp_reasons": {
	      "0": 357,
	      "1": 10306,
	      "2": 6283,
	      "3": 367
	    },
	    "xp_t": [0, 44, 177, 512, 779, 934, 956, 1525, 1599, 1892, 1892, 2004, 2468, 2468, 2828, 3632, 4089, 4149, 4823, 4823, 5498, 5768, 5834, 6484, 6622, 6948, 7705, 7705, 7705, 7839, 8467, 8467, 8665, 9331, 9390, 9478, 9701, 10173, 11417, 12289, 12759, 14068, 14872, 15812, 17286, 17286, 17286],
	    "personaname": "Cici",
	    "name": null,
	    "last_login": null,
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": false,
	    "win": 1,
	    "lose": 0,
	    "total_gold": 14787,
	    "total_xp": 17237,
	    "kills_per_min": 0.022857142857142857,
	    "kda": 3,
	    "abandons": 0,
	    "neutral_kills": 0,
	    "tower_kills": 1,
	    "courier_kills": 0,
	    "lane_kills": 26,
	    "hero_kills": 1,
	    "observer_kills": 0,
	    "sentry_kills": 0,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 0,
	    "buyback_count": 0,
	    "observer_uses": 8,
	    "sentry_uses": 1,
	    "lane_efficiency": 0.2877981470530258,
	    "lane_efficiency_pct": 28,
	    "lane": 1,
	    "lane_role": 3,
	    "purchase_time": {
	      "boots": 243,
	      "tpscroll": 4221,
	      "arcane_boots": 645,
	      "energy_booster": 1830,
	      "ward_observer": 12847,
	      "ring_of_health": 1107,
	      "aether_lens": 1364,
	      "staff_of_wizardry": 3989,
	      "ring_of_regen": 1532,
	      "dust": 1665,
	      "force_staff": 1837,
	      "ward_sentry": 4006,
	      "point_booster": 2456,
	      "ogre_axe": 2458,
	      "blade_of_alacrity": 2507,
	      "ultimate_scepter": 2545
	    },
	    "first_purchase_time": {
	      "boots": 243,
	      "tpscroll": 388,
	      "arcane_boots": 645,
	      "energy_booster": 645,
	      "ward_observer": 742,
	      "ring_of_health": 1107,
	      "aether_lens": 1364,
	      "staff_of_wizardry": 1531,
	      "ring_of_regen": 1532,
	      "dust": 1665,
	      "force_staff": 1837,
	      "ward_sentry": 2003,
	      "point_booster": 2456,
	      "ogre_axe": 2458,
	      "blade_of_alacrity": 2507,
	      "ultimate_scepter": 2545
	    },
	    "item_win": {
	      "boots": 1,
	      "tpscroll": 1,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "ward_observer": 1,
	      "ring_of_health": 1,
	      "aether_lens": 1,
	      "staff_of_wizardry": 1,
	      "ring_of_regen": 1,
	      "dust": 1,
	      "force_staff": 1,
	      "ward_sentry": 1,
	      "point_booster": 1,
	      "ogre_axe": 1,
	      "blade_of_alacrity": 1,
	      "ultimate_scepter": 1
	    },
	    "item_usage": {
	      "boots": 1,
	      "tpscroll": 1,
	      "arcane_boots": 1,
	      "energy_booster": 1,
	      "ward_observer": 1,
	      "ring_of_health": 1,
	      "aether_lens": 1,
	      "staff_of_wizardry": 1,
	      "ring_of_regen": 1,
	      "dust": 1,
	      "force_staff": 1,
	      "ward_sentry": 1,
	      "point_booster": 1,
	      "ogre_axe": 1,
	      "blade_of_alacrity": 1,
	      "ultimate_scepter": 1
	    },
	    "purchase_ward_observer": 8,
	    "purchase_ward_sentry": 4,
	    "purchase_tpscroll": 4,
	    "actions_per_min": 150,
	    "life_state_dead": 155,
	    "solo_competitive_rank": null,
	    "cosmetics": [{
	      "item_id": 4266,
	      "name": "Armor of the Purist Champion",
	      "prefab": "wearable",
	      "creation_date": null,
	      "image_inventory": "econ/items/omniknight/shoulder_purist",
	      "image_path": "icons/econ/items/omniknight/shoulder_purist.a0baf2c6a32ccc39605101efb0b242c2a2493566.png",
	      "item_description": "#DOTA_Item_Desc_Armor_of_the_Purist_Champion",
	      "item_name": "#DOTA_Item_Armor_of_the_Purist_Champion",
	      "item_rarity": "uncommon",
	      "item_type_name": "#DOTA_WearableType_Armor",
	      "used_by_heroes": "npc_dota_hero_omniknight"
	    }, {
	      "item_id": 7090,
	      "name": "Armguards of the Stalwart",
	      "prefab": "wearable",
	      "creation_date": "2014-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/omniknight/stalwart_arms/stalwart_arms",
	      "image_path": "icons/econ/items/omniknight/stalwart_arms/stalwart_arms.f17747e8fd68bed15451683e8d3c393510705be7.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Armguards_of_the_Stalwart",
	      "item_rarity": "uncommon",
	      "item_type_name": "#DOTA_WearableType_Arms",
	      "used_by_heroes": "npc_dota_hero_omniknight"
	    }, {
	      "item_id": 7093,
	      "name": "Plate of the Stalwart Soul",
	      "prefab": "wearable",
	      "creation_date": "2014-09-09T00:00:00.000Z",
	      "image_inventory": "econ/items/omniknight/stalwart_back/stalwart_back",
	      "image_path": "icons/econ/items/omniknight/stalwart_back/stalwart_back.a72999d7c1783140f9c9482ca0cd27cf1b0f7540.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Plate_of_the_Stalwart_Soul",
	      "item_rarity": "uncommon",
	      "item_type_name": "#DOTA_WearableType_Plate",
	      "used_by_heroes": "npc_dota_hero_omniknight"
	    }, {
	      "item_id": 7580,
	      "name": "Adoring Wingfall",
	      "prefab": "wearable",
	      "creation_date": "2016-03-01T00:00:00.000Z",
	      "image_inventory": "econ/items/omniknight/light_hammer/mesh/light_hammer_model",
	      "image_path": "icons/econ/items/omniknight/light_hammer/mesh/light_hammer_model.c8cdac070402cf8315e5a3bedfeeb848543d2e3a.png",
	      "item_description": "#DOTA_Item_Desc_Adoring_Wingfall",
	      "item_name": "#DOTA_Item_Adoring_Wingfall",
	      "item_rarity": "immortal",
	      "item_type_name": "#DOTA_WearableType_Hammer",
	      "used_by_heroes": "npc_dota_hero_omniknight"
	    }, {
	      "item_id": 8958,
	      "name": "Crown of Sacred Light",
	      "prefab": "wearable",
	      "creation_date": "2016-09-14T00:00:00.000Z",
	      "image_inventory": "econ/items/omniknight/omniknight_sacred_light_head/omniknight_sacred_light_head",
	      "image_path": "icons/econ/items/omniknight/omniknight_sacred_light_head/omniknight_sacred_light_head.2cc9e981a810ed8f9880ee58bc96805a92f6237e.png",
	      "item_description": "#DOTA_Item_Desc_Crown_of_Sacred_Light",
	      "item_name": "#DOTA_Item_Crown_of_Sacred_Light",
	      "item_rarity": "mythical",
	      "item_type_name": "#DOTA_WearableType_head",
	      "used_by_heroes": "npc_dota_hero_omniknight"
	    }, {
	      "item_id": 11425,
	      "name": "Fraidy Jack",
	      "prefab": "courier",
	      "creation_date": "2016-09-08T00:00:00.000Z",
	      "image_inventory": "econ/items/courier/little_fraid_the_courier_of_simons_retribution/little_fraid_the_courier_of_simons_retribution",
	      "image_path": "icons/econ/items/courier/little_fraid_the_courier_of_simons_retribution/little_fraid_the_courier_of_simons_retribution.e6db376884338d135cd6f05d3a2dd17fbdee4504.png",
	      "item_description": "#DOTA_Item_Desc_Fraidy_Jack",
	      "item_name": "#DOTA_Item_Fraidy_Jack",
	      "item_rarity": "mythical",
	      "item_type_name": null,
	      "used_by_heroes": null
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 338,
	        "pct": 0.4696329254727475
	      },
	      "xp_per_min": {
	        "raw": 394,
	        "pct": 0.4402669632925473
	      },
	      "kills_per_min": {
	        "raw": 0.022857142857142857,
	        "pct": 0.16777926123720516
	      },
	      "last_hits_per_min": {
	        "raw": 0.64,
	        "pct": 0.18313306631063642
	      },
	      "hero_damage_per_min": {
	        "raw": 149.8057142857143,
	        "pct": 0.31019136626613264
	      },
	      "hero_healing_per_min": {
	        "raw": 192.5257142857143,
	        "pct": 0.7120605251446372
	      },
	      "tower_damage": {
	        "raw": 1027,
	        "pct": 0.7635150166852058
	      }
	    }
	  }, {
	    "match_id": 2890465108,
	    "player_slot": 132,
	    "ability_upgrades_arr": [5723, 5716, 5716, 5723, 5723, 5716, 5723, 5725, 5716, 5906, 5721, 5725, 5721, 5721, 6311, 5721, 5725, 5940],
	    "ability_uses": {
	      "monkey_king_boundless_strike": 41,
	      "monkey_king_wukongs_command": 10,
	      "monkey_king_tree_dance": 53,
	      "monkey_king_primal_spring": 11,
	      "monkey_king_primal_spring_early": 4
	    },
	    "account_id": 79237507,
	    "actions": {
	      "1": 6508,
	      "2": 273,
	      "3": 23,
	      "4": 1349,
	      "5": 104,
	      "6": 1,
	      "7": 60,
	      "8": 129,
	      "10": 36,
	      "11": 15,
	      "12": 3,
	      "14": 10,
	      "15": 6,
	      "16": 33,
	      "17": 4,
	      "19": 8,
	      "27": 11,
	      "31": 1
	    },
	    "additional_units": null,
	    "assists": 15,
	    "backpack_0": 40,
	    "backpack_1": 0,
	    "backpack_2": 0,
	    "buyback_log": [],
	    "camps_stacked": 0,
	    "creeps_stacked": 0,
	    "damage": {
	      "npc_dota_hero_spectre": 8556,
	      "npc_dota_hero_ogre_magi": 10190,
	      "npc_dota_creep_goodguys_melee": 30062,
	      "npc_dota_hero_mirana": 4470,
	      "npc_dota_creep_goodguys_ranged": 11284,
	      "npc_dota_goodguys_siege": 1413,
	      "npc_dota_hero_tusk": 9300,
	      "npc_dota_creep_badguys_melee": 99,
	      "illusion_npc_dota_hero_spectre": 4956,
	      "npc_dota_creep_badguys_ranged": 112,
	      "npc_dota_hero_bristleback": 9131,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 1076,
	      "npc_dota_neutral_polar_furbolg_champion": 833,
	      "npc_dota_neutral_forest_troll_berserker": 1200,
	      "npc_dota_neutral_forest_troll_high_priest": 628,
	      "npc_dota_neutral_mud_golem": 1732,
	      "npc_dota_neutral_mud_golem_split": 3484,
	      "npc_dota_neutral_satyr_soulstealer": 2045,
	      "npc_dota_neutral_satyr_trickster": 1646,
	      "npc_dota_neutral_satyr_hellcaller": 1272,
	      "npc_dota_neutral_granite_golem": 2118,
	      "npc_dota_neutral_rock_golem": 1719,
	      "npc_dota_roshan": 4142,
	      "npc_dota_goodguys_tower2_mid": 126,
	      "npc_dota_tusk_frozen_sigil4": 8,
	      "npc_dota_goodguys_melee_rax_mid": 369,
	      "npc_dota_goodguys_range_rax_mid": 255,
	      "npc_dota_goodguys_tower3_bot": 495,
	      "npc_dota_goodguys_range_rax_bot": 918,
	      "npc_dota_goodguys_melee_rax_bot": 184,
	      "npc_dota_goodguys_healers": 1568,
	      "npc_dota_goodguys_fillers": 852,
	      "npc_dota_goodguys_tower4": 1208,
	      "npc_dota_goodguys_fort": 1365
	    },
	    "damage_inflictor": {
	      "null": 40557,
	      "orb_of_venom": 451,
	      "monkey_king_tree_dance": 639
	    },
	    "damage_inflictor_received": {
	      "null": 8923,
	      "ogre_magi_ignite": 2985,
	      "mirana_arrow": 553,
	      "mirana_starfall": 1941,
	      "tusk_ice_shards": 2171,
	      "spectre_spectral_dagger": 1611,
	      "spectre_desolate": 572,
	      "ogre_magi_fireblast": 459,
	      "tusk_snowball": 1389,
	      "bristleback_quill_spray": 3229,
	      "spectre_dispersion": 930,
	      "blade_mail": 1853
	    },
	    "damage_taken": {
	      "npc_dota_creep_goodguys_ranged": 714,
	      "npc_dota_creep_goodguys_melee": 1072,
	      "npc_dota_hero_mirana": 2757,
	      "npc_dota_hero_ogre_magi": 3600,
	      "npc_dota_hero_spectre": 3999,
	      "npc_dota_goodguys_siege": 158,
	      "npc_dota_hero_tusk": 10903,
	      "npc_dota_goodguys_tower1_bot": 610,
	      "npc_dota_hero_bristleback": 5357,
	      "npc_dota_goodguys_tower1_mid": 395,
	      "npc_dota_neutral_dark_troll_warlord": 28,
	      "npc_dota_neutral_dark_troll": 8,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 99,
	      "npc_dota_neutral_polar_furbolg_champion": 105,
	      "npc_dota_neutral_forest_troll_berserker": 45,
	      "npc_dota_neutral_forest_troll_high_priest": 24,
	      "npc_dota_goodguys_tower3_bot": 70,
	      "npc_dota_neutral_satyr_trickster": 11,
	      "npc_dota_neutral_satyr_hellcaller": 85,
	      "npc_dota_neutral_rock_golem": 87,
	      "npc_dota_neutral_granite_golem": 143,
	      "npc_dota_goodguys_tower2_mid": 415,
	      "npc_dota_goodguys_tower4": 467,
	      "npc_dota_neutral_satyr_soulstealer": 10
	    },
	    "deaths": 6,
	    "denies": 2,
	    "dn_t": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	    "gold": 3377,
	    "gold_per_min": 523,
	    "gold_reasons": {
	      "0": 1089,
	      "1": -1364,
	      "6": 412,
	      "11": 5161,
	      "12": 7138,
	      "13": 5586,
	      "14": 200
	    },
	    "gold_spent": 19660,
	    "gold_t": [0, 135, 353, 728, 982, 1438, 1984, 2612, 2790, 3083, 3306, 3633, 4275, 4797, 5141, 5819, 6182, 6418, 7050, 7310, 7626, 8158, 8418, 9224, 9537, 10174, 10407, 10507, 11029, 11235, 11386, 11486, 12045, 12550, 13173, 13631, 14162, 14462, 15811, 17047, 18047, 19125, 19397, 20650, 22926, 22926, 22926],
	    "hero_damage": 41647,
	    "hero_healing": 0,
	    "hero_hits": {
	      "null": 266,
	      "orb_of_venom": 246,
	      "monkey_king_tree_dance": 5
	    },
	    "hero_id": 114,
	    "item_0": 252,
	    "item_1": 249,
	    "item_2": 50,
	    "item_3": 133,
	    "item_4": 46,
	    "item_5": 143,
	    "item_uses": {
	      "tango": 4,
	      "flask": 1,
	      "tpscroll": 8,
	      "phase_boots": 90,
	      "enchanted_mango": 1,
	      "invis_sword": 5,
	      "silver_edge": 21
	    },
	    "kill_streaks": {
	      "3": 3,
	      "4": 3,
	      "5": 3,
	      "6": 2,
	      "7": 1,
	      "8": 1,
	      "9": 1,
	      "10": 1
	    },
	    "killed": {
	      "npc_dota_creep_goodguys_melee": 76,
	      "npc_dota_creep_goodguys_ranged": 29,
	      "npc_dota_hero_mirana": 4,
	      "npc_dota_hero_tusk": 4,
	      "npc_dota_hero_ogre_magi": 7,
	      "npc_dota_hero_spectre": 5,
	      "npc_dota_creep_badguys_melee": 1,
	      "npc_dota_goodguys_siege": 2,
	      "npc_dota_creep_badguys_ranged": 1,
	      "npc_dota_hero_bristleback": 3,
	      "npc_dota_neutral_polar_furbolg_ursa_warrior": 1,
	      "npc_dota_neutral_polar_furbolg_champion": 1,
	      "npc_dota_neutral_forest_troll_berserker": 2,
	      "npc_dota_neutral_forest_troll_high_priest": 1,
	      "npc_dota_neutral_mud_golem": 2,
	      "npc_dota_neutral_mud_golem_split": 4,
	      "npc_dota_neutral_satyr_soulstealer": 3,
	      "npc_dota_neutral_satyr_trickster": 3,
	      "npc_dota_neutral_satyr_hellcaller": 1,
	      "npc_dota_neutral_rock_golem": 2,
	      "npc_dota_neutral_granite_golem": 1,
	      "npc_dota_tusk_frozen_sigil4": 2,
	      "npc_dota_goodguys_range_rax_bot": 1,
	      "npc_dota_goodguys_healers": 1,
	      "npc_dota_goodguys_fillers": 1,
	      "npc_dota_goodguys_tower4": 1
	    },
	    "killed_by": {
	      "npc_dota_hero_mirana": 2,
	      "npc_dota_hero_tusk": 4
	    },
	    "kills": 23,
	    "kills_log": [{
	      "time": 288,
	      "key": "npc_dota_hero_mirana"
	    }, {
	      "time": 311,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 380,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 407,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 503,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 686,
	      "key": "npc_dota_hero_mirana"
	    }, {
	      "time": 688,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 892,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 895,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 940,
	      "key": "npc_dota_hero_mirana"
	    }, {
	      "time": 1066,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 1341,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 1462,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 1909,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 1953,
	      "key": "npc_dota_hero_bristleback"
	    }, {
	      "time": 2144,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 2247,
	      "key": "npc_dota_hero_mirana"
	    }, {
	      "time": 2252,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 2400,
	      "key": "npc_dota_hero_spectre"
	    }, {
	      "time": 2445,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 2583,
	      "key": "npc_dota_hero_ogre_magi"
	    }, {
	      "time": 2584,
	      "key": "npc_dota_hero_tusk"
	    }, {
	      "time": 2626,
	      "key": "npc_dota_hero_spectre"
	    }],
	    "lane_pos": {
	      "132": {
	        "94": 31
	      },
	      "134": {
	        "94": 3
	      },
	      "136": {
	        "94": 1
	      },
	      "138": {
	        "94": 1
	      },
	      "140": {
	        "92": 1,
	        "96": 1,
	        "114": 1
	      },
	      "142": {
	        "92": 1,
	        "94": 3,
	        "96": 2,
	        "116": 4
	      },
	      "144": {
	        "90": 1,
	        "96": 3,
	        "98": 1,
	        "112": 4,
	        "114": 1,
	        "116": 1
	      },
	      "146": {
	        "88": 1,
	        "96": 2,
	        "98": 2,
	        "112": 2,
	        "118": 1
	      },
	      "148": {
	        "88": 1,
	        "96": 2,
	        "98": 2,
	        "100": 1,
	        "112": 1,
	        "118": 1
	      },
	      "150": {
	        "86": 1,
	        "98": 1,
	        "108": 1,
	        "110": 1,
	        "124": 23,
	        "126": 3
	      },
	      "152": {
	        "96": 1,
	        "100": 1,
	        "106": 1,
	        "116": 1,
	        "124": 7,
	        "126": 12
	      },
	      "154": {
	        "86": 1,
	        "92": 1,
	        "94": 1,
	        "96": 1,
	        "102": 1,
	        "104": 1,
	        "116": 1,
	        "126": 2
	      },
	      "156": {
	        "86": 2,
	        "88": 1,
	        "116": 1,
	        "126": 2
	      },
	      "158": {
	        "88": 1
	      },
	      "160": {
	        "86": 1,
	        "116": 1,
	        "126": 1,
	        "128": 1
	      },
	      "162": {
	        "88": 2,
	        "116": 1,
	        "126": 1,
	        "128": 1
	      },
	      "164": {
	        "86": 1,
	        "114": 1,
	        "126": 1,
	        "128": 1
	      },
	      "166": {
	        "88": 1,
	        "114": 1,
	        "126": 1,
	        "130": 1
	      },
	      "168": {
	        "80": 2,
	        "82": 1,
	        "84": 2,
	        "86": 1,
	        "90": 1,
	        "94": 3,
	        "96": 2,
	        "98": 1,
	        "100": 1,
	        "104": 1,
	        "128": 1,
	        "130": 1
	      },
	      "170": {
	        "82": 3,
	        "84": 2,
	        "88": 1,
	        "90": 2,
	        "92": 2,
	        "94": 1,
	        "96": 3,
	        "98": 3,
	        "100": 5,
	        "102": 1,
	        "104": 1,
	        "114": 1,
	        "130": 2
	      },
	      "172": {
	        "84": 1,
	        "86": 9,
	        "88": 3,
	        "90": 1,
	        "92": 2,
	        "94": 2,
	        "96": 1,
	        "98": 2,
	        "100": 3,
	        "102": 8,
	        "104": 2,
	        "106": 1,
	        "108": 3,
	        "110": 1,
	        "112": 10,
	        "114": 2,
	        "130": 1,
	        "132": 1
	      },
	      "174": {
	        "84": 2,
	        "86": 8,
	        "88": 8,
	        "90": 9,
	        "92": 17,
	        "94": 7,
	        "96": 4,
	        "98": 7,
	        "100": 9,
	        "102": 4,
	        "104": 5,
	        "106": 13,
	        "108": 21,
	        "110": 9,
	        "112": 4,
	        "114": 4,
	        "116": 4,
	        "118": 2,
	        "120": 5,
	        "122": 1,
	        "124": 1,
	        "126": 1,
	        "128": 1,
	        "130": 2,
	        "132": 2,
	        "134": 1,
	        "136": 2,
	        "138": 1
	      },
	      "176": {
	        "84": 1,
	        "88": 3,
	        "90": 10,
	        "92": 6,
	        "94": 11,
	        "96": 13,
	        "98": 15,
	        "100": 11,
	        "102": 12,
	        "104": 14,
	        "106": 15,
	        "108": 4,
	        "110": 2,
	        "112": 3,
	        "118": 1,
	        "134": 2,
	        "136": 1,
	        "138": 3,
	        "140": 2,
	        "142": 1,
	        "144": 1,
	        "146": 1
	      },
	      "178": {
	        "90": 1,
	        "92": 5,
	        "94": 4,
	        "96": 4,
	        "98": 6,
	        "100": 6,
	        "102": 3,
	        "104": 5,
	        "106": 6,
	        "110": 4,
	        "112": 1,
	        "114": 1,
	        "118": 1,
	        "120": 1,
	        "122": 1,
	        "126": 1,
	        "128": 1,
	        "132": 1,
	        "134": 1,
	        "136": 1,
	        "140": 1,
	        "142": 1,
	        "144": 1,
	        "148": 2,
	        "150": 2,
	        "152": 2,
	        "154": 2,
	        "156": 1,
	        "158": 1,
	        "160": 2,
	        "162": 1,
	        "164": 2,
	        "166": 2,
	        "168": 1,
	        "170": 1,
	        "172": 1,
	        "174": 5
	      },
	      "180": {
	        "86": 2,
	        "90": 1,
	        "92": 1,
	        "94": 1,
	        "96": 4,
	        "98": 1,
	        "100": 1,
	        "102": 2,
	        "104": 2,
	        "106": 1,
	        "108": 2,
	        "172": 1,
	        "174": 2,
	        "178": 6
	      },
	      "182": {
	        "86": 1,
	        "88": 2,
	        "90": 1,
	        "92": 1,
	        "94": 2,
	        "96": 5,
	        "98": 2,
	        "102": 1,
	        "174": 2,
	        "178": 6
	      },
	      "184": {
	        "88": 1,
	        "94": 2,
	        "96": 1,
	        "98": 1,
	        "100": 1,
	        "102": 1,
	        "174": 4
	      },
	      "186": {
	        "102": 1
	      }
	    },
	    "last_hits": 134,
	    "leaver_status": 0,
	    "level": 23,
	    "lh_t": [0, 1, 4, 11, 15, 17, 21, 24, 26, 26, 29, 34, 37, 46, 52, 53, 53, 56, 61, 61, 61, 70, 70, 79, 80, 80, 82, 82, 91, 91, 92, 92, 93, 96, 111, 114, 114, 114, 124, 125, 126, 127, 131, 131, 134, 134, 134],
	    "life_state": {
	      "0": 2542,
	      "1": 18,
	      "2": 212
	    },
	    "max_hero_hit": {
	      "type": "max_hero_hit",
	      "time": 2583,
	      "max": true,
	      "inflictor": null,
	      "unit": "npc_dota_hero_monkey_king",
	      "key": "npc_dota_hero_ogre_magi",
	      "value": 730,
	      "slot": 9,
	      "player_slot": 132
	    },
	    "multi_kills": {
	      "2": 4
	    },
	    "obs": {},
	    "obs_left_log": [],
	    "obs_log": [],
	    "obs_placed": 0,
	    "party_id": 1,
	    "permanent_buffs": [],
	    "purchase": {
	      "boots": 1,
	      "tpscroll": 9,
	      "orb_of_venom": 1,
	      "blades_of_attack": 2,
	      "phase_boots": 1,
	      "blight_stone": 1,
	      "flying_courier": 1,
	      "quarterstaff": 1,
	      "sobi_mask": 1,
	      "oblivion_staff": 1,
	      "robe": 1,
	      "ogre_axe": 1,
	      "echo_sabre": 1,
	      "claymore": 1,
	      "shadow_amulet": 1,
	      "invis_sword": 1,
	      "ultimate_orb": 1,
	      "recipe_silver_edge": 1,
	      "silver_edge": 1,
	      "belt_of_strength": 1,
	      "javelin": 1,
	      "recipe_basher": 1,
	      "basher": 1,
	      "relic": 1,
	      "rapier": 1,
	      "demon_edge": 1,
	      "ward_sentry": null,
	      "dust": null
	    },
	    "purchase_log": [{
	      "time": 176,
	      "key": "boots"
	    }, {
	      "time": 178,
	      "key": "tpscroll"
	    }, {
	      "time": 214,
	      "key": "orb_of_venom"
	    }, {
	      "time": 341,
	      "key": "blades_of_attack"
	    }, {
	      "time": 341,
	      "key": "phase_boots"
	    }, {
	      "time": 341,
	      "key": "blades_of_attack"
	    }, {
	      "time": 391,
	      "key": "blight_stone"
	    }, {
	      "time": 396,
	      "key": "tpscroll"
	    }, {
	      "time": 415,
	      "key": "flying_courier"
	    }, {
	      "time": 518,
	      "key": "tpscroll"
	    }, {
	      "time": 591,
	      "key": "quarterstaff"
	    }, {
	      "time": 698,
	      "key": "sobi_mask"
	    }, {
	      "time": 698,
	      "key": "oblivion_staff"
	    }, {
	      "time": 698,
	      "key": "robe"
	    }, {
	      "time": 826,
	      "key": "ogre_axe"
	    }, {
	      "time": 852,
	      "key": "echo_sabre"
	    }, {
	      "time": 981,
	      "key": "tpscroll"
	    }, {
	      "time": 984,
	      "key": "tpscroll"
	    }, {
	      "time": 1090,
	      "key": "claymore"
	    }, {
	      "time": 1119,
	      "key": "tpscroll"
	    }, {
	      "time": 1251,
	      "key": "shadow_amulet"
	    }, {
	      "time": 1315,
	      "key": "invis_sword"
	    }, {
	      "time": 1318,
	      "key": "tpscroll"
	    }, {
	      "time": 1544,
	      "key": "ultimate_orb"
	    }, {
	      "time": 1642,
	      "key": "silver_edge"
	    }, {
	      "time": 1676,
	      "key": "tpscroll"
	    }, {
	      "time": 1676,
	      "key": "tpscroll"
	    }, {
	      "time": 1860,
	      "key": "belt_of_strength"
	    }, {
	      "time": 2024,
	      "key": "javelin"
	    }, {
	      "time": 2079,
	      "key": "basher"
	    }, {
	      "time": 2471,
	      "key": "relic"
	    }, {
	      "time": 2556,
	      "key": "rapier"
	    }, {
	      "time": 2556,
	      "key": "demon_edge"
	    }],
	    "rune_pickups": 3,
	    "runes": {},
	    "runes_log": [],
	    "sen": {},
	    "sen_left_log": [],
	    "sen_log": [],
	    "sen_placed": 0,
	    "stuns": 71.03056,
	    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760],
	    "tower_damage": 3555,
	    "xp_per_min": 530,
	    "xp_reasons": {
	      "0": 433,
	      "1": 12845,
	      "2": 9595,
	      "3": 367
	    },
	    "xp_t": [0, 89, 244, 444, 666, 1021, 1478, 2047, 2301, 2456, 2861, 3198, 3707, 4335, 4740, 5566, 5756, 5853, 6521, 6521, 7543, 8372, 8417, 9845, 9944, 10576, 10679, 10679, 11309, 11595, 11820, 11820, 12820, 13620, 14167, 14780, 15765, 16132, 17785, 18657, 19168, 20477, 21241, 21787, 23217, 23217, 23217],
	    "personaname": "Dire Corgi",
	    "name": null,
	    "last_login": "2016-12-01T00:30:52.456Z",
	    "radiant_win": false,
	    "start_time": 1483413306,
	    "duration": 2625,
	    "cluster": 122,
	    "lobby_type": 7,
	    "game_mode": 22,
	    "patch": 20,
	    "region": 2,
	    "isRadiant": false,
	    "win": 1,
	    "lose": 0,
	    "total_gold": 22881,
	    "total_xp": 23187,
	    "kills_per_min": 0.5257142857142857,
	    "kda": 5,
	    "abandons": 0,
	    "neutral_kills": 21,
	    "tower_kills": 1,
	    "courier_kills": 0,
	    "lane_kills": 107,
	    "hero_kills": 23,
	    "observer_kills": 0,
	    "sentry_kills": 0,
	    "roshan_kills": 0,
	    "necronomicon_kills": 0,
	    "ancient_kills": 3,
	    "buyback_count": 0,
	    "observer_uses": 0,
	    "sentry_uses": 0,
	    "lane_efficiency": 0.651685393258427,
	    "lane_efficiency_pct": 65,
	    "lane": 1,
	    "lane_role": 3,
	    "purchase_time": {
	      "boots": 176,
	      "tpscroll": 8846,
	      "orb_of_venom": 214,
	      "blades_of_attack": 682,
	      "phase_boots": 341,
	      "blight_stone": 391,
	      "flying_courier": 415,
	      "quarterstaff": 591,
	      "sobi_mask": 698,
	      "oblivion_staff": 698,
	      "robe": 698,
	      "ogre_axe": 826,
	      "echo_sabre": 852,
	      "claymore": 1090,
	      "shadow_amulet": 1251,
	      "invis_sword": 1315,
	      "ultimate_orb": 1544,
	      "silver_edge": 1642,
	      "belt_of_strength": 1860,
	      "javelin": 2024,
	      "basher": 2079,
	      "relic": 2471,
	      "rapier": 2556,
	      "demon_edge": 2556
	    },
	    "first_purchase_time": {
	      "boots": 176,
	      "tpscroll": 178,
	      "orb_of_venom": 214,
	      "blades_of_attack": 341,
	      "phase_boots": 341,
	      "blight_stone": 391,
	      "flying_courier": 415,
	      "quarterstaff": 591,
	      "sobi_mask": 698,
	      "oblivion_staff": 698,
	      "robe": 698,
	      "ogre_axe": 826,
	      "echo_sabre": 852,
	      "claymore": 1090,
	      "shadow_amulet": 1251,
	      "invis_sword": 1315,
	      "ultimate_orb": 1544,
	      "silver_edge": 1642,
	      "belt_of_strength": 1860,
	      "javelin": 2024,
	      "basher": 2079,
	      "relic": 2471,
	      "rapier": 2556,
	      "demon_edge": 2556
	    },
	    "item_win": {
	      "boots": 1,
	      "tpscroll": 1,
	      "orb_of_venom": 1,
	      "blades_of_attack": 1,
	      "phase_boots": 1,
	      "blight_stone": 1,
	      "flying_courier": 1,
	      "quarterstaff": 1,
	      "sobi_mask": 1,
	      "oblivion_staff": 1,
	      "robe": 1,
	      "ogre_axe": 1,
	      "echo_sabre": 1,
	      "claymore": 1,
	      "shadow_amulet": 1,
	      "invis_sword": 1,
	      "ultimate_orb": 1,
	      "silver_edge": 1,
	      "belt_of_strength": 1,
	      "javelin": 1,
	      "basher": 1,
	      "relic": 1,
	      "rapier": 1,
	      "demon_edge": 1
	    },
	    "item_usage": {
	      "boots": 1,
	      "tpscroll": 1,
	      "orb_of_venom": 1,
	      "blades_of_attack": 1,
	      "phase_boots": 1,
	      "blight_stone": 1,
	      "flying_courier": 1,
	      "quarterstaff": 1,
	      "sobi_mask": 1,
	      "oblivion_staff": 1,
	      "robe": 1,
	      "ogre_axe": 1,
	      "echo_sabre": 1,
	      "claymore": 1,
	      "shadow_amulet": 1,
	      "invis_sword": 1,
	      "ultimate_orb": 1,
	      "silver_edge": 1,
	      "belt_of_strength": 1,
	      "javelin": 1,
	      "basher": 1,
	      "relic": 1,
	      "rapier": 1,
	      "demon_edge": 1
	    },
	    "purchase_ward_sentry": null,
	    "purchase_tpscroll": 9,
	    "purchase_rapier": 1,
	    "actions_per_min": 195,
	    "life_state_dead": 230,
	    "solo_competitive_rank": "3840",
	    "cosmetics": [{
	      "item_id": 16315,
	      "name": "Fall Major 2016 Effects",
	      "prefab": "tool",
	      "creation_date": "2016-09-11T00:00:00.000Z",
	      "image_inventory": "econ/testitem_slot_empty",
	      "image_path": "icons/econ/testitem_slot_empty.c1bbb374e16703db485ebd1c2a7964c483a194b7.png",
	      "item_description": null,
	      "item_name": "#DOTA_Item_Fall_Major_2016_Effects",
	      "item_rarity": "mythical",
	      "item_type_name": null,
	      "used_by_heroes": null
	    }],
	    "benchmarks": {
	      "gold_per_min": {
	        "raw": 523,
	        "pct": 0.7326140567200986
	      },
	      "xp_per_min": {
	        "raw": 530,
	        "pct": 0.6172009864364981
	      },
	      "kills_per_min": {
	        "raw": 0.5257142857142858,
	        "pct": 0.9087489980886615
	      },
	      "last_hits_per_min": {
	        "raw": 3.062857142857143,
	        "pct": 0.5441149269375424
	      },
	      "hero_damage_per_min": {
	        "raw": 951.9314285714286,
	        "pct": 0.8872926814230224
	      },
	      "hero_healing_per_min": {
	        "raw": 0,
	        "pct": 0.9680621493310315
	      },
	      "tower_damage": {
	        "raw": 3555,
	        "pct": 0.7807028360049322
	      }
	    }
	  }],
	  "patch": 20,
	  "region": 2,
	  "all_word_counts": {
	    "gg": 6,
	    "report": 3,
	    "team": 2,
	    "movistar": 1,
	    "sorry": 1,
	    "xd": 6,
	    "estos": 1,
	    "mens": 1,
	    "cuando": 1,
	    "no": 3,
	    "tienes": 1,
	    "plata": 2,
	    "pa": 2,
	    "tu": 3,
	    "cabina": 1,
	    "mi": 1,
	    "vieja": 1,
	    "me": 1,
	    "llamo": 1,
	    "agg": 1,
	    "nio": 1,
	    "rata": 1,
	    "ya": 1,
	    "hay": 2,
	    "la": 1,
	    "media": 1,
	    "hora": 2,
	    "ptm": 2,
	    "x": 2,
	    "reclama": 1,
	    "gratis": 1,
	    "pee": 1,
	    "te": 2,
	    "regalo": 1,
	    "sellos": 1,
	    "david": 3,
	    "es": 1,
	    "malo": 1,
	    "v": 6,
	    "mas": 1,
	    "duro": 1,
	    "kimbo": 1,
	    "se": 1,
	    "lo": 1,
	    "esta": 1,
	    "montando": 1,
	    "a": 2,
	    "ramon": 1,
	    "ty": 1,
	    "suport": 1,
	    "espero": 1,
	    "q": 2,
	    "reputee": 1,
	    "mucho": 1,
	    "ven": 1,
	    "sumail": 1,
	    "ratas": 1,
	    "que": 1,
	    "paso": 1,
	    "amiguito": 1,
	    "wp": 1,
	    "ez": 2,
	    "mid": 1
	  },
	  "my_word_counts": {},
	  "comeback": 0,
	  "stomp": 36890,
	  "replay_url": "http://replay122.valve.net/570/2890465108_291549381.dem.bz2"
	};
	
	exports.default = matchData;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org Version 4.4.0. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var version = "4.4.0";
	
	var ascending = function(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	};
	
	var bisector = function(compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;
	        else hi = mid;
	      }
	      return lo;
	    },
	    right: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;
	        else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	};
	
	function ascendingComparator(f) {
	  return function(d, x) {
	    return ascending(f(d), x);
	  };
	}
	
	var ascendingBisect = bisector(ascending);
	var bisectRight = ascendingBisect.right;
	var bisectLeft = ascendingBisect.left;
	
	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var number = function(x) {
	  return x === null ? NaN : +x;
	};
	
	var variance = function(array, f) {
	  var n = array.length,
	      m = 0,
	      a,
	      d,
	      s = 0,
	      i = -1,
	      j = 0;
	
	  if (f == null) {
	    while (++i < n) {
	      if (!isNaN(a = number(array[i]))) {
	        d = a - m;
	        m += d / ++j;
	        s += d * (a - m);
	      }
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (!isNaN(a = number(f(array[i], i, array)))) {
	        d = a - m;
	        m += d / ++j;
	        s += d * (a - m);
	      }
	    }
	  }
	
	  if (j > 1) return s / (j - 1);
	};
	
	var deviation = function(array, f) {
	  var v = variance(array, f);
	  return v ? Math.sqrt(v) : v;
	};
	
	var extent = function(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b,
	      c;
	
	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = c = b; break; }
	    while (++i < n) if ((b = array[i]) != null) {
	      if (a > b) a = b;
	      if (c < b) c = b;
	    }
	  }
	
	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = c = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null) {
	      if (a > b) a = b;
	      if (c < b) c = b;
	    }
	  }
	
	  return [a, c];
	};
	
	var array = Array.prototype;
	
	var slice = array.slice;
	var map = array.map;
	
	var constant$1 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var identity = function(x) {
	  return x;
	};
	
	var range = function(start, stop, step) {
	  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
	
	  var i = -1,
	      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	      range = new Array(n);
	
	  while (++i < n) {
	    range[i] = start + i * step;
	  }
	
	  return range;
	};
	
	var e10 = Math.sqrt(50);
	var e5 = Math.sqrt(10);
	var e2 = Math.sqrt(2);
	
	var ticks = function(start, stop, count) {
	  var step = tickStep(start, stop, count);
	  return range(
	    Math.ceil(start / step) * step,
	    Math.floor(stop / step) * step + step / 2, // inclusive
	    step
	  );
	};
	
	function tickStep(start, stop, count) {
	  var step0 = Math.abs(stop - start) / Math.max(0, count),
	      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	      error = step0 / step1;
	  if (error >= e10) step1 *= 10;
	  else if (error >= e5) step1 *= 5;
	  else if (error >= e2) step1 *= 2;
	  return stop < start ? -step1 : step1;
	}
	
	var sturges = function(values) {
	  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
	};
	
	var histogram = function() {
	  var value = identity,
	      domain = extent,
	      threshold = sturges;
	
	  function histogram(data) {
	    var i,
	        n = data.length,
	        x,
	        values = new Array(n);
	
	    for (i = 0; i < n; ++i) {
	      values[i] = value(data[i], i, data);
	    }
	
	    var xz = domain(values),
	        x0 = xz[0],
	        x1 = xz[1],
	        tz = threshold(values, x0, x1);
	
	    // Convert number of thresholds into uniform thresholds.
	    if (!Array.isArray(tz)) tz = ticks(x0, x1, tz);
	
	    // Remove any thresholds outside the domain.
	    var m = tz.length;
	    while (tz[0] <= x0) tz.shift(), --m;
	    while (tz[m - 1] >= x1) tz.pop(), --m;
	
	    var bins = new Array(m + 1),
	        bin;
	
	    // Initialize bins.
	    for (i = 0; i <= m; ++i) {
	      bin = bins[i] = [];
	      bin.x0 = i > 0 ? tz[i - 1] : x0;
	      bin.x1 = i < m ? tz[i] : x1;
	    }
	
	    // Assign data to bins by value, ignoring any outside the domain.
	    for (i = 0; i < n; ++i) {
	      x = values[i];
	      if (x0 <= x && x <= x1) {
	        bins[bisectRight(tz, x, 0, m)].push(data[i]);
	      }
	    }
	
	    return bins;
	  }
	
	  histogram.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(_), histogram) : value;
	  };
	
	  histogram.domain = function(_) {
	    return arguments.length ? (domain = typeof _ === "function" ? _ : constant$1([_[0], _[1]]), histogram) : domain;
	  };
	
	  histogram.thresholds = function(_) {
	    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$1(slice.call(_)) : constant$1(_), histogram) : threshold;
	  };
	
	  return histogram;
	};
	
	var threshold = function(array, p, f) {
	  if (f == null) f = number;
	  if (!(n = array.length)) return;
	  if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
	  if (p >= 1) return +f(array[n - 1], n - 1, array);
	  var n,
	      h = (n - 1) * p,
	      i = Math.floor(h),
	      a = +f(array[i], i, array),
	      b = +f(array[i + 1], i + 1, array);
	  return a + (b - a) * (h - i);
	};
	
	var freedmanDiaconis = function(values, min, max) {
	  values = map.call(values, number).sort(ascending);
	  return Math.ceil((max - min) / (2 * (threshold(values, 0.75) - threshold(values, 0.25)) * Math.pow(values.length, -1 / 3)));
	};
	
	var scott = function(values, min, max) {
	  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
	};
	
	var max = function(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;
	
	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	  }
	
	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
	  }
	
	  return a;
	};
	
	var mean = function(array, f) {
	  var s = 0,
	      n = array.length,
	      a,
	      i = -1,
	      j = n;
	
	  if (f == null) {
	    while (++i < n) if (!isNaN(a = number(array[i]))) s += a; else --j;
	  }
	
	  else {
	    while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) s += a; else --j;
	  }
	
	  if (j) return s / j;
	};
	
	var median = function(array, f) {
	  var numbers = [],
	      n = array.length,
	      a,
	      i = -1;
	
	  if (f == null) {
	    while (++i < n) if (!isNaN(a = number(array[i]))) numbers.push(a);
	  }
	
	  else {
	    while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) numbers.push(a);
	  }
	
	  return threshold(numbers.sort(ascending), 0.5);
	};
	
	var merge = function(arrays) {
	  var n = arrays.length,
	      m,
	      i = -1,
	      j = 0,
	      merged,
	      array;
	
	  while (++i < n) j += arrays[i].length;
	  merged = new Array(j);
	
	  while (--n >= 0) {
	    array = arrays[n];
	    m = array.length;
	    while (--m >= 0) {
	      merged[--j] = array[m];
	    }
	  }
	
	  return merged;
	};
	
	var min = function(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;
	
	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	  }
	
	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
	  }
	
	  return a;
	};
	
	var pairs = function(array) {
	  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
	  while (i < n) pairs[i] = [p, p = array[++i]];
	  return pairs;
	};
	
	var permute = function(array, indexes) {
	  var i = indexes.length, permutes = new Array(i);
	  while (i--) permutes[i] = array[indexes[i]];
	  return permutes;
	};
	
	var scan = function(array, compare) {
	  if (!(n = array.length)) return;
	  var i = 0,
	      n,
	      j = 0,
	      xi,
	      xj = array[j];
	
	  if (!compare) compare = ascending;
	
	  while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;
	
	  if (compare(xj, xj) === 0) return j;
	};
	
	var shuffle = function(array, i0, i1) {
	  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
	      t,
	      i;
	
	  while (m) {
	    i = Math.random() * m-- | 0;
	    t = array[m + i0];
	    array[m + i0] = array[i + i0];
	    array[i + i0] = t;
	  }
	
	  return array;
	};
	
	var sum = function(array, f) {
	  var s = 0,
	      n = array.length,
	      a,
	      i = -1;
	
	  if (f == null) {
	    while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.
	  }
	
	  else {
	    while (++i < n) if (a = +f(array[i], i, array)) s += a;
	  }
	
	  return s;
	};
	
	var transpose = function(matrix) {
	  if (!(n = matrix.length)) return [];
	  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	      row[j] = matrix[j][i];
	    }
	  }
	  return transpose;
	};
	
	function length(d) {
	  return d.length;
	}
	
	var zip = function() {
	  return transpose(arguments);
	};
	
	var prefix = "$";
	
	function Map() {}
	
	Map.prototype = map$1.prototype = {
	  constructor: Map,
	  has: function(key) {
	    return (prefix + key) in this;
	  },
	  get: function(key) {
	    return this[prefix + key];
	  },
	  set: function(key, value) {
	    this[prefix + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	  }
	};
	
	function map$1(object, f) {
	  var map = new Map;
	
	  // Copy constructor.
	  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });
	
	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;
	
	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }
	
	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);
	
	  return map;
	}
	
	var nest = function() {
	  var keys = [],
	      sortKeys = [],
	      sortValues,
	      rollup,
	      nest;
	
	  function apply(array, depth, createResult, setResult) {
	    if (depth >= keys.length) return rollup != null
	        ? rollup(array) : (sortValues != null
	        ? array.sort(sortValues)
	        : array);
	
	    var i = -1,
	        n = array.length,
	        key = keys[depth++],
	        keyValue,
	        value,
	        valuesByKey = map$1(),
	        values,
	        result = createResult();
	
	    while (++i < n) {
	      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
	        values.push(value);
	      } else {
	        valuesByKey.set(keyValue, [value]);
	      }
	    }
	
	    valuesByKey.each(function(values, key) {
	      setResult(result, key, apply(values, depth, createResult, setResult));
	    });
	
	    return result;
	  }
	
	  function entries(map, depth) {
	    if (++depth > keys.length) return map;
	    var array, sortKey = sortKeys[depth - 1];
	    if (rollup != null && depth >= keys.length) array = map.entries();
	    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
	    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
	  }
	
	  return nest = {
	    object: function(array) { return apply(array, 0, createObject, setObject); },
	    map: function(array) { return apply(array, 0, createMap, setMap); },
	    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
	    key: function(d) { keys.push(d); return nest; },
	    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	    sortValues: function(order) { sortValues = order; return nest; },
	    rollup: function(f) { rollup = f; return nest; }
	  };
	};
	
	function createObject() {
	  return {};
	}
	
	function setObject(object, key, value) {
	  object[key] = value;
	}
	
	function createMap() {
	  return map$1();
	}
	
	function setMap(map, key, value) {
	  map.set(key, value);
	}
	
	function Set() {}
	
	var proto = map$1.prototype;
	
	Set.prototype = set.prototype = {
	  constructor: Set,
	  has: proto.has,
	  add: function(value) {
	    value += "";
	    this[prefix + value] = value;
	    return this;
	  },
	  remove: proto.remove,
	  clear: proto.clear,
	  values: proto.keys,
	  size: proto.size,
	  empty: proto.empty,
	  each: proto.each
	};
	
	function set(object, f) {
	  var set = new Set;
	
	  // Copy constructor.
	  if (object instanceof Set) object.each(function(value) { set.add(value); });
	
	  // Otherwise, assume it’s an array.
	  else if (object) {
	    var i = -1, n = object.length;
	    if (f == null) while (++i < n) set.add(object[i]);
	    else while (++i < n) set.add(f(object[i], i, object));
	  }
	
	  return set;
	}
	
	var keys = function(map) {
	  var keys = [];
	  for (var key in map) keys.push(key);
	  return keys;
	};
	
	var values = function(map) {
	  var values = [];
	  for (var key in map) values.push(map[key]);
	  return values;
	};
	
	var entries = function(map) {
	  var entries = [];
	  for (var key in map) entries.push({key: key, value: map[key]});
	  return entries;
	};
	
	var uniform = function(min, max) {
	  min = min == null ? 0 : +min;
	  max = max == null ? 1 : +max;
	  if (arguments.length === 1) max = min, min = 0;
	  else max -= min;
	  return function() {
	    return Math.random() * max + min;
	  };
	};
	
	var normal = function(mu, sigma) {
	  var x, r;
	  mu = mu == null ? 0 : +mu;
	  sigma = sigma == null ? 1 : +sigma;
	  return function() {
	    var y;
	
	    // If available, use the second previously-generated uniform random.
	    if (x != null) y = x, x = null;
	
	    // Otherwise, generate a new x and y.
	    else do {
	      x = Math.random() * 2 - 1;
	      y = Math.random() * 2 - 1;
	      r = x * x + y * y;
	    } while (!r || r > 1);
	
	    return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
	  };
	};
	
	var logNormal = function() {
	  var randomNormal = normal.apply(this, arguments);
	  return function() {
	    return Math.exp(randomNormal());
	  };
	};
	
	var irwinHall = function(n) {
	  return function() {
	    for (var sum = 0, i = 0; i < n; ++i) sum += Math.random();
	    return sum;
	  };
	};
	
	var bates = function(n) {
	  var randomIrwinHall = irwinHall(n);
	  return function() {
	    return randomIrwinHall() / n;
	  };
	};
	
	var exponential = function(lambda) {
	  return function() {
	    return -Math.log(1 - Math.random()) / lambda;
	  };
	};
	
	function linear(t) {
	  return +t;
	}
	
	function quadIn(t) {
	  return t * t;
	}
	
	function quadOut(t) {
	  return t * (2 - t);
	}
	
	function quadInOut(t) {
	  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	}
	
	function cubicIn(t) {
	  return t * t * t;
	}
	
	function cubicOut(t) {
	  return --t * t * t + 1;
	}
	
	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}
	
	var exponent = 3;
	
	var polyIn = (function custom(e) {
	  e = +e;
	
	  function polyIn(t) {
	    return Math.pow(t, e);
	  }
	
	  polyIn.exponent = custom;
	
	  return polyIn;
	})(exponent);
	
	var polyOut = (function custom(e) {
	  e = +e;
	
	  function polyOut(t) {
	    return 1 - Math.pow(1 - t, e);
	  }
	
	  polyOut.exponent = custom;
	
	  return polyOut;
	})(exponent);
	
	var polyInOut = (function custom(e) {
	  e = +e;
	
	  function polyInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	  }
	
	  polyInOut.exponent = custom;
	
	  return polyInOut;
	})(exponent);
	
	var pi = Math.PI;
	var halfPi = pi / 2;
	
	function sinIn(t) {
	  return 1 - Math.cos(t * halfPi);
	}
	
	function sinOut(t) {
	  return Math.sin(t * halfPi);
	}
	
	function sinInOut(t) {
	  return (1 - Math.cos(pi * t)) / 2;
	}
	
	function expIn(t) {
	  return Math.pow(2, 10 * t - 10);
	}
	
	function expOut(t) {
	  return 1 - Math.pow(2, -10 * t);
	}
	
	function expInOut(t) {
	  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	}
	
	function circleIn(t) {
	  return 1 - Math.sqrt(1 - t * t);
	}
	
	function circleOut(t) {
	  return Math.sqrt(1 - --t * t);
	}
	
	function circleInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	}
	
	var b1 = 4 / 11;
	var b2 = 6 / 11;
	var b3 = 8 / 11;
	var b4 = 3 / 4;
	var b5 = 9 / 11;
	var b6 = 10 / 11;
	var b7 = 15 / 16;
	var b8 = 21 / 22;
	var b9 = 63 / 64;
	var b0 = 1 / b1 / b1;
	
	function bounceIn(t) {
	  return 1 - bounceOut(1 - t);
	}
	
	function bounceOut(t) {
	  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	}
	
	function bounceInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	}
	
	var overshoot = 1.70158;
	
	var backIn = (function custom(s) {
	  s = +s;
	
	  function backIn(t) {
	    return t * t * ((s + 1) * t - s);
	  }
	
	  backIn.overshoot = custom;
	
	  return backIn;
	})(overshoot);
	
	var backOut = (function custom(s) {
	  s = +s;
	
	  function backOut(t) {
	    return --t * t * ((s + 1) * t + s) + 1;
	  }
	
	  backOut.overshoot = custom;
	
	  return backOut;
	})(overshoot);
	
	var backInOut = (function custom(s) {
	  s = +s;
	
	  function backInOut(t) {
	    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	  }
	
	  backInOut.overshoot = custom;
	
	  return backInOut;
	})(overshoot);
	
	var tau = 2 * Math.PI;
	var amplitude = 1;
	var period = 0.3;
	
	var elasticIn = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticIn(t) {
	    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	  }
	
	  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
	  elasticIn.period = function(p) { return custom(a, p); };
	
	  return elasticIn;
	})(amplitude, period);
	
	var elasticOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticOut(t) {
	    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	  }
	
	  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticOut.period = function(p) { return custom(a, p); };
	
	  return elasticOut;
	})(amplitude, period);
	
	var elasticInOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticInOut(t) {
	    return ((t = t * 2 - 1) < 0
	        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  }
	
	  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticInOut.period = function(p) { return custom(a, p); };
	
	  return elasticInOut;
	})(amplitude, period);
	
	var area = function(polygon) {
	  var i = -1,
	      n = polygon.length,
	      a,
	      b = polygon[n - 1],
	      area = 0;
	
	  while (++i < n) {
	    a = b;
	    b = polygon[i];
	    area += a[1] * b[0] - a[0] * b[1];
	  }
	
	  return area / 2;
	};
	
	var centroid = function(polygon) {
	  var i = -1,
	      n = polygon.length,
	      x = 0,
	      y = 0,
	      a,
	      b = polygon[n - 1],
	      c,
	      k = 0;
	
	  while (++i < n) {
	    a = b;
	    b = polygon[i];
	    k += c = a[0] * b[1] - b[0] * a[1];
	    x += (a[0] + b[0]) * c;
	    y += (a[1] + b[1]) * c;
	  }
	
	  return k *= 3, [x / k, y / k];
	};
	
	// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
	// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
	// right, +y is up). Returns a positive value if ABC is counter-clockwise,
	// negative if clockwise, and zero if the points are collinear.
	var cross = function(a, b, c) {
	  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
	};
	
	function lexicographicOrder(a, b) {
	  return a[0] - b[0] || a[1] - b[1];
	}
	
	// Computes the upper convex hull per the monotone chain algorithm.
	// Assumes points.length >= 3, is sorted by x, unique in y.
	// Returns an array of indices into points in left-to-right order.
	function computeUpperHullIndexes(points) {
	  var n = points.length,
	      indexes = [0, 1],
	      size = 2;
	
	  for (var i = 2; i < n; ++i) {
	    while (size > 1 && cross(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
	    indexes[size++] = i;
	  }
	
	  return indexes.slice(0, size); // remove popped points
	}
	
	var hull = function(points) {
	  if ((n = points.length) < 3) return null;
	
	  var i,
	      n,
	      sortedPoints = new Array(n),
	      flippedPoints = new Array(n);
	
	  for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i];
	  sortedPoints.sort(lexicographicOrder);
	  for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];
	
	  var upperIndexes = computeUpperHullIndexes(sortedPoints),
	      lowerIndexes = computeUpperHullIndexes(flippedPoints);
	
	  // Construct the hull polygon, removing possible duplicate endpoints.
	  var skipLeft = lowerIndexes[0] === upperIndexes[0],
	      skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
	      hull = [];
	
	  // Add upper hull in right-to-l order.
	  // Then add lower hull in left-to-right order.
	  for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
	  for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);
	
	  return hull;
	};
	
	var contains = function(polygon, point) {
	  var n = polygon.length,
	      p = polygon[n - 1],
	      x = point[0], y = point[1],
	      x0 = p[0], y0 = p[1],
	      x1, y1,
	      inside = false;
	
	  for (var i = 0; i < n; ++i) {
	    p = polygon[i], x1 = p[0], y1 = p[1];
	    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside;
	    x0 = x1, y0 = y1;
	  }
	
	  return inside;
	};
	
	var length$1 = function(polygon) {
	  var i = -1,
	      n = polygon.length,
	      b = polygon[n - 1],
	      xa,
	      ya,
	      xb = b[0],
	      yb = b[1],
	      perimeter = 0;
	
	  while (++i < n) {
	    xa = xb;
	    ya = yb;
	    b = polygon[i];
	    xb = b[0];
	    yb = b[1];
	    xa -= xb;
	    ya -= yb;
	    perimeter += Math.sqrt(xa * xa + ya * ya);
	  }
	
	  return perimeter;
	};
	
	var pi$1 = Math.PI;
	var tau$1 = 2 * pi$1;
	var epsilon = 1e-6;
	var tauEpsilon = tau$1 - epsilon;
	
	function Path() {
	  this._x0 = this._y0 = // start of current subpath
	  this._x1 = this._y1 = null; // end of current subpath
	  this._ = "";
	}
	
	function path() {
	  return new Path;
	}
	
	Path.prototype = path.prototype = {
	  constructor: Path,
	  moveTo: function(x, y) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	  },
	  closePath: function() {
	    if (this._x1 !== null) {
	      this._x1 = this._x0, this._y1 = this._y0;
	      this._ += "Z";
	    }
	  },
	  lineTo: function(x, y) {
	    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  quadraticCurveTo: function(x1, y1, x, y) {
	    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  arcTo: function(x1, y1, x2, y2, r) {
	    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	    var x0 = this._x1,
	        y0 = this._y1,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        x01 = x0 - x1,
	        y01 = y0 - y1,
	        l01_2 = x01 * x01 + y01 * y01;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x1,y1).
	    if (this._x1 === null) {
	      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	    else if (!(l01_2 > epsilon)) {}
	
	    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	    // Equivalently, is (x1,y1) coincident with (x2,y2)?
	    // Or, is the radius zero? Line to (x1,y1).
	    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
	      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      var x20 = x2 - x0,
	          y20 = y2 - y0,
	          l21_2 = x21 * x21 + y21 * y21,
	          l20_2 = x20 * x20 + y20 * y20,
	          l21 = Math.sqrt(l21_2),
	          l01 = Math.sqrt(l01_2),
	          l = r * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	          t01 = l / l01,
	          t21 = l / l21;
	
	      // If the start tangent is not coincident with (x0,y0), line to.
	      if (Math.abs(t01 - 1) > epsilon) {
	        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	      }
	
	      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	    }
	  },
	  arc: function(x, y, r, a0, a1, ccw) {
	    x = +x, y = +y, r = +r;
	    var dx = r * Math.cos(a0),
	        dy = r * Math.sin(a0),
	        x0 = x + dx,
	        y0 = y + dy,
	        cw = 1 ^ ccw,
	        da = ccw ? a0 - a1 : a1 - a0;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x0,y0).
	    if (this._x1 === null) {
	      this._ += "M" + x0 + "," + y0;
	    }
	
	    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
	      this._ += "L" + x0 + "," + y0;
	    }
	
	    // Is this arc empty? We’re done.
	    if (!r) return;
	
	    // Is this a complete circle? Draw two arcs to complete the circle.
	    if (da > tauEpsilon) {
	      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      if (da < 0) da = da % tau$1 + tau$1;
	      this._ += "A" + r + "," + r + ",0," + (+(da >= pi$1)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	    }
	  },
	  rect: function(x, y, w, h) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	var tree_add = function(d) {
	  var x = +this._x.call(null, d),
	      y = +this._y.call(null, d);
	  return add(this.cover(x, y), x, y, d);
	};
	
	function add(tree, x, y, d) {
	  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points
	
	  var parent,
	      node = tree._root,
	      leaf = {data: d},
	      x0 = tree._x0,
	      y0 = tree._y0,
	      x1 = tree._x1,
	      y1 = tree._y1,
	      xm,
	      ym,
	      xp,
	      yp,
	      right,
	      bottom,
	      i,
	      j;
	
	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return tree._root = leaf, tree;
	
	  // Find the existing leaf for the new point, or add it.
	  while (node.length) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
	  }
	
	  // Is the new point is exactly coincident with the existing point?
	  xp = +tree._x.call(null, node.data);
	  yp = +tree._y.call(null, node.data);
	  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
	
	  // Otherwise, split the leaf node until the old and new point are separated.
	  do {
	    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
	  return parent[j] = node, parent[i] = leaf, tree;
	}
	
	function addAll(data) {
	  var d, i, n = data.length,
	      x,
	      y,
	      xz = new Array(n),
	      yz = new Array(n),
	      x0 = Infinity,
	      y0 = Infinity,
	      x1 = -Infinity,
	      y1 = -Infinity;
	
	  // Compute the points and their extent.
	  for (i = 0; i < n; ++i) {
	    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
	    xz[i] = x;
	    yz[i] = y;
	    if (x < x0) x0 = x;
	    if (x > x1) x1 = x;
	    if (y < y0) y0 = y;
	    if (y > y1) y1 = y;
	  }
	
	  // If there were no (valid) points, inherit the existing extent.
	  if (x1 < x0) x0 = this._x0, x1 = this._x1;
	  if (y1 < y0) y0 = this._y0, y1 = this._y1;
	
	  // Expand the tree to cover the new points.
	  this.cover(x0, y0).cover(x1, y1);
	
	  // Add the new points.
	  for (i = 0; i < n; ++i) {
	    add(this, xz[i], yz[i], data[i]);
	  }
	
	  return this;
	}
	
	var tree_cover = function(x, y) {
	  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points
	
	  var x0 = this._x0,
	      y0 = this._y0,
	      x1 = this._x1,
	      y1 = this._y1;
	
	  // If the quadtree has no extent, initialize them.
	  // Integer extent are necessary so that if we later double the extent,
	  // the existing quadrant boundaries don’t change due to floating point error!
	  if (isNaN(x0)) {
	    x1 = (x0 = Math.floor(x)) + 1;
	    y1 = (y0 = Math.floor(y)) + 1;
	  }
	
	  // Otherwise, double repeatedly to cover.
	  else if (x0 > x || x > x1 || y0 > y || y > y1) {
	    var z = x1 - x0,
	        node = this._root,
	        parent,
	        i;
	
	    switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
	      case 0: {
	        do parent = new Array(4), parent[i] = node, node = parent;
	        while (z *= 2, x1 = x0 + z, y1 = y0 + z, x > x1 || y > y1);
	        break;
	      }
	      case 1: {
	        do parent = new Array(4), parent[i] = node, node = parent;
	        while (z *= 2, x0 = x1 - z, y1 = y0 + z, x0 > x || y > y1);
	        break;
	      }
	      case 2: {
	        do parent = new Array(4), parent[i] = node, node = parent;
	        while (z *= 2, x1 = x0 + z, y0 = y1 - z, x > x1 || y0 > y);
	        break;
	      }
	      case 3: {
	        do parent = new Array(4), parent[i] = node, node = parent;
	        while (z *= 2, x0 = x1 - z, y0 = y1 - z, x0 > x || y0 > y);
	        break;
	      }
	    }
	
	    if (this._root && this._root.length) this._root = node;
	  }
	
	  // If the quadtree covers the point already, just return.
	  else return this;
	
	  this._x0 = x0;
	  this._y0 = y0;
	  this._x1 = x1;
	  this._y1 = y1;
	  return this;
	};
	
	var tree_data = function() {
	  var data = [];
	  this.visit(function(node) {
	    if (!node.length) do data.push(node.data); while (node = node.next)
	  });
	  return data;
	};
	
	var tree_extent = function(_) {
	  return arguments.length
	      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
	      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
	};
	
	var Quad = function(node, x0, y0, x1, y1) {
	  this.node = node;
	  this.x0 = x0;
	  this.y0 = y0;
	  this.x1 = x1;
	  this.y1 = y1;
	};
	
	var tree_find = function(x, y, radius) {
	  var data,
	      x0 = this._x0,
	      y0 = this._y0,
	      x1,
	      y1,
	      x2,
	      y2,
	      x3 = this._x1,
	      y3 = this._y1,
	      quads = [],
	      node = this._root,
	      q,
	      i;
	
	  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
	  if (radius == null) radius = Infinity;
	  else {
	    x0 = x - radius, y0 = y - radius;
	    x3 = x + radius, y3 = y + radius;
	    radius *= radius;
	  }
	
	  while (q = quads.pop()) {
	
	    // Stop searching if this quadrant can’t contain a closer node.
	    if (!(node = q.node)
	        || (x1 = q.x0) > x3
	        || (y1 = q.y0) > y3
	        || (x2 = q.x1) < x0
	        || (y2 = q.y1) < y0) continue;
	
	    // Bisect the current quadrant.
	    if (node.length) {
	      var xm = (x1 + x2) / 2,
	          ym = (y1 + y2) / 2;
	
	      quads.push(
	        new Quad(node[3], xm, ym, x2, y2),
	        new Quad(node[2], x1, ym, xm, y2),
	        new Quad(node[1], xm, y1, x2, ym),
	        new Quad(node[0], x1, y1, xm, ym)
	      );
	
	      // Visit the closest quadrant first.
	      if (i = (y >= ym) << 1 | (x >= xm)) {
	        q = quads[quads.length - 1];
	        quads[quads.length - 1] = quads[quads.length - 1 - i];
	        quads[quads.length - 1 - i] = q;
	      }
	    }
	
	    // Visit this point. (Visiting coincident points isn’t necessary!)
	    else {
	      var dx = x - +this._x.call(null, node.data),
	          dy = y - +this._y.call(null, node.data),
	          d2 = dx * dx + dy * dy;
	      if (d2 < radius) {
	        var d = Math.sqrt(radius = d2);
	        x0 = x - d, y0 = y - d;
	        x3 = x + d, y3 = y + d;
	        data = node.data;
	      }
	    }
	  }
	
	  return data;
	};
	
	var tree_remove = function(d) {
	  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points
	
	  var parent,
	      node = this._root,
	      retainer,
	      previous,
	      next,
	      x0 = this._x0,
	      y0 = this._y0,
	      x1 = this._x1,
	      y1 = this._y1,
	      x,
	      y,
	      xm,
	      ym,
	      right,
	      bottom,
	      i,
	      j;
	
	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return this;
	
	  // Find the leaf node for the point.
	  // While descending, also retain the deepest parent with a non-removed sibling.
	  if (node.length) while (true) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
	    if (!node.length) break;
	    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
	  }
	
	  // Find the point to remove.
	  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
	  if (next = node.next) delete node.next;
	
	  // If there are multiple coincident points, remove just the point.
	  if (previous) return (next ? previous.next = next : delete previous.next), this;
	
	  // If this is the root point, remove it.
	  if (!parent) return this._root = next, this;
	
	  // Remove this leaf.
	  next ? parent[i] = next : delete parent[i];
	
	  // If the parent now contains exactly one leaf, collapse superfluous parents.
	  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
	      && node === (parent[3] || parent[2] || parent[1] || parent[0])
	      && !node.length) {
	    if (retainer) retainer[j] = node;
	    else this._root = node;
	  }
	
	  return this;
	};
	
	function removeAll(data) {
	  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
	  return this;
	}
	
	var tree_root = function() {
	  return this._root;
	};
	
	var tree_size = function() {
	  var size = 0;
	  this.visit(function(node) {
	    if (!node.length) do ++size; while (node = node.next)
	  });
	  return size;
	};
	
	var tree_visit = function(callback) {
	  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
	  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
	  while (q = quads.pop()) {
	    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
	      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
	      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
	      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
	      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
	      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
	    }
	  }
	  return this;
	};
	
	var tree_visitAfter = function(callback) {
	  var quads = [], next = [], q;
	  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
	  while (q = quads.pop()) {
	    var node = q.node;
	    if (node.length) {
	      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
	      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
	      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
	      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
	      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
	    }
	    next.push(q);
	  }
	  while (q = next.pop()) {
	    callback(q.node, q.x0, q.y0, q.x1, q.y1);
	  }
	  return this;
	};
	
	function defaultX(d) {
	  return d[0];
	}
	
	var tree_x = function(_) {
	  return arguments.length ? (this._x = _, this) : this._x;
	};
	
	function defaultY(d) {
	  return d[1];
	}
	
	var tree_y = function(_) {
	  return arguments.length ? (this._y = _, this) : this._y;
	};
	
	function quadtree(nodes, x, y) {
	  var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
	  return nodes == null ? tree : tree.addAll(nodes);
	}
	
	function Quadtree(x, y, x0, y0, x1, y1) {
	  this._x = x;
	  this._y = y;
	  this._x0 = x0;
	  this._y0 = y0;
	  this._x1 = x1;
	  this._y1 = y1;
	  this._root = undefined;
	}
	
	function leaf_copy(leaf) {
	  var copy = {data: leaf.data}, next = copy;
	  while (leaf = leaf.next) next = next.next = {data: leaf.data};
	  return copy;
	}
	
	var treeProto = quadtree.prototype = Quadtree.prototype;
	
	treeProto.copy = function() {
	  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
	      node = this._root,
	      nodes,
	      child;
	
	  if (!node) return copy;
	
	  if (!node.length) return copy._root = leaf_copy(node), copy;
	
	  nodes = [{source: node, target: copy._root = new Array(4)}];
	  while (node = nodes.pop()) {
	    for (var i = 0; i < 4; ++i) {
	      if (child = node.source[i]) {
	        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
	        else node.target[i] = leaf_copy(child);
	      }
	    }
	  }
	
	  return copy;
	};
	
	treeProto.add = tree_add;
	treeProto.addAll = addAll;
	treeProto.cover = tree_cover;
	treeProto.data = tree_data;
	treeProto.extent = tree_extent;
	treeProto.find = tree_find;
	treeProto.remove = tree_remove;
	treeProto.removeAll = removeAll;
	treeProto.root = tree_root;
	treeProto.size = tree_size;
	treeProto.visit = tree_visit;
	treeProto.visitAfter = tree_visitAfter;
	treeProto.x = tree_x;
	treeProto.y = tree_y;
	
	var slice$1 = [].slice;
	
	var noabort = {};
	
	function Queue(size) {
	  if (!(size >= 1)) throw new Error;
	  this._size = size;
	  this._call =
	  this._error = null;
	  this._tasks = [];
	  this._data = [];
	  this._waiting =
	  this._active =
	  this._ended =
	  this._start = 0; // inside a synchronous task callback?
	}
	
	Queue.prototype = queue.prototype = {
	  constructor: Queue,
	  defer: function(callback) {
	    if (typeof callback !== "function" || this._call) throw new Error;
	    if (this._error != null) return this;
	    var t = slice$1.call(arguments, 1);
	    t.push(callback);
	    ++this._waiting, this._tasks.push(t);
	    poke(this);
	    return this;
	  },
	  abort: function() {
	    if (this._error == null) abort(this, new Error("abort"));
	    return this;
	  },
	  await: function(callback) {
	    if (typeof callback !== "function" || this._call) throw new Error;
	    this._call = function(error, results) { callback.apply(null, [error].concat(results)); };
	    maybeNotify(this);
	    return this;
	  },
	  awaitAll: function(callback) {
	    if (typeof callback !== "function" || this._call) throw new Error;
	    this._call = callback;
	    maybeNotify(this);
	    return this;
	  }
	};
	
	function poke(q) {
	  if (!q._start) {
	    try { start(q); } // let the current task complete
	    catch (e) {
	      if (q._tasks[q._ended + q._active - 1]) abort(q, e); // task errored synchronously
	      else if (!q._data) throw e; // await callback errored synchronously
	    }
	  }
	}
	
	function start(q) {
	  while (q._start = q._waiting && q._active < q._size) {
	    var i = q._ended + q._active,
	        t = q._tasks[i],
	        j = t.length - 1,
	        c = t[j];
	    t[j] = end(q, i);
	    --q._waiting, ++q._active;
	    t = c.apply(null, t);
	    if (!q._tasks[i]) continue; // task finished synchronously
	    q._tasks[i] = t || noabort;
	  }
	}
	
	function end(q, i) {
	  return function(e, r) {
	    if (!q._tasks[i]) return; // ignore multiple callbacks
	    --q._active, ++q._ended;
	    q._tasks[i] = null;
	    if (q._error != null) return; // ignore secondary errors
	    if (e != null) {
	      abort(q, e);
	    } else {
	      q._data[i] = r;
	      if (q._waiting) poke(q);
	      else maybeNotify(q);
	    }
	  };
	}
	
	function abort(q, e) {
	  var i = q._tasks.length, t;
	  q._error = e; // ignore active callbacks
	  q._data = undefined; // allow gc
	  q._waiting = NaN; // prevent starting
	
	  while (--i >= 0) {
	    if (t = q._tasks[i]) {
	      q._tasks[i] = null;
	      if (t.abort) {
	        try { t.abort(); }
	        catch (e) { /* ignore */ }
	      }
	    }
	  }
	
	  q._active = NaN; // allow notification
	  maybeNotify(q);
	}
	
	function maybeNotify(q) {
	  if (!q._active && q._call) {
	    var d = q._data;
	    q._data = undefined; // allow gc
	    q._call(q._error, d);
	  }
	}
	
	function queue(concurrency) {
	  return new Queue(arguments.length ? +concurrency : Infinity);
	}
	
	var constant$2 = function(x) {
	  return function constant() {
	    return x;
	  };
	};
	
	var epsilon$1 = 1e-12;
	var pi$2 = Math.PI;
	var halfPi$1 = pi$2 / 2;
	var tau$2 = 2 * pi$2;
	
	function arcInnerRadius(d) {
	  return d.innerRadius;
	}
	
	function arcOuterRadius(d) {
	  return d.outerRadius;
	}
	
	function arcStartAngle(d) {
	  return d.startAngle;
	}
	
	function arcEndAngle(d) {
	  return d.endAngle;
	}
	
	function arcPadAngle(d) {
	  return d && d.padAngle; // Note: optional!
	}
	
	function asin(x) {
	  return x >= 1 ? halfPi$1 : x <= -1 ? -halfPi$1 : Math.asin(x);
	}
	
	function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var x10 = x1 - x0, y10 = y1 - y0,
	      x32 = x3 - x2, y32 = y3 - y2,
	      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	  return [x0 + t * x10, y0 + t * y10];
	}
	
	// Compute perpendicular offset line of length rc.
	// http://mathworld.wolfram.com/Circle-LineIntersection.html
	function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	  var x01 = x0 - x1,
	      y01 = y0 - y1,
	      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
	      ox = lo * y01,
	      oy = -lo * x01,
	      x11 = x0 + ox,
	      y11 = y0 + oy,
	      x10 = x1 + ox,
	      y10 = y1 + oy,
	      x00 = (x11 + x10) / 2,
	      y00 = (y11 + y10) / 2,
	      dx = x10 - x11,
	      dy = y10 - y11,
	      d2 = dx * dx + dy * dy,
	      r = r1 - rc,
	      D = x11 * y10 - x10 * y11,
	      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
	      cx0 = (D * dy - dx * d) / d2,
	      cy0 = (-D * dx - dy * d) / d2,
	      cx1 = (D * dy + dx * d) / d2,
	      cy1 = (-D * dx + dy * d) / d2,
	      dx0 = cx0 - x00,
	      dy0 = cy0 - y00,
	      dx1 = cx1 - x00,
	      dy1 = cy1 - y00;
	
	  // Pick the closer of the two intersection points.
	  // TODO Is there a faster way to determine which intersection to use?
	  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	
	  return {
	    cx: cx0,
	    cy: cy0,
	    x01: -ox,
	    y01: -oy,
	    x11: cx0 * (r1 / r - 1),
	    y11: cy0 * (r1 / r - 1)
	  };
	}
	
	var arc = function() {
	  var innerRadius = arcInnerRadius,
	      outerRadius = arcOuterRadius,
	      cornerRadius = constant$2(0),
	      padRadius = null,
	      startAngle = arcStartAngle,
	      endAngle = arcEndAngle,
	      padAngle = arcPadAngle,
	      context = null;
	
	  function arc() {
	    var buffer,
	        r,
	        r0 = +innerRadius.apply(this, arguments),
	        r1 = +outerRadius.apply(this, arguments),
	        a0 = startAngle.apply(this, arguments) - halfPi$1,
	        a1 = endAngle.apply(this, arguments) - halfPi$1,
	        da = Math.abs(a1 - a0),
	        cw = a1 > a0;
	
	    if (!context) context = buffer = path();
	
	    // Ensure that the outer radius is always larger than the inner radius.
	    if (r1 < r0) r = r1, r1 = r0, r0 = r;
	
	    // Is it a point?
	    if (!(r1 > epsilon$1)) context.moveTo(0, 0);
	
	    // Or is it a circle or annulus?
	    else if (da > tau$2 - epsilon$1) {
	      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
	      context.arc(0, 0, r1, a0, a1, !cw);
	      if (r0 > epsilon$1) {
	        context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
	        context.arc(0, 0, r0, a1, a0, cw);
	      }
	    }
	
	    // Or is it a circular or annular sector?
	    else {
	      var a01 = a0,
	          a11 = a1,
	          a00 = a0,
	          a10 = a1,
	          da0 = da,
	          da1 = da,
	          ap = padAngle.apply(this, arguments) / 2,
	          rp = (ap > epsilon$1) && (padRadius ? +padRadius.apply(this, arguments) : Math.sqrt(r0 * r0 + r1 * r1)),
	          rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	          rc0 = rc,
	          rc1 = rc,
	          t0,
	          t1;
	
	      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	      if (rp > epsilon$1) {
	        var p0 = asin(rp / r0 * Math.sin(ap)),
	            p1 = asin(rp / r1 * Math.sin(ap));
	        if ((da0 -= p0 * 2) > epsilon$1) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	        if ((da1 -= p1 * 2) > epsilon$1) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	      }
	
	      var x01 = r1 * Math.cos(a01),
	          y01 = r1 * Math.sin(a01),
	          x10 = r0 * Math.cos(a10),
	          y10 = r0 * Math.sin(a10);
	
	      // Apply rounded corners?
	      if (rc > epsilon$1) {
	        var x11 = r1 * Math.cos(a11),
	            y11 = r1 * Math.sin(a11),
	            x00 = r0 * Math.cos(a00),
	            y00 = r0 * Math.sin(a00);
	
	        // Restrict the corner radius according to the sector angle.
	        if (da < pi$2) {
	          var oc = da0 > epsilon$1 ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	              ax = x01 - oc[0],
	              ay = y01 - oc[1],
	              bx = x11 - oc[0],
	              by = y11 - oc[1],
	              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
	              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
	          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
	        }
	      }
	
	      // Is the sector collapsed to a line?
	      if (!(da1 > epsilon$1)) context.moveTo(x01, y01);
	
	      // Does the sector’s outer ring have rounded corners?
	      else if (rc1 > epsilon$1) {
	        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
	
	        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r1, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	          context.arc(t1.cx, t1.cy, rc1, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the outer ring just a circular arc?
	      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
	
	      // Is there no inner ring, and it’s a circular sector?
	      // Or perhaps it’s an annular sector collapsed due to padding?
	      if (!(r0 > epsilon$1) || !(da0 > epsilon$1)) context.lineTo(x10, y10);
	
	      // Does the sector’s inner ring (or point) have rounded corners?
	      else if (rc0 > epsilon$1) {
	        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
	
	        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r0, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	          context.arc(t1.cx, t1.cy, rc0, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the inner ring just a circular arc?
	      else context.arc(0, 0, r0, a10, a00, cw);
	    }
	
	    context.closePath();
	
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  arc.centroid = function() {
	    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$2 / 2;
	    return [Math.cos(a) * r, Math.sin(a) * r];
	  };
	
	  arc.innerRadius = function(_) {
	    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$2(+_), arc) : innerRadius;
	  };
	
	  arc.outerRadius = function(_) {
	    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$2(+_), arc) : outerRadius;
	  };
	
	  arc.cornerRadius = function(_) {
	    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$2(+_), arc) : cornerRadius;
	  };
	
	  arc.padRadius = function(_) {
	    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$2(+_), arc) : padRadius;
	  };
	
	  arc.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$2(+_), arc) : startAngle;
	  };
	
	  arc.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$2(+_), arc) : endAngle;
	  };
	
	  arc.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$2(+_), arc) : padAngle;
	  };
	
	  arc.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	  };
	
	  return arc;
	};
	
	function Linear(context) {
	  this._context = context;
	}
	
	Linear.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: this._context.lineTo(x, y); break;
	    }
	  }
	};
	
	var curveLinear = function(context) {
	  return new Linear(context);
	};
	
	function x(p) {
	  return p[0];
	}
	
	function y(p) {
	  return p[1];
	}
	
	var line = function() {
	  var x$$1 = x,
	      y$$1 = y,
	      defined = constant$2(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function line(data) {
	    var i,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer;
	
	    if (context == null) output = curve(buffer = path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) output.lineStart();
	        else output.lineEnd();
	      }
	      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  line.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$2(+_), line) : x$$1;
	  };
	
	  line.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$2(+_), line) : y$$1;
	  };
	
	  line.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$2(!!_), line) : defined;
	  };
	
	  line.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	  };
	
	  line.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	  };
	
	  return line;
	};
	
	var area$1 = function() {
	  var x0 = x,
	      x1 = null,
	      y0 = constant$2(0),
	      y1 = y,
	      defined = constant$2(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function area(data) {
	    var i,
	        j,
	        k,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer,
	        x0z = new Array(n),
	        y0z = new Array(n);
	
	    if (context == null) output = curve(buffer = path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) {
	          j = i;
	          output.areaStart();
	          output.lineStart();
	        } else {
	          output.lineEnd();
	          output.lineStart();
	          for (k = i - 1; k >= j; --k) {
	            output.point(x0z[k], y0z[k]);
	          }
	          output.lineEnd();
	          output.areaEnd();
	        }
	      }
	      if (defined0) {
	        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	      }
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  function arealine() {
	    return line().defined(defined).curve(curve).context(context);
	  }
	
	  area.x = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$2(+_), x1 = null, area) : x0;
	  };
	
	  area.x0 = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$2(+_), area) : x0;
	  };
	
	  area.x1 = function(_) {
	    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$2(+_), area) : x1;
	  };
	
	  area.y = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$2(+_), y1 = null, area) : y0;
	  };
	
	  area.y0 = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$2(+_), area) : y0;
	  };
	
	  area.y1 = function(_) {
	    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$2(+_), area) : y1;
	  };
	
	  area.lineX0 =
	  area.lineY0 = function() {
	    return arealine().x(x0).y(y0);
	  };
	
	  area.lineY1 = function() {
	    return arealine().x(x0).y(y1);
	  };
	
	  area.lineX1 = function() {
	    return arealine().x(x1).y(y0);
	  };
	
	  area.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$2(!!_), area) : defined;
	  };
	
	  area.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	  };
	
	  area.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	  };
	
	  return area;
	};
	
	var descending$1 = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var identity$1 = function(d) {
	  return d;
	};
	
	var pie = function() {
	  var value = identity$1,
	      sortValues = descending$1,
	      sort = null,
	      startAngle = constant$2(0),
	      endAngle = constant$2(tau$2),
	      padAngle = constant$2(0);
	
	  function pie(data) {
	    var i,
	        n = data.length,
	        j,
	        k,
	        sum = 0,
	        index = new Array(n),
	        arcs = new Array(n),
	        a0 = +startAngle.apply(this, arguments),
	        da = Math.min(tau$2, Math.max(-tau$2, endAngle.apply(this, arguments) - a0)),
	        a1,
	        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	        pa = p * (da < 0 ? -1 : 1),
	        v;
	
	    for (i = 0; i < n; ++i) {
	      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	        sum += v;
	      }
	    }
	
	    // Optionally sort the arcs by previously-computed values or by data.
	    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
	    // Compute the arcs! They are stored in the original data's order.
	    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	        data: data[j],
	        index: i,
	        value: v,
	        startAngle: a0,
	        endAngle: a1,
	        padAngle: p
	      };
	    }
	
	    return arcs;
	  }
	
	  pie.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$2(+_), pie) : value;
	  };
	
	  pie.sortValues = function(_) {
	    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	  };
	
	  pie.sort = function(_) {
	    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	  };
	
	  pie.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$2(+_), pie) : startAngle;
	  };
	
	  pie.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$2(+_), pie) : endAngle;
	  };
	
	  pie.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$2(+_), pie) : padAngle;
	  };
	
	  return pie;
	};
	
	var curveRadialLinear = curveRadial(curveLinear);
	
	function Radial(curve) {
	  this._curve = curve;
	}
	
	Radial.prototype = {
	  areaStart: function() {
	    this._curve.areaStart();
	  },
	  areaEnd: function() {
	    this._curve.areaEnd();
	  },
	  lineStart: function() {
	    this._curve.lineStart();
	  },
	  lineEnd: function() {
	    this._curve.lineEnd();
	  },
	  point: function(a, r) {
	    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	  }
	};
	
	function curveRadial(curve) {
	
	  function radial(context) {
	    return new Radial(curve(context));
	  }
	
	  radial._curve = curve;
	
	  return radial;
	}
	
	function radialLine(l) {
	  var c = l.curve;
	
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	
	  l.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return l;
	}
	
	var radialLine$1 = function() {
	  return radialLine(line().curve(curveRadialLinear));
	};
	
	var radialArea = function() {
	  var a = area$1().curve(curveRadialLinear),
	      c = a.curve,
	      x0 = a.lineX0,
	      x1 = a.lineX1,
	      y0 = a.lineY0,
	      y1 = a.lineY1;
	
	  a.angle = a.x, delete a.x;
	  a.startAngle = a.x0, delete a.x0;
	  a.endAngle = a.x1, delete a.x1;
	  a.radius = a.y, delete a.y;
	  a.innerRadius = a.y0, delete a.y0;
	  a.outerRadius = a.y1, delete a.y1;
	  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
	  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
	  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
	  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;
	
	  a.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return a;
	};
	
	var circle = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / pi$2);
	    context.moveTo(r, 0);
	    context.arc(0, 0, r, 0, tau$2);
	  }
	};
	
	var cross$1 = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / 5) / 2;
	    context.moveTo(-3 * r, -r);
	    context.lineTo(-r, -r);
	    context.lineTo(-r, -3 * r);
	    context.lineTo(r, -3 * r);
	    context.lineTo(r, -r);
	    context.lineTo(3 * r, -r);
	    context.lineTo(3 * r, r);
	    context.lineTo(r, r);
	    context.lineTo(r, 3 * r);
	    context.lineTo(-r, 3 * r);
	    context.lineTo(-r, r);
	    context.lineTo(-3 * r, r);
	    context.closePath();
	  }
	};
	
	var tan30 = Math.sqrt(1 / 3);
	var tan30_2 = tan30 * 2;
	
	var diamond = {
	  draw: function(context, size) {
	    var y = Math.sqrt(size / tan30_2),
	        x = y * tan30;
	    context.moveTo(0, -y);
	    context.lineTo(x, 0);
	    context.lineTo(0, y);
	    context.lineTo(-x, 0);
	    context.closePath();
	  }
	};
	
	var ka = 0.89081309152928522810;
	var kr = Math.sin(pi$2 / 10) / Math.sin(7 * pi$2 / 10);
	var kx = Math.sin(tau$2 / 10) * kr;
	var ky = -Math.cos(tau$2 / 10) * kr;
	
	var star = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size * ka),
	        x = kx * r,
	        y = ky * r;
	    context.moveTo(0, -r);
	    context.lineTo(x, y);
	    for (var i = 1; i < 5; ++i) {
	      var a = tau$2 * i / 5,
	          c = Math.cos(a),
	          s = Math.sin(a);
	      context.lineTo(s * r, -c * r);
	      context.lineTo(c * x - s * y, s * x + c * y);
	    }
	    context.closePath();
	  }
	};
	
	var square = {
	  draw: function(context, size) {
	    var w = Math.sqrt(size),
	        x = -w / 2;
	    context.rect(x, x, w, w);
	  }
	};
	
	var sqrt3 = Math.sqrt(3);
	
	var triangle = {
	  draw: function(context, size) {
	    var y = -Math.sqrt(size / (sqrt3 * 3));
	    context.moveTo(0, y * 2);
	    context.lineTo(-sqrt3 * y, -y);
	    context.lineTo(sqrt3 * y, -y);
	    context.closePath();
	  }
	};
	
	var c = -0.5;
	var s = Math.sqrt(3) / 2;
	var k = 1 / Math.sqrt(12);
	var a = (k / 2 + 1) * 3;
	
	var wye = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / a),
	        x0 = r / 2,
	        y0 = r * k,
	        x1 = x0,
	        y1 = r * k + r,
	        x2 = -x1,
	        y2 = y1;
	    context.moveTo(x0, y0);
	    context.lineTo(x1, y1);
	    context.lineTo(x2, y2);
	    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	    context.closePath();
	  }
	};
	
	var symbols = [
	  circle,
	  cross$1,
	  diamond,
	  square,
	  star,
	  triangle,
	  wye
	];
	
	var symbol = function() {
	  var type = constant$2(circle),
	      size = constant$2(64),
	      context = null;
	
	  function symbol() {
	    var buffer;
	    if (!context) context = buffer = path();
	    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  symbol.type = function(_) {
	    return arguments.length ? (type = typeof _ === "function" ? _ : constant$2(_), symbol) : type;
	  };
	
	  symbol.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : constant$2(+_), symbol) : size;
	  };
	
	  symbol.context = function(_) {
	    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	  };
	
	  return symbol;
	};
	
	var noop = function() {};
	
	function point(that, x, y) {
	  that._context.bezierCurveTo(
	    (2 * that._x0 + that._x1) / 3,
	    (2 * that._y0 + that._y1) / 3,
	    (that._x0 + 2 * that._x1) / 3,
	    (that._y0 + 2 * that._y1) / 3,
	    (that._x0 + 4 * that._x1 + x) / 6,
	    (that._y0 + 4 * that._y1 + y) / 6
	  );
	}
	
	function Basis(context) {
	  this._context = context;
	}
	
	Basis.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 3: point(this, this._x1, this._y1); // proceed
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basis = function(context) {
	  return new Basis(context);
	};
	
	function BasisClosed(context) {
	  this._context = context;
	}
	
	BasisClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x2, this._y2);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x2, this._y2);
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
	      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
	      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisClosed = function(context) {
	  return new BasisClosed(context);
	};
	
	function BasisOpen(context) {
	  this._context = context;
	}
	
	BasisOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
	      case 3: this._point = 4; // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisOpen = function(context) {
	  return new BasisOpen(context);
	};
	
	function Bundle(context, beta) {
	  this._basis = new Basis(context);
	  this._beta = beta;
	}
	
	Bundle.prototype = {
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	    this._basis.lineStart();
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        j = x.length - 1;
	
	    if (j > 0) {
	      var x0 = x[0],
	          y0 = y[0],
	          dx = x[j] - x0,
	          dy = y[j] - y0,
	          i = -1,
	          t;
	
	      while (++i <= j) {
	        t = i / j;
	        this._basis.point(
	          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
	          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
	        );
	      }
	    }
	
	    this._x = this._y = null;
	    this._basis.lineEnd();
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	var bundle = (function custom(beta) {
	
	  function bundle(context) {
	    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	  }
	
	  bundle.beta = function(beta) {
	    return custom(+beta);
	  };
	
	  return bundle;
	})(0.85);
	
	function point$1(that, x, y) {
	  that._context.bezierCurveTo(
	    that._x1 + that._k * (that._x2 - that._x0),
	    that._y1 + that._k * (that._y2 - that._y0),
	    that._x2 + that._k * (that._x1 - x),
	    that._y2 + that._k * (that._y1 - y),
	    that._x2,
	    that._y2
	  );
	}
	
	function Cardinal(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	Cardinal.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: point$1(this, this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
	      case 2: this._point = 3; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinal = (function custom(tension) {
	
	  function cardinal(context) {
	    return new Cardinal(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function CardinalClosed(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalClosed = (function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalClosed(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function CardinalOpen(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalOpen = (function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalOpen(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function point$2(that, x, y) {
	  var x1 = that._x1,
	      y1 = that._y1,
	      x2 = that._x2,
	      y2 = that._y2;
	
	  if (that._l01_a > epsilon$1) {
	    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	  }
	
	  if (that._l23_a > epsilon$1) {
	    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	  }
	
	  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	}
	
	function CatmullRom(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRom.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: this.point(this._x2, this._y2); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRom = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function CatmullRomClosed(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomClosed = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function CatmullRomOpen(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomOpen = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function LinearClosed(context) {
	  this._context = context;
	}
	
	LinearClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._point) this._context.closePath();
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    if (this._point) this._context.lineTo(x, y);
	    else this._point = 1, this._context.moveTo(x, y);
	  }
	};
	
	var linearClosed = function(context) {
	  return new LinearClosed(context);
	};
	
	function sign(x) {
	  return x < 0 ? -1 : 1;
	}
	
	// Calculate the slopes of the tangents (Hermite-type interpolation) based on
	// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	// NOV(II), P. 443, 1990.
	function slope3(that, x2, y2) {
	  var h0 = that._x1 - that._x0,
	      h1 = x2 - that._x1,
	      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	      p = (s0 * h1 + s1 * h0) / (h0 + h1);
	  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	}
	
	// Calculate a one-sided slope.
	function slope2(that, t) {
	  var h = that._x1 - that._x0;
	  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	}
	
	// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	function point$3(that, t0, t1) {
	  var x0 = that._x0,
	      y0 = that._y0,
	      x1 = that._x1,
	      y1 = that._y1,
	      dx = (x1 - x0) / 3;
	  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	}
	
	function MonotoneX(context) {
	  this._context = context;
	}
	
	MonotoneX.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 =
	    this._t0 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    var t1 = NaN;
	
	    x = +x, y = +y;
	    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
	      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
	    }
	
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	    this._t0 = t1;
	  }
	};
	
	function MonotoneY(context) {
	  this._context = new ReflectContext(context);
	}
	
	(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	  MonotoneX.prototype.point.call(this, y, x);
	};
	
	function ReflectContext(context) {
	  this._context = context;
	}
	
	ReflectContext.prototype = {
	  moveTo: function(x, y) { this._context.moveTo(y, x); },
	  closePath: function() { this._context.closePath(); },
	  lineTo: function(x, y) { this._context.lineTo(y, x); },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
	};
	
	function monotoneX(context) {
	  return new MonotoneX(context);
	}
	
	function monotoneY(context) {
	  return new MonotoneY(context);
	}
	
	function Natural(context) {
	  this._context = context;
	}
	
	Natural.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        n = x.length;
	
	    if (n) {
	      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	      if (n === 2) {
	        this._context.lineTo(x[1], y[1]);
	      } else {
	        var px = controlPoints(x),
	            py = controlPoints(y);
	        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	        }
	      }
	    }
	
	    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	    this._x = this._y = null;
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	function controlPoints(x) {
	  var i,
	      n = x.length - 1,
	      m,
	      a = new Array(n),
	      b = new Array(n),
	      r = new Array(n);
	  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	  a[n - 1] = r[n - 1] / b[n - 1];
	  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	  b[n - 1] = (x[n] + a[n - 1]) / 2;
	  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	  return [a, b];
	}
	
	var natural = function(context) {
	  return new Natural(context);
	};
	
	function Step(context, t) {
	  this._context = context;
	  this._t = t;
	}
	
	Step.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = this._y = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: {
	        if (this._t <= 0) {
	          this._context.lineTo(this._x, y);
	          this._context.lineTo(x, y);
	        } else {
	          var x1 = this._x * (1 - this._t) + x * this._t;
	          this._context.lineTo(x1, this._y);
	          this._context.lineTo(x1, y);
	        }
	        break;
	      }
	    }
	    this._x = x, this._y = y;
	  }
	};
	
	var step = function(context) {
	  return new Step(context, 0.5);
	};
	
	function stepBefore(context) {
	  return new Step(context, 0);
	}
	
	function stepAfter(context) {
	  return new Step(context, 1);
	}
	
	var slice$2 = Array.prototype.slice;
	
	var none = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	    s0 = s1, s1 = series[order[i]];
	    for (var j = 0; j < m; ++j) {
	      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	    }
	  }
	};
	
	var none$1 = function(series) {
	  var n = series.length, o = new Array(n);
	  while (--n >= 0) o[n] = n;
	  return o;
	};
	
	function stackValue(d, key) {
	  return d[key];
	}
	
	var stack = function() {
	  var keys = constant$2([]),
	      order = none$1,
	      offset = none,
	      value = stackValue;
	
	  function stack(data) {
	    var kz = keys.apply(this, arguments),
	        i,
	        m = data.length,
	        n = kz.length,
	        sz = new Array(n),
	        oz;
	
	    for (i = 0; i < n; ++i) {
	      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	        si[j] = sij = [0, +value(data[j], ki, j, data)];
	        sij.data = data[j];
	      }
	      si.key = ki;
	    }
	
	    for (i = 0, oz = order(sz); i < n; ++i) {
	      sz[oz[i]].index = i;
	    }
	
	    offset(sz, oz);
	    return sz;
	  }
	
	  stack.keys = function(_) {
	    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$2(slice$2.call(_)), stack) : keys;
	  };
	
	  stack.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$2(+_), stack) : value;
	  };
	
	  stack.order = function(_) {
	    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant$2(slice$2.call(_)), stack) : order;
	  };
	
	  stack.offset = function(_) {
	    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
	  };
	
	  return stack;
	};
	
	var expand = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
	    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	  }
	  none(series, order);
	};
	
	var silhouette = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
	    s0[j][1] += s0[j][0] = -y / 2;
	  }
	  none(series, order);
	};
	
	var wiggle = function(series, order) {
	  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	      var si = series[order[i]],
	          sij0 = si[j][1] || 0,
	          sij1 = si[j - 1][1] || 0,
	          s3 = (sij0 - sij1) / 2;
	      for (var k = 0; k < i; ++k) {
	        var sk = series[order[k]],
	            skj0 = sk[j][1] || 0,
	            skj1 = sk[j - 1][1] || 0;
	        s3 += skj0 - skj1;
	      }
	      s1 += sij0, s2 += s3 * sij0;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    if (s1) y -= s2 / s1;
	  }
	  s0[j - 1][1] += s0[j - 1][0] = y;
	  none(series, order);
	};
	
	var ascending$1 = function(series) {
	  var sums = series.map(sum$1);
	  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
	};
	
	function sum$1(series) {
	  var s = 0, i = -1, n = series.length, v;
	  while (++i < n) if (v = +series[i][1]) s += v;
	  return s;
	}
	
	var descending$2 = function(series) {
	  return ascending$1(series).reverse();
	};
	
	var insideOut = function(series) {
	  var n = series.length,
	      i,
	      j,
	      sums = series.map(sum$1),
	      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
	      top = 0,
	      bottom = 0,
	      tops = [],
	      bottoms = [];
	
	  for (i = 0; i < n; ++i) {
	    j = order[i];
	    if (top < bottom) {
	      top += sums[j];
	      tops.push(j);
	    } else {
	      bottom += sums[j];
	      bottoms.push(j);
	    }
	  }
	
	  return bottoms.reverse().concat(tops);
	};
	
	var reverse = function(series) {
	  return none$1(series).reverse();
	};
	
	var define = function(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	};
	
	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}
	
	function Color() {}
	
	var darker = 0.7;
	var brighter = 1 / darker;
	
	var reI = "\\s*([+-]?\\d+)\\s*";
	var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
	var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
	var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
	var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
	var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
	var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
	
	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};
	
	define(Color, color, {
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  toString: function() {
	    return this.rgb() + "";
	  }
	});
	
	function color(format) {
	  var m;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format])
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}
	
	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}
	
	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}
	
	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}
	
	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}
	
	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  toString: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "rgb(" : "rgba(")
	        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));
	
	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}
	
	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}
	
	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  }
	}));
	
	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}
	
	var deg2rad = Math.PI / 180;
	var rad2deg = 180 / Math.PI;
	
	var Kn = 18;
	var Xn = 0.950470;
	var Yn = 1;
	var Zn = 1.088830;
	var t0 = 4 / 29;
	var t1 = 6 / 29;
	var t2 = 3 * t1 * t1;
	var t3 = t1 * t1 * t1;
	
	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var b = rgb2xyz(o.r),
	      a = rgb2xyz(o.g),
	      l = rgb2xyz(o.b),
	      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}
	
	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}
	
	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Lab, lab, extend(Color, {
	  brighter: function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker: function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb: function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	      this.opacity
	    );
	  }
	}));
	
	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}
	
	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}
	
	function xyz2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}
	
	function rgb2xyz(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}
	
	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  var h = Math.atan2(o.b, o.a) * rad2deg;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}
	
	function hcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}
	
	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hcl, hcl, extend(Color, {
	  brighter: function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	  },
	  darker: function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	  },
	  rgb: function() {
	    return labConvert(this).rgb();
	  }
	}));
	
	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;
	
	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}
	
	function cubehelix(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Cubehelix, cubehelix, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh)),
	      this.opacity
	    );
	  }
	}));
	
	function basis$1(t1, v0, v1, v2, v3) {
	  var t2 = t1 * t1, t3 = t2 * t1;
	  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
	      + (4 - 6 * t2 + 3 * t3) * v1
	      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
	      + t3 * v3) / 6;
	}
	
	var basis$2 = function(values) {
	  var n = values.length - 1;
	  return function(t) {
	    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	        v1 = values[i],
	        v2 = values[i + 1],
	        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	    return basis$1((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var basisClosed$1 = function(values) {
	  var n = values.length;
	  return function(t) {
	    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
	        v0 = values[(i + n - 1) % n],
	        v1 = values[i % n],
	        v2 = values[(i + 1) % n],
	        v3 = values[(i + 2) % n];
	    return basis$1((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var constant$3 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function linear$1(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}
	
	function exponential$1(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}
	
	function hue(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$3(isNaN(a) ? b : a);
	}
	
	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential$1(a, b, y) : constant$3(isNaN(a) ? b : a);
	  };
	}
	
	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d) : constant$3(isNaN(a) ? b : a);
	}
	
	var interpolateRgb = (function rgbGamma(y) {
	  var color$$1 = gamma(y);
	
	  function rgb$$1(start, end) {
	    var r = color$$1((start = rgb(start)).r, (end = rgb(end)).r),
	        g = color$$1(start.g, end.g),
	        b = color$$1(start.b, end.b),
	        opacity = color$$1(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  rgb$$1.gamma = rgbGamma;
	
	  return rgb$$1;
	})(1);
	
	function rgbSpline(spline) {
	  return function(colors) {
	    var n = colors.length,
	        r = new Array(n),
	        g = new Array(n),
	        b = new Array(n),
	        i, color$$1;
	    for (i = 0; i < n; ++i) {
	      color$$1 = rgb(colors[i]);
	      r[i] = color$$1.r || 0;
	      g[i] = color$$1.g || 0;
	      b[i] = color$$1.b || 0;
	    }
	    r = spline(r);
	    g = spline(g);
	    b = spline(b);
	    color$$1.opacity = 1;
	    return function(t) {
	      color$$1.r = r(t);
	      color$$1.g = g(t);
	      color$$1.b = b(t);
	      return color$$1 + "";
	    };
	  };
	}
	
	var rgbBasis = rgbSpline(basis$2);
	var rgbBasisClosed = rgbSpline(basisClosed$1);
	
	var array$1 = function(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(nb),
	      c = new Array(nb),
	      i;
	
	  for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];
	
	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	};
	
	var date = function(a, b) {
	  var d = new Date;
	  return a = +a, b -= a, function(t) {
	    return d.setTime(a + b * t), d;
	  };
	};
	
	var interpolateNumber = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return a + b * t;
	  };
	};
	
	var object = function(a, b) {
	  var i = {},
	      c = {},
	      k;
	
	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};
	
	  for (k in b) {
	    if (k in a) {
	      i[k] = interpolate(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }
	
	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	};
	
	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB = new RegExp(reA.source, "g");
	
	function zero(b) {
	  return function() {
	    return b;
	  };
	}
	
	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}
	
	var interpolateString = function(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators
	
	  // Coerce inputs to strings.
	  a = a + "", b = b + "";
	
	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: interpolateNumber(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }
	
	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }
	
	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	};
	
	var interpolate = function(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant$3(b)
	      : (t === "number" ? interpolateNumber
	      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
	      : b instanceof color ? interpolateRgb
	      : b instanceof Date ? date
	      : Array.isArray(b) ? array$1
	      : isNaN(b) ? object
	      : interpolateNumber)(a, b);
	};
	
	var interpolateRound = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return Math.round(a + b * t);
	  };
	};
	
	var degrees = 180 / Math.PI;
	
	var identity$2 = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};
	
	var decompose = function(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	};
	
	var cssNode;
	var cssRoot;
	var cssView;
	var svgNode;
	
	function parseCss(value) {
	  if (value === "none") return identity$2;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  value = value.slice(7, -1).split(",");
	  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	}
	
	function parseSvg(value) {
	  if (value == null) return identity$2;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}
	
	function interpolateTransform(parse, pxComma, pxParen, degParen) {
	
	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }
	
	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }
	
	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }
	
	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }
	
	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }
	
	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}
	
	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
	
	var rho = Math.SQRT2;
	var rho2 = 2;
	var rho4 = 4;
	var epsilon2 = 1e-12;
	
	function cosh(x) {
	  return ((x = Math.exp(x)) + 1 / x) / 2;
	}
	
	function sinh(x) {
	  return ((x = Math.exp(x)) - 1 / x) / 2;
	}
	
	function tanh(x) {
	  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	}
	
	// p0 = [ux0, uy0, w0]
	// p1 = [ux1, uy1, w1]
	var interpolateZoom = function(p0, p1) {
	  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	      dx = ux1 - ux0,
	      dy = uy1 - uy0,
	      d2 = dx * dx + dy * dy,
	      i,
	      S;
	
	  // Special case for u0 ≅ u1.
	  if (d2 < epsilon2) {
	    S = Math.log(w1 / w0) / rho;
	    i = function(t) {
	      return [
	        ux0 + t * dx,
	        uy0 + t * dy,
	        w0 * Math.exp(rho * t * S)
	      ];
	    };
	  }
	
	  // General case.
	  else {
	    var d1 = Math.sqrt(d2),
	        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	    S = (r1 - r0) / rho;
	    i = function(t) {
	      var s = t * S,
	          coshr0 = cosh(r0),
	          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	      return [
	        ux0 + u * dx,
	        uy0 + u * dy,
	        w0 * coshr0 / cosh(rho * s + r0)
	      ];
	    };
	  }
	
	  i.duration = S * 1000;
	
	  return i;
	};
	
	function hsl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = hsl(start)).h, (end = hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hsl$2 = hsl$1(hue);
	var hslLong = hsl$1(nogamma);
	
	function lab$1(start, end) {
	  var l = nogamma((start = lab(start)).l, (end = lab(end)).l),
	      a = nogamma(start.a, end.a),
	      b = nogamma(start.b, end.b),
	      opacity = nogamma(start.opacity, end.opacity);
	  return function(t) {
	    start.l = l(t);
	    start.a = a(t);
	    start.b = b(t);
	    start.opacity = opacity(t);
	    return start + "";
	  };
	}
	
	function hcl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = hcl(start)).h, (end = hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hcl$2 = hcl$1(hue);
	var hclLong = hcl$1(nogamma);
	
	function cubehelix$1(hue$$1) {
	  return (function cubehelixGamma(y) {
	    y = +y;
	
	    function cubehelix$$1(start, end) {
	      var h = hue$$1((start = cubehelix(start)).h, (end = cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    cubehelix$$1.gamma = cubehelixGamma;
	
	    return cubehelix$$1;
	  })(1);
	}
	
	var cubehelix$2 = cubehelix$1(hue);
	var cubehelixLong = cubehelix$1(nogamma);
	
	var quantize = function(interpolator, n) {
	  var samples = new Array(n);
	  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
	  return samples;
	};
	
	var noop$1 = {value: function() {}};
	
	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}
	
	function Dispatch(_) {
	  this._ = _;
	}
	
	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}
	
	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;
	
	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }
	
	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set$2(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set$2(_[t], typename.name, null);
	    }
	
	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};
	
	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}
	
	function set$2(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop$1, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}
	
	function objectConverter(columns) {
	  return new Function("d", "return {" + columns.map(function(name, i) {
	    return JSON.stringify(name) + ": d[" + i + "]";
	  }).join(",") + "}");
	}
	
	function customConverter(columns, f) {
	  var object = objectConverter(columns);
	  return function(row, i) {
	    return f(object(row), i, columns);
	  };
	}
	
	// Compute unique columns in order of discovery.
	function inferColumns(rows) {
	  var columnSet = Object.create(null),
	      columns = [];
	
	  rows.forEach(function(row) {
	    for (var column in row) {
	      if (!(column in columnSet)) {
	        columns.push(columnSet[column] = column);
	      }
	    }
	  });
	
	  return columns;
	}
	
	var dsv = function(delimiter) {
	  var reFormat = new RegExp("[\"" + delimiter + "\n]"),
	      delimiterCode = delimiter.charCodeAt(0);
	
	  function parse(text, f) {
	    var convert, columns, rows = parseRows(text, function(row, i) {
	      if (convert) return convert(row, i - 1);
	      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
	    });
	    rows.columns = columns;
	    return rows;
	  }
	
	  function parseRows(text, f) {
	    var EOL = {}, // sentinel value for end-of-line
	        EOF = {}, // sentinel value for end-of-file
	        rows = [], // output rows
	        N = text.length,
	        I = 0, // current character index
	        n = 0, // the current line number
	        t, // the current token
	        eol; // is the current token followed by EOL?
	
	    function token() {
	      if (I >= N) return EOF; // special case: end of file
	      if (eol) return eol = false, EOL; // special case: end of line
	
	      // special case: quotes
	      var j = I, c;
	      if (text.charCodeAt(j) === 34) {
	        var i = j;
	        while (i++ < N) {
	          if (text.charCodeAt(i) === 34) {
	            if (text.charCodeAt(i + 1) !== 34) break;
	            ++i;
	          }
	        }
	        I = i + 2;
	        c = text.charCodeAt(i + 1);
	        if (c === 13) {
	          eol = true;
	          if (text.charCodeAt(i + 2) === 10) ++I;
	        } else if (c === 10) {
	          eol = true;
	        }
	        return text.slice(j + 1, i).replace(/""/g, "\"");
	      }
	
	      // common case: find next delimiter or newline
	      while (I < N) {
	        var k = 1;
	        c = text.charCodeAt(I++);
	        if (c === 10) eol = true; // \n
	        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
	        else if (c !== delimiterCode) continue;
	        return text.slice(j, I - k);
	      }
	
	      // special case: last token before EOF
	      return text.slice(j);
	    }
	
	    while ((t = token()) !== EOF) {
	      var a = [];
	      while (t !== EOL && t !== EOF) {
	        a.push(t);
	        t = token();
	      }
	      if (f && (a = f(a, n++)) == null) continue;
	      rows.push(a);
	    }
	
	    return rows;
	  }
	
	  function format(rows, columns) {
	    if (columns == null) columns = inferColumns(rows);
	    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
	      return columns.map(function(column) {
	        return formatValue(row[column]);
	      }).join(delimiter);
	    })).join("\n");
	  }
	
	  function formatRows(rows) {
	    return rows.map(formatRow).join("\n");
	  }
	
	  function formatRow(row) {
	    return row.map(formatValue).join(delimiter);
	  }
	
	  function formatValue(text) {
	    return text == null ? ""
	        : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\""
	        : text;
	  }
	
	  return {
	    parse: parse,
	    parseRows: parseRows,
	    format: format,
	    formatRows: formatRows
	  };
	};
	
	var csv = dsv(",");
	
	var csvParse = csv.parse;
	var csvParseRows = csv.parseRows;
	var csvFormat = csv.format;
	var csvFormatRows = csv.formatRows;
	
	var tsv = dsv("\t");
	
	var tsvParse = tsv.parse;
	var tsvParseRows = tsv.parseRows;
	var tsvFormat = tsv.format;
	var tsvFormatRows = tsv.formatRows;
	
	var request = function(url, callback) {
	  var request,
	      event = dispatch("beforesend", "progress", "load", "error"),
	      mimeType,
	      headers = map$1(),
	      xhr = new XMLHttpRequest,
	      user = null,
	      password = null,
	      response,
	      responseType,
	      timeout = 0;
	
	  // If IE does not support CORS, use XDomainRequest.
	  if (typeof XDomainRequest !== "undefined"
	      && !("withCredentials" in xhr)
	      && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest;
	
	  "onload" in xhr
	      ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
	      : xhr.onreadystatechange = function(o) { xhr.readyState > 3 && respond(o); };
	
	  function respond(o) {
	    var status = xhr.status, result;
	    if (!status && hasResponse(xhr)
	        || status >= 200 && status < 300
	        || status === 304) {
	      if (response) {
	        try {
	          result = response.call(request, xhr);
	        } catch (e) {
	          event.call("error", request, e);
	          return;
	        }
	      } else {
	        result = xhr;
	      }
	      event.call("load", request, result);
	    } else {
	      event.call("error", request, o);
	    }
	  }
	
	  xhr.onprogress = function(e) {
	    event.call("progress", request, e);
	  };
	
	  request = {
	    header: function(name, value) {
	      name = (name + "").toLowerCase();
	      if (arguments.length < 2) return headers.get(name);
	      if (value == null) headers.remove(name);
	      else headers.set(name, value + "");
	      return request;
	    },
	
	    // If mimeType is non-null and no Accept header is set, a default is used.
	    mimeType: function(value) {
	      if (!arguments.length) return mimeType;
	      mimeType = value == null ? null : value + "";
	      return request;
	    },
	
	    // Specifies what type the response value should take;
	    // for instance, arraybuffer, blob, document, or text.
	    responseType: function(value) {
	      if (!arguments.length) return responseType;
	      responseType = value;
	      return request;
	    },
	
	    timeout: function(value) {
	      if (!arguments.length) return timeout;
	      timeout = +value;
	      return request;
	    },
	
	    user: function(value) {
	      return arguments.length < 1 ? user : (user = value == null ? null : value + "", request);
	    },
	
	    password: function(value) {
	      return arguments.length < 1 ? password : (password = value == null ? null : value + "", request);
	    },
	
	    // Specify how to convert the response content to a specific type;
	    // changes the callback value on "load" events.
	    response: function(value) {
	      response = value;
	      return request;
	    },
	
	    // Alias for send("GET", …).
	    get: function(data, callback) {
	      return request.send("GET", data, callback);
	    },
	
	    // Alias for send("POST", …).
	    post: function(data, callback) {
	      return request.send("POST", data, callback);
	    },
	
	    // If callback is non-null, it will be used for error and load events.
	    send: function(method, data, callback) {
	      xhr.open(method, url, true, user, password);
	      if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
	      if (xhr.setRequestHeader) headers.each(function(value, name) { xhr.setRequestHeader(name, value); });
	      if (mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
	      if (responseType != null) xhr.responseType = responseType;
	      if (timeout > 0) xhr.timeout = timeout;
	      if (callback == null && typeof data === "function") callback = data, data = null;
	      if (callback != null && callback.length === 1) callback = fixCallback(callback);
	      if (callback != null) request.on("error", callback).on("load", function(xhr) { callback(null, xhr); });
	      event.call("beforesend", request, xhr);
	      xhr.send(data == null ? null : data);
	      return request;
	    },
	
	    abort: function() {
	      xhr.abort();
	      return request;
	    },
	
	    on: function() {
	      var value = event.on.apply(event, arguments);
	      return value === event ? request : value;
	    }
	  };
	
	  if (callback != null) {
	    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    return request.get(callback);
	  }
	
	  return request;
	};
	
	function fixCallback(callback) {
	  return function(error, xhr) {
	    callback(error == null ? xhr : null);
	  };
	}
	
	function hasResponse(xhr) {
	  var type = xhr.responseType;
	  return type && type !== "text"
	      ? xhr.response // null on error
	      : xhr.responseText; // "" on error
	}
	
	var type = function(defaultMimeType, response) {
	  return function(url, callback) {
	    var r = request(url).mimeType(defaultMimeType).response(response);
	    if (callback != null) {
	      if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	      return r.get(callback);
	    }
	    return r;
	  };
	};
	
	var html = type("text/html", function(xhr) {
	  return document.createRange().createContextualFragment(xhr.responseText);
	});
	
	var json = type("application/json", function(xhr) {
	  return JSON.parse(xhr.responseText);
	});
	
	var text = type("text/plain", function(xhr) {
	  return xhr.responseText;
	});
	
	var xml = type("application/xml", function(xhr) {
	  var xml = xhr.responseXML;
	  if (!xml) throw new Error("parse error");
	  return xml;
	});
	
	var dsv$1 = function(defaultMimeType, parse) {
	  return function(url, row, callback) {
	    if (arguments.length < 3) callback = row, row = null;
	    var r = request(url).mimeType(defaultMimeType);
	    r.row = function(_) { return arguments.length ? r.response(responseOf(parse, row = _)) : row; };
	    r.row(row);
	    return callback ? r.get(callback) : r;
	  };
	};
	
	function responseOf(parse, row) {
	  return function(request$$1) {
	    return parse(request$$1.responseText, row);
	  };
	}
	
	var csv$1 = dsv$1("text/csv", csvParse);
	
	var tsv$1 = dsv$1("text/tab-separated-values", tsvParse);
	
	var frame = 0;
	var timeout = 0;
	var interval = 0;
	var pokeDelay = 1000;
	var taskHead;
	var taskTail;
	var clockLast = 0;
	var clockNow = 0;
	var clockSkew = 0;
	var clock = typeof performance === "object" && performance.now ? performance : Date;
	var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(f) { setTimeout(f, 17); };
	
	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}
	
	function clearNow() {
	  clockNow = 0;
	}
	
	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}
	
	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};
	
	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}
	
	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}
	
	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}
	
	function poke$1() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}
	
	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}
	
	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow;
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, delay);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) interval = setInterval(poke$1, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}
	
	var timeout$1 = function(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(function(elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	};
	
	var interval$1 = function(callback, delay, time) {
	  var t = new Timer, total = delay;
	  if (delay == null) return t.restart(callback, delay, time), t;
	  delay = +delay, time = time == null ? now() : +time;
	  t.restart(function tick(elapsed) {
	    elapsed += total;
	    t.restart(tick, total += delay, time);
	    callback(elapsed);
	  }, delay, time);
	  return t;
	};
	
	var t0$1 = new Date;
	var t1$1 = new Date;
	
	function newInterval(floori, offseti, count, field) {
	
	  function interval(date) {
	    return floori(date = new Date(+date)), date;
	  }
	
	  interval.floor = interval;
	
	  interval.ceil = function(date) {
	    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
	  };
	
	  interval.round = function(date) {
	    var d0 = interval(date),
	        d1 = interval.ceil(date);
	    return date - d0 < d1 - date ? d0 : d1;
	  };
	
	  interval.offset = function(date, step) {
	    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
	  };
	
	  interval.range = function(start, stop, step) {
	    var range = [];
	    start = interval.ceil(start);
	    step = step == null ? 1 : Math.floor(step);
	    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	    do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
	    return range;
	  };
	
	  interval.filter = function(test) {
	    return newInterval(function(date) {
	      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
	    }, function(date, step) {
	      if (date >= date) while (--step >= 0) while (offseti(date, 1), !test(date)) {} // eslint-disable-line no-empty
	    });
	  };
	
	  if (count) {
	    interval.count = function(start, end) {
	      t0$1.setTime(+start), t1$1.setTime(+end);
	      floori(t0$1), floori(t1$1);
	      return Math.floor(count(t0$1, t1$1));
	    };
	
	    interval.every = function(step) {
	      step = Math.floor(step);
	      return !isFinite(step) || !(step > 0) ? null
	          : !(step > 1) ? interval
	          : interval.filter(field
	              ? function(d) { return field(d) % step === 0; }
	              : function(d) { return interval.count(0, d) % step === 0; });
	    };
	  }
	
	  return interval;
	}
	
	var millisecond = newInterval(function() {
	  // noop
	}, function(date, step) {
	  date.setTime(+date + step);
	}, function(start, end) {
	  return end - start;
	});
	
	// An optimized implementation for this simple case.
	millisecond.every = function(k) {
	  k = Math.floor(k);
	  if (!isFinite(k) || !(k > 0)) return null;
	  if (!(k > 1)) return millisecond;
	  return newInterval(function(date) {
	    date.setTime(Math.floor(date / k) * k);
	  }, function(date, step) {
	    date.setTime(+date + step * k);
	  }, function(start, end) {
	    return (end - start) / k;
	  });
	};
	
	var milliseconds = millisecond.range;
	
	var durationSecond = 1e3;
	var durationMinute = 6e4;
	var durationHour = 36e5;
	var durationDay = 864e5;
	var durationWeek = 6048e5;
	
	var second = newInterval(function(date) {
	  date.setTime(Math.floor(date / durationSecond) * durationSecond);
	}, function(date, step) {
	  date.setTime(+date + step * durationSecond);
	}, function(start, end) {
	  return (end - start) / durationSecond;
	}, function(date) {
	  return date.getUTCSeconds();
	});
	
	var seconds = second.range;
	
	var minute = newInterval(function(date) {
	  date.setTime(Math.floor(date / durationMinute) * durationMinute);
	}, function(date, step) {
	  date.setTime(+date + step * durationMinute);
	}, function(start, end) {
	  return (end - start) / durationMinute;
	}, function(date) {
	  return date.getMinutes();
	});
	
	var minutes = minute.range;
	
	var hour = newInterval(function(date) {
	  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
	  if (offset < 0) offset += durationHour;
	  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
	}, function(date, step) {
	  date.setTime(+date + step * durationHour);
	}, function(start, end) {
	  return (end - start) / durationHour;
	}, function(date) {
	  return date.getHours();
	});
	
	var hours = hour.range;
	
	var day = newInterval(function(date) {
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setDate(date.getDate() + step);
	}, function(start, end) {
	  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
	}, function(date) {
	  return date.getDate() - 1;
	});
	
	var days = day.range;
	
	function weekday(i) {
	  return newInterval(function(date) {
	    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setDate(date.getDate() + step * 7);
	  }, function(start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
	  });
	}
	
	var sunday = weekday(0);
	var monday = weekday(1);
	var tuesday = weekday(2);
	var wednesday = weekday(3);
	var thursday = weekday(4);
	var friday = weekday(5);
	var saturday = weekday(6);
	
	var sundays = sunday.range;
	var mondays = monday.range;
	var tuesdays = tuesday.range;
	var wednesdays = wednesday.range;
	var thursdays = thursday.range;
	var fridays = friday.range;
	var saturdays = saturday.range;
	
	var month = newInterval(function(date) {
	  date.setDate(1);
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setMonth(date.getMonth() + step);
	}, function(start, end) {
	  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
	}, function(date) {
	  return date.getMonth();
	});
	
	var months = month.range;
	
	var year = newInterval(function(date) {
	  date.setMonth(0, 1);
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setFullYear(date.getFullYear() + step);
	}, function(start, end) {
	  return end.getFullYear() - start.getFullYear();
	}, function(date) {
	  return date.getFullYear();
	});
	
	// An optimized implementation for this simple case.
	year.every = function(k) {
	  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
	    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
	    date.setMonth(0, 1);
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setFullYear(date.getFullYear() + step * k);
	  });
	};
	
	var years = year.range;
	
	var utcMinute = newInterval(function(date) {
	  date.setUTCSeconds(0, 0);
	}, function(date, step) {
	  date.setTime(+date + step * durationMinute);
	}, function(start, end) {
	  return (end - start) / durationMinute;
	}, function(date) {
	  return date.getUTCMinutes();
	});
	
	var utcMinutes = utcMinute.range;
	
	var utcHour = newInterval(function(date) {
	  date.setUTCMinutes(0, 0, 0);
	}, function(date, step) {
	  date.setTime(+date + step * durationHour);
	}, function(start, end) {
	  return (end - start) / durationHour;
	}, function(date) {
	  return date.getUTCHours();
	});
	
	var utcHours = utcHour.range;
	
	var utcDay = newInterval(function(date) {
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCDate(date.getUTCDate() + step);
	}, function(start, end) {
	  return (end - start) / durationDay;
	}, function(date) {
	  return date.getUTCDate() - 1;
	});
	
	var utcDays = utcDay.range;
	
	function utcWeekday(i) {
	  return newInterval(function(date) {
	    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCDate(date.getUTCDate() + step * 7);
	  }, function(start, end) {
	    return (end - start) / durationWeek;
	  });
	}
	
	var utcSunday = utcWeekday(0);
	var utcMonday = utcWeekday(1);
	var utcTuesday = utcWeekday(2);
	var utcWednesday = utcWeekday(3);
	var utcThursday = utcWeekday(4);
	var utcFriday = utcWeekday(5);
	var utcSaturday = utcWeekday(6);
	
	var utcSundays = utcSunday.range;
	var utcMondays = utcMonday.range;
	var utcTuesdays = utcTuesday.range;
	var utcWednesdays = utcWednesday.range;
	var utcThursdays = utcThursday.range;
	var utcFridays = utcFriday.range;
	var utcSaturdays = utcSaturday.range;
	
	var utcMonth = newInterval(function(date) {
	  date.setUTCDate(1);
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCMonth(date.getUTCMonth() + step);
	}, function(start, end) {
	  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
	}, function(date) {
	  return date.getUTCMonth();
	});
	
	var utcMonths = utcMonth.range;
	
	var utcYear = newInterval(function(date) {
	  date.setUTCMonth(0, 1);
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCFullYear(date.getUTCFullYear() + step);
	}, function(start, end) {
	  return end.getUTCFullYear() - start.getUTCFullYear();
	}, function(date) {
	  return date.getUTCFullYear();
	});
	
	// An optimized implementation for this simple case.
	utcYear.every = function(k) {
	  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
	    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
	    date.setUTCMonth(0, 1);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCFullYear(date.getUTCFullYear() + step * k);
	  });
	};
	
	var utcYears = utcYear.range;
	
	// Computes the decimal coefficient and exponent of the specified number x with
	// significant digits p, where x is positive and p is in [1, 21] or undefined.
	// For example, formatDecimal(1.23) returns ["123", 0].
	var formatDecimal = function(x, p) {
	  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	  var i, coefficient = x.slice(0, i);
	
	  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	  return [
	    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
	    +x.slice(i + 1)
	  ];
	};
	
	var exponent$1 = function(x) {
	  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
	};
	
	var formatGroup = function(grouping, thousands) {
	  return function(value, width) {
	    var i = value.length,
	        t = [],
	        j = 0,
	        g = grouping[0],
	        length = 0;
	
	    while (i > 0 && g > 0) {
	      if (length + g + 1 > width) g = Math.max(1, width - length);
	      t.push(value.substring(i -= g, i + g));
	      if ((length += g + 1) > width) break;
	      g = grouping[j = (j + 1) % grouping.length];
	    }
	
	    return t.reverse().join(thousands);
	  };
	};
	
	var formatDefault = function(x, p) {
	  x = x.toPrecision(p);
	
	  out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
	    switch (x[i]) {
	      case ".": i0 = i1 = i; break;
	      case "0": if (i0 === 0) i0 = i; i1 = i; break;
	      case "e": break out;
	      default: if (i0 > 0) i0 = 0; break;
	    }
	  }
	
	  return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
	};
	
	var prefixExponent;
	
	var formatPrefixAuto = function(x, p) {
	  var d = formatDecimal(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1],
	      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	      n = coefficient.length;
	  return i === n ? coefficient
	      : i > n ? coefficient + new Array(i - n + 1).join("0")
	      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
	      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	};
	
	var formatRounded = function(x, p) {
	  var d = formatDecimal(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1];
	  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	};
	
	var formatTypes = {
	  "": formatDefault,
	  "%": function(x, p) { return (x * 100).toFixed(p); },
	  "b": function(x) { return Math.round(x).toString(2); },
	  "c": function(x) { return x + ""; },
	  "d": function(x) { return Math.round(x).toString(10); },
	  "e": function(x, p) { return x.toExponential(p); },
	  "f": function(x, p) { return x.toFixed(p); },
	  "g": function(x, p) { return x.toPrecision(p); },
	  "o": function(x) { return Math.round(x).toString(8); },
	  "p": function(x, p) { return formatRounded(x * 100, p); },
	  "r": formatRounded,
	  "s": formatPrefixAuto,
	  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
	  "x": function(x) { return Math.round(x).toString(16); }
	};
	
	// [[fill]align][sign][symbol][0][width][,][.precision][type]
	var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
	
	var formatSpecifier = function(specifier) {
	  return new FormatSpecifier(specifier);
	};
	
	function FormatSpecifier(specifier) {
	  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
	
	  var match,
	      fill = match[1] || " ",
	      align = match[2] || ">",
	      sign = match[3] || "-",
	      symbol = match[4] || "",
	      zero = !!match[5],
	      width = match[6] && +match[6],
	      comma = !!match[7],
	      precision = match[8] && +match[8].slice(1),
	      type = match[9] || "";
	
	  // The "n" type is an alias for ",g".
	  if (type === "n") comma = true, type = "g";
	
	  // Map invalid types to the default format.
	  else if (!formatTypes[type]) type = "";
	
	  // If zero fill is specified, padding goes after sign and before digits.
	  if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";
	
	  this.fill = fill;
	  this.align = align;
	  this.sign = sign;
	  this.symbol = symbol;
	  this.zero = zero;
	  this.width = width;
	  this.comma = comma;
	  this.precision = precision;
	  this.type = type;
	}
	
	FormatSpecifier.prototype.toString = function() {
	  return this.fill
	      + this.align
	      + this.sign
	      + this.symbol
	      + (this.zero ? "0" : "")
	      + (this.width == null ? "" : Math.max(1, this.width | 0))
	      + (this.comma ? "," : "")
	      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
	      + this.type;
	};
	
	var prefixes = ["y","z","a","f","p","n","\xB5","m","","k","M","G","T","P","E","Z","Y"];
	
	function identity$3(x) {
	  return x;
	}
	
	var formatLocale = function(locale) {
	  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$3,
	      currency = locale.currency,
	      decimal = locale.decimal;
	
	  function newFormat(specifier) {
	    specifier = formatSpecifier(specifier);
	
	    var fill = specifier.fill,
	        align = specifier.align,
	        sign = specifier.sign,
	        symbol = specifier.symbol,
	        zero = specifier.zero,
	        width = specifier.width,
	        comma = specifier.comma,
	        precision = specifier.precision,
	        type = specifier.type;
	
	    // Compute the prefix and suffix.
	    // For SI-prefix, the suffix is lazily computed.
	    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? "%" : "";
	
	    // What format function should we use?
	    // Is this an integer type?
	    // Can this type generate exponential notation?
	    var formatType = formatTypes[type],
	        maybeSuffix = !type || /[defgprs%]/.test(type);
	
	    // Set the default precision if not specified,
	    // or clamp the specified precision to the supported range.
	    // For significant precision, it must be in [1, 21].
	    // For fixed precision, it must be in [0, 20].
	    precision = precision == null ? (type ? 6 : 12)
	        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
	        : Math.max(0, Math.min(20, precision));
	
	    function format(value) {
	      var valuePrefix = prefix,
	          valueSuffix = suffix,
	          i, n, c;
	
	      if (type === "c") {
	        valueSuffix = formatType(value) + valueSuffix;
	        value = "";
	      } else {
	        value = +value;
	
	        // Convert negative to positive, and compute the prefix.
	        // Note that -0 is not less than 0, but 1 / -0 is!
	        var valueNegative = (value < 0 || 1 / value < 0) && (value *= -1, true);
	
	        // Perform the initial formatting.
	        value = formatType(value, precision);
	
	        // If the original value was negative, it may be rounded to zero during
	        // formatting; treat this as (positive) zero.
	        if (valueNegative) {
	          i = -1, n = value.length;
	          valueNegative = false;
	          while (++i < n) {
	            if (c = value.charCodeAt(i), (48 < c && c < 58)
	                || (type === "x" && 96 < c && c < 103)
	                || (type === "X" && 64 < c && c < 71)) {
	              valueNegative = true;
	              break;
	            }
	          }
	        }
	
	        // Compute the prefix and suffix.
	        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	        valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");
	
	        // Break the formatted value into the integer “value” part that can be
	        // grouped, and fractional or exponential “suffix” part that is not.
	        if (maybeSuffix) {
	          i = -1, n = value.length;
	          while (++i < n) {
	            if (c = value.charCodeAt(i), 48 > c || c > 57) {
	              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
	              value = value.slice(0, i);
	              break;
	            }
	          }
	        }
	      }
	
	      // If the fill character is not "0", grouping is applied before padding.
	      if (comma && !zero) value = group(value, Infinity);
	
	      // Compute the padding.
	      var length = valuePrefix.length + value.length + valueSuffix.length,
	          padding = length < width ? new Array(width - length + 1).join(fill) : "";
	
	      // If the fill character is "0", grouping is applied after padding.
	      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
	
	      // Reconstruct the final output based on the desired alignment.
	      switch (align) {
	        case "<": return valuePrefix + value + valueSuffix + padding;
	        case "=": return valuePrefix + padding + value + valueSuffix;
	        case "^": return padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
	      }
	      return padding + valuePrefix + value + valueSuffix;
	    }
	
	    format.toString = function() {
	      return specifier + "";
	    };
	
	    return format;
	  }
	
	  function formatPrefix(specifier, value) {
	    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	        e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
	        k = Math.pow(10, -e),
	        prefix = prefixes[8 + e / 3];
	    return function(value) {
	      return f(k * value) + prefix;
	    };
	  }
	
	  return {
	    format: newFormat,
	    formatPrefix: formatPrefix
	  };
	};
	
	var locale$1;
	
	
	
	defaultLocale({
	  decimal: ".",
	  thousands: ",",
	  grouping: [3],
	  currency: ["$", ""]
	});
	
	function defaultLocale(definition) {
	  locale$1 = formatLocale(definition);
	  exports.format = locale$1.format;
	  exports.formatPrefix = locale$1.formatPrefix;
	  return locale$1;
	}
	
	var precisionFixed = function(step) {
	  return Math.max(0, -exponent$1(Math.abs(step)));
	};
	
	var precisionPrefix = function(step, value) {
	  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3 - exponent$1(Math.abs(step)));
	};
	
	var precisionRound = function(step, max) {
	  step = Math.abs(step), max = Math.abs(max) - step;
	  return Math.max(0, exponent$1(max) - exponent$1(step)) + 1;
	};
	
	function localDate(d) {
	  if (0 <= d.y && d.y < 100) {
	    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
	    date.setFullYear(d.y);
	    return date;
	  }
	  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
	}
	
	function utcDate(d) {
	  if (0 <= d.y && d.y < 100) {
	    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
	    date.setUTCFullYear(d.y);
	    return date;
	  }
	  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
	}
	
	function newYear(y) {
	  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
	}
	
	function formatLocale$1(locale) {
	  var locale_dateTime = locale.dateTime,
	      locale_date = locale.date,
	      locale_time = locale.time,
	      locale_periods = locale.periods,
	      locale_weekdays = locale.days,
	      locale_shortWeekdays = locale.shortDays,
	      locale_months = locale.months,
	      locale_shortMonths = locale.shortMonths;
	
	  var periodRe = formatRe(locale_periods),
	      periodLookup = formatLookup(locale_periods),
	      weekdayRe = formatRe(locale_weekdays),
	      weekdayLookup = formatLookup(locale_weekdays),
	      shortWeekdayRe = formatRe(locale_shortWeekdays),
	      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
	      monthRe = formatRe(locale_months),
	      monthLookup = formatLookup(locale_months),
	      shortMonthRe = formatRe(locale_shortMonths),
	      shortMonthLookup = formatLookup(locale_shortMonths);
	
	  var formats = {
	    "a": formatShortWeekday,
	    "A": formatWeekday,
	    "b": formatShortMonth,
	    "B": formatMonth,
	    "c": null,
	    "d": formatDayOfMonth,
	    "e": formatDayOfMonth,
	    "H": formatHour24,
	    "I": formatHour12,
	    "j": formatDayOfYear,
	    "L": formatMilliseconds,
	    "m": formatMonthNumber,
	    "M": formatMinutes,
	    "p": formatPeriod,
	    "S": formatSeconds,
	    "U": formatWeekNumberSunday,
	    "w": formatWeekdayNumber,
	    "W": formatWeekNumberMonday,
	    "x": null,
	    "X": null,
	    "y": formatYear,
	    "Y": formatFullYear,
	    "Z": formatZone,
	    "%": formatLiteralPercent
	  };
	
	  var utcFormats = {
	    "a": formatUTCShortWeekday,
	    "A": formatUTCWeekday,
	    "b": formatUTCShortMonth,
	    "B": formatUTCMonth,
	    "c": null,
	    "d": formatUTCDayOfMonth,
	    "e": formatUTCDayOfMonth,
	    "H": formatUTCHour24,
	    "I": formatUTCHour12,
	    "j": formatUTCDayOfYear,
	    "L": formatUTCMilliseconds,
	    "m": formatUTCMonthNumber,
	    "M": formatUTCMinutes,
	    "p": formatUTCPeriod,
	    "S": formatUTCSeconds,
	    "U": formatUTCWeekNumberSunday,
	    "w": formatUTCWeekdayNumber,
	    "W": formatUTCWeekNumberMonday,
	    "x": null,
	    "X": null,
	    "y": formatUTCYear,
	    "Y": formatUTCFullYear,
	    "Z": formatUTCZone,
	    "%": formatLiteralPercent
	  };
	
	  var parses = {
	    "a": parseShortWeekday,
	    "A": parseWeekday,
	    "b": parseShortMonth,
	    "B": parseMonth,
	    "c": parseLocaleDateTime,
	    "d": parseDayOfMonth,
	    "e": parseDayOfMonth,
	    "H": parseHour24,
	    "I": parseHour24,
	    "j": parseDayOfYear,
	    "L": parseMilliseconds,
	    "m": parseMonthNumber,
	    "M": parseMinutes,
	    "p": parsePeriod,
	    "S": parseSeconds,
	    "U": parseWeekNumberSunday,
	    "w": parseWeekdayNumber,
	    "W": parseWeekNumberMonday,
	    "x": parseLocaleDate,
	    "X": parseLocaleTime,
	    "y": parseYear,
	    "Y": parseFullYear,
	    "Z": parseZone,
	    "%": parseLiteralPercent
	  };
	
	  // These recursive directive definitions must be deferred.
	  formats.x = newFormat(locale_date, formats);
	  formats.X = newFormat(locale_time, formats);
	  formats.c = newFormat(locale_dateTime, formats);
	  utcFormats.x = newFormat(locale_date, utcFormats);
	  utcFormats.X = newFormat(locale_time, utcFormats);
	  utcFormats.c = newFormat(locale_dateTime, utcFormats);
	
	  function newFormat(specifier, formats) {
	    return function(date) {
	      var string = [],
	          i = -1,
	          j = 0,
	          n = specifier.length,
	          c,
	          pad,
	          format;
	
	      if (!(date instanceof Date)) date = new Date(+date);
	
	      while (++i < n) {
	        if (specifier.charCodeAt(i) === 37) {
	          string.push(specifier.slice(j, i));
	          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
	          else pad = c === "e" ? " " : "0";
	          if (format = formats[c]) c = format(date, pad);
	          string.push(c);
	          j = i + 1;
	        }
	      }
	
	      string.push(specifier.slice(j, i));
	      return string.join("");
	    };
	  }
	
	  function newParse(specifier, newDate) {
	    return function(string) {
	      var d = newYear(1900),
	          i = parseSpecifier(d, specifier, string += "", 0);
	      if (i != string.length) return null;
	
	      // The am-pm flag is 0 for AM, and 1 for PM.
	      if ("p" in d) d.H = d.H % 12 + d.p * 12;
	
	      // Convert day-of-week and week-of-year to day-of-year.
	      if ("W" in d || "U" in d) {
	        if (!("w" in d)) d.w = "W" in d ? 1 : 0;
	        var day$$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
	        d.m = 0;
	        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$$1 + 5) % 7 : d.w + d.U * 7 - (day$$1 + 6) % 7;
	      }
	
	      // If a time zone is specified, all fields are interpreted as UTC and then
	      // offset according to the specified time zone.
	      if ("Z" in d) {
	        d.H += d.Z / 100 | 0;
	        d.M += d.Z % 100;
	        return utcDate(d);
	      }
	
	      // Otherwise, all fields are in local time.
	      return newDate(d);
	    };
	  }
	
	  function parseSpecifier(d, specifier, string, j) {
	    var i = 0,
	        n = specifier.length,
	        m = string.length,
	        c,
	        parse;
	
	    while (i < n) {
	      if (j >= m) return -1;
	      c = specifier.charCodeAt(i++);
	      if (c === 37) {
	        c = specifier.charAt(i++);
	        parse = parses[c in pads ? specifier.charAt(i++) : c];
	        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
	      } else if (c != string.charCodeAt(j++)) {
	        return -1;
	      }
	    }
	
	    return j;
	  }
	
	  function parsePeriod(d, string, i) {
	    var n = periodRe.exec(string.slice(i));
	    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseShortWeekday(d, string, i) {
	    var n = shortWeekdayRe.exec(string.slice(i));
	    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseWeekday(d, string, i) {
	    var n = weekdayRe.exec(string.slice(i));
	    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseShortMonth(d, string, i) {
	    var n = shortMonthRe.exec(string.slice(i));
	    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseMonth(d, string, i) {
	    var n = monthRe.exec(string.slice(i));
	    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseLocaleDateTime(d, string, i) {
	    return parseSpecifier(d, locale_dateTime, string, i);
	  }
	
	  function parseLocaleDate(d, string, i) {
	    return parseSpecifier(d, locale_date, string, i);
	  }
	
	  function parseLocaleTime(d, string, i) {
	    return parseSpecifier(d, locale_time, string, i);
	  }
	
	  function formatShortWeekday(d) {
	    return locale_shortWeekdays[d.getDay()];
	  }
	
	  function formatWeekday(d) {
	    return locale_weekdays[d.getDay()];
	  }
	
	  function formatShortMonth(d) {
	    return locale_shortMonths[d.getMonth()];
	  }
	
	  function formatMonth(d) {
	    return locale_months[d.getMonth()];
	  }
	
	  function formatPeriod(d) {
	    return locale_periods[+(d.getHours() >= 12)];
	  }
	
	  function formatUTCShortWeekday(d) {
	    return locale_shortWeekdays[d.getUTCDay()];
	  }
	
	  function formatUTCWeekday(d) {
	    return locale_weekdays[d.getUTCDay()];
	  }
	
	  function formatUTCShortMonth(d) {
	    return locale_shortMonths[d.getUTCMonth()];
	  }
	
	  function formatUTCMonth(d) {
	    return locale_months[d.getUTCMonth()];
	  }
	
	  function formatUTCPeriod(d) {
	    return locale_periods[+(d.getUTCHours() >= 12)];
	  }
	
	  return {
	    format: function(specifier) {
	      var f = newFormat(specifier += "", formats);
	      f.toString = function() { return specifier; };
	      return f;
	    },
	    parse: function(specifier) {
	      var p = newParse(specifier += "", localDate);
	      p.toString = function() { return specifier; };
	      return p;
	    },
	    utcFormat: function(specifier) {
	      var f = newFormat(specifier += "", utcFormats);
	      f.toString = function() { return specifier; };
	      return f;
	    },
	    utcParse: function(specifier) {
	      var p = newParse(specifier, utcDate);
	      p.toString = function() { return specifier; };
	      return p;
	    }
	  };
	}
	
	var pads = {"-": "", "_": " ", "0": "0"};
	var numberRe = /^\s*\d+/;
	var percentRe = /^%/;
	var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
	
	function pad(value, fill, width) {
	  var sign = value < 0 ? "-" : "",
	      string = (sign ? -value : value) + "",
	      length = string.length;
	  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
	}
	
	function requote(s) {
	  return s.replace(requoteRe, "\\$&");
	}
	
	function formatRe(names) {
	  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
	}
	
	function formatLookup(names) {
	  var map = {}, i = -1, n = names.length;
	  while (++i < n) map[names[i].toLowerCase()] = i;
	  return map;
	}
	
	function parseWeekdayNumber(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 1));
	  return n ? (d.w = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekNumberSunday(d, string, i) {
	  var n = numberRe.exec(string.slice(i));
	  return n ? (d.U = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekNumberMonday(d, string, i) {
	  var n = numberRe.exec(string.slice(i));
	  return n ? (d.W = +n[0], i + n[0].length) : -1;
	}
	
	function parseFullYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 4));
	  return n ? (d.y = +n[0], i + n[0].length) : -1;
	}
	
	function parseYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
	}
	
	function parseZone(d, string, i) {
	  var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
	  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
	}
	
	function parseMonthNumber(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
	}
	
	function parseDayOfMonth(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.d = +n[0], i + n[0].length) : -1;
	}
	
	function parseDayOfYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 3));
	  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
	}
	
	function parseHour24(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.H = +n[0], i + n[0].length) : -1;
	}
	
	function parseMinutes(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.M = +n[0], i + n[0].length) : -1;
	}
	
	function parseSeconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.S = +n[0], i + n[0].length) : -1;
	}
	
	function parseMilliseconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 3));
	  return n ? (d.L = +n[0], i + n[0].length) : -1;
	}
	
	function parseLiteralPercent(d, string, i) {
	  var n = percentRe.exec(string.slice(i, i + 1));
	  return n ? i + n[0].length : -1;
	}
	
	function formatDayOfMonth(d, p) {
	  return pad(d.getDate(), p, 2);
	}
	
	function formatHour24(d, p) {
	  return pad(d.getHours(), p, 2);
	}
	
	function formatHour12(d, p) {
	  return pad(d.getHours() % 12 || 12, p, 2);
	}
	
	function formatDayOfYear(d, p) {
	  return pad(1 + day.count(year(d), d), p, 3);
	}
	
	function formatMilliseconds(d, p) {
	  return pad(d.getMilliseconds(), p, 3);
	}
	
	function formatMonthNumber(d, p) {
	  return pad(d.getMonth() + 1, p, 2);
	}
	
	function formatMinutes(d, p) {
	  return pad(d.getMinutes(), p, 2);
	}
	
	function formatSeconds(d, p) {
	  return pad(d.getSeconds(), p, 2);
	}
	
	function formatWeekNumberSunday(d, p) {
	  return pad(sunday.count(year(d), d), p, 2);
	}
	
	function formatWeekdayNumber(d) {
	  return d.getDay();
	}
	
	function formatWeekNumberMonday(d, p) {
	  return pad(monday.count(year(d), d), p, 2);
	}
	
	function formatYear(d, p) {
	  return pad(d.getFullYear() % 100, p, 2);
	}
	
	function formatFullYear(d, p) {
	  return pad(d.getFullYear() % 10000, p, 4);
	}
	
	function formatZone(d) {
	  var z = d.getTimezoneOffset();
	  return (z > 0 ? "-" : (z *= -1, "+"))
	      + pad(z / 60 | 0, "0", 2)
	      + pad(z % 60, "0", 2);
	}
	
	function formatUTCDayOfMonth(d, p) {
	  return pad(d.getUTCDate(), p, 2);
	}
	
	function formatUTCHour24(d, p) {
	  return pad(d.getUTCHours(), p, 2);
	}
	
	function formatUTCHour12(d, p) {
	  return pad(d.getUTCHours() % 12 || 12, p, 2);
	}
	
	function formatUTCDayOfYear(d, p) {
	  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
	}
	
	function formatUTCMilliseconds(d, p) {
	  return pad(d.getUTCMilliseconds(), p, 3);
	}
	
	function formatUTCMonthNumber(d, p) {
	  return pad(d.getUTCMonth() + 1, p, 2);
	}
	
	function formatUTCMinutes(d, p) {
	  return pad(d.getUTCMinutes(), p, 2);
	}
	
	function formatUTCSeconds(d, p) {
	  return pad(d.getUTCSeconds(), p, 2);
	}
	
	function formatUTCWeekNumberSunday(d, p) {
	  return pad(utcSunday.count(utcYear(d), d), p, 2);
	}
	
	function formatUTCWeekdayNumber(d) {
	  return d.getUTCDay();
	}
	
	function formatUTCWeekNumberMonday(d, p) {
	  return pad(utcMonday.count(utcYear(d), d), p, 2);
	}
	
	function formatUTCYear(d, p) {
	  return pad(d.getUTCFullYear() % 100, p, 2);
	}
	
	function formatUTCFullYear(d, p) {
	  return pad(d.getUTCFullYear() % 10000, p, 4);
	}
	
	function formatUTCZone() {
	  return "+0000";
	}
	
	function formatLiteralPercent() {
	  return "%";
	}
	
	var locale$2;
	
	
	
	
	
	defaultLocale$1({
	  dateTime: "%x, %X",
	  date: "%-m/%-d/%Y",
	  time: "%-I:%M:%S %p",
	  periods: ["AM", "PM"],
	  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});
	
	function defaultLocale$1(definition) {
	  locale$2 = formatLocale$1(definition);
	  exports.timeFormat = locale$2.format;
	  exports.timeParse = locale$2.parse;
	  exports.utcFormat = locale$2.utcFormat;
	  exports.utcParse = locale$2.utcParse;
	  return locale$2;
	}
	
	var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
	
	function formatIsoNative(date) {
	  return date.toISOString();
	}
	
	var formatIso = Date.prototype.toISOString
	    ? formatIsoNative
	    : exports.utcFormat(isoSpecifier);
	
	function parseIsoNative(string) {
	  var date = new Date(string);
	  return isNaN(date) ? null : date;
	}
	
	var parseIso = +new Date("2000-01-01T00:00:00.000Z")
	    ? parseIsoNative
	    : exports.utcParse(isoSpecifier);
	
	var array$2 = Array.prototype;
	
	var map$3 = array$2.map;
	var slice$3 = array$2.slice;
	
	var implicit = {name: "implicit"};
	
	function ordinal(range) {
	  var index = map$1(),
	      domain = [],
	      unknown = implicit;
	
	  range = range == null ? [] : slice$3.call(range);
	
	  function scale(d) {
	    var key = d + "", i = index.get(key);
	    if (!i) {
	      if (unknown !== implicit) return unknown;
	      index.set(key, i = domain.push(d));
	    }
	    return range[(i - 1) % range.length];
	  }
	
	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [], index = map$1();
	    var i = -1, n = _.length, d, key;
	    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
	    return scale;
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range = slice$3.call(_), scale) : range.slice();
	  };
	
	  scale.unknown = function(_) {
	    return arguments.length ? (unknown = _, scale) : unknown;
	  };
	
	  scale.copy = function() {
	    return ordinal()
	        .domain(domain)
	        .range(range)
	        .unknown(unknown);
	  };
	
	  return scale;
	}
	
	function band() {
	  var scale = ordinal().unknown(undefined),
	      domain = scale.domain,
	      ordinalRange = scale.range,
	      range$$1 = [0, 1],
	      step,
	      bandwidth,
	      round = false,
	      paddingInner = 0,
	      paddingOuter = 0,
	      align = 0.5;
	
	  delete scale.unknown;
	
	  function rescale() {
	    var n = domain().length,
	        reverse = range$$1[1] < range$$1[0],
	        start = range$$1[reverse - 0],
	        stop = range$$1[1 - reverse];
	    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
	    if (round) step = Math.floor(step);
	    start += (stop - start - step * (n - paddingInner)) * align;
	    bandwidth = step * (1 - paddingInner);
	    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
	    var values = range(n).map(function(i) { return start + step * i; });
	    return ordinalRange(reverse ? values.reverse() : values);
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain(_), rescale()) : domain();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = [+_[0], +_[1]], rescale()) : range$$1.slice();
	  };
	
	  scale.rangeRound = function(_) {
	    return range$$1 = [+_[0], +_[1]], round = true, rescale();
	  };
	
	  scale.bandwidth = function() {
	    return bandwidth;
	  };
	
	  scale.step = function() {
	    return step;
	  };
	
	  scale.round = function(_) {
	    return arguments.length ? (round = !!_, rescale()) : round;
	  };
	
	  scale.padding = function(_) {
	    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	  };
	
	  scale.paddingInner = function(_) {
	    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	  };
	
	  scale.paddingOuter = function(_) {
	    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
	  };
	
	  scale.align = function(_) {
	    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	  };
	
	  scale.copy = function() {
	    return band()
	        .domain(domain())
	        .range(range$$1)
	        .round(round)
	        .paddingInner(paddingInner)
	        .paddingOuter(paddingOuter)
	        .align(align);
	  };
	
	  return rescale();
	}
	
	function pointish(scale) {
	  var copy = scale.copy;
	
	  scale.padding = scale.paddingOuter;
	  delete scale.paddingInner;
	  delete scale.paddingOuter;
	
	  scale.copy = function() {
	    return pointish(copy());
	  };
	
	  return scale;
	}
	
	function point$4() {
	  return pointish(band().paddingInner(1));
	}
	
	var constant$4 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var number$1 = function(x) {
	  return +x;
	};
	
	var unit = [0, 1];
	
	function deinterpolateLinear(a, b) {
	  return (b -= (a = +a))
	      ? function(x) { return (x - a) / b; }
	      : constant$4(b);
	}
	
	function deinterpolateClamp(deinterpolate) {
	  return function(a, b) {
	    var d = deinterpolate(a = +a, b = +b);
	    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
	  };
	}
	
	function reinterpolateClamp(reinterpolate) {
	  return function(a, b) {
	    var r = reinterpolate(a = +a, b = +b);
	    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
	  };
	}
	
	function bimap(domain, range$$1, deinterpolate, reinterpolate) {
	  var d0 = domain[0], d1 = domain[1], r0 = range$$1[0], r1 = range$$1[1];
	  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
	  else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
	  return function(x) { return r0(d0(x)); };
	}
	
	function polymap(domain, range$$1, deinterpolate, reinterpolate) {
	  var j = Math.min(domain.length, range$$1.length) - 1,
	      d = new Array(j),
	      r = new Array(j),
	      i = -1;
	
	  // Reverse descending domains.
	  if (domain[j] < domain[0]) {
	    domain = domain.slice().reverse();
	    range$$1 = range$$1.slice().reverse();
	  }
	
	  while (++i < j) {
	    d[i] = deinterpolate(domain[i], domain[i + 1]);
	    r[i] = reinterpolate(range$$1[i], range$$1[i + 1]);
	  }
	
	  return function(x) {
	    var i = bisectRight(domain, x, 1, j) - 1;
	    return r[i](d[i](x));
	  };
	}
	
	function copy(source, target) {
	  return target
	      .domain(source.domain())
	      .range(source.range())
	      .interpolate(source.interpolate())
	      .clamp(source.clamp());
	}
	
	// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
	// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
	function continuous(deinterpolate, reinterpolate) {
	  var domain = unit,
	      range$$1 = unit,
	      interpolate$$1 = interpolate,
	      clamp = false,
	      piecewise,
	      output,
	      input;
	
	  function rescale() {
	    piecewise = Math.min(domain.length, range$$1.length) > 2 ? polymap : bimap;
	    output = input = null;
	    return scale;
	  }
	
	  function scale(x) {
	    return (output || (output = piecewise(domain, range$$1, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate$$1)))(+x);
	  }
	
	  scale.invert = function(y) {
	    return (input || (input = piecewise(range$$1, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain = map$3.call(_, number$1), rescale()) : domain.slice();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice$3.call(_), rescale()) : range$$1.slice();
	  };
	
	  scale.rangeRound = function(_) {
	    return range$$1 = slice$3.call(_), interpolate$$1 = interpolateRound, rescale();
	  };
	
	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = !!_, rescale()) : clamp;
	  };
	
	  scale.interpolate = function(_) {
	    return arguments.length ? (interpolate$$1 = _, rescale()) : interpolate$$1;
	  };
	
	  return rescale();
	}
	
	var tickFormat = function(domain, count, specifier) {
	  var start = domain[0],
	      stop = domain[domain.length - 1],
	      step = tickStep(start, stop, count == null ? 10 : count),
	      precision;
	  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
	  switch (specifier.type) {
	    case "s": {
	      var value = Math.max(Math.abs(start), Math.abs(stop));
	      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
	      return exports.formatPrefix(specifier, value);
	    }
	    case "":
	    case "e":
	    case "g":
	    case "p":
	    case "r": {
	      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
	      break;
	    }
	    case "f":
	    case "%": {
	      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
	      break;
	    }
	  }
	  return exports.format(specifier);
	};
	
	function linearish(scale) {
	  var domain = scale.domain;
	
	  scale.ticks = function(count) {
	    var d = domain();
	    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    return tickFormat(domain(), count, specifier);
	  };
	
	  scale.nice = function(count) {
	    var d = domain(),
	        i = d.length - 1,
	        n = count == null ? 10 : count,
	        start = d[0],
	        stop = d[i],
	        step = tickStep(start, stop, n);
	
	    if (step) {
	      step = tickStep(Math.floor(start / step) * step, Math.ceil(stop / step) * step, n);
	      d[0] = Math.floor(start / step) * step;
	      d[i] = Math.ceil(stop / step) * step;
	      domain(d);
	    }
	
	    return scale;
	  };
	
	  return scale;
	}
	
	function linear$2() {
	  var scale = continuous(deinterpolateLinear, interpolateNumber);
	
	  scale.copy = function() {
	    return copy(scale, linear$2());
	  };
	
	  return linearish(scale);
	}
	
	function identity$4() {
	  var domain = [0, 1];
	
	  function scale(x) {
	    return +x;
	  }
	
	  scale.invert = scale;
	
	  scale.domain = scale.range = function(_) {
	    return arguments.length ? (domain = map$3.call(_, number$1), scale) : domain.slice();
	  };
	
	  scale.copy = function() {
	    return identity$4().domain(domain);
	  };
	
	  return linearish(scale);
	}
	
	var nice = function(domain, interval) {
	  domain = domain.slice();
	
	  var i0 = 0,
	      i1 = domain.length - 1,
	      x0 = domain[i0],
	      x1 = domain[i1],
	      t;
	
	  if (x1 < x0) {
	    t = i0, i0 = i1, i1 = t;
	    t = x0, x0 = x1, x1 = t;
	  }
	
	  domain[i0] = interval.floor(x0);
	  domain[i1] = interval.ceil(x1);
	  return domain;
	};
	
	function deinterpolate(a, b) {
	  return (b = Math.log(b / a))
	      ? function(x) { return Math.log(x / a) / b; }
	      : constant$4(b);
	}
	
	function reinterpolate(a, b) {
	  return a < 0
	      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
	      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
	}
	
	function pow10(x) {
	  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
	}
	
	function powp(base) {
	  return base === 10 ? pow10
	      : base === Math.E ? Math.exp
	      : function(x) { return Math.pow(base, x); };
	}
	
	function logp(base) {
	  return base === Math.E ? Math.log
	      : base === 10 && Math.log10
	      || base === 2 && Math.log2
	      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
	}
	
	function reflect(f) {
	  return function(x) {
	    return -f(-x);
	  };
	}
	
	function log() {
	  var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]),
	      domain = scale.domain,
	      base = 10,
	      logs = logp(10),
	      pows = powp(10);
	
	  function rescale() {
	    logs = logp(base), pows = powp(base);
	    if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
	    return scale;
	  }
	
	  scale.base = function(_) {
	    return arguments.length ? (base = +_, rescale()) : base;
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain(_), rescale()) : domain();
	  };
	
	  scale.ticks = function(count) {
	    var d = domain(),
	        u = d[0],
	        v = d[d.length - 1],
	        r;
	
	    if (r = v < u) i = u, u = v, v = i;
	
	    var i = logs(u),
	        j = logs(v),
	        p,
	        k,
	        t,
	        n = count == null ? 10 : +count,
	        z = [];
	
	    if (!(base % 1) && j - i < n) {
	      i = Math.round(i) - 1, j = Math.round(j) + 1;
	      if (u > 0) for (; i < j; ++i) {
	        for (k = 1, p = pows(i); k < base; ++k) {
	          t = p * k;
	          if (t < u) continue;
	          if (t > v) break;
	          z.push(t);
	        }
	      } else for (; i < j; ++i) {
	        for (k = base - 1, p = pows(i); k >= 1; --k) {
	          t = p * k;
	          if (t < u) continue;
	          if (t > v) break;
	          z.push(t);
	        }
	      }
	    } else {
	      z = ticks(i, j, Math.min(j - i, n)).map(pows);
	    }
	
	    return r ? z.reverse() : z;
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
	    if (typeof specifier !== "function") specifier = exports.format(specifier);
	    if (count === Infinity) return specifier;
	    if (count == null) count = 10;
	    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
	    return function(d) {
	      var i = d / pows(Math.round(logs(d)));
	      if (i * base < base - 0.5) i *= base;
	      return i <= k ? specifier(d) : "";
	    };
	  };
	
	  scale.nice = function() {
	    return domain(nice(domain(), {
	      floor: function(x) { return pows(Math.floor(logs(x))); },
	      ceil: function(x) { return pows(Math.ceil(logs(x))); }
	    }));
	  };
	
	  scale.copy = function() {
	    return copy(scale, log().base(base));
	  };
	
	  return scale;
	}
	
	function raise(x, exponent) {
	  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	}
	
	function pow() {
	  var exponent = 1,
	      scale = continuous(deinterpolate, reinterpolate),
	      domain = scale.domain;
	
	  function deinterpolate(a, b) {
	    return (b = raise(b, exponent) - (a = raise(a, exponent)))
	        ? function(x) { return (raise(x, exponent) - a) / b; }
	        : constant$4(b);
	  }
	
	  function reinterpolate(a, b) {
	    b = raise(b, exponent) - (a = raise(a, exponent));
	    return function(t) { return raise(a + b * t, 1 / exponent); };
	  }
	
	  scale.exponent = function(_) {
	    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
	  };
	
	  scale.copy = function() {
	    return copy(scale, pow().exponent(exponent));
	  };
	
	  return linearish(scale);
	}
	
	function sqrt() {
	  return pow().exponent(0.5);
	}
	
	function quantile$$1() {
	  var domain = [],
	      range$$1 = [],
	      thresholds = [];
	
	  function rescale() {
	    var i = 0, n = Math.max(1, range$$1.length);
	    thresholds = new Array(n - 1);
	    while (++i < n) thresholds[i - 1] = threshold(domain, i / n);
	    return scale;
	  }
	
	  function scale(x) {
	    if (!isNaN(x = +x)) return range$$1[bisectRight(thresholds, x)];
	  }
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return i < 0 ? [NaN, NaN] : [
	      i > 0 ? thresholds[i - 1] : domain[0],
	      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
	    ];
	  };
	
	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [];
	    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
	    domain.sort(ascending);
	    return rescale();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice$3.call(_), rescale()) : range$$1.slice();
	  };
	
	  scale.quantiles = function() {
	    return thresholds.slice();
	  };
	
	  scale.copy = function() {
	    return quantile$$1()
	        .domain(domain)
	        .range(range$$1);
	  };
	
	  return scale;
	}
	
	function quantize$1() {
	  var x0 = 0,
	      x1 = 1,
	      n = 1,
	      domain = [0.5],
	      range$$1 = [0, 1];
	
	  function scale(x) {
	    if (x <= x) return range$$1[bisectRight(domain, x, 0, n)];
	  }
	
	  function rescale() {
	    var i = -1;
	    domain = new Array(n);
	    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
	    return scale;
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (n = (range$$1 = slice$3.call(_)).length - 1, rescale()) : range$$1.slice();
	  };
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return i < 0 ? [NaN, NaN]
	        : i < 1 ? [x0, domain[0]]
	        : i >= n ? [domain[n - 1], x1]
	        : [domain[i - 1], domain[i]];
	  };
	
	  scale.copy = function() {
	    return quantize$1()
	        .domain([x0, x1])
	        .range(range$$1);
	  };
	
	  return linearish(scale);
	}
	
	function threshold$1() {
	  var domain = [0.5],
	      range$$1 = [0, 1],
	      n = 1;
	
	  function scale(x) {
	    if (x <= x) return range$$1[bisectRight(domain, x, 0, n)];
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain = slice$3.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : domain.slice();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice$3.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : range$$1.slice();
	  };
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return [domain[i - 1], domain[i]];
	  };
	
	  scale.copy = function() {
	    return threshold$1()
	        .domain(domain)
	        .range(range$$1);
	  };
	
	  return scale;
	}
	
	var durationSecond$1 = 1000;
	var durationMinute$1 = durationSecond$1 * 60;
	var durationHour$1 = durationMinute$1 * 60;
	var durationDay$1 = durationHour$1 * 24;
	var durationWeek$1 = durationDay$1 * 7;
	var durationMonth = durationDay$1 * 30;
	var durationYear = durationDay$1 * 365;
	
	function date$1(t) {
	  return new Date(t);
	}
	
	function number$2(t) {
	  return t instanceof Date ? +t : +new Date(+t);
	}
	
	function calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format) {
	  var scale = continuous(deinterpolateLinear, interpolateNumber),
	      invert = scale.invert,
	      domain = scale.domain;
	
	  var formatMillisecond = format(".%L"),
	      formatSecond = format(":%S"),
	      formatMinute = format("%I:%M"),
	      formatHour = format("%I %p"),
	      formatDay = format("%a %d"),
	      formatWeek = format("%b %d"),
	      formatMonth = format("%B"),
	      formatYear = format("%Y");
	
	  var tickIntervals = [
	    [second$$1,  1,      durationSecond$1],
	    [second$$1,  5,  5 * durationSecond$1],
	    [second$$1, 15, 15 * durationSecond$1],
	    [second$$1, 30, 30 * durationSecond$1],
	    [minute$$1,  1,      durationMinute$1],
	    [minute$$1,  5,  5 * durationMinute$1],
	    [minute$$1, 15, 15 * durationMinute$1],
	    [minute$$1, 30, 30 * durationMinute$1],
	    [  hour$$1,  1,      durationHour$1  ],
	    [  hour$$1,  3,  3 * durationHour$1  ],
	    [  hour$$1,  6,  6 * durationHour$1  ],
	    [  hour$$1, 12, 12 * durationHour$1  ],
	    [   day$$1,  1,      durationDay$1   ],
	    [   day$$1,  2,  2 * durationDay$1   ],
	    [  week,  1,      durationWeek$1  ],
	    [ month$$1,  1,      durationMonth ],
	    [ month$$1,  3,  3 * durationMonth ],
	    [  year$$1,  1,      durationYear  ]
	  ];
	
	  function tickFormat(date) {
	    return (second$$1(date) < date ? formatMillisecond
	        : minute$$1(date) < date ? formatSecond
	        : hour$$1(date) < date ? formatMinute
	        : day$$1(date) < date ? formatHour
	        : month$$1(date) < date ? (week(date) < date ? formatDay : formatWeek)
	        : year$$1(date) < date ? formatMonth
	        : formatYear)(date);
	  }
	
	  function tickInterval(interval, start, stop, step) {
	    if (interval == null) interval = 10;
	
	    // If a desired tick count is specified, pick a reasonable tick interval
	    // based on the extent of the domain and a rough estimate of tick size.
	    // Otherwise, assume interval is already a time interval and use it.
	    if (typeof interval === "number") {
	      var target = Math.abs(stop - start) / interval,
	          i = bisector(function(i) { return i[2]; }).right(tickIntervals, target);
	      if (i === tickIntervals.length) {
	        step = tickStep(start / durationYear, stop / durationYear, interval);
	        interval = year$$1;
	      } else if (i) {
	        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
	        step = i[1];
	        interval = i[0];
	      } else {
	        step = tickStep(start, stop, interval);
	        interval = millisecond$$1;
	      }
	    }
	
	    return step == null ? interval : interval.every(step);
	  }
	
	  scale.invert = function(y) {
	    return new Date(invert(y));
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? domain(map$3.call(_, number$2)) : domain().map(date$1);
	  };
	
	  scale.ticks = function(interval, step) {
	    var d = domain(),
	        t0 = d[0],
	        t1 = d[d.length - 1],
	        r = t1 < t0,
	        t;
	    if (r) t = t0, t0 = t1, t1 = t;
	    t = tickInterval(interval, t0, t1, step);
	    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
	    return r ? t.reverse() : t;
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    return specifier == null ? tickFormat : format(specifier);
	  };
	
	  scale.nice = function(interval, step) {
	    var d = domain();
	    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
	        ? domain(nice(d, interval))
	        : scale;
	  };
	
	  scale.copy = function() {
	    return copy(scale, calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format));
	  };
	
	  return scale;
	}
	
	var time = function() {
	  return calendar(year, month, sunday, day, hour, minute, second, millisecond, exports.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
	};
	
	var utcTime = function() {
	  return calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, exports.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
	};
	
	var colors = function(s) {
	  return s.match(/.{6}/g).map(function(x) {
	    return "#" + x;
	  });
	};
	
	var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
	
	var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");
	
	var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");
	
	var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");
	
	var cubehelix$3 = cubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));
	
	var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.50, 0.8));
	
	var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.50, 0.8));
	
	var rainbow = cubehelix();
	
	var rainbow$1 = function(t) {
	  if (t < 0 || t > 1) t -= Math.floor(t);
	  var ts = Math.abs(t - 0.5);
	  rainbow.h = 360 * t - 100;
	  rainbow.s = 1.5 - 1.5 * ts;
	  rainbow.l = 0.8 - 0.9 * ts;
	  return rainbow + "";
	};
	
	function ramp(range) {
	  var n = range.length;
	  return function(t) {
	    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
	  };
	}
	
	var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
	
	var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
	
	var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
	
	var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
	
	function sequential(interpolator) {
	  var x0 = 0,
	      x1 = 1,
	      clamp = false;
	
	  function scale(x) {
	    var t = (x - x0) / (x1 - x0);
	    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
	  };
	
	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = !!_, scale) : clamp;
	  };
	
	  scale.interpolator = function(_) {
	    return arguments.length ? (interpolator = _, scale) : interpolator;
	  };
	
	  scale.copy = function() {
	    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
	  };
	
	  return linearish(scale);
	}
	
	var xhtml = "http://www.w3.org/1999/xhtml";
	
	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};
	
	var namespace = function(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	};
	
	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}
	
	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}
	
	var creator = function(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	};
	
	var nextId = 0;
	
	function local() {
	  return new Local;
	}
	
	function Local() {
	  this._ = "@" + (++nextId).toString(36);
	}
	
	Local.prototype = local.prototype = {
	  constructor: Local,
	  get: function(node) {
	    var id = this._;
	    while (!(id in node)) if (!(node = node.parentNode)) return;
	    return node[id];
	  },
	  set: function(node, value) {
	    return node[this._] = value;
	  },
	  remove: function(node) {
	    return this._ in node && delete node[this._];
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	var matcher = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};
	
	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector
	        || element.msMatchesSelector
	        || element.mozMatchesSelector
	        || element.oMatchesSelector;
	    matcher = function(selector) {
	      return function() {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}
	
	var matcher$1 = matcher;
	
	var filterEvents = {};
	
	exports.event = null;
	
	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}
	
	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}
	
	function contextListener(listener, index, group) {
	  return function(event1) {
	    var event0 = exports.event; // Events can be reentrant (e.g., focus).
	    exports.event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      exports.event = event0;
	    }
	  };
	}
	
	function parseTypenames$1(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}
	
	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}
	
	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}
	
	var selection_on = function(typename, value, capture) {
	  var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;
	
	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }
	
	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	};
	
	function customEvent(event1, listener, that, args) {
	  var event0 = exports.event;
	  event1.sourceEvent = exports.event;
	  exports.event = event1;
	  try {
	    return listener.apply(that, args);
	  } finally {
	    exports.event = event0;
	  }
	}
	
	var sourceEvent = function() {
	  var current = exports.event, source;
	  while (source = current.sourceEvent) current = source;
	  return current;
	};
	
	var point$5 = function(node, event) {
	  var svg = node.ownerSVGElement || node;
	
	  if (svg.createSVGPoint) {
	    var point = svg.createSVGPoint();
	    point.x = event.clientX, point.y = event.clientY;
	    point = point.matrixTransform(node.getScreenCTM().inverse());
	    return [point.x, point.y];
	  }
	
	  var rect = node.getBoundingClientRect();
	  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	};
	
	var mouse = function(node) {
	  var event = sourceEvent();
	  if (event.changedTouches) event = event.changedTouches[0];
	  return point$5(node, event);
	};
	
	function none$2() {}
	
	var selector = function(selector) {
	  return selector == null ? none$2 : function() {
	    return this.querySelector(selector);
	  };
	};
	
	var selection_select = function(select) {
	  if (typeof select !== "function") select = selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	function empty() {
	  return [];
	}
	
	var selectorAll = function(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	};
	
	var selection_selectAll = function(select) {
	  if (typeof select !== "function") select = selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, parents);
	};
	
	var selection_filter = function(match) {
	  if (typeof match !== "function") match = matcher$1(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	var sparse = function(update) {
	  return new Array(update.length);
	};
	
	var selection_enter = function() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	};
	
	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}
	
	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};
	
	var constant$5 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var keyPrefix = "$"; // Protect against keys like “__proto__”.
	
	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;
	
	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}
	
	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;
	
	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }
	
	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}
	
	var selection_data = function(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }
	
	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;
	
	  if (typeof value !== "function") value = constant$5(value);
	
	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);
	
	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
	
	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }
	
	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	};
	
	var selection_exit = function() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	};
	
	var selection_merge = function(selection) {
	
	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Selection(merges, this._parents);
	};
	
	var selection_order = function() {
	
	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }
	
	  return this;
	};
	
	var selection_sort = function(compare) {
	  if (!compare) compare = ascending$2;
	
	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }
	
	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }
	
	  return new Selection(sortgroups, this._parents).order();
	};
	
	function ascending$2(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}
	
	var selection_call = function() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	};
	
	var selection_nodes = function() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	};
	
	var selection_node = function() {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }
	
	  return null;
	};
	
	var selection_size = function() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	};
	
	var selection_empty = function() {
	  return !this.node();
	};
	
	var selection_each = function(callback) {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }
	
	  return this;
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}
	
	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}
	
	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}
	
	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}
	
	var selection_attr = function(name, value) {
	  var fullname = namespace(name);
	
	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }
	
	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	};
	
	var window = function(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	};
	
	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}
	
	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}
	
	var selection_style = function(name, value, priority) {
	  var node;
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : window(node = this.node())
	          .getComputedStyle(node, null)
	          .getPropertyValue(name);
	};
	
	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}
	
	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}
	
	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}
	
	var selection_property = function(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	};
	
	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}
	
	function classList(node) {
	  return node.classList || new ClassList(node);
	}
	
	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}
	
	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};
	
	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}
	
	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}
	
	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}
	
	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}
	
	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}
	
	var selection_classed = function(name, value) {
	  var names = classArray(name + "");
	
	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }
	
	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	};
	
	function textRemove() {
	  this.textContent = "";
	}
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}
	
	var selection_text = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	};
	
	function htmlRemove() {
	  this.innerHTML = "";
	}
	
	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}
	
	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}
	
	var selection_html = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	};
	
	function raise$1() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}
	
	var selection_raise = function() {
	  return this.each(raise$1);
	};
	
	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}
	
	var selection_lower = function() {
	  return this.each(lower);
	};
	
	var selection_append = function(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	};
	
	function constantNull() {
	  return null;
	}
	
	var selection_insert = function(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	};
	
	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}
	
	var selection_remove = function() {
	  return this.each(remove);
	};
	
	var selection_datum = function(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	};
	
	function dispatchEvent(node, type, params) {
	  var window$$1 = window(node),
	      event = window$$1.CustomEvent;
	
	  if (event) {
	    event = new event(type, params);
	  } else {
	    event = window$$1.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }
	
	  node.dispatchEvent(event);
	}
	
	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}
	
	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}
	
	var selection_dispatch = function(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	};
	
	var root = [null];
	
	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}
	
	function selection() {
	  return new Selection([[document.documentElement]], root);
	}
	
	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};
	
	var select = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	};
	
	var selectAll = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection([selector == null ? [] : selector], root);
	};
	
	var touch = function(node, touches, identifier) {
	  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;
	
	  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	    if ((touch = touches[i]).identifier === identifier) {
	      return point$5(node, touch);
	    }
	  }
	
	  return null;
	};
	
	var touches = function(node, touches) {
	  if (touches == null) touches = sourceEvent().touches;
	
	  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
	    points[i] = point$5(node, touches[i]);
	  }
	
	  return points;
	};
	
	var emptyOn = dispatch("start", "end", "interrupt");
	var emptyTween = [];
	
	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var RUNNING = 4;
	var ENDING = 5;
	var ENDED = 6;
	
	var schedule = function(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	};
	
	function init(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	  return schedule;
	}
	
	function set$3(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	  return schedule;
	}
	
	function get$1(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	  return schedule;
	}
	
	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;
	
	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = timer(schedule, 0, self.time);
	
	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    self.timer.restart(start, self.delay, self.time);
	
	    // If the elapsed delay is less than our first sleep, start immediately.
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	  }
	
	  function start(elapsed) {
	    var i, j, n, o;
	
	    // If the state is not SCHEDULED, then we previously errored on start.
	    if (self.state !== SCHEDULED) return stop();
	
	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;
	
	      // While this element already has a starting transition during this frame,
	      // defer starting an interrupting transition until that transition has a
	      // chance to tick (and possibly end); see d3/d3-transition#54!
	      if (o.state === STARTED) return timeout$1(start);
	
	      // Interrupt the active transition, if any.
	      // Dispatch the interrupt event.
	      if (o.state === RUNNING) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }
	
	      // Cancel any pre-empted transitions. No interrupt event is dispatched
	      // because the cancelled transitions never started. Note that this also
	      // removes this transition from the pending list!
	      else if (+i < id) {
	        o.state = ENDED;
	        o.timer.stop();
	        delete schedules[i];
	      }
	    }
	
	    // Defer the first tick to end of the current frame; see d3/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    timeout$1(function() {
	      if (self.state === STARTED) {
	        self.state = RUNNING;
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });
	
	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;
	
	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }
	
	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;
	
	    while (++i < n) {
	      tween[i].call(null, t);
	    }
	
	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      stop();
	    }
	  }
	
	  function stop() {
	    self.state = ENDED;
	    self.timer.stop();
	    delete schedules[id];
	    for (var i in schedules) return; // eslint-disable-line no-unused-vars
	    delete node.__transition;
	  }
	}
	
	var interrupt = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;
	
	  if (!schedules) return;
	
	  name = name == null ? null : name + "";
	
	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state > STARTING && schedule.state < ENDING;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }
	
	  if (empty) delete node.__transition;
	};
	
	var selection_interrupt = function(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	};
	
	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set$3(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set$3(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	var transition_tween = function(name, value) {
	  var id = this._id;
	
	  name += "";
	
	  if (arguments.length < 2) {
	    var tween = get$1(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }
	
	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	};
	
	function tweenValue(transition, name, value) {
	  var id = transition._id;
	
	  transition.each(function() {
	    var schedule = set$3(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });
	
	  return function(node) {
	    return get$1(node, id).value[name];
	  };
	}
	
	var interpolate$1 = function(a, b) {
	  var c;
	  return (typeof b === "number" ? interpolateNumber
	      : b instanceof color ? interpolateRgb
	      : (c = color(b)) ? (b = c, interpolateRgb)
	      : interpolateString)(a, b);
	};
	
	function attrRemove$1(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS$1(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant$1(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrConstantNS$1(fullname, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrFunction$1(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttribute(name);
	    value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function attrFunctionNS$1(fullname, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_attr = function(name, value) {
	  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate$1;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname)
	      : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value));
	};
	
	function attrTweenNS(fullname, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttributeNS(fullname.space, fullname.local, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	function attrTween(name, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttribute(name, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_attrTween = function(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	};
	
	function delayFunction(id, value) {
	  return function() {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}
	
	function delayConstant(id, value) {
	  return value = +value, function() {
	    init(this, id).delay = value;
	  };
	}
	
	var transition_delay = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get$1(this.node(), id).delay;
	};
	
	function durationFunction(id, value) {
	  return function() {
	    set$3(this, id).duration = +value.apply(this, arguments);
	  };
	}
	
	function durationConstant(id, value) {
	  return value = +value, function() {
	    set$3(this, id).duration = value;
	  };
	}
	
	var transition_duration = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get$1(this.node(), id).duration;
	};
	
	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set$3(this, id).ease = value;
	  };
	}
	
	var transition_ease = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get$1(this.node(), id).ease;
	};
	
	var transition_filter = function(match) {
	  if (typeof match !== "function") match = matcher$1(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, this._name, this._id);
	};
	
	var transition_merge = function(transition) {
	  if (transition._id !== this._id) throw new Error;
	
	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Transition(merges, this._parents, this._name, this._id);
	};
	
	function start$1(name) {
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}
	
	function onFunction(id, name, listener) {
	  var on0, on1, sit = start$1(name) ? init : set$3;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;
	
	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
	
	    schedule.on = on1;
	  };
	}
	
	var transition_on = function(name, listener) {
	  var id = this._id;
	
	  return arguments.length < 2
	      ? get$1(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	};
	
	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}
	
	var transition_remove = function() {
	  return this.on("end.remove", removeFunction(this._id));
	};
	
	var transition_select = function(select$$1) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select$$1 !== "function") select$$1 = selector(select$$1);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select$$1.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, name, id);
	};
	
	var transition_selectAll = function(select$$1) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select$$1 !== "function") select$$1 = selectorAll(select$$1);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select$$1.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, parents, name, id);
	};
	
	var Selection$1 = selection.prototype.constructor;
	
	var transition_selection = function() {
	  return new Selection$1(this._groups, this._parents);
	};
	
	function styleRemove$1(name, interpolate$$1) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function styleRemoveEnd(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant$1(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = window(this).getComputedStyle(this, null).getPropertyValue(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function styleFunction$1(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = value(this);
	    if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_style = function(name, value, priority) {
	  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate$1;
	  return value == null ? this
	          .styleTween(name, styleRemove$1(name, i))
	          .on("end.style." + name, styleRemoveEnd(name))
	      : this.styleTween(name, typeof value === "function"
	          ? styleFunction$1(name, i, tweenValue(this, "style." + name, value))
	          : styleConstant$1(name, i, value), priority);
	};
	
	function styleTween(name, value, priority) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.style.setProperty(name, i(t), priority);
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_styleTween = function(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	};
	
	function textConstant$1(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction$1(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}
	
	var transition_text = function(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction$1(tweenValue(this, "text", value))
	      : textConstant$1(value == null ? "" : value + ""));
	};
	
	var transition_transition = function() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get$1(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id1);
	};
	
	var id = 0;
	
	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}
	
	function transition(name) {
	  return selection().transition(name);
	}
	
	function newId() {
	  return ++id;
	}
	
	var selection_prototype = selection.prototype;
	
	Transition.prototype = transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease
	};
	
	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: cubicInOut
	};
	
	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      return defaultTiming.time = now(), defaultTiming;
	    }
	  }
	  return timing;
	}
	
	var selection_transition = function(name) {
	  var id,
	      timing;
	
	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	  }
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id);
	};
	
	selection.prototype.interrupt = selection_interrupt;
	selection.prototype.transition = selection_transition;
	
	var root$1 = [null];
	
	var active = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      i;
	
	  if (schedules) {
	    name = name == null ? null : name + "";
	    for (i in schedules) {
	      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
	        return new Transition([[node]], root$1, name, +i);
	      }
	    }
	  }
	
	  return null;
	};
	
	var slice$4 = Array.prototype.slice;
	
	var identity$5 = function(x) {
	  return x;
	};
	
	var top = 1;
	var right = 2;
	var bottom = 3;
	var left = 4;
	var epsilon$2 = 1e-6;
	
	function translateX(scale0, scale1, d) {
	  var x = scale0(d);
	  return "translate(" + (isFinite(x) ? x : scale1(d)) + ",0)";
	}
	
	function translateY(scale0, scale1, d) {
	  var y = scale0(d);
	  return "translate(0," + (isFinite(y) ? y : scale1(d)) + ")";
	}
	
	function center(scale) {
	  var offset = scale.bandwidth() / 2;
	  if (scale.round()) offset = Math.round(offset);
	  return function(d) {
	    return scale(d) + offset;
	  };
	}
	
	function entering() {
	  return !this.__axis;
	}
	
	function axis(orient, scale) {
	  var tickArguments = [],
	      tickValues = null,
	      tickFormat = null,
	      tickSizeInner = 6,
	      tickSizeOuter = 6,
	      tickPadding = 3;
	
	  function axis(context) {
	    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
	        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$5) : tickFormat,
	        spacing = Math.max(tickSizeInner, 0) + tickPadding,
	        transform = orient === top || orient === bottom ? translateX : translateY,
	        range = scale.range(),
	        range0 = range[0] + 0.5,
	        range1 = range[range.length - 1] + 0.5,
	        position = (scale.bandwidth ? center : identity$5)(scale.copy()),
	        selection = context.selection ? context.selection() : context,
	        path = selection.selectAll(".domain").data([null]),
	        tick = selection.selectAll(".tick").data(values, scale).order(),
	        tickExit = tick.exit(),
	        tickEnter = tick.enter().append("g").attr("class", "tick"),
	        line = tick.select("line"),
	        text = tick.select("text"),
	        k = orient === top || orient === left ? -1 : 1,
	        x, y = orient === left || orient === right ? (x = "x", "y") : (x = "y", "x");
	
	    path = path.merge(path.enter().insert("path", ".tick")
	        .attr("class", "domain")
	        .attr("stroke", "#000"));
	
	    tick = tick.merge(tickEnter);
	
	    line = line.merge(tickEnter.append("line")
	        .attr("stroke", "#000")
	        .attr(x + "2", k * tickSizeInner)
	        .attr(y + "1", 0.5)
	        .attr(y + "2", 0.5));
	
	    text = text.merge(tickEnter.append("text")
	        .attr("fill", "#000")
	        .attr(x, k * spacing)
	        .attr(y, 0.5)
	        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
	
	    if (context !== selection) {
	      path = path.transition(context);
	      tick = tick.transition(context);
	      line = line.transition(context);
	      text = text.transition(context);
	
	      tickExit = tickExit.transition(context)
	          .attr("opacity", epsilon$2)
	          .attr("transform", function(d) { return transform(position, this.parentNode.__axis || position, d); });
	
	      tickEnter
	          .attr("opacity", epsilon$2)
	          .attr("transform", function(d) { return transform(this.parentNode.__axis || position, position, d); });
	    }
	
	    tickExit.remove();
	
	    path
	        .attr("d", orient === left || orient == right
	            ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter
	            : "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter);
	
	    tick
	        .attr("opacity", 1)
	        .attr("transform", function(d) { return transform(position, position, d); });
	
	    line
	        .attr(x + "2", k * tickSizeInner);
	
	    text
	        .attr(x, k * spacing)
	        .text(format);
	
	    selection.filter(entering)
	        .attr("fill", "none")
	        .attr("font-size", 10)
	        .attr("font-family", "sans-serif")
	        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
	
	    selection
	        .each(function() { this.__axis = position; });
	  }
	
	  axis.scale = function(_) {
	    return arguments.length ? (scale = _, axis) : scale;
	  };
	
	  axis.ticks = function() {
	    return tickArguments = slice$4.call(arguments), axis;
	  };
	
	  axis.tickArguments = function(_) {
	    return arguments.length ? (tickArguments = _ == null ? [] : slice$4.call(_), axis) : tickArguments.slice();
	  };
	
	  axis.tickValues = function(_) {
	    return arguments.length ? (tickValues = _ == null ? null : slice$4.call(_), axis) : tickValues && tickValues.slice();
	  };
	
	  axis.tickFormat = function(_) {
	    return arguments.length ? (tickFormat = _, axis) : tickFormat;
	  };
	
	  axis.tickSize = function(_) {
	    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	  };
	
	  axis.tickSizeInner = function(_) {
	    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	  };
	
	  axis.tickSizeOuter = function(_) {
	    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	  };
	
	  axis.tickPadding = function(_) {
	    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	  };
	
	  return axis;
	}
	
	function axisTop(scale) {
	  return axis(top, scale);
	}
	
	function axisRight(scale) {
	  return axis(right, scale);
	}
	
	function axisBottom(scale) {
	  return axis(bottom, scale);
	}
	
	function axisLeft(scale) {
	  return axis(left, scale);
	}
	
	function defaultSeparation(a, b) {
	  return a.parent === b.parent ? 1 : 2;
	}
	
	function meanX(children) {
	  return children.reduce(meanXReduce, 0) / children.length;
	}
	
	function meanXReduce(x, c) {
	  return x + c.x;
	}
	
	function maxY(children) {
	  return 1 + children.reduce(maxYReduce, 0);
	}
	
	function maxYReduce(y, c) {
	  return Math.max(y, c.y);
	}
	
	function leafLeft(node) {
	  var children;
	  while (children = node.children) node = children[0];
	  return node;
	}
	
	function leafRight(node) {
	  var children;
	  while (children = node.children) node = children[children.length - 1];
	  return node;
	}
	
	var cluster = function() {
	  var separation = defaultSeparation,
	      dx = 1,
	      dy = 1,
	      nodeSize = false;
	
	  function cluster(root) {
	    var previousNode,
	        x = 0;
	
	    // First walk, computing the initial x & y values.
	    root.eachAfter(function(node) {
	      var children = node.children;
	      if (children) {
	        node.x = meanX(children);
	        node.y = maxY(children);
	      } else {
	        node.x = previousNode ? x += separation(node, previousNode) : 0;
	        node.y = 0;
	        previousNode = node;
	      }
	    });
	
	    var left = leafLeft(root),
	        right = leafRight(root),
	        x0 = left.x - separation(left, right) / 2,
	        x1 = right.x + separation(right, left) / 2;
	
	    // Second walk, normalizing x & y to the desired size.
	    return root.eachAfter(nodeSize ? function(node) {
	      node.x = (node.x - root.x) * dx;
	      node.y = (root.y - node.y) * dy;
	    } : function(node) {
	      node.x = (node.x - x0) / (x1 - x0) * dx;
	      node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
	    });
	  }
	
	  cluster.separation = function(x) {
	    return arguments.length ? (separation = x, cluster) : separation;
	  };
	
	  cluster.size = function(x) {
	    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? null : [dx, dy]);
	  };
	
	  cluster.nodeSize = function(x) {
	    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? [dx, dy] : null);
	  };
	
	  return cluster;
	};
	
	var node_each = function(callback) {
	  var node = this, current, next = [node], children, i, n;
	  do {
	    current = next.reverse(), next = [];
	    while (node = current.pop()) {
	      callback(node), children = node.children;
	      if (children) for (i = 0, n = children.length; i < n; ++i) {
	        next.push(children[i]);
	      }
	    }
	  } while (next.length);
	  return this;
	};
	
	var node_eachBefore = function(callback) {
	  var node = this, nodes = [node], children, i;
	  while (node = nodes.pop()) {
	    callback(node), children = node.children;
	    if (children) for (i = children.length - 1; i >= 0; --i) {
	      nodes.push(children[i]);
	    }
	  }
	  return this;
	};
	
	var node_eachAfter = function(callback) {
	  var node = this, nodes = [node], next = [], children, i, n;
	  while (node = nodes.pop()) {
	    next.push(node), children = node.children;
	    if (children) for (i = 0, n = children.length; i < n; ++i) {
	      nodes.push(children[i]);
	    }
	  }
	  while (node = next.pop()) {
	    callback(node);
	  }
	  return this;
	};
	
	var node_sum = function(value) {
	  return this.eachAfter(function(node) {
	    var sum = +value(node.data) || 0,
	        children = node.children,
	        i = children && children.length;
	    while (--i >= 0) sum += children[i].value;
	    node.value = sum;
	  });
	};
	
	var node_sort = function(compare) {
	  return this.eachBefore(function(node) {
	    if (node.children) {
	      node.children.sort(compare);
	    }
	  });
	};
	
	var node_path = function(end) {
	  var start = this,
	      ancestor = leastCommonAncestor(start, end),
	      nodes = [start];
	  while (start !== ancestor) {
	    start = start.parent;
	    nodes.push(start);
	  }
	  var k = nodes.length;
	  while (end !== ancestor) {
	    nodes.splice(k, 0, end);
	    end = end.parent;
	  }
	  return nodes;
	};
	
	function leastCommonAncestor(a, b) {
	  if (a === b) return a;
	  var aNodes = a.ancestors(),
	      bNodes = b.ancestors(),
	      c = null;
	  a = aNodes.pop();
	  b = bNodes.pop();
	  while (a === b) {
	    c = a;
	    a = aNodes.pop();
	    b = bNodes.pop();
	  }
	  return c;
	}
	
	var node_ancestors = function() {
	  var node = this, nodes = [node];
	  while (node = node.parent) {
	    nodes.push(node);
	  }
	  return nodes;
	};
	
	var node_descendants = function() {
	  var nodes = [];
	  this.each(function(node) {
	    nodes.push(node);
	  });
	  return nodes;
	};
	
	var node_leaves = function() {
	  var leaves = [];
	  this.eachBefore(function(node) {
	    if (!node.children) {
	      leaves.push(node);
	    }
	  });
	  return leaves;
	};
	
	var node_links = function() {
	  var root = this, links = [];
	  root.each(function(node) {
	    if (node !== root) { // Don’t include the root’s parent, if any.
	      links.push({source: node.parent, target: node});
	    }
	  });
	  return links;
	};
	
	function hierarchy(data, children) {
	  var root = new Node(data),
	      valued = +data.value && (root.value = data.value),
	      node,
	      nodes = [root],
	      child,
	      childs,
	      i,
	      n;
	
	  if (children == null) children = defaultChildren;
	
	  while (node = nodes.pop()) {
	    if (valued) node.value = +node.data.value;
	    if ((childs = children(node.data)) && (n = childs.length)) {
	      node.children = new Array(n);
	      for (i = n - 1; i >= 0; --i) {
	        nodes.push(child = node.children[i] = new Node(childs[i]));
	        child.parent = node;
	        child.depth = node.depth + 1;
	      }
	    }
	  }
	
	  return root.eachBefore(computeHeight);
	}
	
	function node_copy() {
	  return hierarchy(this).eachBefore(copyData);
	}
	
	function defaultChildren(d) {
	  return d.children;
	}
	
	function copyData(node) {
	  node.data = node.data.data;
	}
	
	function computeHeight(node) {
	  var height = 0;
	  do node.height = height;
	  while ((node = node.parent) && (node.height < ++height));
	}
	
	function Node(data) {
	  this.data = data;
	  this.depth =
	  this.height = 0;
	  this.parent = null;
	}
	
	Node.prototype = hierarchy.prototype = {
	  constructor: Node,
	  each: node_each,
	  eachAfter: node_eachAfter,
	  eachBefore: node_eachBefore,
	  sum: node_sum,
	  sort: node_sort,
	  path: node_path,
	  ancestors: node_ancestors,
	  descendants: node_descendants,
	  leaves: node_leaves,
	  links: node_links,
	  copy: node_copy
	};
	
	function Node$2(value) {
	  this._ = value;
	  this.next = null;
	}
	
	var shuffle$1 = function(array) {
	  var i,
	      n = (array = array.slice()).length,
	      head = null,
	      node = head;
	
	  while (n) {
	    var next = new Node$2(array[n - 1]);
	    if (node) node = node.next = next;
	    else node = head = next;
	    array[i] = array[--n];
	  }
	
	  return {
	    head: head,
	    tail: node
	  };
	};
	
	var enclose = function(circles) {
	  return encloseN(shuffle$1(circles), []);
	};
	
	function encloses(a, b) {
	  var dx = b.x - a.x,
	      dy = b.y - a.y,
	      dr = a.r - b.r;
	  return dr * dr + 1e-6 > dx * dx + dy * dy;
	}
	
	// Returns the smallest circle that contains circles L and intersects circles B.
	function encloseN(L, B) {
	  var circle,
	      l0 = null,
	      l1 = L.head,
	      l2,
	      p1;
	
	  switch (B.length) {
	    case 1: circle = enclose1(B[0]); break;
	    case 2: circle = enclose2(B[0], B[1]); break;
	    case 3: circle = enclose3(B[0], B[1], B[2]); break;
	  }
	
	  while (l1) {
	    p1 = l1._, l2 = l1.next;
	    if (!circle || !encloses(circle, p1)) {
	
	      // Temporarily truncate L before l1.
	      if (l0) L.tail = l0, l0.next = null;
	      else L.head = L.tail = null;
	
	      B.push(p1);
	      circle = encloseN(L, B); // Note: reorders L!
	      B.pop();
	
	      // Move l1 to the front of L and reconnect the truncated list L.
	      if (L.head) l1.next = L.head, L.head = l1;
	      else l1.next = null, L.head = L.tail = l1;
	      l0 = L.tail, l0.next = l2;
	
	    } else {
	      l0 = l1;
	    }
	    l1 = l2;
	  }
	
	  L.tail = l0;
	  return circle;
	}
	
	function enclose1(a) {
	  return {
	    x: a.x,
	    y: a.y,
	    r: a.r
	  };
	}
	
	function enclose2(a, b) {
	  var x1 = a.x, y1 = a.y, r1 = a.r,
	      x2 = b.x, y2 = b.y, r2 = b.r,
	      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
	      l = Math.sqrt(x21 * x21 + y21 * y21);
	  return {
	    x: (x1 + x2 + x21 / l * r21) / 2,
	    y: (y1 + y2 + y21 / l * r21) / 2,
	    r: (l + r1 + r2) / 2
	  };
	}
	
	function enclose3(a, b, c) {
	  var x1 = a.x, y1 = a.y, r1 = a.r,
	      x2 = b.x, y2 = b.y, r2 = b.r,
	      x3 = c.x, y3 = c.y, r3 = c.r,
	      a2 = 2 * (x1 - x2),
	      b2 = 2 * (y1 - y2),
	      c2 = 2 * (r2 - r1),
	      d2 = x1 * x1 + y1 * y1 - r1 * r1 - x2 * x2 - y2 * y2 + r2 * r2,
	      a3 = 2 * (x1 - x3),
	      b3 = 2 * (y1 - y3),
	      c3 = 2 * (r3 - r1),
	      d3 = x1 * x1 + y1 * y1 - r1 * r1 - x3 * x3 - y3 * y3 + r3 * r3,
	      ab = a3 * b2 - a2 * b3,
	      xa = (b2 * d3 - b3 * d2) / ab - x1,
	      xb = (b3 * c2 - b2 * c3) / ab,
	      ya = (a3 * d2 - a2 * d3) / ab - y1,
	      yb = (a2 * c3 - a3 * c2) / ab,
	      A = xb * xb + yb * yb - 1,
	      B = 2 * (xa * xb + ya * yb + r1),
	      C = xa * xa + ya * ya - r1 * r1,
	      r = (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A);
	  return {
	    x: xa + xb * r + x1,
	    y: ya + yb * r + y1,
	    r: r
	  };
	}
	
	function place(a, b, c) {
	  var ax = a.x,
	      ay = a.y,
	      da = b.r + c.r,
	      db = a.r + c.r,
	      dx = b.x - ax,
	      dy = b.y - ay,
	      dc = dx * dx + dy * dy;
	  if (dc) {
	    var x = 0.5 + ((db *= db) - (da *= da)) / (2 * dc),
	        y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
	    c.x = ax + x * dx + y * dy;
	    c.y = ay + x * dy - y * dx;
	  } else {
	    c.x = ax + db;
	    c.y = ay;
	  }
	}
	
	function intersects(a, b) {
	  var dx = b.x - a.x,
	      dy = b.y - a.y,
	      dr = a.r + b.r;
	  return dr * dr > dx * dx + dy * dy;
	}
	
	function distance2(circle, x, y) {
	  var dx = circle.x - x,
	      dy = circle.y - y;
	  return dx * dx + dy * dy;
	}
	
	function Node$1(circle) {
	  this._ = circle;
	  this.next = null;
	  this.previous = null;
	}
	
	function packEnclose(circles) {
	  if (!(n = circles.length)) return 0;
	
	  var a, b, c, n;
	
	  // Place the first circle.
	  a = circles[0], a.x = 0, a.y = 0;
	  if (!(n > 1)) return a.r;
	
	  // Place the second circle.
	  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
	  if (!(n > 2)) return a.r + b.r;
	
	  // Place the third circle.
	  place(b, a, c = circles[2]);
	
	  // Initialize the weighted centroid.
	  var aa = a.r * a.r,
	      ba = b.r * b.r,
	      ca = c.r * c.r,
	      oa = aa + ba + ca,
	      ox = aa * a.x + ba * b.x + ca * c.x,
	      oy = aa * a.y + ba * b.y + ca * c.y,
	      cx, cy, i, j, k, sj, sk;
	
	  // Initialize the front-chain using the first three circles a, b and c.
	  a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
	  a.next = c.previous = b;
	  b.next = a.previous = c;
	  c.next = b.previous = a;
	
	  // Attempt to place each remaining circle…
	  pack: for (i = 3; i < n; ++i) {
	    place(a._, b._, c = circles[i]), c = new Node$1(c);
	
	    // If there are only three elements in the front-chain…
	    if ((k = a.previous) === (j = b.next)) {
	      // If the new circle intersects the third circle,
	      // rotate the front chain to try the next position.
	      if (intersects(j._, c._)) {
	        a = b, b = j, --i;
	        continue pack;
	      }
	    }
	
	    // Find the closest intersecting circle on the front-chain, if any.
	    else {
	      sj = j._.r, sk = k._.r;
	      do {
	        if (sj <= sk) {
	          if (intersects(j._, c._)) {
	            b = j, a.next = b, b.previous = a, --i;
	            continue pack;
	          }
	          j = j.next, sj += j._.r;
	        } else {
	          if (intersects(k._, c._)) {
	            a = k, a.next = b, b.previous = a, --i;
	            continue pack;
	          }
	          k = k.previous, sk += k._.r;
	        }
	      } while (j !== k.next);
	    }
	
	    // Success! Insert the new circle c between a and b.
	    c.previous = a, c.next = b, a.next = b.previous = b = c;
	
	    // Update the weighted centroid.
	    oa += ca = c._.r * c._.r;
	    ox += ca * c._.x;
	    oy += ca * c._.y;
	
	    // Compute the new closest circle a to centroid.
	    aa = distance2(a._, cx = ox / oa, cy = oy / oa);
	    while ((c = c.next) !== b) {
	      if ((ca = distance2(c._, cx, cy)) < aa) {
	        a = c, aa = ca;
	      }
	    }
	    b = a.next;
	  }
	
	  // Compute the enclosing circle of the front chain.
	  a = [b._], c = b; while ((c = c.next) !== b) a.push(c._); c = enclose(a);
	
	  // Translate the circles to put the enclosing circle around the origin.
	  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;
	
	  return c.r;
	}
	
	var siblings = function(circles) {
	  packEnclose(circles);
	  return circles;
	};
	
	function optional(f) {
	  return f == null ? null : required(f);
	}
	
	function required(f) {
	  if (typeof f !== "function") throw new Error;
	  return f;
	}
	
	function constantZero() {
	  return 0;
	}
	
	var constant$6 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function defaultRadius(d) {
	  return Math.sqrt(d.value);
	}
	
	var index = function() {
	  var radius = null,
	      dx = 1,
	      dy = 1,
	      padding = constantZero;
	
	  function pack(root) {
	    root.x = dx / 2, root.y = dy / 2;
	    if (radius) {
	      root.eachBefore(radiusLeaf(radius))
	          .eachAfter(packChildren(padding, 0.5))
	          .eachBefore(translateChild(1));
	    } else {
	      root.eachBefore(radiusLeaf(defaultRadius))
	          .eachAfter(packChildren(constantZero, 1))
	          .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
	          .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
	    }
	    return root;
	  }
	
	  pack.radius = function(x) {
	    return arguments.length ? (radius = optional(x), pack) : radius;
	  };
	
	  pack.size = function(x) {
	    return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
	  };
	
	  pack.padding = function(x) {
	    return arguments.length ? (padding = typeof x === "function" ? x : constant$6(+x), pack) : padding;
	  };
	
	  return pack;
	};
	
	function radiusLeaf(radius) {
	  return function(node) {
	    if (!node.children) {
	      node.r = Math.max(0, +radius(node) || 0);
	    }
	  };
	}
	
	function packChildren(padding, k) {
	  return function(node) {
	    if (children = node.children) {
	      var children,
	          i,
	          n = children.length,
	          r = padding(node) * k || 0,
	          e;
	
	      if (r) for (i = 0; i < n; ++i) children[i].r += r;
	      e = packEnclose(children);
	      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
	      node.r = e + r;
	    }
	  };
	}
	
	function translateChild(k) {
	  return function(node) {
	    var parent = node.parent;
	    node.r *= k;
	    if (parent) {
	      node.x = parent.x + k * node.x;
	      node.y = parent.y + k * node.y;
	    }
	  };
	}
	
	var roundNode = function(node) {
	  node.x0 = Math.round(node.x0);
	  node.y0 = Math.round(node.y0);
	  node.x1 = Math.round(node.x1);
	  node.y1 = Math.round(node.y1);
	};
	
	var treemapDice = function(parent, x0, y0, x1, y1) {
	  var nodes = parent.children,
	      node,
	      i = -1,
	      n = nodes.length,
	      k = parent.value && (x1 - x0) / parent.value;
	
	  while (++i < n) {
	    node = nodes[i], node.y0 = y0, node.y1 = y1;
	    node.x0 = x0, node.x1 = x0 += node.value * k;
	  }
	};
	
	var partition = function() {
	  var dx = 1,
	      dy = 1,
	      padding = 0,
	      round = false;
	
	  function partition(root) {
	    var n = root.height + 1;
	    root.x0 =
	    root.y0 = padding;
	    root.x1 = dx;
	    root.y1 = dy / n;
	    root.eachBefore(positionNode(dy, n));
	    if (round) root.eachBefore(roundNode);
	    return root;
	  }
	
	  function positionNode(dy, n) {
	    return function(node) {
	      if (node.children) {
	        treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
	      }
	      var x0 = node.x0,
	          y0 = node.y0,
	          x1 = node.x1 - padding,
	          y1 = node.y1 - padding;
	      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	      node.x0 = x0;
	      node.y0 = y0;
	      node.x1 = x1;
	      node.y1 = y1;
	    };
	  }
	
	  partition.round = function(x) {
	    return arguments.length ? (round = !!x, partition) : round;
	  };
	
	  partition.size = function(x) {
	    return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
	  };
	
	  partition.padding = function(x) {
	    return arguments.length ? (padding = +x, partition) : padding;
	  };
	
	  return partition;
	};
	
	var keyPrefix$1 = "$";
	var preroot = {depth: -1};
	var ambiguous = {};
	
	function defaultId(d) {
	  return d.id;
	}
	
	function defaultParentId(d) {
	  return d.parentId;
	}
	
	var stratify = function() {
	  var id = defaultId,
	      parentId = defaultParentId;
	
	  function stratify(data) {
	    var d,
	        i,
	        n = data.length,
	        root,
	        parent,
	        node,
	        nodes = new Array(n),
	        nodeId,
	        nodeKey,
	        nodeByKey = {};
	
	    for (i = 0; i < n; ++i) {
	      d = data[i], node = nodes[i] = new Node(d);
	      if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
	        nodeKey = keyPrefix$1 + (node.id = nodeId);
	        nodeByKey[nodeKey] = nodeKey in nodeByKey ? ambiguous : node;
	      }
	    }
	
	    for (i = 0; i < n; ++i) {
	      node = nodes[i], nodeId = parentId(data[i], i, data);
	      if (nodeId == null || !(nodeId += "")) {
	        if (root) throw new Error("multiple roots");
	        root = node;
	      } else {
	        parent = nodeByKey[keyPrefix$1 + nodeId];
	        if (!parent) throw new Error("missing: " + nodeId);
	        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
	        if (parent.children) parent.children.push(node);
	        else parent.children = [node];
	        node.parent = parent;
	      }
	    }
	
	    if (!root) throw new Error("no root");
	    root.parent = preroot;
	    root.eachBefore(function(node) { node.depth = node.parent.depth + 1; --n; }).eachBefore(computeHeight);
	    root.parent = null;
	    if (n > 0) throw new Error("cycle");
	
	    return root;
	  }
	
	  stratify.id = function(x) {
	    return arguments.length ? (id = required(x), stratify) : id;
	  };
	
	  stratify.parentId = function(x) {
	    return arguments.length ? (parentId = required(x), stratify) : parentId;
	  };
	
	  return stratify;
	};
	
	function defaultSeparation$1(a, b) {
	  return a.parent === b.parent ? 1 : 2;
	}
	
	// function radialSeparation(a, b) {
	//   return (a.parent === b.parent ? 1 : 2) / a.depth;
	// }
	
	// This function is used to traverse the left contour of a subtree (or
	// subforest). It returns the successor of v on this contour. This successor is
	// either given by the leftmost child of v or by the thread of v. The function
	// returns null if and only if v is on the highest level of its subtree.
	function nextLeft(v) {
	  var children = v.children;
	  return children ? children[0] : v.t;
	}
	
	// This function works analogously to nextLeft.
	function nextRight(v) {
	  var children = v.children;
	  return children ? children[children.length - 1] : v.t;
	}
	
	// Shifts the current subtree rooted at w+. This is done by increasing
	// prelim(w+) and mod(w+) by shift.
	function moveSubtree(wm, wp, shift) {
	  var change = shift / (wp.i - wm.i);
	  wp.c -= change;
	  wp.s += shift;
	  wm.c += change;
	  wp.z += shift;
	  wp.m += shift;
	}
	
	// All other shifts, applied to the smaller subtrees between w- and w+, are
	// performed by this function. To prepare the shifts, we have to adjust
	// change(w+), shift(w+), and change(w-).
	function executeShifts(v) {
	  var shift = 0,
	      change = 0,
	      children = v.children,
	      i = children.length,
	      w;
	  while (--i >= 0) {
	    w = children[i];
	    w.z += shift;
	    w.m += shift;
	    shift += w.s + (change += w.c);
	  }
	}
	
	// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
	// returns the specified (default) ancestor.
	function nextAncestor(vim, v, ancestor) {
	  return vim.a.parent === v.parent ? vim.a : ancestor;
	}
	
	function TreeNode(node, i) {
	  this._ = node;
	  this.parent = null;
	  this.children = null;
	  this.A = null; // default ancestor
	  this.a = this; // ancestor
	  this.z = 0; // prelim
	  this.m = 0; // mod
	  this.c = 0; // change
	  this.s = 0; // shift
	  this.t = null; // thread
	  this.i = i; // number
	}
	
	TreeNode.prototype = Object.create(Node.prototype);
	
	function treeRoot(root) {
	  var tree = new TreeNode(root, 0),
	      node,
	      nodes = [tree],
	      child,
	      children,
	      i,
	      n;
	
	  while (node = nodes.pop()) {
	    if (children = node._.children) {
	      node.children = new Array(n = children.length);
	      for (i = n - 1; i >= 0; --i) {
	        nodes.push(child = node.children[i] = new TreeNode(children[i], i));
	        child.parent = node;
	      }
	    }
	  }
	
	  (tree.parent = new TreeNode(null, 0)).children = [tree];
	  return tree;
	}
	
	// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
	var tree = function() {
	  var separation = defaultSeparation$1,
	      dx = 1,
	      dy = 1,
	      nodeSize = null;
	
	  function tree(root) {
	    var t = treeRoot(root);
	
	    // Compute the layout using Buchheim et al.’s algorithm.
	    t.eachAfter(firstWalk), t.parent.m = -t.z;
	    t.eachBefore(secondWalk);
	
	    // If a fixed node size is specified, scale x and y.
	    if (nodeSize) root.eachBefore(sizeNode);
	
	    // If a fixed tree size is specified, scale x and y based on the extent.
	    // Compute the left-most, right-most, and depth-most nodes for extents.
	    else {
	      var left = root,
	          right = root,
	          bottom = root;
	      root.eachBefore(function(node) {
	        if (node.x < left.x) left = node;
	        if (node.x > right.x) right = node;
	        if (node.depth > bottom.depth) bottom = node;
	      });
	      var s = left === right ? 1 : separation(left, right) / 2,
	          tx = s - left.x,
	          kx = dx / (right.x + s + tx),
	          ky = dy / (bottom.depth || 1);
	      root.eachBefore(function(node) {
	        node.x = (node.x + tx) * kx;
	        node.y = node.depth * ky;
	      });
	    }
	
	    return root;
	  }
	
	  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
	  // applied recursively to the children of v, as well as the function
	  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
	  // node v is placed to the midpoint of its outermost children.
	  function firstWalk(v) {
	    var children = v.children,
	        siblings = v.parent.children,
	        w = v.i ? siblings[v.i - 1] : null;
	    if (children) {
	      executeShifts(v);
	      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
	      if (w) {
	        v.z = w.z + separation(v._, w._);
	        v.m = v.z - midpoint;
	      } else {
	        v.z = midpoint;
	      }
	    } else if (w) {
	      v.z = w.z + separation(v._, w._);
	    }
	    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
	  }
	
	  // Computes all real x-coordinates by summing up the modifiers recursively.
	  function secondWalk(v) {
	    v._.x = v.z + v.parent.m;
	    v.m += v.parent.m;
	  }
	
	  // The core of the algorithm. Here, a new subtree is combined with the
	  // previous subtrees. Threads are used to traverse the inside and outside
	  // contours of the left and right subtree up to the highest common level. The
	  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
	  // superscript o means outside and i means inside, the subscript - means left
	  // subtree and + means right subtree. For summing up the modifiers along the
	  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
	  // nodes of the inside contours conflict, we compute the left one of the
	  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
	  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
	  // Finally, we add a new thread (if necessary).
	  function apportion(v, w, ancestor) {
	    if (w) {
	      var vip = v,
	          vop = v,
	          vim = w,
	          vom = vip.parent.children[0],
	          sip = vip.m,
	          sop = vop.m,
	          sim = vim.m,
	          som = vom.m,
	          shift;
	      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
	        vom = nextLeft(vom);
	        vop = nextRight(vop);
	        vop.a = v;
	        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
	        if (shift > 0) {
	          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
	          sip += shift;
	          sop += shift;
	        }
	        sim += vim.m;
	        sip += vip.m;
	        som += vom.m;
	        sop += vop.m;
	      }
	      if (vim && !nextRight(vop)) {
	        vop.t = vim;
	        vop.m += sim - sop;
	      }
	      if (vip && !nextLeft(vom)) {
	        vom.t = vip;
	        vom.m += sip - som;
	        ancestor = v;
	      }
	    }
	    return ancestor;
	  }
	
	  function sizeNode(node) {
	    node.x *= dx;
	    node.y = node.depth * dy;
	  }
	
	  tree.separation = function(x) {
	    return arguments.length ? (separation = x, tree) : separation;
	  };
	
	  tree.size = function(x) {
	    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : (nodeSize ? null : [dx, dy]);
	  };
	
	  tree.nodeSize = function(x) {
	    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : (nodeSize ? [dx, dy] : null);
	  };
	
	  return tree;
	};
	
	var treemapSlice = function(parent, x0, y0, x1, y1) {
	  var nodes = parent.children,
	      node,
	      i = -1,
	      n = nodes.length,
	      k = parent.value && (y1 - y0) / parent.value;
	
	  while (++i < n) {
	    node = nodes[i], node.x0 = x0, node.x1 = x1;
	    node.y0 = y0, node.y1 = y0 += node.value * k;
	  }
	};
	
	var phi = (1 + Math.sqrt(5)) / 2;
	
	function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
	  var rows = [],
	      nodes = parent.children,
	      row,
	      nodeValue,
	      i0 = 0,
	      i1 = 0,
	      n = nodes.length,
	      dx, dy,
	      value = parent.value,
	      sumValue,
	      minValue,
	      maxValue,
	      newRatio,
	      minRatio,
	      alpha,
	      beta;
	
	  while (i0 < n) {
	    dx = x1 - x0, dy = y1 - y0;
	
	    // Find the next non-empty node.
	    do sumValue = nodes[i1++].value; while (!sumValue && i1 < n);
	    minValue = maxValue = sumValue;
	    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
	    beta = sumValue * sumValue * alpha;
	    minRatio = Math.max(maxValue / beta, beta / minValue);
	
	    // Keep adding nodes while the aspect ratio maintains or improves.
	    for (; i1 < n; ++i1) {
	      sumValue += nodeValue = nodes[i1].value;
	      if (nodeValue < minValue) minValue = nodeValue;
	      if (nodeValue > maxValue) maxValue = nodeValue;
	      beta = sumValue * sumValue * alpha;
	      newRatio = Math.max(maxValue / beta, beta / minValue);
	      if (newRatio > minRatio) { sumValue -= nodeValue; break; }
	      minRatio = newRatio;
	    }
	
	    // Position and record the row orientation.
	    rows.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});
	    if (row.dice) treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
	    else treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
	    value -= sumValue, i0 = i1;
	  }
	
	  return rows;
	}
	
	var squarify = (function custom(ratio) {
	
	  function squarify(parent, x0, y0, x1, y1) {
	    squarifyRatio(ratio, parent, x0, y0, x1, y1);
	  }
	
	  squarify.ratio = function(x) {
	    return custom((x = +x) > 1 ? x : 1);
	  };
	
	  return squarify;
	})(phi);
	
	var index$1 = function() {
	  var tile = squarify,
	      round = false,
	      dx = 1,
	      dy = 1,
	      paddingStack = [0],
	      paddingInner = constantZero,
	      paddingTop = constantZero,
	      paddingRight = constantZero,
	      paddingBottom = constantZero,
	      paddingLeft = constantZero;
	
	  function treemap(root) {
	    root.x0 =
	    root.y0 = 0;
	    root.x1 = dx;
	    root.y1 = dy;
	    root.eachBefore(positionNode);
	    paddingStack = [0];
	    if (round) root.eachBefore(roundNode);
	    return root;
	  }
	
	  function positionNode(node) {
	    var p = paddingStack[node.depth],
	        x0 = node.x0 + p,
	        y0 = node.y0 + p,
	        x1 = node.x1 - p,
	        y1 = node.y1 - p;
	    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	    node.x0 = x0;
	    node.y0 = y0;
	    node.x1 = x1;
	    node.y1 = y1;
	    if (node.children) {
	      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
	      x0 += paddingLeft(node) - p;
	      y0 += paddingTop(node) - p;
	      x1 -= paddingRight(node) - p;
	      y1 -= paddingBottom(node) - p;
	      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	      tile(node, x0, y0, x1, y1);
	    }
	  }
	
	  treemap.round = function(x) {
	    return arguments.length ? (round = !!x, treemap) : round;
	  };
	
	  treemap.size = function(x) {
	    return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
	  };
	
	  treemap.tile = function(x) {
	    return arguments.length ? (tile = required(x), treemap) : tile;
	  };
	
	  treemap.padding = function(x) {
	    return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
	  };
	
	  treemap.paddingInner = function(x) {
	    return arguments.length ? (paddingInner = typeof x === "function" ? x : constant$6(+x), treemap) : paddingInner;
	  };
	
	  treemap.paddingOuter = function(x) {
	    return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
	  };
	
	  treemap.paddingTop = function(x) {
	    return arguments.length ? (paddingTop = typeof x === "function" ? x : constant$6(+x), treemap) : paddingTop;
	  };
	
	  treemap.paddingRight = function(x) {
	    return arguments.length ? (paddingRight = typeof x === "function" ? x : constant$6(+x), treemap) : paddingRight;
	  };
	
	  treemap.paddingBottom = function(x) {
	    return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant$6(+x), treemap) : paddingBottom;
	  };
	
	  treemap.paddingLeft = function(x) {
	    return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant$6(+x), treemap) : paddingLeft;
	  };
	
	  return treemap;
	};
	
	var binary = function(parent, x0, y0, x1, y1) {
	  var nodes = parent.children,
	      i, n = nodes.length,
	      sum, sums = new Array(n + 1);
	
	  for (sums[0] = sum = i = 0; i < n; ++i) {
	    sums[i + 1] = sum += nodes[i].value;
	  }
	
	  partition(0, n, parent.value, x0, y0, x1, y1);
	
	  function partition(i, j, value, x0, y0, x1, y1) {
	    if (i >= j - 1) {
	      var node = nodes[i];
	      node.x0 = x0, node.y0 = y0;
	      node.x1 = x1, node.y1 = y1;
	      return;
	    }
	
	    var valueOffset = sums[i],
	        valueTarget = (value / 2) + valueOffset,
	        k = i + 1,
	        hi = j - 1;
	
	    while (k < hi) {
	      var mid = k + hi >>> 1;
	      if (sums[mid] < valueTarget) k = mid + 1;
	      else hi = mid;
	    }
	
	    var valueLeft = sums[k] - valueOffset,
	        valueRight = value - valueLeft;
	
	    if ((y1 - y0) > (x1 - x0)) {
	      var yk = (y0 * valueRight + y1 * valueLeft) / value;
	      partition(i, k, valueLeft, x0, y0, x1, yk);
	      partition(k, j, valueRight, x0, yk, x1, y1);
	    } else {
	      var xk = (x0 * valueRight + x1 * valueLeft) / value;
	      partition(i, k, valueLeft, x0, y0, xk, y1);
	      partition(k, j, valueRight, xk, y0, x1, y1);
	    }
	  }
	};
	
	var sliceDice = function(parent, x0, y0, x1, y1) {
	  (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
	};
	
	var resquarify = (function custom(ratio) {
	
	  function resquarify(parent, x0, y0, x1, y1) {
	    if ((rows = parent._squarify) && (rows.ratio === ratio)) {
	      var rows,
	          row,
	          nodes,
	          i,
	          j = -1,
	          n,
	          m = rows.length,
	          value = parent.value;
	
	      while (++j < m) {
	        row = rows[j], nodes = row.children;
	        for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
	        if (row.dice) treemapDice(row, x0, y0, x1, y0 += (y1 - y0) * row.value / value);
	        else treemapSlice(row, x0, y0, x0 += (x1 - x0) * row.value / value, y1);
	        value -= row.value;
	      }
	    } else {
	      parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
	      rows.ratio = ratio;
	    }
	  }
	
	  resquarify.ratio = function(x) {
	    return custom((x = +x) > 1 ? x : 1);
	  };
	
	  return resquarify;
	})(phi);
	
	var center$1 = function(x, y) {
	  var nodes;
	
	  if (x == null) x = 0;
	  if (y == null) y = 0;
	
	  function force() {
	    var i,
	        n = nodes.length,
	        node,
	        sx = 0,
	        sy = 0;
	
	    for (i = 0; i < n; ++i) {
	      node = nodes[i], sx += node.x, sy += node.y;
	    }
	
	    for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
	      node = nodes[i], node.x -= sx, node.y -= sy;
	    }
	  }
	
	  force.initialize = function(_) {
	    nodes = _;
	  };
	
	  force.x = function(_) {
	    return arguments.length ? (x = +_, force) : x;
	  };
	
	  force.y = function(_) {
	    return arguments.length ? (y = +_, force) : y;
	  };
	
	  return force;
	};
	
	var constant$7 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var jiggle = function() {
	  return (Math.random() - 0.5) * 1e-6;
	};
	
	function x$1(d) {
	  return d.x + d.vx;
	}
	
	function y$1(d) {
	  return d.y + d.vy;
	}
	
	var collide = function(radius) {
	  var nodes,
	      radii,
	      strength = 1,
	      iterations = 1;
	
	  if (typeof radius !== "function") radius = constant$7(radius == null ? 1 : +radius);
	
	  function force() {
	    var i, n = nodes.length,
	        tree,
	        node,
	        xi,
	        yi,
	        ri,
	        ri2;
	
	    for (var k = 0; k < iterations; ++k) {
	      tree = quadtree(nodes, x$1, y$1).visitAfter(prepare);
	      for (i = 0; i < n; ++i) {
	        node = nodes[i];
	        ri = radii[node.index], ri2 = ri * ri;
	        xi = node.x + node.vx;
	        yi = node.y + node.vy;
	        tree.visit(apply);
	      }
	    }
	
	    function apply(quad, x0, y0, x1, y1) {
	      var data = quad.data, rj = quad.r, r = ri + rj;
	      if (data) {
	        if (data.index > node.index) {
	          var x = xi - data.x - data.vx,
	              y = yi - data.y - data.vy,
	              l = x * x + y * y;
	          if (l < r * r) {
	            if (x === 0) x = jiggle(), l += x * x;
	            if (y === 0) y = jiggle(), l += y * y;
	            l = (r - (l = Math.sqrt(l))) / l * strength;
	            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
	            node.vy += (y *= l) * r;
	            data.vx -= x * (r = 1 - r);
	            data.vy -= y * r;
	          }
	        }
	        return;
	      }
	      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
	    }
	  }
	
	  function prepare(quad) {
	    if (quad.data) return quad.r = radii[quad.data.index];
	    for (var i = quad.r = 0; i < 4; ++i) {
	      if (quad[i] && quad[i].r > quad.r) {
	        quad.r = quad[i].r;
	      }
	    }
	  }
	
	  function initialize() {
	    if (!nodes) return;
	    var i, n = nodes.length, node;
	    radii = new Array(n);
	    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
	  }
	
	  force.initialize = function(_) {
	    nodes = _;
	    initialize();
	  };
	
	  force.iterations = function(_) {
	    return arguments.length ? (iterations = +_, force) : iterations;
	  };
	
	  force.strength = function(_) {
	    return arguments.length ? (strength = +_, force) : strength;
	  };
	
	  force.radius = function(_) {
	    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : radius;
	  };
	
	  return force;
	};
	
	function index$2(d) {
	  return d.index;
	}
	
	function find(nodeById, nodeId) {
	  var node = nodeById.get(nodeId);
	  if (!node) throw new Error("missing: " + nodeId);
	  return node;
	}
	
	var link = function(links) {
	  var id = index$2,
	      strength = defaultStrength,
	      strengths,
	      distance = constant$7(30),
	      distances,
	      nodes,
	      count,
	      bias,
	      iterations = 1;
	
	  if (links == null) links = [];
	
	  function defaultStrength(link) {
	    return 1 / Math.min(count[link.source.index], count[link.target.index]);
	  }
	
	  function force(alpha) {
	    for (var k = 0, n = links.length; k < iterations; ++k) {
	      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
	        link = links[i], source = link.source, target = link.target;
	        x = target.x + target.vx - source.x - source.vx || jiggle();
	        y = target.y + target.vy - source.y - source.vy || jiggle();
	        l = Math.sqrt(x * x + y * y);
	        l = (l - distances[i]) / l * alpha * strengths[i];
	        x *= l, y *= l;
	        target.vx -= x * (b = bias[i]);
	        target.vy -= y * b;
	        source.vx += x * (b = 1 - b);
	        source.vy += y * b;
	      }
	    }
	  }
	
	  function initialize() {
	    if (!nodes) return;
	
	    var i,
	        n = nodes.length,
	        m = links.length,
	        nodeById = map$1(nodes, id),
	        link;
	
	    for (i = 0, count = new Array(n); i < m; ++i) {
	      link = links[i], link.index = i;
	      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
	      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
	      count[link.source.index] = (count[link.source.index] || 0) + 1;
	      count[link.target.index] = (count[link.target.index] || 0) + 1;
	    }
	
	    for (i = 0, bias = new Array(m); i < m; ++i) {
	      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
	    }
	
	    strengths = new Array(m), initializeStrength();
	    distances = new Array(m), initializeDistance();
	  }
	
	  function initializeStrength() {
	    if (!nodes) return;
	
	    for (var i = 0, n = links.length; i < n; ++i) {
	      strengths[i] = +strength(links[i], i, links);
	    }
	  }
	
	  function initializeDistance() {
	    if (!nodes) return;
	
	    for (var i = 0, n = links.length; i < n; ++i) {
	      distances[i] = +distance(links[i], i, links);
	    }
	  }
	
	  force.initialize = function(_) {
	    nodes = _;
	    initialize();
	  };
	
	  force.links = function(_) {
	    return arguments.length ? (links = _, initialize(), force) : links;
	  };
	
	  force.id = function(_) {
	    return arguments.length ? (id = _, force) : id;
	  };
	
	  force.iterations = function(_) {
	    return arguments.length ? (iterations = +_, force) : iterations;
	  };
	
	  force.strength = function(_) {
	    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initializeStrength(), force) : strength;
	  };
	
	  force.distance = function(_) {
	    return arguments.length ? (distance = typeof _ === "function" ? _ : constant$7(+_), initializeDistance(), force) : distance;
	  };
	
	  return force;
	};
	
	function x$2(d) {
	  return d.x;
	}
	
	function y$2(d) {
	  return d.y;
	}
	
	var initialRadius = 10;
	var initialAngle = Math.PI * (3 - Math.sqrt(5));
	
	var simulation = function(nodes) {
	  var simulation,
	      alpha = 1,
	      alphaMin = 0.001,
	      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
	      alphaTarget = 0,
	      velocityDecay = 0.6,
	      forces = map$1(),
	      stepper = timer(step),
	      event = dispatch("tick", "end");
	
	  if (nodes == null) nodes = [];
	
	  function step() {
	    tick();
	    event.call("tick", simulation);
	    if (alpha < alphaMin) {
	      stepper.stop();
	      event.call("end", simulation);
	    }
	  }
	
	  function tick() {
	    var i, n = nodes.length, node;
	
	    alpha += (alphaTarget - alpha) * alphaDecay;
	
	    forces.each(function(force) {
	      force(alpha);
	    });
	
	    for (i = 0; i < n; ++i) {
	      node = nodes[i];
	      if (node.fx == null) node.x += node.vx *= velocityDecay;
	      else node.x = node.fx, node.vx = 0;
	      if (node.fy == null) node.y += node.vy *= velocityDecay;
	      else node.y = node.fy, node.vy = 0;
	    }
	  }
	
	  function initializeNodes() {
	    for (var i = 0, n = nodes.length, node; i < n; ++i) {
	      node = nodes[i], node.index = i;
	      if (isNaN(node.x) || isNaN(node.y)) {
	        var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
	        node.x = radius * Math.cos(angle);
	        node.y = radius * Math.sin(angle);
	      }
	      if (isNaN(node.vx) || isNaN(node.vy)) {
	        node.vx = node.vy = 0;
	      }
	    }
	  }
	
	  function initializeForce(force) {
	    if (force.initialize) force.initialize(nodes);
	    return force;
	  }
	
	  initializeNodes();
	
	  return simulation = {
	    tick: tick,
	
	    restart: function() {
	      return stepper.restart(step), simulation;
	    },
	
	    stop: function() {
	      return stepper.stop(), simulation;
	    },
	
	    nodes: function(_) {
	      return arguments.length ? (nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : nodes;
	    },
	
	    alpha: function(_) {
	      return arguments.length ? (alpha = +_, simulation) : alpha;
	    },
	
	    alphaMin: function(_) {
	      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
	    },
	
	    alphaDecay: function(_) {
	      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
	    },
	
	    alphaTarget: function(_) {
	      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
	    },
	
	    velocityDecay: function(_) {
	      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
	    },
	
	    force: function(name, _) {
	      return arguments.length > 1 ? ((_ == null ? forces.remove(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
	    },
	
	    find: function(x, y, radius) {
	      var i = 0,
	          n = nodes.length,
	          dx,
	          dy,
	          d2,
	          node,
	          closest;
	
	      if (radius == null) radius = Infinity;
	      else radius *= radius;
	
	      for (i = 0; i < n; ++i) {
	        node = nodes[i];
	        dx = x - node.x;
	        dy = y - node.y;
	        d2 = dx * dx + dy * dy;
	        if (d2 < radius) closest = node, radius = d2;
	      }
	
	      return closest;
	    },
	
	    on: function(name, _) {
	      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
	    }
	  };
	};
	
	var manyBody = function() {
	  var nodes,
	      node,
	      alpha,
	      strength = constant$7(-30),
	      strengths,
	      distanceMin2 = 1,
	      distanceMax2 = Infinity,
	      theta2 = 0.81;
	
	  function force(_) {
	    var i, n = nodes.length, tree = quadtree(nodes, x$2, y$2).visitAfter(accumulate);
	    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
	  }
	
	  function initialize() {
	    if (!nodes) return;
	    var i, n = nodes.length, node;
	    strengths = new Array(n);
	    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
	  }
	
	  function accumulate(quad) {
	    var strength = 0, q, c, x$$1, y$$1, i;
	
	    // For internal nodes, accumulate forces from child quadrants.
	    if (quad.length) {
	      for (x$$1 = y$$1 = i = 0; i < 4; ++i) {
	        if ((q = quad[i]) && (c = q.value)) {
	          strength += c, x$$1 += c * q.x, y$$1 += c * q.y;
	        }
	      }
	      quad.x = x$$1 / strength;
	      quad.y = y$$1 / strength;
	    }
	
	    // For leaf nodes, accumulate forces from coincident quadrants.
	    else {
	      q = quad;
	      q.x = q.data.x;
	      q.y = q.data.y;
	      do strength += strengths[q.data.index];
	      while (q = q.next);
	    }
	
	    quad.value = strength;
	  }
	
	  function apply(quad, x1, _, x2) {
	    if (!quad.value) return true;
	
	    var x$$1 = quad.x - node.x,
	        y$$1 = quad.y - node.y,
	        w = x2 - x1,
	        l = x$$1 * x$$1 + y$$1 * y$$1;
	
	    // Apply the Barnes-Hut approximation if possible.
	    // Limit forces for very close nodes; randomize direction if coincident.
	    if (w * w / theta2 < l) {
	      if (l < distanceMax2) {
	        if (x$$1 === 0) x$$1 = jiggle(), l += x$$1 * x$$1;
	        if (y$$1 === 0) y$$1 = jiggle(), l += y$$1 * y$$1;
	        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
	        node.vx += x$$1 * quad.value * alpha / l;
	        node.vy += y$$1 * quad.value * alpha / l;
	      }
	      return true;
	    }
	
	    // Otherwise, process points directly.
	    else if (quad.length || l >= distanceMax2) return;
	
	    // Limit forces for very close nodes; randomize direction if coincident.
	    if (quad.data !== node || quad.next) {
	      if (x$$1 === 0) x$$1 = jiggle(), l += x$$1 * x$$1;
	      if (y$$1 === 0) y$$1 = jiggle(), l += y$$1 * y$$1;
	      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
	    }
	
	    do if (quad.data !== node) {
	      w = strengths[quad.data.index] * alpha / l;
	      node.vx += x$$1 * w;
	      node.vy += y$$1 * w;
	    } while (quad = quad.next);
	  }
	
	  force.initialize = function(_) {
	    nodes = _;
	    initialize();
	  };
	
	  force.strength = function(_) {
	    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : strength;
	  };
	
	  force.distanceMin = function(_) {
	    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
	  };
	
	  force.distanceMax = function(_) {
	    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
	  };
	
	  force.theta = function(_) {
	    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
	  };
	
	  return force;
	};
	
	var x$3 = function(x) {
	  var strength = constant$7(0.1),
	      nodes,
	      strengths,
	      xz;
	
	  if (typeof x !== "function") x = constant$7(x == null ? 0 : +x);
	
	  function force(alpha) {
	    for (var i = 0, n = nodes.length, node; i < n; ++i) {
	      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
	    }
	  }
	
	  function initialize() {
	    if (!nodes) return;
	    var i, n = nodes.length;
	    strengths = new Array(n);
	    xz = new Array(n);
	    for (i = 0; i < n; ++i) {
	      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
	    }
	  }
	
	  force.initialize = function(_) {
	    nodes = _;
	    initialize();
	  };
	
	  force.strength = function(_) {
	    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : strength;
	  };
	
	  force.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : x;
	  };
	
	  return force;
	};
	
	var y$3 = function(y) {
	  var strength = constant$7(0.1),
	      nodes,
	      strengths,
	      yz;
	
	  if (typeof y !== "function") y = constant$7(y == null ? 0 : +y);
	
	  function force(alpha) {
	    for (var i = 0, n = nodes.length, node; i < n; ++i) {
	      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
	    }
	  }
	
	  function initialize() {
	    if (!nodes) return;
	    var i, n = nodes.length;
	    strengths = new Array(n);
	    yz = new Array(n);
	    for (i = 0; i < n; ++i) {
	      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
	    }
	  }
	
	  force.initialize = function(_) {
	    nodes = _;
	    initialize();
	  };
	
	  force.strength = function(_) {
	    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : strength;
	  };
	
	  force.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : y;
	  };
	
	  return force;
	};
	
	function nopropagation() {
	  exports.event.stopImmediatePropagation();
	}
	
	var noevent = function() {
	  exports.event.preventDefault();
	  exports.event.stopImmediatePropagation();
	};
	
	var dragDisable = function(view) {
	  var root = view.document.documentElement,
	      selection$$1 = select(view).on("dragstart.drag", noevent, true);
	  if ("onselectstart" in root) {
	    selection$$1.on("selectstart.drag", noevent, true);
	  } else {
	    root.__noselect = root.style.MozUserSelect;
	    root.style.MozUserSelect = "none";
	  }
	};
	
	function yesdrag(view, noclick) {
	  var root = view.document.documentElement,
	      selection$$1 = select(view).on("dragstart.drag", null);
	  if (noclick) {
	    selection$$1.on("click.drag", noevent, true);
	    setTimeout(function() { selection$$1.on("click.drag", null); }, 0);
	  }
	  if ("onselectstart" in root) {
	    selection$$1.on("selectstart.drag", null);
	  } else {
	    root.style.MozUserSelect = root.__noselect;
	    delete root.__noselect;
	  }
	}
	
	var constant$8 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
	  this.target = target;
	  this.type = type;
	  this.subject = subject;
	  this.identifier = id;
	  this.active = active;
	  this.x = x;
	  this.y = y;
	  this.dx = dx;
	  this.dy = dy;
	  this._ = dispatch;
	}
	
	DragEvent.prototype.on = function() {
	  var value = this._.on.apply(this._, arguments);
	  return value === this._ ? this : value;
	};
	
	// Ignore right-click, since that should open the context menu.
	function defaultFilter() {
	  return !exports.event.button;
	}
	
	function defaultContainer() {
	  return this.parentNode;
	}
	
	function defaultSubject(d) {
	  return d == null ? {x: exports.event.x, y: exports.event.y} : d;
	}
	
	var drag = function() {
	  var filter = defaultFilter,
	      container = defaultContainer,
	      subject = defaultSubject,
	      gestures = {},
	      listeners = dispatch("start", "drag", "end"),
	      active = 0,
	      mousemoving,
	      touchending;
	
	  function drag(selection$$1) {
	    selection$$1
	        .on("mousedown.drag", mousedowned)
	        .on("touchstart.drag", touchstarted)
	        .on("touchmove.drag", touchmoved)
	        .on("touchend.drag touchcancel.drag", touchended)
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	  }
	
	  function mousedowned() {
	    if (touchending || !filter.apply(this, arguments)) return;
	    var gesture = beforestart("mouse", container.apply(this, arguments), mouse, this, arguments);
	    if (!gesture) return;
	    select(exports.event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
	    dragDisable(exports.event.view);
	    nopropagation();
	    mousemoving = false;
	    gesture("start");
	  }
	
	  function mousemoved() {
	    noevent();
	    mousemoving = true;
	    gestures.mouse("drag");
	  }
	
	  function mouseupped() {
	    select(exports.event.view).on("mousemove.drag mouseup.drag", null);
	    yesdrag(exports.event.view, mousemoving);
	    noevent();
	    gestures.mouse("end");
	  }
	
	  function touchstarted() {
	    if (!filter.apply(this, arguments)) return;
	    var touches$$1 = exports.event.changedTouches,
	        c = container.apply(this, arguments),
	        n = touches$$1.length, i, gesture;
	
	    for (i = 0; i < n; ++i) {
	      if (gesture = beforestart(touches$$1[i].identifier, c, touch, this, arguments)) {
	        nopropagation();
	        gesture("start");
	      }
	    }
	  }
	
	  function touchmoved() {
	    var touches$$1 = exports.event.changedTouches,
	        n = touches$$1.length, i, gesture;
	
	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches$$1[i].identifier]) {
	        noevent();
	        gesture("drag");
	      }
	    }
	  }
	
	  function touchended() {
	    var touches$$1 = exports.event.changedTouches,
	        n = touches$$1.length, i, gesture;
	
	    if (touchending) clearTimeout(touchending);
	    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches$$1[i].identifier]) {
	        nopropagation();
	        gesture("end");
	      }
	    }
	  }
	
	  function beforestart(id, container, point, that, args) {
	    var p = point(container, id), s, dx, dy,
	        sublisteners = listeners.copy();
	
	    if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
	      if ((exports.event.subject = s = subject.apply(that, args)) == null) return false;
	      dx = s.x - p[0] || 0;
	      dy = s.y - p[1] || 0;
	      return true;
	    })) return;
	
	    return function gesture(type) {
	      var p0 = p, n;
	      switch (type) {
	        case "start": gestures[id] = gesture, n = active++; break;
	        case "end": delete gestures[id], --active; // nobreak
	        case "drag": p = point(container, id), n = active; break;
	      }
	      customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
	    };
	  }
	
	  drag.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$8(!!_), drag) : filter;
	  };
	
	  drag.container = function(_) {
	    return arguments.length ? (container = typeof _ === "function" ? _ : constant$8(_), drag) : container;
	  };
	
	  drag.subject = function(_) {
	    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$8(_), drag) : subject;
	  };
	
	  drag.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? drag : value;
	  };
	
	  return drag;
	};
	
	var constant$9 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function x$4(d) {
	  return d[0];
	}
	
	function y$4(d) {
	  return d[1];
	}
	
	function RedBlackTree() {
	  this._ = null; // root node
	}
	
	function RedBlackNode(node) {
	  node.U = // parent node
	  node.C = // color - true for red, false for black
	  node.L = // left node
	  node.R = // right node
	  node.P = // previous node
	  node.N = null; // next node
	}
	
	RedBlackTree.prototype = {
	  constructor: RedBlackTree,
	
	  insert: function(after, node) {
	    var parent, grandpa, uncle;
	
	    if (after) {
	      node.P = after;
	      node.N = after.N;
	      if (after.N) after.N.P = node;
	      after.N = node;
	      if (after.R) {
	        after = after.R;
	        while (after.L) after = after.L;
	        after.L = node;
	      } else {
	        after.R = node;
	      }
	      parent = after;
	    } else if (this._) {
	      after = RedBlackFirst(this._);
	      node.P = null;
	      node.N = after;
	      after.P = after.L = node;
	      parent = after;
	    } else {
	      node.P = node.N = null;
	      this._ = node;
	      parent = null;
	    }
	    node.L = node.R = null;
	    node.U = parent;
	    node.C = true;
	
	    after = node;
	    while (parent && parent.C) {
	      grandpa = parent.U;
	      if (parent === grandpa.L) {
	        uncle = grandpa.R;
	        if (uncle && uncle.C) {
	          parent.C = uncle.C = false;
	          grandpa.C = true;
	          after = grandpa;
	        } else {
	          if (after === parent.R) {
	            RedBlackRotateLeft(this, parent);
	            after = parent;
	            parent = after.U;
	          }
	          parent.C = false;
	          grandpa.C = true;
	          RedBlackRotateRight(this, grandpa);
	        }
	      } else {
	        uncle = grandpa.L;
	        if (uncle && uncle.C) {
	          parent.C = uncle.C = false;
	          grandpa.C = true;
	          after = grandpa;
	        } else {
	          if (after === parent.L) {
	            RedBlackRotateRight(this, parent);
	            after = parent;
	            parent = after.U;
	          }
	          parent.C = false;
	          grandpa.C = true;
	          RedBlackRotateLeft(this, grandpa);
	        }
	      }
	      parent = after.U;
	    }
	    this._.C = false;
	  },
	
	  remove: function(node) {
	    if (node.N) node.N.P = node.P;
	    if (node.P) node.P.N = node.N;
	    node.N = node.P = null;
	
	    var parent = node.U,
	        sibling,
	        left = node.L,
	        right = node.R,
	        next,
	        red;
	
	    if (!left) next = right;
	    else if (!right) next = left;
	    else next = RedBlackFirst(right);
	
	    if (parent) {
	      if (parent.L === node) parent.L = next;
	      else parent.R = next;
	    } else {
	      this._ = next;
	    }
	
	    if (left && right) {
	      red = next.C;
	      next.C = node.C;
	      next.L = left;
	      left.U = next;
	      if (next !== right) {
	        parent = next.U;
	        next.U = node.U;
	        node = next.R;
	        parent.L = node;
	        next.R = right;
	        right.U = next;
	      } else {
	        next.U = parent;
	        parent = next;
	        node = next.R;
	      }
	    } else {
	      red = node.C;
	      node = next;
	    }
	
	    if (node) node.U = parent;
	    if (red) return;
	    if (node && node.C) { node.C = false; return; }
	
	    do {
	      if (node === this._) break;
	      if (node === parent.L) {
	        sibling = parent.R;
	        if (sibling.C) {
	          sibling.C = false;
	          parent.C = true;
	          RedBlackRotateLeft(this, parent);
	          sibling = parent.R;
	        }
	        if ((sibling.L && sibling.L.C)
	            || (sibling.R && sibling.R.C)) {
	          if (!sibling.R || !sibling.R.C) {
	            sibling.L.C = false;
	            sibling.C = true;
	            RedBlackRotateRight(this, sibling);
	            sibling = parent.R;
	          }
	          sibling.C = parent.C;
	          parent.C = sibling.R.C = false;
	          RedBlackRotateLeft(this, parent);
	          node = this._;
	          break;
	        }
	      } else {
	        sibling = parent.L;
	        if (sibling.C) {
	          sibling.C = false;
	          parent.C = true;
	          RedBlackRotateRight(this, parent);
	          sibling = parent.L;
	        }
	        if ((sibling.L && sibling.L.C)
	          || (sibling.R && sibling.R.C)) {
	          if (!sibling.L || !sibling.L.C) {
	            sibling.R.C = false;
	            sibling.C = true;
	            RedBlackRotateLeft(this, sibling);
	            sibling = parent.L;
	          }
	          sibling.C = parent.C;
	          parent.C = sibling.L.C = false;
	          RedBlackRotateRight(this, parent);
	          node = this._;
	          break;
	        }
	      }
	      sibling.C = true;
	      node = parent;
	      parent = parent.U;
	    } while (!node.C);
	
	    if (node) node.C = false;
	  }
	};
	
	function RedBlackRotateLeft(tree, node) {
	  var p = node,
	      q = node.R,
	      parent = p.U;
	
	  if (parent) {
	    if (parent.L === p) parent.L = q;
	    else parent.R = q;
	  } else {
	    tree._ = q;
	  }
	
	  q.U = parent;
	  p.U = q;
	  p.R = q.L;
	  if (p.R) p.R.U = p;
	  q.L = p;
	}
	
	function RedBlackRotateRight(tree, node) {
	  var p = node,
	      q = node.L,
	      parent = p.U;
	
	  if (parent) {
	    if (parent.L === p) parent.L = q;
	    else parent.R = q;
	  } else {
	    tree._ = q;
	  }
	
	  q.U = parent;
	  p.U = q;
	  p.L = q.R;
	  if (p.L) p.L.U = p;
	  q.R = p;
	}
	
	function RedBlackFirst(node) {
	  while (node.L) node = node.L;
	  return node;
	}
	
	function createEdge(left, right, v0, v1) {
	  var edge = [null, null],
	      index = edges.push(edge) - 1;
	  edge.left = left;
	  edge.right = right;
	  if (v0) setEdgeEnd(edge, left, right, v0);
	  if (v1) setEdgeEnd(edge, right, left, v1);
	  cells[left.index].halfedges.push(index);
	  cells[right.index].halfedges.push(index);
	  return edge;
	}
	
	function createBorderEdge(left, v0, v1) {
	  var edge = [v0, v1];
	  edge.left = left;
	  return edge;
	}
	
	function setEdgeEnd(edge, left, right, vertex) {
	  if (!edge[0] && !edge[1]) {
	    edge[0] = vertex;
	    edge.left = left;
	    edge.right = right;
	  } else if (edge.left === right) {
	    edge[1] = vertex;
	  } else {
	    edge[0] = vertex;
	  }
	}
	
	// Liang–Barsky line clipping.
	function clipEdge(edge, x0, y0, x1, y1) {
	  var a = edge[0],
	      b = edge[1],
	      ax = a[0],
	      ay = a[1],
	      bx = b[0],
	      by = b[1],
	      t0 = 0,
	      t1 = 1,
	      dx = bx - ax,
	      dy = by - ay,
	      r;
	
	  r = x0 - ax;
	  if (!dx && r > 0) return;
	  r /= dx;
	  if (dx < 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  } else if (dx > 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  }
	
	  r = x1 - ax;
	  if (!dx && r < 0) return;
	  r /= dx;
	  if (dx < 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  } else if (dx > 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  }
	
	  r = y0 - ay;
	  if (!dy && r > 0) return;
	  r /= dy;
	  if (dy < 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  } else if (dy > 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  }
	
	  r = y1 - ay;
	  if (!dy && r < 0) return;
	  r /= dy;
	  if (dy < 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  } else if (dy > 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  }
	
	  if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?
	
	  if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
	  if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
	  return true;
	}
	
	function connectEdge(edge, x0, y0, x1, y1) {
	  var v1 = edge[1];
	  if (v1) return true;
	
	  var v0 = edge[0],
	      left = edge.left,
	      right = edge.right,
	      lx = left[0],
	      ly = left[1],
	      rx = right[0],
	      ry = right[1],
	      fx = (lx + rx) / 2,
	      fy = (ly + ry) / 2,
	      fm,
	      fb;
	
	  if (ry === ly) {
	    if (fx < x0 || fx >= x1) return;
	    if (lx > rx) {
	      if (!v0) v0 = [fx, y0];
	      else if (v0[1] >= y1) return;
	      v1 = [fx, y1];
	    } else {
	      if (!v0) v0 = [fx, y1];
	      else if (v0[1] < y0) return;
	      v1 = [fx, y0];
	    }
	  } else {
	    fm = (lx - rx) / (ry - ly);
	    fb = fy - fm * fx;
	    if (fm < -1 || fm > 1) {
	      if (lx > rx) {
	        if (!v0) v0 = [(y0 - fb) / fm, y0];
	        else if (v0[1] >= y1) return;
	        v1 = [(y1 - fb) / fm, y1];
	      } else {
	        if (!v0) v0 = [(y1 - fb) / fm, y1];
	        else if (v0[1] < y0) return;
	        v1 = [(y0 - fb) / fm, y0];
	      }
	    } else {
	      if (ly < ry) {
	        if (!v0) v0 = [x0, fm * x0 + fb];
	        else if (v0[0] >= x1) return;
	        v1 = [x1, fm * x1 + fb];
	      } else {
	        if (!v0) v0 = [x1, fm * x1 + fb];
	        else if (v0[0] < x0) return;
	        v1 = [x0, fm * x0 + fb];
	      }
	    }
	  }
	
	  edge[0] = v0;
	  edge[1] = v1;
	  return true;
	}
	
	function clipEdges(x0, y0, x1, y1) {
	  var i = edges.length,
	      edge;
	
	  while (i--) {
	    if (!connectEdge(edge = edges[i], x0, y0, x1, y1)
	        || !clipEdge(edge, x0, y0, x1, y1)
	        || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon$3
	            || Math.abs(edge[0][1] - edge[1][1]) > epsilon$3)) {
	      delete edges[i];
	    }
	  }
	}
	
	function createCell(site) {
	  return cells[site.index] = {
	    site: site,
	    halfedges: []
	  };
	}
	
	function cellHalfedgeAngle(cell, edge) {
	  var site = cell.site,
	      va = edge.left,
	      vb = edge.right;
	  if (site === vb) vb = va, va = site;
	  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
	  if (site === va) va = edge[1], vb = edge[0];
	  else va = edge[0], vb = edge[1];
	  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
	}
	
	function cellHalfedgeStart(cell, edge) {
	  return edge[+(edge.left !== cell.site)];
	}
	
	function cellHalfedgeEnd(cell, edge) {
	  return edge[+(edge.left === cell.site)];
	}
	
	function sortCellHalfedges() {
	  for (var i = 0, n = cells.length, cell, halfedges, j, m; i < n; ++i) {
	    if ((cell = cells[i]) && (m = (halfedges = cell.halfedges).length)) {
	      var index = new Array(m),
	          array = new Array(m);
	      for (j = 0; j < m; ++j) index[j] = j, array[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
	      index.sort(function(i, j) { return array[j] - array[i]; });
	      for (j = 0; j < m; ++j) array[j] = halfedges[index[j]];
	      for (j = 0; j < m; ++j) halfedges[j] = array[j];
	    }
	  }
	}
	
	function clipCells(x0, y0, x1, y1) {
	  var nCells = cells.length,
	      iCell,
	      cell,
	      site,
	      iHalfedge,
	      halfedges,
	      nHalfedges,
	      start,
	      startX,
	      startY,
	      end,
	      endX,
	      endY,
	      cover = true;
	
	  for (iCell = 0; iCell < nCells; ++iCell) {
	    if (cell = cells[iCell]) {
	      site = cell.site;
	      halfedges = cell.halfedges;
	      iHalfedge = halfedges.length;
	
	      // Remove any dangling clipped edges.
	      while (iHalfedge--) {
	        if (!edges[halfedges[iHalfedge]]) {
	          halfedges.splice(iHalfedge, 1);
	        }
	      }
	
	      // Insert any border edges as necessary.
	      iHalfedge = 0, nHalfedges = halfedges.length;
	      while (iHalfedge < nHalfedges) {
	        end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
	        start = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
	        if (Math.abs(endX - startX) > epsilon$3 || Math.abs(endY - startY) > epsilon$3) {
	          halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end,
	              Math.abs(endX - x0) < epsilon$3 && y1 - endY > epsilon$3 ? [x0, Math.abs(startX - x0) < epsilon$3 ? startY : y1]
	              : Math.abs(endY - y1) < epsilon$3 && x1 - endX > epsilon$3 ? [Math.abs(startY - y1) < epsilon$3 ? startX : x1, y1]
	              : Math.abs(endX - x1) < epsilon$3 && endY - y0 > epsilon$3 ? [x1, Math.abs(startX - x1) < epsilon$3 ? startY : y0]
	              : Math.abs(endY - y0) < epsilon$3 && endX - x0 > epsilon$3 ? [Math.abs(startY - y0) < epsilon$3 ? startX : x0, y0]
	              : null)) - 1);
	          ++nHalfedges;
	        }
	      }
	
	      if (nHalfedges) cover = false;
	    }
	  }
	
	  // If there weren’t any edges, have the closest site cover the extent.
	  // It doesn’t matter which corner of the extent we measure!
	  if (cover) {
	    var dx, dy, d2, dc = Infinity;
	
	    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
	      if (cell = cells[iCell]) {
	        site = cell.site;
	        dx = site[0] - x0;
	        dy = site[1] - y0;
	        d2 = dx * dx + dy * dy;
	        if (d2 < dc) dc = d2, cover = cell;
	      }
	    }
	
	    if (cover) {
	      var v00 = [x0, y0], v01 = [x0, y1], v11 = [x1, y1], v10 = [x1, y0];
	      cover.halfedges.push(
	        edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1,
	        edges.push(createBorderEdge(site, v01, v11)) - 1,
	        edges.push(createBorderEdge(site, v11, v10)) - 1,
	        edges.push(createBorderEdge(site, v10, v00)) - 1
	      );
	    }
	  }
	
	  // Lastly delete any cells with no edges; these were entirely clipped.
	  for (iCell = 0; iCell < nCells; ++iCell) {
	    if (cell = cells[iCell]) {
	      if (!cell.halfedges.length) {
	        delete cells[iCell];
	      }
	    }
	  }
	}
	
	var circlePool = [];
	
	var firstCircle;
	
	function Circle() {
	  RedBlackNode(this);
	  this.x =
	  this.y =
	  this.arc =
	  this.site =
	  this.cy = null;
	}
	
	function attachCircle(arc) {
	  var lArc = arc.P,
	      rArc = arc.N;
	
	  if (!lArc || !rArc) return;
	
	  var lSite = lArc.site,
	      cSite = arc.site,
	      rSite = rArc.site;
	
	  if (lSite === rSite) return;
	
	  var bx = cSite[0],
	      by = cSite[1],
	      ax = lSite[0] - bx,
	      ay = lSite[1] - by,
	      cx = rSite[0] - bx,
	      cy = rSite[1] - by;
	
	  var d = 2 * (ax * cy - ay * cx);
	  if (d >= -epsilon2$1) return;
	
	  var ha = ax * ax + ay * ay,
	      hc = cx * cx + cy * cy,
	      x = (cy * ha - ay * hc) / d,
	      y = (ax * hc - cx * ha) / d;
	
	  var circle = circlePool.pop() || new Circle;
	  circle.arc = arc;
	  circle.site = cSite;
	  circle.x = x + bx;
	  circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom
	
	  arc.circle = circle;
	
	  var before = null,
	      node = circles._;
	
	  while (node) {
	    if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
	      if (node.L) node = node.L;
	      else { before = node.P; break; }
	    } else {
	      if (node.R) node = node.R;
	      else { before = node; break; }
	    }
	  }
	
	  circles.insert(before, circle);
	  if (!before) firstCircle = circle;
	}
	
	function detachCircle(arc) {
	  var circle = arc.circle;
	  if (circle) {
	    if (!circle.P) firstCircle = circle.N;
	    circles.remove(circle);
	    circlePool.push(circle);
	    RedBlackNode(circle);
	    arc.circle = null;
	  }
	}
	
	var beachPool = [];
	
	function Beach() {
	  RedBlackNode(this);
	  this.edge =
	  this.site =
	  this.circle = null;
	}
	
	function createBeach(site) {
	  var beach = beachPool.pop() || new Beach;
	  beach.site = site;
	  return beach;
	}
	
	function detachBeach(beach) {
	  detachCircle(beach);
	  beaches.remove(beach);
	  beachPool.push(beach);
	  RedBlackNode(beach);
	}
	
	function removeBeach(beach) {
	  var circle = beach.circle,
	      x = circle.x,
	      y = circle.cy,
	      vertex = [x, y],
	      previous = beach.P,
	      next = beach.N,
	      disappearing = [beach];
	
	  detachBeach(beach);
	
	  var lArc = previous;
	  while (lArc.circle
	      && Math.abs(x - lArc.circle.x) < epsilon$3
	      && Math.abs(y - lArc.circle.cy) < epsilon$3) {
	    previous = lArc.P;
	    disappearing.unshift(lArc);
	    detachBeach(lArc);
	    lArc = previous;
	  }
	
	  disappearing.unshift(lArc);
	  detachCircle(lArc);
	
	  var rArc = next;
	  while (rArc.circle
	      && Math.abs(x - rArc.circle.x) < epsilon$3
	      && Math.abs(y - rArc.circle.cy) < epsilon$3) {
	    next = rArc.N;
	    disappearing.push(rArc);
	    detachBeach(rArc);
	    rArc = next;
	  }
	
	  disappearing.push(rArc);
	  detachCircle(rArc);
	
	  var nArcs = disappearing.length,
	      iArc;
	  for (iArc = 1; iArc < nArcs; ++iArc) {
	    rArc = disappearing[iArc];
	    lArc = disappearing[iArc - 1];
	    setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
	  }
	
	  lArc = disappearing[0];
	  rArc = disappearing[nArcs - 1];
	  rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);
	
	  attachCircle(lArc);
	  attachCircle(rArc);
	}
	
	function addBeach(site) {
	  var x = site[0],
	      directrix = site[1],
	      lArc,
	      rArc,
	      dxl,
	      dxr,
	      node = beaches._;
	
	  while (node) {
	    dxl = leftBreakPoint(node, directrix) - x;
	    if (dxl > epsilon$3) node = node.L; else {
	      dxr = x - rightBreakPoint(node, directrix);
	      if (dxr > epsilon$3) {
	        if (!node.R) {
	          lArc = node;
	          break;
	        }
	        node = node.R;
	      } else {
	        if (dxl > -epsilon$3) {
	          lArc = node.P;
	          rArc = node;
	        } else if (dxr > -epsilon$3) {
	          lArc = node;
	          rArc = node.N;
	        } else {
	          lArc = rArc = node;
	        }
	        break;
	      }
	    }
	  }
	
	  createCell(site);
	  var newArc = createBeach(site);
	  beaches.insert(lArc, newArc);
	
	  if (!lArc && !rArc) return;
	
	  if (lArc === rArc) {
	    detachCircle(lArc);
	    rArc = createBeach(lArc.site);
	    beaches.insert(newArc, rArc);
	    newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
	    attachCircle(lArc);
	    attachCircle(rArc);
	    return;
	  }
	
	  if (!rArc) { // && lArc
	    newArc.edge = createEdge(lArc.site, newArc.site);
	    return;
	  }
	
	  // else lArc !== rArc
	  detachCircle(lArc);
	  detachCircle(rArc);
	
	  var lSite = lArc.site,
	      ax = lSite[0],
	      ay = lSite[1],
	      bx = site[0] - ax,
	      by = site[1] - ay,
	      rSite = rArc.site,
	      cx = rSite[0] - ax,
	      cy = rSite[1] - ay,
	      d = 2 * (bx * cy - by * cx),
	      hb = bx * bx + by * by,
	      hc = cx * cx + cy * cy,
	      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];
	
	  setEdgeEnd(rArc.edge, lSite, rSite, vertex);
	  newArc.edge = createEdge(lSite, site, null, vertex);
	  rArc.edge = createEdge(site, rSite, null, vertex);
	  attachCircle(lArc);
	  attachCircle(rArc);
	}
	
	function leftBreakPoint(arc, directrix) {
	  var site = arc.site,
	      rfocx = site[0],
	      rfocy = site[1],
	      pby2 = rfocy - directrix;
	
	  if (!pby2) return rfocx;
	
	  var lArc = arc.P;
	  if (!lArc) return -Infinity;
	
	  site = lArc.site;
	  var lfocx = site[0],
	      lfocy = site[1],
	      plby2 = lfocy - directrix;
	
	  if (!plby2) return lfocx;
	
	  var hl = lfocx - rfocx,
	      aby2 = 1 / pby2 - 1 / plby2,
	      b = hl / plby2;
	
	  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
	
	  return (rfocx + lfocx) / 2;
	}
	
	function rightBreakPoint(arc, directrix) {
	  var rArc = arc.N;
	  if (rArc) return leftBreakPoint(rArc, directrix);
	  var site = arc.site;
	  return site[1] === directrix ? site[0] : Infinity;
	}
	
	var epsilon$3 = 1e-6;
	var epsilon2$1 = 1e-12;
	var beaches;
	var cells;
	var circles;
	var edges;
	
	function triangleArea(a, b, c) {
	  return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
	}
	
	function lexicographic(a, b) {
	  return b[1] - a[1]
	      || b[0] - a[0];
	}
	
	function Diagram(sites, extent) {
	  var site = sites.sort(lexicographic).pop(),
	      x,
	      y,
	      circle;
	
	  edges = [];
	  cells = new Array(sites.length);
	  beaches = new RedBlackTree;
	  circles = new RedBlackTree;
	
	  while (true) {
	    circle = firstCircle;
	    if (site && (!circle || site[1] < circle.y || (site[1] === circle.y && site[0] < circle.x))) {
	      if (site[0] !== x || site[1] !== y) {
	        addBeach(site);
	        x = site[0], y = site[1];
	      }
	      site = sites.pop();
	    } else if (circle) {
	      removeBeach(circle.arc);
	    } else {
	      break;
	    }
	  }
	
	  sortCellHalfedges();
	
	  if (extent) {
	    var x0 = +extent[0][0],
	        y0 = +extent[0][1],
	        x1 = +extent[1][0],
	        y1 = +extent[1][1];
	    clipEdges(x0, y0, x1, y1);
	    clipCells(x0, y0, x1, y1);
	  }
	
	  this.edges = edges;
	  this.cells = cells;
	
	  beaches =
	  circles =
	  edges =
	  cells = null;
	}
	
	Diagram.prototype = {
	  constructor: Diagram,
	
	  polygons: function() {
	    var edges = this.edges;
	
	    return this.cells.map(function(cell) {
	      var polygon = cell.halfedges.map(function(i) { return cellHalfedgeStart(cell, edges[i]); });
	      polygon.data = cell.site.data;
	      return polygon;
	    });
	  },
	
	  triangles: function() {
	    var triangles = [],
	        edges = this.edges;
	
	    this.cells.forEach(function(cell, i) {
	      var site = cell.site,
	          halfedges = cell.halfedges,
	          j = -1,
	          m = halfedges.length,
	          s0,
	          e1 = edges[halfedges[m - 1]],
	          s1 = e1.left === site ? e1.right : e1.left;
	
	      while (++j < m) {
	        s0 = s1;
	        e1 = edges[halfedges[j]];
	        s1 = e1.left === site ? e1.right : e1.left;
	        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
	          triangles.push([site.data, s0.data, s1.data]);
	        }
	      }
	    });
	
	    return triangles;
	  },
	
	  links: function() {
	    return this.edges.filter(function(edge) {
	      return edge.right;
	    }).map(function(edge) {
	      return {
	        source: edge.left.data,
	        target: edge.right.data
	      };
	    });
	  },
	
	  find: function(x, y, radius) {
	    var that = this,
	        i0, i1 = that._found || 0,
	        cell = that.cells[i1] || that.cells[i1 = 0],
	        dx = x - cell.site[0],
	        dy = y - cell.site[1],
	        d2 = dx * dx + dy * dy;
	
	    do {
	      cell = that.cells[i0 = i1], i1 = null;
	      cell.halfedges.forEach(function(e) {
	        var edge = that.edges[e], v = edge.left;
	        if ((v === cell.site || !v) && !(v = edge.right)) return;
	        var vx = x - v[0],
	            vy = y - v[1],
	            v2 = vx * vx + vy * vy;
	        if (v2 < d2) d2 = v2, i1 = v.index;
	      });
	    } while (i1 !== null);
	
	    that._found = i0;
	
	    return radius == null || d2 <= radius * radius ? cell.site : null;
	  }
	};
	
	var voronoi = function() {
	  var x$$1 = x$4,
	      y$$1 = y$4,
	      extent = null;
	
	  function voronoi(data) {
	    return new Diagram(data.map(function(d, i) {
	      var s = [Math.round(x$$1(d, i, data) / epsilon$3) * epsilon$3, Math.round(y$$1(d, i, data) / epsilon$3) * epsilon$3];
	      s.index = i;
	      s.data = d;
	      return s;
	    }), extent);
	  }
	
	  voronoi.polygons = function(data) {
	    return voronoi(data).polygons();
	  };
	
	  voronoi.links = function(data) {
	    return voronoi(data).links();
	  };
	
	  voronoi.triangles = function(data) {
	    return voronoi(data).triangles();
	  };
	
	  voronoi.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$9(+_), voronoi) : x$$1;
	  };
	
	  voronoi.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$9(+_), voronoi) : y$$1;
	  };
	
	  voronoi.extent = function(_) {
	    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
	  };
	
	  voronoi.size = function(_) {
	    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
	  };
	
	  return voronoi;
	};
	
	var constant$10 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function ZoomEvent(target, type, transform) {
	  this.target = target;
	  this.type = type;
	  this.transform = transform;
	}
	
	function Transform(k, x, y) {
	  this.k = k;
	  this.x = x;
	  this.y = y;
	}
	
	Transform.prototype = {
	  constructor: Transform,
	  scale: function(k) {
	    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
	  },
	  translate: function(x, y) {
	    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
	  },
	  apply: function(point) {
	    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
	  },
	  applyX: function(x) {
	    return x * this.k + this.x;
	  },
	  applyY: function(y) {
	    return y * this.k + this.y;
	  },
	  invert: function(location) {
	    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
	  },
	  invertX: function(x) {
	    return (x - this.x) / this.k;
	  },
	  invertY: function(y) {
	    return (y - this.y) / this.k;
	  },
	  rescaleX: function(x) {
	    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
	  },
	  rescaleY: function(y) {
	    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
	  },
	  toString: function() {
	    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	  }
	};
	
	var identity$6 = new Transform(1, 0, 0);
	
	transform.prototype = Transform.prototype;
	
	function transform(node) {
	  return node.__zoom || identity$6;
	}
	
	function nopropagation$1() {
	  exports.event.stopImmediatePropagation();
	}
	
	var noevent$1 = function() {
	  exports.event.preventDefault();
	  exports.event.stopImmediatePropagation();
	};
	
	// Ignore right-click, since that should open the context menu.
	function defaultFilter$1() {
	  return !exports.event.button;
	}
	
	function defaultExtent() {
	  var e = this, w, h;
	  if (e instanceof SVGElement) {
	    e = e.ownerSVGElement || e;
	    w = e.width.baseVal.value;
	    h = e.height.baseVal.value;
	  } else {
	    w = e.clientWidth;
	    h = e.clientHeight;
	  }
	  return [[0, 0], [w, h]];
	}
	
	function defaultTransform() {
	  return this.__zoom || identity$6;
	}
	
	var zoom = function() {
	  var filter = defaultFilter$1,
	      extent = defaultExtent,
	      k0 = 0,
	      k1 = Infinity,
	      x0 = -k1,
	      x1 = k1,
	      y0 = x0,
	      y1 = x1,
	      duration = 250,
	      interpolate$$1 = interpolateZoom,
	      gestures = [],
	      listeners = dispatch("start", "zoom", "end"),
	      touchstarting,
	      touchending,
	      touchDelay = 500,
	      wheelDelay = 150;
	
	  function zoom(selection$$1) {
	    selection$$1
	        .on("wheel.zoom", wheeled)
	        .on("mousedown.zoom", mousedowned)
	        .on("dblclick.zoom", dblclicked)
	        .on("touchstart.zoom", touchstarted)
	        .on("touchmove.zoom", touchmoved)
	        .on("touchend.zoom touchcancel.zoom", touchended)
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
	        .property("__zoom", defaultTransform);
	  }
	
	  zoom.transform = function(collection, transform) {
	    var selection$$1 = collection.selection ? collection.selection() : collection;
	    selection$$1.property("__zoom", defaultTransform);
	    if (collection !== selection$$1) {
	      schedule(collection, transform);
	    } else {
	      selection$$1.interrupt().each(function() {
	        gesture(this, arguments)
	            .start()
	            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
	            .end();
	      });
	    }
	  };
	
	  zoom.scaleBy = function(selection$$1, k) {
	    zoom.scaleTo(selection$$1, function() {
	      var k0 = this.__zoom.k,
	          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
	      return k0 * k1;
	    });
	  };
	
	  zoom.scaleTo = function(selection$$1, k) {
	    zoom.transform(selection$$1, function() {
	      var e = extent.apply(this, arguments),
	          t0 = this.__zoom,
	          p0 = centroid(e),
	          p1 = t0.invert(p0),
	          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
	      return constrain(translate(scale(t0, k1), p0, p1), e);
	    });
	  };
	
	  zoom.translateBy = function(selection$$1, x, y) {
	    zoom.transform(selection$$1, function() {
	      return constrain(this.__zoom.translate(
	        typeof x === "function" ? x.apply(this, arguments) : x,
	        typeof y === "function" ? y.apply(this, arguments) : y
	      ), extent.apply(this, arguments));
	    });
	  };
	
	  function scale(transform, k) {
	    k = Math.max(k0, Math.min(k1, k));
	    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
	  }
	
	  function translate(transform, p0, p1) {
	    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
	    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
	  }
	
	  function constrain(transform, extent) {
	    var dx0 = transform.invertX(extent[0][0]) - x0,
	        dx1 = transform.invertX(extent[1][0]) - x1,
	        dy0 = transform.invertY(extent[0][1]) - y0,
	        dy1 = transform.invertY(extent[1][1]) - y1;
	    return transform.translate(
	      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
	      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
	    );
	  }
	
	  function centroid(extent) {
	    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
	  }
	
	  function schedule(transition$$1, transform, center) {
	    transition$$1
	        .on("start.zoom", function() { gesture(this, arguments).start(); })
	        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
	        .tween("zoom", function() {
	          var that = this,
	              args = arguments,
	              g = gesture(that, args),
	              e = extent.apply(that, args),
	              p = center || centroid(e),
	              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
	              a = that.__zoom,
	              b = typeof transform === "function" ? transform.apply(that, args) : transform,
	              i = interpolate$$1(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
	          return function(t) {
	            if (t === 1) t = b; // Avoid rounding error on end.
	            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
	            g.zoom(null, t);
	          };
	        });
	  }
	
	  function gesture(that, args) {
	    for (var i = 0, n = gestures.length, g; i < n; ++i) {
	      if ((g = gestures[i]).that === that) {
	        return g;
	      }
	    }
	    return new Gesture(that, args);
	  }
	
	  function Gesture(that, args) {
	    this.that = that;
	    this.args = args;
	    this.index = -1;
	    this.active = 0;
	    this.extent = extent.apply(that, args);
	  }
	
	  Gesture.prototype = {
	    start: function() {
	      if (++this.active === 1) {
	        this.index = gestures.push(this) - 1;
	        this.emit("start");
	      }
	      return this;
	    },
	    zoom: function(key, transform) {
	      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
	      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
	      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
	      this.that.__zoom = transform;
	      this.emit("zoom");
	      return this;
	    },
	    end: function() {
	      if (--this.active === 0) {
	        gestures.splice(this.index, 1);
	        this.index = -1;
	        this.emit("end");
	      }
	      return this;
	    },
	    emit: function(type) {
	      customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
	    }
	  };
	
	  function wheeled() {
	    if (!filter.apply(this, arguments)) return;
	    var g = gesture(this, arguments),
	        t = this.__zoom,
	        k = Math.max(k0, Math.min(k1, t.k * Math.pow(2, -exports.event.deltaY * (exports.event.deltaMode ? 120 : 1) / 500))),
	        p = mouse(this);
	
	    // If the mouse is in the same location as before, reuse it.
	    // If there were recent wheel events, reset the wheel idle timeout.
	    if (g.wheel) {
	      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
	        g.mouse[1] = t.invert(g.mouse[0] = p);
	      }
	      clearTimeout(g.wheel);
	    }
	
	    // If this wheel event won’t trigger a transform change, ignore it.
	    else if (t.k === k) return;
	
	    // Otherwise, capture the mouse point and location at the start.
	    else {
	      g.mouse = [p, t.invert(p)];
	      interrupt(this);
	      g.start();
	    }
	
	    noevent$1();
	    g.wheel = setTimeout(wheelidled, wheelDelay);
	    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent));
	
	    function wheelidled() {
	      g.wheel = null;
	      g.end();
	    }
	  }
	
	  function mousedowned() {
	    if (touchending || !filter.apply(this, arguments)) return;
	    var g = gesture(this, arguments),
	        v = select(exports.event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
	        p = mouse(this);
	
	    dragDisable(exports.event.view);
	    nopropagation$1();
	    g.mouse = [p, this.__zoom.invert(p)];
	    interrupt(this);
	    g.start();
	
	    function mousemoved() {
	      noevent$1();
	      g.moved = true;
	      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse(g.that), g.mouse[1]), g.extent));
	    }
	
	    function mouseupped() {
	      v.on("mousemove.zoom mouseup.zoom", null);
	      yesdrag(exports.event.view, g.moved);
	      noevent$1();
	      g.end();
	    }
	  }
	
	  function dblclicked() {
	    if (!filter.apply(this, arguments)) return;
	    var t0 = this.__zoom,
	        p0 = mouse(this),
	        p1 = t0.invert(p0),
	        k1 = t0.k * (exports.event.shiftKey ? 0.5 : 2),
	        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments));
	
	    noevent$1();
	    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0);
	    else select(this).call(zoom.transform, t1);
	  }
	
	  function touchstarted() {
	    if (!filter.apply(this, arguments)) return;
	    var g = gesture(this, arguments),
	        touches$$1 = exports.event.changedTouches,
	        n = touches$$1.length, i, t, p;
	
	    nopropagation$1();
	    for (i = 0; i < n; ++i) {
	      t = touches$$1[i], p = touch(this, touches$$1, t.identifier);
	      p = [p, this.__zoom.invert(p), t.identifier];
	      if (!g.touch0) g.touch0 = p;
	      else if (!g.touch1) g.touch1 = p;
	    }
	
	    // If this is a dbltap, reroute to the (optional) dblclick.zoom handler.
	    if (touchstarting) {
	      touchstarting = clearTimeout(touchstarting);
	      if (!g.touch1) {
	        g.end();
	        p = select(this).on("dblclick.zoom");
	        if (p) p.apply(this, arguments);
	        return;
	      }
	    }
	
	    if (exports.event.touches.length === n) {
	      touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
	      interrupt(this);
	      g.start();
	    }
	  }
	
	  function touchmoved() {
	    var g = gesture(this, arguments),
	        touches$$1 = exports.event.changedTouches,
	        n = touches$$1.length, i, t, p, l;
	
	    noevent$1();
	    if (touchstarting) touchstarting = clearTimeout(touchstarting);
	    for (i = 0; i < n; ++i) {
	      t = touches$$1[i], p = touch(this, touches$$1, t.identifier);
	      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
	      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
	    }
	    t = g.that.__zoom;
	    if (g.touch1) {
	      var p0 = g.touch0[0], l0 = g.touch0[1],
	          p1 = g.touch1[0], l1 = g.touch1[1],
	          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
	          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
	      t = scale(t, Math.sqrt(dp / dl));
	      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
	      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
	    }
	    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
	    else return;
	    g.zoom("touch", constrain(translate(t, p, l), g.extent));
	  }
	
	  function touchended() {
	    var g = gesture(this, arguments),
	        touches$$1 = exports.event.changedTouches,
	        n = touches$$1.length, i, t;
	
	    nopropagation$1();
	    if (touchending) clearTimeout(touchending);
	    touchending = setTimeout(function() { touchending = null; }, touchDelay);
	    for (i = 0; i < n; ++i) {
	      t = touches$$1[i];
	      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
	      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
	    }
	    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
	    if (!g.touch0) g.end();
	  }
	
	  zoom.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$10(!!_), zoom) : filter;
	  };
	
	  zoom.extent = function(_) {
	    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$10([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
	  };
	
	  zoom.scaleExtent = function(_) {
	    return arguments.length ? (k0 = +_[0], k1 = +_[1], zoom) : [k0, k1];
	  };
	
	  zoom.translateExtent = function(_) {
	    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], zoom) : [[x0, y0], [x1, y1]];
	  };
	
	  zoom.duration = function(_) {
	    return arguments.length ? (duration = +_, zoom) : duration;
	  };
	
	  zoom.interpolate = function(_) {
	    return arguments.length ? (interpolate$$1 = _, zoom) : interpolate$$1;
	  };
	
	  zoom.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? zoom : value;
	  };
	
	  return zoom;
	};
	
	var constant$11 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var BrushEvent = function(target, type, selection) {
	  this.target = target;
	  this.type = type;
	  this.selection = selection;
	};
	
	function nopropagation$2() {
	  exports.event.stopImmediatePropagation();
	}
	
	var noevent$2 = function() {
	  exports.event.preventDefault();
	  exports.event.stopImmediatePropagation();
	};
	
	var MODE_DRAG = {name: "drag"};
	var MODE_SPACE = {name: "space"};
	var MODE_HANDLE = {name: "handle"};
	var MODE_CENTER = {name: "center"};
	
	var X = {
	  name: "x",
	  handles: ["e", "w"].map(type$1),
	  input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
	  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
	};
	
	var Y = {
	  name: "y",
	  handles: ["n", "s"].map(type$1),
	  input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
	  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
	};
	
	var XY = {
	  name: "xy",
	  handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type$1),
	  input: function(xy) { return xy; },
	  output: function(xy) { return xy; }
	};
	
	var cursors = {
	  overlay: "crosshair",
	  selection: "move",
	  n: "ns-resize",
	  e: "ew-resize",
	  s: "ns-resize",
	  w: "ew-resize",
	  nw: "nwse-resize",
	  ne: "nesw-resize",
	  se: "nwse-resize",
	  sw: "nesw-resize"
	};
	
	var flipX = {
	  e: "w",
	  w: "e",
	  nw: "ne",
	  ne: "nw",
	  se: "sw",
	  sw: "se"
	};
	
	var flipY = {
	  n: "s",
	  s: "n",
	  nw: "sw",
	  ne: "se",
	  se: "ne",
	  sw: "nw"
	};
	
	var signsX = {
	  overlay: +1,
	  selection: +1,
	  n: null,
	  e: +1,
	  s: null,
	  w: -1,
	  nw: -1,
	  ne: +1,
	  se: +1,
	  sw: -1
	};
	
	var signsY = {
	  overlay: +1,
	  selection: +1,
	  n: -1,
	  e: null,
	  s: +1,
	  w: null,
	  nw: -1,
	  ne: -1,
	  se: +1,
	  sw: +1
	};
	
	function type$1(t) {
	  return {type: t};
	}
	
	// Ignore right-click, since that should open the context menu.
	function defaultFilter$2() {
	  return !exports.event.button;
	}
	
	function defaultExtent$1() {
	  var svg = this.ownerSVGElement || this;
	  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
	}
	
	// Like d3.local, but with the name “__brush” rather than auto-generated.
	function local$1(node) {
	  while (!node.__brush) if (!(node = node.parentNode)) return;
	  return node.__brush;
	}
	
	function empty$1(extent) {
	  return extent[0][0] === extent[1][0]
	      || extent[0][1] === extent[1][1];
	}
	
	function brushSelection(node) {
	  var state = node.__brush;
	  return state ? state.dim.output(state.selection) : null;
	}
	
	function brushX() {
	  return brush$1(X);
	}
	
	function brushY() {
	  return brush$1(Y);
	}
	
	var brush = function() {
	  return brush$1(XY);
	};
	
	function brush$1(dim) {
	  var extent = defaultExtent$1,
	      filter = defaultFilter$2,
	      listeners = dispatch(brush, "start", "brush", "end"),
	      handleSize = 6,
	      touchending;
	
	  function brush(group) {
	    var overlay = group
	        .property("__brush", initialize)
	      .selectAll(".overlay")
	      .data([type$1("overlay")]);
	
	    overlay.enter().append("rect")
	        .attr("class", "overlay")
	        .attr("pointer-events", "all")
	        .attr("cursor", cursors.overlay)
	      .merge(overlay)
	        .each(function() {
	          var extent = local$1(this).extent;
	          select(this)
	              .attr("x", extent[0][0])
	              .attr("y", extent[0][1])
	              .attr("width", extent[1][0] - extent[0][0])
	              .attr("height", extent[1][1] - extent[0][1]);
	        });
	
	    group.selectAll(".selection")
	      .data([type$1("selection")])
	      .enter().append("rect")
	        .attr("class", "selection")
	        .attr("cursor", cursors.selection)
	        .attr("fill", "#777")
	        .attr("fill-opacity", 0.3)
	        .attr("stroke", "#fff")
	        .attr("shape-rendering", "crispEdges");
	
	    var handle = group.selectAll(".handle")
	      .data(dim.handles, function(d) { return d.type; });
	
	    handle.exit().remove();
	
	    handle.enter().append("rect")
	        .attr("class", function(d) { return "handle handle--" + d.type; })
	        .attr("cursor", function(d) { return cursors[d.type]; });
	
	    group
	        .each(redraw)
	        .attr("fill", "none")
	        .attr("pointer-events", "all")
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
	        .on("mousedown.brush touchstart.brush", started);
	  }
	
	  brush.move = function(group, selection$$1) {
	    if (group.selection) {
	      group
	          .on("start.brush", function() { emitter(this, arguments).beforestart().start(); })
	          .on("interrupt.brush end.brush", function() { emitter(this, arguments).end(); })
	          .tween("brush", function() {
	            var that = this,
	                state = that.__brush,
	                emit = emitter(that, arguments),
	                selection0 = state.selection,
	                selection1 = dim.input(typeof selection$$1 === "function" ? selection$$1.apply(this, arguments) : selection$$1, state.extent),
	                i = interpolate(selection0, selection1);
	
	            function tween(t) {
	              state.selection = t === 1 && empty$1(selection1) ? null : i(t);
	              redraw.call(that);
	              emit.brush();
	            }
	
	            return selection0 && selection1 ? tween : tween(1);
	          });
	    } else {
	      group
	          .each(function() {
	            var that = this,
	                args = arguments,
	                state = that.__brush,
	                selection1 = dim.input(typeof selection$$1 === "function" ? selection$$1.apply(that, args) : selection$$1, state.extent),
	                emit = emitter(that, args).beforestart();
	
	            interrupt(that);
	            state.selection = selection1 == null || empty$1(selection1) ? null : selection1;
	            redraw.call(that);
	            emit.start().brush().end();
	          });
	    }
	  };
	
	  function redraw() {
	    var group = select(this),
	        selection$$1 = local$1(this).selection;
	
	    if (selection$$1) {
	      group.selectAll(".selection")
	          .style("display", null)
	          .attr("x", selection$$1[0][0])
	          .attr("y", selection$$1[0][1])
	          .attr("width", selection$$1[1][0] - selection$$1[0][0])
	          .attr("height", selection$$1[1][1] - selection$$1[0][1]);
	
	      group.selectAll(".handle")
	          .style("display", null)
	          .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection$$1[1][0] - handleSize / 2 : selection$$1[0][0] - handleSize / 2; })
	          .attr("y", function(d) { return d.type[0] === "s" ? selection$$1[1][1] - handleSize / 2 : selection$$1[0][1] - handleSize / 2; })
	          .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection$$1[1][0] - selection$$1[0][0] + handleSize : handleSize; })
	          .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection$$1[1][1] - selection$$1[0][1] + handleSize : handleSize; });
	    }
	
	    else {
	      group.selectAll(".selection,.handle")
	          .style("display", "none")
	          .attr("x", null)
	          .attr("y", null)
	          .attr("width", null)
	          .attr("height", null);
	    }
	  }
	
	  function emitter(that, args) {
	    return that.__brush.emitter || new Emitter(that, args);
	  }
	
	  function Emitter(that, args) {
	    this.that = that;
	    this.args = args;
	    this.state = that.__brush;
	    this.active = 0;
	  }
	
	  Emitter.prototype = {
	    beforestart: function() {
	      if (++this.active === 1) this.state.emitter = this, this.starting = true;
	      return this;
	    },
	    start: function() {
	      if (this.starting) this.starting = false, this.emit("start");
	      return this;
	    },
	    brush: function() {
	      this.emit("brush");
	      return this;
	    },
	    end: function() {
	      if (--this.active === 0) delete this.state.emitter, this.emit("end");
	      return this;
	    },
	    emit: function(type) {
	      customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
	    }
	  };
	
	  function started() {
	    if (exports.event.touches) { if (exports.event.changedTouches.length < exports.event.touches.length) return noevent$2(); }
	    else if (touchending) return;
	    if (!filter.apply(this, arguments)) return;
	
	    var that = this,
	        type = exports.event.target.__data__.type,
	        mode = (exports.event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (exports.event.altKey ? MODE_CENTER : MODE_HANDLE),
	        signX = dim === Y ? null : signsX[type],
	        signY = dim === X ? null : signsY[type],
	        state = local$1(that),
	        extent = state.extent,
	        selection$$1 = state.selection,
	        W = extent[0][0], w0, w1,
	        N = extent[0][1], n0, n1,
	        E = extent[1][0], e0, e1,
	        S = extent[1][1], s0, s1,
	        dx,
	        dy,
	        moving,
	        shifting = signX && signY && exports.event.shiftKey,
	        lockX,
	        lockY,
	        point0 = mouse(that),
	        point = point0,
	        emit = emitter(that, arguments).beforestart();
	
	    if (type === "overlay") {
	      state.selection = selection$$1 = [
	        [w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]],
	        [e0 = dim === Y ? E : w0, s0 = dim === X ? S : n0]
	      ];
	    } else {
	      w0 = selection$$1[0][0];
	      n0 = selection$$1[0][1];
	      e0 = selection$$1[1][0];
	      s0 = selection$$1[1][1];
	    }
	
	    w1 = w0;
	    n1 = n0;
	    e1 = e0;
	    s1 = s0;
	
	    var group = select(that)
	        .attr("pointer-events", "none");
	
	    var overlay = group.selectAll(".overlay")
	        .attr("cursor", cursors[type]);
	
	    if (exports.event.touches) {
	      group
	          .on("touchmove.brush", moved, true)
	          .on("touchend.brush touchcancel.brush", ended, true);
	    } else {
	      var view = select(exports.event.view)
	          .on("keydown.brush", keydowned, true)
	          .on("keyup.brush", keyupped, true)
	          .on("mousemove.brush", moved, true)
	          .on("mouseup.brush", ended, true);
	
	      dragDisable(exports.event.view);
	    }
	
	    nopropagation$2();
	    interrupt(that);
	    redraw.call(that);
	    emit.start();
	
	    function moved() {
	      var point1 = mouse(that);
	      if (shifting && !lockX && !lockY) {
	        if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) lockY = true;
	        else lockX = true;
	      }
	      point = point1;
	      moving = true;
	      noevent$2();
	      move();
	    }
	
	    function move() {
	      var t;
	
	      dx = point[0] - point0[0];
	      dy = point[1] - point0[1];
	
	      switch (mode) {
	        case MODE_SPACE:
	        case MODE_DRAG: {
	          if (signX) dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
	          if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
	          break;
	        }
	        case MODE_HANDLE: {
	          if (signX < 0) dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
	          else if (signX > 0) dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
	          if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
	          else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
	          break;
	        }
	        case MODE_CENTER: {
	          if (signX) w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX));
	          if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
	          break;
	        }
	      }
	
	      if (e1 < w1) {
	        signX *= -1;
	        t = w0, w0 = e0, e0 = t;
	        t = w1, w1 = e1, e1 = t;
	        if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
	      }
	
	      if (s1 < n1) {
	        signY *= -1;
	        t = n0, n0 = s0, s0 = t;
	        t = n1, n1 = s1, s1 = t;
	        if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
	      }
	
	      if (state.selection) selection$$1 = state.selection; // May be set by brush.move!
	      if (lockX) w1 = selection$$1[0][0], e1 = selection$$1[1][0];
	      if (lockY) n1 = selection$$1[0][1], s1 = selection$$1[1][1];
	
	      if (selection$$1[0][0] !== w1
	          || selection$$1[0][1] !== n1
	          || selection$$1[1][0] !== e1
	          || selection$$1[1][1] !== s1) {
	        state.selection = [[w1, n1], [e1, s1]];
	        redraw.call(that);
	        emit.brush();
	      }
	    }
	
	    function ended() {
	      nopropagation$2();
	      if (exports.event.touches) {
	        if (exports.event.touches.length) return;
	        if (touchending) clearTimeout(touchending);
	        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
	        group.on("touchmove.brush touchend.brush touchcancel.brush", null);
	      } else {
	        yesdrag(exports.event.view, moving);
	        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
	      }
	      group.attr("pointer-events", "all");
	      overlay.attr("cursor", cursors.overlay);
	      if (state.selection) selection$$1 = state.selection; // May be set by brush.move (on start)!
	      if (empty$1(selection$$1)) state.selection = null, redraw.call(that);
	      emit.end();
	    }
	
	    function keydowned() {
	      switch (exports.event.keyCode) {
	        case 16: { // SHIFT
	          shifting = signX && signY;
	          break;
	        }
	        case 18: { // ALT
	          if (mode === MODE_HANDLE) {
	            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	            mode = MODE_CENTER;
	            move();
	          }
	          break;
	        }
	        case 32: { // SPACE; takes priority over ALT
	          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
	            if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
	            if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
	            mode = MODE_SPACE;
	            overlay.attr("cursor", cursors.selection);
	            move();
	          }
	          break;
	        }
	        default: return;
	      }
	      noevent$2();
	    }
	
	    function keyupped() {
	      switch (exports.event.keyCode) {
	        case 16: { // SHIFT
	          if (shifting) {
	            lockX = lockY = shifting = false;
	            move();
	          }
	          break;
	        }
	        case 18: { // ALT
	          if (mode === MODE_CENTER) {
	            if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
	            if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
	            mode = MODE_HANDLE;
	            move();
	          }
	          break;
	        }
	        case 32: { // SPACE
	          if (mode === MODE_SPACE) {
	            if (exports.event.altKey) {
	              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	              mode = MODE_CENTER;
	            } else {
	              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
	              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
	              mode = MODE_HANDLE;
	            }
	            overlay.attr("cursor", cursors[type]);
	            move();
	          }
	          break;
	        }
	        default: return;
	      }
	      noevent$2();
	    }
	  }
	
	  function initialize() {
	    var state = this.__brush || {selection: null};
	    state.extent = extent.apply(this, arguments);
	    state.dim = dim;
	    return state;
	  }
	
	  brush.extent = function(_) {
	    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$11([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
	  };
	
	  brush.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$11(!!_), brush) : filter;
	  };
	
	  brush.handleSize = function(_) {
	    return arguments.length ? (handleSize = +_, brush) : handleSize;
	  };
	
	  brush.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? brush : value;
	  };
	
	  return brush;
	}
	
	var cos = Math.cos;
	var sin = Math.sin;
	var pi$3 = Math.PI;
	var halfPi$2 = pi$3 / 2;
	var tau$3 = pi$3 * 2;
	var max$1 = Math.max;
	
	function compareValue(compare) {
	  return function(a, b) {
	    return compare(
	      a.source.value + a.target.value,
	      b.source.value + b.target.value
	    );
	  };
	}
	
	var chord = function() {
	  var padAngle = 0,
	      sortGroups = null,
	      sortSubgroups = null,
	      sortChords = null;
	
	  function chord(matrix) {
	    var n = matrix.length,
	        groupSums = [],
	        groupIndex = range(n),
	        subgroupIndex = [],
	        chords = [],
	        groups = chords.groups = new Array(n),
	        subgroups = new Array(n * n),
	        k,
	        x,
	        x0,
	        dx,
	        i,
	        j;
	
	    // Compute the sum.
	    k = 0, i = -1; while (++i < n) {
	      x = 0, j = -1; while (++j < n) {
	        x += matrix[i][j];
	      }
	      groupSums.push(x);
	      subgroupIndex.push(range(n));
	      k += x;
	    }
	
	    // Sort groups…
	    if (sortGroups) groupIndex.sort(function(a, b) {
	      return sortGroups(groupSums[a], groupSums[b]);
	    });
	
	    // Sort subgroups…
	    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
	      d.sort(function(a, b) {
	        return sortSubgroups(matrix[i][a], matrix[i][b]);
	      });
	    });
	
	    // Convert the sum to scaling factor for [0, 2pi].
	    // TODO Allow start and end angle to be specified?
	    // TODO Allow padding to be specified as percentage?
	    k = max$1(0, tau$3 - padAngle * n) / k;
	    dx = k ? padAngle : tau$3 / n;
	
	    // Compute the start and end angle for each group and subgroup.
	    // Note: Opera has a bug reordering object literal properties!
	    x = 0, i = -1; while (++i < n) {
	      x0 = x, j = -1; while (++j < n) {
	        var di = groupIndex[i],
	            dj = subgroupIndex[di][j],
	            v = matrix[di][dj],
	            a0 = x,
	            a1 = x += v * k;
	        subgroups[dj * n + di] = {
	          index: di,
	          subindex: dj,
	          startAngle: a0,
	          endAngle: a1,
	          value: v
	        };
	      }
	      groups[di] = {
	        index: di,
	        startAngle: x0,
	        endAngle: x,
	        value: groupSums[di]
	      };
	      x += dx;
	    }
	
	    // Generate chords for each (non-empty) subgroup-subgroup link.
	    i = -1; while (++i < n) {
	      j = i - 1; while (++j < n) {
	        var source = subgroups[j * n + i],
	            target = subgroups[i * n + j];
	        if (source.value || target.value) {
	          chords.push(source.value < target.value
	              ? {source: target, target: source}
	              : {source: source, target: target});
	        }
	      }
	    }
	
	    return sortChords ? chords.sort(sortChords) : chords;
	  }
	
	  chord.padAngle = function(_) {
	    return arguments.length ? (padAngle = max$1(0, _), chord) : padAngle;
	  };
	
	  chord.sortGroups = function(_) {
	    return arguments.length ? (sortGroups = _, chord) : sortGroups;
	  };
	
	  chord.sortSubgroups = function(_) {
	    return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
	  };
	
	  chord.sortChords = function(_) {
	    return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
	  };
	
	  return chord;
	};
	
	var slice$5 = Array.prototype.slice;
	
	var constant$12 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function defaultSource(d) {
	  return d.source;
	}
	
	function defaultTarget(d) {
	  return d.target;
	}
	
	function defaultRadius$1(d) {
	  return d.radius;
	}
	
	function defaultStartAngle(d) {
	  return d.startAngle;
	}
	
	function defaultEndAngle(d) {
	  return d.endAngle;
	}
	
	var ribbon = function() {
	  var source = defaultSource,
	      target = defaultTarget,
	      radius = defaultRadius$1,
	      startAngle = defaultStartAngle,
	      endAngle = defaultEndAngle,
	      context = null;
	
	  function ribbon() {
	    var buffer,
	        argv = slice$5.call(arguments),
	        s = source.apply(this, argv),
	        t = target.apply(this, argv),
	        sr = +radius.apply(this, (argv[0] = s, argv)),
	        sa0 = startAngle.apply(this, argv) - halfPi$2,
	        sa1 = endAngle.apply(this, argv) - halfPi$2,
	        sx0 = sr * cos(sa0),
	        sy0 = sr * sin(sa0),
	        tr = +radius.apply(this, (argv[0] = t, argv)),
	        ta0 = startAngle.apply(this, argv) - halfPi$2,
	        ta1 = endAngle.apply(this, argv) - halfPi$2;
	
	    if (!context) context = buffer = path();
	
	    context.moveTo(sx0, sy0);
	    context.arc(0, 0, sr, sa0, sa1);
	    if (sa0 !== ta0 || sa1 !== ta1) { // TODO sr !== tr?
	      context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
	      context.arc(0, 0, tr, ta0, ta1);
	    }
	    context.quadraticCurveTo(0, 0, sx0, sy0);
	    context.closePath();
	
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  ribbon.radius = function(_) {
	    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$12(+_), ribbon) : radius;
	  };
	
	  ribbon.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$12(+_), ribbon) : startAngle;
	  };
	
	  ribbon.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$12(+_), ribbon) : endAngle;
	  };
	
	  ribbon.source = function(_) {
	    return arguments.length ? (source = _, ribbon) : source;
	  };
	
	  ribbon.target = function(_) {
	    return arguments.length ? (target = _, ribbon) : target;
	  };
	
	  ribbon.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), ribbon) : context;
	  };
	
	  return ribbon;
	};
	
	// Adds floating point numbers with twice the normal precision.
	// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
	// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
	// 305–363 (1997).
	// Code adapted from GeographicLib by Charles F. F. Karney,
	// http://geographiclib.sourceforge.net/
	
	var adder = function() {
	  return new Adder;
	};
	
	function Adder() {
	  this.reset();
	}
	
	Adder.prototype = {
	  constructor: Adder,
	  reset: function() {
	    this.s = // rounded value
	    this.t = 0; // exact error
	  },
	  add: function(y) {
	    add$1(temp, y, this.t);
	    add$1(this, temp.s, this.s);
	    if (this.s) this.t += temp.t;
	    else this.s = temp.t;
	  },
	  valueOf: function() {
	    return this.s;
	  }
	};
	
	var temp = new Adder;
	
	function add$1(adder, a, b) {
	  var x = adder.s = a + b,
	      bv = x - a,
	      av = x - bv;
	  adder.t = (a - av) + (b - bv);
	}
	
	var epsilon$4 = 1e-6;
	var epsilon2$2 = 1e-12;
	var pi$4 = Math.PI;
	var halfPi$3 = pi$4 / 2;
	var quarterPi = pi$4 / 4;
	var tau$4 = pi$4 * 2;
	
	var degrees$1 = 180 / pi$4;
	var radians = pi$4 / 180;
	
	var abs = Math.abs;
	var atan = Math.atan;
	var atan2 = Math.atan2;
	var cos$1 = Math.cos;
	var ceil = Math.ceil;
	var exp = Math.exp;
	
	var log$1 = Math.log;
	var pow$1 = Math.pow;
	var sin$1 = Math.sin;
	var sign$1 = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
	var sqrt$1 = Math.sqrt;
	var tan = Math.tan;
	
	function acos(x) {
	  return x > 1 ? 0 : x < -1 ? pi$4 : Math.acos(x);
	}
	
	function asin$1(x) {
	  return x > 1 ? halfPi$3 : x < -1 ? -halfPi$3 : Math.asin(x);
	}
	
	function haversin(x) {
	  return (x = sin$1(x / 2)) * x;
	}
	
	function noop$2() {}
	
	function streamGeometry(geometry, stream) {
	  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
	    streamGeometryType[geometry.type](geometry, stream);
	  }
	}
	
	var streamObjectType = {
	  Feature: function(feature, stream) {
	    streamGeometry(feature.geometry, stream);
	  },
	  FeatureCollection: function(object, stream) {
	    var features = object.features, i = -1, n = features.length;
	    while (++i < n) streamGeometry(features[i].geometry, stream);
	  }
	};
	
	var streamGeometryType = {
	  Sphere: function(object, stream) {
	    stream.sphere();
	  },
	  Point: function(object, stream) {
	    object = object.coordinates;
	    stream.point(object[0], object[1], object[2]);
	  },
	  MultiPoint: function(object, stream) {
	    var coordinates = object.coordinates, i = -1, n = coordinates.length;
	    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
	  },
	  LineString: function(object, stream) {
	    streamLine(object.coordinates, stream, 0);
	  },
	  MultiLineString: function(object, stream) {
	    var coordinates = object.coordinates, i = -1, n = coordinates.length;
	    while (++i < n) streamLine(coordinates[i], stream, 0);
	  },
	  Polygon: function(object, stream) {
	    streamPolygon(object.coordinates, stream);
	  },
	  MultiPolygon: function(object, stream) {
	    var coordinates = object.coordinates, i = -1, n = coordinates.length;
	    while (++i < n) streamPolygon(coordinates[i], stream);
	  },
	  GeometryCollection: function(object, stream) {
	    var geometries = object.geometries, i = -1, n = geometries.length;
	    while (++i < n) streamGeometry(geometries[i], stream);
	  }
	};
	
	function streamLine(coordinates, stream, closed) {
	  var i = -1, n = coordinates.length - closed, coordinate;
	  stream.lineStart();
	  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
	  stream.lineEnd();
	}
	
	function streamPolygon(coordinates, stream) {
	  var i = -1, n = coordinates.length;
	  stream.polygonStart();
	  while (++i < n) streamLine(coordinates[i], stream, 1);
	  stream.polygonEnd();
	}
	
	var geoStream = function(object, stream) {
	  if (object && streamObjectType.hasOwnProperty(object.type)) {
	    streamObjectType[object.type](object, stream);
	  } else {
	    streamGeometry(object, stream);
	  }
	};
	
	var areaRingSum = adder();
	
	var areaSum = adder();
	var lambda00;
	var phi00;
	var lambda0;
	var cosPhi0;
	var sinPhi0;
	
	var areaStream = {
	  point: noop$2,
	  lineStart: noop$2,
	  lineEnd: noop$2,
	  polygonStart: function() {
	    areaRingSum.reset();
	    areaStream.lineStart = areaRingStart;
	    areaStream.lineEnd = areaRingEnd;
	  },
	  polygonEnd: function() {
	    var areaRing = +areaRingSum;
	    areaSum.add(areaRing < 0 ? tau$4 + areaRing : areaRing);
	    this.lineStart = this.lineEnd = this.point = noop$2;
	  },
	  sphere: function() {
	    areaSum.add(tau$4);
	  }
	};
	
	function areaRingStart() {
	  areaStream.point = areaPointFirst;
	}
	
	function areaRingEnd() {
	  areaPoint(lambda00, phi00);
	}
	
	function areaPointFirst(lambda, phi) {
	  areaStream.point = areaPoint;
	  lambda00 = lambda, phi00 = phi;
	  lambda *= radians, phi *= radians;
	  lambda0 = lambda, cosPhi0 = cos$1(phi = phi / 2 + quarterPi), sinPhi0 = sin$1(phi);
	}
	
	function areaPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  phi = phi / 2 + quarterPi; // half the angular distance from south pole
	
	  // Spherical excess E for a spherical triangle with vertices: south pole,
	  // previous point, current point.  Uses a formula derived from Cagnoli’s
	  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
	  var dLambda = lambda - lambda0,
	      sdLambda = dLambda >= 0 ? 1 : -1,
	      adLambda = sdLambda * dLambda,
	      cosPhi = cos$1(phi),
	      sinPhi = sin$1(phi),
	      k = sinPhi0 * sinPhi,
	      u = cosPhi0 * cosPhi + k * cos$1(adLambda),
	      v = k * sdLambda * sin$1(adLambda);
	  areaRingSum.add(atan2(v, u));
	
	  // Advance the previous points.
	  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
	}
	
	var area$2 = function(object) {
	  areaSum.reset();
	  geoStream(object, areaStream);
	  return areaSum * 2;
	};
	
	function spherical(cartesian) {
	  return [atan2(cartesian[1], cartesian[0]), asin$1(cartesian[2])];
	}
	
	function cartesian(spherical) {
	  var lambda = spherical[0], phi = spherical[1], cosPhi = cos$1(phi);
	  return [cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi)];
	}
	
	function cartesianDot(a, b) {
	  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	}
	
	function cartesianCross(a, b) {
	  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
	}
	
	// TODO return a
	function cartesianAddInPlace(a, b) {
	  a[0] += b[0], a[1] += b[1], a[2] += b[2];
	}
	
	function cartesianScale(vector, k) {
	  return [vector[0] * k, vector[1] * k, vector[2] * k];
	}
	
	// TODO return d
	function cartesianNormalizeInPlace(d) {
	  var l = sqrt$1(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
	  d[0] /= l, d[1] /= l, d[2] /= l;
	}
	
	var lambda0$1;
	var phi0;
	var lambda1;
	var phi1;
	var lambda2;
	var lambda00$1;
	var phi00$1;
	var p0;
	var deltaSum = adder();
	var ranges;
	var range$1;
	
	var boundsStream = {
	  point: boundsPoint,
	  lineStart: boundsLineStart,
	  lineEnd: boundsLineEnd,
	  polygonStart: function() {
	    boundsStream.point = boundsRingPoint;
	    boundsStream.lineStart = boundsRingStart;
	    boundsStream.lineEnd = boundsRingEnd;
	    deltaSum.reset();
	    areaStream.polygonStart();
	  },
	  polygonEnd: function() {
	    areaStream.polygonEnd();
	    boundsStream.point = boundsPoint;
	    boundsStream.lineStart = boundsLineStart;
	    boundsStream.lineEnd = boundsLineEnd;
	    if (areaRingSum < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
	    else if (deltaSum > epsilon$4) phi1 = 90;
	    else if (deltaSum < -epsilon$4) phi0 = -90;
	    range$1[0] = lambda0$1, range$1[1] = lambda1;
	  }
	};
	
	function boundsPoint(lambda, phi) {
	  ranges.push(range$1 = [lambda0$1 = lambda, lambda1 = lambda]);
	  if (phi < phi0) phi0 = phi;
	  if (phi > phi1) phi1 = phi;
	}
	
	function linePoint(lambda, phi) {
	  var p = cartesian([lambda * radians, phi * radians]);
	  if (p0) {
	    var normal = cartesianCross(p0, p),
	        equatorial = [normal[1], -normal[0], 0],
	        inflection = cartesianCross(equatorial, normal);
	    cartesianNormalizeInPlace(inflection);
	    inflection = spherical(inflection);
	    var delta = lambda - lambda2,
	        sign$$1 = delta > 0 ? 1 : -1,
	        lambdai = inflection[0] * degrees$1 * sign$$1,
	        phii,
	        antimeridian = abs(delta) > 180;
	    if (antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
	      phii = inflection[1] * degrees$1;
	      if (phii > phi1) phi1 = phii;
	    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
	      phii = -inflection[1] * degrees$1;
	      if (phii < phi0) phi0 = phii;
	    } else {
	      if (phi < phi0) phi0 = phi;
	      if (phi > phi1) phi1 = phi;
	    }
	    if (antimeridian) {
	      if (lambda < lambda2) {
	        if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
	      } else {
	        if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
	      }
	    } else {
	      if (lambda1 >= lambda0$1) {
	        if (lambda < lambda0$1) lambda0$1 = lambda;
	        if (lambda > lambda1) lambda1 = lambda;
	      } else {
	        if (lambda > lambda2) {
	          if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
	        } else {
	          if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
	        }
	      }
	    }
	  } else {
	    boundsPoint(lambda, phi);
	  }
	  p0 = p, lambda2 = lambda;
	}
	
	function boundsLineStart() {
	  boundsStream.point = linePoint;
	}
	
	function boundsLineEnd() {
	  range$1[0] = lambda0$1, range$1[1] = lambda1;
	  boundsStream.point = boundsPoint;
	  p0 = null;
	}
	
	function boundsRingPoint(lambda, phi) {
	  if (p0) {
	    var delta = lambda - lambda2;
	    deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
	  } else {
	    lambda00$1 = lambda, phi00$1 = phi;
	  }
	  areaStream.point(lambda, phi);
	  linePoint(lambda, phi);
	}
	
	function boundsRingStart() {
	  areaStream.lineStart();
	}
	
	function boundsRingEnd() {
	  boundsRingPoint(lambda00$1, phi00$1);
	  areaStream.lineEnd();
	  if (abs(deltaSum) > epsilon$4) lambda0$1 = -(lambda1 = 180);
	  range$1[0] = lambda0$1, range$1[1] = lambda1;
	  p0 = null;
	}
	
	// Finds the left-right distance between two longitudes.
	// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
	// the distance between ±180° to be 360°.
	function angle(lambda0, lambda1) {
	  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
	}
	
	function rangeCompare(a, b) {
	  return a[0] - b[0];
	}
	
	function rangeContains(range, x) {
	  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
	}
	
	var bounds = function(feature) {
	  var i, n, a, b, merged, deltaMax, delta;
	
	  phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
	  ranges = [];
	  geoStream(feature, boundsStream);
	
	  // First, sort ranges by their minimum longitudes.
	  if (n = ranges.length) {
	    ranges.sort(rangeCompare);
	
	    // Then, merge any ranges that overlap.
	    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
	      b = ranges[i];
	      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
	        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
	        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
	      } else {
	        merged.push(a = b);
	      }
	    }
	
	    // Finally, find the largest gap between the merged ranges.
	    // The final bounding box will be the inverse of this gap.
	    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
	      b = merged[i];
	      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
	    }
	  }
	
	  ranges = range$1 = null;
	
	  return lambda0$1 === Infinity || phi0 === Infinity
	      ? [[NaN, NaN], [NaN, NaN]]
	      : [[lambda0$1, phi0], [lambda1, phi1]];
	};
	
	var W0;
	var W1;
	var X0;
	var Y0;
	var Z0;
	var X1;
	var Y1;
	var Z1;
	var X2;
	var Y2;
	var Z2;
	var lambda00$2;
	var phi00$2;
	var x0;
	var y0;
	var z0; // previous point
	
	var centroidStream = {
	  sphere: noop$2,
	  point: centroidPoint,
	  lineStart: centroidLineStart,
	  lineEnd: centroidLineEnd,
	  polygonStart: function() {
	    centroidStream.lineStart = centroidRingStart;
	    centroidStream.lineEnd = centroidRingEnd;
	  },
	  polygonEnd: function() {
	    centroidStream.lineStart = centroidLineStart;
	    centroidStream.lineEnd = centroidLineEnd;
	  }
	};
	
	// Arithmetic mean of Cartesian vectors.
	function centroidPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos$1(phi);
	  centroidPointCartesian(cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi));
	}
	
	function centroidPointCartesian(x, y, z) {
	  ++W0;
	  X0 += (x - X0) / W0;
	  Y0 += (y - Y0) / W0;
	  Z0 += (z - Z0) / W0;
	}
	
	function centroidLineStart() {
	  centroidStream.point = centroidLinePointFirst;
	}
	
	function centroidLinePointFirst(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos$1(phi);
	  x0 = cosPhi * cos$1(lambda);
	  y0 = cosPhi * sin$1(lambda);
	  z0 = sin$1(phi);
	  centroidStream.point = centroidLinePoint;
	  centroidPointCartesian(x0, y0, z0);
	}
	
	function centroidLinePoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos$1(phi),
	      x = cosPhi * cos$1(lambda),
	      y = cosPhi * sin$1(lambda),
	      z = sin$1(phi),
	      w = atan2(sqrt$1((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
	  W1 += w;
	  X1 += w * (x0 + (x0 = x));
	  Y1 += w * (y0 + (y0 = y));
	  Z1 += w * (z0 + (z0 = z));
	  centroidPointCartesian(x0, y0, z0);
	}
	
	function centroidLineEnd() {
	  centroidStream.point = centroidPoint;
	}
	
	// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
	// J. Applied Mechanics 42, 239 (1975).
	function centroidRingStart() {
	  centroidStream.point = centroidRingPointFirst;
	}
	
	function centroidRingEnd() {
	  centroidRingPoint(lambda00$2, phi00$2);
	  centroidStream.point = centroidPoint;
	}
	
	function centroidRingPointFirst(lambda, phi) {
	  lambda00$2 = lambda, phi00$2 = phi;
	  lambda *= radians, phi *= radians;
	  centroidStream.point = centroidRingPoint;
	  var cosPhi = cos$1(phi);
	  x0 = cosPhi * cos$1(lambda);
	  y0 = cosPhi * sin$1(lambda);
	  z0 = sin$1(phi);
	  centroidPointCartesian(x0, y0, z0);
	}
	
	function centroidRingPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos$1(phi),
	      x = cosPhi * cos$1(lambda),
	      y = cosPhi * sin$1(lambda),
	      z = sin$1(phi),
	      cx = y0 * z - z0 * y,
	      cy = z0 * x - x0 * z,
	      cz = x0 * y - y0 * x,
	      m = sqrt$1(cx * cx + cy * cy + cz * cz),
	      u = x0 * x + y0 * y + z0 * z,
	      v = m && -acos(u) / m, // area weight
	      w = atan2(m, u); // line weight
	  X2 += v * cx;
	  Y2 += v * cy;
	  Z2 += v * cz;
	  W1 += w;
	  X1 += w * (x0 + (x0 = x));
	  Y1 += w * (y0 + (y0 = y));
	  Z1 += w * (z0 + (z0 = z));
	  centroidPointCartesian(x0, y0, z0);
	}
	
	var centroid$1 = function(object) {
	  W0 = W1 =
	  X0 = Y0 = Z0 =
	  X1 = Y1 = Z1 =
	  X2 = Y2 = Z2 = 0;
	  geoStream(object, centroidStream);
	
	  var x = X2,
	      y = Y2,
	      z = Z2,
	      m = x * x + y * y + z * z;
	
	  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
	  if (m < epsilon2$2) {
	    x = X1, y = Y1, z = Z1;
	    // If the feature has zero length, fall back to arithmetic mean of point vectors.
	    if (W1 < epsilon$4) x = X0, y = Y0, z = Z0;
	    m = x * x + y * y + z * z;
	    // If the feature still has an undefined ccentroid, then return.
	    if (m < epsilon2$2) return [NaN, NaN];
	  }
	
	  return [atan2(y, x) * degrees$1, asin$1(z / sqrt$1(m)) * degrees$1];
	};
	
	var constant$13 = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var compose = function(a, b) {
	
	  function compose(x, y) {
	    return x = a(x, y), b(x[0], x[1]);
	  }
	
	  if (a.invert && b.invert) compose.invert = function(x, y) {
	    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
	  };
	
	  return compose;
	};
	
	function rotationIdentity(lambda, phi) {
	  return [lambda > pi$4 ? lambda - tau$4 : lambda < -pi$4 ? lambda + tau$4 : lambda, phi];
	}
	
	rotationIdentity.invert = rotationIdentity;
	
	function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
	  return (deltaLambda %= tau$4) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
	    : rotationLambda(deltaLambda))
	    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
	    : rotationIdentity);
	}
	
	function forwardRotationLambda(deltaLambda) {
	  return function(lambda, phi) {
	    return lambda += deltaLambda, [lambda > pi$4 ? lambda - tau$4 : lambda < -pi$4 ? lambda + tau$4 : lambda, phi];
	  };
	}
	
	function rotationLambda(deltaLambda) {
	  var rotation = forwardRotationLambda(deltaLambda);
	  rotation.invert = forwardRotationLambda(-deltaLambda);
	  return rotation;
	}
	
	function rotationPhiGamma(deltaPhi, deltaGamma) {
	  var cosDeltaPhi = cos$1(deltaPhi),
	      sinDeltaPhi = sin$1(deltaPhi),
	      cosDeltaGamma = cos$1(deltaGamma),
	      sinDeltaGamma = sin$1(deltaGamma);
	
	  function rotation(lambda, phi) {
	    var cosPhi = cos$1(phi),
	        x = cos$1(lambda) * cosPhi,
	        y = sin$1(lambda) * cosPhi,
	        z = sin$1(phi),
	        k = z * cosDeltaPhi + x * sinDeltaPhi;
	    return [
	      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
	      asin$1(k * cosDeltaGamma + y * sinDeltaGamma)
	    ];
	  }
	
	  rotation.invert = function(lambda, phi) {
	    var cosPhi = cos$1(phi),
	        x = cos$1(lambda) * cosPhi,
	        y = sin$1(lambda) * cosPhi,
	        z = sin$1(phi),
	        k = z * cosDeltaGamma - y * sinDeltaGamma;
	    return [
	      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
	      asin$1(k * cosDeltaPhi - x * sinDeltaPhi)
	    ];
	  };
	
	  return rotation;
	}
	
	var rotation = function(rotate) {
	  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);
	
	  function forward(coordinates) {
	    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
	    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
	  }
	
	  forward.invert = function(coordinates) {
	    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
	    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
	  };
	
	  return forward;
	};
	
	// Generates a circle centered at [0°, 0°], with a given radius and precision.
	function circleStream(stream, radius, delta, direction, t0, t1) {
	  if (!delta) return;
	  var cosRadius = cos$1(radius),
	      sinRadius = sin$1(radius),
	      step = direction * delta;
	  if (t0 == null) {
	    t0 = radius + direction * tau$4;
	    t1 = radius - step / 2;
	  } else {
	    t0 = circleRadius(cosRadius, t0);
	    t1 = circleRadius(cosRadius, t1);
	    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau$4;
	  }
	  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
	    point = spherical([cosRadius, -sinRadius * cos$1(t), -sinRadius * sin$1(t)]);
	    stream.point(point[0], point[1]);
	  }
	}
	
	// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
	function circleRadius(cosRadius, point) {
	  point = cartesian(point), point[0] -= cosRadius;
	  cartesianNormalizeInPlace(point);
	  var radius = acos(-point[1]);
	  return ((-point[2] < 0 ? -radius : radius) + tau$4 - epsilon$4) % tau$4;
	}
	
	var circle$1 = function() {
	  var center = constant$13([0, 0]),
	      radius = constant$13(90),
	      precision = constant$13(6),
	      ring,
	      rotate,
	      stream = {point: point};
	
	  function point(x, y) {
	    ring.push(x = rotate(x, y));
	    x[0] *= degrees$1, x[1] *= degrees$1;
	  }
	
	  function circle() {
	    var c = center.apply(this, arguments),
	        r = radius.apply(this, arguments) * radians,
	        p = precision.apply(this, arguments) * radians;
	    ring = [];
	    rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
	    circleStream(stream, r, p, 1);
	    c = {type: "Polygon", coordinates: [ring]};
	    ring = rotate = null;
	    return c;
	  }
	
	  circle.center = function(_) {
	    return arguments.length ? (center = typeof _ === "function" ? _ : constant$13([+_[0], +_[1]]), circle) : center;
	  };
	
	  circle.radius = function(_) {
	    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$13(+_), circle) : radius;
	  };
	
	  circle.precision = function(_) {
	    return arguments.length ? (precision = typeof _ === "function" ? _ : constant$13(+_), circle) : precision;
	  };
	
	  return circle;
	};
	
	var clipBuffer = function() {
	  var lines = [],
	      line;
	  return {
	    point: function(x, y) {
	      line.push([x, y]);
	    },
	    lineStart: function() {
	      lines.push(line = []);
	    },
	    lineEnd: noop$2,
	    rejoin: function() {
	      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
	    },
	    result: function() {
	      var result = lines;
	      lines = [];
	      line = null;
	      return result;
	    }
	  };
	};
	
	var clipLine = function(a, b, x0, y0, x1, y1) {
	  var ax = a[0],
	      ay = a[1],
	      bx = b[0],
	      by = b[1],
	      t0 = 0,
	      t1 = 1,
	      dx = bx - ax,
	      dy = by - ay,
	      r;
	
	  r = x0 - ax;
	  if (!dx && r > 0) return;
	  r /= dx;
	  if (dx < 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  } else if (dx > 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  }
	
	  r = x1 - ax;
	  if (!dx && r < 0) return;
	  r /= dx;
	  if (dx < 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  } else if (dx > 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  }
	
	  r = y0 - ay;
	  if (!dy && r > 0) return;
	  r /= dy;
	  if (dy < 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  } else if (dy > 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  }
	
	  r = y1 - ay;
	  if (!dy && r < 0) return;
	  r /= dy;
	  if (dy < 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  } else if (dy > 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  }
	
	  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
	  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
	  return true;
	};
	
	var pointEqual = function(a, b) {
	  return abs(a[0] - b[0]) < epsilon$4 && abs(a[1] - b[1]) < epsilon$4;
	};
	
	function Intersection(point, points, other, entry) {
	  this.x = point;
	  this.z = points;
	  this.o = other; // another intersection
	  this.e = entry; // is an entry?
	  this.v = false; // visited
	  this.n = this.p = null; // next & previous
	}
	
	// A generalized polygon clipping algorithm: given a polygon that has been cut
	// into its visible line segments, and rejoins the segments by interpolating
	// along the clip edge.
	var clipPolygon = function(segments, compareIntersection, startInside, interpolate, stream) {
	  var subject = [],
	      clip = [],
	      i,
	      n;
	
	  segments.forEach(function(segment) {
	    if ((n = segment.length - 1) <= 0) return;
	    var n, p0 = segment[0], p1 = segment[n], x;
	
	    // If the first and last points of a segment are coincident, then treat as a
	    // closed ring. TODO if all rings are closed, then the winding order of the
	    // exterior ring should be checked.
	    if (pointEqual(p0, p1)) {
	      stream.lineStart();
	      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
	      stream.lineEnd();
	      return;
	    }
	
	    subject.push(x = new Intersection(p0, segment, null, true));
	    clip.push(x.o = new Intersection(p0, null, x, false));
	    subject.push(x = new Intersection(p1, segment, null, false));
	    clip.push(x.o = new Intersection(p1, null, x, true));
	  });
	
	  if (!subject.length) return;
	
	  clip.sort(compareIntersection);
	  link$1(subject);
	  link$1(clip);
	
	  for (i = 0, n = clip.length; i < n; ++i) {
	    clip[i].e = startInside = !startInside;
	  }
	
	  var start = subject[0],
	      points,
	      point;
	
	  while (1) {
	    // Find first unvisited intersection.
	    var current = start,
	        isSubject = true;
	    while (current.v) if ((current = current.n) === start) return;
	    points = current.z;
	    stream.lineStart();
	    do {
	      current.v = current.o.v = true;
	      if (current.e) {
	        if (isSubject) {
	          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
	        } else {
	          interpolate(current.x, current.n.x, 1, stream);
	        }
	        current = current.n;
	      } else {
	        if (isSubject) {
	          points = current.p.z;
	          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
	        } else {
	          interpolate(current.x, current.p.x, -1, stream);
	        }
	        current = current.p;
	      }
	      current = current.o;
	      points = current.z;
	      isSubject = !isSubject;
	    } while (!current.v);
	    stream.lineEnd();
	  }
	};
	
	function link$1(array) {
	  if (!(n = array.length)) return;
	  var n,
	      i = 0,
	      a = array[0],
	      b;
	  while (++i < n) {
	    a.n = b = array[i];
	    b.p = a;
	    a = b;
	  }
	  a.n = b = array[0];
	  b.p = a;
	}
	
	var clipMax = 1e9;
	var clipMin = -clipMax;
	
	// TODO Use d3-polygon’s polygonContains here for the ring check?
	// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?
	
	function clipExtent(x0, y0, x1, y1) {
	
	  function visible(x, y) {
	    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
	  }
	
	  function interpolate(from, to, direction, stream) {
	    var a = 0, a1 = 0;
	    if (from == null
	        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
	        || comparePoint(from, to) < 0 ^ direction > 0) {
	      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
	      while ((a = (a + direction + 4) % 4) !== a1);
	    } else {
	      stream.point(to[0], to[1]);
	    }
	  }
	
	  function corner(p, direction) {
	    return abs(p[0] - x0) < epsilon$4 ? direction > 0 ? 0 : 3
	        : abs(p[0] - x1) < epsilon$4 ? direction > 0 ? 2 : 1
	        : abs(p[1] - y0) < epsilon$4 ? direction > 0 ? 1 : 0
	        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
	  }
	
	  function compareIntersection(a, b) {
	    return comparePoint(a.x, b.x);
	  }
	
	  function comparePoint(a, b) {
	    var ca = corner(a, 1),
	        cb = corner(b, 1);
	    return ca !== cb ? ca - cb
	        : ca === 0 ? b[1] - a[1]
	        : ca === 1 ? a[0] - b[0]
	        : ca === 2 ? a[1] - b[1]
	        : b[0] - a[0];
	  }
	
	  return function(stream) {
	    var activeStream = stream,
	        bufferStream = clipBuffer(),
	        segments,
	        polygon,
	        ring,
	        x__, y__, v__, // first point
	        x_, y_, v_, // previous point
	        first,
	        clean;
	
	    var clipStream = {
	      point: point,
	      lineStart: lineStart,
	      lineEnd: lineEnd,
	      polygonStart: polygonStart,
	      polygonEnd: polygonEnd
	    };
	
	    function point(x, y) {
	      if (visible(x, y)) activeStream.point(x, y);
	    }
	
	    function polygonInside() {
	      var winding = 0;
	
	      for (var i = 0, n = polygon.length; i < n; ++i) {
	        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
	          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
	          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
	          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
	        }
	      }
	
	      return winding;
	    }
	
	    // Buffer geometry within a polygon and then clip it en masse.
	    function polygonStart() {
	      activeStream = bufferStream, segments = [], polygon = [], clean = true;
	    }
	
	    function polygonEnd() {
	      var startInside = polygonInside(),
	          cleanInside = clean && startInside,
	          visible = (segments = merge(segments)).length;
	      if (cleanInside || visible) {
	        stream.polygonStart();
	        if (cleanInside) {
	          stream.lineStart();
	          interpolate(null, null, 1, stream);
	          stream.lineEnd();
	        }
	        if (visible) {
	          clipPolygon(segments, compareIntersection, startInside, interpolate, stream);
	        }
	        stream.polygonEnd();
	      }
	      activeStream = stream, segments = polygon = ring = null;
	    }
	
	    function lineStart() {
	      clipStream.point = linePoint;
	      if (polygon) polygon.push(ring = []);
	      first = true;
	      v_ = false;
	      x_ = y_ = NaN;
	    }
	
	    // TODO rather than special-case polygons, simply handle them separately.
	    // Ideally, coincident intersection points should be jittered to avoid
	    // clipping issues.
	    function lineEnd() {
	      if (segments) {
	        linePoint(x__, y__);
	        if (v__ && v_) bufferStream.rejoin();
	        segments.push(bufferStream.result());
	      }
	      clipStream.point = point;
	      if (v_) activeStream.lineEnd();
	    }
	
	    function linePoint(x, y) {
	      var v = visible(x, y);
	      if (polygon) ring.push([x, y]);
	      if (first) {
	        x__ = x, y__ = y, v__ = v;
	        first = false;
	        if (v) {
	          activeStream.lineStart();
	          activeStream.point(x, y);
	        }
	      } else {
	        if (v && v_) activeStream.point(x, y);
	        else {
	          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
	              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
	          if (clipLine(a, b, x0, y0, x1, y1)) {
	            if (!v_) {
	              activeStream.lineStart();
	              activeStream.point(a[0], a[1]);
	            }
	            activeStream.point(b[0], b[1]);
	            if (!v) activeStream.lineEnd();
	            clean = false;
	          } else if (v) {
	            activeStream.lineStart();
	            activeStream.point(x, y);
	            clean = false;
	          }
	        }
	      }
	      x_ = x, y_ = y, v_ = v;
	    }
	
	    return clipStream;
	  };
	}
	
	var extent$1 = function() {
	  var x0 = 0,
	      y0 = 0,
	      x1 = 960,
	      y1 = 500,
	      cache,
	      cacheStream,
	      clip;
	
	  return clip = {
	    stream: function(stream) {
	      return cache && cacheStream === stream ? cache : cache = clipExtent(x0, y0, x1, y1)(cacheStream = stream);
	    },
	    extent: function(_) {
	      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
	    }
	  };
	};
	
	var lengthSum = adder();
	var lambda0$2;
	var sinPhi0$1;
	var cosPhi0$1;
	
	var lengthStream = {
	  sphere: noop$2,
	  point: noop$2,
	  lineStart: lengthLineStart,
	  lineEnd: noop$2,
	  polygonStart: noop$2,
	  polygonEnd: noop$2
	};
	
	function lengthLineStart() {
	  lengthStream.point = lengthPointFirst;
	  lengthStream.lineEnd = lengthLineEnd;
	}
	
	function lengthLineEnd() {
	  lengthStream.point = lengthStream.lineEnd = noop$2;
	}
	
	function lengthPointFirst(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  lambda0$2 = lambda, sinPhi0$1 = sin$1(phi), cosPhi0$1 = cos$1(phi);
	  lengthStream.point = lengthPoint;
	}
	
	function lengthPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var sinPhi = sin$1(phi),
	      cosPhi = cos$1(phi),
	      delta = abs(lambda - lambda0$2),
	      cosDelta = cos$1(delta),
	      sinDelta = sin$1(delta),
	      x = cosPhi * sinDelta,
	      y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta,
	      z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
	  lengthSum.add(atan2(sqrt$1(x * x + y * y), z));
	  lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
	}
	
	var length$2 = function(object) {
	  lengthSum.reset();
	  geoStream(object, lengthStream);
	  return +lengthSum;
	};
	
	var coordinates = [null, null];
	var object$1 = {type: "LineString", coordinates: coordinates};
	
	var distance = function(a, b) {
	  coordinates[0] = a;
	  coordinates[1] = b;
	  return length$2(object$1);
	};
	
	function graticuleX(y0, y1, dy) {
	  var y = range(y0, y1 - epsilon$4, dy).concat(y1);
	  return function(x) { return y.map(function(y) { return [x, y]; }); };
	}
	
	function graticuleY(x0, x1, dx) {
	  var x = range(x0, x1 - epsilon$4, dx).concat(x1);
	  return function(y) { return x.map(function(x) { return [x, y]; }); };
	}
	
	function graticule() {
	  var x1, x0, X1, X0,
	      y1, y0, Y1, Y0,
	      dx = 10, dy = dx, DX = 90, DY = 360,
	      x, y, X, Y,
	      precision = 2.5;
	
	  function graticule() {
	    return {type: "MultiLineString", coordinates: lines()};
	  }
	
	  function lines() {
	    return range(ceil(X0 / DX) * DX, X1, DX).map(X)
	        .concat(range(ceil(Y0 / DY) * DY, Y1, DY).map(Y))
	        .concat(range(ceil(x0 / dx) * dx, x1, dx).filter(function(x) { return abs(x % DX) > epsilon$4; }).map(x))
	        .concat(range(ceil(y0 / dy) * dy, y1, dy).filter(function(y) { return abs(y % DY) > epsilon$4; }).map(y));
	  }
	
	  graticule.lines = function() {
	    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
	  };
	
	  graticule.outline = function() {
	    return {
	      type: "Polygon",
	      coordinates: [
	        X(X0).concat(
	        Y(Y1).slice(1),
	        X(X1).reverse().slice(1),
	        Y(Y0).reverse().slice(1))
	      ]
	    };
	  };
	
	  graticule.extent = function(_) {
	    if (!arguments.length) return graticule.extentMinor();
	    return graticule.extentMajor(_).extentMinor(_);
	  };
	
	  graticule.extentMajor = function(_) {
	    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
	    X0 = +_[0][0], X1 = +_[1][0];
	    Y0 = +_[0][1], Y1 = +_[1][1];
	    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
	    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
	    return graticule.precision(precision);
	  };
	
	  graticule.extentMinor = function(_) {
	    if (!arguments.length) return [[x0, y0], [x1, y1]];
	    x0 = +_[0][0], x1 = +_[1][0];
	    y0 = +_[0][1], y1 = +_[1][1];
	    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
	    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
	    return graticule.precision(precision);
	  };
	
	  graticule.step = function(_) {
	    if (!arguments.length) return graticule.stepMinor();
	    return graticule.stepMajor(_).stepMinor(_);
	  };
	
	  graticule.stepMajor = function(_) {
	    if (!arguments.length) return [DX, DY];
	    DX = +_[0], DY = +_[1];
	    return graticule;
	  };
	
	  graticule.stepMinor = function(_) {
	    if (!arguments.length) return [dx, dy];
	    dx = +_[0], dy = +_[1];
	    return graticule;
	  };
	
	  graticule.precision = function(_) {
	    if (!arguments.length) return precision;
	    precision = +_;
	    x = graticuleX(y0, y1, 90);
	    y = graticuleY(x0, x1, precision);
	    X = graticuleX(Y0, Y1, 90);
	    Y = graticuleY(X0, X1, precision);
	    return graticule;
	  };
	
	  return graticule
	      .extentMajor([[-180, -90 + epsilon$4], [180, 90 - epsilon$4]])
	      .extentMinor([[-180, -80 - epsilon$4], [180, 80 + epsilon$4]]);
	}
	
	function graticule10() {
	  return graticule()();
	}
	
	var interpolate$2 = function(a, b) {
	  var x0 = a[0] * radians,
	      y0 = a[1] * radians,
	      x1 = b[0] * radians,
	      y1 = b[1] * radians,
	      cy0 = cos$1(y0),
	      sy0 = sin$1(y0),
	      cy1 = cos$1(y1),
	      sy1 = sin$1(y1),
	      kx0 = cy0 * cos$1(x0),
	      ky0 = cy0 * sin$1(x0),
	      kx1 = cy1 * cos$1(x1),
	      ky1 = cy1 * sin$1(x1),
	      d = 2 * asin$1(sqrt$1(haversin(y1 - y0) + cy0 * cy1 * haversin(x1 - x0))),
	      k = sin$1(d);
	
	  var interpolate = d ? function(t) {
	    var B = sin$1(t *= d) / k,
	        A = sin$1(d - t) / k,
	        x = A * kx0 + B * kx1,
	        y = A * ky0 + B * ky1,
	        z = A * sy0 + B * sy1;
	    return [
	      atan2(y, x) * degrees$1,
	      atan2(z, sqrt$1(x * x + y * y)) * degrees$1
	    ];
	  } : function() {
	    return [x0 * degrees$1, y0 * degrees$1];
	  };
	
	  interpolate.distance = d;
	
	  return interpolate;
	};
	
	var identity$7 = function(x) {
	  return x;
	};
	
	var areaSum$1 = adder();
	var areaRingSum$1 = adder();
	var x00;
	var y00;
	var x0$1;
	var y0$1;
	
	var areaStream$1 = {
	  point: noop$2,
	  lineStart: noop$2,
	  lineEnd: noop$2,
	  polygonStart: function() {
	    areaStream$1.lineStart = areaRingStart$1;
	    areaStream$1.lineEnd = areaRingEnd$1;
	  },
	  polygonEnd: function() {
	    areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop$2;
	    areaSum$1.add(abs(areaRingSum$1));
	    areaRingSum$1.reset();
	  },
	  result: function() {
	    var area = areaSum$1 / 2;
	    areaSum$1.reset();
	    return area;
	  }
	};
	
	function areaRingStart$1() {
	  areaStream$1.point = areaPointFirst$1;
	}
	
	function areaPointFirst$1(x, y) {
	  areaStream$1.point = areaPoint$1;
	  x00 = x0$1 = x, y00 = y0$1 = y;
	}
	
	function areaPoint$1(x, y) {
	  areaRingSum$1.add(y0$1 * x - x0$1 * y);
	  x0$1 = x, y0$1 = y;
	}
	
	function areaRingEnd$1() {
	  areaPoint$1(x00, y00);
	}
	
	var x0$2 = Infinity;
	var y0$2 = x0$2;
	var x1 = -x0$2;
	var y1 = x1;
	
	var boundsStream$1 = {
	  point: boundsPoint$1,
	  lineStart: noop$2,
	  lineEnd: noop$2,
	  polygonStart: noop$2,
	  polygonEnd: noop$2,
	  result: function() {
	    var bounds = [[x0$2, y0$2], [x1, y1]];
	    x1 = y1 = -(y0$2 = x0$2 = Infinity);
	    return bounds;
	  }
	};
	
	function boundsPoint$1(x, y) {
	  if (x < x0$2) x0$2 = x;
	  if (x > x1) x1 = x;
	  if (y < y0$2) y0$2 = y;
	  if (y > y1) y1 = y;
	}
	
	// TODO Enforce positive area for exterior, negative area for interior?
	
	var X0$1 = 0;
	var Y0$1 = 0;
	var Z0$1 = 0;
	var X1$1 = 0;
	var Y1$1 = 0;
	var Z1$1 = 0;
	var X2$1 = 0;
	var Y2$1 = 0;
	var Z2$1 = 0;
	var x00$1;
	var y00$1;
	var x0$3;
	var y0$3;
	
	var centroidStream$1 = {
	  point: centroidPoint$1,
	  lineStart: centroidLineStart$1,
	  lineEnd: centroidLineEnd$1,
	  polygonStart: function() {
	    centroidStream$1.lineStart = centroidRingStart$1;
	    centroidStream$1.lineEnd = centroidRingEnd$1;
	  },
	  polygonEnd: function() {
	    centroidStream$1.point = centroidPoint$1;
	    centroidStream$1.lineStart = centroidLineStart$1;
	    centroidStream$1.lineEnd = centroidLineEnd$1;
	  },
	  result: function() {
	    var centroid = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1]
	        : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1]
	        : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1]
	        : [NaN, NaN];
	    X0$1 = Y0$1 = Z0$1 =
	    X1$1 = Y1$1 = Z1$1 =
	    X2$1 = Y2$1 = Z2$1 = 0;
	    return centroid;
	  }
	};
	
	function centroidPoint$1(x, y) {
	  X0$1 += x;
	  Y0$1 += y;
	  ++Z0$1;
	}
	
	function centroidLineStart$1() {
	  centroidStream$1.point = centroidPointFirstLine;
	}
	
	function centroidPointFirstLine(x, y) {
	  centroidStream$1.point = centroidPointLine;
	  centroidPoint$1(x0$3 = x, y0$3 = y);
	}
	
	function centroidPointLine(x, y) {
	  var dx = x - x0$3, dy = y - y0$3, z = sqrt$1(dx * dx + dy * dy);
	  X1$1 += z * (x0$3 + x) / 2;
	  Y1$1 += z * (y0$3 + y) / 2;
	  Z1$1 += z;
	  centroidPoint$1(x0$3 = x, y0$3 = y);
	}
	
	function centroidLineEnd$1() {
	  centroidStream$1.point = centroidPoint$1;
	}
	
	function centroidRingStart$1() {
	  centroidStream$1.point = centroidPointFirstRing;
	}
	
	function centroidRingEnd$1() {
	  centroidPointRing(x00$1, y00$1);
	}
	
	function centroidPointFirstRing(x, y) {
	  centroidStream$1.point = centroidPointRing;
	  centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
	}
	
	function centroidPointRing(x, y) {
	  var dx = x - x0$3,
	      dy = y - y0$3,
	      z = sqrt$1(dx * dx + dy * dy);
	
	  X1$1 += z * (x0$3 + x) / 2;
	  Y1$1 += z * (y0$3 + y) / 2;
	  Z1$1 += z;
	
	  z = y0$3 * x - x0$3 * y;
	  X2$1 += z * (x0$3 + x);
	  Y2$1 += z * (y0$3 + y);
	  Z2$1 += z * 3;
	  centroidPoint$1(x0$3 = x, y0$3 = y);
	}
	
	function PathContext(context) {
	  this._context = context;
	}
	
	PathContext.prototype = {
	  _radius: 4.5,
	  pointRadius: function(_) {
	    return this._radius = _, this;
	  },
	  polygonStart: function() {
	    this._line = 0;
	  },
	  polygonEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line === 0) this._context.closePath();
	    this._point = NaN;
	  },
	  point: function(x, y) {
	    switch (this._point) {
	      case 0: {
	        this._context.moveTo(x, y);
	        this._point = 1;
	        break;
	      }
	      case 1: {
	        this._context.lineTo(x, y);
	        break;
	      }
	      default: {
	        this._context.moveTo(x + this._radius, y);
	        this._context.arc(x, y, this._radius, 0, tau$4);
	        break;
	      }
	    }
	  },
	  result: noop$2
	};
	
	function PathString() {
	  this._string = [];
	}
	
	PathString.prototype = {
	  _circle: circle$2(4.5),
	  pointRadius: function(_) {
	    return this._circle = circle$2(_), this;
	  },
	  polygonStart: function() {
	    this._line = 0;
	  },
	  polygonEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line === 0) this._string.push("Z");
	    this._point = NaN;
	  },
	  point: function(x, y) {
	    switch (this._point) {
	      case 0: {
	        this._string.push("M", x, ",", y);
	        this._point = 1;
	        break;
	      }
	      case 1: {
	        this._string.push("L", x, ",", y);
	        break;
	      }
	      default: {
	        this._string.push("M", x, ",", y, this._circle);
	        break;
	      }
	    }
	  },
	  result: function() {
	    if (this._string.length) {
	      var result = this._string.join("");
	      this._string = [];
	      return result;
	    }
	  }
	};
	
	function circle$2(radius) {
	  return "m0," + radius
	      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
	      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
	      + "z";
	}
	
	var index$3 = function(projection, context) {
	  var pointRadius = 4.5,
	      projectionStream,
	      contextStream;
	
	  function path(object) {
	    if (object) {
	      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
	      geoStream(object, projectionStream(contextStream));
	    }
	    return contextStream.result();
	  }
	
	  path.area = function(object) {
	    geoStream(object, projectionStream(areaStream$1));
	    return areaStream$1.result();
	  };
	
	  path.bounds = function(object) {
	    geoStream(object, projectionStream(boundsStream$1));
	    return boundsStream$1.result();
	  };
	
	  path.centroid = function(object) {
	    geoStream(object, projectionStream(centroidStream$1));
	    return centroidStream$1.result();
	  };
	
	  path.projection = function(_) {
	    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$7) : (projection = _).stream, path) : projection;
	  };
	
	  path.context = function(_) {
	    if (!arguments.length) return context;
	    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
	    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
	    return path;
	  };
	
	  path.pointRadius = function(_) {
	    if (!arguments.length) return pointRadius;
	    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
	    return path;
	  };
	
	  return path.projection(projection).context(context);
	};
	
	var sum$2 = adder();
	
	var polygonContains = function(polygon, point) {
	  var lambda = point[0],
	      phi = point[1],
	      normal = [sin$1(lambda), -cos$1(lambda), 0],
	      angle = 0,
	      winding = 0;
	
	  sum$2.reset();
	
	  for (var i = 0, n = polygon.length; i < n; ++i) {
	    if (!(m = (ring = polygon[i]).length)) continue;
	    var ring,
	        m,
	        point0 = ring[m - 1],
	        lambda0 = point0[0],
	        phi0 = point0[1] / 2 + quarterPi,
	        sinPhi0 = sin$1(phi0),
	        cosPhi0 = cos$1(phi0);
	
	    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
	      var point1 = ring[j],
	          lambda1 = point1[0],
	          phi1 = point1[1] / 2 + quarterPi,
	          sinPhi1 = sin$1(phi1),
	          cosPhi1 = cos$1(phi1),
	          delta = lambda1 - lambda0,
	          sign$$1 = delta >= 0 ? 1 : -1,
	          absDelta = sign$$1 * delta,
	          antimeridian = absDelta > pi$4,
	          k = sinPhi0 * sinPhi1;
	
	      sum$2.add(atan2(k * sign$$1 * sin$1(absDelta), cosPhi0 * cosPhi1 + k * cos$1(absDelta)));
	      angle += antimeridian ? delta + sign$$1 * tau$4 : delta;
	
	      // Are the longitudes either side of the point’s meridian (lambda),
	      // and are the latitudes smaller than the parallel (phi)?
	      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
	        var arc = cartesianCross(cartesian(point0), cartesian(point1));
	        cartesianNormalizeInPlace(arc);
	        var intersection = cartesianCross(normal, arc);
	        cartesianNormalizeInPlace(intersection);
	        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin$1(intersection[2]);
	        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
	          winding += antimeridian ^ delta >= 0 ? 1 : -1;
	        }
	      }
	    }
	  }
	
	  // First, determine whether the South pole is inside or outside:
	  //
	  // It is inside if:
	  // * the polygon winds around it in a clockwise direction.
	  // * the polygon does not (cumulatively) wind around it, but has a negative
	  //   (counter-clockwise) area.
	  //
	  // Second, count the (signed) number of times a segment crosses a lambda
	  // from the point to the South pole.  If it is zero, then the point is the
	  // same side as the South pole.
	
	  return (angle < -epsilon$4 || angle < epsilon$4 && sum$2 < -epsilon$4) ^ (winding & 1);
	};
	
	var clip = function(pointVisible, clipLine, interpolate, start) {
	  return function(rotate, sink) {
	    var line = clipLine(sink),
	        rotatedStart = rotate.invert(start[0], start[1]),
	        ringBuffer = clipBuffer(),
	        ringSink = clipLine(ringBuffer),
	        polygonStarted = false,
	        polygon,
	        segments,
	        ring;
	
	    var clip = {
	      point: point,
	      lineStart: lineStart,
	      lineEnd: lineEnd,
	      polygonStart: function() {
	        clip.point = pointRing;
	        clip.lineStart = ringStart;
	        clip.lineEnd = ringEnd;
	        segments = [];
	        polygon = [];
	      },
	      polygonEnd: function() {
	        clip.point = point;
	        clip.lineStart = lineStart;
	        clip.lineEnd = lineEnd;
	        segments = merge(segments);
	        var startInside = polygonContains(polygon, rotatedStart);
	        if (segments.length) {
	          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	          clipPolygon(segments, compareIntersection, startInside, interpolate, sink);
	        } else if (startInside) {
	          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	          sink.lineStart();
	          interpolate(null, null, 1, sink);
	          sink.lineEnd();
	        }
	        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
	        segments = polygon = null;
	      },
	      sphere: function() {
	        sink.polygonStart();
	        sink.lineStart();
	        interpolate(null, null, 1, sink);
	        sink.lineEnd();
	        sink.polygonEnd();
	      }
	    };
	
	    function point(lambda, phi) {
	      var point = rotate(lambda, phi);
	      if (pointVisible(lambda = point[0], phi = point[1])) sink.point(lambda, phi);
	    }
	
	    function pointLine(lambda, phi) {
	      var point = rotate(lambda, phi);
	      line.point(point[0], point[1]);
	    }
	
	    function lineStart() {
	      clip.point = pointLine;
	      line.lineStart();
	    }
	
	    function lineEnd() {
	      clip.point = point;
	      line.lineEnd();
	    }
	
	    function pointRing(lambda, phi) {
	      ring.push([lambda, phi]);
	      var point = rotate(lambda, phi);
	      ringSink.point(point[0], point[1]);
	    }
	
	    function ringStart() {
	      ringSink.lineStart();
	      ring = [];
	    }
	
	    function ringEnd() {
	      pointRing(ring[0][0], ring[0][1]);
	      ringSink.lineEnd();
	
	      var clean = ringSink.clean(),
	          ringSegments = ringBuffer.result(),
	          i, n = ringSegments.length, m,
	          segment,
	          point;
	
	      ring.pop();
	      polygon.push(ring);
	      ring = null;
	
	      if (!n) return;
	
	      // No intersections.
	      if (clean & 1) {
	        segment = ringSegments[0];
	        if ((m = segment.length - 1) > 0) {
	          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	          sink.lineStart();
	          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
	          sink.lineEnd();
	        }
	        return;
	      }
	
	      // Rejoin connected segments.
	      // TODO reuse ringBuffer.rejoin()?
	      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
	
	      segments.push(ringSegments.filter(validSegment));
	    }
	
	    return clip;
	  };
	};
	
	function validSegment(segment) {
	  return segment.length > 1;
	}
	
	// Intersections are sorted along the clip edge. For both antimeridian cutting
	// and circle clipping, the same comparison is used.
	function compareIntersection(a, b) {
	  return ((a = a.x)[0] < 0 ? a[1] - halfPi$3 - epsilon$4 : halfPi$3 - a[1])
	       - ((b = b.x)[0] < 0 ? b[1] - halfPi$3 - epsilon$4 : halfPi$3 - b[1]);
	}
	
	var clipAntimeridian = clip(
	  function() { return true; },
	  clipAntimeridianLine,
	  clipAntimeridianInterpolate,
	  [-pi$4, -halfPi$3]
	);
	
	// Takes a line and cuts into visible segments. Return values: 0 - there were
	// intersections or the line was empty; 1 - no intersections; 2 - there were
	// intersections, and the first and last segments should be rejoined.
	function clipAntimeridianLine(stream) {
	  var lambda0 = NaN,
	      phi0 = NaN,
	      sign0 = NaN,
	      clean; // no intersections
	
	  return {
	    lineStart: function() {
	      stream.lineStart();
	      clean = 1;
	    },
	    point: function(lambda1, phi1) {
	      var sign1 = lambda1 > 0 ? pi$4 : -pi$4,
	          delta = abs(lambda1 - lambda0);
	      if (abs(delta - pi$4) < epsilon$4) { // line crosses a pole
	        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi$3 : -halfPi$3);
	        stream.point(sign0, phi0);
	        stream.lineEnd();
	        stream.lineStart();
	        stream.point(sign1, phi0);
	        stream.point(lambda1, phi0);
	        clean = 0;
	      } else if (sign0 !== sign1 && delta >= pi$4) { // line crosses antimeridian
	        if (abs(lambda0 - sign0) < epsilon$4) lambda0 -= sign0 * epsilon$4; // handle degeneracies
	        if (abs(lambda1 - sign1) < epsilon$4) lambda1 -= sign1 * epsilon$4;
	        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
	        stream.point(sign0, phi0);
	        stream.lineEnd();
	        stream.lineStart();
	        stream.point(sign1, phi0);
	        clean = 0;
	      }
	      stream.point(lambda0 = lambda1, phi0 = phi1);
	      sign0 = sign1;
	    },
	    lineEnd: function() {
	      stream.lineEnd();
	      lambda0 = phi0 = NaN;
	    },
	    clean: function() {
	      return 2 - clean; // if intersections, rejoin first and last segments
	    }
	  };
	}
	
	function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
	  var cosPhi0,
	      cosPhi1,
	      sinLambda0Lambda1 = sin$1(lambda0 - lambda1);
	  return abs(sinLambda0Lambda1) > epsilon$4
	      ? atan((sin$1(phi0) * (cosPhi1 = cos$1(phi1)) * sin$1(lambda1)
	          - sin$1(phi1) * (cosPhi0 = cos$1(phi0)) * sin$1(lambda0))
	          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
	      : (phi0 + phi1) / 2;
	}
	
	function clipAntimeridianInterpolate(from, to, direction, stream) {
	  var phi;
	  if (from == null) {
	    phi = direction * halfPi$3;
	    stream.point(-pi$4, phi);
	    stream.point(0, phi);
	    stream.point(pi$4, phi);
	    stream.point(pi$4, 0);
	    stream.point(pi$4, -phi);
	    stream.point(0, -phi);
	    stream.point(-pi$4, -phi);
	    stream.point(-pi$4, 0);
	    stream.point(-pi$4, phi);
	  } else if (abs(from[0] - to[0]) > epsilon$4) {
	    var lambda = from[0] < to[0] ? pi$4 : -pi$4;
	    phi = direction * lambda / 2;
	    stream.point(-lambda, phi);
	    stream.point(0, phi);
	    stream.point(lambda, phi);
	  } else {
	    stream.point(to[0], to[1]);
	  }
	}
	
	var clipCircle = function(radius, delta) {
	  var cr = cos$1(radius),
	      smallRadius = cr > 0,
	      notHemisphere = abs(cr) > epsilon$4; // TODO optimise for this common case
	
	  function interpolate(from, to, direction, stream) {
	    circleStream(stream, radius, delta, direction, from, to);
	  }
	
	  function visible(lambda, phi) {
	    return cos$1(lambda) * cos$1(phi) > cr;
	  }
	
	  // Takes a line and cuts into visible segments. Return values used for polygon
	  // clipping: 0 - there were intersections or the line was empty; 1 - no
	  // intersections 2 - there were intersections, and the first and last segments
	  // should be rejoined.
	  function clipLine(stream) {
	    var point0, // previous point
	        c0, // code for previous point
	        v0, // visibility of previous point
	        v00, // visibility of first point
	        clean; // no intersections
	    return {
	      lineStart: function() {
	        v00 = v0 = false;
	        clean = 1;
	      },
	      point: function(lambda, phi) {
	        var point1 = [lambda, phi],
	            point2,
	            v = visible(lambda, phi),
	            c = smallRadius
	              ? v ? 0 : code(lambda, phi)
	              : v ? code(lambda + (lambda < 0 ? pi$4 : -pi$4), phi) : 0;
	        if (!point0 && (v00 = v0 = v)) stream.lineStart();
	        // Handle degeneracies.
	        // TODO ignore if not clipping polygons.
	        if (v !== v0) {
	          point2 = intersect(point0, point1);
	          if (pointEqual(point0, point2) || pointEqual(point1, point2)) {
	            point1[0] += epsilon$4;
	            point1[1] += epsilon$4;
	            v = visible(point1[0], point1[1]);
	          }
	        }
	        if (v !== v0) {
	          clean = 0;
	          if (v) {
	            // outside going in
	            stream.lineStart();
	            point2 = intersect(point1, point0);
	            stream.point(point2[0], point2[1]);
	          } else {
	            // inside going out
	            point2 = intersect(point0, point1);
	            stream.point(point2[0], point2[1]);
	            stream.lineEnd();
	          }
	          point0 = point2;
	        } else if (notHemisphere && point0 && smallRadius ^ v) {
	          var t;
	          // If the codes for two points are different, or are both zero,
	          // and there this segment intersects with the small circle.
	          if (!(c & c0) && (t = intersect(point1, point0, true))) {
	            clean = 0;
	            if (smallRadius) {
	              stream.lineStart();
	              stream.point(t[0][0], t[0][1]);
	              stream.point(t[1][0], t[1][1]);
	              stream.lineEnd();
	            } else {
	              stream.point(t[1][0], t[1][1]);
	              stream.lineEnd();
	              stream.lineStart();
	              stream.point(t[0][0], t[0][1]);
	            }
	          }
	        }
	        if (v && (!point0 || !pointEqual(point0, point1))) {
	          stream.point(point1[0], point1[1]);
	        }
	        point0 = point1, v0 = v, c0 = c;
	      },
	      lineEnd: function() {
	        if (v0) stream.lineEnd();
	        point0 = null;
	      },
	      // Rejoin first and last segments if there were intersections and the first
	      // and last points were visible.
	      clean: function() {
	        return clean | ((v00 && v0) << 1);
	      }
	    };
	  }
	
	  // Intersects the great circle between a and b with the clip circle.
	  function intersect(a, b, two) {
	    var pa = cartesian(a),
	        pb = cartesian(b);
	
	    // We have two planes, n1.p = d1 and n2.p = d2.
	    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
	    var n1 = [1, 0, 0], // normal
	        n2 = cartesianCross(pa, pb),
	        n2n2 = cartesianDot(n2, n2),
	        n1n2 = n2[0], // cartesianDot(n1, n2),
	        determinant = n2n2 - n1n2 * n1n2;
	
	    // Two polar points.
	    if (!determinant) return !two && a;
	
	    var c1 =  cr * n2n2 / determinant,
	        c2 = -cr * n1n2 / determinant,
	        n1xn2 = cartesianCross(n1, n2),
	        A = cartesianScale(n1, c1),
	        B = cartesianScale(n2, c2);
	    cartesianAddInPlace(A, B);
	
	    // Solve |p(t)|^2 = 1.
	    var u = n1xn2,
	        w = cartesianDot(A, u),
	        uu = cartesianDot(u, u),
	        t2 = w * w - uu * (cartesianDot(A, A) - 1);
	
	    if (t2 < 0) return;
	
	    var t = sqrt$1(t2),
	        q = cartesianScale(u, (-w - t) / uu);
	    cartesianAddInPlace(q, A);
	    q = spherical(q);
	
	    if (!two) return q;
	
	    // Two intersection points.
	    var lambda0 = a[0],
	        lambda1 = b[0],
	        phi0 = a[1],
	        phi1 = b[1],
	        z;
	
	    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;
	
	    var delta = lambda1 - lambda0,
	        polar = abs(delta - pi$4) < epsilon$4,
	        meridian = polar || delta < epsilon$4;
	
	    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;
	
	    // Check that the first point is between a and b.
	    if (meridian
	        ? polar
	          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon$4 ? phi0 : phi1)
	          : phi0 <= q[1] && q[1] <= phi1
	        : delta > pi$4 ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
	      var q1 = cartesianScale(u, (-w + t) / uu);
	      cartesianAddInPlace(q1, A);
	      return [q, spherical(q1)];
	    }
	  }
	
	  // Generates a 4-bit vector representing the location of a point relative to
	  // the small circle's bounding box.
	  function code(lambda, phi) {
	    var r = smallRadius ? radius : pi$4 - radius,
	        code = 0;
	    if (lambda < -r) code |= 1; // left
	    else if (lambda > r) code |= 2; // right
	    if (phi < -r) code |= 4; // below
	    else if (phi > r) code |= 8; // above
	    return code;
	  }
	
	  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi$4, radius - pi$4]);
	};
	
	var transform$1 = function(methods) {
	  return {
	    stream: transformer(methods)
	  };
	};
	
	function transformer(methods) {
	  return function(stream) {
	    var s = new TransformStream;
	    for (var key in methods) s[key] = methods[key];
	    s.stream = stream;
	    return s;
	  };
	}
	
	function TransformStream() {}
	
	TransformStream.prototype = {
	  constructor: TransformStream,
	  point: function(x, y) { this.stream.point(x, y); },
	  sphere: function() { this.stream.sphere(); },
	  lineStart: function() { this.stream.lineStart(); },
	  lineEnd: function() { this.stream.lineEnd(); },
	  polygonStart: function() { this.stream.polygonStart(); },
	  polygonEnd: function() { this.stream.polygonEnd(); }
	};
	
	function fitExtent(projection, extent, object) {
	  var w = extent[1][0] - extent[0][0],
	      h = extent[1][1] - extent[0][1],
	      clip = projection.clipExtent && projection.clipExtent();
	
	  projection
	      .scale(150)
	      .translate([0, 0]);
	
	  if (clip != null) projection.clipExtent(null);
	
	  geoStream(object, projection.stream(boundsStream$1));
	
	  var b = boundsStream$1.result(),
	      k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
	      x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
	      y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
	
	  if (clip != null) projection.clipExtent(clip);
	
	  return projection
	      .scale(k * 150)
	      .translate([x, y]);
	}
	
	function fitSize(projection, size, object) {
	  return fitExtent(projection, [[0, 0], size], object);
	}
	
	var maxDepth = 16;
	var cosMinDistance = cos$1(30 * radians); // cos(minimum angular distance)
	
	var resample = function(project, delta2) {
	  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
	};
	
	function resampleNone(project) {
	  return transformer({
	    point: function(x, y) {
	      x = project(x, y);
	      this.stream.point(x[0], x[1]);
	    }
	  });
	}
	
	function resample$1(project, delta2) {
	
	  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
	    var dx = x1 - x0,
	        dy = y1 - y0,
	        d2 = dx * dx + dy * dy;
	    if (d2 > 4 * delta2 && depth--) {
	      var a = a0 + a1,
	          b = b0 + b1,
	          c = c0 + c1,
	          m = sqrt$1(a * a + b * b + c * c),
	          phi2 = asin$1(c /= m),
	          lambda2 = abs(abs(c) - 1) < epsilon$4 || abs(lambda0 - lambda1) < epsilon$4 ? (lambda0 + lambda1) / 2 : atan2(b, a),
	          p = project(lambda2, phi2),
	          x2 = p[0],
	          y2 = p[1],
	          dx2 = x2 - x0,
	          dy2 = y2 - y0,
	          dz = dy * dx2 - dx * dy2;
	      if (dz * dz / d2 > delta2 // perpendicular projected distance
	          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
	          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
	        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
	        stream.point(x2, y2);
	        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
	      }
	    }
	  }
	  return function(stream) {
	    var lambda00, x00, y00, a00, b00, c00, // first point
	        lambda0, x0, y0, a0, b0, c0; // previous point
	
	    var resampleStream = {
	      point: point,
	      lineStart: lineStart,
	      lineEnd: lineEnd,
	      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
	      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
	    };
	
	    function point(x, y) {
	      x = project(x, y);
	      stream.point(x[0], x[1]);
	    }
	
	    function lineStart() {
	      x0 = NaN;
	      resampleStream.point = linePoint;
	      stream.lineStart();
	    }
	
	    function linePoint(lambda, phi) {
	      var c = cartesian([lambda, phi]), p = project(lambda, phi);
	      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
	      stream.point(x0, y0);
	    }
	
	    function lineEnd() {
	      resampleStream.point = point;
	      stream.lineEnd();
	    }
	
	    function ringStart() {
	      lineStart();
	      resampleStream.point = ringPoint;
	      resampleStream.lineEnd = ringEnd;
	    }
	
	    function ringPoint(lambda, phi) {
	      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
	      resampleStream.point = linePoint;
	    }
	
	    function ringEnd() {
	      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
	      resampleStream.lineEnd = lineEnd;
	      lineEnd();
	    }
	
	    return resampleStream;
	  };
	}
	
	var transformRadians = transformer({
	  point: function(x, y) {
	    this.stream.point(x * radians, y * radians);
	  }
	});
	
	function projection(project) {
	  return projectionMutator(function() { return project; })();
	}
	
	function projectionMutator(projectAt) {
	  var project,
	      k = 150, // scale
	      x = 480, y = 250, // translate
	      dx, dy, lambda = 0, phi = 0, // center
	      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, projectRotate, // rotate
	      theta = null, preclip = clipAntimeridian, // clip angle
	      x0 = null, y0, x1, y1, postclip = identity$7, // clip extent
	      delta2 = 0.5, projectResample = resample(projectTransform, delta2), // precision
	      cache,
	      cacheStream;
	
	  function projection(point) {
	    point = projectRotate(point[0] * radians, point[1] * radians);
	    return [point[0] * k + dx, dy - point[1] * k];
	  }
	
	  function invert(point) {
	    point = projectRotate.invert((point[0] - dx) / k, (dy - point[1]) / k);
	    return point && [point[0] * degrees$1, point[1] * degrees$1];
	  }
	
	  function projectTransform(x, y) {
	    return x = project(x, y), [x[0] * k + dx, dy - x[1] * k];
	  }
	
	  projection.stream = function(stream) {
	    return cache && cacheStream === stream ? cache : cache = transformRadians(preclip(rotate, projectResample(postclip(cacheStream = stream))));
	  };
	
	  projection.clipAngle = function(_) {
	    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians, 6 * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees$1;
	  };
	
	  projection.clipExtent = function(_) {
	    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$7) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	  };
	
	  projection.scale = function(_) {
	    return arguments.length ? (k = +_, recenter()) : k;
	  };
	
	  projection.translate = function(_) {
	    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
	  };
	
	  projection.center = function(_) {
	    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees$1, phi * degrees$1];
	  };
	
	  projection.rotate = function(_) {
	    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees$1, deltaPhi * degrees$1, deltaGamma * degrees$1];
	  };
	
	  projection.precision = function(_) {
	    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt$1(delta2);
	  };
	
	  projection.fitExtent = function(extent, object) {
	    return fitExtent(projection, extent, object);
	  };
	
	  projection.fitSize = function(size, object) {
	    return fitSize(projection, size, object);
	  };
	
	  function recenter() {
	    projectRotate = compose(rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma), project);
	    var center = project(lambda, phi);
	    dx = x - center[0] * k;
	    dy = y + center[1] * k;
	    return reset();
	  }
	
	  function reset() {
	    cache = cacheStream = null;
	    return projection;
	  }
	
	  return function() {
	    project = projectAt.apply(this, arguments);
	    projection.invert = project.invert && invert;
	    return recenter();
	  };
	}
	
	function conicProjection(projectAt) {
	  var phi0 = 0,
	      phi1 = pi$4 / 3,
	      m = projectionMutator(projectAt),
	      p = m(phi0, phi1);
	
	  p.parallels = function(_) {
	    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees$1, phi1 * degrees$1];
	  };
	
	  return p;
	}
	
	function cylindricalEqualAreaRaw(phi0) {
	  var cosPhi0 = cos$1(phi0);
	
	  function forward(lambda, phi) {
	    return [lambda * cosPhi0, sin$1(phi) / cosPhi0];
	  }
	
	  forward.invert = function(x, y) {
	    return [x / cosPhi0, asin$1(y * cosPhi0)];
	  };
	
	  return forward;
	}
	
	function conicEqualAreaRaw(y0, y1) {
	  var sy0 = sin$1(y0), n = (sy0 + sin$1(y1)) / 2;
	
	  // Are the parallels symmetrical around the Equator?
	  if (abs(n) < epsilon$4) return cylindricalEqualAreaRaw(y0);
	
	  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt$1(c) / n;
	
	  function project(x, y) {
	    var r = sqrt$1(c - 2 * n * sin$1(y)) / n;
	    return [r * sin$1(x *= n), r0 - r * cos$1(x)];
	  }
	
	  project.invert = function(x, y) {
	    var r0y = r0 - y;
	    return [atan2(x, abs(r0y)) / n * sign$1(r0y), asin$1((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
	  };
	
	  return project;
	}
	
	var conicEqualArea = function() {
	  return conicProjection(conicEqualAreaRaw)
	      .scale(155.424)
	      .center([0, 33.6442]);
	};
	
	var albers = function() {
	  return conicEqualArea()
	      .parallels([29.5, 45.5])
	      .scale(1070)
	      .translate([480, 250])
	      .rotate([96, 0])
	      .center([-0.6, 38.7]);
	};
	
	// The projections must have mutually exclusive clip regions on the sphere,
	// as this will avoid emitting interleaving lines and polygons.
	function multiplex(streams) {
	  var n = streams.length;
	  return {
	    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
	    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
	    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
	    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
	    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
	    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
	  };
	}
	
	// A composite projection for the United States, configured by default for
	// 960×500. The projection also works quite well at 960×600 if you change the
	// scale to 1285 and adjust the translate accordingly. The set of standard
	// parallels for each region comes from USGS, which is published here:
	// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
	var albersUsa = function() {
	  var cache,
	      cacheStream,
	      lower48 = albers(), lower48Point,
	      alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
	      hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
	      point, pointStream = {point: function(x, y) { point = [x, y]; }};
	
	  function albersUsa(coordinates) {
	    var x = coordinates[0], y = coordinates[1];
	    return point = null,
	        (lower48Point.point(x, y), point)
	        || (alaskaPoint.point(x, y), point)
	        || (hawaiiPoint.point(x, y), point);
	  }
	
	  albersUsa.invert = function(coordinates) {
	    var k = lower48.scale(),
	        t = lower48.translate(),
	        x = (coordinates[0] - t[0]) / k,
	        y = (coordinates[1] - t[1]) / k;
	    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
	        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
	        : lower48).invert(coordinates);
	  };
	
	  albersUsa.stream = function(stream) {
	    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
	  };
	
	  albersUsa.precision = function(_) {
	    if (!arguments.length) return lower48.precision();
	    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
	    return reset();
	  };
	
	  albersUsa.scale = function(_) {
	    if (!arguments.length) return lower48.scale();
	    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
	    return albersUsa.translate(lower48.translate());
	  };
	
	  albersUsa.translate = function(_) {
	    if (!arguments.length) return lower48.translate();
	    var k = lower48.scale(), x = +_[0], y = +_[1];
	
	    lower48Point = lower48
	        .translate(_)
	        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
	        .stream(pointStream);
	
	    alaskaPoint = alaska
	        .translate([x - 0.307 * k, y + 0.201 * k])
	        .clipExtent([[x - 0.425 * k + epsilon$4, y + 0.120 * k + epsilon$4], [x - 0.214 * k - epsilon$4, y + 0.234 * k - epsilon$4]])
	        .stream(pointStream);
	
	    hawaiiPoint = hawaii
	        .translate([x - 0.205 * k, y + 0.212 * k])
	        .clipExtent([[x - 0.214 * k + epsilon$4, y + 0.166 * k + epsilon$4], [x - 0.115 * k - epsilon$4, y + 0.234 * k - epsilon$4]])
	        .stream(pointStream);
	
	    return reset();
	  };
	
	  albersUsa.fitExtent = function(extent, object) {
	    return fitExtent(albersUsa, extent, object);
	  };
	
	  albersUsa.fitSize = function(size, object) {
	    return fitSize(albersUsa, size, object);
	  };
	
	  function reset() {
	    cache = cacheStream = null;
	    return albersUsa;
	  }
	
	  return albersUsa.scale(1070);
	};
	
	function azimuthalRaw(scale) {
	  return function(x, y) {
	    var cx = cos$1(x),
	        cy = cos$1(y),
	        k = scale(cx * cy);
	    return [
	      k * cy * sin$1(x),
	      k * sin$1(y)
	    ];
	  }
	}
	
	function azimuthalInvert(angle) {
	  return function(x, y) {
	    var z = sqrt$1(x * x + y * y),
	        c = angle(z),
	        sc = sin$1(c),
	        cc = cos$1(c);
	    return [
	      atan2(x * sc, z * cc),
	      asin$1(z && y * sc / z)
	    ];
	  }
	}
	
	var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
	  return sqrt$1(2 / (1 + cxcy));
	});
	
	azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
	  return 2 * asin$1(z / 2);
	});
	
	var azimuthalEqualArea = function() {
	  return projection(azimuthalEqualAreaRaw)
	      .scale(124.75)
	      .clipAngle(180 - 1e-3);
	};
	
	var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
	  return (c = acos(c)) && c / sin$1(c);
	});
	
	azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
	  return z;
	});
	
	var azimuthalEquidistant = function() {
	  return projection(azimuthalEquidistantRaw)
	      .scale(79.4188)
	      .clipAngle(180 - 1e-3);
	};
	
	function mercatorRaw(lambda, phi) {
	  return [lambda, log$1(tan((halfPi$3 + phi) / 2))];
	}
	
	mercatorRaw.invert = function(x, y) {
	  return [x, 2 * atan(exp(y)) - halfPi$3];
	};
	
	var mercator = function() {
	  return mercatorProjection(mercatorRaw)
	      .scale(961 / tau$4);
	};
	
	function mercatorProjection(project) {
	  var m = projection(project),
	      scale = m.scale,
	      translate = m.translate,
	      clipExtent = m.clipExtent,
	      clipAuto;
	
	  m.scale = function(_) {
	    return arguments.length ? (scale(_), clipAuto && m.clipExtent(null), m) : scale();
	  };
	
	  m.translate = function(_) {
	    return arguments.length ? (translate(_), clipAuto && m.clipExtent(null), m) : translate();
	  };
	
	  m.clipExtent = function(_) {
	    if (!arguments.length) return clipAuto ? null : clipExtent();
	    if (clipAuto = _ == null) {
	      var k = pi$4 * scale(),
	          t = translate();
	      _ = [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]];
	    }
	    clipExtent(_);
	    return m;
	  };
	
	  return m.clipExtent(null);
	}
	
	function tany(y) {
	  return tan((halfPi$3 + y) / 2);
	}
	
	function conicConformalRaw(y0, y1) {
	  var cy0 = cos$1(y0),
	      n = y0 === y1 ? sin$1(y0) : log$1(cy0 / cos$1(y1)) / log$1(tany(y1) / tany(y0)),
	      f = cy0 * pow$1(tany(y0), n) / n;
	
	  if (!n) return mercatorRaw;
	
	  function project(x, y) {
	    if (f > 0) { if (y < -halfPi$3 + epsilon$4) y = -halfPi$3 + epsilon$4; }
	    else { if (y > halfPi$3 - epsilon$4) y = halfPi$3 - epsilon$4; }
	    var r = f / pow$1(tany(y), n);
	    return [r * sin$1(n * x), f - r * cos$1(n * x)];
	  }
	
	  project.invert = function(x, y) {
	    var fy = f - y, r = sign$1(n) * sqrt$1(x * x + fy * fy);
	    return [atan2(x, abs(fy)) / n * sign$1(fy), 2 * atan(pow$1(f / r, 1 / n)) - halfPi$3];
	  };
	
	  return project;
	}
	
	var conicConformal = function() {
	  return conicProjection(conicConformalRaw)
	      .scale(109.5)
	      .parallels([30, 30]);
	};
	
	function equirectangularRaw(lambda, phi) {
	  return [lambda, phi];
	}
	
	equirectangularRaw.invert = equirectangularRaw;
	
	var equirectangular = function() {
	  return projection(equirectangularRaw)
	      .scale(152.63);
	};
	
	function conicEquidistantRaw(y0, y1) {
	  var cy0 = cos$1(y0),
	      n = y0 === y1 ? sin$1(y0) : (cy0 - cos$1(y1)) / (y1 - y0),
	      g = cy0 / n + y0;
	
	  if (abs(n) < epsilon$4) return equirectangularRaw;
	
	  function project(x, y) {
	    var gy = g - y, nx = n * x;
	    return [gy * sin$1(nx), g - gy * cos$1(nx)];
	  }
	
	  project.invert = function(x, y) {
	    var gy = g - y;
	    return [atan2(x, abs(gy)) / n * sign$1(gy), g - sign$1(n) * sqrt$1(x * x + gy * gy)];
	  };
	
	  return project;
	}
	
	var conicEquidistant = function() {
	  return conicProjection(conicEquidistantRaw)
	      .scale(131.154)
	      .center([0, 13.9389]);
	};
	
	function gnomonicRaw(x, y) {
	  var cy = cos$1(y), k = cos$1(x) * cy;
	  return [cy * sin$1(x) / k, sin$1(y) / k];
	}
	
	gnomonicRaw.invert = azimuthalInvert(atan);
	
	var gnomonic = function() {
	  return projection(gnomonicRaw)
	      .scale(144.049)
	      .clipAngle(60);
	};
	
	function scaleTranslate(kx, ky, tx, ty) {
	  return kx === 1 && ky === 1 && tx === 0 && ty === 0 ? identity$7 : transformer({
	    point: function(x, y) {
	      this.stream.point(x * kx + tx, y * ky + ty);
	    }
	  });
	}
	
	var identity$8 = function() {
	  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, transform = identity$7, // scale, translate and reflect
	      x0 = null, y0, x1, y1, clip = identity$7, // clip extent
	      cache,
	      cacheStream,
	      projection;
	
	  function reset() {
	    cache = cacheStream = null;
	    return projection;
	  }
	
	  return projection = {
	    stream: function(stream) {
	      return cache && cacheStream === stream ? cache : cache = transform(clip(cacheStream = stream));
	    },
	    clipExtent: function(_) {
	      return arguments.length ? (clip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$7) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	    },
	    scale: function(_) {
	      return arguments.length ? (transform = scaleTranslate((k = +_) * sx, k * sy, tx, ty), reset()) : k;
	    },
	    translate: function(_) {
	      return arguments.length ? (transform = scaleTranslate(k * sx, k * sy, tx = +_[0], ty = +_[1]), reset()) : [tx, ty];
	    },
	    reflectX: function(_) {
	      return arguments.length ? (transform = scaleTranslate(k * (sx = _ ? -1 : 1), k * sy, tx, ty), reset()) : sx < 0;
	    },
	    reflectY: function(_) {
	      return arguments.length ? (transform = scaleTranslate(k * sx, k * (sy = _ ? -1 : 1), tx, ty), reset()) : sy < 0;
	    },
	    fitExtent: function(extent, object) {
	      return fitExtent(projection, extent, object);
	    },
	    fitSize: function(size, object) {
	      return fitSize(projection, size, object);
	    }
	  };
	};
	
	function orthographicRaw(x, y) {
	  return [cos$1(y) * sin$1(x), sin$1(y)];
	}
	
	orthographicRaw.invert = azimuthalInvert(asin$1);
	
	var orthographic = function() {
	  return projection(orthographicRaw)
	      .scale(249.5)
	      .clipAngle(90 + epsilon$4);
	};
	
	function stereographicRaw(x, y) {
	  var cy = cos$1(y), k = 1 + cos$1(x) * cy;
	  return [cy * sin$1(x) / k, sin$1(y) / k];
	}
	
	stereographicRaw.invert = azimuthalInvert(function(z) {
	  return 2 * atan(z);
	});
	
	var stereographic = function() {
	  return projection(stereographicRaw)
	      .scale(250)
	      .clipAngle(142);
	};
	
	function transverseMercatorRaw(lambda, phi) {
	  return [log$1(tan((halfPi$3 + phi) / 2)), -lambda];
	}
	
	transverseMercatorRaw.invert = function(x, y) {
	  return [-y, 2 * atan(exp(x)) - halfPi$3];
	};
	
	var transverseMercator = function() {
	  var m = mercatorProjection(transverseMercatorRaw),
	      center = m.center,
	      rotate = m.rotate;
	
	  m.center = function(_) {
	    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
	  };
	
	  m.rotate = function(_) {
	    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
	  };
	
	  return rotate([0, 0, 90])
	      .scale(159.155);
	};
	
	exports.version = version;
	exports.bisect = bisectRight;
	exports.bisectRight = bisectRight;
	exports.bisectLeft = bisectLeft;
	exports.ascending = ascending;
	exports.bisector = bisector;
	exports.descending = descending;
	exports.deviation = deviation;
	exports.extent = extent;
	exports.histogram = histogram;
	exports.thresholdFreedmanDiaconis = freedmanDiaconis;
	exports.thresholdScott = scott;
	exports.thresholdSturges = sturges;
	exports.max = max;
	exports.mean = mean;
	exports.median = median;
	exports.merge = merge;
	exports.min = min;
	exports.pairs = pairs;
	exports.permute = permute;
	exports.quantile = threshold;
	exports.range = range;
	exports.scan = scan;
	exports.shuffle = shuffle;
	exports.sum = sum;
	exports.ticks = ticks;
	exports.tickStep = tickStep;
	exports.transpose = transpose;
	exports.variance = variance;
	exports.zip = zip;
	exports.entries = entries;
	exports.keys = keys;
	exports.values = values;
	exports.map = map$1;
	exports.set = set;
	exports.nest = nest;
	exports.randomUniform = uniform;
	exports.randomNormal = normal;
	exports.randomLogNormal = logNormal;
	exports.randomBates = bates;
	exports.randomIrwinHall = irwinHall;
	exports.randomExponential = exponential;
	exports.easeLinear = linear;
	exports.easeQuad = quadInOut;
	exports.easeQuadIn = quadIn;
	exports.easeQuadOut = quadOut;
	exports.easeQuadInOut = quadInOut;
	exports.easeCubic = cubicInOut;
	exports.easeCubicIn = cubicIn;
	exports.easeCubicOut = cubicOut;
	exports.easeCubicInOut = cubicInOut;
	exports.easePoly = polyInOut;
	exports.easePolyIn = polyIn;
	exports.easePolyOut = polyOut;
	exports.easePolyInOut = polyInOut;
	exports.easeSin = sinInOut;
	exports.easeSinIn = sinIn;
	exports.easeSinOut = sinOut;
	exports.easeSinInOut = sinInOut;
	exports.easeExp = expInOut;
	exports.easeExpIn = expIn;
	exports.easeExpOut = expOut;
	exports.easeExpInOut = expInOut;
	exports.easeCircle = circleInOut;
	exports.easeCircleIn = circleIn;
	exports.easeCircleOut = circleOut;
	exports.easeCircleInOut = circleInOut;
	exports.easeBounce = bounceOut;
	exports.easeBounceIn = bounceIn;
	exports.easeBounceOut = bounceOut;
	exports.easeBounceInOut = bounceInOut;
	exports.easeBack = backInOut;
	exports.easeBackIn = backIn;
	exports.easeBackOut = backOut;
	exports.easeBackInOut = backInOut;
	exports.easeElastic = elasticOut;
	exports.easeElasticIn = elasticIn;
	exports.easeElasticOut = elasticOut;
	exports.easeElasticInOut = elasticInOut;
	exports.polygonArea = area;
	exports.polygonCentroid = centroid;
	exports.polygonHull = hull;
	exports.polygonContains = contains;
	exports.polygonLength = length$1;
	exports.path = path;
	exports.quadtree = quadtree;
	exports.queue = queue;
	exports.arc = arc;
	exports.area = area$1;
	exports.line = line;
	exports.pie = pie;
	exports.radialArea = radialArea;
	exports.radialLine = radialLine$1;
	exports.symbol = symbol;
	exports.symbols = symbols;
	exports.symbolCircle = circle;
	exports.symbolCross = cross$1;
	exports.symbolDiamond = diamond;
	exports.symbolSquare = square;
	exports.symbolStar = star;
	exports.symbolTriangle = triangle;
	exports.symbolWye = wye;
	exports.curveBasisClosed = basisClosed;
	exports.curveBasisOpen = basisOpen;
	exports.curveBasis = basis;
	exports.curveBundle = bundle;
	exports.curveCardinalClosed = cardinalClosed;
	exports.curveCardinalOpen = cardinalOpen;
	exports.curveCardinal = cardinal;
	exports.curveCatmullRomClosed = catmullRomClosed;
	exports.curveCatmullRomOpen = catmullRomOpen;
	exports.curveCatmullRom = catmullRom;
	exports.curveLinearClosed = linearClosed;
	exports.curveLinear = curveLinear;
	exports.curveMonotoneX = monotoneX;
	exports.curveMonotoneY = monotoneY;
	exports.curveNatural = natural;
	exports.curveStep = step;
	exports.curveStepAfter = stepAfter;
	exports.curveStepBefore = stepBefore;
	exports.stack = stack;
	exports.stackOffsetExpand = expand;
	exports.stackOffsetNone = none;
	exports.stackOffsetSilhouette = silhouette;
	exports.stackOffsetWiggle = wiggle;
	exports.stackOrderAscending = ascending$1;
	exports.stackOrderDescending = descending$2;
	exports.stackOrderInsideOut = insideOut;
	exports.stackOrderNone = none$1;
	exports.stackOrderReverse = reverse;
	exports.color = color;
	exports.rgb = rgb;
	exports.hsl = hsl;
	exports.lab = lab;
	exports.hcl = hcl;
	exports.cubehelix = cubehelix;
	exports.interpolate = interpolate;
	exports.interpolateArray = array$1;
	exports.interpolateDate = date;
	exports.interpolateNumber = interpolateNumber;
	exports.interpolateObject = object;
	exports.interpolateRound = interpolateRound;
	exports.interpolateString = interpolateString;
	exports.interpolateTransformCss = interpolateTransformCss;
	exports.interpolateTransformSvg = interpolateTransformSvg;
	exports.interpolateZoom = interpolateZoom;
	exports.interpolateRgb = interpolateRgb;
	exports.interpolateRgbBasis = rgbBasis;
	exports.interpolateRgbBasisClosed = rgbBasisClosed;
	exports.interpolateHsl = hsl$2;
	exports.interpolateHslLong = hslLong;
	exports.interpolateLab = lab$1;
	exports.interpolateHcl = hcl$2;
	exports.interpolateHclLong = hclLong;
	exports.interpolateCubehelix = cubehelix$2;
	exports.interpolateCubehelixLong = cubehelixLong;
	exports.interpolateBasis = basis$2;
	exports.interpolateBasisClosed = basisClosed$1;
	exports.quantize = quantize;
	exports.dispatch = dispatch;
	exports.dsvFormat = dsv;
	exports.csvParse = csvParse;
	exports.csvParseRows = csvParseRows;
	exports.csvFormat = csvFormat;
	exports.csvFormatRows = csvFormatRows;
	exports.tsvParse = tsvParse;
	exports.tsvParseRows = tsvParseRows;
	exports.tsvFormat = tsvFormat;
	exports.tsvFormatRows = tsvFormatRows;
	exports.request = request;
	exports.html = html;
	exports.json = json;
	exports.text = text;
	exports.xml = xml;
	exports.csv = csv$1;
	exports.tsv = tsv$1;
	exports.now = now;
	exports.timer = timer;
	exports.timerFlush = timerFlush;
	exports.timeout = timeout$1;
	exports.interval = interval$1;
	exports.timeInterval = newInterval;
	exports.timeMillisecond = millisecond;
	exports.timeMilliseconds = milliseconds;
	exports.timeSecond = second;
	exports.timeSeconds = seconds;
	exports.timeMinute = minute;
	exports.timeMinutes = minutes;
	exports.timeHour = hour;
	exports.timeHours = hours;
	exports.timeDay = day;
	exports.timeDays = days;
	exports.timeWeek = sunday;
	exports.timeWeeks = sundays;
	exports.timeSunday = sunday;
	exports.timeSundays = sundays;
	exports.timeMonday = monday;
	exports.timeMondays = mondays;
	exports.timeTuesday = tuesday;
	exports.timeTuesdays = tuesdays;
	exports.timeWednesday = wednesday;
	exports.timeWednesdays = wednesdays;
	exports.timeThursday = thursday;
	exports.timeThursdays = thursdays;
	exports.timeFriday = friday;
	exports.timeFridays = fridays;
	exports.timeSaturday = saturday;
	exports.timeSaturdays = saturdays;
	exports.timeMonth = month;
	exports.timeMonths = months;
	exports.timeYear = year;
	exports.timeYears = years;
	exports.utcMillisecond = millisecond;
	exports.utcMilliseconds = milliseconds;
	exports.utcSecond = second;
	exports.utcSeconds = seconds;
	exports.utcMinute = utcMinute;
	exports.utcMinutes = utcMinutes;
	exports.utcHour = utcHour;
	exports.utcHours = utcHours;
	exports.utcDay = utcDay;
	exports.utcDays = utcDays;
	exports.utcWeek = utcSunday;
	exports.utcWeeks = utcSundays;
	exports.utcSunday = utcSunday;
	exports.utcSundays = utcSundays;
	exports.utcMonday = utcMonday;
	exports.utcMondays = utcMondays;
	exports.utcTuesday = utcTuesday;
	exports.utcTuesdays = utcTuesdays;
	exports.utcWednesday = utcWednesday;
	exports.utcWednesdays = utcWednesdays;
	exports.utcThursday = utcThursday;
	exports.utcThursdays = utcThursdays;
	exports.utcFriday = utcFriday;
	exports.utcFridays = utcFridays;
	exports.utcSaturday = utcSaturday;
	exports.utcSaturdays = utcSaturdays;
	exports.utcMonth = utcMonth;
	exports.utcMonths = utcMonths;
	exports.utcYear = utcYear;
	exports.utcYears = utcYears;
	exports.formatLocale = formatLocale;
	exports.formatDefaultLocale = defaultLocale;
	exports.formatSpecifier = formatSpecifier;
	exports.precisionFixed = precisionFixed;
	exports.precisionPrefix = precisionPrefix;
	exports.precisionRound = precisionRound;
	exports.isoFormat = formatIso;
	exports.isoParse = parseIso;
	exports.timeFormatLocale = formatLocale$1;
	exports.timeFormatDefaultLocale = defaultLocale$1;
	exports.scaleBand = band;
	exports.scalePoint = point$4;
	exports.scaleIdentity = identity$4;
	exports.scaleLinear = linear$2;
	exports.scaleLog = log;
	exports.scaleOrdinal = ordinal;
	exports.scaleImplicit = implicit;
	exports.scalePow = pow;
	exports.scaleSqrt = sqrt;
	exports.scaleQuantile = quantile$$1;
	exports.scaleQuantize = quantize$1;
	exports.scaleThreshold = threshold$1;
	exports.scaleTime = time;
	exports.scaleUtc = utcTime;
	exports.schemeCategory10 = category10;
	exports.schemeCategory20b = category20b;
	exports.schemeCategory20c = category20c;
	exports.schemeCategory20 = category20;
	exports.scaleSequential = sequential;
	exports.interpolateCubehelixDefault = cubehelix$3;
	exports.interpolateRainbow = rainbow$1;
	exports.interpolateWarm = warm;
	exports.interpolateCool = cool;
	exports.interpolateViridis = viridis;
	exports.interpolateMagma = magma;
	exports.interpolateInferno = inferno;
	exports.interpolatePlasma = plasma;
	exports.creator = creator;
	exports.customEvent = customEvent;
	exports.local = local;
	exports.matcher = matcher$1;
	exports.mouse = mouse;
	exports.namespace = namespace;
	exports.namespaces = namespaces;
	exports.select = select;
	exports.selectAll = selectAll;
	exports.selection = selection;
	exports.selector = selector;
	exports.selectorAll = selectorAll;
	exports.touch = touch;
	exports.touches = touches;
	exports.window = window;
	exports.active = active;
	exports.interrupt = interrupt;
	exports.transition = transition;
	exports.axisTop = axisTop;
	exports.axisRight = axisRight;
	exports.axisBottom = axisBottom;
	exports.axisLeft = axisLeft;
	exports.cluster = cluster;
	exports.hierarchy = hierarchy;
	exports.pack = index;
	exports.packSiblings = siblings;
	exports.packEnclose = enclose;
	exports.partition = partition;
	exports.stratify = stratify;
	exports.tree = tree;
	exports.treemap = index$1;
	exports.treemapBinary = binary;
	exports.treemapDice = treemapDice;
	exports.treemapSlice = treemapSlice;
	exports.treemapSliceDice = sliceDice;
	exports.treemapSquarify = squarify;
	exports.treemapResquarify = resquarify;
	exports.forceCenter = center$1;
	exports.forceCollide = collide;
	exports.forceLink = link;
	exports.forceManyBody = manyBody;
	exports.forceSimulation = simulation;
	exports.forceX = x$3;
	exports.forceY = y$3;
	exports.drag = drag;
	exports.dragDisable = dragDisable;
	exports.dragEnable = yesdrag;
	exports.voronoi = voronoi;
	exports.zoom = zoom;
	exports.zoomIdentity = identity$6;
	exports.zoomTransform = transform;
	exports.brush = brush;
	exports.brushX = brushX;
	exports.brushY = brushY;
	exports.brushSelection = brushSelection;
	exports.chord = chord;
	exports.ribbon = ribbon;
	exports.geoAlbers = albers;
	exports.geoAlbersUsa = albersUsa;
	exports.geoArea = area$2;
	exports.geoAzimuthalEqualArea = azimuthalEqualArea;
	exports.geoAzimuthalEqualAreaRaw = azimuthalEqualAreaRaw;
	exports.geoAzimuthalEquidistant = azimuthalEquidistant;
	exports.geoAzimuthalEquidistantRaw = azimuthalEquidistantRaw;
	exports.geoBounds = bounds;
	exports.geoCentroid = centroid$1;
	exports.geoCircle = circle$1;
	exports.geoClipExtent = extent$1;
	exports.geoConicConformal = conicConformal;
	exports.geoConicConformalRaw = conicConformalRaw;
	exports.geoConicEqualArea = conicEqualArea;
	exports.geoConicEqualAreaRaw = conicEqualAreaRaw;
	exports.geoConicEquidistant = conicEquidistant;
	exports.geoConicEquidistantRaw = conicEquidistantRaw;
	exports.geoDistance = distance;
	exports.geoEquirectangular = equirectangular;
	exports.geoEquirectangularRaw = equirectangularRaw;
	exports.geoGnomonic = gnomonic;
	exports.geoGnomonicRaw = gnomonicRaw;
	exports.geoGraticule = graticule;
	exports.geoGraticule10 = graticule10;
	exports.geoIdentity = identity$8;
	exports.geoInterpolate = interpolate$2;
	exports.geoLength = length$2;
	exports.geoMercator = mercator;
	exports.geoMercatorRaw = mercatorRaw;
	exports.geoOrthographic = orthographic;
	exports.geoOrthographicRaw = orthographicRaw;
	exports.geoPath = index$3;
	exports.geoProjection = projection;
	exports.geoProjectionMutator = projectionMutator;
	exports.geoRotation = rotation;
	exports.geoStereographic = stereographic;
	exports.geoStereographicRaw = stereographicRaw;
	exports.geoStream = geoStream;
	exports.geoTransform = transform$1;
	exports.geoTransverseMercator = transverseMercator;
	exports.geoTransverseMercatorRaw = transverseMercatorRaw;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get_data = __webpack_require__(4);
	
	var _get_data2 = _interopRequireDefault(_get_data);
	
	var _d = __webpack_require__(6);
	
	var d3 = _interopRequireWildcard(_d);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Graph = function () {
	  function Graph(options) {
	    _classCallCheck(this, Graph);
	
	    this.chart = options.chart;
	    this.width = options.width;
	    this.height = options.height;
	    this.title = options.title;
	    this.xAxisLabel = options.xAxisLabel;
	
	    this.drawGraph = this.drawGraph.bind(this);
	  }
	
	  _createClass(Graph, [{
	    key: 'drawGraph',
	    value: function drawGraph(data) {
	      var _this = this;
	
	      var chart = this.chart;
	      chart.style('background', '#242F39');
	      if (data) {
	        (function () {
	          var maxData = Math.max.apply(Math, _toConsumableArray(data));
	          var minData = Math.min.apply(Math, _toConsumableArray(data));
	          var maxScale = maxData;
	          if (maxData < Math.abs(minData)) maxScale = Math.abs(minData);
	          var time = data.map(function (_, idx) {
	            return idx * 5;
	          });
	          var xOffset = 80;
	
	          var xScale = d3.scaleBand().domain(time).range([0, _this.width - xOffset]).padding([0.2]);
	
	          var timeScale = d3.scaleLinear().domain([0, time.length]).range([0, _this.width - xOffset - 5]);
	
	          var yScale = d3.scaleLinear().domain([0, maxScale + 1000]).range([0, _this.height / 2 - 60]);
	
	          var yScaleNegative = d3.scaleLinear().domain([Math.abs(maxScale) + 1000, -Math.abs(maxScale) - 1000]).range([0, _this.height - 120]).nice();
	
	          chart.selectAll('rect').data(data).enter().append('rect').attr('width', xScale.bandwidth()).attr('height', function (dateum) {
	            return Math.abs(yScale(dateum));
	          }).attr('x', function (dateum, i) {
	            return xScale(i * 5);
	          }).attr('class', function (dateum) {
	            if (dateum > 0) {
	              return 'color-green';
	            } else {
	              return '';
	            }
	          }).attr('transform', 'translate(' + xOffset + ', 0)').attr('y', function (dateum) {
	            if (dateum >= 0) {
	              return _this.height / 2 - Math.abs(yScale(dateum)) - 20;
	            } else if (dateum < 0) {
	              return _this.height / 2 - 20;
	            }
	          });
	          var middleLine = chart.append('line');
	          middleLine.style('stroke', '#525252').attr('x1', xOffset).attr('x2', _this.width).attr('y1', _this.height / 2 - 19.5).attr('y2', _this.height / 2 - 19.5);
	
	          var valueline = d3.line().x(function (d, i) {
	            return xScale(i * 5);
	          }).y(function (d) {
	            return -yScale(d) + _this.height / 2 - 20;
	          }).curve(d3.curveCardinal.tension(0.65));
	
	          var lineGraph = chart.append('path').attr('class', 'line').attr('d', valueline(data));
	
	          lineGraph.attr('transform', 'translate(' + xOffset + ', 0)');
	
	          var yAxis = d3.axisLeft(yScaleNegative).tickArguments([12, 's']);
	          var verticalGuide = chart.append('g');
	          yAxis(verticalGuide);
	          verticalGuide.attr('transform', 'translate(' + xOffset + ', 40)');
	
	          var xAxis = d3.axisBottom(timeScale).tickArguments([10]);
	          var horizontalGuide = chart.append('g');
	          horizontalGuide.attr('transform', 'translate(' + xOffset + ', 620)');
	          xAxis(horizontalGuide);
	          horizontalGuide.selectAll('text').attr('x', '5');
	
	          _this.drawTitle(xOffset);
	          _this.drawAxisLabels(xOffset);
	        })();
	      } else {
	        chart.append("text").text("Replay not parsed").attr('x', 500).attr('y', function (dateum) {
	          return _this.height / 2;
	        });
	      }
	    }
	  }, {
	    key: 'drawTitle',
	    value: function drawTitle(xOffset) {
	      this.chart.append('text').attr('x', xOffset + 20 + this.width / 2).attr('y', 40).attr('text-anchor', 'middle').attr('class', 'title-text').text(this.title);
	    }
	  }, {
	    key: 'drawAxisLabels',
	    value: function drawAxisLabels(xOffset) {
	      this.chart.append('text').attr('x', xOffset - 20 + this.width / 2).attr('y', this.height - 25).attr('text-anchor', 'middle').attr('class', 'label-text').text(this.xAxisLabel);
	
	      this.chart.append('text').attr('x', -this.height / 4 + 20).attr('y', 30).attr("transform", "rotate(-90)").attr('text-anchor', 'middle').attr('class', 'label-text radiant y-label').text('Radiant');
	
	      this.chart.append('text').attr('x', -this.height * 3 / 4 + 60).attr('y', 30).attr("transform", "rotate(-90)").attr('text-anchor', 'middle').attr('class', 'label-text dire y-label').text('Dire');
	    }
	  }]);
	
	  return Graph;
	}();
	
	exports.default = Graph;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _d = __webpack_require__(6);
	
	var d3 = _interopRequireWildcard(_d);
	
	var _hero_ids = __webpack_require__(9);
	
	var _hero_ids2 = _interopRequireDefault(_hero_ids);
	
	var _util = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var drawTable = function drawTable(rawData, chartArea) {
	  var data = (0, _util.parsePlayers)(rawData);
	  var table = chartArea.style('background-image', 'none');
	
	  var columns = Object.keys(data[0]);
	  var thead = table.append('thead');
	  var tbody = table.append('tbody');
	
	  thead.append('tr').selectAll('th').data(columns).enter().append('th').text(function (column) {
	    return column;
	  });
	
	  var rows = tbody.selectAll('tr').data(data).enter().append('tr').attr('class', function (_, idx) {
	    var className = 'radiant';
	    if (idx > 4) className = 'dire';
	    return className;
	  });
	
	  rows.selectAll('td').data(function (row) {
	    return columns.map(function (column) {
	      var value = row[column];
	      if (column === 'Hero') {
	        value = _hero_ids2.default[value - 1].localized_name;
	      }
	      return { column: column, value: value };
	    });
	  }).enter().append('td').text(function (d) {
	    if (d.column === 'Hero') return '';
	    return d.value;
	  }).style('background-image', function (d) {
	    if (d.column !== 'Hero') return '';
	    if (d.column === 'Hero') {
	      var url = d.value.replace(/\s+/g, '-').toLowerCase();
	      return 'url(./assets/images/heroes/' + url + '.jpg)';
	    }
	  });
	
	  return table;
	};
	
	exports.default = drawTable;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var heroes = [{
	  "id": 1,
	  "name": "npc_dota_hero_antimage",
	  "localized_name": "Anti-Mage"
	}, {
	  "id": 2,
	  "name": "npc_dota_hero_axe",
	  "localized_name": "Axe"
	}, {
	  "id": 3,
	  "name": "npc_dota_hero_bane",
	  "localized_name": "Bane"
	}, {
	  "id": 4,
	  "name": "npc_dota_hero_bloodseeker",
	  "localized_name": "Bloodseeker"
	}, {
	  "id": 5,
	  "name": "npc_dota_hero_crystal_maiden",
	  "localized_name": "Crystal Maiden"
	}, {
	  "id": 6,
	  "name": "npc_dota_hero_drow_ranger",
	  "localized_name": "Drow Ranger"
	}, {
	  "id": 7,
	  "name": "npc_dota_hero_earthshaker",
	  "localized_name": "Earthshaker"
	}, {
	  "id": 8,
	  "name": "npc_dota_hero_juggernaut",
	  "localized_name": "Juggernaut"
	}, {
	  "id": 9,
	  "name": "npc_dota_hero_mirana",
	  "localized_name": "Mirana"
	}, {
	  "id": 10,
	  "name": "npc_dota_hero_morphling",
	  "localized_name": "Morphling"
	}, {
	  "id": 11,
	  "name": "npc_dota_hero_nevermore",
	  "localized_name": "Shadow Fiend"
	}, {
	  "id": 12,
	  "name": "npc_dota_hero_phantom_lancer",
	  "localized_name": "Phantom Lancer"
	}, {
	  "id": 13,
	  "name": "npc_dota_hero_puck",
	  "localized_name": "Puck"
	}, {
	  "id": 14,
	  "name": "npc_dota_hero_pudge",
	  "localized_name": "Pudge"
	}, {
	  "id": 15,
	  "name": "npc_dota_hero_razor",
	  "localized_name": "Razor"
	}, {
	  "id": 16,
	  "name": "npc_dota_hero_sand_king",
	  "localized_name": "Sand King"
	}, {
	  "id": 17,
	  "name": "npc_dota_hero_storm_spirit",
	  "localized_name": "Storm Spirit"
	}, {
	  "id": 18,
	  "name": "npc_dota_hero_sven",
	  "localized_name": "Sven"
	}, {
	  "id": 19,
	  "name": "npc_dota_hero_tiny",
	  "localized_name": "Tiny"
	}, {
	  "id": 20,
	  "name": "npc_dota_hero_vengefulspirit",
	  "localized_name": "Vengeful Spirit"
	}, {
	  "id": 21,
	  "name": "npc_dota_hero_windrunner",
	  "localized_name": "Windranger"
	}, {
	  "id": 22,
	  "name": "npc_dota_hero_zuus",
	  "localized_name": "Zeus"
	}, {
	  "id": 23,
	  "name": "npc_dota_hero_kunkka",
	  "localized_name": "Kunkka"
	}, {
	  "id": 24,
	  "name": "none",
	  "localized_name": "none"
	}, {
	  "id": 25,
	  "name": "npc_dota_hero_lina",
	  "localized_name": "Lina"
	}, {
	  "id": 26,
	  "name": "npc_dota_hero_lion",
	  "localized_name": "Lion"
	}, {
	  "id": 27,
	  "name": "npc_dota_hero_shadow_shaman",
	  "localized_name": "Shadow Shaman"
	}, {
	  "id": 28,
	  "name": "npc_dota_hero_slardar",
	  "localized_name": "Slardar"
	}, {
	  "id": 29,
	  "name": "npc_dota_hero_tidehunter",
	  "localized_name": "Tidehunter"
	}, {
	  "id": 30,
	  "name": "npc_dota_hero_witch_doctor",
	  "localized_name": "Witch Doctor"
	}, {
	  "id": 31,
	  "name": "npc_dota_hero_lich",
	  "localized_name": "Lich"
	}, {
	  "id": 32,
	  "name": "npc_dota_hero_riki",
	  "localized_name": "Riki"
	}, {
	  "id": 33,
	  "name": "npc_dota_hero_enigma",
	  "localized_name": "Enigma"
	}, {
	  "id": 34,
	  "name": "npc_dota_hero_tinker",
	  "localized_name": "Tinker"
	}, {
	  "id": 35,
	  "name": "npc_dota_hero_sniper",
	  "localized_name": "Sniper"
	}, {
	  "id": 36,
	  "name": "npc_dota_hero_necrolyte",
	  "localized_name": "Necrophos"
	}, {
	  "id": 37,
	  "name": "npc_dota_hero_warlock",
	  "localized_name": "Warlock"
	}, {
	  "id": 38,
	  "name": "npc_dota_hero_beastmaster",
	  "localized_name": "Beastmaster"
	}, {
	  "id": 39,
	  "name": "npc_dota_hero_queenofpain",
	  "localized_name": "Queen of Pain"
	}, {
	  "id": 40,
	  "name": "npc_dota_hero_venomancer",
	  "localized_name": "Venomancer"
	}, {
	  "id": 41,
	  "name": "npc_dota_hero_faceless_void",
	  "localized_name": "Faceless Void"
	}, {
	  "id": 42,
	  "name": "npc_dota_hero_skeleton_king",
	  "localized_name": "Wraith King"
	}, {
	  "id": 43,
	  "name": "npc_dota_hero_death_prophet",
	  "localized_name": "Death Prophet"
	}, {
	  "id": 44,
	  "name": "npc_dota_hero_phantom_assassin",
	  "localized_name": "Phantom Assassin"
	}, {
	  "id": 45,
	  "name": "npc_dota_hero_pugna",
	  "localized_name": "Pugna"
	}, {
	  "id": 46,
	  "name": "npc_dota_hero_templar_assassin",
	  "localized_name": "Templar Assassin"
	}, {
	  "id": 47,
	  "name": "npc_dota_hero_viper",
	  "localized_name": "Viper"
	}, {
	  "id": 48,
	  "name": "npc_dota_hero_luna",
	  "localized_name": "Luna"
	}, {
	  "id": 49,
	  "name": "npc_dota_hero_dragon_knight",
	  "localized_name": "Dragon Knight"
	}, {
	  "id": 50,
	  "name": "npc_dota_hero_dazzle",
	  "localized_name": "Dazzle"
	}, {
	  "id": 51,
	  "name": "npc_dota_hero_rattletrap",
	  "localized_name": "Clockwerk"
	}, {
	  "id": 52,
	  "name": "npc_dota_hero_leshrac",
	  "localized_name": "Leshrac"
	}, {
	  "id": 53,
	  "name": "npc_dota_hero_furion",
	  "localized_name": "Nature's Prophet"
	}, {
	  "id": 54,
	  "name": "npc_dota_hero_life_stealer",
	  "localized_name": "Lifestealer"
	}, {
	  "id": 55,
	  "name": "npc_dota_hero_dark_seer",
	  "localized_name": "Dark Seer"
	}, {
	  "id": 56,
	  "name": "npc_dota_hero_clinkz",
	  "localized_name": "Clinkz"
	}, {
	  "id": 57,
	  "name": "npc_dota_hero_omniknight",
	  "localized_name": "Omniknight"
	}, {
	  "id": 58,
	  "name": "npc_dota_hero_enchantress",
	  "localized_name": "Enchantress"
	}, {
	  "id": 59,
	  "name": "npc_dota_hero_huskar",
	  "localized_name": "Huskar"
	}, {
	  "id": 60,
	  "name": "npc_dota_hero_night_stalker",
	  "localized_name": "Night Stalker"
	}, {
	  "id": 61,
	  "name": "npc_dota_hero_broodmother",
	  "localized_name": "Broodmother"
	}, {
	  "id": 62,
	  "name": "npc_dota_hero_bounty_hunter",
	  "localized_name": "Bounty Hunter"
	}, {
	  "id": 63,
	  "name": "npc_dota_hero_weaver",
	  "localized_name": "Weaver"
	}, {
	  "id": 64,
	  "name": "npc_dota_hero_jakiro",
	  "localized_name": "Jakiro"
	}, {
	  "id": 65,
	  "name": "npc_dota_hero_batrider",
	  "localized_name": "Batrider"
	}, {
	  "id": 66,
	  "name": "npc_dota_hero_chen",
	  "localized_name": "Chen"
	}, {
	  "id": 67,
	  "name": "npc_dota_hero_spectre",
	  "localized_name": "Spectre"
	}, {
	  "id": 68,
	  "name": "npc_dota_hero_ancient_apparition",
	  "localized_name": "Ancient Apparition"
	}, {
	  "id": 69,
	  "name": "npc_dota_hero_doom_bringer",
	  "localized_name": "Doom"
	}, {
	  "id": 70,
	  "name": "npc_dota_hero_ursa",
	  "localized_name": "Ursa"
	}, {
	  "id": 71,
	  "name": "npc_dota_hero_spirit_breaker",
	  "localized_name": "Spirit Breaker"
	}, {
	  "id": 72,
	  "name": "npc_dota_hero_gyrocopter",
	  "localized_name": "Gyrocopter"
	}, {
	  "id": 73,
	  "name": "npc_dota_hero_alchemist",
	  "localized_name": "Alchemist"
	}, {
	  "id": 74,
	  "name": "npc_dota_hero_invoker",
	  "localized_name": "Invoker"
	}, {
	  "id": 75,
	  "name": "npc_dota_hero_silencer",
	  "localized_name": "Silencer"
	}, {
	  "id": 76,
	  "name": "npc_dota_hero_obsidian_destroyer",
	  "localized_name": "Outworld Devourer"
	}, {
	  "id": 77,
	  "name": "npc_dota_hero_lycan",
	  "localized_name": "Lycan"
	}, {
	  "id": 78,
	  "name": "npc_dota_hero_brewmaster",
	  "localized_name": "Brewmaster"
	}, {
	  "id": 79,
	  "name": "npc_dota_hero_shadow_demon",
	  "localized_name": "Shadow Demon"
	}, {
	  "id": 80,
	  "name": "npc_dota_hero_lone_druid",
	  "localized_name": "Lone Druid"
	}, {
	  "id": 81,
	  "name": "npc_dota_hero_chaos_knight",
	  "localized_name": "Chaos Knight"
	}, {
	  "id": 82,
	  "name": "npc_dota_hero_meepo",
	  "localized_name": "Meepo"
	}, {
	  "id": 83,
	  "name": "npc_dota_hero_treant",
	  "localized_name": "Treant Protector"
	}, {
	  "id": 84,
	  "name": "npc_dota_hero_ogre_magi",
	  "localized_name": "Ogre Magi"
	}, {
	  "id": 85,
	  "name": "npc_dota_hero_undying",
	  "localized_name": "Undying"
	}, {
	  "id": 86,
	  "name": "npc_dota_hero_rubick",
	  "localized_name": "Rubick"
	}, {
	  "id": 87,
	  "name": "npc_dota_hero_disruptor",
	  "localized_name": "Disruptor"
	}, {
	  "id": 88,
	  "name": "npc_dota_hero_nyx_assassin",
	  "localized_name": "Nyx Assassin"
	}, {
	  "id": 89,
	  "name": "npc_dota_hero_naga_siren",
	  "localized_name": "Naga Siren"
	}, {
	  "id": 90,
	  "name": "npc_dota_hero_keeper_of_the_light",
	  "localized_name": "Keeper of the Light"
	}, {
	  "id": 91,
	  "name": "npc_dota_hero_wisp",
	  "localized_name": "Io"
	}, {
	  "id": 92,
	  "name": "npc_dota_hero_visage",
	  "localized_name": "Visage"
	}, {
	  "id": 93,
	  "name": "npc_dota_hero_slark",
	  "localized_name": "Slark"
	}, {
	  "id": 94,
	  "name": "npc_dota_hero_medusa",
	  "localized_name": "Medusa"
	}, {
	  "id": 95,
	  "name": "npc_dota_hero_troll_warlord",
	  "localized_name": "Troll Warlord"
	}, {
	  "id": 96,
	  "name": "npc_dota_hero_centaur",
	  "localized_name": "Centaur Warrunner"
	}, {
	  "id": 97,
	  "name": "npc_dota_hero_magnataur",
	  "localized_name": "Magnus"
	}, {
	  "id": 98,
	  "name": "npc_dota_hero_shredder",
	  "localized_name": "Timbersaw"
	}, {
	  "id": 99,
	  "name": "npc_dota_hero_bristleback",
	  "localized_name": "Bristleback"
	}, {
	  "id": 100,
	  "name": "npc_dota_hero_tusk",
	  "localized_name": "Tusk"
	}, {
	  "id": 101,
	  "name": "npc_dota_hero_skywrath_mage",
	  "localized_name": "Skywrath Mage"
	}, {
	  "id": 102,
	  "name": "npc_dota_hero_abaddon",
	  "localized_name": "Abaddon"
	}, {
	  "id": 103,
	  "name": "npc_dota_hero_elder_titan",
	  "localized_name": "Elder Titan"
	}, {
	  "id": 104,
	  "name": "npc_dota_hero_legion_commander",
	  "localized_name": "Legion Commander"
	}, {
	  "id": 105,
	  "name": "npc_dota_hero_techies",
	  "localized_name": "Techies"
	}, {
	  "id": 106,
	  "name": "npc_dota_hero_ember_spirit",
	  "localized_name": "Ember Spirit"
	}, {
	  "id": 107,
	  "name": "npc_dota_hero_earth_spirit",
	  "localized_name": "Earth Spirit"
	}, {
	  "id": 108,
	  "name": "npc_dota_hero_abyssal_underlord",
	  "localized_name": "Underlord"
	}, {
	  "id": 109,
	  "name": "npc_dota_hero_terrorblade",
	  "localized_name": "Terrorblade"
	}, {
	  "id": 110,
	  "name": "npc_dota_hero_phoenix",
	  "localized_name": "Phoenix"
	}, {
	  "id": 111,
	  "name": "npc_dota_hero_oracle",
	  "localized_name": "Oracle"
	}, {
	  "id": 112,
	  "name": "npc_dota_hero_winter_wyvern",
	  "localized_name": "Winter Wyvern"
	}, {
	  "id": 113,
	  "name": "npc_dota_hero_arc_warden",
	  "localized_name": "Arc Warden"
	}, {
	  "id": 114,
	  "name": "npc_dota_hero_monkey_king",
	  "localized_name": "Monkey King"
	}];
	
	exports.default = heroes;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPlayersNetWorth = exports.parsePlayers = undefined;
	
	var _d = __webpack_require__(6);
	
	var d3 = _interopRequireWildcard(_d);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var parsePlayers = exports.parsePlayers = function parsePlayers(players) {
	  var format = d3.format(',');
	  return players.map(function (player) {
	    var name = "anonymous";
	    if (player.personaname) name = player.personaname;
	    return {
	      Hero: player.hero_id,
	      Level: player.level,
	      Name: name,
	      KDA: player.kills + '/' + player.deaths + '/' + player.assists,
	      'LH/D': player.last_hits + '/' + player.denies,
	      'GPM': player.gold_per_min,
	      'XPM': player.xp_per_min,
	      'Gold': format(player.total_gold),
	      'EXP': format(player.total_xp),
	      'HDmg': format(player.hero_damage),
	      'TDmg': format(player.tower_damage),
	      APM: player.actions_per_min
	    };
	  });
	};
	
	var getPlayersNetWorth = exports.getPlayersNetWorth = function getPlayersNetWorth(players) {
	  var maximum = 0;
	  var data = players.map(function (player) {
	    var curMax = player.gold_t[player.gold_t.length - 1];
	    if (curMax > maximum) maximum = curMax;
	    return {
	      hero: player.hero_id,
	      gold: player.gold_t
	    };
	  });
	  return { data: data, maximum: maximum };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var drawWinText = function drawWinText(textArea, winner) {
	  textArea.text(winner + ' Victory!').attr('class', winner + '-text');
	};
	
	exports.default = drawWinText;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _d = __webpack_require__(6);
	
	var d3 = _interopRequireWildcard(_d);
	
	var _hero_ids = __webpack_require__(9);
	
	var _hero_ids2 = _interopRequireDefault(_hero_ids);
	
	var _util = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var graphAllPlayerNetWorth = function graphAllPlayerNetWorth(options) {
	  var playersData = options.playersData,
	      width = options.width,
	      height = options.height,
	      id = options.id;
	
	  var xOffset = 80;
	
	  if (id) d3.select('#' + id).remove();
	
	  var _getPlayersNetWorth = (0, _util.getPlayersNetWorth)(playersData),
	      data = _getPlayersNetWorth.data,
	      maximum = _getPlayersNetWorth.maximum;
	
	  var chartArea = d3.select('section.chart').append('div').attr('class', 'player-area');
	  var chart = chartArea.append('svg').attr('width', width).attr('height', height).attr('id', id).style('background-color', 'rgb(36, 47, 57)');
	
	  var time = data[0].gold.length - 1;
	  var xScale = d3.scaleLinear().domain([0, time]).range([xOffset, width - 10]);
	  var yScale = d3.scaleLinear().domain([0, maximum]).range([height - 80, 80]).nice();
	
	  var valueline = d3.line().x(function (d, i) {
	    return xScale(i);
	  }).y(function (d) {
	    return yScale(d);
	  }).curve(d3.curveCardinal.tension(0.65));
	
	  data.forEach(function (playerData, idx) {
	    var gold = playerData.gold;
	    chart.append('path').attr('class', 'player-line player-' + idx + ' hover-highlight').attr('d', valueline(gold));
	  });
	
	  var xAxis = d3.axisBottom(xScale).tickArguments([10]);
	  var horizontalGuide = chart.append('g');
	  horizontalGuide.attr('transform', 'translate(0, 620)');
	  xAxis(horizontalGuide);
	  horizontalGuide.selectAll('text').attr('x', '5');
	
	  var yAxis = d3.axisLeft(yScale).tickArguments([12, 's']);
	  var verticalGuide = chart.append('g');
	  yAxis(verticalGuide);
	  verticalGuide.attr('transform', 'translate(' + xOffset + ', 0)');
	
	  var legend = chartArea.append('table').attr('class', 'player-legend').append('tbody');
	  var legendData = data.map(function (playerData) {
	    return playerData.hero;
	  });
	  var legendRows = legend.selectAll('tr').data(legendData).enter().append('tr');
	
	  var rowIdx = -1;
	
	  legendRows.selectAll('div').data(function (dateum) {
	    return [dateum];
	  }).enter().append('div').text('').attr('class', function (dateum) {
	    rowIdx += 1;
	    var heroName = _hero_ids2.default[dateum - 1].localized_name;
	    heroName = heroName.toLowerCase();
	    heroName = heroName.replace(/ /g, "_");
	    return 'miniheroes-sprite-' + heroName + ' player-legend-' + rowIdx + ' hover-highlight';
	  }).append('div').text(function (dateum) {
	    return _hero_ids2.default[dateum - 1].localized_name;
	  }).attr('class', 'hidden-hero-text');
	
	  chart.append('text').attr('x', xOffset + 20 + width / 2).attr('y', 40).attr('text-anchor', 'middle').attr('class', 'title-text').text('Net Worth By Player');
	
	  chart.append('text').attr('x', xOffset + width / 2).attr('y', height - 25).attr('text-anchor', 'middle').attr('class', 'label-text').text('Game Time (min)');
	};
	
	exports.default = graphAllPlayerNetWorth;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map