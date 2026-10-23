/* Общие части прототипа: шапка, подвал, поиск, мобильное меню, выбор аудитории, движение. */

const MOTION = !matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Английская версия: страница с <html lang="en"> получает английские шапку, подвал и подписи */
const EN = document.documentElement.lang === 'en';
const NAV_EN = [['How to apply', 'en.html#apply'], ['Programs', 'en.html#programs'], ['Living in Ekaterinburg', 'en.html#living'], ['Contacts', 'en.html#contacts']];
const T = EN ? {
  skip: 'Skip to content', home: 'Ural Federal University, home page', menu: 'Main menu', search: 'Search', searchLabel: 'Search the site', a11y: 'Low vision version',
  a11yBox: 'Low vision settings', a11yReset: 'Standard version', cabinet: 'Personal account', openMenu: 'Open menu', closeMenu: 'Close menu', find: 'Search the site',
  bot: 'AI assistant', closeSearch: 'Close search', placeholder: 'Program, document, service', what: 'What are you looking for', hint: 'Arrows to choose, Enter to open, Esc to close',
} : {
  skip: 'Перейти к содержимому', home: 'Уральский федеральный университет, на главную', menu: 'Основное меню', search: 'Поиск', searchLabel: 'Поиск по сайту', a11y: 'Версия для слабовидящих',
  a11yBox: 'Настройки для слабовидящих', a11yReset: 'Обычная версия', cabinet: 'Личный кабинет', openMenu: 'Открыть меню', closeMenu: 'Закрыть меню', find: 'Найти на сайте',
  bot: 'ИИ-помощник', closeSearch: 'Закрыть поиск', placeholder: 'Программа, документ, сервис', what: 'Что вы ищете', hint: 'Стрелки для выбора, Enter чтобы открыть, Esc чтобы закрыть',
};

const NAV = [
  ['Поступление', 'postuplenie.html'],
  ['Программы', 'katalog.html'],
  ['Студенту', 'studentu.html'],
  ['Наука', 'nauka.html'],
  ['Университет', 'universitet.html'],
];

/* Куда ведут пункты выпадающих панелей, если для них уже есть страница */
/* Куда ведут пункты меню. Если ответ есть в прототипе — на нужный блок страницы, иначе на действующую страницу urfu.ru */
const HREF = {
  'Бакалавриат и специалитет': 'postuplenie.html#bak', 'Магистратура': 'postuplenie.html#mag', 'Аспирантура': 'postuplenie.html#asp',
  'Колледж': 'postuplenie.html#spo', 'Иностранным гражданам': 'postuplenie.html#intl', 'Календарь приёма': 'postuplenie.html#kalendar',
  'Калькулятор ЕГЭ': 'https://calcege.my1.urfu.ru/', 'Олимпиады': 'https://urfu.ru/ru/school/olympiad/', 'Дни открытых дверей': 'postuplenie.html#dod',
  'Подготовительные курсы': 'https://urfu.ru/ru/school/podgotovitelnye-kursy/', 'Как подать онлайн': 'https://urfu.ru/ru/applicant/docs-abiturient/gosuslugi-guide/',
  'Списки поступающих': 'https://urfu.ru/ru/alpha/full/', 'Стоимость обучения': 'https://urfu.ru/ru/applicant/docs-abiturient/stoimost-obuchenija/',
  'Все программы': 'katalog.html', 'По предметам ЕГЭ': 'katalog.html#ege', 'Очно-заочно и заочно': 'katalog.html?form=pt', 'Программы на английском': 'katalog.html?lang=en',
  'Институты': 'instituty.html', 'Филиалы': 'instituty.html#filialy',
  'Дополнительное образование': 'https://urfu.ru/ru/education/dpo/', 'Бизнес-школа': 'https://urfu.ru/ru/alumni/biznes-shkola/', 'Повышение квалификации': 'https://urfu.ru/ru/education/dpo/',
  'Расписание': 'https://urfu.ru/ru/students/study/schedule/', 'Личный кабинет': 'kabinet.html', 'Баллы БРС': 'https://urfu.ru/ru/students/study/brs-rating/',
  'Библиотека': 'http://lib.urfu.ru/', 'Справки': 'https://urfu.ru/ru/students/documents/', 'Стипендии': 'https://urfu.ru/ru/students/study/scholarships/',
  'Оплата обучения': 'https://urfu.ru/ru/applicant/docs-abiturient/stoimost-obuchenija/',
  'Общежития': 'kampus.html#obshchezhitiya', 'Спорт': 'https://urfu.ru/ru/sports/',
  'Творчество': 'https://urfu.ru/ru/students/leisure/oso/tvorchestvo/', 'Центр карьеры': 'http://career.urfu.ru',
  'Направления и лаборатории': 'nauka.html#napravleniya', 'Прорывные проекты': 'nauka.html#proekty', 'Заказать исследование': 'nauka.html#zakaz',
  'Конкурсы и гранты': 'https://urfu.ru/ru/science/grants/', 'Молодёжная наука': 'http://youthscience.urfu.ru/ru/', 'Аспирантура и защита': 'nauka.html#put',
  'Журналы и издательство': 'https://urfu.ru/ru/science/scientific-journals/', 'Выплаты за статьи': 'https://urfu.ru/ru/science/stimul-pablik/', 'Научная библиотека': 'http://lib.urfu.ru/',
  'История': 'universitet.html#istoriya', 'Университет в цифрах': 'universitet.html#cifry', 'Руководство и структура': 'universitet.html#rukovodstvo',
  'Новый кампус': 'https://campus.urfu.ru', 'Карта корпусов': 'kampus.html', 'Музеи': 'https://urfu.ru/ru/about/online-museum/museum/',
  'Рейтинги': 'universitet.html#reitingi', 'Документы и сведения': 'dokumenty.html', 'Контакты': 'pomoshch.html', 'ИИ-помощник': 'pomoshnik.html',
};

/* Выпадающие панели главного меню: колонки по задачам, а не по оргструктуре */
const MEGA = {
  'Поступление': [
    ['Уровень', ['Бакалавриат и специалитет', 'Магистратура', 'Аспирантура', 'Колледж', 'Иностранным гражданам']],
    ['Подготовиться', ['Калькулятор ЕГЭ', 'Олимпиады', 'Дни открытых дверей', 'Подготовительные курсы']],
    ['Подать документы', ['Календарь приёма', 'Как подать онлайн', 'Списки поступающих', 'Стоимость обучения']],
  ],
  'Программы': [
    ['Каталог', ['Все программы', 'По предметам ЕГЭ', 'Очно-заочно и заочно', 'Программы на английском']],
    ['Где учиться', ['Институты', 'Филиалы', 'Колледж']],
    ['После диплома', ['Дополнительное образование', 'Бизнес-школа', 'Повышение квалификации']],
  ],
  'Студенту': [
    ['Каждый день', ['Расписание', 'Личный кабинет', 'Баллы БРС', 'Библиотека']],
    ['Документы и деньги', ['Справки', 'Стипендии', 'Оплата обучения']],
    ['Жизнь в УрФУ', ['Общежития', 'Спорт', 'Творчество', 'Центр карьеры']],
  ],
  'Наука': [
    ['Исследования', ['Направления и лаборатории', 'Прорывные проекты', 'Заказать исследование']],
    ['Участвовать', ['Конкурсы и гранты', 'Молодёжная наука', 'Аспирантура и защита']],
    ['Публикации', ['Журналы и издательство', 'Выплаты за статьи', 'Научная библиотека']],
  ],
  'Университет': [
    ['Об УрФУ', ['История', 'Университет в цифрах', 'Руководство и структура']],
    ['Кампус', ['Новый кампус', 'Карта корпусов', 'Музеи']],
    ['Открытость', ['Рейтинги', 'Документы и сведения', 'Контакты', 'ИИ-помощник']],
  ],
};

const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};

/* Знак «Путь и точка»: буква У, хвост которой становится дорогой, и точка «вы здесь».
   mode: 'color' (синий + солнечная точка), 'white', 'mono' (currentColor). */
function SIGN(mode = 'color', cls = '') {
  const s = mode === 'white' ? '#fff' : mode === 'mono' ? 'currentColor' : '#1E4391';
  const d = mode === 'color' ? 'url(#sign-sun)' : s;
  return `<svg class="sign-svg ${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <defs><radialGradient id="sign-sun" cx="35%" cy="32%" r="85%"><stop offset="0" stop-color="#D22D7C"/><stop offset=".45" stop-color="#D02E2D"/><stop offset=".8" stop-color="#E69838"/><stop offset="1" stop-color="#FCEC4F"/></radialGradient></defs>
    <g fill="none" stroke="${s}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
      <path class="sign-a" pathLength="1" d="M18 10 L61 55"/>
      <path class="sign-b" pathLength="1" d="M84 10 L51 74 Q44 88 31 88"/>
    </g>
    <circle class="sign-dot" cx="13" cy="88" r="8" fill="${d}"/>
  </svg>`;
}
/* text: своя подпись в три строки (для институтов знак общий, меняется только подпись) */
function LOCKUP(mode = 'color', lang = 'ru', text) {
  const t = text || (lang === 'en' ? 'Ural<br>Federal<br>University' : 'Уральский<br>федеральный<br>университет');
  return `<span class="lockup lockup--${mode}">${SIGN(mode)}<span class="lockup__t"${lang === 'en' ? ' lang="en"' : ''}>${t}</span></span>`;
}

/* Версия для слабовидящих (по ГОСТ Р 52872): размер текста, цвет, картинки, интервал.
   Настройки — атрибуты на <html>, хранятся в localStorage и применяются на каждой странице. */
const A11Y = EN ? [
  ['size', 'Text size', [['1', 'A'], ['2', 'A+'], ['3', 'A++']]],
  ['scheme', 'Colours', [['', 'Standard'], ['bw', 'Black and white'], ['dark', 'White on black']]],
  ['img', 'Images', [['', 'Show'], ['off', 'Hide']]],
  ['space', 'Spacing', [['', 'Standard'], ['wide', 'Wide']]],
] : [
  ['size', 'Размер текста', [['1', 'А'], ['2', 'А+'], ['3', 'А++']]],
  ['scheme', 'Цвет', [['', 'Обычный'], ['bw', 'Чёрно-белый'], ['dark', 'Белым на чёрном']]],
  ['img', 'Картинки', [['', 'Показать'], ['off', 'Скрыть']]],
  ['space', 'Интервал', [['', 'Обычный'], ['wide', 'Увеличенный']]],
];
const a11yGet = () => { try { return JSON.parse(localStorage.getItem('urfu-a11y')) || {}; } catch { return {}; } };
function a11yApply(st) {
  const r = document.documentElement;
  for (const [k] of A11Y) { if (st[k] && st[k] !== '1') r.dataset['a11y' + k] = st[k]; else delete r.dataset['a11y' + k]; }
  document.querySelectorAll('[data-a11y]').forEach((b) => b.setAttribute('aria-pressed', (st[b.dataset.a11y] || (b.dataset.a11y === 'size' ? '1' : '')) === b.dataset.v));
}
a11yApply(a11yGet());
function initA11y() {
  const btn = document.querySelector('[data-a11y-open]'), box = document.getElementById('a11y');
  let st = a11yGet();
  const save = () => { a11yApply(st); try { localStorage.setItem('urfu-a11y', JSON.stringify(st)); } catch {} };
  const open = (on) => { box.hidden = !on; btn.setAttribute('aria-expanded', on); };
  open(Object.keys(st).some((k) => st[k] && st[k] !== '1'));
  btn.addEventListener('click', () => open(box.hidden));
  box.querySelectorAll('[data-a11y]').forEach((b) => b.addEventListener('click', () => { st[b.dataset.a11y] = b.dataset.v; save(); }));
  box.querySelector('[data-a11y-reset]').addEventListener('click', () => { st = {}; save(); open(false); btn.focus(); });
  a11yApply(st);
}

function header() {
  return `
  <a class="skip" href="#main">${T.skip}</a>
  <header class="header" id="top" data-here="${document.body.dataset.page || ''}">
    <div class="wrap header__in">
      <a class="logo" href="${EN ? 'en.html' : 'index.html'}" aria-label="${T.home}">${LOCKUP('color', EN ? 'en' : 'ru')}</a>
      <nav class="nav" aria-label="${T.menu}"><ul class="nav__list">${EN ? NAV_EN.map(([t, h]) => `<li class="nav__item"><a class="nav__btn" href="${h}">${t}</a></li>`).join('') : NAV.map(([t, h], i) => `
        <li class="nav__item">
          <button class="nav__btn" type="button" aria-expanded="false" aria-controls="mega-${i}"${document.body.dataset.page === t ? ' data-here' : ''}>${t}<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
          <div class="mega" id="mega-${i}" hidden><div class="wrap mega__in">
            ${MEGA[t].map(([g, links]) => `<div><p class="mega__h">${g}</p><ul>${links.map((l) => `<li><a href="${HREF[l] || h}">${l}</a></li>`).join('')}</ul></div>`).join('')}
            <a class="mega__all" href="${h}">Весь раздел «${t}»</a>
          </div></div>
        </li>`).join('')}</ul></nav>
      <div class="tools">
        ${EN ? '' : `<button class="tool" type="button" data-search-open aria-label="${T.searchLabel}">${ICON.search}<span class="tool--wide">${T.search}</span><kbd>/</kbd></button>`}
        ${EN ? '<a class="tool tool--wide" href="index.html" lang="ru" title="Русская версия">RU</a>' : '<a class="tool tool--wide" href="en.html" lang="en" title="English version">EN</a>'}
        <button class="tool" type="button" data-a11y-open aria-label="${T.a11y}" aria-expanded="false" aria-controls="a11y">${ICON.eye}</button>
        ${EN ? '' : `<a class="tool" href="kabinet.html" aria-label="${T.cabinet}">${ICON.user}<span class="tool--wide">Кабинет</span></a>`}
        <button class="tool menu-btn" type="button" data-menu-open aria-label="${T.openMenu}">${ICON.menu}</button>
      </div>
    </div>
    <div class="a11y" id="a11y" role="region" aria-label="${T.a11yBox}" hidden>
      <div class="wrap a11y__in">${A11Y.map(([k, name, opts]) => `<div class="a11y__g" role="group" aria-label="${name}"><span>${name}</span>${opts.map(([v, t]) => `<button class="chip" type="button" data-a11y="${k}" data-v="${v}">${t}</button>`).join('')}</div>`).join('')}
        <button class="chip a11y__x" type="button" data-a11y-reset>${T.a11yReset}</button>
      </div>
    </div>
    <div class="progress" aria-hidden="true"><i></i></div>
  </header>
  <div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="${T.menu}">
    <div class="drawer__top">${LOCKUP('color', EN ? 'en' : 'ru')}<button class="tool" type="button" data-menu-close aria-label="${T.closeMenu}">${ICON.close}</button></div>
    <nav aria-label="${T.menu}">${(EN ? NAV_EN : NAV).map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
    <div class="drawer__extra">${EN ? `
      <a class="btn btn--blue" href="mailto:admission@urfu.ru">admission@urfu.ru</a>
      <a class="btn btn--ghost" href="index.html" lang="ru">Русская версия</a>` : `
      <button class="btn btn--blue" type="button" data-search-open>${ICON.search} Найти на сайте</button>
      <a class="btn btn--ghost" href="pomoshnik.html">ИИ-помощник</a>
      <a class="btn btn--ghost" href="kabinet.html">Личный кабинет</a>
      <a class="btn btn--ghost" href="en.html" lang="en">English</a>`}
    </div>
  </div>
  <div class="search" id="search" role="dialog" aria-modal="true" aria-label="Поиск по сайту">
    <div class="search__box">
      <div class="search__field">${ICON.search}
        <input class="search__input" type="search" placeholder="${T.placeholder}" aria-label="${T.what}" autocomplete="off">
        <button class="tool" type="button" data-search-close aria-label="${T.closeSearch}">${ICON.close}</button>
      </div>
      <div class="search__results" aria-live="polite"></div>
      <div class="search__hint">${T.hint}</div>
    </div>
  </div>`;
}

function footer() {
  if (EN) return `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <div class="footer__logo" role="img" aria-label="Ural Federal University">${LOCKUP('white', 'en')}</div>
          <a class="footer__phone" href="tel:+73433754627">+7 343 375-46-27</a>
          <p style="margin-top:6px;color:rgba(255,255,255,.8)">Admission office for international students</p>
          <p style="margin-top:16px"><a href="mailto:admission@urfu.ru">admission@urfu.ru</a></p>
          <p style="margin-top:6px;color:rgba(255,255,255,.8)">19 Mira St., Ekaterinburg, Russia</p>
        </div>
        <div><p class="footer__head">Apply</p><ul>
          <li><a href="en.html#apply">How to apply</a></li><li><a href="en.html#programs">Programs and fees</a></li><li><a href="https://rfl.urfu.ru/en/">Preparatory department</a></li><li><a href="https://studyinrussia.ru/">Study in Russia portal</a></li></ul></div>
        <div><p class="footer__head">Arrival</p><ul>
          <li><a href="https://urfu.ru/en/international/information-for-prospective-international-students/application-information/arrival-form/">Arrival form</a></li><li><a href="en.html#living">First steps in Ekaterinburg</a></li><li><a href="kampus.html" lang="ru">Campus map (in Russian)</a></li></ul></div>
        <div><p class="footer__head">Follow</p><ul>
          <li><a href="https://telegram.me/urfu_international">Telegram</a></li><li><a href="https://vk.com/adaptationurfu">Adaptation Centre on VK</a></li></ul></div>
        <div><p class="footer__head">Language</p><ul>
          <li><a href="index.html" lang="ru">Русская версия</a></li></ul></div>
      </div>
      <div class="footer__bottom">
        <span>© Ural Federal University named after the first President of Russia B. N. Yeltsin</span>
      </div>
      <p class="footer__author">Competition entry “Hack the University Web Design”. Concept by Timofey Kazakov</p>
    </div>
  </footer>`;
  return `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <div class="footer__logo" role="img" aria-label="Уральский федеральный университет">${LOCKUP('white')}</div>
          <a class="footer__phone" href="tel:88001005044">8 800 100-50-44</a>
          <p style="margin-top:6px;color:rgba(255,255,255,.8)">Контакт-центр, звонок по России бесплатный</p>
          <p style="margin-top:16px"><a href="mailto:contact@urfu.ru">contact@urfu.ru</a></p>
          <p style="margin-top:6px;color:rgba(255,255,255,.8)">Екатеринбург, ул. Мира, 19</p>
        </div>
        <div><p class="footer__head">Поступающим</p><ul>
          <li><a href="postuplenie.html#bak">Бакалавриат и специалитет</a></li><li><a href="postuplenie.html#mag">Магистратура</a></li><li><a href="postuplenie.html#asp">Аспирантура</a></li><li><a href="postuplenie.html#intl">Иностранным абитуриентам</a></li><li><a href="pomoshch.html#vopros">Приёмная комиссия</a></li></ul></div>
        <div><p class="footer__head">Сообществу</p><ul>
          <li><a href="https://urfu.ru/ru/staff/">Сотрудникам</a></li><li><a href="https://alumni.urfu.ru/ru/">Выпускникам</a></li><li><a href="https://urfu.ru/ru/partners/">Партнёрам и работодателям</a></li><li><a href="https://urfu.ru/ru/media/">Прессе</a></li><li><a href="https://endowment.urfu.ru/">Поддержать университет</a></li></ul></div>
        <div><p class="footer__head">Документы и сведения</p><ul>
          <li><a href="dokumenty.html">Сведения об образовательной организации</a></li><li><a href="https://security.urfu.ru/ru/anti-corruption/">Противодействие коррупции</a></li><li><a href="https://urfu.ru/about/administration-facilities/requests/">Закупки</a></li><li><a href="https://urfu.ru/ru/appeal/">Обращения граждан</a></li></ul></div>
        <div><p class="footer__head">Мы в сети</p><ul>
          <li><a href="https://vk.ru/ural.federal.university">ВКонтакте</a></li><li><a href="https://telegram.me/urfu_ru">Telegram</a></li><li><a href="https://rutube.ru/channel/24348692">Rutube</a></li><li><a href="https://apps.rustore.ru/app/com.ustasapp">Приложение «УрФУ.Учёба»</a></li></ul></div>
      </div>
      <div class="footer__bottom">
        <span>© ФГАОУ ВО «УрФУ имени первого Президента России Б. Н. Ельцина»</span>
        <a href="pomoshnik.html">ИИ-помощник</a><a href="pomoshch.html">Помощь и контакты</a><a href="brand.html">Знак и фирменный стиль</a><a href="mailto:site@urfu.ru">Нашли ошибку? site@urfu.ru</a>
      </div>
      <p class="footer__author">Конкурсная работа «Взломай веб-дизайн университета». Автор концепции: Казаков Тимофей</p>
    </div>
  </footer>`;
}

/* Поисковый индекс: реальные разделы и сервисы, собранные при аудите сайта */
const INDEX = [
  ['Программы', 'Каталог программ бакалавриата и специалитета', 'Поиск и фильтры по уровню, институту, форме'],
  ['Программы', 'Каталог программ магистратуры', 'Магистратура'],
  ['Программы', 'Программная инженерия', 'Бакалавриат, ИРИТ-РтФ'],
  ['Программы', 'Журналистика', 'Бакалавриат, УГИ'],
  ['Программы', 'Прикладная информатика', 'Бакалавриат'],
  ['Программы', 'Промышленное и гражданское строительство', 'Бакалавриат, ИСА'],
  ['Поступление', 'Правила приёма', 'Документ'],
  ['Поступление', 'Стоимость обучения', 'Бакалавриат, магистратура'],
  ['Поступление', 'Калькулятор ЕГЭ', 'Сервис'],
  ['Поступление', 'Календарь приёма', 'Сроки'],
  ['Поступление', 'Списки поступающих', 'Сервис'],
  ['Поступление', 'Дни открытых дверей', '23–30 января'],
  ['Поступление', 'Как поступить через Госуслуги', 'Инструкция'],
  ['Поступление', 'Целевое обучение', 'Бакалавриат'],
  ['Поступление', 'Олимпиада «Изумруд»', 'Школьникам'],
  ['Студенту', 'Расписание занятий', 'Сервис'],
  ['Студенту', 'Личный кабинет студента', 'Сервис', 'kabinet.html'],
  ['Студенту', 'Баллы БРС', 'Сервис'],
  ['Студенту', 'Стипендии и стипендиаты', 'Студенту'],
  ['Студенту', 'Поселение в общежитие', 'Сроки 2026 года, как заселиться, комиссии институтов', 'kampus.html#obshchezhitiya'],
  ['Студенту', 'Где аудитория', 'Корпус и адрес по коду из расписания', 'kampus.html#auditoriya'],
  ['Университет', 'Адреса общежитий', '16 общежитий и кампус «Новокольцовский»', 'kampus.html#obshchezhitiya'],
  ['Университет', 'Учебные корпуса и адреса', 'Карта корпусов', 'kampus.html'],
  ['Студенту', 'Справки и документы', 'Документы и финансы'],
  ['Студенту', 'Практика', 'Учёба'],
  ['Студенту', 'Воинский учёт и отсрочка', 'Студенту'],
  ['Студенту', 'Зональная научная библиотека', 'Учёба'],
  ['Университет', 'Институты', '13 институтов', 'instituty.html'],
  ['Университет', 'Контакты и схема корпусов', 'Помощь', 'pomoshch.html'],
  ['Университет', 'Ректорат', 'Руководство', 'universitet.html#rukovodstvo'],
  ['Университет', 'Новый кампус', 'Проект', 'universitet.html#kampus'],
  ['Университет', 'Сведения об образовательной организации', 'Документы', 'dokumenty.html'],
  ['Наука', 'Конкурсы и гранты', 'Наука', 'nauka.html#chasto'],
  ['Наука', 'Диссертационные советы', 'Наука', 'nauka.html#put'],
  ['Наука', 'Заказать исследование в центре коллективного пользования', 'Предприятиям', 'nauka.html#zakaz'],
  ['Наука', 'Лаборатории и направления исследований', '164 лаборатории', 'nauka.html#napravleniya'],
  ['Наука', 'Прорывные научные проекты', 'Мегапроекты', 'nauka.html#proekty'],
  ['Университет', 'История университета', 'С 1920 года', 'universitet.html#istoriya'],
  ['Университет', 'Университет в цифрах', 'Студенты, корпуса, лаборатории', 'universitet.html#cifry'],
  ['Университет', 'Позиции в рейтингах', 'QS, Forbes, RAEX', 'universitet.html#reitingi'],
  ['Университет', 'Платные образовательные услуги', 'Документы', 'dokumenty.html'],
  ['Университет', 'Стипендии и меры поддержки', 'Документы', 'dokumenty.html'],
  ['Университет', 'Закупки', 'Документы', 'dokumenty.html'],
  ['Помощь', 'Контакты контакт-центра', '8 800 100-50-44', 'pomoshch.html'],
  ['Помощь', 'Задать вопрос университету', 'Форма по темам', 'pomoshch.html#vopros'],
  ['Помощь', 'Контакты приёмной комиссии', 'График работы', 'pomoshch.html#priem'],
  ['Помощь', 'ИИ-помощник', 'Ответы со ссылкой на источник', 'pomoshnik.html'],
  ['Помощь', 'Техническая поддержка', 'support@urfu.ru', 'pomoshch.html'],
  ['Наука', 'Научные журналы', 'Наука', 'nauka.html#publikacii'],
];

/* Куда ведёт результат без своей ссылки: на страницу раздела */
const SECTION_PAGE = { 'Программы': 'katalog.html', 'Поступление': 'postuplenie.html', 'Студенту': 'studentu.html', 'Университет': 'universitet.html', 'Наука': 'nauka.html', 'Помощь': 'pomoshch.html' };

/* Поиск по разделам: слова запроса без служебных, окончания отсекаются («стипендия» находит «стипендии»).
   Сначала то, где нашлись все слова, и название важнее пояснения; если вместе не нашлось, ищем по любому слову.
   Возвращает [{ s: раздел, t: название, m: пояснение, h: ссылка }] */
const STOP = new Set('как что где когда мне мой моя мои можно нужно ли или для при про это эта есть сколько какие какой какая чем кто это почему куда'.split(' '));
function searchIndex(raw) {
  const norm = (t) => t.toLowerCase().replace(/ё/g, 'е');
  const stem = (w) => (w.length > 4 ? w.replace(/[аяоеиыуюьй]{1,2}$/, '') : w);
  let ws = norm(raw).split(/[\s,.;:!?«»"]+/).filter(Boolean);
  ws = (ws.filter((w) => !STOP.has(w) && w.length > 1).length ? ws.filter((w) => !STOP.has(w) && w.length > 1) : ws).map(stem);
  if (!ws.length) return [];
  /* код аудитории из расписания: «Т-207», «гук 100» — сразу ответ, где это */
  const room = raw.trim().match(/^([А-ЯЁа-яё]{1,4})\s*-?\s*(\d{2,4}[а-яА-Я]?)$/);
  const roomRow = room ? [{ s: 'Кампус', t: `Аудитория ${room[1].toUpperCase()}-${room[2]}: где это`, m: 'Корпус и адрес', h: `kampus.html?q=${encodeURIComponent(room[1] + '-' + room[2])}#auditoriya`, i: -1 }] : [];
  const rows = INDEX.map(([sec, t, m, h], i) => {
    const title = norm(t), all = norm(`${t} ${m} ${sec}`);
    const inAll = ws.filter((w) => all.includes(w)).length;
    return { s: sec, t, m, h: h || HREF[t] || URFU_URL[t] || SECTION_PAGE[sec] || '#', i, full: inAll === ws.length, inAll, score: ws.filter((w) => title.includes(w)).length * 2 + (title.startsWith(ws[0]) ? 1 : 0) };
  }).filter((r) => r.inAll);
  const full = rows.filter((r) => r.full);
  return roomRow.concat((full.length ? full : rows).sort((a, b) => b.inAll - a.inAll || b.score - a.score || a.i - b.i));
}

/* Модальные окна (поиск, меню): Tab ходит по кругу внутри, после закрытия фокус возвращается туда, откуда открыли */
function trapFocus(box) {
  const back = document.activeElement;
  const list = () => [...box.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
  const onKey = (e) => {
    if (e.key !== 'Tab') return;
    const f = list(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  box.addEventListener('keydown', onKey);
  return () => { box.removeEventListener('keydown', onKey); if (back && back.focus) back.focus(); };
}

function initSearch() {
  const box = document.getElementById('search');
  const input = box.querySelector('input');
  const out = box.querySelector('.search__results');
  let active = 0;

  const norm = (s) => s.toLowerCase().replace(/ё/g, 'е');
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const item = (n, href, a, b) => `<a class="search__item${n === active ? ' is-active' : ''}" href="${href}"><span>${a}</span><span>${b}</span></a>`;
  function render() {
    const raw = input.value.trim();
    const hits = raw ? searchIndex(raw) : INDEX.filter((_, k) => [6, 7, 8, 15, 16, 19].includes(k)).map(([s, t, m, h]) => ({ s, t, m, h: h || SECTION_PAGE[s] || '#' }));
    /* Вопрос обычным языком (три слова и больше или «?») помощник предлагает первым; когда ничего не нашлось, тоже */
    const asky = raw && (raw.includes('?') || raw.split(/\s+/).length >= 3 || !hits.length);
    let n = 0;
    const bot = asky ? item(n++, 'pomoshnik.html?q=' + encodeURIComponent(raw), `Спросить ИИ-помощника: «${esc(raw)}»`, 'Ответ со ссылкой на источник') : '';
    if (!hits.length) {
      out.innerHTML = bot + `<p class="search__empty">По запросу «${esc(raw)}» в разделах ничего не нашлось. Спросите помощника или <a href="pomoshch.html">позвоните в контакт-центр</a>.</p>`;
      return;
    }
    const groups = {};
    hits.slice(0, 12).forEach((h) => (groups[h.s] ||= []).push(h));
    out.innerHTML = bot + (raw ? '' : '<p class="search__group">Часто ищут</p>') + Object.entries(groups).map(([g, items]) =>
      (raw ? `<p class="search__group">${g}</p>` : '') + items.map((h) => item(n++, h.h, h.t, h.m)).join('')
    ).join('') + (raw ? item(n++, 'poisk.html?q=' + encodeURIComponent(raw), `Все результаты по запросу «${esc(raw)}»`, hits.length > 12 ? `Всего ${hits.length}` : 'Разделы и программы') : '');
  }
  let release = null;
  function open() { box.classList.add('is-open'); input.value = ''; active = 0; render(); release = trapFocus(box); input.focus(); document.body.style.overflow = 'hidden'; }
  function close() { if (!box.classList.contains('is-open')) return; box.classList.remove('is-open'); document.body.style.overflow = ''; release?.(); release = null; }

  document.querySelectorAll('[data-search-open]').forEach((b) => b.addEventListener('click', () => { closeMenu(); open(); }));
  box.querySelector('[data-search-close]').addEventListener('click', close);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  input.addEventListener('input', () => { active = 0; render(); });
  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing && !box.classList.contains('is-open')) { e.preventDefault(); open(); }
    if (!box.classList.contains('is-open')) return;
    const items = out.querySelectorAll('.search__item');
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && items[active]) { e.preventDefault(); items[active].click(); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((el, k) => el.classList.toggle('is-active', k === active));
      items[active]?.scrollIntoView({ block: 'nearest' });
    }
  });
  window.openSearch = (q) => { open(); if (q) { input.value = q; render(); } };
}

function initMega() {
  const btns = [...document.querySelectorAll('.nav__btn[aria-controls]')];
  const close = () => btns.forEach((b) => { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; });
  btns.forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = b.getAttribute('aria-expanded') === 'true';
    close();
    if (!open) { b.setAttribute('aria-expanded', 'true'); document.getElementById(b.getAttribute('aria-controls')).hidden = false; }
  }));
  document.addEventListener('click', (e) => { if (!e.target.closest('.mega')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

let releaseMenu = null;
function closeMenu() {
  const d = document.getElementById('drawer');
  if (!d?.classList.contains('is-open')) return;
  d.classList.remove('is-open'); document.body.style.overflow = '';
  releaseMenu?.(); releaseMenu = null;
}
function initMenu() {
  const d = document.getElementById('drawer');
  document.querySelector('[data-menu-open]').addEventListener('click', () => {
    d.classList.add('is-open'); document.body.style.overflow = 'hidden';
    releaseMenu = trapFocus(d); d.querySelector('[data-menu-close]').focus();
  });
  d.querySelector('[data-menu-close]').addEventListener('click', closeMenu);
  d.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

/* Быстрые задачи по аудиториям: реальные сервисы и разделы УрФУ */
/* Частые задачи по аудиториям: [название, пояснение, адрес]. Адрес — страница прототипа или действующая страница urfu.ru */
const TASKS = {
  abit: [
    ['Подобрать программу по предметам ЕГЭ', 'Места, минимальные баллы и цена', 'katalog.html#ege'],
    ['Узнать стоимость обучения', 'Цена в строке каждой программы', 'katalog.html'],
    ['Календарь приёма', 'Когда подавать документы', 'postuplenie.html#kalendar'],
    ['Списки поступающих', 'Где я в рейтинге', 'https://urfu.ru/ru/alpha/full/'],
    ['Задать вопрос приёмной комиссии', 'priem@urfu.ru', 'pomoshch.html#vopros'],
    ['Дни открытых дверей', '23–30 января', 'postuplenie.html#dod'],
  ],
  parent: [
    ['Узнать стоимость обучения', 'Цена в строке каждой программы', 'katalog.html'],
    ['Общежитие', '18 общежитий УрФУ', 'kampus.html#obshchezhitiya'],
    ['Календарь приёма', 'Когда подавать документы', 'postuplenie.html#kalendar'],
    ['Дни открытых дверей', '23–30 января', 'postuplenie.html#dod'],
    ['Задать вопрос приёмной комиссии', 'priem@urfu.ru', 'pomoshch.html#vopros'],
  ],
  intl: [
    ['Study at UrFU: in English', 'Programs, fees, how to apply', 'en.html'],
    ['Поступление для иностранных граждан', 'Сроки, документы и испытания', 'postuplenie.html#intl'],
    ['Подать заявку', 'Портал Study in Russia', 'https://urfu.ru/ru/international/int-admission/portal-dlja-inostrannykh-abiturientov-study-in-russia/'],
    ['Документы', 'Перевод и легализация', 'https://urfu.ru/ru/applicant/sng/priem-dokumentov/kak-podat-dokumenty/'],
    ['Вступительные испытания', 'Русский язык и профильные предметы', 'https://urfu.ru/ru/applicant/sng/vstupitelnye-ispytanija/'],
    ['О прибытии', 'Как добраться и где получить поддержку', 'https://urfu.ru/ru/international/o-pribytii-inostrannykh-studentov-iz-za-rubezha/'],
  ],
  student: [
    ['Расписание занятий', 'Моя группа на неделю', 'https://urfu.ru/ru/students/study/schedule/'],
    ['Личный кабинет', 'Учебный план, зачётка', 'kabinet.html?role=student'],
    ['Баллы БРС', 'Текущая аттестация', 'https://urfu.ru/ru/students/study/brs-rating/'],
    ['Стипендии', 'Виды и условия', 'https://urfu.ru/ru/students/study/scholarships/'],
    ['Справки и документы', 'Заказать онлайн', 'https://urfu.ru/ru/students/documents/'],
    ['Поселение в общежитие', '18 общежитий', 'kampus.html#obshchezhitiya'],
  ],
  staff: [
    ['Расписание преподавателей', 'По фамилии', 'https://urfu.ru/ru/staff/raspisanie-prepodavatelei/'],
    ['Документы сотрудника', 'Бланки и положения', 'http://hr.urfu.ru/ru/sotrudniku/blanki/'],
    ['Конкурсы и гранты', 'Наука', 'https://urfu.ru/ru/science/grants/'],
    ['Повышение квалификации', 'Программы ДПО', 'https://urfu.ru/ru/education/dpo/povyshenie-kvalifikacii-professorsko-prepodavatelskogo-sostava/'],
    ['Вакансии', 'Управление персонала', 'http://hr.urfu.ru/ru/pretendentu/vakansii/professorsko-prepodavatelskii-sostav/'],
    ['Wi-Fi и цифровые сервисы', 'Доступ и инструкции', 'https://dit.urfu.ru/ru/servisy/wi-fi/'],
  ],
  alumni: [
    ['Ассоциация выпускников', 'УПИ, УрГУ и УрФУ', 'https://alumni.urfu.ru/ru/'],
    ['Магистратура', 'Вторая ступень', 'postuplenie.html#mag'],
    ['Дополнительное образование', 'Курсы и переподготовка', 'https://urfu.ru/ru/education/dpo/'],
    ['Бизнес-школа', 'Программы для руководителей', 'https://urfu.ru/ru/alumni/biznes-shkola/'],
    ['Центр карьеры', 'Вакансии партнёров', 'http://career.urfu.ru'],
    ['Поддержать университет', 'Эндаумент-фонд', 'https://endowment.urfu.ru/'],
  ],
  partner: [
    ['Сотрудничество с университетом', 'Управление партнёрских отношений', 'https://urfu.ru/ru/partners/'],
    ['Нанять выпускников', 'Центр карьеры', 'http://career.urfu.ru'],
    ['Заказать исследование', 'Лаборатории и центры', 'nauka.html#zakaz'],
    ['Мероприятия и проекты', 'Совместные программы', 'https://urfu.ru/ru/partners/projects/'],
    ['Рекламные возможности', 'Прайс на услуги', 'https://urfu.ru/ru/partners/prais-na-uslugi/'],
    ['Эндаумент-фонд', 'Целевые капиталы', 'https://endowment.urfu.ru/'],
  ],
};

/* Дорога из знака: геометрия логотипа (штрих 12, точка r8, зазор до точки 4) в любом масштабе.
   Хвост «У» продолжается прямой до точки у левого края контента.
   data-road="blue" — синие штрихи; data-road="photo" — штрихи открывают фото (data-road-img).
 */
const SUN_GRAD = '<stop offset="0" stop-color="#D22D7C"/><stop offset=".45" stop-color="#D02E2D"/><stop offset=".8" stop-color="#E69838"/><stop offset="1" stop-color="#FCEC4F"/>';
let roadN = 0;
function drawRoad(el, force) {
  const wrap = el.querySelector('.wrap');
  const w = el.clientWidth, wide = w >= 900;
  let W = wide ? +(el.dataset.roadW || 16) : Math.max(10, Math.round(w / (el.dataset.road === 'photo' ? 22 : 30)));
  let k = W / 12; const pad = wide ? 48 : 28;
  el.style.setProperty('--road', `${Math.round(el.dataset.road === 'photo' && wide ? W + pad + 24 : 90 * k + pad + 24)}px`);
  const h = el.clientHeight;
  if (!force && el._road === `${w}x${h}`) return;
  el._road = `${w}x${h}`;
  const er = el.getBoundingClientRect(), wr = wrap.getBoundingClientRect(), cs = getComputedStyle(wrap);
  // data-road-top: знак встаёт от этого элемента до линии, толщина подбирается, но не больше data-road-w
  const topEl = wide && el.dataset.roadTop && el.querySelector(el.dataset.roadTop);
  if (topEl) { k = Math.min(k, (h - pad - (topEl.getBoundingClientRect().top - er.top)) / 90); W = 12 * k; }
  const ml = wr.left - er.left + parseFloat(cs.paddingLeft), mr = er.right - wr.right + parseFloat(cs.paddingRight);
  const yL = h - pad - W / 2, ox = w - mr - 90 * k, oy = yL - 88 * k;
  const X = (x) => (ox + x * k).toFixed(1), Y = (y) => (oy + y * k).toFixed(1);
  const r = 8 * k, cx = ml + r, xEnd = cx + r + 4 * k + W / 2;
  const d = `M${X(18)} ${Y(10)} L${X(61)} ${Y(55)} M${X(84)} ${Y(10)} L${X(51)} ${Y(74)} Q${X(44)} ${Y(88)} ${X(31)} ${Y(88)}${xEnd < ox + 31 * k ? ` L${xEnd.toFixed(1)} ${yL.toFixed(1)}` : ''}`;
  const n = ++roadN;
  const stroke = (c) => `<path class="road__line" d="${d}" pathLength="1" fill="none" stroke="${c}" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const body = el.dataset.road === 'photo'
    ? `<mask id="road-m${n}">${stroke('#fff')}</mask><image href="${el.dataset.roadImg}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" mask="url(#road-m${n})"/>`
    : stroke('#1E4391');
  /* Первая отрисовка прорисовывает дорогу; перерисовка в первые 2 секунды продолжает ту же анимацию, позже — сразу готовая */
  el._born ??= performance.now();
  const age = performance.now() - el._born;
  const animate = MOTION && age < 2000;
  const old = el.querySelector(':scope > .road');
  const swap = force && old && MOTION && age >= 2000;
  if (swap) { old.classList.add('road--old'); setTimeout(() => old.remove(), 650); } else old?.remove();
  el.insertAdjacentHTML('beforeend', `<svg class="road${animate ? ' road--in' : ''}${swap ? ' road--fade' : ''}" style="--t:${-Math.round(age)}ms" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">
    <defs><radialGradient id="road-s${n}" cx="35%" cy="32%" r="85%">${SUN_GRAD}</radialGradient></defs>
    ${body}<circle class="road__dot" cx="${cx.toFixed(1)}" cy="${yL.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#road-s${n})"/></svg>`);
}
function initRoads() {
  const main = document.querySelector('main');
  const ph = main && main.querySelector(':scope > .phead');
  if (ph && !ph.dataset.road) ph.dataset.road = 'blue';
  document.querySelectorAll('[data-road]:not([data-road="none"])').forEach((el) => {
    drawRoad(el);
    new ResizeObserver(() => drawRoad(el)).observe(el);
  });
  document.fonts?.ready.then(() => document.querySelectorAll('[data-road]:not([data-road="none"])').forEach((el) => drawRoad(el)));
}

/* Боковая навигация [data-nav]: точка у раздела, который сейчас на экране */
function spyNav() {
  const links = [...document.querySelectorAll('[data-nav] a')];
  const y = innerHeight * 0.3;
  let cur = 0;
  links.forEach((a, i) => { const s = document.querySelector(a.hash); if (s && s.getBoundingClientRect().top <= y) cur = i; });
  links.forEach((a, i) => (i === cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
}

/* Каталог ссылок по группам: groups = [[заголовок, [название | [название, пояснение], ...]], ...].
   Разметка страницы: поле #q, [data-nav] (боковая навигация), [data-groups] (сами группы) */
function initGroups(groups, hint = 'Ничего не нашлось. Попробуйте другое слово или позвоните в контакт-центр: 8 800 100-50-44.') {
  const $ = (q) => document.querySelector(q);
  const norm = (t) => t.toLowerCase().replace(/ё/g, 'е');
  const item = (x) => (typeof x === 'string' ? [x, ''] : x);
  $('[data-nav]').innerHTML = groups.map(([t], i) => `<a href="#g${i}">${t}</a>`).join('');
  function render() {
    const w = norm($('#q').value).split(/\s+/).filter(Boolean);
    let any = false;
    $('[data-groups]').innerHTML = groups.map(([t, items], i) => {
      const hit = items.map(item).filter(([a, m]) => w.every((q) => norm(`${a} ${m} ${t}`).includes(q)));
      if (!hit.length) return '';
      any = true;
      return `<section class="grp" id="g${i}" aria-labelledby="gh${i}"><h3 class="t-h3" id="gh${i}">${t}</h3><ul>${hit.map(([a, m]) => `<li><a href="#">${a}${m ? `<small>${m}</small>` : ''}</a></li>`).join('')}</ul></section>`;
    }).join('') || `<p class="none">${hint}</p>`;
    $('[data-nav]').hidden = !any || w.length > 0;
    spyNav();
  }
  $('#q').addEventListener('input', render);
  render();
}

/* Типограф (как «Типограф» студии Лебедева, § 104, 158): короткие предлоги и союзы не висят в конце строки,
   тире не начинает строку, число не отрывается от слова, «г.», «ул.», «им.» не отрываются от названия, диапазоны («1–2») и телефоны не рвутся. Обрабатывает и текст, который страница дорисует позже */
const TYPO_SHORT = /(?<=^|[\s(«„"])(в|во|к|ко|с|со|о|об|обо|у|и|а|но|не|ни|на|по|за|из|от|до|для|при|без|под|над|про|я|мы|вы|ли|же|бы)[ \t\n]+/giu;
function typo(root) {
  const skip = /^(SCRIPT|STYLE|TEXTAREA|INPUT|CODE|PRE|KBD|SVG)$/i;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => {
    for (let e = n.parentElement; e && e !== root.parentElement; e = e.parentElement) if (skip.test(e.tagName) || e.isContentEditable) return NodeFilter.FILTER_REJECT;
    return /\s/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (let n; (n = w.nextNode());) {
    let t = n.nodeValue;
    const v = t.replace(TYPO_SHORT, '$1\u00a0')
      .replace(/ +([—–])(?=\s)/g, '\u00a0$1').replace(/(?<=^|[\s(])(г|ул|д|каб|ауд|им|пр|т|стр|корп|оф)\. +/gu, '$1.\u00a0').replace(/(\d) (?=[а-яёА-ЯЁ%])/g, '$1\u00a0')
      .replace(/(?:\+7|\b8)[ \u00a0]?\(?\d{3,4}\)?[ \u00a0]\d{2,3}[ -]\d{2}-\d{2}/g, (m) => m.replace(/ /g, '\u00a0').replace(/-/g, '\u2060-\u2060'))
      .replace(/(\d)([–-])(?=\d)/g, '$1\u2060$2\u2060');
    if (v !== t) n.nodeValue = v;
  }
}
/* Куда ведут ссылки, страниц для которых в прототипе нет: настоящие адреса urfu.ru и его сайтов (собраны из обхода 19.10.2026)
   или ближайшая страница прототипа. Ключ — название ссылки. fillLinks() подставляет адрес всем a[href="#"], в том числе дорисованным скриптом */
const URFU_URL = {
  "На что тратятся деньги": "https://urfu.ru/sveden/budget/",
  "EN": "https://urfu.ru/en/",
  "English": "https://urfu.ru/en/",
  "Rutube": "https://rutube.ru/channel/24348692",
  "Telegram": "https://telegram.me/urfu_ru",
  "Wi-Fi сети УрФУ": "https://dit.urfu.ru/ru/servisy/wi-fi/#endy",
  "Автошкола": "http://auto.urfu.ru",
  "Академическая мобильность": "https://urfu.ru/ru/international/mobility/",
  "Аспирантура": "https://postgraduate.urfu.ru/",
  "Аттестационный совет": "https://urfu.ru/ru/about/attsovet/",
  "Бакалавриат и специалитет": "postuplenie.html",
  "Баллы БРС": "https://urfu.ru/ru/students/study/brs-rating/",
  "В филиале УрФУ в Каменске-Уральском определили новые стандарты подготовки инженеров в эпоху ИИ": "https://urfu.ru/ru/news/",
  "ВКонтакте": "http://vk.ru/ural.federal.university",
  "Вакантные места": "https://urfu.ru/sveden/vacant/",
  "Виртуальные туры": "https://urfu.ru/ru/about/today/3d/",
  "Военный учебный центр": "https://vuc.urfu.ru/ru/abiturientam-i-studentam/uslovija-priema/podgotovka-kadrovykh-oficerov/",
  "Воинский учёт и отсрочки от призыва": "https://urfu.ru/ru/students/military/",
  "Волонтёрство": "https://urfu.ru/ru/students/leisure/oso/volural/",
  "Вопросы и ответы приёмной комиссии": "https://urfu.ru/ru/feedback/priem/obshchie-voprosy-po-priemu/",
  "Все возможности": "https://urfu.ru/ru/students/",
  "Все десятилетия": "https://urfu.ru/ru/about/history/",
  "Все лаборатории": "https://urfu.ru/ru/about/today/3d/audlab/",
  "Все новости": "https://urfu.ru/ru/news/",
  "Все события": "https://urfu.ru/ru/news/",
  "Вступительные испытания": "https://urfu.ru/ru/applicant/docs-abiturient/exams/",
  "Выпускникам": "http://alumni.urfu.ru",
  "Выпускники": "http://alumni.urfu.ru",
  "Гибкие технологии и новые материалы": "https://urfu.ru/ru/about/today/excellence-centers/technologyandmaterials/",
  "Главный учебный корпус": "https://urfu.ru/ru/about/today/3d/",
  "Горячая линия для студентов": "https://urfu.ru/ru/students/social/gorjachaja-linija-dlja-studentov/",
  "Две студентки УрФУ будут получать стипендии «Группы ЛСР»": "https://urfu.ru/ru/news/",
  "Детский сад": "https://urfu.ru/ru/about/units/pp1/detskii-sad-urfu/",
  "Диссертационные советы": "https://urfu.ru/ru/science/dissertation-councils/",
  "Дни открытых дверей": "postuplenie.html#dod",
  "Документы для студентов": "https://urfu.ru/ru/students/documents/",
  "Доступная среда": "https://urfu.ru/sveden/ovz/",
  "Живые системы и здоровье": "https://urfu.ru/ru/about/today/excellence-centers/live-systemandhealth/",
  "Журналы УрФУ": "https://urfu.ru/ru/science/scientific-journals/",
  "Задать вопрос приёмной комиссии": "pomoshch.html#vopros",
  "Закупки": "https://urfu.ru/about/administration-facilities/requests/",
  "Здоровье": "https://urfu.ru/ru/about/units/ppov/hp/",
  "Зональная научная библиотека": "http://lib.urfu.ru/",
  "Издательство": "https://urfu.ru/ru/science/scientific-journals/",
  "Имя Ельцина": "https://urfu.ru/ru/about/history/",
  "Индивидуальные достижения": "https://urfu.ru/ru/applicant/docs-abiturient/olimp/",
  "Инклюзивное образование": "https://urfu.ru/ru/about/units/ppur/cad/centr-inkljuzivnogo-obrazovanija/",
  "Иностранным абитуриентам": "http://urfu.ru/ru/international/int-admission/",
  "Информационные технологии и человек в информационном обществе": "https://urfu.ru/ru/about/today/excellence-centers/it-in-info-society/",
  "Как всё начиналось": "https://urfu.ru/ru/about/history/",
  "Как подать": "postuplenie.html#kalendar",
  "Как поступить через Госуслуги": "https://urfu.ru/ru/applicant/docs-abiturient/gosuslugi-guide/",
  "Календарь приёма": "postuplenie.html#kalendar",
  "Кампус УрФУ станет передовым образовательным пространством": "https://urfu.ru/ru/news/",
  "Квота Россотрудничества": "https://urfu.ru/ru/applicant/docs-abiturient/postuplenie-po-kvote-rossotrudnichestva/",
  "Коворкинги": "https://soc.urfu.ru/ru/upravlenie-razvitija-studencheskogo-potenciala/kovorkingi/",
  "Конкурсы и гранты": "https://urfu.ru/ru/science/grants/",
  "Контакты приёмной комиссии": "https://urfu.ru/ru/applicant/contacts/",
  "Корпуса и оснащение": "https://urfu.ru/sveden/objects/",
  "Кредит на образование с господдержкой": "https://urfu.ru/fileadmin/user_upload/urfu.ru/documents/applicant/2024/obr_kredit_sber.pdf",
  "Кто управляет университетом": "https://urfu.ru/sveden/struct/",
  "Лицеисты УрФУ завоевали золото на международной олимпиаде по физике": "https://urfu.ru/ru/news/",
  "Личный кабинет": "https://istudent.urfu.ru/",
  "Магистратура": "http://magister.urfu.ru",
  "Международное сотрудничество": "https://urfu.ru/sveden/inter/",
  "Меры поддержки": "https://urfu.ru/ru/students/support-measures/",
  "Молодёжная наука": "http://youthscience.urfu.ru/ru/",
  "Музейно-выставочный комплекс": "https://urfu.ru/ru/about/online-museum/museum/",
  "Наблюдательный совет": "https://urfu.ru/ru/about/supervisory/",
  "Научно-исследовательский портал": "https://science.urfu.ru/",
  "Нашли ошибку? site@urfu.ru": "mailto:site@urfu.ru",
  "Независимая оценка качества образования": "https://urfu.ru/ru/about/quality/",
  "Новый кампус": "https://campus.urfu.ru",
  "Об аспирантуре": "https://postgraduate.urfu.ru/",
  "Образовательные программы": "https://programms.edu.urfu.ru/",
  "Обращения граждан": "https://urfu.ru/ru/appeal/",
  "Обсудить задачу": "https://urfu.ru/ru/partners/",
  "Объединённый совет обучающихся": "https://urfu.ru/ru/students/leisure/oso/",
  "Олимпиада «Я — профессионал»": "https://urfu.ru/ru/students/olympic/profi/",
  "Олимпиады и конкурсы": "https://urfu.ru/ru/school/olympiad/",
  "Онлайн-музей": "https://urfu.ru/ru/about/online-museum/museum/",
  "Оплата обучения": "https://urfu.ru/ru/applicant/docs-abiturient/stoimost-obuchenija/",
  "Организация и прохождение практики": "https://urfu.ru/ru/students/documents/praktika/",
  "Организация учебного процесса": "https://urfu.ru/ru/feedback/learning/",
  "Основные даты": "https://urfu.ru/ru/about/history/1920-30/",
  "Основные сведения": "https://urfu.ru/sveden/common/",
  "Особые права участников СВО и их детей": "https://urfu.ru/ru/students/support-measures/svo/",
  "Официальные документы": "https://urfu.ru/ru/about/documents/",
  "Партнёрам и работодателям": "https://urfu.ru/ru/partners/",
  "Перевод и восстановление": "https://urfu.ru/ru/feedback/learning/",
  "Питание": "https://urfu.ru/ru/about/units/ppov/canteen/",
  "План приёма": "https://urfu.ru/fileadmin/user_upload/urfu.ru/documents/applicant/2026/PLAN_priema_bakalavriat_20_01_2026.pdf",
  "Платное обучение": "https://urfu.ru/sveden/paidedu/",
  "Платные образовательные услуги": "https://urfu.ru/sveden/paidedu/",
  "Поддержать университет": "https://endowment.urfu.ru/",
  "Подобрать программу по предметам ЕГЭ": "katalog.html#ege",
  "Калькулятор ЕГЭ": "https://calcege.my1.urfu.ru/",
  "Политика в области качества": "https://urfu.ru/ru/about/today/quality/",
  "Портал молодёжной науки": "http://youthscience.urfu.ru",
  "Поселение в общежитие": "kampus.html#obshchezhitiya",
  "Поступающим с ограниченными возможностями здоровья": "https://urfu.ru/ru/applicant/docs-abiturient/persons-with-disabilities/",
  "Поступление в магистратуру": "http://magister.urfu.ru/index.php?id=27773",
  "Поступление по особой квоте": "https://urfu.ru/ru/applicant/docs-abiturient/postuplenie-po-osoboi-kvote/",
  "Поступление по отдельной квоте": "https://urfu.ru/ru/applicant/docs-abiturient/postuplenie-po-otdelnoi-kvote/",
  "Правила приёма": "https://urfu.ru/fileadmin/user_upload/urfu.ru/documents/applicant/2026/Pravila_priema_bakalavriat.pdf",
  "Премия губернатора для молодых учёных": "https://urfu.ru/ru/science/grants/premija-gubernatora-sverdlovskoi-oblasti-dlja-molodykh-uchenykh/",
  "Преподаватели": "https://urfu.ru/sveden/employees/",
  "Прессе": "https://urfu.ru/ru/media/",
  "Приложение «УрФУ.Учёба»": "https://apps.rustore.ru/app/com.ustasapp",
  "Приём": "https://urfu.ru/ru/feedback/priem/obshchie-voprosy-po-priemu/",
  "Приём документов в Военный учебный центр": "https://vuc.urfu.ru/ru/abiturientam-i-studentam/uslovija-priema/podgotovka-kadrovykh-oficerov/",
  "Приёмная комиссия": "https://urfu.ru/ru/applicant/contacts/",
  "Программа развития": "http://strategy.urfu.ru/programma-razvitija/",
  "Противодействие коррупции": "https://security.urfu.ru/ru/anti-corruption/",
  "Разрешение на работу для иностранных студентов": "https://urfu.ru/ru/students/placement/foreigners-permission/",
  "Расписание занятий": "https://urfu.ru/ru/students/study/schedule/",
  "Рейтинг внеучебной деятельности": "https://istudent.urfu.ru/s/rejting-vneuchebnoj-deyatelnosti-studentov/",
  "Реквизиты": "https://urfu.ru/ru/about/today/details/",
  "Ректорат": "https://urfu.ru/ru/about/administration/",
  "Российские регионы в фокусе перемен": "https://rrfp.ru/",
  "Руководство": "https://urfu.ru/sveden/managers/",
  "Сведения об образовательной организации": "https://urfu.ru/sveden/",
  "Свободные места": "https://urfu.ru/sveden/vacant/",
  "Семейным студентам": "https://urfu.ru/ru/students/social/family/",
  "Служба по контракту": "https://urfu.ru/ru/students/placement/vs-rf/",
  "Сотрудникам": "https://urfu.ru/ru/staff/",
  "Социальная поддержка": "https://soc.urfu.ru/ru/upravlenie-po-socialnoi-i-vospitatelnoi-rabote/socialnoe-razvitie/komissija-po-raspredeleniju-25-fonda-materialnoi-podderzhki/",
  "Союз студентов": "http://posurfu.ru/",
  "Списки зачисленных": "https://urfu.ru/ru/alpha-second/spiski-zachislennykh/",
  "Списки поступающих": "https://urfu.ru/ru/alpha/full/",
  "Спорт": "https://urfu.ru/ru/sports/",
  "Справки и документы": "https://urfu.ru/ru/students/documents/",
  "Стандарты и требования": "https://urfu.ru/sveden/edustandarts/",
  "Старт карьеры на госслужбе": "https://urfu.ru/ru/students/placement/gossluzhba/",
  "Стипендии": "https://urfu.ru/ru/students/study/scholarships/",
  "Стипендии и меры поддержки": "https://urfu.ru/sveden/grants/",
  "Стипендии и поддержка": "https://urfu.ru/sveden/grants/",
  "Стипендии и стипендиаты": "https://urfu.ru/ru/students/study/scholarships/",
  "Стипендии талантливым": "https://urfu.ru/ru/students/study/scholarships/talented/",
  "Стоимость обучения": "https://urfu.ru/ru/applicant/docs-abiturient/stoimost-obuchenija/",
  "Структура и органы управления": "https://urfu.ru/sveden/struct/",
  "Студент года УрФУ": "http://studentgoda.urfu.ru/",
  "Студенческая жизнь": "https://urfu.ru/ru/students/leisure/",
  "Студенческие объединения": "https://urfu.ru/ru/students/leisure/oso/",
  "Студенческий центр": "https://urfu.ru/ru/students/leisure/studcentr/",
  "Творчество": "https://urfu.ru/ru/students/leisure/oso/tvorchestvo/",
  "Точка кипения УрФУ": "https://urfu.ru/ru/students/leisure/tkurfu/",
  "Трансляции для поступающих": "https://urfu.ru/ru/applicant/docs-abiturient/transljacii-dlja-postupajushchikh/",
  "Узнать стоимость обучения": "https://urfu.ru/ru/applicant/docs-abiturient/stoimost-obuchenija/",
  "Услуги издательско-полиграфического центра": "http://print.urfu.ru",
  "Устав, лицензии, правила": "https://urfu.ru/sveden/document/",
  "Учёный совет": "https://urfu.ru/ru/about/council/",
  "Фонды истфака УрФУ пополнились раритетными рукописями": "https://eanews.ru/rossiya/20261012161952/okolo-300-knig-xvi-nachala-xx-vekov-peredal-kollektsioner-istfaku-urfu",
  "Целевое обучение": "https://urfu.ru/ru/applicant/docs-abiturient/sponsored/",
  "Центр карьеры и трудоустройства": "http://career.urfu.ru",
  "Электронный научный архив": "http://elar.urfu.ru",
  "Энергетика, ресурсосбережение, рациональное природопользование": "https://urfu.ru/ru/about/today/excellence-centers/energy-sourse-save/"
};
function linkTitle(a) {
  const t = ['.task__t', '.ev__t', '.uni__t', '.panel-ev__t', 'h3', 'b', 'strong'].map((q) => a.querySelector(q)).find(Boolean);
  return (t ? t.textContent : (a.firstChild?.nodeType === 3 && a.firstChild.textContent.trim() ? a.firstChild.textContent : a.textContent))
    .replace(/[\u2060\u00a0]/g, (c) => (c === '\u00a0' ? ' ' : '')).replace(/\s+/g, ' ').trim();
}
function fillLinks(root) {
  root.querySelectorAll?.('a[href="#"]:not([onclick])').forEach((a) => {
    const u = URFU_URL[linkTitle(a)];
    if (u) a.setAttribute('href', u);
  });
}

function initTypo() {
  const main = document.querySelector('main');
  if (!main) return;
  typo(document.body);
  fillLinks(document.body);
  new MutationObserver((list) => list.forEach((m) => m.addedNodes.forEach((n) => {
    if (n.nodeType === 1) { typo(n); fillLinks(n); if (n.matches('a[href="#"]')) fillLinks(n.parentElement); } else if (n.nodeType === 3 && n.parentElement) typo(n.parentElement);
  }))).observe(document.body, { childList: true, subtree: true });
}

/* Движение страницы: появление при прокрутке, счёт цифр, путь до «сейчас», шапка уезжает при прокрутке вниз */
const REVEAL_GROUPS = '.ev-track, .news__more, .hot, .tasks, .dirs, .proj, .facts, .agenda, .rows, .linklist, .camp, .uni__grid, .news-list__more, .life, .cards, .reach, .cols, .why, .how, .levels';
const REVEAL_SINGLE = 'main h2, .sec__head p, .lead, .post--big, .order img, .way img, .say, .panel-ev, .chat, .tbl, .note';
function initMotion() {
  if (!MOTION) return;
  const first = innerHeight;
  const io = new IntersectionObserver((list) => list.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    if (e.target.classList.contains('rv')) e.target.classList.add('rv-in');
    if (e.target.matches('.route')) e.target.classList.remove('route--wait');
    if (e.target.matches('.facts')) countUp(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  /* Шапка страницы видна сразу; всё ниже первого экрана проявляется при прокрутке */
  const below = (el) => el.getBoundingClientRect().top > first * 0.85 && !el.closest('.phead, .header, .drawer, .search, .footer');
  document.querySelectorAll(REVEAL_GROUPS).forEach((g) => {
    if (!below(g)) return;
    [...g.children].forEach((c, i) => { c.classList.add('rv'); c.style.setProperty('--d', `${Math.min(i, 7) * 70}ms`); io.observe(c); });
  });
  document.querySelectorAll(REVEAL_SINGLE).forEach((el) => { if (below(el) && !el.closest('.rv')) { el.classList.add('rv'); io.observe(el); } });
  document.querySelectorAll('.route').forEach((r) => { r.classList.add('route--wait'); io.observe(r); });
  document.querySelectorAll('.facts--big').forEach((f) => io.observe(f));

  /* Шапка: вниз — уезжает, вверх — возвращается; не прячем, пока открыто меню или фокус внутри */
  const hd = document.querySelector('.header');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY, busy = hd.contains(document.activeElement) || hd.querySelector('.nav__btn[aria-expanded="true"]');
    if (Math.abs(y - lastY) < 6) return;
    const away = y > lastY && y > 320 && !busy;
    hd.classList.toggle('is-away', away);
    document.documentElement.classList.toggle('is-head-away', away);
    lastY = y;
  }, { passive: true });
}

/* Счёт крупных цифр от нуля: «50 000», «13 800+», «1 864». Годы и диапазоны не считаем */
function countUp(root) {
  root.querySelectorAll('dd').forEach((dd) => {
    const txt = dd.textContent, m = txt.match(/^(\d(?:[\d\s\u00a0]*\d)?)(.*)$/);
    if (!m || /[–-]/.test(txt)) return;
    const n = parseInt(m[1].replace(/\D/g, ''), 10);
    if (!n || (n >= 1800 && n <= 2100 && !/\s/.test(m[1]))) return;
    const fmt = (v) => (v >= 1000 ? Math.round(v).toLocaleString('ru-RU').replace(/\s/g, '\u00a0') : String(Math.round(v))) + m[2];
    const t0 = performance.now(), dur = 1200;
    dd.style.minWidth = `${dd.getBoundingClientRect().width}px`; // ширина итогового числа: пока идёт счёт, раскладка не дёргается
    dd.setAttribute('aria-label', txt.trim());
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); dd.textContent = fmt(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); else dd.removeAttribute('aria-label'); };
    requestAnimationFrame(step);
  });
}

/* Лента карточек вбок [data-ev-track]: стрелки листают на карточку, счётчик «1 / 3» считает положения ленты
   (на широком экране последние карточки видны вместе, поэтому положений меньше, чем карточек); крайние стрелки гаснут */
function initTrack() {
  const track = document.querySelector('[data-ev-track]');
  if (!track) return;
  const cards = [...track.children], count = document.querySelector('[data-ev-count]');
  const btns = document.querySelectorAll('[data-ev]');
  const stops = () => {
    const max = track.scrollWidth - track.clientWidth;
    return [...cards.map((c) => c.offsetLeft - cards[0].offsetLeft).filter((x) => x < max - 4), max];
  };
  const at = (st) => { let k = 0; st.forEach((x, i) => { if (x <= track.scrollLeft + 4) k = i; }); return k; };
  const sync = () => {
    const st = stops(), k = at(st);
    if (count) count.textContent = `${k + 1} / ${st.length}`;
    btns.forEach((b) => { b.disabled = b.dataset.ev < 0 ? k === 0 : k === st.length - 1; });
  };
  btns.forEach((b) => b.addEventListener('click', () => {
    const st = stops(), k = Math.max(0, Math.min(st.length - 1, at(st) + Number(b.dataset.ev)));
    track.scrollTo({ left: st[k], behavior: MOTION ? 'smooth' : 'auto' });
  }));
  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
  addEventListener('resize', sync);
  sync();
}

/* Полосы чипов, которые листаются вбок: у края, за которым есть ещё, текст затухает */
function initFades() {
  document.querySelectorAll('.lv .levels, .catnav').forEach((el) => {
    const sync = () => {
      el.classList.toggle('fade-r', el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
      el.classList.toggle('fade-l', el.scrollLeft > 4);
    };
    el.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
  });
}

/* «Сейчас» на главной: путь с настоящими датами. Приём — календарь 2026 года с urfu.ru (формат каждый год тот же),
   даты без года считаются внутри приёмного цикла с 1 сентября по 31 августа. События — из ленты на главной.
   ?date=2027-01-25 в адресе подменяет сегодняшний день, чтобы показать другой сезон */
const ADMIT = [
  ['Выбрать программу', '378 программ в 13 институтах', [9, 1], [1, 22], 'Открыть каталог', 'katalog.html'],
  ['Дни открытых дверей', '23–30 января', [1, 23], [1, 30], 'Записаться', 'postuplenie.html#dod'],
  ['Подать документы', 'С 20 июня: лично, онлайн или через Госуслуги', [6, 20], [7, 25], 'Сроки подачи', 'postuplenie.html#kalendar'],
  ['Зачисление', 'Приказы с 3 по 25 августа', [8, 3], [8, 25], 'Списки поступающих', 'postuplenie.html'],
];
const NOW = {
  abit: ['Путь поступления', ADMIT],
  parent: ['Путь поступления', ADMIT],
  intl: ['Поступление из другой страны', [
    ['Дополнительный приём', 'Платное обучение: с 1 сентября по 22 октября', [9, 1], [10, 22], 'Как подать', 'postuplenie.html#intl'],
    ['Приказ о зачислении', '30 октября', [10, 30], [10, 30], 'Списки зачисленных', 'https://urfu.ru/ru/applicant/enrolled-lists/'],
    ['Приём документов', 'Бакалавриат: с 20 июня по 20 августа', [6, 20], [8, 20], 'Study in Russia', 'https://urfu.ru/ru/international/int-admission/portal-dlja-inostrannykh-abiturientov-study-in-russia/'],
  ]],
  student: ['Ближайшее', [
    ['Олимпиада «Я — профессионал»', 'Регистрация до 10 ноября', '2026-09-01', '2026-11-10', 'Зарегистрироваться', 'https://urfu.ru/ru/students/olympic/profi/'],
    ['Военный учебный центр', 'Приём документов до 20 ноября', '2026-09-01', '2026-11-20', 'Условия', 'https://vuc.urfu.ru/ru/abiturientam-i-studentam/uslovija-priema/podgotovka-kadrovykh-oficerov/'],
  ]],
  staff: ['Ближайшее', [
    ['Премия губернатора для молодых учёных', 'Приём заявок до 1 ноября', '2026-09-01', '2026-11-01', 'Подать заявку', 'https://urfu.ru/ru/science/grants/premija-gubernatora-sverdlovskoi-oblasti-dlja-molodykh-uchenykh/'],
    ['Российские регионы в фокусе перемен', 'Международная конференция, 12–14 ноября', '2026-11-12', '2026-11-14', 'Программа', 'https://rrfp.ru/'],
  ]],
  alumni: ['Ближайшее', [
    ['Российские регионы в фокусе перемен', 'Международная конференция, 12–14 ноября', '2026-11-12', '2026-11-14', 'Программа', 'https://rrfp.ru/'],
  ]],
  partner: ['Ближайшее', [
    ['Российские регионы в фокусе перемен', 'Международная конференция, 12–14 ноября', '2026-11-12', '2026-11-14', 'Стать участником', 'https://rrfp.ru/'],
  ]],
};
const TODAY = (() => {
  const q = new URLSearchParams(location.search).get('date');
  const d = q && new Date(`${q}T12:00`);
  return d && !isNaN(d) ? d : new Date();
})();
/* [месяц, день] внутри текущего приёмного цикла или строка ISO; end — конец дня */
function stageDate(v, end) {
  if (typeof v === 'string') return new Date(`${v}T${end ? '23:59' : '00:00'}`);
  const y = TODAY.getMonth() >= 8 ? TODAY.getFullYear() : TODAY.getFullYear() - 1;
  return new Date(v[0] >= 9 ? y : y + 1, v[0] - 1, v[1], end ? 23 : 0, end ? 59 : 0);
}

/* Первый экран главной: выбор аудитории («Я — абитуриент ▾», список-listbox), задачи и путь «Сейчас» */
function initAudience() {
  const root = document.querySelector('[data-audience]');
  if (!root) return;
  const list = root.querySelector('[data-tasks]');
  const btn = root.querySelector('#aud-btn'), label = root.querySelector('#aud-v');
  const box = root.querySelector('#aud-list'), opts = [...box.querySelectorAll('[role="option"]')];
  const road = root.querySelector('.tabs__road');
  const now = root.querySelector('[data-now-root]');
  let key = 'abit';

  function show(k) {
    key = k;
    root.dataset.aud = k;
    opts.forEach((o) => o.setAttribute('aria-selected', o.dataset.key === k));
    label.textContent = opts.find((o) => o.dataset.key === k).textContent;
    list.innerHTML = TASKS[k].slice(0, 5).map(([t, m, h], i) => `<li${i ? '' : ' class="task--main"'} style="--d:${i * 55}ms"><a href="${h}"><span class="task__t">${t}</span><span class="task__m">${m}</span></a></li>`).join('');
    if (MOTION && list.dataset.ready) { list.classList.remove('is-swap'); void list.offsetWidth; list.classList.add('is-swap'); }
    list.dataset.ready = 1;
    renderNow(now, k);
    placeRoad();
  }
  /* Дорога под выбранным словом: толщина и точка от размера шрифта */
  function placeRoad() {
    const fs = parseFloat(getComputedStyle(label).fontSize), w = Math.max(3, Math.round(fs * 0.1)), dot = Math.round(w * 2.4);
    road.style.setProperty('--rw', `${w}px`);
    road.style.setProperty('--rd', `${dot}px`);
    road.style.width = `${label.offsetWidth + dot + w}px`;
    road.style.transform = `translateY(${label.offsetTop + label.offsetHeight + Math.round(fs * 0.02)}px)`;
    requestAnimationFrame(() => road.classList.add('is-ready'));
  }

  /* Список аудиторий: стрелки, Home/End, Enter и пробел выбирают, Esc и Tab закрывают */
  let active = 0;
  const mark = (i) => {
    active = (i + opts.length) % opts.length;
    opts.forEach((o, n) => o.classList.toggle('is-active', n === active));
    box.setAttribute('aria-activedescendant', opts[active].id);
  };
  function open() {
    box.hidden = false; btn.setAttribute('aria-expanded', 'true');
    mark(opts.findIndex((o) => o.dataset.key === key));
    box.focus();
  }
  function close(focus) {
    box.hidden = true; btn.setAttribute('aria-expanded', 'false');
    if (focus) btn.focus();
  }
  btn.addEventListener('click', () => (box.hidden ? open() : close()));
  box.addEventListener('click', (e) => { const o = e.target.closest('[role="option"]'); if (o) { show(o.dataset.key); close(true); } });
  box.addEventListener('keydown', (e) => {
    const k = { ArrowDown: 1, ArrowUp: -1 }[e.key];
    if (k) { e.preventDefault(); mark(active + k); }
    else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); mark(e.key === 'Home' ? 0 : opts.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(opts[active].dataset.key); close(true); }
    else if (e.key === 'Escape') close(true);
    else if (e.key === 'Tab') close();
  });
  btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
  document.addEventListener('click', (e) => { if (!box.hidden && !root.querySelector('.aud').contains(e.target)) close(); });

  new ResizeObserver(placeRoad).observe(root);
  document.fonts?.ready.then(placeRoad);
  show('abit');
}

/* «Сейчас» в солнце первого экрана: этап, который идёт сейчас (или ближайший), и следующий за ним */
function renderNow(el, k) {
  if (!el) return;
  const [title, stages] = NOW[k];
  el.querySelector('[data-now-k]').textContent = title;
  const t = TODAY.getTime();
  // прошедшие события убираем, этапы приёма оставляем пройденными
  const rows = stages.map(([name, date, from, to, act, href]) => ({ name, date, act, href, ev: typeof from === 'string', from: stageDate(from).getTime(), to: stageDate(to, true).getTime() }))
    .filter((r) => !(r.ev && r.to < t))
    .sort((a, b) => a.from - b.from);
  let here = rows.findIndex((r) => r.from <= t && t <= r.to);
  const ongoing = here >= 0;
  if (!ongoing) here = rows.findIndex((r) => r.from > t);
  if (here < 0) here = rows.length - 1;
  const ol = el.querySelector('[data-now]');
  ol.innerHTML = rows.map((r, i) => {
    const cls = r.to < t && i < here ? 'is-done' : i === here ? 'is-here' : i === here + 1 ? 'is-next' : '';
    const s = i === here ? `<span class="now__s">${ongoing ? 'Сейчас' : r.ev ? 'Скоро' : 'Следующий шаг'}</span>` : i === here + 1 ? '<span class="now__s">Дальше</span>' : '';
    const a = i === here ? `<a class="now__a" href="${r.href}">${r.act}</a>` : '';
    return `<li class="${cls}${r.name.length > 22 || /\S{13,}/.test(r.name) ? ' is-long' : ''}" style="--d:${i * 60}ms">${s}<span class="now__t">${r.name}</span><span class="now__d">${r.date}</span>${a}</li>`;
  }).join('');
  el.querySelector('.now__none')?.remove();
  if (!rows.length) ol.insertAdjacentHTML('afterend', '<p class="now__none">Ближайшие события университета собраны в календаре. <a href="#ev-h">Смотреть события</a></p>');
  if (MOTION && el.dataset.ready) { ol.classList.remove('is-swap'); void ol.offsetWidth; ol.classList.add('is-swap'); }
  el.dataset.ready = 1;
}

/* «Куда ведут дороги» на главной: 378 программ — 378 линий от точки знака к 13 институтам (данные data/programs.js) */
function initFan() {
  const fan = document.querySelector('[data-fan]');
  if (!fan || typeof PROGRAMS === 'undefined') return;
  const band = fan.closest('section');
  const lvBox = band.querySelector('[data-fan-lv]'), list = band.querySelector('[data-fan-inst]');
  const nEl = band.querySelector('[data-fan-n]'), lEl = band.querySelector('[data-fan-l]'), go = band.querySelector('[data-fan-go]');
  const lvRank = Object.fromEntries(LEVEL_ORDER.map((k, i) => [k, i]));
  const by = {};
  PROGRAMS.forEach((p) => (by[p.inst] ||= []).push(p));
  const insts = Object.keys(by).sort((a, b) => by[b].length - by[a].length);
  insts.forEach((k) => by[k].sort((a, b) => lvRank[a.level] - lvRank[b.level]));
  let level = '';

  lvBox.innerHTML = [['', 'Все уровни'], ...LEVEL_ORDER.map((k) => [k, LEVEL_LABEL[k]])]
    .map(([v, t]) => `<button class="chip" type="button" data-v="${v}" aria-pressed="${v === level}">${t}</button>`).join('');
  list.innerHTML = insts.map((k) => `<li><a href="katalog.html?inst=${k}" data-inst="${k}"><b>${INST[k][0]}</b><span>${INST[k][1]}</span><em></em><i class="sr"></i></a></li>`).join('');

  function draw() {
    fan.querySelector('.fan__svg')?.remove();
    fan.querySelector('.fan__dot')?.remove();
    const W = fan.clientWidth, H = fan.clientHeight, wide = getComputedStyle(list).gridColumnStart === '2';
    const rows = [...list.children];
    const ox = 6, oy = wide ? H / 2 : 120, ex = wide ? list.offsetLeft - 16 : W - 6;
    const L = ex - ox;
    /* Линии одного института и уровня — одна фигура из многих отрезков: на экране 378 линий, в документе около 45 элементов */
    let paths = '';
    insts.forEach((k, i) => {
      const r = rows[i];
      const cy = wide ? r.offsetTop + r.offsetHeight / 2 : 14 + (212 * i) / (insts.length - 1);
      const band = wide ? r.offsetHeight * 0.62 : 12;
      const n = by[k].length, d = {};
      by[k].forEach((p, j) => {
        const ey = cy + (n > 1 ? (j / (n - 1) - 0.5) * band : 0);
        d[p.level] = (d[p.level] || '') + `M${ox} ${oy.toFixed(1)}C${(ox + L * 0.42).toFixed(1)} ${oy.toFixed(1)} ${(ex - L * 0.42).toFixed(1)} ${ey.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
      });
      for (const [lv, dd] of Object.entries(d)) paths += `<path data-i="${k}" data-l="${lv}" d="${dd}"/>`;
    });
    fan.insertAdjacentHTML('afterbegin', `<svg class="fan__svg" aria-hidden="true" focusable="false">${paths}</svg><i class="fan__dot" aria-hidden="true" style="left:${ox}px;top:${oy}px"></i>`);
    apply();
  }
  function apply() {
    let total = 0;
    fan.querySelectorAll('.fan__svg path').forEach((p) => p.classList.toggle('is-off', !!level && p.dataset.l !== level));
    list.querySelectorAll('a').forEach((a) => {
      const n = by[a.dataset.inst].filter((p) => !level || p.level === level).length;
      total += n;
      a.querySelector('em').textContent = n;
      a.classList.toggle('is-zero', !n);
      a.href = `katalog.html?inst=${a.dataset.inst}${level ? `&level=${encodeURIComponent(level)}` : ''}`;
      a.querySelector('.sr').textContent = ' ' + plural(n, ['программа', 'программы', 'программ']);
    });
    nEl.textContent = total;
    lEl.textContent = plural(total, ['программа', 'программы', 'программ']);
    go.href = `katalog.html${level ? `?level=${encodeURIComponent(level)}` : ''}`;
  }
  lvBox.addEventListener('click', (e) => {
    const b = e.target.closest('[data-v]');
    if (!b) return;
    level = b.dataset.v;
    lvBox.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', c === b));
    apply();
  });
  /* Наведение или фокус на институт подсвечивает его дороги */
  let cur = '';
  const hot = (k = '') => {
    if (k === cur) return;
    cur = k;
    fan.classList.toggle('is-focus', !!k);
    fan.querySelectorAll('.fan__svg path').forEach((p) => p.classList.toggle('is-hot', !!k && p.dataset.i === k && (!level || p.dataset.l === level)));
  };
  list.addEventListener('mouseover', (e) => { const a = e.target.closest('a'); if (a) hot(a.dataset.inst); });
  list.addEventListener('mouseleave', () => hot(''));
  list.addEventListener('focusin', (e) => hot(e.target.closest('a')?.dataset.inst));
  list.addEventListener('focusout', () => hot(''));

  draw();
  new ResizeObserver(() => draw()).observe(fan);
  /* Дороги прорисовываются один раз, когда блок попадает на экран; после этого перерисовка при ресайзе без анимации */
  if (MOTION) {
    fan.classList.add('is-wait');
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      fan.classList.replace('is-wait', 'is-draw');
      setTimeout(() => fan.classList.remove('is-draw'), 2000);
      io.disconnect();
    }, { threshold: 0.25 });
    io.observe(fan);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const h = document.querySelector('[data-header]');
  if (h) h.outerHTML = header();
  document.querySelectorAll('[data-sign]').forEach((el) => { el.innerHTML = SIGN(el.dataset.sign); });
  const f = document.querySelector('[data-footer]');
  if (f) f.outerHTML = footer();
  initTypo();
  initA11y();
  initSearch();
  initMenu();
  initMega();
  initAudience();
  initFan();
  initRoads();
  initMotion();
  initTrack();
  initFades();
  if (document.querySelector('[data-nav]')) { spyNav(); addEventListener('scroll', spyNav, { passive: true }); }
  const hd = document.querySelector('.header');
  const onScroll = () => {
    hd.classList.toggle('is-scrolled', window.scrollY > 4);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    hd.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max) : 0);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
