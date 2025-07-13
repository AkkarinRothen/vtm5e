const fs = require('fs');

function loadDisciplines() {
  const data = fs.readFileSync('public/data/disciplines.json', 'utf8');
  return JSON.parse(data);
}

module.exports = loadDisciplines;
