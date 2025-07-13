const fs = require('fs');

function loadDisciplines() {
  const html = fs.readFileSync('index.html', 'utf8');
  const match = html.match(/const disciplines = ({[\s\S]*?});/);
  if (!match) throw new Error('Disciplines object not found');
  const code = `const disciplines = ${match[1]}; return disciplines;`;
  return Function(code)();
}

module.exports = loadDisciplines();
