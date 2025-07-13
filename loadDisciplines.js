const fs = require('fs');
const vm = require('vm');

function loadDisciplines() {
  const html = fs.readFileSync('index.html', 'utf8');
  const match = html.match(/const disciplines = ({[\s\S]*?});/);
  if (!match) throw new Error('Disciplines object not found');
  const objectString = match[1];
  return vm.runInNewContext(`(${objectString})`);
}

module.exports = loadDisciplines;
