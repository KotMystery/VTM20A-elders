// Point tracking and validation for Elder character creation

export const ELDER_RULES = {
  attributes: {
    primary: 9,
    secondary: 7,
    tertiary: 5,
    maxBeforeFreebies: 6,
    startingDots: 1 // Each attribute starts at 1
  },
  abilities: {
    primary: 18,
    secondary: 12,
    tertiary: 8,
    maxBeforeFreebies: 5
  },
  disciplines: {
    total: 7
  },
  backgrounds: {
    total: 3,
    allowed: ['generation', 'herd', 'resources', 'retainers']
  },
  virtues: {
    total: 5,
    startingDots: 1 // Each virtue starts at 1
  },
  freebies: {
    base: 22, // Includes mandatory 7-point coterie flaw
    personalFlawsMax: 7 // Can gain up to 7 more from personal flaws
  },
  experience: {
    starting: 33
  }
};

export const FREEBIE_COSTS = {
  attribute: 5,
  ability: 2,
  background: 1,
  discipline: 7,
  virtue: 2,
  humanity: 1,
  willpower: 1
};

export const XP_COSTS = {
  newAbility: 3,
  newDiscipline: 10,
  newPath: 7, // Necromancy/Thaumaturgy
  attribute: (current) => current * 4,
  ability: (current) => current * 2,

  // Discipline costs by category and clan affiliation
  discipline: {
    physical: {
      clan: (current) => current * 5,
      nonClan: (current) => current * 6,
      caitiff: (current) => current * 5
    },
    mental: {
      clan: (current) => current * 5,
      nonClan: (current) => current * 7,
      caitiff: (current) => current * 6
    },
    unique: {
      clan: (current) => current * 5,
      nonClan: (current) => current * 8,
      caitiff: (current) => current * 7
    }
  },

  secondaryPath: (current) => current * 4,
  virtue: (current) => current * 2,
  humanity: (current) => current * 2,
  willpower: (current) => current * 1
};

export class PointTracker {
  constructor(character) {
    this.character = character;
  }

  // Validate attribute allocation
  validateAttributes() {
    const errors = [];
    const categories = ['physical', 'social', 'mental'];
    const totals = {};

    categories.forEach(category => {
      const attrs = this.character.attributes[category];
      let total = Object.values(attrs).reduce((sum, val) => sum + val, 0) - 3;
      // Appearance can be 0 (Nosferatu/flaws), don't count as -1
      if (attrs.appearance === 0) {
        total += 1;
      }
      totals[category] = total;

      // Check max dots before freebies
      Object.entries(attrs).forEach(([name, value]) => {
        if (value > ELDER_RULES.attributes.maxBeforeFreebies) {
          errors.push(`${category}.${name}: максимум ${ELDER_RULES.attributes.maxBeforeFreebies} без Freebies`);
        }
      });
    });

    // Check if totals match 9/7/5 distribution
    const sortedTotals = Object.values(totals).sort((a, b) => b - a);
    const expected = [9, 7, 5];

    if (JSON.stringify(sortedTotals) !== JSON.stringify(expected)) {
      errors.push(`Распределение атрибутов должно быть 9/7/5 (текущее: ${sortedTotals.join('/')})`);
    }

    return { valid: errors.length === 0, errors, totals };
  }

  // Validate ability allocation
  validateAbilities() {
    const errors = [];
    const categories = ['talents', 'skills', 'knowledges'];
    const totals = {};

    categories.forEach(category => {
      const abilities = this.character.abilities[category];
      const total = Object.values(abilities).reduce((sum, val) => sum + val, 0);
      totals[category] = total;

      // Check max dots before freebies
      Object.entries(abilities).forEach(([name, value]) => {
        if (value > ELDER_RULES.abilities.maxBeforeFreebies) {
          errors.push(`${category}.${name}: максимум ${ELDER_RULES.abilities.maxBeforeFreebies} без Freebies`);
        }
      });
    });

    // Check if totals match 18/12/8 distribution
    const sortedTotals = Object.values(totals).sort((a, b) => b - a);
    const expected = [18, 12, 8];

    if (JSON.stringify(sortedTotals) !== JSON.stringify(expected)) {
      errors.push(`Распределение способностей должно быть 18/12/8 (текущее: ${sortedTotals.join('/')})`);
    }

    return { valid: errors.length === 0, errors, totals };
  }

  // Validate disciplines
  validateDisciplines() {
    const errors = [];
    const total = Object.values(this.character.disciplines).reduce((sum, val) => sum + val, 0);

    if (total > ELDER_RULES.disciplines.total) {
      errors.push(`Дисциплины: использовано ${total}/${ELDER_RULES.disciplines.total}`);
    } else if (total < ELDER_RULES.disciplines.total) {
      errors.push(`Дисциплины: нужно распределить ${ELDER_RULES.disciplines.total} очков (распределено: ${total})`);
    }

    return { valid: errors.length === 0, errors, total };
  }

  // Validate backgrounds
  validateBackgrounds() {
    const errors = [];
    const backgrounds = this.character.backgrounds;
    const total = Object.values(backgrounds).reduce((sum, val) => sum + val, 0);

    // Check if only allowed backgrounds
    Object.keys(backgrounds).forEach(bg => {
      if (!ELDER_RULES.backgrounds.allowed.includes(bg)) {
        errors.push(`${bg}: недопустимая предыстория для Древних`);
      }
    });

    if (total > ELDER_RULES.backgrounds.total) {
      errors.push(`Факты биографии: использовано ${total}/${ELDER_RULES.backgrounds.total}`);
    } else if (total < ELDER_RULES.backgrounds.total) {
      errors.push(`Факты биографии: нужно распределить ${ELDER_RULES.backgrounds.total} очка (распределено: ${total})`);
    }

    return { valid: errors.length === 0, errors, total };
  }

  // Validate virtues
  validateVirtues() {
    const errors = [];
    const virtues = this.character.virtues;
    const total = Object.values(virtues).reduce((sum, val) => sum + val, 0) - 3;

    if (total > ELDER_RULES.virtues.total) {
      errors.push(`Добродетели: использовано ${total}/${ELDER_RULES.virtues.total}`);
    } else if (total < ELDER_RULES.virtues.total) {
      errors.push(`Добродетели: нужно распределить ${ELDER_RULES.virtues.total} очков (распределено: ${total})`);
    }

    return { valid: errors.length === 0, errors, total };
  }

  // Calculate freebie costs
  calculateFreebieSpending() {
    const spent = {
      attributes: 0,
      abilities: 0,
      backgrounds: 0,
      disciplines: 0,
      virtues: 0,
      humanity: 0,
      willpower: 0,
      total: 0
    };

    // Attributes over primary/secondary/tertiary allocation
    // Abilities over 18/12/8 allocation
    // Etc.

    // TODO: Implement detailed calculation

    return spent;
  }

  // Validate required character fields
  validateRequiredFields() {
    const errors = [];

    if (!this.character.clan || this.character.clan === '') {
      errors.push('Необходимо выбрать клан');
    }

    if (!this.character.name || this.character.name.trim() === '') {
      errors.push('Необходимо указать имя персонажа');
    }

    return { valid: errors.length === 0, errors };
  }

  // Get all validation results
  // Phase-specific validation: only validate what's relevant to current phase
  validateAll(currentPhase = 'setup') {
    // In setup phase, validate character creation requirements
    if (currentPhase === 'setup') {
      return {
        required: this.validateRequiredFields(),
        attributes: this.validateAttributes(),
        abilities: this.validateAbilities(),
        disciplines: this.validateDisciplines(),
        backgrounds: this.validateBackgrounds(),
        virtues: this.validateVirtues()
      };
    }

    // In freebies and XP phases, only basic validation
    // No need to revalidate setup phase requirements
    return {
      required: this.validateRequiredFields(),
      attributes: { valid: true, errors: [], totals: {} },
      abilities: { valid: true, errors: [], totals: {} },
      disciplines: { valid: true, errors: [], total: 0 },
      backgrounds: { valid: true, errors: [], total: 0 },
      virtues: { valid: true, errors: [], total: 0 }
    };
  }

  // Check if character is complete
  isComplete() {
    const validation = this.validateAll();
    return Object.values(validation).every(v => v.valid);
  }
}
