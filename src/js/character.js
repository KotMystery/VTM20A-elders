// Character model for VTM 20A Elder
export class Character {
  constructor() {
    this.name = '';
    this.player = '';
    this.chronicle = '';
    this.nature = '';
    this.demeanor = '';
    this.concept = '';
    this.clan = '';
    this.sire = '';

    // Generation: default 9, can go 4-14
    this.generation = 9;
    this.dilutedVitae = 0; // Flaw: 0-5 points

    // Attributes (9/7/5, max 6 before freebies)
    this.attributes = {
      physical: {
        strength: 1,
        dexterity: 1,
        stamina: 1
      },
      social: {
        charisma: 1,
        manipulation: 1,
        appearance: 1
      },
      mental: {
        perception: 1,
        intelligence: 1,
        wits: 1
      }
    };

    // Abilities (18/12/8, max 5 before freebies)
    this.abilities = {
      talents: {},
      skills: {},
      knowledges: {}
    };

    // Disciplines (7 points total)
    this.disciplines = {};

    // Necromancy paths and rituals
    this.necromancyPaths = []; // [{ pathId: 'path_bone', level: 3 }, ...]
    this.necromancyRituals = []; // ['ritual_id1', 'ritual_id2', ...]

    // Thaumaturgy paths and rituals
    this.thaumaturgyPaths = []; // [{ pathId: 'path_blood', level: 3 }, ...]
    this.thaumaturgyRituals = []; // ['ritual_id1', 'ritual_id2', ...]

    // Backgrounds (3 points: Generation, Herd, Resources, Retainers only)
    this.backgrounds = {};

    // Virtues (5 points total)
    this.virtues = {
      conscience: 1, // or conviction
      selfControl: 1, // or instinct
      courage: 1
    };

    // Humanity/Path
    this.humanity = 7;
    this.path = '';
    this.bearing = '';

    // Willpower (derived from Courage initially)
    this.willpower = 1;
    this.willpowerCurrent = 1;

    // Merits & Flaws
    this.merits = [];
    this.flaws = [];
    this.coterieFlaw = null; // Mandatory 7-point coterie flaw

    // Health
    this.health = {
      bruised: false,
      hurt: false,
      injured: false,
      wounded: false,
      mauled: false,
      crippled: false,
      incapacitated: false
    };

    // Blood Pool (depends on generation)
    this.bloodPool = 0;
    this.bloodPoolMax = 0;
    this.bloodPerTurn = 0;

    // Experience
    this.experience = 33; // Elders start with 33 XP
    this.experienceSpent = 0;

    // Freebies (15 base + 7 coterie flaw + 0-7 personal flaws = 22-29)
    this.freebies = 22; // Base with mandatory coterie flaw
    this.freebiesSpent = 0;

    // Point allocation tracking
    this.pointsAllocated = {
      attributes: { primary: 0, secondary: 0, tertiary: 0 },
      abilities: { primary: 0, secondary: 0, tertiary: 0 },
      disciplines: 0,
      backgrounds: 0,
      virtues: 0
    };

    // Priority selections
    this.priorities = {
      attributes: null, // 'physical', 'social', or 'mental'
      abilities: null // 'talents', 'skills', or 'knowledges'
    };

    // Setup baseline - captures values at end of setup phase to prevent reduction in later phases
    this.setupBaseline = null;

    // Phase-specific deltas to track hierarchical changes
    // freebiesDeltas tracks what was added in freebies phase (on top of setup)
    // xpDeltas tracks what was added in XP phase (on top of freebies)
    this.freebiesDeltas = this.createEmptyDeltas();
    this.xpDeltas = this.createEmptyDeltas();
  }

  createEmptyDeltas() {
    return {
      attributes: { physical: {}, social: {}, mental: {} },
      abilities: { talents: {}, skills: {}, knowledges: {} },
      disciplines: {},
      backgrounds: {},
      virtues: {},
      humanity: 0,
      willpower: 0
    };
  }

  // Capture current state as setup baseline (called when leaving setup phase)
  captureSetupBaseline() {
    this.setupBaseline = {
      attributes: JSON.parse(JSON.stringify(this.attributes)),
      abilities: JSON.parse(JSON.stringify(this.abilities)),
      disciplines: JSON.parse(JSON.stringify(this.disciplines)),
      backgrounds: JSON.parse(JSON.stringify(this.backgrounds)),
      virtues: JSON.parse(JSON.stringify(this.virtues)),
      humanity: this.humanity,
      willpower: this.willpower
    };
  }

  // Get the value at end of a specific phase
  getValueAtPhase(category, subcategory, attr, phase) {
    console.log(`[GET_VALUE_AT_PHASE] Category: ${category}, Subcategory: ${subcategory || 'none'}, Attr: ${attr}, Phase: ${phase}`);

    let baseValue = 0;

    // Get base value from attributes/abilities/etc
    if (category === 'attributes') {
      baseValue = this.setupBaseline?.attributes[subcategory][attr] || 1;
    } else if (category === 'abilities') {
      baseValue = this.setupBaseline?.abilities[subcategory][attr] || 0;
    } else if (category === 'disciplines') {
      baseValue = this.setupBaseline?.disciplines[attr] || 0;
    } else if (category === 'backgrounds') {
      baseValue = this.setupBaseline?.backgrounds[attr] || 0;
    } else if (category === 'virtues') {
      baseValue = this.setupBaseline?.virtues[attr] || 1;
    } else if (category === 'humanity') {
      baseValue = this.setupBaseline?.humanity || 2;
    } else if (category === 'willpower') {
      baseValue = this.setupBaseline?.willpower || 1;
    }

    console.log(`[GET_VALUE_AT_PHASE] Base Value (from setup baseline): ${baseValue}`);

    if (phase === 'setup') {
      console.log(`[GET_VALUE_AT_PHASE] Returning setup value: ${baseValue}`);
      return baseValue;
    }

    // Add freebies delta
    let freebiesDelta = 0;
    if (category === 'attributes') {
      freebiesDelta = this.freebiesDeltas.attributes[subcategory][attr] || 0;
    } else if (category === 'abilities') {
      freebiesDelta = this.freebiesDeltas.abilities[subcategory][attr] || 0;
    } else if (category === 'disciplines') {
      freebiesDelta = this.freebiesDeltas.disciplines[attr] || 0;
    } else if (category === 'backgrounds') {
      freebiesDelta = this.freebiesDeltas.backgrounds[attr] || 0;
    } else if (category === 'virtues') {
      freebiesDelta = this.freebiesDeltas.virtues[attr] || 0;
    } else if (category === 'humanity') {
      freebiesDelta = this.freebiesDeltas.humanity || 0;
    } else if (category === 'willpower') {
      freebiesDelta = this.freebiesDeltas.willpower || 0;
    }

    console.log(`[GET_VALUE_AT_PHASE] Freebies Delta: ${freebiesDelta}`);

    if (phase === 'freebies') {
      const result = baseValue + freebiesDelta;
      console.log(`[GET_VALUE_AT_PHASE] Returning freebies value: ${baseValue} + ${freebiesDelta} = ${result}`);
      return result;
    }

    // Add XP delta
    let xpDelta = 0;
    if (category === 'attributes') {
      xpDelta = this.xpDeltas.attributes[subcategory][attr] || 0;
    } else if (category === 'abilities') {
      xpDelta = this.xpDeltas.abilities[subcategory][attr] || 0;
    } else if (category === 'disciplines') {
      xpDelta = this.xpDeltas.disciplines[attr] || 0;
    } else if (category === 'backgrounds') {
      xpDelta = this.xpDeltas.backgrounds[attr] || 0;
    } else if (category === 'virtues') {
      xpDelta = this.xpDeltas.virtues[attr] || 0;
    } else if (category === 'humanity') {
      xpDelta = this.xpDeltas.humanity || 0;
    } else if (category === 'willpower') {
      xpDelta = this.xpDeltas.willpower || 0;
    }

    console.log(`[GET_VALUE_AT_PHASE] XP Delta: ${xpDelta}`);

    const result = baseValue + freebiesDelta + xpDelta;
    console.log(`[GET_VALUE_AT_PHASE] Returning XP phase value: ${baseValue} + ${freebiesDelta} + ${xpDelta} = ${result}`);
    return result;
  }

  // Wipe deltas for a specific stat in later phases
  wipeLaterPhaseDeltas(category, subcategory, attr, fromPhase) {
    if (fromPhase === 'setup') {
      // Wipe both freebies and XP deltas for this stat
      if (category === 'attributes') {
        delete this.freebiesDeltas.attributes[subcategory][attr];
        delete this.xpDeltas.attributes[subcategory][attr];
      } else if (category === 'abilities') {
        delete this.freebiesDeltas.abilities[subcategory][attr];
        delete this.xpDeltas.abilities[subcategory][attr];
      } else if (category === 'disciplines') {
        delete this.freebiesDeltas.disciplines[attr];
        delete this.xpDeltas.disciplines[attr];
      } else if (category === 'backgrounds') {
        delete this.freebiesDeltas.backgrounds[attr];
        delete this.xpDeltas.backgrounds[attr];
      } else if (category === 'virtues') {
        delete this.freebiesDeltas.virtues[attr];
        delete this.xpDeltas.virtues[attr];
      } else if (category === 'humanity') {
        this.freebiesDeltas.humanity = 0;
        this.xpDeltas.humanity = 0;
      } else if (category === 'willpower') {
        this.freebiesDeltas.willpower = 0;
        this.xpDeltas.willpower = 0;
      }
    } else if (fromPhase === 'freebies') {
      // Wipe only XP deltas for this stat
      if (category === 'attributes') {
        delete this.xpDeltas.attributes[subcategory][attr];
      } else if (category === 'abilities') {
        delete this.xpDeltas.abilities[subcategory][attr];
      } else if (category === 'disciplines') {
        delete this.xpDeltas.disciplines[attr];
      } else if (category === 'backgrounds') {
        delete this.xpDeltas.backgrounds[attr];
      } else if (category === 'virtues') {
        delete this.xpDeltas.virtues[attr];
      } else if (category === 'humanity') {
        this.xpDeltas.humanity = 0;
      } else if (category === 'willpower') {
        this.xpDeltas.willpower = 0;
      }
    }
  }

  // Calculate effective generation (base 9 - Generation background + Diluted Vitae flaw)
  getEffectiveGeneration() {
    const generationBonus = this.backgrounds.generation || 0;
    return this.generation - generationBonus + this.dilutedVitae;
  }

  // Get blood pool stats based on generation
  getBloodPoolStats() {
    const gen = this.getEffectiveGeneration();
    const stats = {
      4: { max: 50, perTurn: 10 },
      5: { max: 40, perTurn: 8 },
      6: { max: 30, perTurn: 6 },
      7: { max: 20, perTurn: 4 },
      8: { max: 15, perTurn: 3 },
      9: { max: 14, perTurn: 2 },
      10: { max: 13, perTurn: 1 },
      11: { max: 12, perTurn: 1 },
      12: { max: 11, perTurn: 1 },
      13: { max: 10, perTurn: 1 },
      14: { max: 10, perTurn: 1 }
    };
    return stats[gen] || { max: 10, perTurn: 1 };
  }

  // Get clan disciplines
  getClanDisciplines() {
    // Load clan data and return disciplines
    return [];
  }

  // Check if discipline is clan discipline
  isClanDiscipline(disciplineId) {
    const clanDisciplines = this.getClanDisciplines();
    return clanDisciplines.includes(disciplineId);
  }

  // Get attribute category total
  getAttributeCategoryTotal(category) {
    const attrs = this.attributes[category];
    return Object.values(attrs).reduce((sum, val) => sum + val, 0) - 3; // Subtract starting dots
  }

  // Get ability category total
  getAbilityCategoryTotal(category) {
    const abilities = this.abilities[category];
    return Object.values(abilities).reduce((sum, val) => sum + val, 0);
  }

  // Calculate total freebies available
  calculateFreebies() {
    let total = 15; // Base
    total += 7; // Mandatory coterie flaw

    // Add personal flaws (max 7 points)
    const flawPoints = this.flaws.reduce((sum, flaw) => sum + flaw.cost, 0);
    total += Math.min(flawPoints, 7);

    // Subtract merit costs
    const meritCosts = this.merits.reduce((sum, merit) => sum + merit.cost, 0);
    total -= meritCosts;

    return total;
  }

  // Necromancy path management
  getNecromancyPrimaryPath() {
    return this.necromancyPaths[0] || null;
  }

  addNecromancyPath(pathId, level = 1) {
    const existing = this.necromancyPaths.find(p => p.pathId === pathId);
    if (!existing) {
      this.necromancyPaths.push({ pathId, level });
    }
  }

  removeNecromancyPath(pathId) {
    this.necromancyPaths = this.necromancyPaths.filter(p => p.pathId !== pathId);
  }

  updateNecromancyPathLevel(pathId, level) {
    const path = this.necromancyPaths.find(p => p.pathId === pathId);
    if (path) {
      path.level = level;
    }
  }

  addNecromancyRitual(ritualId) {
    if (!this.necromancyRituals.includes(ritualId)) {
      this.necromancyRituals.push(ritualId);
    }
  }

  removeNecromancyRitual(ritualId) {
    this.necromancyRituals = this.necromancyRituals.filter(r => r !== ritualId);
  }

  // Thaumaturgy path management
  getThaumaturgyPrimaryPath() {
    return this.thaumaturgyPaths[0] || null;
  }

  addThaumaturgyPath(pathId, level = 1) {
    const existing = this.thaumaturgyPaths.find(p => p.pathId === pathId);
    if (!existing) {
      this.thaumaturgyPaths.push({ pathId, level });
    }
  }

  removeThaumaturgyPath(pathId) {
    this.thaumaturgyPaths = this.thaumaturgyPaths.filter(p => p.pathId !== pathId);
  }

  updateThaumaturgyPathLevel(pathId, level) {
    const path = this.thaumaturgyPaths.find(p => p.pathId === pathId);
    if (path) {
      path.level = level;
    }
  }

  addThaumaturgyRitual(ritualId) {
    if (!this.thaumaturgyRituals.includes(ritualId)) {
      this.thaumaturgyRituals.push(ritualId);
    }
  }

  removeThaumaturgyRitual(ritualId) {
    this.thaumaturgyRituals = this.thaumaturgyRituals.filter(r => r !== ritualId);
  }

  // Serialize to JSON string
  serialize() {
    return JSON.stringify(this, null, 2);
  }

  // Deserialize from JSON
  static fromJSON(json) {
    const char = new Character();
    Object.assign(char, JSON.parse(json));

    // Fix legacy saves that have null/undefined for these fields
    if (char.freebiesSpent == null) {
      char.freebiesSpent = 0;
    }
    if (char.experienceSpent == null) {
      char.experienceSpent = 0;
    }

    // Initialize delta structures if they don't exist (legacy saves)
    if (!char.freebiesDeltas) {
      char.freebiesDeltas = char.createEmptyDeltas();
    }
    if (!char.xpDeltas) {
      char.xpDeltas = char.createEmptyDeltas();
    }

    return char;
  }
}
