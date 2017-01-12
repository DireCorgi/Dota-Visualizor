import * as d3 from 'd3';
import heroes from './data/hero_ids';
import { parsePlayers } from './util';

const drawTable = (rawData, chartArea) => {
  const data = parsePlayers(rawData);
  const table = chartArea.style('background-image', 'none');

  const columns = Object.keys(data[0]);
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
      .text((d) => {
        if (d.column === 'Hero') return '';
        return d.value;
      })
      .style('background-image',(d) => {
        if (d.column !== 'Hero') return '';
        if (d.column === 'Hero') {
          const url = d.value.replace(/\s+/g, '-').toLowerCase();
          return `url(./assets/images/heroes/${url}.jpg)`;
        }
      });

  return table;
};

export default drawTable;
