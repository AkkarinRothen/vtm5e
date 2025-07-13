const disciplines = require('../loadDisciplines');

test('all disciplines contain required fields', () => {
  for (const [key, d] of Object.entries(disciplines)) {
    expect(d).toHaveProperty('title');
    expect(Array.isArray(d.powers)).toBe(true);
    d.powers.forEach(p => {
      expect(p).toHaveProperty('level');
      expect(p).toHaveProperty('name');
    });
  }
});
