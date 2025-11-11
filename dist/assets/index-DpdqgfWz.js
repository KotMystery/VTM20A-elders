(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();class C{constructor(){this.name="",this.player="",this.chronicle="",this.nature="",this.demeanor="",this.concept="",this.clan="",this.sire="",this.generation=9,this.dilutedVitae=0,this.attributes={physical:{strength:1,dexterity:1,stamina:1},social:{charisma:1,manipulation:1,appearance:1},mental:{perception:1,intelligence:1,wits:1}},this.abilities={talents:{},skills:{},knowledges:{}},this.disciplines={},this.necromancyPaths=[],this.necromancyRituals=[],this.thaumaturgyPaths=[],this.thaumaturgyRituals=[],this.backgrounds={},this.virtues={conscience:1,selfControl:1,courage:1},this.humanity=7,this.path="",this.bearing="",this.willpower=1,this.willpowerCurrent=1,this.merits=[],this.flaws=[],this.coterieFlaw=null,this.health={bruised:!1,hurt:!1,injured:!1,wounded:!1,mauled:!1,crippled:!1,incapacitated:!1},this.bloodPool=0,this.bloodPoolMax=0,this.bloodPerTurn=0,this.experience=33,this.experienceSpent=0,this.freebies=22,this.freebiesSpent=0,this.pointsAllocated={attributes:{primary:0,secondary:0,tertiary:0},abilities:{primary:0,secondary:0,tertiary:0},disciplines:0,backgrounds:0,virtues:0},this.priorities={attributes:null,abilities:null}}getEffectiveGeneration(){const e=this.backgrounds.generation||0;return this.generation-e+this.dilutedVitae}getBloodPoolStats(){const e=this.getEffectiveGeneration();return{4:{max:50,perTurn:10},5:{max:40,perTurn:8},6:{max:30,perTurn:6},7:{max:20,perTurn:4},8:{max:15,perTurn:3},9:{max:14,perTurn:2},10:{max:13,perTurn:1},11:{max:12,perTurn:1},12:{max:11,perTurn:1},13:{max:10,perTurn:1},14:{max:10,perTurn:1}}[e]||{max:10,perTurn:1}}getClanDisciplines(){return[]}isClanDiscipline(e){return this.getClanDisciplines().includes(e)}getAttributeCategoryTotal(e){const t=this.attributes[e];return Object.values(t).reduce((i,a)=>i+a,0)-3}getAbilityCategoryTotal(e){const t=this.abilities[e];return Object.values(t).reduce((i,a)=>i+a,0)}calculateFreebies(){let e=15;e+=7;const t=this.flaws.reduce((a,s)=>a+s.cost,0);e+=Math.min(t,7);const i=this.merits.reduce((a,s)=>a+s.cost,0);return e-=i,e}getNecromancyPrimaryPath(){return this.necromancyPaths[0]||null}addNecromancyPath(e,t=1){this.necromancyPaths.find(a=>a.pathId===e)||this.necromancyPaths.push({pathId:e,level:t})}removeNecromancyPath(e){this.necromancyPaths=this.necromancyPaths.filter(t=>t.pathId!==e)}updateNecromancyPathLevel(e,t){const i=this.necromancyPaths.find(a=>a.pathId===e);i&&(i.level=t)}addNecromancyRitual(e){this.necromancyRituals.includes(e)||this.necromancyRituals.push(e)}removeNecromancyRitual(e){this.necromancyRituals=this.necromancyRituals.filter(t=>t!==e)}getThaumaturgyPrimaryPath(){return this.thaumaturgyPaths[0]||null}addThaumaturgyPath(e,t=1){this.thaumaturgyPaths.find(a=>a.pathId===e)||this.thaumaturgyPaths.push({pathId:e,level:t})}removeThaumaturgyPath(e){this.thaumaturgyPaths=this.thaumaturgyPaths.filter(t=>t.pathId!==e)}updateThaumaturgyPathLevel(e,t){const i=this.thaumaturgyPaths.find(a=>a.pathId===e);i&&(i.level=t)}addThaumaturgyRitual(e){this.thaumaturgyRituals.includes(e)||this.thaumaturgyRituals.push(e)}removeThaumaturgyRitual(e){this.thaumaturgyRituals=this.thaumaturgyRituals.filter(t=>t!==e)}toJSON(){return JSON.stringify(this,null,2)}static fromJSON(e){const t=new C;return Object.assign(t,JSON.parse(e)),t}}const y={attributes:{maxBeforeFreebies:6},abilities:{maxBeforeFreebies:5},disciplines:{total:7},backgrounds:{total:3,allowed:["generation","herd","resources","retainers"]},virtues:{total:5}},f={attribute:5,ability:2,background:1,discipline:7,virtue:2,humanity:1,willpower:1},$={newAbility:3,newDiscipline:10,newPath:7,attribute:p=>p*4,ability:p=>p*2,discipline:{physical:{clan:p=>p*5,nonClan:p=>p*6,caitiff:p=>p*5},mental:{clan:p=>p*5,nonClan:p=>p*7,caitiff:p=>p*6},unique:{clan:p=>p*5,nonClan:p=>p*8,caitiff:p=>p*7}},secondaryPath:p=>p*4,virtue:p=>p*2,humanity:p=>p*2,willpower:p=>p*1};class E{constructor(e){this.character=e}validateAttributes(){const e=[],t=["physical","social","mental"],i={};t.forEach(n=>{const c=this.character.attributes[n],r=Object.values(c).reduce((o,m)=>o+m,0)-3;i[n]=r,Object.entries(c).forEach(([o,m])=>{m>y.attributes.maxBeforeFreebies&&e.push(`${n}.${o}: максимум ${y.attributes.maxBeforeFreebies} без Freebies`)})});const a=Object.values(i).sort((n,c)=>c-n),s=[9,7,5];return JSON.stringify(a)!==JSON.stringify(s)&&e.push(`Распределение атрибутов должно быть 9/7/5 (текущее: ${a.join("/")})`),{valid:e.length===0,errors:e,totals:i}}validateAbilities(){const e=[],t=["talents","skills","knowledges"],i={};t.forEach(n=>{const c=this.character.abilities[n],r=Object.values(c).reduce((o,m)=>o+m,0);i[n]=r,Object.entries(c).forEach(([o,m])=>{m>y.abilities.maxBeforeFreebies&&e.push(`${n}.${o}: максимум ${y.abilities.maxBeforeFreebies} без Freebies`)})});const a=Object.values(i).sort((n,c)=>c-n),s=[18,12,8];return JSON.stringify(a)!==JSON.stringify(s)&&e.push(`Распределение способностей должно быть 18/12/8 (текущее: ${a.join("/")})`),{valid:e.length===0,errors:e,totals:i}}validateDisciplines(){const e=[],t=Object.values(this.character.disciplines).reduce((i,a)=>i+a,0);return t>y.disciplines.total&&e.push(`Дисциплины: использовано ${t}/${y.disciplines.total}`),{valid:e.length===0,errors:e,total:t}}validateBackgrounds(){const e=[],t=this.character.backgrounds,i=Object.values(t).reduce((a,s)=>a+s,0);return Object.keys(t).forEach(a=>{y.backgrounds.allowed.includes(a)||e.push(`${a}: недопустимая предыстория для Древних`)}),i>y.backgrounds.total&&e.push(`Предыстории: использовано ${i}/${y.backgrounds.total}`),{valid:e.length===0,errors:e,total:i}}validateVirtues(){const e=[],t=this.character.virtues,i=Object.values(t).reduce((a,s)=>a+s,0)-3;return i>y.virtues.total&&e.push(`Добродетели: использовано ${i}/${y.virtues.total}`),{valid:e.length===0,errors:e,total:i}}calculateFreebieSpending(){return{attributes:0,abilities:0,backgrounds:0,disciplines:0,virtues:0,humanity:0,willpower:0,total:0}}validateAll(){return{attributes:this.validateAttributes(),abilities:this.validateAbilities(),disciplines:this.validateDisciplines(),backgrounds:this.validateBackgrounds(),virtues:this.validateVirtues()}}isComplete(){const e=this.validateAll();return Object.values(e).every(t=>t.valid)}}const _=[{id:"brujah",name:"Бруха",disciplines:["celerity","potence","presence"],weakness:"Те же душевные порывы, что толкают Бруха на путь величия или порока, могут разжечь в них пламя неистовой ярости. Сложность проверок, связанных с попытками сдерживать или контролировать приступы ярости, возрастает на два пункта (вплоть до максимума 10). Кроме того, Бруха не могут тратить пункты воли, чтобы предотвратить приступ ярости, но если приступ уже начался, персонаж, как обычно, может потратить пункт воли, чтобы взять себя в руки на один ход."},{id:"gangrel",name:"Гангрел",disciplines:["animalism","fortitude","protean"],weakness:"Каждый раз, когда персонажа‑гангрела охватывает приступ ярости, он временно получает какой‑нибудь звериный признак (который может заменить уже существующий временный звериный признак, оставшийся после прошлого приступа): пробивающаяся по всему телу шерсть, краткая послеобеденная спячка, стремление избегать больших скоплений народа и прочие подобные атавизмы. Обратите внимание, что этот атавизм может быть не только физическим, но и чисто поведенческим. Игроки вместе с рассказчиком должны определить, что это будет за атавизм. Со временем или в исключительных обстоятельствах некоторые временные атавизмы могут становиться постоянными, и тогда следующий временный атавизм не заменит уже существующий, а дополнит его."},{id:"malkavian",name:"Малкавиан",disciplines:["auspex","dementation","obfuscate"],weakness:"Все члены клана Малкавиан страдают от перманентного психического расстройства. Это расстройство действует как любое другое — оно не мешает приобретать новые психические расстройства и его, как и обычное расстройство, можно временно нейтрализовать при помощи воли, но, в отличие от новообретённых расстройств, перманентное психическое расстройство нельзя исцелить."},{id:"nosferatu",name:"Носферату",disciplines:["animalism","obfuscate","potence"],weakness:"Показатель привлекательности всех Носферату равен нулю, и они никак не могут это изменить. Зачеркните эту характеристику в своём бланке персонажа. Проверки, в которых задействована привлекательность, даются этим Сородичам с большим трудом."},{id:"toreador",name:"Тореадор",disciplines:["auspex","celerity","presence"],weakness:"Когда персонаж‑тореадор переживает некое действительно прекрасное ощущение — например, видит очень красивого человека, потрясающую картину или восхитительный рассвет, — он должен пройти проверку самоконтроля или инстинктов (сложность 6). Неудача означает, что персонаж замирает, охваченный восторгом. В этом состоянии персонаж пребывает до конца сцены, и единственное, что он способен делать, — это восхищаться и комментировать свои ощущения. Если источник переживания перестаёт воздействовать на персонажа, восторг стихает, и персонаж может действовать как обычно."},{id:"tremere",name:"Тремер",disciplines:["auspex","dominate","thaumaturgy"],weakness:"Зависимость вампиров клана Тремер от крови выражена ярче, чем у других Сородичей. Для того чтобы стать вассалом уз крови третьей ступени, тремеру достаточно дважды испить витэ Сородича (а не трижды, как обычно). Испив витэ Сородича единожды, тремер сразу становится вассалом уз крови второй ступени. Старейшины клана прекрасно знают об этом и активно пользуются своим знанием — вскоре после Становления любой неонат обязательно проходит торжественный обряд посвящения, в ходе которого причащается кровью семи старейшин клана."},{id:"ventrue",name:"Вентру",disciplines:["dominate","fortitude","presence"],weakness:"Всем вентру присущ утончённый вкус — в пищу им годится кровь только одной определённой категории смертных. Когда игрок создаёт персонажа‑вентру, он должен вместе с рассказчиком определить эту категорию. Обратите внимание, что выбор этот окончательный, и после начала игры его уже нельзя будет изменить. Кровь смертных, не относящихся к выбранной категории (в том числе кровь животных), не пополняет запас пунктов крови персонажа вне зависимости от того, сколько он её выпьет. Категория жертв, кровь которых годится для персонажа‑вентру, может быть как довольно узкой, так и относительно широкой. Кровь Сородичей не подпадает под эти ограничения."},{id:"lasombra",name:"Лазомбра",disciplines:["dominate","obtenebration","potence"],weakness:"Вампиры из клана Ласомбра не отражаются в полированных поверхностях, спокойной воде, зеркалах заднего вида и т. д."},{id:"tzimisce",name:"Цимисхи",disciplines:["animalism","auspex","vicissitude"],weakness:"Tzimisce неразрывно связаны с местом своего происхождения. Для полноценного дневного отдыха Сородичам этого клана необходимо касаться хотя бы двух пригоршней родной земли — почвы, набранной в месте, тесно связанном с их прошлой, смертной жизнью. Это может быть земля родного города или, скажем, кладбища, где вампиру было даровано Становление. Каждый день, когда цимисх отдыхает, не касаясь родной земли, пул проверок всех его параметров уменьшается вдвое. Этот штраф накапливается каждую ночь, пока пул не уменьшится до одного d10. Накопленный штраф сохраняется до тех пор, пока вампир не отдохнёт как минимум сутки, касаясь хотя бы двух пригоршней родной земли."},{id:"assamite",name:"Ассамиты",disciplines:["celerity","obfuscate","quietus"],weakness:"Из‑за проклятия Тремер любой ассамит, выпивший кровь другого Сородича, получает одно неотвратимое тяжёлое повреждение за каждый выпитый пункт крови. Совершив диаблери, персонаж получает по одному неотвратимому губительному повреждению за каждый пункт значения воли жертвы; даже если диаблерист сумеет это пережить, он не получит от совершения диаблери никаких преимуществ, а его поколение не изменится. Кроме того, все ассамиты обязаны отдавать часть прибыли от выполненных контрактов своим сирам и старейшинам (как правило, около 10 %)."},{id:"followers_of_set",name:"Последователи Сета",disciplines:["obfuscate","presence","serpentis"],weakness:"Из‑за своей приверженности тьме Последователи Сета особенно уязвимы к яркому свету. Солнечный свет наносит им на два повреждения больше обычного, а если персонаж‑сетит предпринимает любое действие, требующее проверки, находясь под воздействием любого источника яркого света (полицейского прожектора, театральных софитов, сигнальной ракеты и т. п.), пул этой проверки уменьшается на один d10."},{id:"giovanni",name:"Джованни",disciplines:["dominate","necromancy","potence"],weakness:"Поцелуи вампиров из клана Джованни причиняют смертным мучительную боль. Если Джованни не будет осторожен, сосуд, из которого он пьёт, может погибнуть от болевого шока ещё до того, как будет обескровлен. Когда Джованни пьёт кровь смертного, он причиняет ему вдвое больше повреждений, чем любой другой вампир (т. е. два, а не одно, как обычно). Именно поэтому Джованни предпочитают прибегать к услугам донорских пунктов и другим источникам крови — тем, что не кричат и не отбиваются."},{id:"ravnos",name:"Равнос",disciplines:["animalism","chimerstry","fortitude"],weakness:"Каждый вампир из клана Равнос является рабом того или иного порока. Кто‑то, например, не может не лгать, кому‑то чуждо сострадание, а кто‑то попросту неспособен устоять перед возможностью стащить что‑нибудь, что плохо лежит. Когда персонажу предоставляется возможность поддаться выбранному пороку, он должен сделать это, если не пройдёт проверку самоконтроля или инстинктов (сложность 6)."},{id:"caitiff",name:"Каитифф",disciplines:[],weakness:"Изгои вампирского сообщества, не принадлежащие ни к одному из кланов и не демонстрирующие сильных и слабых черт, характерных для всех вампиров более сильной и чистой Крови."}],T=[{id:"potence",name:"Мощь",category:"physical"},{id:"fortitude",name:"Стойкость",category:"physical"},{id:"celerity",name:"Стремительность",category:"physical"}],F=[{id:"animalism",name:"Анимализм",category:"mental"},{id:"presence",name:"Величие",category:"mental"},{id:"dominate",name:"Доминирование",category:"mental"},{id:"auspex",name:"Ясновидение",category:"mental"},{id:"obfuscate",name:"Сокрытие",category:"mental"}],O=[{id:"obtenebration",name:"Затмение",category:"unique"},{id:"protean",name:"Метаморфозы",category:"unique"},{id:"necromancy",name:"Некромантия",category:"unique",hasPaths:!0,paths:["path_sepulchre","path_cenotaph","path_bone","path_corpse","path_ash","path_decay","path_four_humours","path_entropy"]},{id:"dementation",name:"Помешательство",category:"unique"},{id:"vicissitude",name:"Преображение",category:"unique"},{id:"serpentis",name:"Серпентис",category:"unique"},{id:"thaumaturgy",name:"Тауматургия",category:"unique",hasPaths:!0,paths:["path_blood","path_elemental_mastery","path_hand_destruction","path_lure_flames","path_beckoning","path_neptune","path_incarnation","path_mars","path_fathers_vengeance","path_corruption","path_technomancy","path_flora","thaumaturgic_countermagic","weather_control"]},{id:"quietus",name:"Упокоение",category:"unique"},{id:"chimerstry",name:"Фантасмагория",category:"unique"}],N={physical:T,mental:F,unique:O},q=[{id:"alertness",name:"Бдительность"},{id:"athletics",name:"Атлетика"},{id:"awareness",name:"Шестое чувство"},{id:"brawl",name:"Драка"},{id:"empathy",name:"Эмпатия"},{id:"expression",name:"Красноречие"},{id:"intimidation",name:"Запугивание"},{id:"leadership",name:"Лидерство"},{id:"streetwise",name:"Уличное чутье"},{id:"subterfuge",name:"Хитрость"}],V=[{id:"animal_ken",name:"Обращение с животными"},{id:"crafts",name:"Ремесло"},{id:"drive",name:"Вождение"},{id:"etiquette",name:"Этикет"},{id:"firearms",name:"Стрельба"},{id:"larceny",name:"Воровство"},{id:"melee",name:"Фехтование"},{id:"performance",name:"Исполнение"},{id:"stealth",name:"Скрытность"},{id:"survival",name:"Выживание"}],X=[{id:"academics",name:"Гуманитарные науки"},{id:"computer",name:"Информатика"},{id:"finance",name:"Финансы"},{id:"investigation",name:"Расследование"},{id:"law",name:"Юриспруденция"},{id:"medicine",name:"Медицина"},{id:"occult",name:"Оккультизм"},{id:"politics",name:"Политика"},{id:"science",name:"Естественные науки"},{id:"technology",name:"Электроника"}],k={talents:q,skills:V,knowledges:X},B=[{id:"generation",name:"Поколение",description:"Каждая точка в этом факте биографии - снижение поколения на одно. Чем ниже поколение, тем, как правило, сильнее Сородич и чище его кровь. [см. стр 122]"},{id:"herd",name:"Стадо",description:'Смертные, легкодоступные и "личные" источники пропитания [см. стр 123]'},{id:"resources",name:"Ресурсы",description:"Материальное богатство и доходы [см. стр 117]"},{id:"retainers",name:"Подручные",description:"В отличие от союзников и информаторов подручные — это слуги, помощники и прочие люди, которые верно и преданно служат вашему персонажу [см. стр 121]"}],R=[{id:"path_sepulchre",name:"Путь Склепа"},{id:"path_cenotaph",name:"Путь Кенотафа"},{id:"path_bone",name:"Путь Костей"},{id:"path_corpse",name:"Путь Мертвеца"},{id:"path_ash",name:"Путь Пепла"},{id:"path_decay",name:"Путь Тлена"},{id:"path_four_humours",name:"Путь Четырёх Гуморов"},{id:"path_entropy",name:"Путь Энтропии"}],L={paths:R},H=[{id:"path_blood",name:"Путь Крови"},{id:"path_elemental_mastery",name:"Власть над Стихиями"},{id:"path_hand_destruction",name:"Длань Разрушения"},{id:"path_lure_flames",name:"Игра с Огнём"},{id:"path_beckoning",name:"Мановение Мысли"},{id:"path_neptune",name:"Могущество Нептуна"},{id:"path_incarnation",name:"Путь Воплощения"},{id:"path_mars",name:"Путь Марса"},{id:"path_fathers_vengeance",name:"Путь Отчего Воздаяния"},{id:"path_corruption",name:"Путь Совращения"},{id:"path_technomancy",name:"Путь Техномантии"},{id:"path_flora",name:"Путь Флоры"},{id:"thaumaturgic_countermagic",name:"Тауматургическая Защита"},{id:"weather_control",name:"Управление Погодой"}],S={paths:H},z=[{id:"artist",name:"Артист",description:"музыкант, киноактёр, художник, тусовщик, топ-модель, интернет-звезда"},{id:"fighter",name:"Боец",description:"телохранитель, боевик, солдат удачи, наёмный убийца"},{id:"drifter",name:"Бродяга",description:"бомж, контрабандист, жиголо/проститутка, наркоман, паломник, байкер, картёжник"},{id:"outcast",name:"Изгой",description:"городской дикарь, беженец, представитель меньшинств, сторонник теории заговора, наркоман"},{id:"intellectual",name:"Интеллектуал",description:"писатель, студент, учёный, философ, социокритик"},{id:"alternative",name:"Неформал",description:"рейвер, гот, скинхед, панк, завсегдатай баров, хипстер, психонавт"},{id:"teen",name:"Подросток",description:"ребёнок, беглец, сирота, беспризорник, хулиган"},{id:"politician",name:"Политик",description:"судья, чиновник, адвокат, секретарь-ассистент, оратор"},{id:"criminal",name:"Преступник",description:"рецидивист, мафиози, наркоторговец, сутенёр, угонщик, гопник, вор, скупщик краденого"},{id:"professional",name:"Профессионал",description:"инженер, врач, программист, юрист, промышленник"},{id:"worker",name:"Работяга",description:"дальнобойщик, фермер, слесарь, слуга, строитель"},{id:"reporter",name:"Репортёр",description:"журналист, блогер, папарацци, ведущий ток-шоу, эксперт по СМИ"},{id:"socialite",name:"Светский лев",description:"молодой бездельник, владелец клуба, плейбой, протеже, альфонс/статусная жена"},{id:"investigator",name:"Сыщик",description:"следователь, патрульный полицейский, правительственный агент, частный детектив, инквизитор"}],D=[{id:"autocrat",name:"Автократ",description:"вы стремитесь властвовать"},{id:"bon_vivant",name:"Бонвиван",description:"вечная жизнь — вечное наслаждение"},{id:"fighter",name:"Борец",description:"ничто не в силах вас одолеть"},{id:"curmudgeon",name:"Брюзга",description:"у всех определённо есть свои недостатки"},{id:"rebel",name:"Бунтарь",description:"вы не следуете чужим правилам"},{id:"visionary",name:"Визионер",description:"есть что-то помимо этого"},{id:"bravo",name:"Головорез",description:"сила даёт право"},{id:"guru",name:"Гуру",description:"окружающие ищут у вас духовных наставлений"},{id:"deviant",name:"Девиант",description:"статус-кво — для овец"},{id:"enigma",name:"Загадка",description:"как только окружающие думают, что начинают вас понимать, вы меняете правила игры"},{id:"idealist",name:"Идеалист",description:"вы верите в нечто великое"},{id:"explorer",name:"Исследователь",description:"окружающий мир есть загадка, которую надлежит разгадать"},{id:"capitalist",name:"Капиталист",description:"зачем отдавать, если можно продать?"},{id:"penitent",name:"Кающийся грешник",description:"вы прокляты, и это проклятие надлежит искупить"},{id:"conformist",name:"Конформист",description:"отличный последователь и помощник"},{id:"masochist",name:"Мазохист",description:"боль напоминает о том, что вы ещё существуете"},{id:"manipulator",name:"Махинатор",description:"окружающие нужны для того, чтобы извлекать из них выгоду"},{id:"martyr",name:"Мученик",description:"вы страдаете во имя высшей цели"},{id:"narcissist",name:"Нарцисс",description:"о нет, вы не звезда шоу, вы и есть шоу!"},{id:"mentor",name:"Наставник",description:"ваши знания спасают жизни окружающих"},{id:"thrill_seeker",name:"Непоседа",description:"всегда есть что-то ещё"},{id:"loner",name:"Одиночка",description:"у вас свой собственный путь"},{id:"eye_of_storm",name:"Око бури",description:"никому не связать вас с хаосом, что бушует вокруг"},{id:"caregiver",name:"Опекун",description:"всем нужна забота"},{id:"organizer",name:"Организатор",description:"необходимо убедиться, что всё идёт как задумано"},{id:"perfectionist",name:"Перфекционист",description:"вы стремитесь к недостижимому идеалу"},{id:"winner",name:"Победитель",description:"вы должны быть первым во всём"},{id:"fanatic",name:"Подвижник",description:"вы готовы трудиться ради высшей цели"},{id:"child",name:"Ребёнок",description:"тот, кому нужна забота"},{id:"sadist",name:"Садист",description:"вы живёте ради того, чтобы причинять боль другим"},{id:"soldier",name:"Солдат",description:"приказ должен быть выполнен, но только вы решаете, как именно"},{id:"daredevil",name:"Сорвиголова",description:"риск придаёт вечности смысл"},{id:"sociopath",name:"Социопат",description:"низшие существа должны быть уничтожены"},{id:"judge",name:"Судья",description:"ваше справедливое суждение сделает мир лучше"},{id:"creator",name:"Творец",description:"вы создаёте нечто непреходящее"},{id:"traditionalist",name:"Традиционалист",description:"как было прежде, так и должно быть впредь"},{id:"trickster",name:"Трикстер",description:"смех приглушает боль"},{id:"zealot",name:"Фанатик",description:"цель превыше всего"},{id:"freak",name:"Фрик",description:"отвращение на лицах окружающих есть лучший повод для веселья"},{id:"chameleon",name:"Хамелеон",description:"вы способны слиться с любым окружением"},{id:"monster",name:"Чудовище",description:"вы прокляты, и с этим проклятием надлежит смириться!"},{id:"egoist",name:"Эгоцентрист",description:"никто и ничто кроме вас не имеет значения"}],J=[{id:"ambidextrous",name:"Амбидекстр",cost:1},{id:"iron_stomach",name:"Железное нутро",cost:1},{id:"familiar_face",name:"Знакомое лицо",cost:1},{id:"catlike_balance",name:"Кошачья грация",cost:1},{id:"bruiser",name:"Мордоворот",cost:1},{id:"early_riser",name:"Ранняя пташка",cost:1},{id:"acute_sense",name:"Чуткое восприятие",cost:1},{id:"blush_of_health",name:"Здоровый вид",cost:2},{id:"enchanting_voice",name:"Чарующий голос",cost:2},{id:"daredevil",name:"Каскадёр",cost:3},{id:"efficient_digestion",name:"Эффективное пищеварение",cost:3},{id:"huge_size",name:"Гигант",cost:4}],W=[{id:"common_sense",name:"Здравый смысл",cost:1},{id:"concentration",name:"Концентрация",cost:1},{id:"useful_knowledge",name:"Полезная информация",cost:1},{id:"introspection",name:"Рефлексия",cost:1},{id:"calm_heart",name:"Холодная логика",cost:1},{id:"time_sense",name:"Чувство времени",cost:1},{id:"language",name:"Язык",cost:1,canTakeMultiple:!0},{id:"code_of_honor",name:"Кодекс чести",cost:2},{id:"natural_linguist",name:"Полиглот",cost:2},{id:"light_sleeper",name:"Чуткий сон",cost:2},{id:"eidetic_memory",name:"Эйдетическая память",cost:2},{id:"iron_will",name:"Железная воля",cost:3},{id:"natural_aptitude",name:"Предрасположенность",cost:3},{id:"calm",name:"Спокойный",cost:3}],G=[{id:"harmless",name:"Безобидный",cost:1},{id:"former_ghoul",name:"Бывший гуль",cost:1},{id:"reputation",name:"Громкое имя",cost:1},{id:"sabbat_survivor",name:"Знаток Шабаша",cost:1},{id:"natural_leader",name:"Прирождённый лидер",cost:1},{id:"boon",name:"Одолжение",cost:"variable",minCost:3,maxCost:6},{id:"seasoned_traveler",name:"Бывалый путешественник",cost:2},{id:"enemy_lore",name:"Знаток врагов",cost:2},{id:"other_lore",name:"Знаток иных",cost:2},{id:"saint",name:"Святой",cost:2},{id:"old_pal",name:"Старый друг",cost:2},{id:"clan_friendship",name:"Друг клана",cost:4},{id:"infamous_sire",name:"Презренный сир",cost:1},{id:"mistaken_identity",name:"Путаница",cost:1}],U=[{id:"animal_affinity",name:"Друг животных",cost:1},{id:"sealing_touch",name:"Затворяющее касание",cost:1},{id:"deceptive_aura",name:"Обманчивая аура",cost:1},{id:"medium",name:"Медиум",cost:2},{id:"magic_resistance",name:"Сопротивляемость чарам",cost:2},{id:"spirit_mentor",name:"Дух-наставник",cost:3},{id:"oracle",name:"Оракул",cost:3},{id:"lucky",name:"Счастливчик",cost:3},{id:"hidden_diablerie",name:"Таинство диаблери",cost:3},{id:"true_love",name:"Истинная любовь",cost:4},{id:"additional_discipline",name:"Дополнительная Дисциплина",cost:5},{id:"unbondable",name:"Непокорный",cost:5},{id:"nine_lives",name:"Девять жизней",cost:6},{id:"true_faith",name:"Истинная Вера",cost:7}],K={assamite:[{id:"ally_another_faction",name:"Союзник в другой фракции",cost:1,category:"social"},{id:"thousand_meter_killer",name:"Тысячеметровый убийца",cost:1,category:"physical"},{id:"outcast",name:"Изгнанник",cost:2,category:"social"},{id:"multiple_curses",name:"Многочисленные проклятия",cost:3,category:"supernatural"}],brujah:[{id:"focus_of_rage",name:"Средоточие ярости",cost:3,category:"mental"},{id:"dynamic_nature",name:"Динамичная натура",cost:5,category:"social"},{id:"predator_demeanor",name:"Повадки хищника",cost:2,category:"social"}],follower_of_set:[{id:"antitoxin_blood",name:"Невосприимчивость к наркотикам",cost:2,category:"physical"},{id:"addictive_blood",name:"Вызывающая привыкание кровь",cost:3,category:"supernatural"},{id:"setite_initiate",name:"Сетит-посвященный",cost:5,category:"supernatural"},{id:"scales",name:"Чешуя",cost:"variable",minCost:1,maxCost:3,category:"physical"},{id:"venomous_bite",name:"Ядовитый укус",cost:2,category:"physical"},{id:"forked_tongue",name:"Раздвоенный язык",cost:2,category:"physical"},{id:"heartless",name:"Бессердечный",cost:4,category:"supernatural"},{id:"aura_of_typhon",name:"Аура Тифона",cost:5,category:"supernatural"}],gangrel:[{id:"hive_mind",name:"Разум улья",cost:"variable",minCost:1,maxCost:2,category:"supernatural"},{id:"skald",name:"Скальд",cost:2,category:"mental"},{id:"lesser_mark_beast",name:"Малая метка Зверя",cost:4,category:"supernatural"},{id:"totem_shift",name:"Смена Тотема",cost:5,category:"supernatural"},{id:"caged_rat",name:"Крыса в клетке",cost:2,category:"mental"},{id:"pack_member",name:"Член стаи",cost:2,category:"supernatural"}],giovanni:[{id:"cannibal",name:"Каннибал",cost:1,category:"physical"},{id:"mortuario",name:"Моритарио",cost:"variable",minCost:2,maxCost:4,category:"supernatural"},{id:"bloodline_resistance",name:"Сопротивление единокровию",cost:1,category:"supernatural"},{id:"sanguine_incongruity",name:"Неприятие крови",cost:5,category:"supernatural"},{id:"inbred",name:"Плод инбридинга",cost:"variable",minCost:1,maxCost:5,category:"physical"},{id:"shadowwalker",name:"Идущий в тенях",cost:6,category:"supernatural"}],lasombra:[{id:"eyes_of_shadow",name:"Глаза Тени",cost:"variable",minCost:1,maxCost:4,category:"social"},{id:"aura_of_command",name:"Ореол власти",cost:3,category:"social"},{id:"shadow_king",name:"Король/Королева Тени",cost:4,category:"mental"},{id:"long_term_planning",name:"Долгосрочное планирование",cost:4,category:"mental"},{id:"hand_of_god",name:"Длань Бога",cost:5,category:"supernatural"},{id:"uncontrollable_night_vision",name:"Неуправляемое ночное зрение",cost:2,category:"physical"},{id:"disobedient",name:"Непослушный",cost:3,category:"mental"},{id:"unworthy",name:"Недостойный",cost:3,category:"social"}],malkavian:[{id:"blurry_aura",name:"Нечёткая аура",cost:2,category:"supernatural"},{id:"prophetic_dreams",name:"Пророческие сны",cost:2,category:"supernatural"},{id:"cold_reading",name:"Холодное чтение",cost:3,category:"mental"},{id:"stigmata",name:"Стигматы",cost:"variable",minCost:2,maxCost:4,category:"supernatural"},{id:"infectious",name:"Инфекционный",cost:3,category:"mental"},{id:"hypersensitive",name:"Сверхвосприимчивый",cost:3,category:"mental"},{id:"dead_inside",name:"Мёртвый внутри",cost:4,category:"mental"}],nosferatu:[{id:"bad_blood",name:"Дурная кровь",cost:1,category:"physical"},{id:"lizard_limbs",name:"Конечности ящерицы",cost:1,category:"physical"},{id:"long_fingers",name:"Длинные пальцы",cost:1,category:"physical"},{id:"monstrous_maw",name:"Чудовищная пасть",cost:1,category:"physical"},{id:"piscine",name:"Рыбий",cost:1,category:"physical"},{id:"slippery",name:"Скользкий",cost:1,category:"physical"},{id:"hidden_sleep",name:"Скрытый сон",cost:2,category:"supernatural"},{id:"thick_hide",name:"Толстая шкура",cost:2,category:"physical"},{id:"erroneous_reflection",name:"Неверное отражение",cost:3,category:"supernatural"},{id:"webbed",name:"Перепонки",cost:4,category:"physical"},{id:"presentable",name:"Потрёпанный вид",cost:5,category:"social"},{id:"stench",name:"Вонь",cost:1,category:"physical"},{id:"loss_of_scent",name:"Потеря обоняния",cost:2,category:"physical"},{id:"parasite_haven",name:"Рассадник паразитов",cost:2,category:"physical"},{id:"bestial",name:"Зверьё",cost:3,category:"social"},{id:"rot",name:"Гниение",cost:4,category:"physical"},{id:"tainted",name:"Заражение",cost:5,category:"supernatural"},{id:"garbled_speech",name:"Бессвязная речь",cost:5,category:"mental"}],ravnos:[{id:"ravnos_antitoxin",name:"Антитоксин в крови",cost:1,category:"physical"},{id:"brahmin",name:"Брахман",cost:1,category:"social"},{id:"kshatriya",name:"Кшатрия",cost:1,category:"physical"},{id:"sleight_of_hand",name:"Ловкость Рук",cost:1,category:"physical"},{id:"mute_devotion",name:"Немая Преданность",cost:1,category:"mental"},{id:"vaishya",name:"Вайшья",cost:1,category:"social"},{id:"friendly_critters",name:"Дружелюбные зверьки",cost:2,category:"supernatural"},{id:"hardened_heart",name:"Огрубевшее сердце",cost:3,category:"mental"},{id:"chandala",name:"Чандала",cost:1,category:"social"},{id:"imperfect_reality",name:"Несовершенная реальность",cost:2,category:"supernatural"},{id:"oathbreaker",name:"Клятвопреступник",cost:2,category:"social"},{id:"lost_svadharma",name:"Потерянная Свадхарма",cost:3,category:"mental"}],toreador:[{id:"indelible",name:"Неизгладимый",cost:1,category:"social"},{id:"impressive_composure",name:"Впечатляющее самообладание",cost:2,category:"mental"},{id:"master_of_masquerade",name:"Мастер Маскарада",cost:2,category:"social"},{id:"slow_degeneration",name:"Медленная деградация",cost:5,category:"mental"},{id:"perfectionist_artist",name:"Художник-перфекционист",cost:1,category:"mental"}],tremere:[{id:"unbonded_by_cup",name:"Становление без чаши",cost:1,category:"supernatural"},{id:"magical_curse",name:"Магическое Проклятие",cost:"variable",minCost:1,maxCost:5,category:"supernatural"},{id:"recluse",name:"Затворник",cost:2,category:"social"},{id:"blood_of_mage",name:"Кровь мага",cost:5,category:"supernatural"},{id:"thaumaturgy_incapable",name:"Неспособность к Тауматургии",cost:5,category:"supernatural"}],tzimisce:[{id:"bioluminescence",name:"Биолюминесценция",cost:1,category:"physical"},{id:"pain_tolerance",name:"Терпимость к боли",cost:2,category:"physical"},{id:"dragon_temperament",name:"Темперамент дракона",cost:3,category:"mental"},{id:"haven_affinity",name:"Связь с убежищем",cost:3,category:"supernatural"},{id:"revenant_disciplines",name:"Дисциплины ревенантов",cost:3,category:"supernatural"},{id:"promethean_clay",name:"Прометеева глина",cost:5,category:"supernatural"},{id:"unblinking_stare",name:"Немигающий взгляд",cost:1,category:"physical"},{id:"ancestral_soil",name:"Зависимость от земли предков",cost:2,category:"supernatural"},{id:"faceless",name:"Безликий",cost:3,category:"physical"},{id:"privacy_obsession",name:"Одержимость уединением",cost:3,category:"mental"},{id:"revenant_weakness",name:"Слабость ревенантов",cost:3,category:"supernatural"},{id:"consumption",name:"Потребление",cost:5,category:"physical"}],ventrue:[{id:"connoisseur",name:"Знаток",cost:2,category:"physical"},{id:"blessing_st_gustav",name:"Благословение Святого Густава",cost:4,category:"supernatural"},{id:"rarefied_tastes",name:"Необычные предпочтения",cost:2,category:"physical"}],caitiff:[{id:"personal_masquerade",name:"Личный Маскарад",cost:3,category:"social"},{id:"clan_weakness_caitiff",name:"Слабость Клана",cost:2,category:"supernatural"},{id:"absence_of_fangs",name:"Отсутствие клыков",cost:2,category:"physical"},{id:"bulimia",name:"Булимия",cost:4,category:"physical"}]},A={physical:J,mental:W,social:G,supernatural:U,clanSpecific:K},Q=[{id:"short",name:"Коротышка",cost:1},{id:"smell_of_grave",name:"Могильный запах",cost:1},{id:"tic",name:"Нервный тик",cost:1},{id:"hard_of_hearing",name:"Тугоухость",cost:1},{id:"bad_sight_minor",name:"Плохое зрение (очки)",cost:1},{id:"bad_sight_major",name:"Плохое зрение (без коррекции)",cost:3},{id:"disfigured",name:"Уродство",cost:2},{id:"blunt_fangs",name:"Тупые клыки",cost:2},{id:"infectious_bite",name:"Заразный укус",cost:2},{id:"one_eye",name:"Одноглазый",cost:2},{id:"vulnerability_silver",name:"Уязвимость к серебру",cost:2},{id:"open_wound_minor",name:"Кровоточащая рана (лёгкая)",cost:2},{id:"open_wound_major",name:"Кровоточащая рана (тяжёлая)",cost:4},{id:"lazy",name:"Лень",cost:3},{id:"slow_healing",name:"Медленное заживление",cost:3},{id:"permanent_wound",name:"Незаживающая рана",cost:3},{id:"addiction",name:"Пристрастие",cost:3},{id:"child",name:"Ребёнок",cost:3},{id:"glowing_eyes",name:"Светящиеся глаза",cost:3},{id:"protruding_fangs",name:"Торчащие клыки",cost:3},{id:"deformity",name:"Увечье",cost:3},{id:"lame",name:"Хромота",cost:3},{id:"monstrous",name:"Чудовищная внешность",cost:3},{id:"deaf",name:"Глухота",cost:4},{id:"mute",name:"Немота",cost:4},{id:"disease_carrier",name:"Разносчик заразы",cost:4},{id:"thin_blood",name:"Разбавленная кровь",cost:"variable",minCost:1,maxCost:5},{id:"sterile_vitae",name:"Бесплодная витэ",cost:5},{id:"flesh_of_corpse",name:"Мёртвая плоть",cost:5},{id:"blind",name:"Слепота",cost:6}],Y=[{id:"deep_sleeper",name:"Глубокий сон",cost:1},{id:"speech_impediment",name:"Дефект речи",cost:1},{id:"nightmares",name:"Кошмары",cost:1},{id:"soft_hearted",name:"Мягкосердечность",cost:1},{id:"unreliable",name:"Неблагонадёжность",cost:1},{id:"impatient",name:"Нетерпеливость",cost:1},{id:"prey_exclusion",name:"Разборчивость",cost:1},{id:"shy",name:"Робость",cost:1},{id:"amnesia",name:"Амнезия",cost:2},{id:"short_fuse",name:"Вспыльчивость",cost:2},{id:"thirst_for_innocence",name:"Жажда невинности",cost:2},{id:"lunacy",name:"Лунный психоз",cost:2},{id:"vengeful",name:"Мстительность",cost:2},{id:"territorial",name:"Территориальность",cost:2},{id:"phobia",name:"Фобия",cost:2},{id:"stereotype",name:"Ходячий стереотип",cost:2},{id:"weak_willed",name:"Слабоволие",cost:3},{id:"flesh_eater",name:"Людоед",cost:4},{id:"guilt_wracked",name:"Угрызения совести",cost:4},{id:"flashbacks",name:"Мучительные воспоминания",cost:6}],Z=[{id:"mistaken_identity",name:"Путаница",cost:1},{id:"infamous_sire",name:"Презренный сир",cost:1},{id:"enemy_3pt",name:"Враг (3 пункта)",cost:3},{id:"enemy_4pt",name:"Враг (4 пункта)",cost:4},{id:"enemy_5pt",name:"Враг (5 пунктов)",cost:5},{id:"clan_enemy",name:"Враг клана",cost:4},{id:"red_list",name:"Красный Список",cost:7}],ee=[{id:"repulsive_touch",name:"Леденящее касание",cost:1},{id:"repelled_by_garlic",name:"Отвращение к чесноку",cost:1},{id:"cast_no_reflection",name:"Отсутствие отражения",cost:1},{id:"eerie_presence",name:"Холодный ветер",cost:1},{id:"cursed_1pt",name:"Проклятие (1 пункт)",cost:1},{id:"cursed_2pt",name:"Проклятие (2 пункта)",cost:2},{id:"cursed_3pt",name:"Проклятие (3 пункта)",cost:3},{id:"cursed_4pt",name:"Проклятие (4 пункта)",cost:4},{id:"cursed_5pt",name:"Проклятие (5 пунктов)",cost:5},{id:"haunted",name:"Зерцало смерти",cost:2},{id:"touch_of_frost",name:"Зловещее присутствие",cost:2},{id:"lord_of_flies",name:"Повелитель мух",cost:2},{id:"beacon_darkness",name:"Светоч тьмы",cost:2},{id:"repelled_by_crosses",name:"Боязнь крестов",cost:3},{id:"cant_cross_running_water",name:"Водная преграда",cost:3},{id:"haunted_by_ghost",name:"Мстительный призрак",cost:3},{id:"grip_damned",name:"Поцелуй Проклятого",cost:4},{id:"doomed",name:"Рок",cost:5},{id:"light_sensitive",name:"Светобоязнь",cost:5}],te={physical:Q,mental:Y,social:Z,supernatural:ee};class ie{constructor(){this.character=new C,this.tracker=new E(this.character),this.currentPhase="setup",this.allDisciplines=this.flattenDisciplines(),this.init()}flattenDisciplines(){const e=[];return Object.values(N).forEach(t=>{e.push(...t)}),e}init(){this.loadFromLocalStorage(),this.render(),this.attachEventListeners()}render(){const e=document.getElementById("app");e.innerHTML="",e.innerHTML=`
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
                ${D.map(e=>`
                  <option value="${e.name}">
                `).join("")}
              </datalist>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Маска</label>
              <input type="text" id="demeanor" class="input-field"
                     list="demeanor-list" value="${this.character.demeanor}">
              <datalist id="demeanor-list">
                ${D.map(e=>`
                  <option value="${e.name}">
                `).join("")}
              </datalist>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Концепция</label>
              <input type="text" id="concept" class="input-field"
                     list="concept-list" value="${this.character.concept}">
              <datalist id="concept-list">
                ${z.map(e=>`
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
                ${_.map(e=>`
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
    `}getClanWeakness(){const e=_.find(t=>t.id===this.character.clan);return e?e.weakness:""}renderAttributes(){var t,i,a,s,n,c,r,o,m,u,h,l;const e=this.tracker.validateAttributes();return`
      <div class="card">
        <h3 class="section-title">Атрибуты</h3>
        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-sm font-medium mb-2">Правила распределения: 9/7/5</div>
          <div class="text-xs text-gray-400 mb-2">
            Максимум 6 в одном атрибуте до Freebies. Каждый атрибут начинается с 1.
          </div>
          <div class="flex gap-4">
            <div>Физические: <span class="${((t=e.totals)==null?void 0:t.physical)===9||((i=e.totals)==null?void 0:i.physical)===7||((a=e.totals)==null?void 0:a.physical)===5?"text-green-400":"text-red-400"}">${((s=e.totals)==null?void 0:s.physical)||0}</span></div>
            <div>Социальные: <span class="${((n=e.totals)==null?void 0:n.social)===9||((c=e.totals)==null?void 0:c.social)===7||((r=e.totals)==null?void 0:r.social)===5?"text-green-400":"text-red-400"}">${((o=e.totals)==null?void 0:o.social)||0}</span></div>
            <div>Ментальные: <span class="${((m=e.totals)==null?void 0:m.mental)===9||((u=e.totals)==null?void 0:u.mental)===7||((h=e.totals)==null?void 0:h.mental)===5?"text-green-400":"text-red-400"}">${((l=e.totals)==null?void 0:l.mental)||0}</span></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${this.renderAttributeCategory("physical","Физические",["strength","dexterity","stamina"],["Сила","Ловкость","Выносливость"])}
          ${this.renderAttributeCategory("social","Социальные",["charisma","manipulation","appearance"],["Обаяние","Манипулирование","Привлекательность"])}
          ${this.renderAttributeCategory("mental","Ментальные",["perception","intelligence","wits"],["Восприятие","Интеллект","Смекалка"])}
        </div>
      </div>
    `}renderAttributeCategory(e,t,i,a){return`
      <div>
        <h4 class="subsection-title">${t}</h4>
        ${i.map((s,n)=>`
          <div class="stat-row">
            <span class="stat-label">${a[n]}</span>
            <div class="dot-tracker">
              ${this.renderDots(this.character.attributes[e][s],10,"attributes",e,s)}
            </div>
          </div>
        `).join("")}
      </div>
    `}renderAbilities(){var t,i,a,s,n,c,r,o,m,u,h,l;const e=this.tracker.validateAbilities();return`
      <div class="card">
        <h3 class="section-title">Способности</h3>
        <div class="mb-4 p-4 bg-gray-800 rounded">
          <div class="text-sm font-medium mb-2">Правила распределения: 18/12/8</div>
          <div class="text-xs text-gray-400 mb-2">
            Максимум 5 в одной способности до Freebies.
          </div>
          <div class="flex gap-4">
            <div>Таланты: <span class="${((t=e.totals)==null?void 0:t.talents)===18||((i=e.totals)==null?void 0:i.talents)===12||((a=e.totals)==null?void 0:a.talents)===8?"text-green-400":"text-red-400"}">${((s=e.totals)==null?void 0:s.talents)||0}</span></div>
            <div>Навыки: <span class="${((n=e.totals)==null?void 0:n.skills)===18||((c=e.totals)==null?void 0:c.skills)===12||((r=e.totals)==null?void 0:r.skills)===8?"text-green-400":"text-red-400"}">${((o=e.totals)==null?void 0:o.skills)||0}</span></div>
            <div>Познания: <span class="${((m=e.totals)==null?void 0:m.knowledges)===18||((u=e.totals)==null?void 0:u.knowledges)===12||((h=e.totals)==null?void 0:h.knowledges)===8?"text-green-400":"text-red-400"}">${((l=e.totals)==null?void 0:l.knowledges)||0}</span></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${this.renderAbilityCategory("talents","Таланты",k.talents)}
          ${this.renderAbilityCategory("skills","Навыки",k.skills)}
          ${this.renderAbilityCategory("knowledges","Познания",k.knowledges)}
        </div>
      </div>
    `}renderAbilityCategory(e,t,i){return`
      <div>
        <h4 class="subsection-title">${t}</h4>
        ${i.map(a=>`
          <div class="stat-row">
            <span class="stat-label">${a.name}</span>
            <div class="dot-tracker">
              ${this.renderDots(this.character.abilities[e][a.id]||0,10,"abilities",e,a.id)}
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
          ${B.map(a=>`
            <div class="stat-row">
              <div>
                <span class="stat-label">${a.name}</span>
                <div class="text-xs text-gray-400">${a.description}</div>
              </div>
              <div class="dot-tracker">
                ${this.renderDots(this.character.backgrounds[a.id]||0,5,"backgrounds",null,a.id)}
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
            <div class="dot-tracker">
              ${this.renderDots(this.character.virtues.conscience,5,"virtues",null,"conscience")}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Самоконтроль/Инстинкт</span>
            <div class="dot-tracker">
              ${this.renderDots(this.character.virtues.selfControl,5,"virtues",null,"selfControl")}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Храбрость</span>
            <div class="dot-tracker">
              ${this.renderDots(this.character.virtues.courage,5,"virtues",null,"courage")}
            </div>
          </div>
        </div>

        <!-- Humanity & Willpower -->
        <div class="card">
          <h3 class="section-title">Человечность и Сила воли</h3>
          <div class="stat-row">
            <span class="stat-label">Человечность</span>
            <div class="dot-tracker">
              ${this.renderDots(this.character.humanity,10,"humanity",null,"humanity")}
            </div>
          </div>
          <div class="stat-row">
            <span class="stat-label">Сила воли</span>
            <div class="dot-tracker">
              ${this.renderDots(this.character.willpower,10,"willpower",null,"willpower")}
            </div>
          </div>
        </div>
      </div>
    `}renderDisciplinesList(){const e=this.getClanDisciplines(),t=Object.entries(this.character.disciplines);return t.length===0?'<div class="text-gray-400 text-center py-4">Нет дисциплин. Нажмите "Добавить дисциплину"</div>':t.map(([i,a])=>{const s=this.allDisciplines.find(o=>o.id===i),n=e.includes(i),c=i==="necromancy"||i==="thaumaturgy";let r="";if(i==="necromancy"&&this.character.necromancyPaths.length>0){const o=this.character.necromancyPaths;r='<div class="text-xs text-gray-400 mt-1">',o.forEach((m,u)=>{const h=L.paths.find(g=>g.id===m.pathId),l=u===0?"Основной":`Вторичный ${u}`;r+=`${l}: ${(h==null?void 0:h.name)||m.pathId} (${m.level})${u<o.length-1?"<br>":""}`}),r+="</div>"}else if(i==="thaumaturgy"&&this.character.thaumaturgyPaths.length>0){const o=this.character.thaumaturgyPaths;r='<div class="text-xs text-gray-400 mt-1">',o.forEach((m,u)=>{const h=S.paths.find(g=>g.id===m.pathId),l=u===0?"Основной":`Вторичный ${u}`;r+=`${l}: ${(h==null?void 0:h.name)||m.pathId} (${m.level})${u<o.length-1?"<br>":""}`}),r+="</div>"}return`
        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="stat-label">${(s==null?void 0:s.name)||i}</span>
                ${n?'<span class="text-xs text-green-400">(Клановая)</span>':""}
              </div>
              ${r}
            </div>
            <div class="flex items-center gap-2">
              <div class="dot-tracker">
                ${this.renderDots(a,10,"disciplines",null,i)}
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
      `}).join("")}renderFreebiesPhase(){const e=this.character.freebies-this.character.freebiesSpent,t=this.character.flaws.reduce((a,s)=>a+(s.selectedCost||s.cost),0),i=this.character.merits.reduce((a,s)=>a+(s.selectedCost||s.cost),0);return`
      <div class="space-y-4">
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
    `}renderMeritsFlawsSection(){return`
      <div class="mb-6 p-4 bg-gray-900 rounded">
        <h4 class="font-semibold mb-3">Достоинства и Недостатки</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Current Merits -->
          <div>
            <div class="text-sm font-medium mb-2">Достоинства (стоят бонусные очки):</div>
            <div class="space-y-2">
              ${this.character.merits.length===0?'<div class="text-xs text-gray-500">Нет выбранных достоинств</div>':this.character.merits.map(e=>`
                  <div class="p-2 bg-gray-800 rounded flex justify-between items-center">
                    <div class="font-medium text-sm">${e.name}</div>
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
                  <div class="p-2 bg-gray-800 rounded flex justify-between items-center">
                    <div class="font-medium text-sm">${e.name}</div>
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
      <div class="space-y-4">
        <div class="card">
          <h3 class="section-title">Распределение опыта (XP)</h3>

          <div class="mb-4 p-4 bg-gray-800 rounded">
            <div class="text-lg font-bold mb-2">
              Доступно: <span class="${e>=0?"text-green-400":"text-red-400"}">${e}</span> / 33 XP
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
    `}renderSummary(){const e=this.tracker.validateAll(),t=Object.values(e).every(i=>i.valid);return`
      <div class="card">
        <h3 class="section-title">Итоги персонажа</h3>

        <div class="mb-6 p-4 ${t?"bg-green-900":"bg-yellow-900"} rounded">
          <div class="font-medium mb-2">${t?"✓ Базовая настройка завершена":"⚠ Базовая настройка не завершена"}</div>
          ${t?"":`
            <div class="text-sm space-y-1">
              ${Object.entries(e).map(([i,a])=>a.valid?"":a.errors.map(s=>`<div>• ${s}</div>`).join("")).join("")}
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
    `}getClanName(){const e=_.find(t=>t.id===this.character.clan);return e?e.name:"—"}getClanDisciplines(){const e=_.find(t=>t.id===this.character.clan);return e?e.disciplines:[]}renderDots(e,t,i,a,s){let n="";for(let c=1;c<=t;c++){const r=c<=e?"filled":"",o=`app.updateCharacterValue('${i}', '${a||""}', '${s}', ${c})`;n+=`<div class="dot ${r}" onclick="${o}"></div>`}return n}showMeritsModal(){const e=[];Object.entries(A).forEach(([i,a])=>{i!=="clanSpecific"&&a.forEach(s=>{e.push({...s,category:i,isClanSpecific:!1})})});const t=A.clanSpecific;t&&this.character.clan&&Object.entries(t).forEach(([i,a])=>{a.forEach(s=>{e.push({...s,clan:i,isClanSpecific:!0})})}),this.showMeritFlawModal(e,"merits")}showFlawsModal(){const e=[];Object.entries(te).forEach(([t,i])=>{i.forEach(a=>{e.push({...a,category:t})})}),this.showMeritFlawModal(e,"flaws")}showMeritFlawModal(e,t){const i=document.createElement("div");i.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4",i.id="meritFlawModal";const a=[...new Set(e.map(n=>n.category))];i.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4 sticky top-0 bg-vtm-grey pb-2">
          <h3 class="text-2xl font-bold text-vtm-red">${t==="merits"?"Выбрать Достоинство":"Выбрать Недостаток"}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="document.getElementById('meritFlawModal').remove()">&times;</button>
        </div>

        <div class="mb-4">
          <input type="text" id="meritFlawSearch" placeholder="Поиск..." class="input-field">
        </div>

        <div class="space-y-4">
          ${a.map(n=>{const c=e.filter(o=>o.category===n);return`
              <details open class="category-section">
                <summary class="cursor-pointer font-semibold text-lg mb-2 text-vtm-red">${{physical:"Физические",mental:"Ментальные",social:"Социальные",supernatural:"Сверхъестественные"}[n]||n} (${c.length})</summary>
                <div class="space-y-2 pl-2">
                  ${c.map(o=>{const m=o.cost==="variable"||o.minCost&&o.maxCost,u=m?`${o.minCost}-${o.maxCost}`:o.cost,h=this.isMeritFlawDisabled(o),l=h?"opacity-50 cursor-not-allowed":"hover:bg-gray-700 cursor-pointer",g=h?'data-disabled="true"':"";return`
                      <div class="merit-flaw-item p-3 bg-gray-800 rounded ${l} transition-colors"
                           data-id="${o.id}"
                           data-name="${o.name}"
                           data-cost="${o.cost}"
                           data-min-cost="${o.minCost||o.cost}"
                           data-max-cost="${o.maxCost||o.cost}"
                           data-is-variable="${m}"
                           ${g}
                           onclick="app.selectMeritFlaw(this, '${t}')">
                        <div class="flex justify-between items-start mb-1">
                          <div class="font-medium">${o.name}</div>
                          <div class="text-${t==="merits"?"vtm-red":"green-400"} font-medium ml-2">${t==="merits"?"-":"+"}${u}</div>
                        </div>
                        ${o.description?`<div class="text-xs text-gray-400">${o.description}</div>`:""}
                        ${o.elderNote?`<div class="text-xs text-yellow-400 mt-1">⚠️ ${o.elderNote}</div>`:""}
                        ${h?`<div class="text-xs text-red-400 mt-1">❌ ${this.getMeritFlawDisabledReason(o)}</div>`:""}
                        ${o.isClanSpecific?`<div class="text-xs text-blue-400 mt-1">🔹 Связано с кланом ${this.getClanName(o.clan)}</div>`:""}
                      </div>
                    `}).join("")}
                </div>
              </details>
            `}).join("")}
        </div>
      </div>
    `,document.body.appendChild(i);const s=document.getElementById("meritFlawSearch");s.addEventListener("input",n=>{const c=n.target.value.toLowerCase();document.querySelectorAll(".merit-flaw-item").forEach(r=>{const o=r.dataset.name.toLowerCase();r.style.display=o.includes(c)?"block":"none"})}),s.focus()}selectMeritFlaw(e,t){var s,n;if(e.dataset.disabled==="true")return;const i={id:e.dataset.id,name:e.dataset.name,cost:e.dataset.cost==="variable"?parseInt(e.dataset.minCost):parseInt(e.dataset.cost),description:((s=e.querySelector(".text-gray-400"))==null?void 0:s.textContent)||"",elderNote:((n=e.querySelector(".text-yellow-400"))==null?void 0:n.textContent.replace("⚠️ ",""))||""};if(e.dataset.isVariable==="true"){const c=parseInt(e.dataset.minCost),r=parseInt(e.dataset.maxCost);this.showDotSelectionModal(i,c,r,t)}else t==="merits"?this.addMerit(i,i.cost):this.addFlaw(i,i.cost),document.getElementById("meritFlawModal").remove()}showDotSelectionModal(e,t,i,a){const s=document.getElementById("dotSelectionModal");s&&s.remove();const n=document.createElement("div");n.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]",n.id="dotSelectionModal",n.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-vtm-red mb-4">${e.name}</h3>
        <p class="text-sm text-gray-400 mb-4">Выберите стоимость (${t}-${i} очков):</p>

        <div class="flex gap-2 justify-center mb-6">
          ${Array.from({length:i-t+1},(c,r)=>t+r).map(c=>`
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
    `,document.body.appendChild(n),n.dataset.itemData=JSON.stringify(e),n.dataset.type=a}selectDotCost(e){const t=document.getElementById("dotSelectionModal"),i=JSON.parse(t.dataset.itemData);t.dataset.type==="merits"?this.addMerit(i,e):this.addFlaw(i,e),t.remove(),document.getElementById("meritFlawModal").remove()}addMerit(e,t){if(this.character.merits.some(i=>i.id===e.id)){alert("У вас уже есть это достоинство");return}this.character.merits.push({...e,selectedCost:t}),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}removeMerit(e){this.character.merits=this.character.merits.filter(t=>t.id!==e),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}addFlaw(e,t){if(this.character.flaws.some(a=>a.id===e.id)){alert("У вас уже есть этот недостаток");return}const i=this.character.flaws.reduce((a,s)=>a+(s.selectedCost||s.cost),0);if(i+t>7){alert(`Максимум 7 очков от недостатков. У вас уже ${i} очков.`);return}this.character.flaws.push({...e,selectedCost:t}),e.id==="thin_blood"&&(this.character.dilutedVitae=t),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}removeFlaw(e){const t=this.character.flaws.find(i=>i.id===e);t&&t.id==="thin_blood"&&(this.character.dilutedVitae=0),this.character.flaws=this.character.flaws.filter(i=>i.id!==e),this.character.freebies=this.character.calculateFreebies(),this.saveToLocalStorage(),this.render(),this.attachEventListeners()}isMeritFlawDisabled(e){return!!(e.excludedClans&&e.excludedClans.includes(this.character.clan)||e.minWillpower&&this.character.willpower<e.minWillpower||e.minCharisma&&this.character.attributes.social.charisma<e.minCharisma||e.incompatibleWith&&(this.character.merits.some(i=>e.incompatibleWith.includes(i.id))||this.character.flaws.some(i=>e.incompatibleWith.includes(i.id))))}getMeritFlawDisabledReason(e){return e.excludedClans&&e.excludedClans.includes(this.character.clan)?`Недоступно для ${this.getClanName()}`:e.minWillpower&&this.character.willpower<e.minWillpower?`Требуется Сила Воли ${e.minWillpower}+`:e.minCharisma&&this.character.attributes.social.charisma<e.minCharisma?`Требуется Харизма ${e.minCharisma}+`:e.incompatibleWith?"Несовместимо с другими выбранными опциями":"Недоступно"}getClanName(e=null){const t=e||this.character.clan,i=_.find(a=>a.id===t);return i?i.name:""}switchPhase(e){this.currentPhase=e,this.render(),this.attachEventListeners()}attachEventListeners(){document.querySelectorAll(".tab").forEach(n=>{n.addEventListener("click",c=>{const r=c.target.getAttribute("data-phase");r&&this.switchPhase(r)})}),["name","player","chronicle","nature","demeanor","concept","sire"].forEach(n=>{const c=document.getElementById(n);c&&c.addEventListener("input",r=>{this.character[n]=r.target.value,this.saveToLocalStorage()})});const e=document.getElementById("clan");e&&e.addEventListener("change",n=>{if(this.character.clan=n.target.value,this.character.clan){const c=_.find(r=>r.id===this.character.clan);c&&c.disciplines&&c.disciplines.forEach(r=>{r in this.character.disciplines||(this.character.disciplines[r]=0)})}this.saveToLocalStorage(),this.render(),this.attachEventListeners()});const t=document.getElementById("addDisciplineBtn");t&&t.addEventListener("click",()=>this.showAddDisciplineDialog());const i=document.getElementById("saveBtn");i&&i.addEventListener("click",()=>this.saveCharacter());const a=document.getElementById("loadBtn");a&&a.addEventListener("click",()=>this.loadCharacter());const s=document.getElementById("exportBtn");s&&s.addEventListener("click",()=>this.exportToPDF())}updateCharacterValue(e,t,i,a){let s=0;if(e==="attributes"?s=this.character.attributes[t][i]:e==="abilities"?s=this.character.abilities[t][i]||0:e==="disciplines"?s=this.character.disciplines[i]||0:e==="backgrounds"?s=this.character.backgrounds[i]||0:e==="virtues"?s=this.character.virtues[i]:e==="humanity"?s=this.character.humanity:e==="willpower"&&(s=this.character.willpower),this.currentPhase==="freebies"||this.currentPhase==="xp"){if(a<=s)return;if(this.currentPhase==="freebies"){const n=this.calculateFreebieCost(e,t,i,s,a),c=this.character.freebies-this.character.freebiesSpent;if(n>c){alert(`Недостаточно бонусных очков. Нужно: ${n}, доступно: ${c}`);return}this.character.freebiesSpent+=n}else if(this.currentPhase==="xp"){const n=this.calculateXPCost(e,t,i,s,a),c=this.character.experience-this.character.experienceSpent;if(n>c){alert(`Недостаточно XP. Нужно: ${n}, доступно: ${c}`);return}this.character.experienceSpent+=n}}e==="attributes"?this.character.attributes[t][i]=a:e==="abilities"?this.character.abilities[t][i]=a:e==="disciplines"?(this.character.disciplines[i]=a,i==="necromancy"&&this.character.necromancyPaths.length>0?this.character.necromancyPaths[0].level=a:i==="thaumaturgy"&&this.character.thaumaturgyPaths.length>0&&(this.character.thaumaturgyPaths[0].level=a)):e==="backgrounds"?this.character.backgrounds[i]=a:e==="virtues"?this.character.virtues[i]=a:e==="humanity"?this.character.humanity=a:e==="willpower"&&(this.character.willpower=a),this.saveToLocalStorage(),this.updateAllDisplays()}calculateFreebieCost(e,t,i,a,s){const n=s-a;let c=0;return e==="attributes"?c=f.attribute:e==="abilities"?c=f.ability:e==="disciplines"?c=f.discipline:e==="backgrounds"?c=f.background:e==="virtues"?c=f.virtue:e==="humanity"?c=f.humanity:e==="willpower"&&(c=f.willpower),n*c}calculateXPCost(e,t,i,a,s){let n=0;for(let c=a+1;c<=s;c++){let r=0;if(e==="attributes")r=$.attribute(c);else if(e==="abilities")a===0?r=$.newAbility:r=$.ability(c);else if(e==="disciplines")if(a===0)r=$.newDiscipline;else{const o=this.allDisciplines.find(l=>l.id===i),u=this.getClanDisciplines().includes(i);this.character.clan==="caitiff"?r=$.discipline[o.category].caitiff(c):u?r=$.discipline[o.category].clan(c):r=$.discipline[o.category].nonClan(c)}else if(e==="virtues")r=$.virtue(c);else if(e==="humanity")r=$.humanity(c);else if(e==="willpower")r=$.willpower(c);else if(e==="backgrounds")return 999;n+=r}return n}updateAllDisplays(){this.render(),this.attachEventListeners()}showAddDisciplineDialog(){const e=Object.keys(this.character.disciplines),t=this.allDisciplines.filter(c=>!e.includes(c.id)),i={physical:t.filter(c=>c.category==="physical"),mental:t.filter(c=>c.category==="mental"),unique:t.filter(c=>c.category==="unique")},a=this.getClanDisciplines(),s=document.createElement("div");s.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50",s.innerHTML=`
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
          ${this.renderDisciplineCategory("Физические",i.physical,a)}
          ${this.renderDisciplineCategory("Ментальные",i.mental,a)}
          ${this.renderDisciplineCategory("Уникальные",i.unique,a)}
        </div>
      </div>
    `,document.body.appendChild(s);const n=document.getElementById("disciplineSearch");n.addEventListener("input",c=>{const r=c.target.value.toLowerCase();document.querySelectorAll(".discipline-item").forEach(m=>{const u=m.dataset.name.toLowerCase();m.style.display=u.includes(r)?"flex":"none"})}),n.focus()}renderDisciplineCategory(e,t,i){return t.length===0?"":`
      <div>
        <h4 class="text-lg font-semibold text-gray-300 mb-2">${e}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          ${t.map(a=>{const s=i.includes(a.id);return`
              <div class="discipline-item p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors flex justify-between items-center"
                   data-name="${a.name}"
                   onclick="app.selectDiscipline('${a.id}')">
                <div>
                  <div class="font-medium">${a.name}</div>
                  <div class="text-xs text-gray-400">${a.description||""}</div>
                </div>
                ${s?'<span class="text-xs text-green-400 font-semibold">Клановая</span>':""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}selectDiscipline(e){this.character.disciplines[e]=1,this.saveToLocalStorage();const t=document.querySelector(".fixed.inset-0");t&&t.remove(),this.updateAllDisplays()}removeDiscipline(e){delete this.character.disciplines[e],this.saveToLocalStorage(),this.updateAllDisplays()}managePaths(e){this.currentManagingDiscipline=e,this.showPathManagementModal(e)}showPathManagementModal(e){const t=e==="necromancy",i=t?this.character.necromancyPaths:this.character.thaumaturgyPaths,a=t?L.paths:S.paths,s=this.character.disciplines[e]||0,n=t?"Некромантия":"Тауматургия",c=document.createElement("div");c.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50",c.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-vtm-red">Пути ${n}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="app.closePathModal()">&times;</button>
        </div>

        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="text-sm text-gray-400">
            <strong>Основной путь:</strong> Уровень равен уровню дисциплины (${s})<br>
            <strong>Вторичные пути:</strong> Изучение нового пути - 7 XP, повышение - текущее × 4 XP
          </div>
        </div>

        ${i.length>0?`
          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">Изученные пути</h4>
            ${i.map((r,o)=>{const m=a.find(h=>h.id===r.pathId),u=o===0;return`
                <div class="mb-3 p-3 bg-gray-800 rounded">
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                      <div class="font-medium">${(m==null?void 0:m.name)||r.pathId}</div>
                      ${u?'<div class="text-xs text-green-400">Основной путь</div>':'<div class="text-xs text-blue-400">Вторичный путь</div>'}
                    </div>
                    ${u?"":`
                      <button class="text-red-500 hover:text-red-400 text-xl" onclick="app.removePath('${e}', '${r.pathId}')">×</button>
                    `}
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-400">Уровень:</span>
                    <div class="dot-tracker" data-discipline="${e}" data-path="${r.pathId}">
                      ${this.renderDotsForPath(r.level,u?s:5,u)}
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
    `,document.body.appendChild(c),setTimeout(()=>{this.attachPathDotListeners(e)},0)}renderDotsForPath(e,t,i){let a="";for(let s=1;s<=t;s++){const n=s<=e?"filled":"";a+=`<div class="dot ${n} ${i?"opacity-50 cursor-not-allowed":""}" data-value="${s}"></div>`}return a}attachPathDotListeners(e){document.querySelectorAll(`[data-discipline="${e}"]`).forEach(i=>{const a=i.dataset.path;i.querySelectorAll(".dot:not(.opacity-50)").forEach(n=>{n.addEventListener("click",()=>{const c=parseInt(n.dataset.value);this.updatePathLevel(e,a,c)})})})}updatePathLevel(e,t,i){e==="necromancy"?this.character.updateNecromancyPathLevel(t,i):this.character.updateThaumaturgyPathLevel(t,i),this.saveToLocalStorage(),this.closePathModal(),this.managePaths(e)}showAddPathDialog(e){const t=e==="necromancy",i=t?this.character.necromancyPaths:this.character.thaumaturgyPaths,a=t?L.paths:S.paths;this.character.disciplines[e];const s=t?"Некромантии":"Тауматургии",n=i.map(u=>u.pathId),c=a.filter(u=>!n.includes(u.id));if(c.length===0){alert("Все пути уже изучены!");return}const r=i.length===0,o=document.createElement("div");o.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50",o.id="pathSelectionModal",o.innerHTML=`
      <div class="bg-vtm-grey rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-vtm-red">Выбрать путь ${s}</h3>
          <button class="text-3xl text-gray-400 hover:text-white" onclick="document.getElementById('pathSelectionModal').remove()">&times;</button>
        </div>

        <div class="mb-4 p-3 bg-gray-800 rounded">
          <div class="text-sm text-gray-400">
            ${r?"<strong>Основной путь:</strong> Уровень будет равен уровню дисциплины":"<strong>Вторичный путь:</strong> Начнётся с уровня 1"}
          </div>
        </div>

        <div class="mb-4">
          <input type="text" id="pathSearch" placeholder="Поиск по названию..."
                 class="input-field" autocomplete="off">
        </div>

        <div id="pathList" class="space-y-2">
          ${c.map(u=>`
            <div class="path-item p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors"
                 data-name="${u.name}"
                 onclick="app.selectPath('${e}', '${u.id}')">
              <div class="font-medium">${u.name}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `,document.body.appendChild(o);const m=document.getElementById("pathSearch");m.addEventListener("input",u=>{const h=u.target.value.toLowerCase();document.querySelectorAll(".path-item").forEach(g=>{const w=g.dataset.name.toLowerCase();g.style.display=w.includes(h)?"block":"none"})}),m.focus()}selectPath(e,t){const i=e==="necromancy",a=i?this.character.necromancyPaths:this.character.thaumaturgyPaths,s=this.character.disciplines[e]||0,c=a.length===0?s:1;i?this.character.addNecromancyPath(t,c):this.character.addThaumaturgyPath(t,c),this.saveToLocalStorage();const r=document.getElementById("pathSelectionModal");r&&r.remove(),this.closePathModal(),this.managePaths(e)}removePath(e,t){confirm("Удалить этот путь?")&&(e==="necromancy"?this.character.removeNecromancyPath(t):this.character.removeThaumaturgyPath(t),this.saveToLocalStorage(),this.closePathModal(),this.managePaths(e))}closePathModal(){const e=document.querySelector(".fixed.inset-0");e&&e.remove(),this.updateAllDisplays()}handleFreebieTypeChange(e){const t=document.getElementById("freebiePurchaseOptions"),i=document.getElementById("freebieCostDisplay"),a=document.getElementById("freebiePurchaseBtn");if(!e){t.innerHTML="",i.classList.add("hidden"),a.classList.add("hidden");return}let s="";if(e==="attribute"?s=`
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
      `:e==="ability"?s=`
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
      `:e==="discipline"?s=`
        <div>
          <label class="block text-sm font-medium mb-1">Дисциплина</label>
          <select id="freebieDiscipline" class="input-field">
            <option value="">Выберите дисциплину</option>
            ${this.allDisciplines.map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}
          </select>
        </div>
      `:e==="background"?s=`
        <div>
          <label class="block text-sm font-medium mb-1">Предыстория</label>
          <select id="freebieBackground" class="input-field">
            <option value="">Выберите предысторию</option>
            ${B.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")}
          </select>
        </div>
      `:e==="virtue"?s=`
        <div>
          <label class="block text-sm font-medium mb-1">Добродетель</label>
          <select id="freebieVirtue" class="input-field">
            <option value="">Выберите добродетель</option>
            <option value="conscience">Совесть</option>
            <option value="selfControl">Самоконтроль</option>
            <option value="courage">Храбрость</option>
          </select>
        </div>
      `:(e==="humanity"||e==="willpower")&&(s=`<div class="text-sm text-gray-400">Выбрано: ${e==="humanity"?"Человечность":"Сила воли"}</div>`),t.innerHTML=s,e==="attribute"){const n=document.getElementById("freebieAttrCategory");n&&n.addEventListener("change",c=>this.showFreebieAttributeList(c.target.value))}else if(e==="ability"){const n=document.getElementById("freebieAbilityCategory");n&&n.addEventListener("change",c=>this.showFreebieAbilityList(c.target.value))}else if(e==="discipline"){const n=document.getElementById("freebieDiscipline");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}else if(e==="background"){const n=document.getElementById("freebieBackground");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}else if(e==="virtue"){const n=document.getElementById("freebieVirtue");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}else(e==="humanity"||e==="willpower")&&this.calculateFreebieCost()}showFreebieAttributeList(e){const t=document.getElementById("freebieAttrSelection");if(!e){t.innerHTML="";return}const i=this.character.attributes[e],a={physical:{strength:"Сила",dexterity:"Ловкость",stamina:"Выносливость"},social:{charisma:"Обаяние",manipulation:"Манипулирование",appearance:"Привлекательность"},mental:{perception:"Восприятие",intelligence:"Интеллект",wits:"Смекалка"}},s=Object.keys(i).map(c=>`<option value="${c}">${a[e][c]} (${i[c]})</option>`).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Атрибут</label>
        <select id="freebieAttribute" class="input-field">
          <option value="">Выберите атрибут</option>
          ${s}
        </select>
      </div>
    `;const n=document.getElementById("freebieAttribute");n&&n.addEventListener("change",()=>this.calculateFreebieCost())}showFreebieAbilityList(e){const t=document.getElementById("freebieAbilitySelection");if(!e){t.innerHTML="";return}const a=k[e].map(n=>{const c=this.character.abilities[e][n.id]||0;return`<option value="${n.id}">${n.name} (${c})</option>`}).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Способность</label>
        <select id="freebieAbility" class="input-field">
          <option value="">Выберите способность</option>
          ${a}
        </select>
      </div>
    `;const s=document.getElementById("freebieAbility");s&&s.addEventListener("change",()=>this.calculateFreebieCost())}calculateFreebieCost(){var o,m,u,h,l,g,w,b;const e=(o=document.getElementById("freebieType"))==null?void 0:o.value;if(!e)return;let t=0,i="",a=!1;if(e==="attribute"){const d=(m=document.getElementById("freebieAttrCategory"))==null?void 0:m.value,v=(u=document.getElementById("freebieAttribute"))==null?void 0:u.value;if(d&&v){const x=this.character.attributes[d][v];t=f.attribute,i=`Текущее значение: ${x}, новое: ${x+1}`,a=x<10}}else if(e==="ability"){const d=(h=document.getElementById("freebieAbilityCategory"))==null?void 0:h.value,v=(l=document.getElementById("freebieAbility"))==null?void 0:l.value;if(d&&v){const x=this.character.abilities[d][v]||0;t=f.ability,i=`Текущее значение: ${x}, новое: ${x+1}`,a=x<10}}else if(e==="discipline"){const d=(g=document.getElementById("freebieDiscipline"))==null?void 0:g.value;if(d){const v=this.character.disciplines[d]||0;t=f.discipline,i=`Текущее значение: ${v}, новое: ${v+1}`,a=v<10}}else if(e==="background"){const d=(w=document.getElementById("freebieBackground"))==null?void 0:w.value;if(d){const v=this.character.backgrounds[d]||0;t=f.background,i=`Текущее значение: ${v}, новое: ${v+1}`,a=v<5}}else if(e==="virtue"){const d=(b=document.getElementById("freebieVirtue"))==null?void 0:b.value;if(d){const v=this.character.virtues[d];t=f.virtue,i=`Текущее значение: ${v}, новое: ${v+1}`,a=v<10}}else if(e==="humanity"){const d=this.character.humanity;t=f.humanity,i=`Текущее значение: ${d}, новое: ${d+1}`,a=d<10}else if(e==="willpower"){const d=this.character.willpower;t=f.willpower,i=`Текущее значение: ${d}, новое: ${d+1}`,a=d<10}const s=document.getElementById("freebieCostDisplay"),n=document.getElementById("freebieCostAmount"),c=document.getElementById("freebieCostDetails"),r=document.getElementById("freebiePurchaseBtn");if(t>0&&a){n.textContent=t,c.textContent=i,s.classList.remove("hidden"),r.classList.remove("hidden");const d=this.character.freebies-this.character.freebiesSpent;t>d?(r.disabled=!0,r.textContent=`Недостаточно бонусных очков (нужно ${t}, есть ${d})`):(r.disabled=!1,r.textContent="Купить")}else s.classList.add("hidden"),r.classList.add("hidden")}handleFreebiePurchase(){var a,s,n,c,r,o,m,u,h;const e=(a=document.getElementById("freebieType"))==null?void 0:a.value;if(!e)return;const t=parseInt(((s=document.getElementById("freebieCostAmount"))==null?void 0:s.textContent)||"0"),i=this.character.freebies-this.character.freebiesSpent;if(t>i){alert("Недостаточно бонусных очков!");return}if(e==="attribute"){const l=(n=document.getElementById("freebieAttrCategory"))==null?void 0:n.value,g=(c=document.getElementById("freebieAttribute"))==null?void 0:c.value;l&&g&&(this.character.attributes[l][g]++,this.character.freebiesSpent+=t)}else if(e==="ability"){const l=(r=document.getElementById("freebieAbilityCategory"))==null?void 0:r.value,g=(o=document.getElementById("freebieAbility"))==null?void 0:o.value;l&&g&&(this.character.abilities[l][g]||(this.character.abilities[l][g]=0),this.character.abilities[l][g]++,this.character.freebiesSpent+=t)}else if(e==="discipline"){const l=(m=document.getElementById("freebieDiscipline"))==null?void 0:m.value;l&&(this.character.disciplines[l]||(this.character.disciplines[l]=0),this.character.disciplines[l]++,this.character.freebiesSpent+=t)}else if(e==="background"){const l=(u=document.getElementById("freebieBackground"))==null?void 0:u.value;l&&(this.character.backgrounds[l]||(this.character.backgrounds[l]=0),this.character.backgrounds[l]++,this.character.freebiesSpent+=t)}else if(e==="virtue"){const l=(h=document.getElementById("freebieVirtue"))==null?void 0:h.value;l&&(this.character.virtues[l]++,this.character.freebiesSpent+=t)}else e==="humanity"?(this.character.humanity++,this.character.freebiesSpent+=t):e==="willpower"&&(this.character.willpower++,this.character.freebiesSpent+=t);this.saveToLocalStorage(),this.render(),this.attachEventListeners(),this.updateAllDisplays(),alert(`Куплено за ${t} бонусных очков!`)}handleXPTypeChange(e){const t=document.getElementById("xpPurchaseOptions"),i=document.getElementById("xpCostDisplay"),a=document.getElementById("xpPurchaseBtn");if(!e){t.innerHTML="",i.classList.add("hidden"),a.classList.add("hidden");return}let s="";if(e==="attribute"?s=`
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
      `:e==="ability"?s=`
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
      `:e==="discipline"?s=`
        <div>
          <label class="block text-sm font-medium mb-1">Дисциплина</label>
          <select id="xpDiscipline" class="input-field">
            <option value="">Выберите дисциплину</option>
            ${this.allDisciplines.map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}
          </select>
        </div>
      `:e==="virtue"?s=`
        <div>
          <label class="block text-sm font-medium mb-1">Добродетель</label>
          <select id="xpVirtue" class="input-field">
            <option value="">Выберите добродетель</option>
            <option value="conscience">Совесть</option>
            <option value="selfControl">Самоконтроль</option>
            <option value="courage">Храбрость</option>
          </select>
        </div>
      `:(e==="humanity"||e==="willpower")&&(s=`<div class="text-sm text-gray-400">Выбрано: ${e==="humanity"?"Человечность":"Сила воли"}</div>`),t.innerHTML=s,e==="attribute"){const n=document.getElementById("xpAttrCategory");n&&n.addEventListener("change",c=>this.showXPAttributeList(c.target.value))}else if(e==="ability"){const n=document.getElementById("xpAbilityCategory");n&&n.addEventListener("change",c=>this.showXPAbilityList(c.target.value))}else if(e==="discipline"){const n=document.getElementById("xpDiscipline");n&&n.addEventListener("change",()=>this.calculateXPCost())}else if(e==="virtue"){const n=document.getElementById("xpVirtue");n&&n.addEventListener("change",()=>this.calculateXPCost())}else(e==="humanity"||e==="willpower")&&this.calculateXPCost()}showXPAttributeList(e){const t=document.getElementById("xpAttrSelection");if(!e){t.innerHTML="";return}const i=this.character.attributes[e],a={physical:{strength:"Сила",dexterity:"Ловкость",stamina:"Выносливость"},social:{charisma:"Обаяние",manipulation:"Манипулирование",appearance:"Привлекательность"},mental:{perception:"Восприятие",intelligence:"Интеллект",wits:"Смекалка"}},s=Object.keys(i).map(c=>`<option value="${c}">${a[e][c]} (${i[c]})</option>`).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Атрибут</label>
        <select id="xpAttribute" class="input-field">
          <option value="">Выберите атрибут</option>
          ${s}
        </select>
      </div>
    `;const n=document.getElementById("xpAttribute");n&&n.addEventListener("change",()=>this.calculateXPCost())}showXPAbilityList(e){const t=document.getElementById("xpAbilitySelection");if(!e){t.innerHTML="";return}const a=k[e].map(n=>{const c=this.character.abilities[e][n.id]||0;return`<option value="${n.id}">${n.name} (${c})</option>`}).join("");t.innerHTML=`
      <div>
        <label class="block text-sm font-medium mb-1">Способность</label>
        <select id="xpAbility" class="input-field">
          <option value="">Выберите способность</option>
          ${a}
        </select>
      </div>
    `;const s=document.getElementById("xpAbility");s&&s.addEventListener("change",()=>this.calculateXPCost())}calculateXPCost(){var o,m,u,h,l,g,w;const e=(o=document.getElementById("xpType"))==null?void 0:o.value;if(!e)return;let t=0,i="",a=!1;if(e==="attribute"){const b=(m=document.getElementById("xpAttrCategory"))==null?void 0:m.value,d=(u=document.getElementById("xpAttribute"))==null?void 0:u.value;if(b&&d){const v=this.character.attributes[b][d];t=v*4,i=`Текущее значение: ${v}, новое: ${v+1}`,a=v<10}}else if(e==="ability"){const b=(h=document.getElementById("xpAbilityCategory"))==null?void 0:h.value,d=(l=document.getElementById("xpAbility"))==null?void 0:l.value;if(b&&d){const v=this.character.abilities[b][d]||0;t=v===0?3:v*2,i=v===0?"Новая способность":`Текущее значение: ${v}, новое: ${v+1}`,a=v<10}}else if(e==="discipline"){const b=(g=document.getElementById("xpDiscipline"))==null?void 0:g.value;if(b){const d=this.character.disciplines[b]||0,v=this.allDisciplines.find(P=>P.id===b),x=_.find(P=>P.id===this.character.clan),M=x&&x.disciplines.includes(b),j=this.character.clan==="caitiff";d===0?(t=10,i="Новая дисциплина"):j?(t=d*6,i=`Каитифф: текущее × 6 = ${d} × 6`):M?v.category==="physical"?(t=d*5,i=`Физическая (клановая): текущее × 5 = ${d} × 5`):v.category==="mental"?(t=d*6,i=`Ментальная (клановая): текущее × 6 = ${d} × 6`):(t=d*7,i=`Уникальная (клановая): текущее × 7 = ${d} × 7`):(t=d*10,i=`Сторонняя дисциплина: текущее × 10 = ${d} × 10`),a=d<10}}else if(e==="virtue"){const b=(w=document.getElementById("xpVirtue"))==null?void 0:w.value;if(b){const d=this.character.virtues[b];t=d*2,i=`Текущее значение: ${d}, новое: ${d+1}`,a=d<10}}else if(e==="humanity"){const b=this.character.humanity;t=b*2,i=`Текущее значение: ${b}, новое: ${b+1}`,a=b<10}else if(e==="willpower"){const b=this.character.willpower;t=b,i=`Текущее значение: ${b}, новое: ${b+1}`,a=b<10}const s=document.getElementById("xpCostDisplay"),n=document.getElementById("xpCostAmount"),c=document.getElementById("xpCostDetails"),r=document.getElementById("xpPurchaseBtn");if(t>0&&a){n.textContent=t,c.textContent=i,s.classList.remove("hidden"),r.classList.remove("hidden");const b=this.character.experience-this.character.experienceSpent;t>b?(r.disabled=!0,r.textContent=`Недостаточно XP (нужно ${t}, есть ${b})`):(r.disabled=!1,r.textContent="Купить")}else s.classList.add("hidden"),r.classList.add("hidden")}handleXPPurchase(){var a,s,n,c,r,o,m,u;const e=(a=document.getElementById("xpType"))==null?void 0:a.value;if(!e)return;const t=parseInt(((s=document.getElementById("xpCostAmount"))==null?void 0:s.textContent)||"0"),i=this.character.experience-this.character.experienceSpent;if(t>i){alert("Недостаточно опыта!");return}if(e==="attribute"){const h=(n=document.getElementById("xpAttrCategory"))==null?void 0:n.value,l=(c=document.getElementById("xpAttribute"))==null?void 0:c.value;h&&l&&(this.character.attributes[h][l]++,this.character.experienceSpent+=t)}else if(e==="ability"){const h=(r=document.getElementById("xpAbilityCategory"))==null?void 0:r.value,l=(o=document.getElementById("xpAbility"))==null?void 0:o.value;h&&l&&(this.character.abilities[h][l]||(this.character.abilities[h][l]=0),this.character.abilities[h][l]++,this.character.experienceSpent+=t)}else if(e==="discipline"){const h=(m=document.getElementById("xpDiscipline"))==null?void 0:m.value;h&&(this.character.disciplines[h]||(this.character.disciplines[h]=0),this.character.disciplines[h]++,this.character.experienceSpent+=t)}else if(e==="virtue"){const h=(u=document.getElementById("xpVirtue"))==null?void 0:u.value;h&&(this.character.virtues[h]++,this.character.experienceSpent+=t)}else e==="humanity"?(this.character.humanity++,this.character.experienceSpent+=t):e==="willpower"&&(this.character.willpower++,this.character.experienceSpent+=t);this.saveToLocalStorage(),this.render(),this.attachEventListeners(),this.updateAllDisplays(),alert(`Куплено за ${t} XP!`)}saveToLocalStorage(){localStorage.setItem("vtm_character",this.character.toJSON())}loadFromLocalStorage(){const e=localStorage.getItem("vtm_character");e&&(this.character=C.fromJSON(e),this.tracker=new E(this.character))}saveCharacter(){const e=this.character.toJSON(),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),a=document.createElement("a");a.href=i,a.download=`${this.character.name||"персонаж"}.json`,a.click()}loadCharacter(){const e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=t=>{const i=t.target.files[0],a=new FileReader;a.onload=s=>{this.character=C.fromJSON(s.target.result),this.tracker=new E(this.character),this.render(),this.attachEventListeners()},a.readAsText(i)},e.click()}exportToPDF(){alert("Экспорт в PDF будет реализован позже. Пока используйте функцию печати браузера.")}}let I;document.addEventListener("DOMContentLoaded",()=>{I=new ie,window.app=I});
