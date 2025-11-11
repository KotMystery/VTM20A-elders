import { Character } from './character.js';
import { PointTracker, ELDER_RULES, FREEBIE_COSTS, XP_COSTS } from './pointTracker.js';

// Import data
import clansData from '../data/clans.json';
import disciplinesData from '../data/disciplines.json';
import abilitiesData from '../data/abilities.json';
import backgroundsData from '../data/backgrounds.json';
import necromancyData from '../data/necromancy.json';
import thaumaturgyData from '../data/thaumaturgy.json';
import conceptsData from '../data/concepts.json';
import archetypesData from '../data/archetypes.json';
import meritsData from '../data/merits.json';
import flawsData from '../data/flaws.json';
import translations from '../locales/ru.json';

class CharacterCreatorApp {
  constructor() {
    this.character = new Character();
    this.tracker = new PointTracker(this.character);
    this.currentPhase = 'setup';
    this.allDisciplines = this.flattenDisciplines();
    this.translations = translations;

    this.init();
  }

  // Translation helper - access nested keys like "attributes.physical"
  t(key) {
    const keys = key.split('.');
    let value = this.translations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key; // Return key if translation missing
    }
    return value;
  }

  flattenDisciplines() {
    const all = [];
    Object.values(disciplinesData).forEach(category => {
      all.push(...category);
    });
    return all;
  }

  init() {
    this.loadFromLocalStorage();

    // Calculate derived stats from virtues
    this.character.humanity = this.character.virtues.conscience + this.character.virtues.selfControl;
    this.character.willpower = this.character.virtues.courage;
    this.character.willpowerCurrent = this.character.willpower;

    this.render();
    this.attachEventListeners();
  }

  // Main render method
  render() {
    const app = document.getElementById('app');
    // Clear existing content first to force a full re-render
    app.innerHTML = '';
    app.innerHTML = `
      <div class="min-h-screen p-4 md:p-6">
        <header class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <div class="flex-1"></div>
            <div class="flex-1 text-center">
              <h1 class="text-2xl md:text-3xl font-bold text-vtm-red mb-1">
                ${this.t('app.title')}
              </h1>
              <h2 class="text-lg md:text-xl text-gray-400">
                ${this.t('app.subtitle')}
              </h2>
            </div>
            <div class="flex-1 flex justify-end">
              <button class="btn btn-secondary text-sm" id="newCharacterBtn">Новый персонаж</button>
            </div>
          </div>
        </header>

        <div class="max-w-5xl mx-auto">
          <!-- Phase tabs -->
          <div class="flex border-b border-gray-700 mb-4 overflow-x-auto">
            <div class="tab ${this.currentPhase === 'setup' ? 'active' : ''}" data-phase="setup">
              ${this.t('phases.setup')}
            </div>
            <div class="tab ${this.currentPhase === 'freebies' ? 'active' : ''}" data-phase="freebies">
              ${this.t('phases.freebies')}
            </div>
            <div class="tab ${this.currentPhase === 'xp' ? 'active' : ''}" data-phase="xp">
              ${this.t('phases.xp')}
            </div>
          </div>

          <!-- Phase content -->
          <div id="phaseContent">
            ${this.renderPhaseContent()}
          </div>

          <!-- Action buttons -->
          <div class="mt-6 flex gap-3 justify-center flex-wrap sticky bottom-2 bg-vtm-dark p-3 rounded-lg shadow-lg">
            <button class="btn btn-secondary text-sm" id="saveBtn">💾 Сохранить</button>
            <button class="btn btn-secondary text-sm" id="loadBtn">📂 Загрузить</button>
            <button class="btn btn-primary text-sm" id="exportBtn">📄 PDF</button>
          </div>
        </div>
      </div>
    `;
  }

  renderPhaseContent() {
    switch (this.currentPhase) {
      case 'setup':
        return this.renderSetupPhase();
      case 'freebies':
        return this.renderFreebiesPhase();
      case 'xp':
        return this.renderXPPhase();
      default:
        return '';
    }
  }

  renderSetupPhase() {
    return `
      <div class="space-y-4">
        ${this.renderBasicInfo()}
        ${this.renderAttributes()}
        ${this.renderAbilities()}
        ${this.renderAdvantages()}
        ${this.renderSummary()}
      </div>
    `;
  }


  renderBasicInfo() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card">
          <h3 class="section-title">${this.t('basicInfo.sectionTitle')}</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1">${this.t('basicInfo.name')}</label>
              <input type="text" id="name" class="input-field" value="${this.character.name}">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">${this.t('basicInfo.player')}</label>
              <input type="text" id="player" class="input-field" value="${this.character.player}">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">${this.t('basicInfo.chronicle')}</label>
              <input type="text" id="chronicle" class="input-field" value="${this.character.chronicle}">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">${this.t('basicInfo.nature')}</label>
              <input type="text" id="nature" class="input-field"
                     list="nature-list" value="${this.character.nature}">
              <datalist id="nature-list">
                ${archetypesData.map(arch => `
                  <option value="${arch.name}">
                `).join('')}
              </datalist>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">${this.t('basicInfo.demeanor')}</label>
              <input type="text" id="demeanor" class="input-field"
                     list="demeanor-list" value="${this.character.demeanor}">
              <datalist id="demeanor-list">
                ${archetypesData.map(arch => `
                  <option value="${arch.name}">
                `).join('')}
              </datalist>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">${this.t('basicInfo.concept')}</label>
              <input type="text" id="concept" class="input-field"
                     list="concept-list" value="${this.character.concept}">
              <datalist id="concept-list">
                ${conceptsData.map(concept => `
                  <option value="${concept.name}">
                `).join('')}
              </datalist>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="section-title">Клан и Поколение</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1">Клан</label>
              <select id="clan" class="input-field">
                <option value="">Выберите клан</option>
                ${clansData.map(clan => `
                  <option value="${clan.id}" ${this.character.clan === clan.id ? 'selected' : ''}>
                    ${clan.name}
                  </option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Сир</label>
              <input type="text" id="sire" class="input-field" value="${this.character.sire}">
            </div>
            <div class="p-4 bg-gray-800 rounded">
              <div class="text-sm font-medium mb-2">Текущее поколение: ${this.character.getEffectiveGeneration()}</div>
              <div class="text-xs text-gray-400">
                Базовое: 9<br>
                Фон "Поколение": -${this.character.backgrounds.generation || 0}<br>
                Недостаток "Разбавленная кровь": +${this.character.dilutedVitae}
              </div>
            </div>
            ${this.renderBloodPoolInfo()}
          </div>
        </div>

        <div class="card md:col-span-2">
          <h3 class="section-title">Слабость клана</h3>
          <div id="clanWeakness" class="p-4 bg-gray-800 rounded text-gray-300">
            ${this.character.clan ? this.getClanWeakness() : 'Выберите клан'}
          </div>
        </div>
      </div>
    `;
  }

  renderBloodPoolInfo() {
    const stats = this.character.getBloodPoolStats();
    return `
      <div class="p-4 bg-gray-800 rounded">
        <div class="text-sm font-medium mb-2">Запас крови</div>
        <div class="text-xs text-gray-400">
          Максимум: ${stats.max}<br>
          За ход: ${stats.perTurn}
        </div>
      </div>
    `;
  }

  getClanWeakness() {
    const clan = clansData.find(c => c.id === this.character.clan);
    return clan ? clan.weakness : '';
  }

  renderAttributes() {
    const validation = this.tracker.validateAttributes();

    return `
      <div class="card">
        <h3 class="section-title">Атрибуты</h3>
        ${this.currentPhase === 'setup' ? `
        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-sm font-medium mb-2">Правила распределения: 9/7/5</div>
          <div class="text-xs text-gray-400 mb-2">
            Максимум 6 в одном атрибуте до Freebies. Каждый атрибут начинается с 1.
          </div>
          <div class="flex gap-4">
            <div>Физические: <span data-validation="attributes-physical" class="${validation.totals?.physical === 9 || validation.totals?.physical === 7 || validation.totals?.physical === 5 ? 'text-green-400' : 'text-red-400'}">${validation.totals?.physical || 0}</span></div>
            <div>Социальные: <span data-validation="attributes-social" class="${validation.totals?.social === 9 || validation.totals?.social === 7 || validation.totals?.social === 5 ? 'text-green-400' : 'text-red-400'}">${validation.totals?.social || 0}</span></div>
            <div>Ментальные: <span data-validation="attributes-mental" class="${validation.totals?.mental === 9 || validation.totals?.mental === 7 || validation.totals?.mental === 5 ? 'text-green-400' : 'text-red-400'}">${validation.totals?.mental || 0}</span></div>
          </div>
        </div>
        ` : ''}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${this.renderAttributeCategory('physical', 'Физические', ['strength', 'dexterity', 'stamina'], ['Сила', 'Ловкость', 'Выносливость'])}
          ${this.renderAttributeCategory('social', 'Социальные', ['charisma', 'manipulation', 'appearance'], ['Обаяние', 'Манипулирование', 'Привлекательность'])}
          ${this.renderAttributeCategory('mental', 'Ментальные', ['perception', 'intelligence', 'wits'], ['Восприятие', 'Интеллект', 'Смекалка'])}
        </div>
      </div>
    `;
  }

  renderAttributeCategory(category, title, attrs, labels) {
    return `
      <div>
        <h4 class="subsection-title">${title}</h4>
        ${attrs.map((attr, idx) => `
          <div class="stat-row">
            <span class="stat-label">${labels[idx]}</span>
            <div class="dot-tracker" data-category="attributes" data-subcategory="${category}" data-attr="${attr}">
              ${this.renderDots(this.character.attributes[category][attr], 10, 'attributes', category, attr)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderAbilities() {
    const validation = this.tracker.validateAbilities();

    return `
      <div class="card">
        <h3 class="section-title">Способности</h3>
        ${this.currentPhase === 'setup' ? `
        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-sm font-medium mb-2">Правила распределения: 18/12/8</div>
          <div class="text-xs text-gray-400 mb-2">
            Максимум 5 в одной способности до Freebies.
          </div>
          <div class="flex gap-4">
            <div>Таланты: <span data-validation="abilities-talents" class="${validation.totals?.talents === 18 || validation.totals?.talents === 12 || validation.totals?.talents === 8 ? 'text-green-400' : 'text-red-400'}">${validation.totals?.talents || 0}</span></div>
            <div>Навыки: <span data-validation="abilities-skills" class="${validation.totals?.skills === 18 || validation.totals?.skills === 12 || validation.totals?.skills === 8 ? 'text-green-400' : 'text-red-400'}">${validation.totals?.skills || 0}</span></div>
            <div>Познания: <span data-validation="abilities-knowledges" class="${validation.totals?.knowledges === 18 || validation.totals?.knowledges === 12 || validation.totals?.knowledges === 8 ? 'text-green-400' : 'text-red-400'}">${validation.totals?.knowledges || 0}</span></div>
          </div>
        </div>
        ` : ''}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${this.renderAbilityCategory('talents', 'Таланты', abilitiesData.talents)}
          ${this.renderAbilityCategory('skills', 'Навыки', abilitiesData.skills)}
          ${this.renderAbilityCategory('knowledges', 'Познания', abilitiesData.knowledges)}
        </div>
      </div>
    `;
  }

  renderAbilityCategory(category, title, abilities) {
    return `
      <div>
        <h4 class="subsection-title">${title}</h4>
        ${abilities.map(ability => `
          <div class="stat-row">
            <span class="stat-label">${ability.name}</span>
            <div class="dot-tracker" data-category="abilities" data-subcategory="${category}" data-attr="${ability.id}">
              ${this.renderDots(this.character.abilities[category][ability.id] || 0, 10, 'abilities', category, ability.id)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderAdvantages() {
    const discValidation = this.tracker.validateDisciplines();
    const bgValidation = this.tracker.validateBackgrounds();
    const virtValidation = this.tracker.validateVirtues();

    return `
      <div class="space-y-6">
        <!-- Disciplines -->
        <div class="card">
          <h3 class="section-title">Дисциплины</h3>
          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-sm font-medium">Всего очков: <span data-validation="disciplines-total" class="${discValidation.total <= 7 ? 'text-green-400' : 'text-red-400'}">${discValidation.total}/7</span></div>
          </div>
          <div id="disciplinesList">
            ${this.renderDisciplinesList()}
          </div>
          <button class="btn btn-secondary mt-4" id="addDisciplineBtn">+ Добавить дисциплину</button>
        </div>

        <!-- Backgrounds -->
        <div class="card">
          <h3 class="section-title">Предыстории</h3>
          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-sm font-medium mb-2">Всего очков: <span data-validation="backgrounds-total" class="${bgValidation.total <= 3 ? 'text-green-400' : 'text-red-400'}">${bgValidation.total}/3</span></div>
            <div class="text-xs text-gray-400">Доступны: Поколение, Стадо, Ресурсы, Слуги</div>
          </div>
          ${backgroundsData.map(bg => `
            <div class="stat-row">
              <div>
                <span class="stat-label">${bg.name}</span>
                <div class="text-xs text-gray-400">${bg.description}</div>
              </div>
              <div class="dot-tracker" data-category="backgrounds" data-subcategory="" data-attr="${bg.id}">
                ${this.renderDots(this.character.backgrounds[bg.id] || 0, 5, 'backgrounds', null, bg.id)}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Virtues -->
        <div class="card">
          <h3 class="section-title">Добродетели</h3>
          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-sm font-medium">Всего очков: <span data-validation="virtues-total" class="${virtValidation.total <= 5 ? 'text-green-400' : 'text-red-400'}">${virtValidation.total}/5</span></div>
            <div class="text-xs text-gray-400">Каждая добродетель начинается с 1</div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Совесть/Убеждение</span>
            <div class="dot-tracker" data-category="virtues" data-subcategory="" data-attr="conscience">
              ${this.renderDots(this.character.virtues.conscience, 5, 'virtues', null, 'conscience')}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Самоконтроль/Инстинкт</span>
            <div class="dot-tracker" data-category="virtues" data-subcategory="" data-attr="selfControl">
              ${this.renderDots(this.character.virtues.selfControl, 5, 'virtues', null, 'selfControl')}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Храбрость</span>
            <div class="dot-tracker" data-category="virtues" data-subcategory="" data-attr="courage">
              ${this.renderDots(this.character.virtues.courage, 5, 'virtues', null, 'courage')}
            </div>
          </div>
        </div>

        <!-- Humanity & Willpower -->
        <div class="card">
          <h3 class="section-title">Человечность и Сила воли</h3>
          <div class="stat-row">
            <span class="stat-label">Человечность</span>
            <div class="dot-tracker" data-category="humanity" data-subcategory="" data-attr="humanity">
              ${this.renderDots(this.character.humanity, 10, 'humanity', null, 'humanity')}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Сила воли</span>
            <div class="dot-tracker" data-category="willpower" data-subcategory="" data-attr="willpower">
              ${this.renderDots(this.character.willpower, 10, 'willpower', null, 'willpower')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderDisciplinesList() {
    const clanDisciplines = this.getClanDisciplines();
    const entries = Object.entries(this.character.disciplines);

    if (entries.length === 0) {
      return '<div class="text-gray-400 text-center py-4">Нет дисциплин. Нажмите "Добавить дисциплину"</div>';
    }

    return entries.map(([discId, level]) => {
      const disc = this.allDisciplines.find(d => d.id === discId);
      const isClan = clanDisciplines.includes(discId);
      const hasPathsRituals = discId === 'necromancy' || discId === 'thaumaturgy';

      let pathsInfo = '';
      if (discId === 'necromancy' && this.character.necromancyPaths.length > 0) {
        const paths = this.character.necromancyPaths;
        pathsInfo = `<div class="text-xs text-gray-400 mt-1">`;
        paths.forEach((path, idx) => {
          const pathData = necromancyData.paths.find(p => p.id === path.pathId);
          const label = idx === 0 ? 'Основной' : `Вторичный ${idx}`;
          pathsInfo += `${label}: ${pathData?.name || path.pathId} (${path.level})${idx < paths.length - 1 ? '<br>' : ''}`;
        });
        pathsInfo += `</div>`;
      } else if (discId === 'thaumaturgy' && this.character.thaumaturgyPaths.length > 0) {
        const paths = this.character.thaumaturgyPaths;
        pathsInfo = `<div class="text-xs text-gray-400 mt-1">`;
        paths.forEach((path, idx) => {
          const pathData = thaumaturgyData.paths.find(p => p.id === path.pathId);
          const label = idx === 0 ? 'Основной' : `Вторичный ${idx}`;
          pathsInfo += `${label}: ${pathData?.name || path.pathId} (${path.level})${idx < paths.length - 1 ? '<br>' : ''}`;
        });
        pathsInfo += `</div>`;
      }

      return `
        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="stat-label">${disc?.name || discId}</span>
                ${isClan ? '<span class="text-xs text-green-400">(Клановая)</span>' : ''}
              </div>
              ${pathsInfo}
            </div>
            <div class="flex items-center gap-2">
              <div class="dot-tracker" data-category="disciplines" data-subcategory="" data-attr="${discId}">
                ${this.renderDots(level, 10, 'disciplines', null, discId)}
              </div>
              <button class="text-red-500 hover:text-red-400 text-xl" onclick="app.removeDiscipline('${discId}')">×</button>
            </div>
          </div>
          ${hasPathsRituals ? `
            <button class="btn btn-secondary text-sm mt-2" onclick="app.managePaths('${discId}')">
              📜 Управление путями и ритуалами
            </button>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  renderFreebiesPhase() {
    const available = this.character.freebies - this.character.freebiesSpent;
    const totalFlawPoints = this.character.flaws.reduce((sum, f) => sum + (f.selectedCost || f.cost), 0);
    const totalMeritCosts = this.character.merits.reduce((sum, m) => sum + (m.selectedCost || m.cost), 0);
    const baseFreebies = 15 + 7 + Math.min(totalFlawPoints, 7) - totalMeritCosts;

    return `
      <div class="space-y-4">
        <div class="card">
          <h3 class="section-title">Распределение бонусных очков</h3>

          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-lg font-bold mb-2">
              Доступно: <span class="${available >= 0 ? 'text-green-400' : 'text-red-400'}">${available}</span> бонусных очков
            </div>
            <div class="text-sm text-gray-400">
              Базовые: 15<br>
              Котерия (обязательный недостаток): +7<br>
              Личные недостатки: +${Math.min(totalFlawPoints, 7)} (макс. 7)<br>
              Достоинства: -${totalMeritCosts}<br>
              Использовано на улучшения: ${this.character.freebiesSpent}<br>
              <span class="text-yellow-400 mt-1 block">Кликните на пустую точку справа от текущего значения для повышения. Стоимость: Атрибут (5), Способность (2), Дисциплина (7), Предыстория (1), Добродетель (2), Человечность (1), Сила воли (1)</span>
            </div>
          </div>

          ${this.renderMeritsFlawsSection()}

          <div class="flex gap-3">
            <button class="btn btn-secondary" onclick="app.switchPhase('setup')">← Назад к настройке</button>
            <button class="btn btn-primary flex-1" onclick="app.switchPhase('xp')">Далее: Опыт →</button>
          </div>
        </div>

        ${this.renderAttributes()}
        ${this.renderAbilities()}
        ${this.renderAdvantages()}
      </div>
    `;
  }

  renderMeritsFlawsSection() {
    return `
      <div class="mb-6 p-4 bg-gray-900 rounded">
        <h4 class="font-semibold mb-3">Достоинства и Недостатки</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Current Merits -->
          <div>
            <div class="text-sm font-medium mb-2">Достоинства (стоят бонусные очки):</div>
            <div class="space-y-2">
              ${this.character.merits.length === 0 ?
                '<div class="text-xs text-gray-500">Нет выбранных достоинств</div>' :
                this.character.merits.map(merit => `
                  <div class="p-2 bg-gray-800 rounded flex justify-between items-center">
                    <div class="font-medium text-sm">${merit.name}</div>
                    <div class="ml-2 text-nowrap">
                      <span class="text-vtm-red font-medium">${merit.selectedCost || merit.cost}</span>
                      <button class="ml-2 text-red-400 hover:text-red-300" onclick="app.removeMerit('${merit.id}')">✕</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>
            <button class="btn btn-secondary w-full mt-2 text-sm" onclick="app.showMeritsModal()">+ Добавить достоинство</button>
          </div>

          <!-- Current Flaws -->
          <div>
            <div class="text-sm font-medium mb-2">Недостатки (дают бонусные очки, макс. 7):</div>
            <div class="space-y-2">
              ${this.character.flaws.length === 0 ?
                '<div class="text-xs text-gray-500">Нет выбранных недостатков</div>' :
                this.character.flaws.map(flaw => `
                  <div class="p-2 bg-gray-800 rounded flex justify-between items-center">
                    <div class="font-medium text-sm">${flaw.name}</div>
                    <div class="ml-2 text-nowrap">
                      <span class="text-green-400 font-medium">+${flaw.selectedCost || flaw.cost}</span>
                      <button class="ml-2 text-red-400 hover:text-red-300" onclick="app.removeFlaw('${flaw.id}')">✕</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>
            <button class="btn btn-secondary w-full mt-2 text-sm" onclick="app.showFlawsModal()">+ Добавить недостаток</button>
          </div>
        </div>
      </div>
    `;
  }

  renderXPPhase() {
    const available = this.character.experience - this.character.experienceSpent;

    return `
      <div class="space-y-4">
        <div class="card">
          <h3 class="section-title">Распределение опыта (XP)</h3>

          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-lg font-bold mb-2">
              Доступно: <span class="${available >= 0 ? 'text-green-400' : 'text-red-400'}">${available}</span> / 33 XP
            </div>
            <div class="text-sm text-gray-400 mb-2">
              Древние начинают с 33 опыта
            </div>
            <div class="text-sm text-yellow-400">
              Кликните на пустую точку справа от текущего значения для повышения. Стоимость: Атрибут (текущее × 4), Способность (новая: 3, текущее × 2), Дисциплина (новая: 10, текущее × 5-10), Добродетель (текущее × 2), Человечность (текущее × 2), Сила воли (текущее)</div>
          </div>

          <button class="btn btn-secondary w-full" onclick="app.switchPhase('freebies')">← Назад к Freebies</button>
        </div>

        ${this.renderAttributes()}
        ${this.renderAbilities()}
        ${this.renderAdvantages()}
      </div>
    `;
  }

  renderSummary() {
    const validation = this.tracker.validateAll();
    const allValid = Object.values(validation).every(v => v.valid);

    return `
      <div class="card">
        <h3 class="section-title">Итоги персонажа</h3>

        <div class="mb-6 p-4 ${allValid ? 'bg-green-900' : 'bg-yellow-900'} rounded">
          <div class="font-medium mb-2">${allValid ? '✓ Базовая настройка завершена' : '⚠ Базовая настройка не завершена'}</div>
          ${!allValid ? `
            <div class="text-sm space-y-1">
              ${Object.entries(validation).map(([key, val]) =>
                !val.valid ? val.errors.map(err => `<div>• ${err}</div>`).join('') : ''
              ).join('')}
            </div>
          ` : ''}
        </div>

        <div class="space-y-4">
          <div>
            <strong>Имя:</strong> ${this.character.name || '—'}<br>
            <strong>Клан:</strong> ${this.getClanName()}<br>
            <strong>Поколение:</strong> ${this.character.getEffectiveGeneration()}<br>
            <strong>Концепция:</strong> ${this.character.concept || '—'}
          </div>

          <div>
            <strong>Freebies:</strong> ${this.character.freebiesSpent}/${this.character.freebies}<br>
            <strong>Опыт:</strong> ${this.character.experienceSpent}/${this.character.experience}
          </div>

          <div class="text-sm text-gray-400 mb-2">
            Вы можете завершить создание персонажа даже если не потратили все бонусные очки или опыт.
          </div>

          <button class="btn btn-primary w-full" id="finalizeBtn">
            Завершить создание персонажа
          </button>
        </div>
      </div>
    `;
  }

  getClanName() {
    const clan = clansData.find(c => c.id === this.character.clan);
    return clan ? clan.name : '—';
  }

  getClanDisciplines() {
    const clan = clansData.find(c => c.id === this.character.clan);
    return clan ? clan.disciplines : [];
  }

  renderDots(current, max, category, subcategory, attr) {
    let html = '';

    // Determine the allowed limit based on phase and category
    let allowedMax = max;

    if (this.currentPhase === 'setup') {
      // In setup phase, enforce limits
      if (category === 'attributes') {
        allowedMax = 6; // Max 6 for attributes in setup
      } else if (category === 'abilities') {
        allowedMax = 5; // Max 5 for abilities in setup
      } else if (category === 'virtues') {
        allowedMax = 5; // Max 5 for virtues
      } else if (category === 'backgrounds') {
        allowedMax = 5; // Max 5 for backgrounds
      } else if (category === 'humanity' || category === 'willpower') {
        allowedMax = 0; // Cannot click these in setup phase - they're derived
      }
    }

    for (let i = 1; i <= max; i++) {
      const filled = i <= current ? 'filled' : '';
      const disabled = i > allowedMax ? 'opacity-50 cursor-not-allowed' : '';
      // No onclick - handled by global event delegation
      html += `<div class="dot ${filled} ${disabled}" data-value="${i}"></div>`;
    }
    return html;
  }

  showMeritsModal() {
    const allMerits = [];

    // Core merits
    Object.entries(meritsData).forEach(([category, items]) => {
      if (category !== 'clanSpecific') {
        items.forEach(merit => {
          allMerits.push({ ...merit, category, isClanSpecific: false });
        });
      }
    });

    // Clan-specific merits (available to all)
    const clanMerits = meritsData.clanSpecific;
    if (clanMerits && this.character.clan) {
      Object.entries(clanMerits).forEach(([clanId, items]) => {
        items.forEach(merit => {
          allMerits.push({ ...merit, clan: clanId, isClanSpecific: true });
        });
      });
    }

    this.showMeritFlawModal(allMerits, 'merits');
  }

  showFlawsModal() {
    const allFlaws = [];

    // All flaws from the data file
    Object.entries(flawsData).forEach(([category, items]) => {
      items.forEach(flaw => {
        allFlaws.push({ ...flaw, category });
      });
    });

    this.showMeritFlawModal(allFlaws, 'flaws');
  }

  showMeritFlawModal(items, type) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.id = 'meritFlawModal';

    const categories = [...new Set(items.map(i => i.category))];

    modal.innerHTML = `
      <div class="bg-vtm-grey rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4 sticky top-0 bg-vtm-grey pb-2">
          <h3 class="text-2xl font-bold text-vtm-red">${type === 'merits' ? 'Выбрать Достоинство' : 'Выбрать Недостаток'}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="document.getElementById('meritFlawModal').remove()">&times;</button>
        </div>

        <div class="mb-4">
          <input type="text" id="meritFlawSearch" placeholder="Поиск..." class="input-field">
        </div>

        <div class="space-y-4">
          ${categories.map(category => {
            const categoryItems = items.filter(i => i.category === category);
            const categoryName = {
              'physical': 'Физические',
              'mental': 'Ментальные',
              'social': 'Социальные',
              'supernatural': 'Сверхъестественные'
            }[category] || category;

            return `
              <details open class="category-section">
                <summary class="cursor-pointer font-semibold text-lg mb-2 text-vtm-red">${categoryName} (${categoryItems.length})</summary>
                <div class="space-y-2 pl-2">
                  ${categoryItems.map(item => {
                    const isVariable = item.cost === 'variable' || (item.minCost && item.maxCost);
                    const costDisplay = isVariable ?
                      `${item.minCost}-${item.maxCost}` :
                      item.cost;

                    // Check if item should be disabled
                    const isDisabled = this.isMeritFlawDisabled(item);
                    const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 cursor-pointer';
                    const disabledAttr = isDisabled ? 'data-disabled="true"' : '';

                    return `
                      <div class="merit-flaw-item p-3 bg-gray-800 rounded ${disabledClass} transition-colors"
                           data-id="${item.id}"
                           data-name="${item.name}"
                           data-cost="${item.cost}"
                           data-min-cost="${item.minCost || item.cost}"
                           data-max-cost="${item.maxCost || item.cost}"
                           data-is-variable="${isVariable}"
                           ${disabledAttr}
                           onclick="app.selectMeritFlaw(this, '${type}')">
                        <div class="flex justify-between items-start mb-1">
                          <div class="font-medium">${item.name}</div>
                          <div class="text-${type === 'merits' ? 'vtm-red' : 'green-400'} font-medium ml-2">${type === 'merits' ? '-' : '+'}${costDisplay}</div>
                        </div>
                        ${item.description ? `<div class="text-xs text-gray-400">${item.description}</div>` : ''}
                        ${item.elderNote ? `<div class="text-xs text-yellow-400 mt-1">⚠️ ${item.elderNote}</div>` : ''}
                        ${isDisabled ? `<div class="text-xs text-red-400 mt-1">❌ ${this.getMeritFlawDisabledReason(item)}</div>` : ''}
                        ${item.isClanSpecific ? `<div class="text-xs text-blue-400 mt-1">🔹 Связано с кланом ${this.getClanName(item.clan)}</div>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </details>
            `;
          }).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add search functionality
    const searchInput = document.getElementById('meritFlawSearch');
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.merit-flaw-item').forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(query) ? 'block' : 'none';
      });
    });

    searchInput.focus();
  }

  selectMeritFlaw(element, type) {
    if (element.dataset.disabled === 'true') return;

    const itemData = {
      id: element.dataset.id,
      name: element.dataset.name,
      cost: element.dataset.cost === 'variable' ? parseInt(element.dataset.minCost) : parseInt(element.dataset.cost),
      description: element.querySelector('.text-gray-400')?.textContent || '',
      elderNote: element.querySelector('.text-yellow-400')?.textContent.replace('⚠️ ', '') || ''
    };

    const isVariable = element.dataset.isVariable === 'true';

    if (isVariable) {
      const minCost = parseInt(element.dataset.minCost);
      const maxCost = parseInt(element.dataset.maxCost);
      this.showDotSelectionModal(itemData, minCost, maxCost, type);
    } else {
      if (type === 'merits') {
        this.addMerit(itemData, itemData.cost);
      } else {
        this.addFlaw(itemData, itemData.cost);
      }
      document.getElementById('meritFlawModal').remove();
    }
  }

  showDotSelectionModal(itemData, minCost, maxCost, type) {
    const existingDotModal = document.getElementById('dotSelectionModal');
    if (existingDotModal) existingDotModal.remove();

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]';
    modal.id = 'dotSelectionModal';

    modal.innerHTML = `
      <div class="bg-vtm-grey rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-vtm-red mb-4">${itemData.name}</h3>
        <p class="text-sm text-gray-400 mb-4">Выберите стоимость (${minCost}-${maxCost} ${type === 'merits' ? 'очков' : 'очков'}):</p>

        <div class="flex gap-2 justify-center mb-6">
          ${Array.from({ length: maxCost - minCost + 1 }, (_, i) => minCost + i).map(cost => `
            <button class="dot-selector w-12 h-12 rounded-full border-2 border-gray-600 hover:border-vtm-red flex items-center justify-center font-bold transition-colors"
                    data-cost="${cost}"
                    onclick="app.selectDotCost(${cost})">
              ${cost}
            </button>
          `).join('')}
        </div>

        <div class="flex gap-2">
          <button class="btn btn-secondary flex-1" onclick="document.getElementById('dotSelectionModal').remove()">Отмена</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Store the item data and type for the callback
    modal.dataset.itemData = JSON.stringify(itemData);
    modal.dataset.type = type;
  }

  selectDotCost(cost) {
    const modal = document.getElementById('dotSelectionModal');
    const itemData = JSON.parse(modal.dataset.itemData);
    const type = modal.dataset.type;

    if (type === 'merits') {
      this.addMerit(itemData, cost);
    } else {
      this.addFlaw(itemData, cost);
    }

    modal.remove();
    document.getElementById('meritFlawModal').remove();
  }

  addMerit(meritData, selectedCost) {
    // Check if already has this merit
    if (this.character.merits.some(m => m.id === meritData.id)) {
      alert('У вас уже есть это достоинство');
      return;
    }

    this.character.merits.push({
      ...meritData,
      selectedCost: selectedCost
    });

    this.character.freebies = this.character.calculateFreebies();
    this.saveToLocalStorage();
    this.render();
    this.attachEventListeners();
  }

  removeMerit(meritId) {
    this.character.merits = this.character.merits.filter(m => m.id !== meritId);
    this.character.freebies = this.character.calculateFreebies();
    this.saveToLocalStorage();
    this.render();
    this.attachEventListeners();
  }

  addFlaw(flawData, selectedCost) {
    // Check if already has this flaw
    if (this.character.flaws.some(f => f.id === flawData.id)) {
      alert('У вас уже есть этот недостаток');
      return;
    }

    // Check max 7 points from flaws
    const currentFlawPoints = this.character.flaws.reduce((sum, f) => sum + (f.selectedCost || f.cost), 0);
    if (currentFlawPoints + selectedCost > 7) {
      alert(`Максимум 7 очков от недостатков. У вас уже ${currentFlawPoints} очков.`);
      return;
    }

    this.character.flaws.push({
      ...flawData,
      selectedCost: selectedCost
    });

    // Handle thin_blood flaw - increases generation
    if (flawData.id === 'thin_blood') {
      this.character.dilutedVitae = selectedCost;
    }

    this.character.freebies = this.character.calculateFreebies();
    this.saveToLocalStorage();
    this.render();
    this.attachEventListeners();
  }

  removeFlaw(flawId) {
    // Handle thin_blood flaw - decreases generation back
    const flaw = this.character.flaws.find(f => f.id === flawId);
    if (flaw && flaw.id === 'thin_blood') {
      this.character.dilutedVitae = 0;
    }

    this.character.flaws = this.character.flaws.filter(f => f.id !== flawId);
    this.character.freebies = this.character.calculateFreebies();
    this.saveToLocalStorage();
    this.render();
    this.attachEventListeners();
  }

  isMeritFlawDisabled(item) {
    // Check clan exclusions
    if (item.excludedClans && item.excludedClans.includes(this.character.clan)) {
      return true;
    }

    // Check minimum requirements
    if (item.minWillpower && this.character.willpower < item.minWillpower) {
      return true;
    }

    if (item.minCharisma && this.character.attributes.social.charisma < item.minCharisma) {
      return true;
    }

    // Check incompatible merits/flaws
    if (item.incompatibleWith) {
      const hasIncompatible = this.character.merits.some(m => item.incompatibleWith.includes(m.id)) ||
                              this.character.flaws.some(f => item.incompatibleWith.includes(f.id));
      if (hasIncompatible) return true;
    }

    return false;
  }

  getMeritFlawDisabledReason(item) {
    if (item.excludedClans && item.excludedClans.includes(this.character.clan)) {
      return `Недоступно для ${this.getClanName()}`;
    }

    if (item.minWillpower && this.character.willpower < item.minWillpower) {
      return `Требуется Сила Воли ${item.minWillpower}+`;
    }

    if (item.minCharisma && this.character.attributes.social.charisma < item.minCharisma) {
      return `Требуется Харизма ${item.minCharisma}+`;
    }

    if (item.incompatibleWith) {
      return 'Несовместимо с другими выбранными опциями';
    }

    return 'Недоступно';
  }

  getClanName(clanId = null) {
    const id = clanId || this.character.clan;
    const clan = clansData.find(c => c.id === id);
    return clan ? clan.name : '';
  }

  switchPhase(phase) {
    // When leaving setup phase, capture baseline to prevent stat reduction later
    if (this.currentPhase === 'setup' && phase !== 'setup') {
      this.character.captureSetupBaseline();
      this.saveToLocalStorage();
    }

    this.currentPhase = phase;
    this.render();
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Remove old global listener if it exists
    if (this.globalClickHandler) {
      document.removeEventListener('click', this.globalClickHandler);
    }

    // ONE global click handler for ALL clicks via event delegation
    this.globalClickHandler = (e) => {
      // Handle dot clicks
      if (e.target.classList.contains('dot') && !e.target.classList.contains('cursor-not-allowed')) {
        const tracker = e.target.closest('.dot-tracker');
        if (tracker) {
          const category = tracker.dataset.category;
          const subcategory = tracker.dataset.subcategory;
          const attr = tracker.dataset.attr;
          const value = parseInt(e.target.dataset.value);
          this.handleDotClick(category, subcategory, attr, value, tracker);
        }
        return;
      }

      // Handle tab clicks
      if (e.target.classList.contains('tab')) {
        const phase = e.target.dataset.phase;
        if (phase) {
          this.switchPhase(phase);
        }
        return;
      }
    };

    document.addEventListener('click', this.globalClickHandler);

    // Basic info text inputs
    ['name', 'player', 'chronicle', 'nature', 'demeanor', 'concept', 'sire'].forEach(field => {
      const el = document.getElementById(field);
      if (el) {
        // Remove old listener if exists
        const oldListener = el._inputListener;
        if (oldListener) {
          el.removeEventListener('input', oldListener);
        }
        // Add new listener and store reference
        const newListener = (e) => {
          this.character[field] = e.target.value;
          this.saveToLocalStorage();
        };
        el.addEventListener('input', newListener);
        el._inputListener = newListener;
      }
    });

    // Clan selection
    const clanSelect = document.getElementById('clan');
    if (clanSelect) {
      if (clanSelect._changeListener) {
        clanSelect.removeEventListener('change', clanSelect._changeListener);
      }
      const changeListener = (e) => {
        const oldClan = this.character.clan;
        this.character.clan = e.target.value;

        // Get old and new clan disciplines
        const oldClanData = clansData.find(c => c.id === oldClan);
        const oldClanDiscs = oldClanData?.disciplines || [];

        const newClanData = clansData.find(c => c.id === this.character.clan);
        const newClanDiscs = newClanData?.disciplines || [];

        // Remove disciplines that were clan-specific to old clan but not new clan
        // Keep disciplines with dots > 0 (already learned), remove only those at 0
        Object.keys(this.character.disciplines).forEach(discId => {
          const wasOldClan = oldClanDiscs.includes(discId);
          const isNewClan = newClanDiscs.includes(discId);
          const hasProgress = this.character.disciplines[discId] > 0;

          // Remove if it was auto-added from old clan and not in new clan and no progress
          if (wasOldClan && !isNewClan && !hasProgress) {
            delete this.character.disciplines[discId];
          }
        });

        // Auto-add new clan disciplines
        if (this.character.clan) {
          newClanDiscs.forEach(discId => {
            // Add clan disciplines if not already present
            if (!(discId in this.character.disciplines)) {
              this.character.disciplines[discId] = 0;
            }
          });
        }

        this.saveToLocalStorage();
        this.render();
        this.attachEventListeners();
      };
      clanSelect.addEventListener('change', changeListener);
      clanSelect._changeListener = changeListener;
    }

    // Add discipline button
    const addDiscBtn = document.getElementById('addDisciplineBtn');
    if (addDiscBtn) {
      if (addDiscBtn._clickListener) {
        addDiscBtn.removeEventListener('click', addDiscBtn._clickListener);
      }
      const clickListener = () => this.showAddDisciplineDialog();
      addDiscBtn.addEventListener('click', clickListener);
      addDiscBtn._clickListener = clickListener;
    }

    // Save/Load buttons
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
      if (saveBtn._clickListener) {
        saveBtn.removeEventListener('click', saveBtn._clickListener);
      }
      const clickListener = () => this.saveCharacter();
      saveBtn.addEventListener('click', clickListener);
      saveBtn._clickListener = clickListener;
    }

    const loadBtn = document.getElementById('loadBtn');
    if (loadBtn) {
      if (loadBtn._clickListener) {
        loadBtn.removeEventListener('click', loadBtn._clickListener);
      }
      const clickListener = () => this.loadCharacter();
      loadBtn.addEventListener('click', clickListener);
      loadBtn._clickListener = clickListener;
    }

    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
      if (exportBtn._clickListener) {
        exportBtn.removeEventListener('click', exportBtn._clickListener);
      }
      const clickListener = () => this.exportToPDF();
      exportBtn.addEventListener('click', clickListener);
      exportBtn._clickListener = clickListener;
    }

    const newCharacterBtn = document.getElementById('newCharacterBtn');
    if (newCharacterBtn) {
      if (newCharacterBtn._clickListener) {
        newCharacterBtn.removeEventListener('click', newCharacterBtn._clickListener);
      }
      const clickListener = () => this.newCharacter();
      newCharacterBtn.addEventListener('click', clickListener);
      newCharacterBtn._clickListener = clickListener;
    }
  }

  newCharacter() {
    if (confirm('Создать нового персонажа? Все несохранённые изменения будут потеряны.')) {
      localStorage.removeItem('vtm_character');
      location.reload();
    }
  }

  handleDotClick(category, subcategory, attr, value, tracker) {
    // In setup phase, humanity and willpower are derived - can't be clicked directly
    if (this.currentPhase === 'setup' && (category === 'humanity' || category === 'willpower')) {
      return;
    }

    // Update character data using existing updateCharacterValue logic
    const updated = this.updateCharacterValue(category, subcategory, attr, value);
    if (!updated) {
      return; // Update was rejected
    }

    // Update the dots visually WITHOUT re-rendering
    const dots = tracker.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      const dotValue = index + 1;
      if (dotValue <= value) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });

    // If virtues changed IN SETUP PHASE, update derived stats (humanity, willpower)
    // In later phases, virtues can be raised independently without affecting humanity/willpower
    if (category === 'virtues' && this.currentPhase === 'setup') {
      this.updateDerivedStats();
    }

    // If generation background changed, update generation displays
    if (category === 'backgrounds' && attr === 'generation') {
      this.updateGenerationDisplays();
    }

    // Update validation displays
    this.updateValidationDisplays();
  }

  updateDerivedStats() {
    // Humanity = Conscience + Self-Control
    this.character.humanity = this.character.virtues.conscience + this.character.virtues.selfControl;

    // Willpower = Courage
    this.character.willpower = this.character.virtues.courage;
    this.character.willpowerCurrent = this.character.willpower;

    // Update humanity display
    const humanityTracker = document.querySelector('[data-category="humanity"]');
    if (humanityTracker) {
      const dots = humanityTracker.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        const dotValue = index + 1;
        if (dotValue <= this.character.humanity) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    // Update willpower display
    const willpowerTracker = document.querySelector('[data-category="willpower"]');
    if (willpowerTracker) {
      const dots = willpowerTracker.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        const dotValue = index + 1;
        if (dotValue <= this.character.willpower) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    this.saveToLocalStorage();
  }

  updateGenerationDisplays() {
    // Update effective generation display in clan section (only exists in setup phase)
    const generationDisplay = document.querySelector('.p-4.bg-gray-800.rounded .text-sm.font-medium');
    if (generationDisplay && generationDisplay.textContent.includes('Текущее поколение')) {
      generationDisplay.textContent = `Текущее поколение: ${this.character.getEffectiveGeneration()}`;
    }

    // Update generation breakdown
    const genBreakdown = generationDisplay?.nextElementSibling;
    if (genBreakdown && genBreakdown.classList.contains('text-xs')) {
      genBreakdown.innerHTML = `
        Базовое: 9<br>
        Фон "Поколение": -${this.character.backgrounds.generation || 0}<br>
        Недостаток "Разбавленная кровь": +${this.character.dilutedVitae}
      `;
    }

    // Update blood pool stats
    const stats = this.character.getBloodPoolStats();
    const bloodPoolDiv = document.querySelector('.text-sm.font-medium.mb-2');
    if (bloodPoolDiv && bloodPoolDiv.textContent.includes('Запас крови')) {
      const bloodPoolDetails = bloodPoolDiv.nextElementSibling;
      if (bloodPoolDetails) {
        bloodPoolDetails.innerHTML = `
          Максимум: ${stats.max}<br>
          За ход: ${stats.perTurn}
        `;
      }
    }

    this.saveToLocalStorage();
  }

  updateCharacterValue(category, subcategory, attr, value) {
    // Get current value
    let currentValue = 0;
    if (category === 'attributes') {
      currentValue = this.character.attributes[subcategory][attr];
    } else if (category === 'abilities') {
      currentValue = this.character.abilities[subcategory][attr] || 0;
    } else if (category === 'disciplines') {
      currentValue = this.character.disciplines[attr] || 0;
    } else if (category === 'backgrounds') {
      currentValue = this.character.backgrounds[attr] || 0;
    } else if (category === 'virtues') {
      currentValue = this.character.virtues[attr];
    } else if (category === 'humanity') {
      currentValue = this.character.humanity;
    } else if (category === 'willpower') {
      currentValue = this.character.willpower;
    }

    // Setup phase: enforce limits
    if (this.currentPhase === 'setup') {
      if (category === 'attributes') {
        // Attributes: max 6 in setup phase
        if (value > 6) {
          return false;
        }
      } else if (category === 'abilities') {
        // Abilities: max 5 in setup phase
        if (value > 5) {
          return false;
        }
      } else if (category === 'virtues') {
        // Virtues: max 5
        if (value > 5) {
          return false;
        }
      } else if (category === 'backgrounds') {
        // Backgrounds: max 5
        if (value > 5) {
          return false;
        }
      }
    }

    // In freebies/xp phases, prevent reducing below setup baseline and spend points for increases
    if (this.currentPhase === 'freebies' || this.currentPhase === 'xp') {
      // Check if we have a baseline (should exist after leaving setup)
      if (this.character.setupBaseline) {
        let baselineValue = 0;

        // Get baseline value for this stat
        if (category === 'attributes') {
          baselineValue = this.character.setupBaseline.attributes[subcategory][attr] || 0;
        } else if (category === 'abilities') {
          baselineValue = this.character.setupBaseline.abilities[subcategory][attr] || 0;
        } else if (category === 'disciplines') {
          baselineValue = this.character.setupBaseline.disciplines[attr] || 0;
        } else if (category === 'backgrounds') {
          baselineValue = this.character.setupBaseline.backgrounds[attr] || 0;
        } else if (category === 'virtues') {
          baselineValue = this.character.setupBaseline.virtues[attr] || 0;
        } else if (category === 'humanity') {
          baselineValue = this.character.setupBaseline.humanity || 0;
        } else if (category === 'willpower') {
          baselineValue = this.character.setupBaseline.willpower || 0;
        }

        // Prevent reducing below baseline
        if (value < baselineValue) {
          return false;
        }
      }

      // If increasing (above current value), calculate cost and spend points
      if (value > currentValue) {
        if (this.currentPhase === 'freebies') {
          // Ensure freebiesSpent is initialized (handle legacy saves)
          if (this.character.freebiesSpent == null) {
            console.log('[DEBUG] freebiesSpent was null, initializing to 0');
            this.character.freebiesSpent = 0;
          }

          console.log(`[DEBUG] Before spending: freebiesSpent = ${this.character.freebiesSpent}`);
          const cost = this.calculateFreebieCost(category, subcategory, attr, currentValue, value);
          console.log(`[DEBUG] Calculated cost: ${cost} for ${category}.${attr} from ${currentValue} to ${value}`);
          const available = this.character.freebies - this.character.freebiesSpent;

          if (cost > available) {
            alert(`Недостаточно бонусных очков. Нужно: ${cost}, доступно: ${available}`);
            return false;
          }

          this.character.freebiesSpent += cost;
          console.log(`[DEBUG] After spending: freebiesSpent = ${this.character.freebiesSpent}`);
        } else if (this.currentPhase === 'xp') {
          // Ensure experienceSpent is initialized (handle legacy saves)
          if (this.character.experienceSpent == null) {
            this.character.experienceSpent = 0;
          }

          const cost = this.calculateXPCost(category, subcategory, attr, currentValue, value);
          const available = this.character.experience - this.character.experienceSpent;

          if (cost > available) {
            alert(`Недостаточно XP. Нужно: ${cost}, доступно: ${available}`);
            return false;
          }

          this.character.experienceSpent += cost;
        }
      }
    }

    // Update the value
    if (category === 'attributes') {
      this.character.attributes[subcategory][attr] = value;
    } else if (category === 'abilities') {
      this.character.abilities[subcategory][attr] = value;
    } else if (category === 'disciplines') {
      this.character.disciplines[attr] = value;

      // Sync primary path level with discipline level
      if (attr === 'necromancy' && this.character.necromancyPaths.length > 0) {
        this.character.necromancyPaths[0].level = value;
      } else if (attr === 'thaumaturgy' && this.character.thaumaturgyPaths.length > 0) {
        this.character.thaumaturgyPaths[0].level = value;
      }
    } else if (category === 'backgrounds') {
      this.character.backgrounds[attr] = value;
    } else if (category === 'virtues') {
      this.character.virtues[attr] = value;
    } else if (category === 'humanity') {
      this.character.humanity = value;
    } else if (category === 'willpower') {
      this.character.willpower = value;
    }

    this.saveToLocalStorage();
    // Don't call updateAllDisplays() here - caller will update UI as needed
    return true; // Update successful
  }

  updateValidationDisplays() {
    // Update only the validation text displays without re-rendering
    const attrValidation = this.tracker.validateAttributes();
    const abilValidation = this.tracker.validateAbilities();
    const discValidation = this.tracker.validateDisciplines();
    const bgValidation = this.tracker.validateBackgrounds();
    const virtValidation = this.tracker.validateVirtues();

    // Update attribute totals if they exist on page
    const attrTotals = {
      physical: attrValidation.totals?.physical || 0,
      social: attrValidation.totals?.social || 0,
      mental: attrValidation.totals?.mental || 0
    };

    // Find and update each display element
    Object.entries(attrTotals).forEach(([category, total]) => {
      const el = document.querySelector(`[data-validation="attributes-${category}"]`);
      if (el) {
        el.textContent = total;
        const isValid = total === 9 || total === 7 || total === 5;
        el.className = isValid ? 'text-green-400' : 'text-red-400';
      }
    });

    // Update ability totals
    const abilTotals = {
      talents: abilValidation.totals?.talents || 0,
      skills: abilValidation.totals?.skills || 0,
      knowledges: abilValidation.totals?.knowledges || 0
    };

    Object.entries(abilTotals).forEach(([category, total]) => {
      const el = document.querySelector(`[data-validation="abilities-${category}"]`);
      if (el) {
        el.textContent = total;
        const isValid = total === 18 || total === 12 || total === 8;
        el.className = isValid ? 'text-green-400' : 'text-red-400';
      }
    });

    // Update discipline total
    const discEl = document.querySelector('[data-validation="disciplines-total"]');
    if (discEl) {
      discEl.textContent = `${discValidation.total}/7`;
      discEl.className = discValidation.total <= 7 ? 'text-green-400' : 'text-red-400';
    }

    // Update background total
    const bgEl = document.querySelector('[data-validation="backgrounds-total"]');
    if (bgEl) {
      bgEl.textContent = `${bgValidation.total}/3`;
      bgEl.className = bgValidation.total <= 3 ? 'text-green-400' : 'text-red-400';
    }

    // Update virtue total
    const virtEl = document.querySelector('[data-validation="virtues-total"]');
    if (virtEl) {
      virtEl.textContent = `${virtValidation.total}/5`;
      virtEl.className = virtValidation.total <= 5 ? 'text-green-400' : 'text-red-400';
    }
  }

  calculateFreebieCost(category, subcategory, attr, currentValue, newValue) {
    const diff = newValue - currentValue;
    let costPerPoint = 0;

    if (category === 'attributes') {
      costPerPoint = FREEBIE_COSTS.attribute;
    } else if (category === 'abilities') {
      costPerPoint = FREEBIE_COSTS.ability;
    } else if (category === 'disciplines') {
      costPerPoint = FREEBIE_COSTS.discipline;
    } else if (category === 'backgrounds') {
      costPerPoint = FREEBIE_COSTS.background;
    } else if (category === 'virtues') {
      costPerPoint = FREEBIE_COSTS.virtue;
    } else if (category === 'humanity') {
      costPerPoint = FREEBIE_COSTS.humanity;
    } else if (category === 'willpower') {
      costPerPoint = FREEBIE_COSTS.willpower;
    }

    return diff * costPerPoint;
  }

  calculateXPCost(category, subcategory, attr, currentValue, newValue) {
    let totalCost = 0;

    // Sum up costs for each level
    for (let level = currentValue + 1; level <= newValue; level++) {
      let costForLevel = 0;

      if (category === 'attributes') {
        costForLevel = XP_COSTS.attribute(level);
      } else if (category === 'abilities') {
        if (currentValue === 0) {
          // New ability
          costForLevel = XP_COSTS.newAbility;
        } else {
          costForLevel = XP_COSTS.ability(level);
        }
      } else if (category === 'disciplines') {
        if (currentValue === 0) {
          // New discipline
          costForLevel = XP_COSTS.newDiscipline;
        } else {
          // Get discipline category and clan affiliation
          const disc = this.allDisciplines.find(d => d.id === attr);
          const clanDiscs = this.getClanDisciplines();
          const isClan = clanDiscs.includes(attr);
          const isCaitiff = this.character.clan === 'caitiff';

          if (isCaitiff) {
            costForLevel = XP_COSTS.discipline[disc.category].caitiff(level);
          } else if (isClan) {
            costForLevel = XP_COSTS.discipline[disc.category].clan(level);
          } else {
            costForLevel = XP_COSTS.discipline[disc.category].nonClan(level);
          }
        }
      } else if (category === 'virtues') {
        costForLevel = XP_COSTS.virtue(level);
      } else if (category === 'humanity') {
        costForLevel = XP_COSTS.humanity(level);
      } else if (category === 'willpower') {
        costForLevel = XP_COSTS.willpower(level);
      } else if (category === 'backgrounds') {
        // Backgrounds can't be raised with XP in standard rules
        return 999;
      }

      totalCost += costForLevel;
    }

    return totalCost;
  }

  updateAllDisplays() {
    // Re-render the entire page to update all displays
    this.render();
    this.attachEventListeners();
  }

  showAddDisciplineDialog() {
    // Get already learned disciplines
    const learnedDisciplines = Object.keys(this.character.disciplines);
    const availableDisciplines = this.allDisciplines.filter(d => !learnedDisciplines.includes(d.id));

    // Group by category
    const grouped = {
      physical: availableDisciplines.filter(d => d.category === 'physical'),
      mental: availableDisciplines.filter(d => d.category === 'mental'),
      unique: availableDisciplines.filter(d => d.category === 'unique')
    };

    const clanDisciplines = this.getClanDisciplines();

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-vtm-grey rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-vtm-red">Выбрать дисциплину</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="this.closest('.fixed').remove()">&times;</button>
        </div>

        <div class="mb-4">
          <input type="text" id="disciplineSearch" placeholder="Поиск по названию..."
                 class="input-field" autocomplete="off">
        </div>

        <div id="disciplineList" class="space-y-4">
          ${this.renderDisciplineCategory('Физические', grouped.physical, clanDisciplines)}
          ${this.renderDisciplineCategory('Ментальные', grouped.mental, clanDisciplines)}
          ${this.renderDisciplineCategory('Уникальные', grouped.unique, clanDisciplines)}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add search functionality
    const searchInput = document.getElementById('disciplineSearch');
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = document.querySelectorAll('.discipline-item');
      items.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(query) ? 'flex' : 'none';
      });
    });

    // Focus search input
    searchInput.focus();
  }

  renderDisciplineCategory(title, disciplines, clanDisciplines) {
    if (disciplines.length === 0) return '';

    return `
      <div>
        <h4 class="text-lg font-semibold text-gray-300 mb-2">${title}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          ${disciplines.map(disc => {
            const isClan = clanDisciplines.includes(disc.id);
            return `
              <div class="discipline-item p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors flex justify-between items-center"
                   data-name="${disc.name}"
                   onclick="app.selectDiscipline('${disc.id}')">
                <div>
                  <div class="font-medium">${disc.name}</div>
                  <div class="text-xs text-gray-400">${disc.description || ''}</div>
                </div>
                ${isClan ? '<span class="text-xs text-green-400 font-semibold">Клановая</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  selectDiscipline(discId) {
    this.character.disciplines[discId] = 1;
    this.saveToLocalStorage();

    // Close modal
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) modal.remove();

    // Refresh display
    this.updateAllDisplays();
  }

  removeDiscipline(discId) {
    delete this.character.disciplines[discId];
    this.saveToLocalStorage();
    this.updateAllDisplays();
  }

  managePaths(discId) {
    this.currentManagingDiscipline = discId;
    this.showPathManagementModal(discId);
  }

  showPathManagementModal(discId) {
    const isNecromancy = discId === 'necromancy';
    const paths = isNecromancy ? this.character.necromancyPaths : this.character.thaumaturgyPaths;
    const availablePaths = isNecromancy ? necromancyData.paths : thaumaturgyData.paths;
    const disciplineLevel = this.character.disciplines[discId] || 0;
    const title = isNecromancy ? 'Некромантия' : 'Тауматургия';

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-vtm-grey rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-vtm-red">Пути ${title}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="app.closePathModal()">&times;</button>
        </div>

        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="text-sm text-gray-400">
            <strong>Основной путь:</strong> Уровень равен уровню дисциплины (${disciplineLevel})<br>
            <strong>Вторичные пути:</strong> Изучение нового пути - 7 XP, повышение - текущее × 4 XP
          </div>
        </div>

        ${paths.length > 0 ? `
          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">Изученные пути</h4>
            ${paths.map((path, idx) => {
              const pathData = availablePaths.find(p => p.id === path.pathId);
              const isPrimary = idx === 0;
              return `
                <div class="mb-3 p-3 bg-gray-800 rounded">
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                      <div class="font-medium">${pathData?.name || path.pathId}</div>
                      ${isPrimary ? '<div class="text-xs text-green-400">Основной путь</div>' : '<div class="text-xs text-blue-400">Вторичный путь</div>'}
                    </div>
                    ${!isPrimary ? `
                      <button class="text-red-500 hover:text-red-400 text-xl" onclick="app.removePath('${discId}', '${path.pathId}')">×</button>
                    ` : ''}
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-400">Уровень:</span>
                    <div class="dot-tracker" data-discipline="${discId}" data-path="${path.pathId}">
                      ${this.renderDotsForPath(path.level, isPrimary ? disciplineLevel : 5, isPrimary)}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : '<div class="text-gray-400 text-center py-4 mb-4">Пути не изучены</div>'}

        <button class="btn btn-primary w-full" onclick="app.showAddPathDialog('${discId}')">
          + Добавить ${paths.length === 0 ? 'основной' : 'вторичный'} путь
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    // Attach event listeners to path dots
    setTimeout(() => {
      this.attachPathDotListeners(discId);
    }, 0);
  }

  renderDotsForPath(currentLevel, maxLevel, isPrimary) {
    let html = '';
    for (let i = 1; i <= maxLevel; i++) {
      const filled = i <= currentLevel ? 'filled' : '';
      const disabled = isPrimary ? 'opacity-50 cursor-not-allowed' : '';
      html += `<div class="dot ${filled} ${disabled}" data-value="${i}"></div>`;
    }
    return html;
  }

  attachPathDotListeners(discId) {
    const trackers = document.querySelectorAll(`[data-discipline="${discId}"]`);
    trackers.forEach(tracker => {
      const pathId = tracker.dataset.path;
      const dots = tracker.querySelectorAll('.dot:not(.opacity-50)');

      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const level = parseInt(dot.dataset.value);
          this.updatePathLevel(discId, pathId, level);
        });
      });
    });
  }

  updatePathLevel(discId, pathId, level) {
    if (discId === 'necromancy') {
      this.character.updateNecromancyPathLevel(pathId, level);
    } else {
      this.character.updateThaumaturgyPathLevel(pathId, level);
    }
    this.saveToLocalStorage();
    this.closePathModal();
    this.managePaths(discId); // Reopen modal with updated data
  }

  showAddPathDialog(discId) {
    const isNecromancy = discId === 'necromancy';
    const paths = isNecromancy ? this.character.necromancyPaths : this.character.thaumaturgyPaths;
    const availablePaths = isNecromancy ? necromancyData.paths : thaumaturgyData.paths;
    const disciplineLevel = this.character.disciplines[discId] || 0;
    const title = isNecromancy ? 'Некромантии' : 'Тауматургии';

    // Filter out already learned paths
    const usedPathIds = paths.map(p => p.pathId);
    const unusedPaths = availablePaths.filter(p => !usedPathIds.includes(p.id));

    if (unusedPaths.length === 0) {
      alert('Все пути уже изучены!');
      return;
    }

    const isPrimary = paths.length === 0;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.id = 'pathSelectionModal';
    modal.innerHTML = `
      <div class="bg-vtm-grey rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-vtm-red">Выбрать путь ${title}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="document.getElementById('pathSelectionModal').remove()">&times;</button>
        </div>

        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="text-sm text-gray-400">
            ${isPrimary ? '<strong>Основной путь:</strong> Уровень будет равен уровню дисциплины' : '<strong>Вторичный путь:</strong> Начнётся с уровня 1'}
          </div>
        </div>

        <div class="mb-4">
          <input type="text" id="pathSearch" placeholder="Поиск по названию..."
                 class="input-field" autocomplete="off">
        </div>

        <div id="pathList" class="space-y-2">
          ${unusedPaths.map(path => `
            <div class="path-item p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors"
                 data-name="${path.name}"
                 onclick="app.selectPath('${discId}', '${path.id}')">
              <div class="font-medium">${path.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add search functionality
    const searchInput = document.getElementById('pathSearch');
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = document.querySelectorAll('.path-item');
      items.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(query) ? 'block' : 'none';
      });
    });

    // Focus search input
    searchInput.focus();
  }

  selectPath(discId, pathId) {
    const isNecromancy = discId === 'necromancy';
    const paths = isNecromancy ? this.character.necromancyPaths : this.character.thaumaturgyPaths;
    const disciplineLevel = this.character.disciplines[discId] || 0;
    const isPrimary = paths.length === 0;
    const startLevel = isPrimary ? disciplineLevel : 1;

    if (isNecromancy) {
      this.character.addNecromancyPath(pathId, startLevel);
    } else {
      this.character.addThaumaturgyPath(pathId, startLevel);
    }

    this.saveToLocalStorage();

    // Close path selection modal
    const selectionModal = document.getElementById('pathSelectionModal');
    if (selectionModal) selectionModal.remove();

    // Close and reopen main path management modal
    this.closePathModal();
    this.managePaths(discId);
  }

  removePath(discId, pathId) {
    if (confirm('Удалить этот путь?')) {
      if (discId === 'necromancy') {
        this.character.removeNecromancyPath(pathId);
      } else {
        this.character.removeThaumaturgyPath(pathId);
      }
      this.saveToLocalStorage();
      this.closePathModal();
      this.managePaths(discId); // Reopen modal
    }
  }

  closePathModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
      modal.remove();
    }
    this.updateAllDisplays();
  }

  // Freebies Spending Interface Methods
  handleFreebieTypeChange(type) {
    const optionsDiv = document.getElementById('freebiePurchaseOptions');
    const costDisplay = document.getElementById('freebieCostDisplay');
    const purchaseBtn = document.getElementById('freebiePurchaseBtn');

    if (!type) {
      optionsDiv.innerHTML = '';
      costDisplay.classList.add('hidden');
      purchaseBtn.classList.add('hidden');
      return;
    }

    let optionsHTML = '';

    if (type === 'attribute') {
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Категория</label>
          <select id="freebieAttrCategory" class="input-field">
            <option value="">Выберите категорию</option>
            <option value="physical">Физические</option>
            <option value="social">Социальные</option>
            <option value="mental">Ментальные</option>
          </select>
        </div>
        <div id="freebieAttrSelection"></div>
      `;
    } else if (type === 'ability') {
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Категория</label>
          <select id="freebieAbilityCategory" class="input-field">
            <option value="">Выберите категорию</option>
            <option value="talents">Таланты</option>
            <option value="skills">Навыки</option>
            <option value="knowledges">Познания</option>
          </select>
        </div>
        <div id="freebieAbilitySelection"></div>
      `;
    } else if (type === 'discipline') {
      const disciplinesList = this.allDisciplines.map(disc =>
        `<option value="${disc.id}">${disc.name}</option>`
      ).join('');
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Дисциплина</label>
          <select id="freebieDiscipline" class="input-field">
            <option value="">Выберите дисциплину</option>
            ${disciplinesList}
          </select>
        </div>
      `;
    } else if (type === 'background') {
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Предыстория</label>
          <select id="freebieBackground" class="input-field">
            <option value="">Выберите предысторию</option>
            ${backgroundsData.map(bg => `<option value="${bg.id}">${bg.name}</option>`).join('')}
          </select>
        </div>
      `;
    } else if (type === 'virtue') {
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Добродетель</label>
          <select id="freebieVirtue" class="input-field">
            <option value="">Выберите добродетель</option>
            <option value="conscience">Совесть</option>
            <option value="selfControl">Самоконтроль</option>
            <option value="courage">Храбрость</option>
          </select>
        </div>
      `;
    } else if (type === 'humanity' || type === 'willpower') {
      optionsHTML = `<div class="text-sm text-gray-400">Выбрано: ${type === 'humanity' ? 'Человечность' : 'Сила воли'}</div>`;
    }

    optionsDiv.innerHTML = optionsHTML;

    // Add change listeners
    if (type === 'attribute') {
      const catSelect = document.getElementById('freebieAttrCategory');
      if (catSelect) {
        catSelect.addEventListener('change', (e) => this.showFreebieAttributeList(e.target.value));
      }
    } else if (type === 'ability') {
      const catSelect = document.getElementById('freebieAbilityCategory');
      if (catSelect) {
        catSelect.addEventListener('change', (e) => this.showFreebieAbilityList(e.target.value));
      }
    } else if (type === 'discipline') {
      const discSelect = document.getElementById('freebieDiscipline');
      if (discSelect) {
        discSelect.addEventListener('change', () => this.calculateFreebieCost());
      }
    } else if (type === 'background') {
      const bgSelect = document.getElementById('freebieBackground');
      if (bgSelect) {
        bgSelect.addEventListener('change', () => this.calculateFreebieCost());
      }
    } else if (type === 'virtue') {
      const virtueSelect = document.getElementById('freebieVirtue');
      if (virtueSelect) {
        virtueSelect.addEventListener('change', () => this.calculateFreebieCost());
      }
    } else if (type === 'humanity' || type === 'willpower') {
      this.calculateFreebieCost();
    }
  }

  showFreebieAttributeList(category) {
    const selectionDiv = document.getElementById('freebieAttrSelection');
    if (!category) {
      selectionDiv.innerHTML = '';
      return;
    }

    const attrs = this.character.attributes[category];
    const attrNames = {
      physical: { strength: 'Сила', dexterity: 'Ловкость', stamina: 'Выносливость' },
      social: { charisma: 'Обаяние', manipulation: 'Манипулирование', appearance: 'Привлекательность' },
      mental: { perception: 'Восприятие', intelligence: 'Интеллект', wits: 'Смекалка' }
    };

    const options = Object.keys(attrs).map(attr =>
      `<option value="${attr}">${attrNames[category][attr]} (${attrs[attr]})</option>`
    ).join('');

    selectionDiv.innerHTML = `
      <div>
        <label class="block text-sm font-medium mb-1">Атрибут</label>
        <select id="freebieAttribute" class="input-field">
          <option value="">Выберите атрибут</option>
          ${options}
        </select>
      </div>
    `;

    const attrSelect = document.getElementById('freebieAttribute');
    if (attrSelect) {
      attrSelect.addEventListener('change', () => this.calculateFreebieCost());
    }
  }

  showFreebieAbilityList(category) {
    const selectionDiv = document.getElementById('freebieAbilitySelection');
    if (!category) {
      selectionDiv.innerHTML = '';
      return;
    }

    const abilities = abilitiesData[category];
    const options = abilities.map(ability => {
      const current = this.character.abilities[category][ability.id] || 0;
      return `<option value="${ability.id}">${ability.name} (${current})</option>`;
    }).join('');

    selectionDiv.innerHTML = `
      <div>
        <label class="block text-sm font-medium mb-1">Способность</label>
        <select id="freebieAbility" class="input-field">
          <option value="">Выберите способность</option>
          ${options}
        </select>
      </div>
    `;

    const abilitySelect = document.getElementById('freebieAbility');
    if (abilitySelect) {
      abilitySelect.addEventListener('change', () => this.calculateFreebieCost());
    }
  }

  calculateFreebieCost() {
    const type = document.getElementById('freebieType')?.value;
    if (!type) return;

    let cost = 0;
    let details = '';
    let canPurchase = false;

    if (type === 'attribute') {
      const category = document.getElementById('freebieAttrCategory')?.value;
      const attr = document.getElementById('freebieAttribute')?.value;
      if (category && attr) {
        const current = this.character.attributes[category][attr];
        cost = FREEBIE_COSTS.attribute;
        details = `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 10;
      }
    } else if (type === 'ability') {
      const category = document.getElementById('freebieAbilityCategory')?.value;
      const ability = document.getElementById('freebieAbility')?.value;
      if (category && ability) {
        const current = this.character.abilities[category][ability] || 0;
        cost = FREEBIE_COSTS.ability;
        details = `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 10;
      }
    } else if (type === 'discipline') {
      const discId = document.getElementById('freebieDiscipline')?.value;
      if (discId) {
        const current = this.character.disciplines[discId] || 0;
        cost = FREEBIE_COSTS.discipline;
        details = `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 10;
      }
    } else if (type === 'background') {
      const bgId = document.getElementById('freebieBackground')?.value;
      if (bgId) {
        const current = this.character.backgrounds[bgId] || 0;
        cost = FREEBIE_COSTS.background;
        details = `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 5;
      }
    } else if (type === 'virtue') {
      const virtue = document.getElementById('freebieVirtue')?.value;
      if (virtue) {
        const current = this.character.virtues[virtue];
        cost = FREEBIE_COSTS.virtue;
        details = `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 10;
      }
    } else if (type === 'humanity') {
      const current = this.character.humanity;
      cost = FREEBIE_COSTS.humanity;
      details = `Текущее значение: ${current}, новое: ${current + 1}`;
      canPurchase = current < 10;
    } else if (type === 'willpower') {
      const current = this.character.willpower;
      cost = FREEBIE_COSTS.willpower;
      details = `Текущее значение: ${current}, новое: ${current + 1}`;
      canPurchase = current < 10;
    }

    // Update display
    const costDisplay = document.getElementById('freebieCostDisplay');
    const costAmount = document.getElementById('freebieCostAmount');
    const costDetailsDiv = document.getElementById('freebieCostDetails');
    const purchaseBtn = document.getElementById('freebiePurchaseBtn');

    if (cost > 0 && canPurchase) {
      costAmount.textContent = cost;
      costDetailsDiv.textContent = details;
      costDisplay.classList.remove('hidden');
      purchaseBtn.classList.remove('hidden');

      const available = this.character.freebies - this.character.freebiesSpent;
      if (cost > available) {
        purchaseBtn.disabled = true;
        purchaseBtn.textContent = `Недостаточно бонусных очков (нужно ${cost}, есть ${available})`;
      } else {
        purchaseBtn.disabled = false;
        purchaseBtn.textContent = 'Купить';
      }
    } else {
      costDisplay.classList.add('hidden');
      purchaseBtn.classList.add('hidden');
    }
  }

  handleFreebiePurchase() {
    const type = document.getElementById('freebieType')?.value;
    if (!type) return;

    const costAmount = parseInt(document.getElementById('freebieCostAmount')?.textContent || '0');
    const available = this.character.freebies - this.character.freebiesSpent;

    if (costAmount > available) {
      alert('Недостаточно бонусных очков!');
      return;
    }

    // Make the purchase
    if (type === 'attribute') {
      const category = document.getElementById('freebieAttrCategory')?.value;
      const attr = document.getElementById('freebieAttribute')?.value;
      if (category && attr) {
        this.character.attributes[category][attr]++;
        this.character.freebiesSpent += costAmount;
      }
    } else if (type === 'ability') {
      const category = document.getElementById('freebieAbilityCategory')?.value;
      const ability = document.getElementById('freebieAbility')?.value;
      if (category && ability) {
        if (!this.character.abilities[category][ability]) {
          this.character.abilities[category][ability] = 0;
        }
        this.character.abilities[category][ability]++;
        this.character.freebiesSpent += costAmount;
      }
    } else if (type === 'discipline') {
      const discId = document.getElementById('freebieDiscipline')?.value;
      if (discId) {
        if (!this.character.disciplines[discId]) {
          this.character.disciplines[discId] = 0;
        }
        this.character.disciplines[discId]++;
        this.character.freebiesSpent += costAmount;
      }
    } else if (type === 'background') {
      const bgId = document.getElementById('freebieBackground')?.value;
      if (bgId) {
        if (!this.character.backgrounds[bgId]) {
          this.character.backgrounds[bgId] = 0;
        }
        this.character.backgrounds[bgId]++;
        this.character.freebiesSpent += costAmount;
      }
    } else if (type === 'virtue') {
      const virtue = document.getElementById('freebieVirtue')?.value;
      if (virtue) {
        this.character.virtues[virtue]++;
        this.character.freebiesSpent += costAmount;
      }
    } else if (type === 'humanity') {
      this.character.humanity++;
      this.character.freebiesSpent += costAmount;
    } else if (type === 'willpower') {
      this.character.willpower++;
      this.character.freebiesSpent += costAmount;
    }

    // Save and re-render
    this.saveToLocalStorage();
    this.render();
    this.attachEventListeners();
    this.updateAllDisplays();

    alert(`Куплено за ${costAmount} бонусных очков!`);
  }

  // XP Spending Interface Methods
  handleXPTypeChange(type) {
    const optionsDiv = document.getElementById('xpPurchaseOptions');
    const costDisplay = document.getElementById('xpCostDisplay');
    const purchaseBtn = document.getElementById('xpPurchaseBtn');

    if (!type) {
      optionsDiv.innerHTML = '';
      costDisplay.classList.add('hidden');
      purchaseBtn.classList.add('hidden');
      return;
    }

    let optionsHTML = '';

    if (type === 'attribute') {
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Категория</label>
          <select id="xpAttrCategory" class="input-field">
            <option value="">Выберите категорию</option>
            <option value="physical">Физические</option>
            <option value="social">Социальные</option>
            <option value="mental">Ментальные</option>
          </select>
        </div>
        <div id="xpAttrSelection"></div>
      `;
    } else if (type === 'ability') {
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Категория</label>
          <select id="xpAbilityCategory" class="input-field">
            <option value="">Выберите категорию</option>
            <option value="talents">Таланты</option>
            <option value="skills">Навыки</option>
            <option value="knowledges">Познания</option>
          </select>
        </div>
        <div id="xpAbilitySelection"></div>
      `;
    } else if (type === 'discipline') {
      const disciplinesList = this.allDisciplines.map(disc =>
        `<option value="${disc.id}">${disc.name}</option>`
      ).join('');
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Дисциплина</label>
          <select id="xpDiscipline" class="input-field">
            <option value="">Выберите дисциплину</option>
            ${disciplinesList}
          </select>
        </div>
      `;
    } else if (type === 'virtue') {
      optionsHTML = `
        <div>
          <label class="block text-sm font-medium mb-1">Добродетель</label>
          <select id="xpVirtue" class="input-field">
            <option value="">Выберите добродетель</option>
            <option value="conscience">Совесть</option>
            <option value="selfControl">Самоконтроль</option>
            <option value="courage">Храбрость</option>
          </select>
        </div>
      `;
    } else if (type === 'humanity' || type === 'willpower') {
      optionsHTML = `<div class="text-sm text-gray-400">Выбрано: ${type === 'humanity' ? 'Человечность' : 'Сила воли'}</div>`;
    }

    optionsDiv.innerHTML = optionsHTML;

    // Add change listeners for dynamic selects
    if (type === 'attribute') {
      const catSelect = document.getElementById('xpAttrCategory');
      if (catSelect) {
        catSelect.addEventListener('change', (e) => this.showXPAttributeList(e.target.value));
      }
    } else if (type === 'ability') {
      const catSelect = document.getElementById('xpAbilityCategory');
      if (catSelect) {
        catSelect.addEventListener('change', (e) => this.showXPAbilityList(e.target.value));
      }
    } else if (type === 'discipline') {
      const discSelect = document.getElementById('xpDiscipline');
      if (discSelect) {
        discSelect.addEventListener('change', () => this.calculateXPCost());
      }
    } else if (type === 'virtue') {
      const virtueSelect = document.getElementById('xpVirtue');
      if (virtueSelect) {
        virtueSelect.addEventListener('change', () => this.calculateXPCost());
      }
    } else if (type === 'humanity' || type === 'willpower') {
      this.calculateXPCost();
    }
  }

  showXPAttributeList(category) {
    const selectionDiv = document.getElementById('xpAttrSelection');
    if (!category) {
      selectionDiv.innerHTML = '';
      return;
    }

    const attrs = this.character.attributes[category];
    const attrNames = {
      physical: { strength: 'Сила', dexterity: 'Ловкость', stamina: 'Выносливость' },
      social: { charisma: 'Обаяние', manipulation: 'Манипулирование', appearance: 'Привлекательность' },
      mental: { perception: 'Восприятие', intelligence: 'Интеллект', wits: 'Смекалка' }
    };

    const options = Object.keys(attrs).map(attr =>
      `<option value="${attr}">${attrNames[category][attr]} (${attrs[attr]})</option>`
    ).join('');

    selectionDiv.innerHTML = `
      <div>
        <label class="block text-sm font-medium mb-1">Атрибут</label>
        <select id="xpAttribute" class="input-field">
          <option value="">Выберите атрибут</option>
          ${options}
        </select>
      </div>
    `;

    const attrSelect = document.getElementById('xpAttribute');
    if (attrSelect) {
      attrSelect.addEventListener('change', () => this.calculateXPCost());
    }
  }

  showXPAbilityList(category) {
    const selectionDiv = document.getElementById('xpAbilitySelection');
    if (!category) {
      selectionDiv.innerHTML = '';
      return;
    }

    const abilities = abilitiesData[category];
    const options = abilities.map(ability => {
      const current = this.character.abilities[category][ability.id] || 0;
      return `<option value="${ability.id}">${ability.name} (${current})</option>`;
    }).join('');

    selectionDiv.innerHTML = `
      <div>
        <label class="block text-sm font-medium mb-1">Способность</label>
        <select id="xpAbility" class="input-field">
          <option value="">Выберите способность</option>
          ${options}
        </select>
      </div>
    `;

    const abilitySelect = document.getElementById('xpAbility');
    if (abilitySelect) {
      abilitySelect.addEventListener('change', () => this.calculateXPCost());
    }
  }

  calculateXPCost() {
    const type = document.getElementById('xpType')?.value;
    if (!type) return;

    let cost = 0;
    let details = '';
    let canPurchase = false;

    if (type === 'attribute') {
      const category = document.getElementById('xpAttrCategory')?.value;
      const attr = document.getElementById('xpAttribute')?.value;
      if (category && attr) {
        const current = this.character.attributes[category][attr];
        cost = current * 4;
        details = `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 10;
      }
    } else if (type === 'ability') {
      const category = document.getElementById('xpAbilityCategory')?.value;
      const ability = document.getElementById('xpAbility')?.value;
      if (category && ability) {
        const current = this.character.abilities[category][ability] || 0;
        cost = current === 0 ? 3 : current * 2;
        details = current === 0 ? 'Новая способность' : `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 10;
      }
    } else if (type === 'discipline') {
      const discId = document.getElementById('xpDiscipline')?.value;
      if (discId) {
        const current = this.character.disciplines[discId] || 0;
        const disc = this.allDisciplines.find(d => d.id === discId);

        // Check if clan discipline
        const clan = clansData.find(c => c.id === this.character.clan);
        const isClan = clan && clan.disciplines.includes(discId);
        const isCaitiff = this.character.clan === 'caitiff';

        if (current === 0) {
          cost = 10;
          details = 'Новая дисциплина';
        } else {
          // Physical: 5, Mental: 6, Unique: 7 (clan), Non-clan: 10, Caitiff: 6
          if (isCaitiff) {
            cost = current * 6;
            details = `Каитифф: текущее × 6 = ${current} × 6`;
          } else if (isClan) {
            if (disc.category === 'physical') {
              cost = current * 5;
              details = `Физическая (клановая): текущее × 5 = ${current} × 5`;
            } else if (disc.category === 'mental') {
              cost = current * 6;
              details = `Ментальная (клановая): текущее × 6 = ${current} × 6`;
            } else {
              cost = current * 7;
              details = `Уникальная (клановая): текущее × 7 = ${current} × 7`;
            }
          } else {
            cost = current * 10;
            details = `Сторонняя дисциплина: текущее × 10 = ${current} × 10`;
          }
        }
        canPurchase = current < 10;
      }
    } else if (type === 'virtue') {
      const virtue = document.getElementById('xpVirtue')?.value;
      if (virtue) {
        const current = this.character.virtues[virtue];
        cost = current * 2;
        details = `Текущее значение: ${current}, новое: ${current + 1}`;
        canPurchase = current < 10;
      }
    } else if (type === 'humanity') {
      const current = this.character.humanity;
      cost = current * 2;
      details = `Текущее значение: ${current}, новое: ${current + 1}`;
      canPurchase = current < 10;
    } else if (type === 'willpower') {
      const current = this.character.willpower;
      cost = current;
      details = `Текущее значение: ${current}, новое: ${current + 1}`;
      canPurchase = current < 10;
    }

    // Update display
    const costDisplay = document.getElementById('xpCostDisplay');
    const costAmount = document.getElementById('xpCostAmount');
    const costDetailsDiv = document.getElementById('xpCostDetails');
    const purchaseBtn = document.getElementById('xpPurchaseBtn');

    if (cost > 0 && canPurchase) {
      costAmount.textContent = cost;
      costDetailsDiv.textContent = details;
      costDisplay.classList.remove('hidden');
      purchaseBtn.classList.remove('hidden');

      const available = this.character.experience - this.character.experienceSpent;
      if (cost > available) {
        purchaseBtn.disabled = true;
        purchaseBtn.textContent = `Недостаточно XP (нужно ${cost}, есть ${available})`;
      } else {
        purchaseBtn.disabled = false;
        purchaseBtn.textContent = 'Купить';
      }
    } else {
      costDisplay.classList.add('hidden');
      purchaseBtn.classList.add('hidden');
    }
  }

  handleXPPurchase() {
    const type = document.getElementById('xpType')?.value;
    if (!type) return;

    const costAmount = parseInt(document.getElementById('xpCostAmount')?.textContent || '0');
    const available = this.character.experience - this.character.experienceSpent;

    if (costAmount > available) {
      alert('Недостаточно опыта!');
      return;
    }

    // Make the purchase
    if (type === 'attribute') {
      const category = document.getElementById('xpAttrCategory')?.value;
      const attr = document.getElementById('xpAttribute')?.value;
      if (category && attr) {
        this.character.attributes[category][attr]++;
        this.character.experienceSpent += costAmount;
      }
    } else if (type === 'ability') {
      const category = document.getElementById('xpAbilityCategory')?.value;
      const ability = document.getElementById('xpAbility')?.value;
      if (category && ability) {
        if (!this.character.abilities[category][ability]) {
          this.character.abilities[category][ability] = 0;
        }
        this.character.abilities[category][ability]++;
        this.character.experienceSpent += costAmount;
      }
    } else if (type === 'discipline') {
      const discId = document.getElementById('xpDiscipline')?.value;
      if (discId) {
        if (!this.character.disciplines[discId]) {
          this.character.disciplines[discId] = 0;
        }
        this.character.disciplines[discId]++;
        this.character.experienceSpent += costAmount;
      }
    } else if (type === 'virtue') {
      const virtue = document.getElementById('xpVirtue')?.value;
      if (virtue) {
        this.character.virtues[virtue]++;
        this.character.experienceSpent += costAmount;
      }
    } else if (type === 'humanity') {
      this.character.humanity++;
      this.character.experienceSpent += costAmount;
    } else if (type === 'willpower') {
      this.character.willpower++;
      this.character.experienceSpent += costAmount;
    }

    // Save and re-render
    this.saveToLocalStorage();
    this.render();
    this.attachEventListeners();
    this.updateAllDisplays();

    alert(`Куплено за ${costAmount} XP!`);
  }

  saveToLocalStorage() {
    localStorage.setItem('vtm_character', this.character.serialize());
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem('vtm_character');
    if (saved) {
      this.character = Character.fromJSON(saved);
      this.tracker = new PointTracker(this.character);
    }
  }

  saveCharacter() {
    const json = this.character.serialize();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.character.name || 'персонаж'}.json`;
    a.click();
  }

  loadCharacter() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.character = Character.fromJSON(event.target.result);
        this.tracker = new PointTracker(this.character);
        this.render();
        this.attachEventListeners();
      };
      reader.readAsText(file);
    };
    input.click();
  }

  exportToPDF() {
    alert('Экспорт в PDF будет реализован позже. Пока используйте функцию печати браузера.');
  }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new CharacterCreatorApp();
  window.app = app; // Make available globally for inline event handlers
});
