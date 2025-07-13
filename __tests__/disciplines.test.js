const disciplines = require("../public/data/disciplines.json");

describe('discipline data integrity', () => {
  test('all disciplines contain required fields and powers', () => {
    for (const d of Object.values(disciplines)) {
      expect(d).toHaveProperty('title');
      expect(d).toHaveProperty('subtitle');
      expect(Array.isArray(d.affinity)).toBe(true);
      expect(d).toHaveProperty('type');
      expect(d).toHaveProperty('threat');
      expect(d).toHaveProperty('resonance');
      expect(d).toHaveProperty('description');
      expect(Array.isArray(d.powers)).toBe(true);
      expect(Array.isArray(d.amalgams)).toBe(true);
      if ('rituals' in d) {
        expect(Array.isArray(d.rituals)).toBe(true);
      }

      d.powers.forEach(p => {
        expect(p).toHaveProperty('level');
        expect(p).toHaveProperty('name');
        expect(p).toHaveProperty('effect');
        expect(p).toHaveProperty('cost');
        expect(p).toHaveProperty('duration');
        expect(p).toHaveProperty('dice');
        expect(p).toHaveProperty('prerequisite');
        expect(p).toHaveProperty('amalgam');
        expect(p).toHaveProperty('opposing');
        expect(p).toHaveProperty('notes');
        expect(p).toHaveProperty('source');
      });
    }
  });
});
