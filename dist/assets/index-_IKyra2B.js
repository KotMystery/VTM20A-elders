(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class _{constructor(){this.name="",this.player="",this.chronicle="",this.nature="",this.demeanor="",this.concept="",this.clan="",this.sire="",this.generation=9,this.dilutedVitae=0,this.attributes={physical:{strength:1,dexterity:1,stamina:1},social:{charisma:1,manipulation:1,appearance:1},mental:{perception:1,intelligence:1,wits:1}},this.abilities={talents:{},skills:{},knowledges:{}},this.disciplines={},this.necromancyPaths=[],this.necromancyRituals=[],this.thaumaturgyPaths=[],this.thaumaturgyRituals=[],this.backgrounds={},this.virtues={conscience:1,selfControl:1,courage:1},this.humanity=7,this.path="",this.bearing="",this.willpower=1,this.willpowerCurrent=1,this.merits=[],this.flaws=[],this.coterieFlaw=null,this.health={bruised:!1,hurt:!1,injured:!1,wounded:!1,mauled:!1,crippled:!1,incapacitated:!1},this.bloodPool=0,this.bloodPoolMax=0,this.bloodPerTurn=0,this.experience=33,this.experienceSpent=0,this.freebies=22,this.freebiesSpent=0,this.pointsAllocated={attributes:{primary:0,secondary:0,tertiary:0},abilities:{primary:0,secondary:0,tertiary:0},disciplines:0,backgrounds:0,virtues:0},this.priorities={attributes:null,abilities:null}}getEffectiveGeneration(){const e=this.backgrounds.generation||0;return this.generation-e+this.dilutedVitae}getBloodPoolStats(){const e=this.getEffectiveGeneration();return{4:{max:50,perTurn:10},5:{max:40,perTurn:8},6:{max:30,perTurn:6},7:{max:20,perTurn:4},8:{max:15,perTurn:3},9:{max:14,perTurn:2},10:{max:13,perTurn:1},11:{max:12,perTurn:1},12:{max:11,perTurn:1},13:{max:10,perTurn:1},14:{max:10,perTurn:1}}[e]||{max:10,perTurn:1}}getClanDisciplines(){return[]}isClanDiscipline(e){return this.getClanDisciplines().includes(e)}getAttributeCategoryTotal(e){const t=this.attributes[e];return Object.values(t).reduce((i,s)=>i+s,0)-3}getAbilityCategoryTotal(e){const t=this.abilities[e];return Object.values(t).reduce((i,s)=>i+s,0)}calculateFreebies(){let e=15;e+=7;const t=this.flaws.reduce((s,a)=>s+a.cost,0);e+=Math.min(t,7);const i=this.merits.reduce((s,a)=>s+a.cost,0);return e-=i,e}getNecromancyPrimaryPath(){return this.necromancyPaths[0]||null}addNecromancyPath(e,t=1){this.necromancyPaths.find(s=>s.pathId===e)||this.necromancyPaths.push({pathId:e,level:t})}removeNecromancyPath(e){this.necromancyPaths=this.necromancyPaths.filter(t=>t.pathId!==e)}updateNecromancyPathLevel(e,t){const i=this.necromancyPaths.find(s=>s.pathId===e);i&&(i.level=t)}addNecromancyRitual(e){this.necromancyRituals.includes(e)||this.necromancyRituals.push(e)}removeNecromancyRitual(e){this.necromancyRituals=this.necromancyRituals.filter(t=>t!==e)}getThaumaturgyPrimaryPath(){return this.thaumaturgyPaths[0]||null}addThaumaturgyPath(e,t=1){this.thaumaturgyPaths.find(s=>s.pathId===e)||this.thaumaturgyPaths.push({pathId:e,level:t})}removeThaumaturgyPath(e){this.thaumaturgyPaths=this.thaumaturgyPaths.filter(t=>t.pathId!==e)}updateThaumaturgyPathLevel(e,t){const i=this.thaumaturgyPaths.find(s=>s.pathId===e);i&&(i.level=t)}addThaumaturgyRitual(e){this.thaumaturgyRituals.includes(e)||this.thaumaturgyRituals.push(e)}removeThaumaturgyRitual(e){this.thaumaturgyRituals=this.thaumaturgyRituals.filter(t=>t!==e)}toJSON(){return JSON.stringify(this,null,2)}static fromJSON(e){const t=new _;return Object.assign(t,JSON.parse(e)),t}}const b={attributes:{maxBeforeFreebies:6},abilities:{maxBeforeFreebies:5},disciplines:{total:7},backgrounds:{total:3,allowed:["generation","herd","resources","retainers"]},virtues:{total:5}},x={attribute:5,ability:2,background:1,discipline:7,virtue:2,humanity:1,willpower:1};class C{constructor(e){this.character=e}validateAttributes(){const e=[],t=["physical","social","mental"],i={};t.forEach(n=>{const c=this.character.attributes[n],d=Object.values(c).reduce((r,o)=>r+o,0)-3;i[n]=d,Object.entries(c).forEach(([r,o])=>{o>b.attributes.maxBeforeFreebies&&e.push(`${n}.${r}: максимум ${b.attributes.maxBeforeFreebies} без Freebies`)})});const s=Object.values(i).sort((n,c)=>c-n),a=[9,7,5];return JSON.stringify(s)!==JSON.stringify(a)&&e.push(`Распределение атрибутов должно быть 9/7/5 (текущее: ${s.join("/")})`),{valid:e.length===0,errors:e,totals:i}}validateAbilities(){const e=[],t=["talents","skills","knowledges"],i={};t.forEach(n=>{const c=this.character.abilities[n],d=Object.values(c).reduce((r,o)=>r+o,0);i[n]=d,Object.entries(c).forEach(([r,o])=>{o>b.abilities.maxBeforeFreebies&&e.push(`${n}.${r}: максимум ${b.abilities.maxBeforeFreebies} без Freebies`)})});const s=Object.values(i).sort((n,c)=>c-n),a=[18,12,8];return JSON.stringify(s)!==JSON.stringify(a)&&e.push(`Распределение способностей должно быть 18/12/8 (текущее: ${s.join("/")})`),{valid:e.length===0,errors:e,totals:i}}validateDisciplines(){const e=[],t=Object.values(this.character.disciplines).reduce((i,s)=>i+s,0);return t>b.disciplines.total&&e.push(`Дисциплины: использовано ${t}/${b.disciplines.total}`),{valid:e.length===0,errors:e,total:t}}validateBackgrounds(){const e=[],t=this.character.backgrounds,i=Object.values(t).reduce((s,a)=>s+a,0);return Object.keys(t).forEach(s=>{b.backgrounds.allowed.includes(s)||e.push(`${s}: недопустимая предыстория для Древних`)}),i>b.backgrounds.total&&e.push(`Предыстории: использовано ${i}/${b.backgrounds.total}`),{valid:e.length===0,errors:e,total:i}}validateVirtues(){const e=[],t=this.character.virtues,i=Object.values(t).reduce((s,a)=>s+a,0)-3;return i>b.virtues.total&&e.push(`Добродетели: использовано ${i}/${b.virtues.total}`),{valid:e.length===0,errors:e,total:i}}calculateFreebieSpending(){return{attributes:0,abilities:0,backgrounds:0,disciplines:0,virtues:0,humanity:0,willpower:0,total:0}}validateAll(){return{attributes:this.validateAttributes(),abilities:this.validateAbilities(),disciplines:this.validateDisciplines(),backgrounds:this.validateBackgrounds(),virtues:this.validateVirtues()}}isComplete(){const e=this.validateAll();return Object.values(e).every(t=>t.valid)}}const $=[{id:"brujah",name:"Бруха",disciplines:["celerity","potence","presence"],weakness:"Те же душевные порывы, что толкают Бруха на путь величия или порока, могут разжечь в них пламя неистовой ярости. Сложность проверок, связанных с попытками сдерживать или контролировать приступы ярости, возрастает на два пункта (вплоть до максимума 10). Кроме того, Бруха не могут тратить пункты воли, чтобы предотвратить приступ ярости, но если приступ уже начался, персонаж, как обычно, может потратить пункт воли, чтобы взять себя в руки на один ход."},{id:"gangrel",name:"Гангрел",disciplines:["animalism","fortitude","protean"],weakness:"Каждый раз, когда персонажа‑гангрела охватывает приступ ярости, он временно получает какой‑нибудь звериный признак (который может заменить уже существующий временный звериный признак, оставшийся после прошлого приступа): пробивающаяся по всему телу шерсть, краткая послеобеденная спячка, стремление избегать больших скоплений народа и прочие подобные атавизмы. Обратите внимание, что этот атавизм может быть не только физическим, но и чисто поведенческим. Игроки вместе с рассказчиком должны определить, что это будет за атавизм. Со временем или в исключительных обстоятельствах некоторые временные атавизмы могут становиться постоянными, и тогда следующий временный атавизм не заменит уже существующий, а дополнит его."},{id:"malkavian",name:"Малкавиан",disciplines:["auspex","dementation","obfuscate"],weakness:"Все члены клана Малкавиан страдают от перманентного психического расстройства. Это расстройство действует как любое другое — оно не мешает приобретать новые психические расстройства и его, как и обычное расстройство, можно временно нейтрализовать при помощи воли, но, в отличие от новообретённых расстройств, перманентное психическое расстройство нельзя исцелить."},{id:"nosferatu",name:"Носферату",disciplines:["animalism","obfuscate","potence"],weakness:"Показатель привлекательности всех Носферату равен нулю, и они никак не могут это изменить. Зачеркните эту характеристику в своём бланке персонажа. Проверки, в которых задействована привлекательность, даются этим Сородичам с большим трудом."},{id:"toreador",name:"Тореадор",disciplines:["auspex","celerity","presence"],weakness:"Когда персонаж‑тореадор переживает некое действительно прекрасное ощущение — например, видит очень красивого человека, потрясающую картину или восхитительный рассвет, — он должен пройти проверку самоконтроля или инстинктов (сложность 6). Неудача означает, что персонаж замирает, охваченный восторгом. В этом состоянии персонаж пребывает до конца сцены, и единственное, что он способен делать, — это восхищаться и комментировать свои ощущения. Если источник переживания перестаёт воздействовать на персонажа, восторг стихает, и персонаж может действовать как обычно."},{id:"tremere",name:"Тремер",disciplines:["auspex","dominate","thaumaturgy"],weakness:"Зависимость вампиров клана Тремер от крови выражена ярче, чем у других Сородичей. Для того чтобы стать вассалом уз крови третьей ступени, тремеру достаточно дважды испить витэ Сородича (а не трижды, как обычно). Испив витэ Сородича единожды, тремер сразу становится вассалом уз крови второй ступени. Старейшины клана прекрасно знают об этом и активно пользуются своим знанием — вскоре после Становления любой неонат обязательно проходит торжественный обряд посвящения, в ходе которого причащается кровью семи старейшин клана."},{id:"ventrue",name:"Вентру",disciplines:["dominate","fortitude","presence"],weakness:"Всем вентру присущ утончённый вкус — в пищу им годится кровь только одной определённой категории смертных. Когда игрок создаёт персонажа‑вентру, он должен вместе с рассказчиком определить эту категорию. Обратите внимание, что выбор этот окончательный, и после начала игры его уже нельзя будет изменить. Кровь смертных, не относящихся к выбранной категории (в том числе кровь животных), не пополняет запас пунктов крови персонажа вне зависимости от того, сколько он её выпьет. Категория жертв, кровь которых годится для персонажа‑вентру, может быть как довольно узкой, так и относительно широкой. Кровь Сородичей не подпадает под эти ограничения."},{id:"lasombra",name:"Лазомбра",disciplines:["dominate","obtenebration","potence"],weakness:"Вампиры из клана Ласомбра не отражаются в полированных поверхностях, спокойной воде, зеркалах заднего вида и т. д."},{id:"tzimisce",name:"Цимисхи",disciplines:["animalism","auspex","vicissitude"],weakness:"Tzimisce неразрывно связаны с местом своего происхождения. Для полноценного дневного отдыха Сородичам этого клана необходимо касаться хотя бы двух пригоршней родной земли — почвы, набранной в месте, тесно связанном с их прошлой, смертной жизнью. Это может быть земля родного города или, скажем, кладбища, где вампиру было даровано Становление. Каждый день, когда цимисх отдыхает, не касаясь родной земли, пул проверок всех его параметров уменьшается вдвое. Этот штраф накапливается каждую ночь, пока пул не уменьшится до одного d10. Накопленный штраф сохраняется до тех пор, пока вампир не отдохнёт как минимум сутки, касаясь хотя бы двух пригоршней родной земли."},{id:"assamite",name:"Ассамиты",disciplines:["celerity","obfuscate","quietus"],weakness:"Из‑за проклятия Тремер любой ассамит, выпивший кровь другого Сородича, получает одно неотвратимое тяжёлое повреждение за каждый выпитый пункт крови. Совершив диаблери, персонаж получает по одному неотвратимому губительному повреждению за каждый пункт значения воли жертвы; даже если диаблерист сумеет это пережить, он не получит от совершения диаблери никаких преимуществ, а его поколение не изменится. Кроме того, все ассамиты обязаны отдавать часть прибыли от выполненных контрактов своим сирам и старейшинам (как правило, около 10 %)."},{id:"followers_of_set",name:"Последователи Сета",disciplines:["obfuscate","presence","serpentis"],weakness:"Из‑за своей приверженности тьме Последователи Сета особенно уязвимы к яркому свету. Солнечный свет наносит им на два повреждения больше обычного, а если персонаж‑сетит предпринимает любое действие, требующее проверки, находясь под воздействием любого источника яркого света (полицейского прожектора, театральных софитов, сигнальной ракеты и т. п.), пул этой проверки уменьшается на один d10."},{id:"giovanni",name:"Джованни",disciplines:["dominate","necromancy","potence"],weakness:"Поцелуи вампиров из клана Джованни причиняют смертным мучительную боль. Если Джованни не будет осторожен, сосуд, из которого он пьёт, может погибнуть от болевого шока ещё до того, как будет обескровлен. Когда Джованни пьёт кровь смертного, он причиняет ему вдвое больше повреждений, чем любой другой вампир (т. е. два, а не одно, как обычно). Именно поэтому Джованни предпочитают прибегать к услугам донорских пунктов и другим источникам крови — тем, что не кричат и не отбиваются."},{id:"ravnos",name:"Равнос",disciplines:["animalism","chimerstry","fortitude"],weakness:"Каждый вампир из клана Равнос является рабом того или иного порока. Кто‑то, например, не может не лгать, кому‑то чуждо сострадание, а кто‑то попросту неспособен устоять перед возможностью стащить что‑нибудь, что плохо лежит. Когда персонажу предоставляется возможность поддаться выбранному пороку, он должен сделать это, если не пройдёт проверку самоконтроля или инстинктов (сложность 6)."},{id:"caitiff",name:"Каитифф",disciplines:[],weakness:"Изгои вампирского сообщества, не принадлежащие ни к одному из кланов и не демонстрирующие сильных и слабых черт, характерных для всех вампиров более сильной и чистой Крови."}],M=[{id:"potence",name:"Мощь",category:"physical"},{id:"fortitude",name:"Стойкость",category:"physical"},{id:"celerity",name:"Стремительность",category:"physical"}],j=[{id:"animalism",name:"Анимализм",category:"mental"},{id:"presence",name:"Величие",category:"mental"},{id:"dominate",name:"Доминирование",category:"mental"},{id:"auspex",name:"Ясновидение",category:"mental"},{id:"obfuscate",name:"Сокрытие",category:"mental"}],F=[{id:"obtenebration",name:"Затмение",category:"unique"},{id:"protean",name:"Метаморфозы",category:"unique"},{id:"necromancy",name:"Некромантия",category:"unique",hasPaths:!0,paths:["path_sepulchre","path_cenotaph","path_bone","path_corpse","path_ash","path_decay","path_four_humours","path_entropy"]},{id:"dementation",name:"Помешательство",category:"unique"},{id:"vicissitude",name:"Преображение",category:"unique"},{id:"serpentis",name:"Серпентис",category:"unique"},{id:"thaumaturgy",name:"Тауматургия",category:"unique",hasPaths:!0,paths:["path_blood","path_elemental_mastery","path_hand_destruction","path_lure_flames","path_beckoning","path_neptune","path_incarnation","path_mars","path_fathers_vengeance","path_corruption","path_technomancy","path_flora","thaumaturgic_countermagic","weather_control"]},{id:"quietus",name:"Упокоение",category:"unique"},{id:"chimerstry",name:"Фантасмагория",category:"unique"}],N={physical:M,mental:j,unique:F},O=[{id:"alertness",name:"Бдительность"},{id:"athletics",name:"Атлетика"},{id:"awareness",name:"Шестое чувство"},{id:"brawl",name:"Драка"},{id:"empathy",name:"Эмпатия"},{id:"expression",name:"Красноречие"},{id:"intimidation",name:"Запугивание"},{id:"leadership",name:"Лидерство"},{id:"streetwise",name:"Уличное чутье"},{id:"subterfuge",name:"Хитрость"}],q=[{id:"animal_ken",name:"Обращение с животными"},{id:"crafts",name:"Ремесло"},{id:"drive",name:"Вождение"},{id:"etiquette",name:"Этикет"},{id:"firearms",name:"Стрельба"},{id:"larceny",name:"Воровство"},{id:"melee",name:"Фехтование"},{id:"performance",name:"Исполнение"},{id:"stealth",name:"Скрытность"},{id:"survival",name:"Выживание"}],V=[{id:"academics",name:"Гуманитарные науки"},{id:"computer",name:"Информатика"},{id:"finance",name:"Финансы"},{id:"investigation",name:"Расследование"},{id:"law",name:"Юриспруденция"},{id:"medicine",name:"Медицина"},{id:"occult",name:"Оккультизм"},{id:"politics",name:"Политика"},{id:"science",name:"Естественные науки"},{id:"technology",name:"Электроника"}],w={talents:O,skills:q,knowledges:V},L=[{id:"generation",name:"Поколение",description:"Каждая точка в этом факте биографии - снижение поколения на одно. Чем ниже поколение, тем, как правило, сильнее Сородич и чище его кровь. [см. стр 122]"},{id:"herd",name:"Стадо",description:'Смертные, легкодоступные и "личные" источники пропитания [см. стр 123]'},{id:"resources",name:"Ресурсы",description:"Материальное богатство и доходы [см. стр 117]"},{id:"retainers",name:"Подручные",description:"В отличие от союзников и информаторов подручные — это слуги, помощники и прочие люди, которые верно и преданно служат вашему персонажу [см. стр 121]"}],X=[{id:"path_sepulchre",name:"Путь Склепа"},{id:"path_cenotaph",name:"Путь Кенотафа"},{id:"path_bone",name:"Путь Костей"},{id:"path_corpse",name:"Путь Мертвеца"},{id:"path_ash",name:"Путь Пепла"},{id:"path_decay",name:"Путь Тлена"},{id:"path_four_humours",name:"Путь Четырёх Гуморов"},{id:"path_entropy",name:"Путь Энтропии"}],P={paths:X},R=[{id:"path_blood",name:"Путь Крови"},{id:"path_elemental_mastery",name:"Власть над Стихиями"},{id:"path_hand_destruction",name:"Длань Разрушения"},{id:"path_lure_flames",name:"Игра с Огнём"},{id:"path_beckoning",name:"Мановение Мысли"},{id:"path_neptune",name:"Могущество Нептуна"},{id:"path_incarnation",name:"Путь Воплощения"},{id:"path_mars",name:"Путь Марса"},{id:"path_fathers_vengeance",name:"Путь Отчего Воздаяния"},{id:"path_corruption",name:"Путь Совращения"},{id:"path_technomancy",name:"Путь Техномантии"},{id:"path_flora",name:"Путь Флоры"},{id:"thaumaturgic_countermagic",name:"Тауматургическая Защита"},{id:"weather_control",name:"Управление Погодой"}],E={paths:R},H=[{id:"artist",name:"Артист",description:"музыкант, киноактёр, художник, тусовщик, топ-модель, интернет-звезда"},{id:"fighter",name:"Боец",description:"телохранитель, боевик, солдат удачи, наёмный убийца"},{id:"drifter",name:"Бродяга",description:"бомж, контрабандист, жиголо/проститутка, наркоман, паломник, байкер, картёжник"},{id:"outcast",name:"Изгой",description:"городской дикарь, беженец, представитель меньшинств, сторонник теории заговора, наркоман"},{id:"intellectual",name:"Интеллектуал",description:"писатель, студент, учёный, философ, социокритик"},{id:"alternative",name:"Неформал",description:"рейвер, гот, скинхед, панк, завсегдатай баров, хипстер, психонавт"},{id:"teen",name:"Подросток",description:"ребёнок, беглец, сирота, беспризорник, хулиган"},{id:"politician",name:"Политик",description:"судья, чиновник, адвокат, секретарь-ассистент, оратор"},{id:"criminal",name:"Преступник",description:"рецидивист, мафиози, наркоторговец, сутенёр, угонщик, гопник, вор, скупщик краденого"},{id:"professional",name:"Профессионал",description:"инженер, врач, программист, юрист, промышленник"},{id:"worker",name:"Работяга",description:"дальнобойщик, фермер, слесарь, слуга, строитель"},{id:"reporter",name:"Репортёр",description:"журналист, блогер, папарацци, ведущий ток-шоу, эксперт по СМИ"},{id:"socialite",name:"Светский лев",description:"молодой бездельник, владелец клуба, плейбой, протеже, альфонс/статусная жена"},{id:"investigator",name:"Сыщик",description:"следователь, патрульный полицейский, правительственный агент, частный детектив, инквизитор"}],S=[{id:"autocrat",name:"Автократ",description:"вы стремитесь властвовать"},{id:"bon_vivant",name:"Бонвиван",description:"вечная жизнь — вечное наслаждение"},{id:"fighter",name:"Борец",description:"ничто не в силах вас одолеть"},{id:"curmudgeon",name:"Брюзга",description:"у всех определённо есть свои недостатки"},{id:"rebel",name:"Бунтарь",description:"вы не следуете чужим правилам"},{id:"visionary",name:"Визионер",description:"есть что-то помимо этого"},{id:"bravo",name:"Головорез",description:"сила даёт право"},{id:"guru",name:"Гуру",description:"окружающие ищут у вас духовных наставлений"},{id:"deviant",name:"Девиант",description:"статус-кво — для овец"},{id:"enigma",name:"Загадка",description:"как только окружающие думают, что начинают вас понимать, вы меняете правила игры"},{id:"idealist",name:"Идеалист",description:"вы верите в нечто великое"},{id:"explorer",name:"Исследователь",description:"окружающий мир есть загадка, которую надлежит разгадать"},{id:"capitalist",name:"Капиталист",description:"зачем отдавать, если можно продать?"},{id:"penitent",name:"Кающийся грешник",description:"вы прокляты, и это проклятие надлежит искупить"},{id:"conformist",name:"Конформист",description:"отличный последователь и помощник"},{id:"masochist",name:"Мазохист",description:"боль напоминает о том, что вы ещё существуете"},{id:"manipulator",name:"Махинатор",description:"окружающие нужны для того, чтобы извлекать из них выгоду"},{id:"martyr",name:"Мученик",description:"вы страдаете во имя высшей цели"},{id:"narcissist",name:"Нарцисс",description:"о нет, вы не звезда шоу, вы и есть шоу!"},{id:"mentor",name:"Наставник",description:"ваши знания спасают жизни окружающих"},{id:"thrill_seeker",name:"Непоседа",description:"всегда есть что-то ещё"},{id:"loner",name:"Одиночка",description:"у вас свой собственный путь"},{id:"eye_of_storm",name:"Око бури",description:"никому не связать вас с хаосом, что бушует вокруг"},{id:"caregiver",name:"Опекун",description:"всем нужна забота"},{id:"organizer",name:"Организатор",description:"необходимо убедиться, что всё идёт как задумано"},{id:"perfectionist",name:"Перфекционист",description:"вы стремитесь к недостижимому идеалу"},{id:"winner",name:"Победитель",description:"вы должны быть первым во всём"},{id:"fanatic",name:"Подвижник",description:"вы готовы трудиться ради высшей цели"},{id:"child",name:"Ребёнок",description:"тот, кому нужна забота"},{id:"sadist",name:"Садист",description:"вы живёте ради того, чтобы причинять боль другим"},{id:"soldier",name:"Солдат",description:"приказ должен быть выполнен, но только вы решаете, как именно"},{id:"daredevil",name:"Сорвиголова",description:"риск придаёт вечности смысл"},{id:"sociopath",name:"Социопат",description:"низшие существа должны быть уничтожены"},{id:"judge",name:"Судья",description:"ваше справедливое суждение сделает мир лучше"},{id:"creator",name:"Творец",description:"вы создаёте нечто непреходящее"},{id:"traditionalist",name:"Традиционалист",description:"как было прежде, так и должно быть впредь"},{id:"trickster",name:"Трикстер",description:"смех приглушает боль"},{id:"zealot",name:"Фанатик",description:"цель превыше всего"},{id:"freak",name:"Фрик",description:"отвращение на лицах окружающих есть лучший повод для веселья"},{id:"chameleon",name:"Хамелеон",description:"вы способны слиться с любым окружением"},{id:"monster",name:"Чудовище",description:"вы прокляты, и с этим проклятием надлежит смириться!"},{id:"egoist",name:"Эгоцентрист",description:"никто и ничто кроме вас не имеет значения"}],W=[{id:"ambidextrous",name:"Амбидекстр",cost:1,description:"Вы можете одинаково хорошо использовать обе руки без штрафа."},{id:"iron_stomach",name:"Железное нутро",cost:1,description:"Вы способны переваривать пищу и пить вино или другие напитки."},{id:"familiar_face",name:"Знакомое лицо",cost:1,description:"У вас одно из тех лиц, которое всегда кажется знакомым."},{id:"catlike_balance",name:"Кошачья грация",cost:1,description:"Вы получаете автоматический успех на все броски Атлетики, связанные с балансом."},{id:"bruiser",name:"Мордоворот",cost:1,description:"Ваш внешний вид внушает страх. -1 к сложности бросков Запугивания."},{id:"early_riser",name:"Ранняя пташка",cost:1,incompatibleWith:["deep_sleeper"],description:"Вы можете проснуться на час раньше обычного без штрафов."},{id:"acute_sense",name:"Чуткое восприятие",cost:1,description:"Одно из ваших чувств особенно остро. -2 к сложности Восприятия."},{id:"blush_of_health",name:"Здоровый вид",cost:2,description:"Вы выглядите живым и здоровым, с румянцем на щеках."},{id:"enchanting_voice",name:"Чарующий голос",cost:2,description:"У вас невероятно приятный голос. -2 к сложности бросков речи/пения."},{id:"daredevil",name:"Каскадёр",cost:3,description:"Вы невероятно храбры. -1 к сложности бросков на храбрость."},{id:"efficient_digestion",name:"Эффективное пищеварение",cost:3,description:"Вы получаете дополнительное очко крови из каждых двух выпитых."},{id:"huge_size",name:"Гигант",cost:4,incompatibleWith:["short"],description:"Вы чрезвычайно велики. Дополнительный уровень здоровья."}],z=[{id:"common_sense",name:"Здравый смысл",cost:1,description:"Рассказчик может подсказать, когда вы собираетесь сделать что-то глупое."},{id:"concentration",name:"Концентрация",cost:1,description:"Вы способны сосредоточиться даже в стрессовых ситуациях."},{id:"useful_knowledge",name:"Полезная информация",cost:1,elderNote:"Информация может быть устаревшей после веков торпора",description:"У вас есть полезная информация по определенной теме."},{id:"introspection",name:"Рефлексия",cost:1,description:"Вы хорошо понимаете свои мотивации. -1 к сложности сопротивления манипуляции."},{id:"calm_heart",name:"Холодная логика",cost:1,description:"Вы редко поддаетесь гневу. -2 к сложности сопротивления безумию."},{id:"time_sense",name:"Чувство времени",cost:1,description:"Вы всегда точно знаете, который час, без часов."},{id:"language",name:"Язык",cost:1,canTakeMultiple:!0,elderNote:"Современные языки (после торпора) вам не известны",description:"Вы знаете дополнительный язык. Можно брать несколько раз."},{id:"code_of_honor",name:"Кодекс чести",cost:2,description:"У вас есть личный кодекс чести. -2 к сложности сопротивления искушениям."},{id:"natural_linguist",name:"Полиглот",cost:2,description:"Вы легко изучаете новые языки. -2 к сложности изучения языков."},{id:"light_sleeper",name:"Чуткий сон",cost:2,description:"Вы легко просыпаетесь, если вас потревожат. -2 к сложности пробуждения."},{id:"eidetic_memory",name:"Эйдетическая память",cost:2,description:"Вы помните все в деталях. Можете точно вспомнить что угодно."},{id:"iron_will",name:"Железная воля",cost:3,minWillpower:5,description:"Вы обладаете исключительной силой воли. -3 к сложности сопротивления ментальной доминации."},{id:"natural_aptitude",name:"Предрасположенность",cost:3,description:"Вы естественно талантливы в одной способности. -2 к сложности всех бросков этой способности."},{id:"calm",name:"Спокойный",cost:3,excludedClans:["brujah"],description:"Вы исключительно спокойны. -2 к сложности всех бросков Самоконтроля."}],J=[{id:"harmless",name:"Безобидный",cost:1,description:"Вы выглядите совершенно безобидным. -1 к сложности бросков на невинность."},{id:"former_ghoul",name:"Бывший гуль",cost:1,description:"Вы были гулем перед Обращением. Знакомы с вампирским обществом."},{id:"reputation",name:"Громкое имя",cost:1,elderNote:"Репутация из веков прошлого может быть забыта или ослаблена",description:"У вас есть репутация среди вампиров."},{id:"sabbat_survivor",name:"Знаток Шабаша",cost:1,elderRequirement:"torpor_date >= 1400",elderNote:"Требуется: Древний не был в торпоре до как минимум 15 века (Шабаш основан в 1450-х)",description:"Вы пережили встречу с Шабашем и знаете их тактику."},{id:"natural_leader",name:"Прирождённый лидер",cost:1,minCharisma:3,description:"Вы прирожденный лидер. -1 к сложности всех бросков Лидерства."},{id:"boon",name:"Одолжение",cost:"variable",minCost:3,maxCost:6,elderNote:"Только крупные одолжения (3-6 очков) переживают века. Рекомендуется бросок на выживание одолжения",description:"Кто-то вам должен. Только крупные одолжения переживают века."},{id:"seasoned_traveler",name:"Бывалый путешественник",cost:2,description:"Вы много путешествовали и знаете множество мест."},{id:"enemy_lore",name:"Знаток врагов",cost:2,elderNote:"Знания могут быть устаревшими после веков",description:"Вы хорошо знаете врагов вампиров."},{id:"other_lore",name:"Знаток иных",cost:2,description:"Вы знаете о других сверхъестественных существах (маги, фейри, люпины)."},{id:"saint",name:"Святой",cost:2,description:"Вы известны своей добродетелью среди вампиров."},{id:"old_pal",name:"Старый друг",cost:2,elderNote:"Друг из веков прошлого может быть мертв или исчез. Рекомендуется бросок на выживание",description:"У вас есть старый друг-вампир."},{id:"clan_friendship",name:"Друг клана",cost:4,elderNote:"Клан мог измениться за века. Рекомендуется бросок на сохранение дружбы",description:"Вы в хороших отношениях с другим кланом."},{id:"infamous_sire",name:"Презренный сир",cost:1,elderNote:"Репутация сира из древних времен",description:"Ваш сир имеет дурную репутацию, которая может распространяться на вас."},{id:"mistaken_identity",name:"Путаница",cost:1,description:"Вас путают с кем-то другим. При пробуждении из торпора династия может выжить в современность."}],G=[{id:"animal_affinity",name:"Друг животных",cost:1,description:"Животные вас любят. -1 к сложности бросков Анимализма."},{id:"sealing_touch",name:"Затворяющее касание",cost:1,description:"Вы можете запечатывать раны прикосновением, не тратя кровь."},{id:"deceptive_aura",name:"Обманчивая аура",cost:1,description:"Ваша аура не показывает диаблери или других темных деяний."},{id:"medium",name:"Медиум",cost:2,description:"Вы можете видеть и слышать призраков."},{id:"magic_resistance",name:"Сопротивляемость чарам",cost:2,blocksDisciplines:["thaumaturgy","necromancy"],description:"Вы устойчивы к магии. -2 к сложности сопротивления магии."},{id:"spirit_mentor",name:"Дух-наставник",cost:3,description:"У вас есть дух-наставник, который дает советы."},{id:"oracle",name:"Оракул",cost:3,description:"Вы иногда получаете видения будущего."},{id:"lucky",name:"Счастливчик",cost:3,description:"Вы можете повторить три проваленных броска за историю."},{id:"hidden_diablerie",name:"Таинство диаблери",cost:3,description:"Ваша аура не показывает следы диаблери."},{id:"true_love",name:"Истинная любовь",cost:4,elderNote:"Истинная любовь из веков прошлого должна быть вампиром и может не быть сразу в вашей близости",description:"У вас есть истинная любовь. Должна быть вампиром."},{id:"additional_discipline",name:"Дополнительная Дисциплина",cost:5,excludedClans:["caitiff"],description:"Вы можете изучить одну дополнительную дисциплину как клановую."},{id:"unbondable",name:"Непокорный",cost:5,excludedClans:["tremere"],description:"Вас невозможно связать кровными узами."},{id:"nine_lives",name:"Девять жизней",cost:6,description:"Вы можете избежать окончательной смерти девять раз."},{id:"true_faith",name:"Истинная Вера",cost:7,minHumanity:9,description:"Вы обладаете истинной верой, что крайне редко для вампира."}],U={assamite:[{id:"ally_another_faction",name:"Союзник в другой фракции",cost:1,category:"social",elderNote:"Требуется бросок на выживание союзника. Союзник должен быть древним вампиром",description:"У вас есть близкий друг в одной из сект Сородичей."},{id:"thousand_meter_killer",name:"Тысячеметровый убийца",cost:1,category:"physical",elderNote:"Это врожденная способность к точности, не зависящая от современного оружия",description:"Вы обладаете выдающимся мастерством дальней стрельбы. -1 к сложности снайперских выстрелов."},{id:"outcast",name:"Изгнанник",cost:2,category:"social",description:"Вы были изгнаны из своей фракции клана."},{id:"multiple_curses",name:"Многочисленные проклятия",cost:3,category:"supernatural",description:"Вы страдаете от нескольких клановых проклятий одновременно."}],brujah:[{id:"focus_of_rage",name:"Средоточие ярости",cost:3,category:"mental",requiresPath:"entelechy",description:"Можете частично контролировать безумие. Требует Путь Энтелехии."},{id:"dynamic_nature",name:"Динамичная натура",cost:5,category:"social",description:"Ваша харизма притягивает смертных. Легче приобретать Предыстории."},{id:"predator_demeanor",name:"Повадки хищника",cost:2,category:"social",description:"Ваша ярость видна. +2 к сложности Социальных бросков со смертными (кроме Запугивания)."}],follower_of_set:[{id:"antitoxin_blood",name:"Невосприимчивость к наркотикам",cost:2,category:"physical",description:"Устойчивость к алкоголю, наркотикам. -2 к сложности сопротивления."},{id:"addictive_blood",name:"Вызывающая привыкание кровь",cost:3,category:"supernatural",description:"Ваша кровь вызывает сильную зависимость у тех, кто ее пробует."},{id:"setite_initiate",name:"Сетит-посвященный",cost:5,category:"supernatural",availableToAll:!0,description:"Вы были посвящены в культ Сета из другого клана. Доступ к Серпентис и Сетитскому Колдовству."},{id:"scales",name:"Чешуя",cost:"variable",minCost:1,maxCost:3,category:"physical",description:"Части вашего тела покрыты змеиной чешуей. +2 к сложности Социальных бросков."},{id:"venomous_bite",name:"Ядовитый укус",cost:2,category:"physical",description:"Ваш укус убивает смертных. Должны питаться другими способами."},{id:"forked_tongue",name:"Раздвоенный язык",cost:2,category:"physical",description:"Ваш язык раздвоен и рептилен. Сложнее поддерживать Маскарад."},{id:"heartless",name:"Бессердечный",cost:4,category:"supernatural",description:"Вы потеряли свое сердце. Если оно у врага - вы должны подчиняться."},{id:"aura_of_typhon",name:"Аура Тифона",cost:5,category:"supernatural",description:"Люпины выслеживают вас по неизвестной причине."}],gangrel:[{id:"hive_mind",name:"Разум улья",cost:"variable",minCost:1,maxCost:2,category:"supernatural",description:"Анимализм работает на насекомых. За 2 очка - формы Протея могут быть роями."},{id:"skald",name:"Скальд",cost:2,category:"mental",description:"+1 кубик к броскам Оккультизма о вампирской истории. Отличная память на устные истории."},{id:"lesser_mark_beast",name:"Малая метка Зверя",cost:4,category:"supernatural",requiresPath:"humanity",description:"Можете избежать получения животных черт. Только на Человечности."},{id:"totem_shift",name:"Смена Тотема",cost:5,category:"supernatural",description:"Можете выбирать разную форму животного каждый раз при использовании Протея."},{id:"caged_rat",name:"Крыса в клетке",cost:2,category:"mental",description:"Когда вас запирают или сдерживают, +2 к сложности всех бросков."},{id:"pack_member",name:"Член стаи",cost:2,category:"supernatural",description:"Анимализм работает только на один тип животных (крысы, вороны и т.д.)."}],giovanni:[{id:"cannibal",name:"Каннибал",cost:1,category:"physical",description:"Вы можете есть человеческую плоть и получать пропитание (1 очко крови за порцию)."},{id:"mortuario",name:"Моритарио",cost:"variable",minCost:2,maxCost:4,category:"supernatural",description:"Обращены из мертвого состояния ритуалом. -2 к сложности Некромантии. 2 очка если Внешность 0, 4 для остальных."},{id:"bloodline_resistance",name:"Сопротивление единокровию",cost:1,category:"supernatural",description:"Не можете быть связаны кровными узами родственниками по смертной линии."},{id:"sanguine_incongruity",name:"Неприятие крови",cost:5,category:"supernatural",description:"Не страдаете от Проклятия Ламии, но выглядите как труп, +1 к сложности Социальных бросков."},{id:"inbred",name:"Плод инбридинга",cost:"variable",minCost:1,maxCost:5,category:"physical",description:"Физические или ментальные дефекты от инбридинга."},{id:"shadowwalker",name:"Идущий в тенях",cost:6,category:"supernatural",description:"Постоянно взаимодействуете с Подземным миром. Призрачные объекты реальны для вас."}],lasombra:[{id:"eyes_of_shadow",name:"Глаза Тени",cost:"variable",minCost:1,maxCost:4,category:"social",description:"Ваш взгляд темен и опасен. -N к сложности Запугивания."},{id:"aura_of_command",name:"Ореол власти",cost:3,category:"social",description:"Командный тон заставляет слушаться. -2 к сложности Лидерства."},{id:"shadow_king",name:"Король/Королева Тени",cost:4,category:"mental",requiresPath:"humanity",description:"Черпаете силу из эмпатии к смертным. -2 к сложности проверок деградации на Человечности."},{id:"long_term_planning",name:"Долгосрочное планирование",cost:4,category:"mental",description:"Раз за сессию можете объявить действие 'частью плана' и снизить сложность на 2."},{id:"hand_of_god",name:"Длань Бога",cost:5,category:"supernatural",description:"Особое благословение или проклятие, детали определяет Рассказчик."},{id:"uncontrollable_night_vision",name:"Неуправляемое ночное зрение",cost:2,category:"physical",description:"Ваши глаза приспособлены к темноте, но яркий свет ослепляет вас."},{id:"disobedient",name:"Непослушный",cost:3,category:"mental",description:"Вы плохо подчиняетесь приказам. +2 к сложности следования командам."},{id:"unworthy",name:"Недостойный",cost:3,category:"social",elderNote:"Рекомендуется бросок, пережил ли этот статус века",description:"Вы не смогли доказать свою ценность клану."}],malkavian:[{id:"blurry_aura",name:"Нечёткая аура",cost:2,category:"supernatural",description:"Ваша аура размыта и трудночитаема. +2 к сложности чтения вашей ауры."},{id:"prophetic_dreams",name:"Пророческие сны",cost:2,category:"supernatural",description:"Вы иногда видите пророческие сны о будущих событиях."},{id:"cold_reading",name:"Холодное чтение",cost:3,category:"mental",description:"Вы умеете читать людей. -2 к сложности бросков Эмпатии и Проницательности."},{id:"stigmata",name:"Стигматы",cost:"variable",minCost:2,maxCost:4,category:"supernatural",description:"Ваше тело проявляет стигматы в стрессовых ситуациях. Теряете кровь."},{id:"infectious",name:"Инфекционный",cost:3,category:"mental",description:"Ваше безумие заразно для тех, кто проводит с вами время."},{id:"hypersensitive",name:"Сверхвосприимчивый",cost:3,category:"mental",description:"Вы чрезмерно чувствительны к стимулам. Легко перегружаетесь."},{id:"dead_inside",name:"Мёртвый внутри",cost:4,category:"mental",description:"Вы эмоционально пусты. +3 к сложности Эмпатии, но +2 к сопротивлению манипуляции."}],nosferatu:[{id:"bad_blood",name:"Дурная кровь",cost:1,category:"physical",description:"Ваша кровь неприятна на вкус. Сложнее создавать гулей и связывать."},{id:"lizard_limbs",name:"Конечности ящерицы",cost:1,category:"physical",description:"Можете отращивать потерянные конечности за 1 очко крови и неделю."},{id:"long_fingers",name:"Длинные пальцы",cost:1,category:"physical",description:"Длинные пальцы. +1 к Ловкости для захватов и лазания."},{id:"monstrous_maw",name:"Чудовищная пасть",cost:1,category:"physical",description:"Огромная пасть с острыми зубами. +1 к урону укуса."},{id:"piscine",name:"Рыбий",cost:1,category:"physical",description:"Можете дышать под водой и плавать с удвоенной скоростью."},{id:"slippery",name:"Скользкий",cost:1,category:"physical",description:"Скользкая кожа. -2 к сложности побегов из захватов."},{id:"hidden_sleep",name:"Скрытый сон",cost:2,category:"supernatural",description:"Можете спать в необычных местах (в стенах, под полом)."},{id:"thick_hide",name:"Толстая шкура",cost:2,category:"physical",description:"Толстая кожа дает 1 дополнительный кубик брони."},{id:"erroneous_reflection",name:"Неверное отражение",cost:3,category:"supernatural",description:"Ваше отражение показывает другого человека. Работает с зеркалами и водой."},{id:"webbed",name:"Перепонки",cost:4,category:"physical",description:"Перепонки между пальцами. Отличное плавание, но заметно."},{id:"presentable",name:"Потрёпанный вид",cost:5,category:"social",description:"Вы не ужасны, просто некрасивы. Внешность 1 вместо 0."},{id:"stench",name:"Вонь",cost:1,category:"physical",description:"Вы ужасно воняете. +1 к сложности Социальных бросков."},{id:"loss_of_scent",name:"Потеря обоняния",cost:2,category:"physical",description:"Вы не можете чувствовать запахи."},{id:"parasite_haven",name:"Рассадник паразитов",cost:2,category:"physical",description:"Ваше тело кишит паразитами. Отталкивает других."},{id:"bestial",name:"Зверьё",cost:3,category:"social",description:"Вы похожи на зверя больше, чем на человека. Все Социальные броски +2 сложности."},{id:"rot",name:"Гниение",cost:4,category:"physical",description:"Ваша плоть постоянно гниет и требует регенерации."},{id:"tainted",name:"Заражение",cost:5,category:"supernatural",description:"Ваша кровь токсична. Те, кто пьют ее, болеют."},{id:"garbled_speech",name:"Бессвязная речь",cost:5,category:"mental",description:"Ваша речь почти непонятна. Огромные штрафы к Социальным броскам."}],ravnos:[{id:"ravnos_antitoxin",name:"Антитоксин в крови",cost:1,category:"physical",description:"Устойчивость к ядам и токсинам."},{id:"brahmin",name:"Брахман",cost:1,category:"social",description:"Высшая каста. +1 к Социальным броскам с Равнос."},{id:"kshatriya",name:"Кшатрия",cost:1,category:"physical",description:"Каста воинов. +1 к боевым броскам против не-Равнос."},{id:"sleight_of_hand",name:"Ловкость Рук",cost:1,category:"physical",description:"-2 к сложности бросков на ловкость рук и карманные кражи."},{id:"mute_devotion",name:"Немая Преданность",cost:1,category:"mental",description:"+2 к броскам на сопротивление Доминированию."},{id:"vaishya",name:"Вайшья",cost:1,category:"social",description:"Каста торговцев. -1 к сложности торговых бросков."},{id:"friendly_critters",name:"Дружелюбные зверьки",cost:2,category:"supernatural",description:"Мелкие животные вас любят и помогают."},{id:"hardened_heart",name:"Огрубевшее сердце",cost:3,category:"mental",description:"+1 к броскам на сопротивление эмоциональным манипуляциям."},{id:"chandala",name:"Чандала",cost:1,category:"social",description:"Низшая каста. +2 к сложности Социальных бросков с Равнос."},{id:"imperfect_reality",name:"Несовершенная реальность",cost:2,category:"supernatural",description:"Ваши иллюзии Химерии иногда имеют дефекты."},{id:"oathbreaker",name:"Клятвопреступник",cost:2,category:"social",description:"Вы нарушили важную клятву. Социальные последствия."},{id:"lost_svadharma",name:"Потерянная Свадхарма",cost:3,category:"mental",description:"Вы не смогли выполнить свою судьбу. Духовный кризис."}],toreador:[{id:"indelible",name:"Неизгладимый",cost:1,category:"social",description:"Вас трудно забыть. Люди помнят вас."},{id:"impressive_composure",name:"Впечатляющее самообладание",cost:2,category:"mental",requiresPath:"humanity",description:"+2 к броскам Самоконтроля. Только на Человечности."},{id:"master_of_masquerade",name:"Мастер Маскарада",cost:2,category:"social",description:"-2 к сложности бросков на сокрытие вампирской природы."},{id:"slow_degeneration",name:"Медленная деградация",cost:5,category:"mental",requiresPath:"humanity",description:"+1 к броскам на сопротивление деградации. Только на Человечности."},{id:"perfectionist_artist",name:"Художник-перфекционист",cost:1,category:"mental",description:"Вы одержимы совершенством своего искусства. Может мешать другим действиям."}],tremere:[{id:"unbonded_by_cup",name:"Становление без чаши",cost:1,category:"supernatural",description:"Вы не связаны кровными узами с Тремер через ритуал инициации."},{id:"magical_curse",name:"Магическое Проклятие",cost:"variable",minCost:1,maxCost:5,category:"supernatural",description:"Вы страдаете от магического проклятия. Эффекты зависят от стоимости."},{id:"recluse",name:"Затворник",cost:2,category:"social",description:"Вы предпочитаете одиночество. +1 к сложности в социальных ситуациях."},{id:"blood_of_mage",name:"Кровь мага",cost:5,category:"supernatural",description:"Ваша кровь сохранила магический потенциал смертного мага."},{id:"thaumaturgy_incapable",name:"Неспособность к Тауматургии",cost:5,category:"supernatural",description:"Вы не можете изучать Тауматургию. Крайне проблематично для Тремер."}],tzimisce:[{id:"bioluminescence",name:"Биолюминесценция",cost:1,category:"physical",description:"Можете заставить свою кожу светиться."},{id:"pain_tolerance",name:"Терпимость к боли",cost:2,category:"physical",description:"Игнорируете штрафы от ран на 1 уровень."},{id:"dragon_temperament",name:"Темперамент дракона",cost:3,category:"mental",description:"+2 к броскам на сопротивление безумию, когда спокойны."},{id:"haven_affinity",name:"Связь с убежищем",cost:3,category:"supernatural",description:"Особая связь с основным убежищем. Бонусы внутри него."},{id:"revenant_disciplines",name:"Дисциплины ревенантов",cost:3,category:"supernatural",description:"Доступ к дисциплинам семьи ревенантов."},{id:"promethean_clay",name:"Прометеева глина",cost:5,category:"supernatural",description:"Вы мастер Преобразования. -1 к сложности всех бросков Преобразования."},{id:"unblinking_stare",name:"Немигающий взгляд",cost:1,category:"physical",description:"Вы не моргаете. Выглядит жутко."},{id:"ancestral_soil",name:"Зависимость от земли предков",cost:2,category:"supernatural",description:"Должны спать с землей Восточной Европы. Очень тематично для Древних."},{id:"faceless",name:"Безликий",cost:3,category:"physical",description:"У вас нет постоянного лица. Должны формировать его Преобразованием."},{id:"privacy_obsession",name:"Одержимость уединением",cost:3,category:"mental",description:"Одержимы частной жизнью и секретностью."},{id:"revenant_weakness",name:"Слабость ревенантов",cost:3,category:"supernatural",description:"Страдаете от слабости семьи ревенантов в дополнение к клановой."},{id:"consumption",name:"Потребление",cost:5,category:"physical",description:"Должны потреблять плоть вместе с кровью для пропитания."}],ventrue:[{id:"connoisseur",name:"Знаток",cost:2,category:"physical",description:"Получаете больше пропитания от предпочитаемой крови."},{id:"blessing_st_gustav",name:"Благословение Святого Густава",cost:4,category:"supernatural",description:"Средневековый ритуал. Особые способности против люпинов."},{id:"rarefied_tastes",name:"Необычные предпочтения",cost:2,category:"physical",description:"Ваши вкусовые предпочтения чрезвычайно специфичны."}],caitiff:[{id:"personal_masquerade",name:"Личный Маскарад",cost:3,category:"social",description:"Можете притворяться членом другого клана."},{id:"clan_weakness_caitiff",name:"Слабость Клана",cost:2,category:"supernatural",description:"Страдаете от слабости определенного клана."},{id:"absence_of_fangs",name:"Отсутствие клыков",cost:2,category:"physical",description:"У вас нет клыков. Кормление затруднено."},{id:"bulimia",name:"Булимия",cost:4,category:"physical",description:"Не можете удерживать кровь. Должны потреблять больше."}]},D={physical:W,mental:z,social:J,supernatural:G,clanSpecific:U},K=[{id:"short",name:"Коротышка",cost:1,incompatibleWith:["huge_size"],description:"Вы ниже среднего роста (менее 150 см)."},{id:"smell_of_grave",name:"Могильный запах",cost:1,description:"Вы пахнете могилой. +1 к сложности Социальных бросков."},{id:"tic",name:"Нервный тик",cost:1,description:"У вас нервный тик, который может выдать вас."},{id:"hard_of_hearing",name:"Тугоухость",cost:1,description:"Вы плохо слышите. +2 к сложности бросков Восприятия, связанных со слухом."},{id:"bad_sight_minor",name:"Плохое зрение (очки)",cost:1,description:"Вам нужны очки, чтобы видеть. Без них +2 к сложности зрительных бросков."},{id:"bad_sight_major",name:"Плохое зрение (без коррекции)",cost:3,description:"Ваше зрение ужасно. +2 к сложности всех зрительных бросков."},{id:"disfigured",name:"Уродство",cost:2,maxAppearance:2,description:"Вы обезображены. Максимальная Внешность 2."},{id:"blunt_fangs",name:"Тупые клыки",cost:2,description:"Ваши клыки тупые. Кормление занимает вдвое больше времени."},{id:"infectious_bite",name:"Заразный укус",cost:2,description:"Ваш укус вызывает инфекцию у смертных."},{id:"one_eye",name:"Одноглазый",cost:2,description:"У вас только один глаз. +1 к сложности зрительных бросков."},{id:"vulnerability_silver",name:"Уязвимость к серебру",cost:2,description:"Серебро наносит вам усугубленный урон."},{id:"open_wound_minor",name:"Кровоточащая рана (лёгкая)",cost:2,description:"У вас рана, которая постоянно кровоточит. Теряете 1 очко крови за ночь."},{id:"open_wound_major",name:"Кровоточащая рана (тяжёлая)",cost:4,description:"У вас серьезная рана. Теряете 1 очко крови за сцену."},{id:"lazy",name:"Лень",cost:3,description:"Вы ленивы. Сложнее мотивировать себя к действиям."},{id:"slow_healing",name:"Медленное заживление",cost:3,description:"Вы заживаете медленнее. Удвоенная стоимость крови на исцеление."},{id:"permanent_wound",name:"Незаживающая рана",cost:3,description:"У вас есть рана, которая никогда не заживает полностью."},{id:"addiction",name:"Пристрастие",cost:3,description:"Вы зависимы от определенного вещества в крови."},{id:"child",name:"Ребёнок",cost:3,requiresFlaws:["short"],maxStrength:2,maxStamina:2,description:"Вы были Обращены ребенком. Максимум Силы и Выносливости 2."},{id:"glowing_eyes",name:"Светящиеся глаза",cost:3,description:"Ваши глаза светятся в темноте, когда вы используете дисциплины."},{id:"protruding_fangs",name:"Торчащие клыки",cost:3,maxAppearance:3,description:"Ваши клыки всегда видны. Максимальная Внешность 3."},{id:"deformity",name:"Увечье",cost:3,description:"У вас серьезное увечье, влияющее на физические действия."},{id:"lame",name:"Хромота",cost:3,description:"Вы хромаете. Половинная скорость передвижения."},{id:"monstrous",name:"Чудовищная внешность",cost:3,excludedClans:["nosferatu"],setsAppearance:0,description:"Вы ужасны на вид. Внешность 0."},{id:"deaf",name:"Глухота",cost:4,description:"Вы полностью глухи."},{id:"mute",name:"Немота",cost:4,description:"Вы не можете говорить."},{id:"disease_carrier",name:"Разносчик заразы",cost:4,description:"Вы переносите смертельную болезнь, которая передается смертным."},{id:"thin_blood",name:"Слабая кровь",cost:4,description:"Ваша кровь слаба. Сложнее создавать гулей и потомство."},{id:"sterile_vitae",name:"Бесплодная витэ",cost:5,description:"Вы не можете создавать потомство или гулей."},{id:"flesh_of_corpse",name:"Мёртвая плоть",cost:5,description:"Ваша плоть холодна как у трупа. Очевидно нечеловеческая."},{id:"blind",name:"Слепота",cost:6,description:"Вы полностью слепы."}],Q=[{id:"deep_sleeper",name:"Глубокий сон",cost:1,incompatibleWith:["early_riser"],description:"Вы спите очень глубоко. +2 к сложности пробуждения."},{id:"speech_impediment",name:"Дефект речи",cost:1,description:"У вас дефект речи. Сложнее общаться."},{id:"nightmares",name:"Кошмары",cost:1,description:"Вас мучают кошмары. Сложнее полноценно отдохнуть."},{id:"soft_hearted",name:"Мягкосердечность",cost:1,minHumanity:6,description:"Вы слишком мягкосердечны. Сложнее совершать жестокие поступки."},{id:"unreliable",name:"Неблагонадёжность",cost:1,description:"Вы ненадежны. Другие вам не доверяют."},{id:"impatient",name:"Нетерпеливость",cost:1,description:"Вы нетерпеливы. Сложно ждать или планировать долго."},{id:"prey_exclusion",name:"Разборчивость",cost:1,excludedClans:["ventrue"],description:"Вы не можете питаться от определенного типа людей."},{id:"shy",name:"Робость",cost:1,description:"Вы застенчивы. +1 к сложности Социальных бросков с незнакомцами."},{id:"amnesia",name:"Амнезия",cost:2,description:"Вы не помните части своего прошлого."},{id:"short_fuse",name:"Вспыльчивость",cost:2,excludedClans:["brujah"],description:"Вы вспыльчивы. +2 к сложности сопротивления безумию от гнева."},{id:"thirst_for_innocence",name:"Жажда невинности",cost:2,description:"Вы можете питаться только от невинных."},{id:"lunacy",name:"Лунный психоз",cost:2,description:"Вы подвержены лунному безумию в полнолуние."},{id:"vengeful",name:"Мстительность",cost:2,description:"Вы мстительны. Должны мстить за оскорбления."},{id:"territorial",name:"Территориальность",cost:2,description:"Вы территориальны. Агрессивны к вторжениям на вашу территорию."},{id:"phobia",name:"Фобия",cost:2,description:"У вас серьезная фобия определенного объекта или ситуации."},{id:"stereotype",name:"Ходячий стереотип",cost:2,description:"Вы воплощаете стереотип своего клана до крайности."},{id:"weak_willed",name:"Слабоволие",cost:3,maxWillpower:4,description:"Ваша воля слаба. Максимальная Сила Воли 4."},{id:"flesh_eater",name:"Людоед",cost:4,requiresMerits:["iron_stomach"],description:"Вы должны есть человеческую плоть вместе с кровью."},{id:"guilt_wracked",name:"Угрызения совести",cost:4,description:"Вас мучает вина за ваши поступки."},{id:"flashbacks",name:"Мучительные воспоминания",cost:6,description:"Вас преследуют травматические воспоминания, вызывающие флешбэки."}],Y=[{id:"mistaken_identity",name:"Путаница",cost:1,description:"Вас путают с кем-то другим. При пробуждении из торпора династия может выжить в современность."},{id:"infamous_sire",name:"Презренный сир",cost:1,elderNote:"Репутация сира из древних времен",description:"Ваш сир имеет дурную репутацию, которая может распространяться на вас."},{id:"enemy_3pt",name:"Враг (3 пункта)",cost:3,elderNote:"Только крупные враждебности переживают века. Рекомендуется бросок на выживание врага",description:"У вас есть серьезный враг. Только крупные враждебности переживают века."},{id:"enemy_4pt",name:"Враг (4 пункта)",cost:4,elderNote:"Только крупные враждебности переживают века. Рекомендуется бросок на выживание врага",description:"У вас есть могущественный враг."},{id:"enemy_5pt",name:"Враг (5 пунктов)",cost:5,elderNote:"Только крупные враждебности переживают века. Рекомендуется бросок на выживание врага",description:"У вас есть чрезвычайно могущественный враг."},{id:"clan_enemy",name:"Враг клана",cost:4,elderNote:"Рекомендуется бросок, помнит ли клан эту вражду",description:"Вы враг целого клана."},{id:"red_list",name:"Красный Список",cost:7,elderRequirement:"torpor_date >= 1450",elderNote:"Требуется: Вампир был активен когда Камарилья была основана (1450+)",description:"Вы в Красном Списке Камарилли."}],Z=[{id:"repulsive_touch",name:"Леденящее касание",cost:1,description:"Ваше прикосновение неприятно. +1 к сложности Социальных бросков."},{id:"repelled_by_garlic",name:"Отвращение к чесноку",cost:1,description:"Вы отталкиваетесь чесноком. Должны держаться от него на расстоянии."},{id:"cast_no_reflection",name:"Отсутствие отражения",cost:1,excludedClans:["lasombra"],description:"Вы не отражаетесь в зеркалах."},{id:"eerie_presence",name:"Холодный ветер",cost:1,description:"Холодный ветер следует за вами. Люди чувствуют неладное."},{id:"cursed_1pt",name:"Проклятие (1 пункт)",cost:1,description:"Вы прокляты слабым проклятием."},{id:"cursed_2pt",name:"Проклятие (2 пункта)",cost:2,description:"Вы прокляты умеренным проклятием."},{id:"cursed_3pt",name:"Проклятие (3 пункта)",cost:3,description:"Вы прокляты серьезным проклятием."},{id:"cursed_4pt",name:"Проклятие (4 пункта)",cost:4,description:"Вы прокляты сильным проклятием."},{id:"cursed_5pt",name:"Проклятие (5 пунктов)",cost:5,description:"Вы прокляты ужасным проклятием."},{id:"haunted",name:"Зерцало смерти",cost:2,description:"Вы видите призраков своих жертв."},{id:"touch_of_frost",name:"Зловещее присутствие",cost:2,description:"Ваше присутствие вызывает холод и страх."},{id:"lord_of_flies",name:"Повелитель мух",cost:2,description:"Мухи и другие насекомые роятся вокруг вас."},{id:"beacon_darkness",name:"Светоч тьмы",cost:2,description:"Вы притягиваете темных духов и сущностей."},{id:"repelled_by_crosses",name:"Боязнь крестов",cost:3,description:"Кресты и религиозные символы причиняют вам боль."},{id:"cant_cross_running_water",name:"Водная преграда",cost:3,description:"Вы не можете пересекать проточную воду."},{id:"haunted_by_ghost",name:"Мстительный призрак",cost:3,description:"Призрак преследует вас, желая мести."},{id:"grip_damned",name:"Поцелуй Проклятого",cost:4,excludedClans:["giovanni"],description:"Ваш Поцелуй причиняет боль, а не удовольствие."},{id:"doomed",name:"Рок",cost:5,description:"Вы обречены на ужасную судьбу."},{id:"light_sensitive",name:"Светобоязнь",cost:5,excludedClans:["followers_of_set"],description:"Даже искусственный свет причиняет вам урон."}],ee={physical:K,mental:Q,social:Y,supernatural:Z};class te{constructor(){this.character=new _,this.tracker=new C(this.character),this.currentPhase="setup",this.allDisciplines=this.flattenDisciplines(),this.init()}flattenDisciplines(){const e=[];return Object.values(N).forEach(t=>{e.push(...t)}),e}init(){this.render(),this.attachEventListeners(),this.updateAllDisplays()}render(){const e=document.getElementById("app");e.innerHTML="",e.innerHTML=`
      <div class="min-h-screen p-4 md:p-6">
        <header class="mb-4">
          <h1 class="text-2xl md:text-3xl font-bold text-center text-vtm-red mb-1">
            Vampire: The Masquerade 20A
          </h1>
          <h2 class="text-lg md:text-xl text-center text-gray-400">
            Создание персонажа - Древний
          </h2>
        </header>

        <div class="max-w-5xl mx-auto">
          <!-- Phase tabs -->
          <div class="flex border-b border-gray-700 mb-4 overflow-x-auto">
            <div class="tab ${this.currentPhase==="setup"?"active":""}" data-phase="setup">
              1. Базовая настройка
            </div>
            <div class="tab ${this.currentPhase==="freebies"?"active":""}" data-phase="freebies">
              2. Freebies
            </div>
            <div class="tab ${this.currentPhase==="xp"?"active":""}" data-phase="xp">
              3. Опыт (XP)
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
    `}renderPhaseContent(){switch(this.currentPhase){case"setup":return this.renderSetupPhase();case"freebies":return this.renderFreebiesPhase();case"xp":return this.renderXPPhase();default:return""}}renderSetupPhase(){return`
      <div class="space-y-4">
        ${this.renderBasicInfo()}
        ${this.renderAttributes()}
        ${this.renderAbilities()}
        ${this.renderAdvantages()}
        ${this.renderSummary()}
      </div>
    `}renderBasicInfo(){return`
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card">
          <h3 class="section-title">Основная информация</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1">Имя</label>
              <input type="text" id="name" class="input-field" value="${this.character.name}">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Игрок</label>
              <input type="text" id="player" class="input-field" value="${this.character.player}">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Хроника</label>
              <input type="text" id="chronicle" class="input-field" value="${this.character.chronicle}">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Натура</label>
              <input type="text" id="nature" class="input-field"
                     list="nature-list" value="${this.character.nature}">
              <datalist id="nature-list">
                ${S.map(e=>`
                  <option value="${e.name}">
                `).join("")}
              </datalist>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Маска</label>
              <input type="text" id="demeanor" class="input-field"
                     list="demeanor-list" value="${this.character.demeanor}">
              <datalist id="demeanor-list">
                ${S.map(e=>`
                  <option value="${e.name}">
                `).join("")}
              </datalist>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Концепция</label>
              <input type="text" id="concept" class="input-field"
                     list="concept-list" value="${this.character.concept}">
              <datalist id="concept-list">
                ${H.map(e=>`
                  <option value="${e.name}">
                `).join("")}
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
                ${$.map(e=>`
                  <option value="${e.id}" ${this.character.clan===e.id?"selected":""}>
                    ${e.name}
                  </option>
                `).join("")}
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
                Фон "Поколение": -${this.character.backgrounds.generation||0}<br>
                Недостаток "Разбавленная кровь": +${this.character.dilutedVitae}
              </div>
            </div>
            ${this.renderBloodPoolInfo()}
          </div>
        </div>

        <div class="card md:col-span-2">
          <h3 class="section-title">Слабость клана</h3>
          <div id="clanWeakness" class="p-4 bg-gray-800 rounded text-gray-300">
            ${this.character.clan?this.getClanWeakness():"Выберите клан"}
          </div>
        </div>
      </div>
    `}renderBloodPoolInfo(){const e=this.character.getBloodPoolStats();return`
      <div class="p-4 bg-gray-800 rounded">
        <div class="text-sm font-medium mb-2">Запас крови</div>
        <div class="text-xs text-gray-400">
          Максимум: ${e.max}<br>
          За ход: ${e.perTurn}
        </div>
      </div>
    `}getClanWeakness(){const e=$.find(t=>t.id===this.character.clan);return e?e.weakness:""}renderAttributes(){var t,i,s,a,n,c,d,r,o,m,l,p;const e=this.tracker.validateAttributes();return`
      <div class="card">
        <h3 class="section-title">Атрибуты</h3>
        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-sm font-medium mb-2">Правила распределения: 9/7/5</div>
          <div class="text-xs text-gray-400 mb-2">
            Максимум 6 в одном атрибуте до Freebies. Каждый атрибут начинается с 1.
          </div>
          <div class="flex gap-4">
            <div>Физические: <span class="${((t=e.totals)==null?void 0:t.physical)===9||((i=e.totals)==null?void 0:i.physical)===7||((s=e.totals)==null?void 0:s.physical)===5?"text-green-400":"text-red-400"}">${((a=e.totals)==null?void 0:a.physical)||0}</span></div>
            <div>Социальные: <span class="${((n=e.totals)==null?void 0:n.social)===9||((c=e.totals)==null?void 0:c.social)===7||((d=e.totals)==null?void 0:d.social)===5?"text-green-400":"text-red-400"}">${((r=e.totals)==null?void 0:r.social)||0}</span></div>
            <div>Ментальные: <span class="${((o=e.totals)==null?void 0:o.mental)===9||((m=e.totals)==null?void 0:m.mental)===7||((l=e.totals)==null?void 0:l.mental)===5?"text-green-400":"text-red-400"}">${((p=e.totals)==null?void 0:p.mental)||0}</span></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${this.renderAttributeCategory("physical","Физические",["strength","dexterity","stamina"],["Сила","Ловкость","Выносливость"])}
          ${this.renderAttributeCategory("social","Социальные",["charisma","manipulation","appearance"],["Обаяние","Манипулирование","Привлекательность"])}
          ${this.renderAttributeCategory("mental","Ментальные",["perception","intelligence","wits"],["Восприятие","Интеллект","Смекалка"])}
        </div>
      </div>
    `}renderAttributeCategory(e,t,i,s){return`
      <div>
        <h4 class="subsection-title">${t}</h4>
        ${i.map((a,n)=>`
          <div class="stat-row">
            <span class="stat-label">${s[n]}</span>
            <div class="dot-tracker" data-category="attributes" data-subcategory="${e}" data-attr="${a}">
              ${this.renderDots(this.character.attributes[e][a],10)}
            </div>
          </div>
        `).join("")}
      </div>
    `}renderAbilities(){var t,i,s,a,n,c,d,r,o,m,l,p;const e=this.tracker.validateAbilities();return`
      <div class="card">
        <h3 class="section-title">Способности</h3>
        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-sm font-medium mb-2">Правила распределения: 18/12/8</div>
          <div class="text-xs text-gray-400 mb-2">
            Максимум 5 в одной способности до Freebies.
          </div>
          <div class="flex gap-4">
            <div>Таланты: <span class="${((t=e.totals)==null?void 0:t.talents)===18||((i=e.totals)==null?void 0:i.talents)===12||((s=e.totals)==null?void 0:s.talents)===8?"text-green-400":"text-red-400"}">${((a=e.totals)==null?void 0:a.talents)||0}</span></div>
            <div>Навыки: <span class="${((n=e.totals)==null?void 0:n.skills)===18||((c=e.totals)==null?void 0:c.skills)===12||((d=e.totals)==null?void 0:d.skills)===8?"text-green-400":"text-red-400"}">${((r=e.totals)==null?void 0:r.skills)||0}</span></div>
            <div>Познания: <span class="${((o=e.totals)==null?void 0:o.knowledges)===18||((m=e.totals)==null?void 0:m.knowledges)===12||((l=e.totals)==null?void 0:l.knowledges)===8?"text-green-400":"text-red-400"}">${((p=e.totals)==null?void 0:p.knowledges)||0}</span></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${this.renderAbilityCategory("talents","Таланты",w.talents)}
          ${this.renderAbilityCategory("skills","Навыки",w.skills)}
          ${this.renderAbilityCategory("knowledges","Познания",w.knowledges)}
        </div>
      </div>
    `}renderAbilityCategory(e,t,i){return`
      <div>
        <h4 class="subsection-title">${t}</h4>
        ${i.map(s=>`
          <div class="stat-row">
            <span class="stat-label">${s.name}</span>
            <div class="dot-tracker" data-category="abilities" data-subcategory="${e}" data-attr="${s.id}">
              ${this.renderDots(this.character.abilities[e][s.id]||0,10)}
            </div>
          </div>
        `).join("")}
      </div>
    `}renderAdvantages(){const e=this.tracker.validateDisciplines(),t=this.tracker.validateBackgrounds(),i=this.tracker.validateVirtues();return`
      <div class="space-y-6">
        <!-- Disciplines -->
        <div class="card">
          <h3 class="section-title">Дисциплины</h3>
          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-sm font-medium">Всего очков: <span class="${e.total<=7?"text-green-400":"text-red-400"}">${e.total}/7</span></div>
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
            <div class="text-sm font-medium mb-2">Всего очков: <span class="${t.total<=3?"text-green-400":"text-red-400"}">${t.total}/3</span></div>
            <div class="text-xs text-gray-400">Доступны: Поколение, Стадо, Ресурсы, Слуги</div>
          </div>
          ${L.map(s=>`
            <div class="stat-row">
              <div>
                <span class="stat-label">${s.name}</span>
                <div class="text-xs text-gray-400">${s.description}</div>
              </div>
              <div class="dot-tracker" data-category="backgrounds" data-attr="${s.id}">
                ${this.renderDots(this.character.backgrounds[s.id]||0,5)}
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Virtues -->
        <div class="card">
          <h3 class="section-title">Добродетели</h3>
          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-sm font-medium">Всего очков: <span class="${i.total<=5?"text-green-400":"text-red-400"}">${i.total}/5</span></div>
            <div class="text-xs text-gray-400">Каждая добродетель начинается с 1</div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Совесть/Убеждение</span>
            <div class="dot-tracker" data-category="virtues" data-attr="conscience">
              ${this.renderDots(this.character.virtues.conscience,5)}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Самоконтроль/Инстинкт</span>
            <div class="dot-tracker" data-category="virtues" data-attr="selfControl">
              ${this.renderDots(this.character.virtues.selfControl,5)}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Храбрость</span>
            <div class="dot-tracker" data-category="virtues" data-attr="courage">
              ${this.renderDots(this.character.virtues.courage,5)}
            </div>
          </div>
        </div>

        <!-- Humanity & Willpower -->
        <div class="card">
          <h3 class="section-title">Человечность и Сила воли</h3>
          <div class="stat-row">
            <span class="stat-label">Человечность</span>
            <div class="dot-tracker" data-category="humanity" data-attr="humanity">
              ${this.renderDots(this.character.humanity,10)}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Сила воли</span>
            <div class="dot-tracker" data-category="willpower" data-attr="willpower">
              ${this.renderDots(this.character.willpower,10)}
            </div>
          </div>
        </div>
      </div>
    `}renderDisciplinesList(){const e=this.getClanDisciplines(),t=Object.entries(this.character.disciplines);return t.length===0?'<div class="text-gray-400 text-center py-4">Нет дисциплин. Нажмите "Добавить дисциплину"</div>':t.map(([i,s])=>{const a=this.allDisciplines.find(r=>r.id===i),n=e.includes(i),c=i==="necromancy"||i==="thaumaturgy";let d="";if(i==="necromancy"&&this.character.necromancyPaths.length>0){const r=this.character.necromancyPaths;d='<div class="text-xs text-gray-400 mt-1">',r.forEach((o,m)=>{const l=P.paths.find(g=>g.id===o.pathId),p=m===0?"Основной":`Вторичный ${m}`;d+=`${p}: ${(l==null?void 0:l.name)||o.pathId} (${o.level})${m<r.length-1?"<br>":""}`}),d+="</div>"}else if(i==="thaumaturgy"&&this.character.thaumaturgyPaths.length>0){const r=this.character.thaumaturgyPaths;d='<div class="text-xs text-gray-400 mt-1">',r.forEach((o,m)=>{const l=E.paths.find(g=>g.id===o.pathId),p=m===0?"Основной":`Вторичный ${m}`;d+=`${p}: ${(l==null?void 0:l.name)||o.pathId} (${o.level})${m<r.length-1?"<br>":""}`}),d+="</div>"}return`
        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="stat-label">${(a==null?void 0:a.name)||i}</span>
                ${n?'<span class="text-xs text-green-400">(Клановая)</span>':""}
              </div>
              ${d}
            </div>
            <div class="flex items-center gap-2">
              <div class="dot-tracker" data-category="disciplines" data-attr="${i}">
                ${this.renderDots(s,10)}
              </div>
              <button class="text-red-500 hover:text-red-400 text-xl" onclick="app.removeDiscipline('${i}')">×</button>
            </div>
          </div>
          ${c?`
            <button class="btn btn-secondary text-sm mt-2" onclick="app.managePaths('${i}')">
              📜 Управление путями и ритуалами
            </button>
          `:""}
        </div>
      `}).join("")}renderFreebiesPhase(){const e=this.character.freebies-this.character.freebiesSpent,t=this.character.flaws.reduce((s,a)=>s+(a.selectedCost||a.cost),0),i=this.character.merits.reduce((s,a)=>s+(a.selectedCost||a.cost),0);return`
      <div class="card">
        <h3 class="section-title">Распределение бонусных очков</h3>

        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-lg font-bold mb-2">
            Доступно: <span class="${e>=0?"text-green-400":"text-red-400"}">${e}</span> бонусных очков
          </div>
          <div class="text-sm text-gray-400">
            Базовые: 15<br>
            Котерия (обязательный недостаток): +7<br>
            Личные недостатки: +${Math.min(t,7)} (макс. 7)<br>
            Достоинства: -${i}<br>
            Использовано на улучшения: ${this.character.freebiesSpent}<br>
            <span class="text-yellow-400 mt-1 block">Бонусные очки используются для улучшения характеристик сверх базового распределения.</span>
          </div>
        </div>

        ${this.renderMeritsFlawsSection()}

        <div class="mb-6">
          <h4 class="font-semibold mb-3">Потратить бонусные очки</h4>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1">Что повысить?</label>
              <select id="freebieType" class="input-field">
                <option value="">Выберите...</option>
                <option value="attribute">Атрибут (5 очков)</option>
                <option value="ability">Способность (2 очка)</option>
                <option value="discipline">Дисциплина (7 очков)</option>
                <option value="background">Предыстория (1 очко)</option>
                <option value="virtue">Добродетель (2 очка)</option>
                <option value="humanity">Человечность (1 очко)</option>
                <option value="willpower">Сила воли (1 очко)</option>
              </select>
            </div>

            <div id="freebiePurchaseOptions"></div>

            <div id="freebieCostDisplay" class="p-3 bg-gray-800 rounded hidden">
              <div class="text-sm font-medium mb-1">Стоимость: <span id="freebieCostAmount" class="text-vtm-red">0</span> бонусных очков</div>
              <div class="text-xs text-gray-400" id="freebieCostDetails"></div>
            </div>

            <button id="freebiePurchaseBtn" class="btn btn-primary w-full hidden">Купить</button>
          </div>
        </div>

        <details class="mb-4">
          <summary class="cursor-pointer font-semibold mb-2">Справка: Таблица стоимости бонусных очков</summary>
          <div class="space-y-1 text-xs text-gray-400 p-3 bg-gray-800 rounded">
            <div>• Атрибут: <strong class="text-white">5</strong></div>
            <div>• Способность: <strong class="text-white">2</strong></div>
            <div>• Дисциплина: <strong class="text-white">7</strong></div>
            <div>• Предыстория: <strong class="text-white">1</strong></div>
            <div>• Добродетель: <strong class="text-white">2</strong></div>
            <div>• Человечность: <strong class="text-white">1</strong></div>
            <div>• Сила воли: <strong class="text-white">1</strong></div>
          </div>
        </details>

        <div class="flex gap-3">
          <button class="btn btn-secondary" onclick="app.switchPhase('setup')">← Назад к настройке</button>
          <button class="btn btn-primary flex-1" onclick="app.switchPhase('xp')">Далее: Опыт →</button>
        </div>
      </div>
    `}renderMeritsFlawsSection(){return`
      <div class="mb-6 p-4 bg-gray-900 rounded">
        <h4 class="font-semibold mb-3">Достоинства и Недостатки</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Current Merits -->
          <div>
            <div class="text-sm font-medium mb-2">Достоинства (стоят бонусные очки):</div>
            <div class="space-y-2">
              ${this.character.merits.length===0?'<div class="text-xs text-gray-500">Нет выбранных достоинств</div>':this.character.merits.map(e=>`
                  <div class="p-2 bg-gray-800 rounded flex justify-between items-start">
                    <div class="flex-1">
                      <div class="font-medium text-sm">${e.name}</div>
                      ${e.description?`<div class="text-xs text-gray-400 mt-1">${e.description}</div>`:""}
                      ${e.elderNote?`<div class="text-xs text-yellow-400 mt-1">⚠️ ${e.elderNote}</div>`:""}
                    </div>
                    <div class="ml-2 text-nowrap">
                      <span class="text-vtm-red font-medium">${e.selectedCost||e.cost}</span>
                      <button class="ml-2 text-red-400 hover:text-red-300" onclick="app.removeMerit('${e.id}')">✕</button>
                    </div>
                  </div>
                `).join("")}
            </div>
            <button class="btn btn-secondary w-full mt-2 text-sm" onclick="app.showMeritsModal()">+ Добавить достоинство</button>
          </div>

          <!-- Current Flaws -->
          <div>
            <div class="text-sm font-medium mb-2">Недостатки (дают бонусные очки, макс. 7):</div>
            <div class="space-y-2">
              ${this.character.flaws.length===0?'<div class="text-xs text-gray-500">Нет выбранных недостатков</div>':this.character.flaws.map(e=>`
                  <div class="p-2 bg-gray-800 rounded flex justify-between items-start">
                    <div class="flex-1">
                      <div class="font-medium text-sm">${e.name}</div>
                      ${e.description?`<div class="text-xs text-gray-400 mt-1">${e.description}</div>`:""}
                      ${e.elderNote?`<div class="text-xs text-yellow-400 mt-1">⚠️ ${e.elderNote}</div>`:""}
                    </div>
                    <div class="ml-2 text-nowrap">
                      <span class="text-green-400 font-medium">+${e.selectedCost||e.cost}</span>
                      <button class="ml-2 text-red-400 hover:text-red-300" onclick="app.removeFlaw('${e.id}')">✕</button>
                    </div>
                  </div>
                `).join("")}
            </div>
            <button class="btn btn-secondary w-full mt-2 text-sm" onclick="app.showFlawsModal()">+ Добавить недостаток</button>
          </div>
        </div>
      </div>
    `}renderXPPhase(){const e=this.character.experience-this.character.experienceSpent;return`
      <div class="card">
        <h3 class="section-title">Распределение опыта (XP)</h3>

        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-lg font-bold mb-2">
            Доступно: <span class="${e>=0?"text-green-400":"text-red-400"}">${e}</span> / 33 XP
          </div>
          <div class="text-sm text-gray-400">
            Древние начинают с 33 опыта
          </div>
        </div>

        <div class="mb-6">
          <h4 class="font-semibold mb-3">Потратить XP</h4>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1">Что повысить?</label>
              <select id="xpType" class="input-field">
                <option value="">Выберите...</option>
                <option value="attribute">Атрибут (текущее × 4)</option>
                <option value="ability">Способность (новая: 3, повысить: текущее × 2)</option>
                <option value="discipline">Дисциплина (новая: 10, повысить: зависит от клана)</option>
                <option value="virtue">Добродетель (текущее × 2)</option>
                <option value="humanity">Человечность (текущее × 2)</option>
                <option value="willpower">Сила воли (текущее × 1)</option>
              </select>
            </div>

            <div id="xpPurchaseOptions"></div>

            <div id="xpCostDisplay" class="p-3 bg-gray-800 rounded hidden">
              <div class="text-sm font-medium mb-1">Стоимость: <span id="xpCostAmount" class="text-vtm-red">0</span> XP</div>
              <div class="text-xs text-gray-400" id="xpCostDetails"></div>
            </div>

            <button id="xpPurchaseBtn" class="btn btn-primary w-full hidden">Купить</button>
          </div>
        </div>

        <details class="mb-4">
          <summary class="cursor-pointer font-semibold mb-2">Справка: Полная таблица стоимости XP</summary>
          <div class="space-y-1 text-xs text-gray-400 p-3 bg-gray-800 rounded">
            <div>• Новая способность: <strong class="text-white">3</strong></div>
            <div>• Новая дисциплина: <strong class="text-white">10</strong></div>
            <div>• Новый путь (Некромантия/Тауматургия): <strong class="text-white">7</strong></div>
            <div>• Атрибут: <strong class="text-white">текущее × 4</strong></div>
            <div>• Способность: <strong class="text-white">текущее × 2</strong></div>
            <div>• Дисциплина (физическая, клановая): <strong class="text-white">текущее × 5</strong></div>
            <div>• Дисциплина (ментальная, клановая): <strong class="text-white">текущее × 6</strong></div>
            <div>• Дисциплина (уникальная, клановая): <strong class="text-white">текущее × 7</strong></div>
            <div>• Дисциплина (сторонняя): <strong class="text-white">текущее × 10</strong></div>
            <div>• Дисциплина (Каитифф): <strong class="text-white">текущее × 6</strong></div>
            <div>• Добродетель: <strong class="text-white">текущее × 2</strong></div>
            <div>• Человечность/Путь: <strong class="text-white">текущее × 2</strong></div>
            <div>• Сила воли: <strong class="text-white">текущее × 1</strong></div>
          </div>
        </details>

        <button class="btn btn-secondary w-full" onclick="app.switchPhase('freebies')">← Назад к Freebies</button>
      </div>
    `}renderSummary(){const e=this.tracker.validateAll(),t=Object.values(e).every(i=>i.valid);return`
      <div class="card">
        <h3 class="section-title">Итоги персонажа</h3>

        <div class="mb-6 p-4 ${t?"bg-green-900":"bg-yellow-900"} rounded">
          <div class="font-medium mb-2">${t?"✓ Базовая настройка завершена":"⚠ Базовая настройка не завершена"}</div>
          ${t?"":`
            <div class="text-sm space-y-1">
              ${Object.entries(e).map(([i,s])=>s.valid?"":s.errors.map(a=>`<div>• ${a}</div>`).join("")).join("")}
            </div>
          `}
        </div>

        <div class="space-y-4">
          <div>
            <strong>Имя:</strong> ${this.character.name||"—"}<br>
            <strong>Клан:</strong> ${this.getClanName()}<br>
            <strong>Поколение:</strong> ${this.character.getEffectiveGeneration()}<br>
            <strong>Концепция:</strong> ${this.character.concept||"—"}
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
    `}getClanName(){const e=$.find(t=>t.id===this.character.clan);return e?e.name:"—"}getClanDisciplines(){const e=$.find(t=>t.id===this.character.clan);return e?e.disciplines:[]}renderDots(e,t){let i="";for(let s=1;s<=t;s++)i+=`<div class="dot ${s<=e?"filled":""}" data-value="${s}"></div>`;return i}showMeritsModal(){const e=[];Object.entries(D).forEach(([i,s])=>{i!=="clanSpecific"&&s.forEach(a=>{e.push({...a,category:i,isClanSpecific:!1})})});const t=D.clanSpecific;t&&this.character.clan&&Object.entries(t).forEach(([i,s])=>{s.forEach(a=>{e.push({...a,clan:i,isClanSpecific:!0})})}),this.showMeritFlawModal(e,"merits")}showFlawsModal(){const e=[];Object.entries(ee).forEach(([t,i])=>{i.forEach(s=>{e.push({...s,category:t})})}),this.showMeritFlawModal(e,"flaws")}showMeritFlawModal(e,t){const i=document.createElement("div");i.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4",i.id="meritFlawModal";const s=[...new Set(e.map(n=>n.category))];i.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4 sticky top-0 bg-vtm-grey pb-2">
          <h3 class="text-2xl font-bold text-vtm-red">${t==="merits"?"Выбрать Достоинство":"Выбрать Недостаток"}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="document.getElementById('meritFlawModal').remove()">&times;</button>
        </div>

        <div class="mb-4">
          <input type="text" id="meritFlawSearch" placeholder="Поиск..." class="input-field">
        </div>

        <div class="space-y-4">
          ${s.map(n=>{const c=e.filter(r=>r.category===n);return`
              <details open class="category-section">
                <summary class="cursor-pointer font-semibold text-lg mb-2 text-vtm-red">${{physical:"Физические",mental:"Ментальные",social:"Социальные",supernatural:"Сверхъестественные"}[n]||n} (${c.length})</summary>
                <div class="space-y-2 pl-2">
                  ${c.map(r=>{const o=r.cost==="variable"||r.minCost&&r.maxCost,m=o?`${r.minCost}-${r.maxCost}`:r.cost,l=this.isMeritFlawDisabled(r),p=l?"opacity-50 cursor-not-allowed":"hover:bg-gray-700 cursor-pointer",g=l?'data-disabled="true"':"";return`
                      <div class="merit-flaw-item p-3 bg-gray-800 rounded ${p} transition-colors"
                           data-id="${r.id}"
                           data-name="${r.name}"
                           data-cost="${r.cost}"
                           data-min-cost="${r.minCost||r.cost}"
                           data-max-cost="${r.maxCost||r.cost}"
                           data-is-variable="${o}"
                           ${g}
                           onclick="app.selectMeritFlaw(this, '${t}')">
                        <div class="flex justify-between items-start mb-1">
                          <div class="font-medium">${r.name}</div>
                          <div class="text-${t==="merits"?"vtm-red":"green-400"} font-medium ml-2">${t==="merits"?"-":"+"}${m}</div>
                        </div>
                        ${r.description?`<div class="text-xs text-gray-400">${r.description}</div>`:""}
                        ${r.elderNote?`<div class="text-xs text-yellow-400 mt-1">⚠️ ${r.elderNote}</div>`:""}
                        ${l?`<div class="text-xs text-red-400 mt-1">❌ ${this.getMeritFlawDisabledReason(r)}</div>`:""}
                        ${r.isClanSpecific?`<div class="text-xs text-blue-400 mt-1">🔹 Связано с кланом ${this.getClanName(r.clan)}</div>`:""}
                      </div>
                    `}).join("")}
                </div>
              </details>
            `}).join("")}
        </div>
      </div>
    `,document.body.appendChild(i);const a=document.getElementById("meritFlawSearch");a.addEventListener("input",n=>{const c=n.target.value.toLowerCase();document.querySelectorAll(".merit-flaw-item").forEach(d=>{const r=d.dataset.name.toLowerCase();d.style.display=r.includes(c)?"block":"none"})}),a.focus()}selectMeritFlaw(e,t){var a,n;if(e.dataset.disabled==="true")return;const i={id:e.dataset.id,name:e.dataset.name,cost:e.dataset.cost==="variable"?parseInt(e.dataset.minCost):parseInt(e.dataset.cost),description:((a=e.querySelector(".text-gray-400"))==null?void 0:a.textContent)||"",elderNote:((n=e.querySelector(".text-yellow-400"))==null?void 0:n.textContent.replace("⚠️ ",""))||""};if(e.dataset.isVariable==="true"){const c=parseInt(e.dataset.minCost),d=parseInt(e.dataset.maxCost);this.showDotSelectionModal(i,c,d,t)}else t==="merits"?this.addMerit(i,i.cost):this.addFlaw(i,i.cost),document.getElementById("meritFlawModal").remove()}showDotSelectionModal(e,t,i,s){const a=document.getElementById("dotSelectionModal");a&&a.remove();const n=document.createElement("div");n.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]",n.id="dotSelectionModal",n.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-vtm-red mb-4">${e.name}</h3>
        <p class="text-sm text-gray-400 mb-4">Выберите стоимость (${t}-${i} очков):</p>

        <div class="flex gap-2 justify-center mb-6">
          ${Array.from({length:i-t+1},(c,d)=>t+d).map(c=>`
            <button class="dot-selector w-12 h-12 rounded-full border-2 border-gray-600 hover:border-vtm-red flex items-center justify-center font-bold transition-colors"
                    data-cost="${c}"
                    onclick="app.selectDotCost(${c})">
              ${c}
            </button>
          `).join("")}
        </div>

        <div class="flex gap-2">
          <button class="btn btn-secondary flex-1" onclick="document.getElementById('dotSelectionModal').remove()">Отмена</button>
        </div>
      </div>
    `,document.body.appendChild(n),n.dataset.itemData=JSON.stringify(e),n.dataset.type=s}selectDotCost(e){const t=document.getElementById("dotSelectionModal"),i=JSON.parse(t.dataset.itemData);t.dataset.type==="merits"?this.addMerit(i,e):this.addFlaw(i,e),t.remove(),document.getElementById("meritFlawModal").remove()}addMerit(e,t){if(this.character.merits.some(i=>i.id===e.id)){alert("У вас уже есть это достоинство");return}this.character.merits.push({...e,selectedCost:t}),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}removeMerit(e){this.character.merits=this.character.merits.filter(t=>t.id!==e),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}addFlaw(e,t){if(this.character.flaws.some(s=>s.id===e.id)){alert("У вас уже есть этот недостаток");return}const i=this.character.flaws.reduce((s,a)=>s+(a.selectedCost||a.cost),0);if(i+t>7){alert(`Максимум 7 очков от недостатков. У вас уже ${i} очков.`);return}this.character.flaws.push({...e,selectedCost:t}),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}removeFlaw(e){this.character.flaws=this.character.flaws.filter(t=>t.id!==e),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}isMeritFlawDisabled(e){return!!(e.excludedClans&&e.excludedClans.includes(this.character.clan)||e.minWillpower&&this.character.willpower<e.minWillpower||e.minCharisma&&this.character.attributes.social.charisma<e.minCharisma||e.incompatibleWith&&(this.character.merits.some(i=>e.incompatibleWith.includes(i.id))||this.character.flaws.some(i=>e.incompatibleWith.includes(i.id))))}getMeritFlawDisabledReason(e){return e.excludedClans&&e.excludedClans.includes(this.character.clan)?`Недоступно для ${this.getClanName()}`:e.minWillpower&&this.character.willpower<e.minWillpower?`Требуется Сила Воли ${e.minWillpower}+`:e.minCharisma&&this.character.attributes.social.charisma<e.minCharisma?`Требуется Харизма ${e.minCharisma}+`:e.incompatibleWith?"Несовместимо с другими выбранными опциями":"Недоступно"}getClanName(e=null){const t=e||this.character.clan,i=$.find(s=>s.id===t);return i?i.name:""}switchPhase(e){this.currentPhase=e,this.render(),this.attachEventListeners()}attachEventListeners(){document.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",m=>{const l=m.target.dataset.phase;l&&this.switchPhase(l)})}),["name","player","chronicle","nature","demeanor","concept","sire"].forEach(o=>{const m=document.getElementById(o);m&&m.addEventListener("input",l=>{this.character[o]=l.target.value,this.saveToLocalStorage()})});const e=document.getElementById("clan");e&&e.addEventListener("change",o=>{if(this.character.clan=o.target.value,this.character.clan){const m=$.find(l=>l.id===this.character.clan);m&&m.disciplines&&m.disciplines.forEach(l=>{l in this.character.disciplines||(this.character.disciplines[l]=0)})}this.saveToLocalStorage(),this.render(),this.attachEventListeners()}),document.querySelectorAll(".dot-tracker").forEach(o=>{const m=o.dataset.category,l=o.dataset.subcategory,p=o.dataset.attr;o.querySelectorAll(".dot").forEach(g=>{g.addEventListener("click",()=>{const f=parseInt(g.dataset.value);this.updateCharacterValue(m,l,p,f)})})});const t=document.getElementById("addDisciplineBtn");t&&t.addEventListener("click",()=>this.showAddDisciplineDialog());const i=document.getElementById("saveBtn");i&&i.addEventListener("click",()=>this.saveCharacter());const s=document.getElementById("loadBtn");s&&s.addEventListener("click",()=>this.loadCharacter());const a=document.getElementById("exportBtn");a&&a.addEventListener("click",()=>this.exportToPDF());const n=document.getElementById("freebieType");n&&n.addEventListener("change",o=>this.handleFreebieTypeChange(o.target.value));const c=document.getElementById("freebiePurchaseBtn");c&&c.addEventListener("click",()=>this.handleFreebiePurchase());const d=document.getElementById("xpType");d&&d.addEventListener("change",o=>this.handleXPTypeChange(o.target.value));const r=document.getElementById("xpPurchaseBtn");r&&r.addEventListener("click",()=>this.handleXPPurchase())}updateCharacterValue(e,t,i,s){e==="attributes"?this.character.attributes[t][i]=s:e==="abilities"?this.character.abilities[t][i]=s:e==="disciplines"?(this.character.disciplines[i]=s,i==="necromancy"&&this.character.necromancyPaths.length>0?this.character.necromancyPaths[0].level=s:i==="thaumaturgy"&&this.character.thaumaturgyPaths.length>0&&(this.character.thaumaturgyPaths[0].level=s)):e==="backgrounds"?this.character.backgrounds[i]=s:e==="virtues"?this.character.virtues[i]=s:e==="humanity"?this.character.humanity=s:e==="willpower"&&(this.character.willpower=s),this.saveToLocalStorage(),this.updateAllDisplays()}updateAllDisplays(){this.render(),this.attachEventListeners()}showAddDisciplineDialog(){const e=Object.keys(this.character.disciplines),t=this.allDisciplines.filter(c=>!e.includes(c.id)),i={physical:t.filter(c=>c.category==="physical"),mental:t.filter(c=>c.category==="mental"),unique:t.filter(c=>c.category==="unique")},s=this.getClanDisciplines(),a=document.createElement("div");a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50",a.innerHTML=`
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
          ${this.renderDisciplineCategory("Физические",i.physical,s)}
          ${this.renderDisciplineCategory("Ментальные",i.mental,s)}
          ${this.renderDisciplineCategory("Уникальные",i.unique,s)}
        </div>
      </div>
    `,document.body.appendChild(a);const n=document.getElementById("disciplineSearch");n.addEventListener("input",c=>{const d=c.target.value.toLowerCase();document.querySelectorAll(".discipline-item").forEach(o=>{const m=o.dataset.name.toLowerCase();o.style.display=m.includes(d)?"flex":"none"})}),n.focus()}renderDisciplineCategory(e,t,i){return t.length===0?"":`
      <div>
        <h4 class="text-lg font-semibold text-gray-300 mb-2">${e}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          ${t.map(s=>{const a=i.includes(s.id);return`
              <div class="discipline-item p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors flex justify-between items-center"
                   data-name="${s.name}"
                   onclick="app.selectDiscipline('${s.id}')">
                <div>
                  <div class="font-medium">${s.name}</div>
                  <div class="text-xs text-gray-400">${s.description||""}</div>
                </div>
                ${a?'<span class="text-xs text-green-400 font-semibold">Клановая</span>':""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}selectDiscipline(e){this.character.disciplines[e]=1,this.saveToLocalStorage();const t=document.querySelector(".fixed.inset-0");t&&t.remove(),this.updateAllDisplays()}removeDiscipline(e){delete this.character.disciplines[e],this.saveToLocalStorage(),this.updateAllDisplays()}managePaths(e){this.currentManagingDiscipline=e,this.showPathManagementModal(e)}showPathManagementModal(e){const t=e==="necromancy",i=t?this.character.necromancyPaths:this.character.thaumaturgyPaths,s=t?P.paths:E.paths,a=this.character.disciplines[e]||0,n=t?"Некромантия":"Тауматургия",c=document.createElement("div");c.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50",c.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-vtm-red">Пути ${n}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="app.closePathModal()">&times;</button>
        </div>

        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="text-sm text-gray-400">
            <strong>Основной путь:</strong> Уровень равен уровню дисциплины (${a})<br>
            <strong>Вторичные пути:</strong> Изучение нового пути - 7 XP, повышение - текущее × 4 XP
          </div>
        </div>

        ${i.length>0?`
          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">Изученные пути</h4>
            ${i.map((d,r)=>{const o=s.find(l=>l.id===d.pathId),m=r===0;return`
                <div class="mb-3 p-3 bg-gray-800 rounded">
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                      <div class="font-medium">${(o==null?void 0:o.name)||d.pathId}</div>
                      ${m?'<div class="text-xs text-green-400">Основной путь</div>':'<div class="text-xs text-blue-400">Вторичный путь</div>'}
                    </div>
                    ${m?"":`
                      <button class="text-red-500 hover:text-red-400 text-xl" onclick="app.removePath('${e}', '${d.pathId}')">×</button>
                    `}
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-400">Уровень:</span>
                    <div class="dot-tracker" data-discipline="${e}" data-path="${d.pathId}">
                      ${this.renderDotsForPath(d.level,m?a:5,m)}
                    </div>
                  </div>
                </div>
              `}).join("")}
          </div>
        `:'<div class="text-gray-400 text-center py-4 mb-4">Пути не изучены</div>'}

        <button class="btn btn-primary w-full" onclick="app.showAddPathDialog('${e}')">
          + Добавить ${i.length===0?"основной":"вторичный"} путь
        </button>
      </div>
    `,document.body.appendChild(c),setTimeout(()=>{this.attachPathDotListeners(e)},0)}renderDotsForPath(e,t,i){let s="";for(let a=1;a<=t;a++){const n=a<=e?"filled":"";s+=`<div class="dot ${n} ${i?"opacity-50 cursor-not-allowed":""}" data-value="${a}"></div>`}return s}attachPathDotListeners(e){document.querySelectorAll(`[data-discipline="${e}"]`).forEach(i=>{const s=i.dataset.path;i.querySelectorAll(".dot:not(.opacity-50)").forEach(n=>{n.addEventListener("click",()=>{const c=parseInt(n.dataset.value);this.updatePathLevel(e,s,c)})})})}updatePathLevel(e,t,i){e==="necromancy"?this.character.updateNecromancyPathLevel(t,i):this.character.updateThaumaturgyPathLevel(t,i),this.saveToLocalStorage(),this.closePathModal(),this.managePaths(e)}showAddPathDialog(e){const t=e==="necromancy",i=t?this.character.necromancyPaths:this.character.thaumaturgyPaths,s=t?P.paths:E.paths;this.character.disciplines[e];const a=t?"Некромантии":"Тауматургии",n=i.map(m=>m.pathId),c=s.filter(m=>!n.includes(m.id));if(c.length===0){alert("Все пути уже изучены!");return}const d=i.length===0,r=document.createElement("div");r.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50",r.id="pathSelectionModal",r.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-vtm-red">Выбрать путь ${a}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="document.getElementById('pathSelectionModal').remove()">&times;</button>
        </div>

        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="text-sm text-gray-400">
            ${d?"<strong>Основной путь:</strong> Уровень будет равен уровню дисциплины":"<strong>Вторичный путь:</strong> Начнётся с уровня 1"}
          </div>
        </div>

        <div class="mb-4">
          <input type="text" id="pathSearch" placeholder="Поиск по названию..."
                 class="input-field" autocomplete="off">
        </div>

        <div id="pathList" class="space-y-2">
          ${c.map(m=>`
            <div class="path-item p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors"
                 data-name="${m.name}"
                 onclick="app.selectPath('${e}', '${m.id}')">
              <div class="font-medium">${m.name}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `,document.body.appendChild(r);const o=document.getElementById("pathSearch");o.addEventListener("input",m=>{const l=m.target.value.toLowerCase();document.querySelectorAll(".path-item").forEach(g=>{const f=g.dataset.name.toLowerCase();g.style.display=f.includes(l)?"block":"none"})}),o.focus()}selectPath(e,t){const i=e==="necromancy",s=i?this.character.necromancyPaths:this.character.thaumaturgyPaths,a=this.character.disciplines[e]||0,c=s.length===0?a:1;i?this.character.addNecromancyPath(t,c):this.character.addThaumaturgyPath(t,c),this.saveToLocalStorage();const d=document.getElementById("pathSelectionModal");d&&d.remove(),this.closePathModal(),this.managePaths(e)}removePath(e,t){confirm("Удалить этот путь?")&&(e==="necromancy"?this.character.removeNecromancyPath(t):this.character.removeThaumaturgyPath(t),this.saveToLocalStorage(),this.closePathModal(),this.managePaths(e))}closePathModal(){const e=document.querySelector(".fixed.inset-0");e&&e.remove(),this.updateAllDisplays()}handleFreebieTypeChange(e){const t=document.getElementById("freebiePurchaseOptions"),i=document.getElementById("freebieCostDisplay"),s=document.getElementById("freebiePurchaseBtn");if(!e){t.innerHTML="",i.classList.add("hidden"),s.classList.add("hidden");return}let a="";if(e==="attribute"?a=`
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
      `:e==="ability"?a=`
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
      `:e==="discipline"?a=`
        <div>
          <label class="block text-sm font-medium mb-1">Дисциплина</label>
          <select id="freebieDiscipline" class="input-field">
            <option value="">Выберите дисциплину</option>
            ${this.allDisciplines.map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}
          </select>
        </div>
      `:e==="background"?a=`
        <div>
          <label class="block text-sm font-medium mb-1">Предыстория</label>
          <select id="freebieBackground" class="input-field">
            <option value="">Выберите предысторию</option>
            ${L.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")}
          </select>
        </div>
      `:e==="virtue"?a=`
        <div>
          <label class="block text-sm font-medium mb-1">Добродетель</label>
          <select id="freebieVirtue" class="input-field">
            <option value="">Выберите добродетель</option>
            <option value="conscience">Совесть</option>
            <option value="selfControl">Самоконтроль</option>
            <option value="courage">Храбрость</option>
          </select>
        </div>
      `:(e==="humanity"||e==="willpower")&&(a=`<div class="text-sm text-gray-400">Выбрано: ${e==="humanity"?"Человечность":"Сила воли"}</div>`),t.innerHTML=a,e==="attribute"){const n=document.getElementById("freebieAttrCategory");n&&n.addEventListener("change",c=>this.showFreebieAttributeList(c.target.value))}else if(e==="ability"){const n=document.getElementById("freebieAbilityCategory");n&&n.addEventListener("change",c=>this.showFreebieAbilityList(c.target.value))}else if(e==="discipline"){const n=document.getElementById("freebieDiscipline");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}else if(e==="background"){const n=document.getElementById("freebieBackground");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}else if(e==="virtue"){const n=document.getElementById("freebieVirtue");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}else(e==="humanity"||e==="willpower")&&this.calculateFreebieCost()}showFreebieAttributeList(e){const t=document.getElementById("freebieAttrSelection");if(!e){t.innerHTML="";return}const i=this.character.attributes[e],s={physical:{strength:"Сила",dexterity:"Ловкость",stamina:"Выносливость"},social:{charisma:"Обаяние",manipulation:"Манипулирование",appearance:"Привлекательность"},mental:{perception:"Восприятие",intelligence:"Интеллект",wits:"Смекалка"}},a=Object.keys(i).map(c=>`<option value="${c}">${s[e][c]} (${i[c]})</option>`).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Атрибут</label>
        <select id="freebieAttribute" class="input-field">
          <option value="">Выберите атрибут</option>
          ${a}
        </select>
      </div>
    `;const n=document.getElementById("freebieAttribute");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}showFreebieAbilityList(e){const t=document.getElementById("freebieAbilitySelection");if(!e){t.innerHTML="";return}const s=w[e].map(n=>{const c=this.character.abilities[e][n.id]||0;return`<option value="${n.id}">${n.name} (${c})</option>`}).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Способность</label>
        <select id="freebieAbility" class="input-field">
          <option value="">Выберите способность</option>
          ${s}
        </select>
      </div>
    `;const a=document.getElementById("freebieAbility");a&&a.addEventListener("change",()=>this.calculateFreebieCost())}calculateFreebieCost(){var r,o,m,l,p,g,f,v;const e=(r=document.getElementById("freebieType"))==null?void 0:r.value;if(!e)return;let t=0,i="",s=!1;if(e==="attribute"){const h=(o=document.getElementById("freebieAttrCategory"))==null?void 0:o.value,u=(m=document.getElementById("freebieAttribute"))==null?void 0:m.value;if(h&&u){const y=this.character.attributes[h][u];t=x.attribute,i=`Текущее значение: ${y}, новое: ${y+1}`,s=y<10}}else if(e==="ability"){const h=(l=document.getElementById("freebieAbilityCategory"))==null?void 0:l.value,u=(p=document.getElementById("freebieAbility"))==null?void 0:p.value;if(h&&u){const y=this.character.abilities[h][u]||0;t=x.ability,i=`Текущее значение: ${y}, новое: ${y+1}`,s=y<10}}else if(e==="discipline"){const h=(g=document.getElementById("freebieDiscipline"))==null?void 0:g.value;if(h){const u=this.character.disciplines[h]||0;t=x.discipline,i=`Текущее значение: ${u}, новое: ${u+1}`,s=u<10}}else if(e==="background"){const h=(f=document.getElementById("freebieBackground"))==null?void 0:f.value;if(h){const u=this.character.backgrounds[h]||0;t=x.background,i=`Текущее значение: ${u}, новое: ${u+1}`,s=u<5}}else if(e==="virtue"){const h=(v=document.getElementById("freebieVirtue"))==null?void 0:v.value;if(h){const u=this.character.virtues[h];t=x.virtue,i=`Текущее значение: ${u}, новое: ${u+1}`,s=u<10}}else if(e==="humanity"){const h=this.character.humanity;t=x.humanity,i=`Текущее значение: ${h}, новое: ${h+1}`,s=h<10}else if(e==="willpower"){const h=this.character.willpower;t=x.willpower,i=`Текущее значение: ${h}, новое: ${h+1}`,s=h<10}const a=document.getElementById("freebieCostDisplay"),n=document.getElementById("freebieCostAmount"),c=document.getElementById("freebieCostDetails"),d=document.getElementById("freebiePurchaseBtn");if(t>0&&s){n.textContent=t,c.textContent=i,a.classList.remove("hidden"),d.classList.remove("hidden");const h=this.character.freebies-this.character.freebiesSpent;t>h?(d.disabled=!0,d.textContent=`Недостаточно бонусных очков (нужно ${t}, есть ${h})`):(d.disabled=!1,d.textContent="Купить")}else a.classList.add("hidden"),d.classList.add("hidden")}handleFreebiePurchase(){var s,a,n,c,d,r,o,m,l;const e=(s=document.getElementById("freebieType"))==null?void 0:s.value;if(!e)return;const t=parseInt(((a=document.getElementById("freebieCostAmount"))==null?void 0:a.textContent)||"0"),i=this.character.freebies-this.character.freebiesSpent;if(t>i){alert("Недостаточно бонусных очков!");return}if(e==="attribute"){const p=(n=document.getElementById("freebieAttrCategory"))==null?void 0:n.value,g=(c=document.getElementById("freebieAttribute"))==null?void 0:c.value;p&&g&&(this.character.attributes[p][g]++,this.character.freebiesSpent+=t)}else if(e==="ability"){const p=(d=document.getElementById("freebieAbilityCategory"))==null?void 0:d.value,g=(r=document.getElementById("freebieAbility"))==null?void 0:r.value;p&&g&&(this.character.abilities[p][g]||(this.character.abilities[p][g]=0),this.character.abilities[p][g]++,this.character.freebiesSpent+=t)}else if(e==="discipline"){const p=(o=document.getElementById("freebieDiscipline"))==null?void 0:o.value;p&&(this.character.disciplines[p]||(this.character.disciplines[p]=0),this.character.disciplines[p]++,this.character.freebiesSpent+=t)}else if(e==="background"){const p=(m=document.getElementById("freebieBackground"))==null?void 0:m.value;p&&(this.character.backgrounds[p]||(this.character.backgrounds[p]=0),this.character.backgrounds[p]++,this.character.freebiesSpent+=t)}else if(e==="virtue"){const p=(l=document.getElementById("freebieVirtue"))==null?void 0:l.value;p&&(this.character.virtues[p]++,this.character.freebiesSpent+=t)}else e==="humanity"?(this.character.humanity++,this.character.freebiesSpent+=t):e==="willpower"&&(this.character.willpower++,this.character.freebiesSpent+=t);this.saveToLocalStorage(),this.render(),this.attachEventListeners(),this.updateAllDisplays(),alert(`Куплено за ${t} бонусных очков!`)}handleXPTypeChange(e){const t=document.getElementById("xpPurchaseOptions"),i=document.getElementById("xpCostDisplay"),s=document.getElementById("xpPurchaseBtn");if(!e){t.innerHTML="",i.classList.add("hidden"),s.classList.add("hidden");return}let a="";if(e==="attribute"?a=`
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
      `:e==="ability"?a=`
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
      `:e==="discipline"?a=`
        <div>
          <label class="block text-sm font-medium mb-1">Дисциплина</label>
          <select id="xpDiscipline" class="input-field">
            <option value="">Выберите дисциплину</option>
            ${this.allDisciplines.map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}
          </select>
        </div>
      `:e==="virtue"?a=`
        <div>
          <label class="block text-sm font-medium mb-1">Добродетель</label>
          <select id="xpVirtue" class="input-field">
            <option value="">Выберите добродетель</option>
            <option value="conscience">Совесть</option>
            <option value="selfControl">Самоконтроль</option>
            <option value="courage">Храбрость</option>
          </select>
        </div>
      `:(e==="humanity"||e==="willpower")&&(a=`<div class="text-sm text-gray-400">Выбрано: ${e==="humanity"?"Человечность":"Сила воли"}</div>`),t.innerHTML=a,e==="attribute"){const n=document.getElementById("xpAttrCategory");n&&n.addEventListener("change",c=>this.showXPAttributeList(c.target.value))}else if(e==="ability"){const n=document.getElementById("xpAbilityCategory");n&&n.addEventListener("change",c=>this.showXPAbilityList(c.target.value))}else if(e==="discipline"){const n=document.getElementById("xpDiscipline");n&&n.addEventListener("change",()=>this.calculateXPCost())}else if(e==="virtue"){const n=document.getElementById("xpVirtue");n&&n.addEventListener("change",()=>this.calculateXPCost())}else(e==="humanity"||e==="willpower")&&this.calculateXPCost()}showXPAttributeList(e){const t=document.getElementById("xpAttrSelection");if(!e){t.innerHTML="";return}const i=this.character.attributes[e],s={physical:{strength:"Сила",dexterity:"Ловкость",stamina:"Выносливость"},social:{charisma:"Обаяние",manipulation:"Манипулирование",appearance:"Привлекательность"},mental:{perception:"Восприятие",intelligence:"Интеллект",wits:"Смекалка"}},a=Object.keys(i).map(c=>`<option value="${c}">${s[e][c]} (${i[c]})</option>`).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Атрибут</label>
        <select id="xpAttribute" class="input-field">
          <option value="">Выберите атрибут</option>
          ${a}
        </select>
      </div>
    `;const n=document.getElementById("xpAttribute");n&&n.addEventListener("change",()=>this.calculateXPCost())}showXPAbilityList(e){const t=document.getElementById("xpAbilitySelection");if(!e){t.innerHTML="";return}const s=w[e].map(n=>{const c=this.character.abilities[e][n.id]||0;return`<option value="${n.id}">${n.name} (${c})</option>`}).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Способность</label>
        <select id="xpAbility" class="input-field">
          <option value="">Выберите способность</option>
          ${s}
        </select>
      </div>
    `;const a=document.getElementById("xpAbility");a&&a.addEventListener("change",()=>this.calculateXPCost())}calculateXPCost(){var r,o,m,l,p,g,f;const e=(r=document.getElementById("xpType"))==null?void 0:r.value;if(!e)return;let t=0,i="",s=!1;if(e==="attribute"){const v=(o=document.getElementById("xpAttrCategory"))==null?void 0:o.value,h=(m=document.getElementById("xpAttribute"))==null?void 0:m.value;if(v&&h){const u=this.character.attributes[v][h];t=u*4,i=`Текущее значение: ${u}, новое: ${u+1}`,s=u<10}}else if(e==="ability"){const v=(l=document.getElementById("xpAbilityCategory"))==null?void 0:l.value,h=(p=document.getElementById("xpAbility"))==null?void 0:p.value;if(v&&h){const u=this.character.abilities[v][h]||0;t=u===0?3:u*2,i=u===0?"Новая способность":`Текущее значение: ${u}, новое: ${u+1}`,s=u<10}}else if(e==="discipline"){const v=(g=document.getElementById("xpDiscipline"))==null?void 0:g.value;if(v){const h=this.character.disciplines[v]||0,u=this.allDisciplines.find(k=>k.id===v),y=$.find(k=>k.id===this.character.clan),I=y&&y.disciplines.includes(v),T=this.character.clan==="caitiff";h===0?(t=10,i="Новая дисциплина"):T?(t=h*6,i=`Каитифф: текущее × 6 = ${h} × 6`):I?u.category==="physical"?(t=h*5,i=`Физическая (клановая): текущее × 5 = ${h} × 5`):u.category==="mental"?(t=h*6,i=`Ментальная (клановая): текущее × 6 = ${h} × 6`):(t=h*7,i=`Уникальная (клановая): текущее × 7 = ${h} × 7`):(t=h*10,i=`Сторонняя дисциплина: текущее × 10 = ${h} × 10`),s=h<10}}else if(e==="virtue"){const v=(f=document.getElementById("xpVirtue"))==null?void 0:f.value;if(v){const h=this.character.virtues[v];t=h*2,i=`Текущее значение: ${h}, новое: ${h+1}`,s=h<10}}else if(e==="humanity"){const v=this.character.humanity;t=v*2,i=`Текущее значение: ${v}, новое: ${v+1}`,s=v<10}else if(e==="willpower"){const v=this.character.willpower;t=v,i=`Текущее значение: ${v}, новое: ${v+1}`,s=v<10}const a=document.getElementById("xpCostDisplay"),n=document.getElementById("xpCostAmount"),c=document.getElementById("xpCostDetails"),d=document.getElementById("xpPurchaseBtn");if(t>0&&s){n.textContent=t,c.textContent=i,a.classList.remove("hidden"),d.classList.remove("hidden");const v=this.character.experience-this.character.experienceSpent;t>v?(d.disabled=!0,d.textContent=`Недостаточно XP (нужно ${t}, есть ${v})`):(d.disabled=!1,d.textContent="Купить")}else a.classList.add("hidden"),d.classList.add("hidden")}handleXPPurchase(){var s,a,n,c,d,r,o,m;const e=(s=document.getElementById("xpType"))==null?void 0:s.value;if(!e)return;const t=parseInt(((a=document.getElementById("xpCostAmount"))==null?void 0:a.textContent)||"0"),i=this.character.experience-this.character.experienceSpent;if(t>i){alert("Недостаточно опыта!");return}if(e==="attribute"){const l=(n=document.getElementById("xpAttrCategory"))==null?void 0:n.value,p=(c=document.getElementById("xpAttribute"))==null?void 0:c.value;l&&p&&(this.character.attributes[l][p]++,this.character.experienceSpent+=t)}else if(e==="ability"){const l=(d=document.getElementById("xpAbilityCategory"))==null?void 0:d.value,p=(r=document.getElementById("xpAbility"))==null?void 0:r.value;l&&p&&(this.character.abilities[l][p]||(this.character.abilities[l][p]=0),this.character.abilities[l][p]++,this.character.experienceSpent+=t)}else if(e==="discipline"){const l=(o=document.getElementById("xpDiscipline"))==null?void 0:o.value;l&&(this.character.disciplines[l]||(this.character.disciplines[l]=0),this.character.disciplines[l]++,this.character.experienceSpent+=t)}else if(e==="virtue"){const l=(m=document.getElementById("xpVirtue"))==null?void 0:m.value;l&&(this.character.virtues[l]++,this.character.experienceSpent+=t)}else e==="humanity"?(this.character.humanity++,this.character.experienceSpent+=t):e==="willpower"&&(this.character.willpower++,this.character.experienceSpent+=t);this.saveToLocalStorage(),this.render(),this.attachEventListeners(),this.updateAllDisplays(),alert(`Куплено за ${t} XP!`)}saveToLocalStorage(){localStorage.setItem("vtm_character",this.character.toJSON())}loadFromLocalStorage(){const e=localStorage.getItem("vtm_character");e&&(this.character=_.fromJSON(e),this.tracker=new C(this.character))}saveCharacter(){const e=this.character.toJSON(),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=`${this.character.name||"персонаж"}.json`,s.click()}loadCharacter(){const e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=t=>{const i=t.target.files[0],s=new FileReader;s.onload=a=>{this.character=_.fromJSON(a.target.result),this.tracker=new C(this.character),this.render(),this.attachEventListeners()},s.readAsText(i)},e.click()}exportToPDF(){alert("Экспорт в PDF будет реализован позже. Пока используйте функцию печати браузера.")}}let A;document.addEventListener("DOMContentLoaded",()=>{A=new te,window.app=A});
