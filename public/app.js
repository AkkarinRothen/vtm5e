// Application logic moved from index.html

const navContainer       = document.getElementById('discipline-list');
const contentContainer   = document.getElementById('discipline-content');
const searchBar          = document.getElementById('search-bar');
const clanFilter         = document.getElementById('clan-filter');
const backToTopButton    = document.getElementById('back-to-top');

const disciplinesView    = document.getElementById('disciplines-view');
const charCreationView   = document.getElementById('character-creation-view');
const clanLoreView       = document.getElementById('clan-lore-view');
const navDisciplines     = document.getElementById('nav-disciplines');
const navCharCreation    = document.getElementById('nav-char-creation');
const navClanLore        = document.getElementById('nav-clan-lore');
let disciplines = {};
let currentDiscipline = null;

function switchView(viewName) {
    disciplinesView.classList.toggle('active', viewName === 'disciplines');
    charCreationView.classList.toggle('active', viewName === 'char-creation');
    clanLoreView.classList.toggle('active', viewName === 'clan-lore');

    navDisciplines.classList.toggle('active', viewName === 'disciplines');
    navCharCreation.classList.toggle('active', viewName === 'char-creation');
    navClanLore.classList.toggle('active', viewName === 'clan-lore');
}

function renderDiscipline(disciplineKey) {
    const data = disciplines[disciplineKey];
    if (!data) {
        contentContainer.innerHTML = `
            <div class="text-center text-gray-500 bg-black bg-opacity-20 p-10 rounded-lg border border-gray-800">
                <p>Disciplina no encontrada.</p>
            </div>`;
        return;
    }

    currentDiscipline = disciplineKey;
    updateActiveButton();

    let powersHtml = '';
    for (let level = 1; level <= 5; level++) {
        const levelPowers = data.powers.filter(p => p.level === level);
        if (levelPowers.length) {
            powersHtml += `
                <h3 class="text-3xl font-bold mt-8 mb-4 text-red-500 border-b border-red-800 pb-2">
                    Nivel ${level}
                </h3>`;
            levelPowers.forEach(p => {
                powersHtml += `
                    <div class="mb-6 bg-black bg-opacity-30 p-4 rounded-lg border border-gray-800 shadow-lg">
                        <h4 class="text-2xl font-bold text-yellow-400">${p.name}</h4>
                        <p class="mb-3 italic text-gray-400">${p.effect}</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <p><strong class="text-gray-500 block">Costo:</strong> ${p.cost}</p>
                            <p><strong class="text-gray-500 block">Prerequisito:</strong> ${p.prerequisite}</p>
                            <p><strong class="text-gray-500 block">Amalgama:</strong> ${p.amalgam}</p>
                            <p><strong class="text-gray-500 block">Duración:</strong> ${p.duration}</p>
                            <p><strong class="text-gray-500 block">Reserva de Dados:</strong> ${p.dice}</p>
                            <p><strong class="text-gray-500 block">Reserva Opuesta:</strong> ${p.opposing}</p>
                        </div>
                        <p class="mt-3 text-sm text-gray-500 border-t border-gray-700 pt-2">
                            <strong class="text-gray-400">Notas:</strong> ${p.notes}
                        </p>
                        <p class="mt-2 text-xs text-right text-gray-600">${p.source}</p>
                    </div>`;
            });
        }
    }

    let ritualsHtml = '';
    if (data.rituals?.length) {
        ritualsHtml += `
            <h3 class="text-3xl font-bold mt-8 mb-4 text-red-500 border-b border-red-800 pb-2">
                Rituales
            </h3>`;
        data.rituals.forEach(r => {
            ritualsHtml += `
                <div class="mb-4 bg-black bg-opacity-30 p-4 rounded-lg border border-gray-800">
                    <h4 class="text-xl font-bold text-yellow-400">Nivel ${r.level}</h4>
                    <ul class="list-disc list-inside text-gray-400 mt-2">
                        ${r.names.map(n => `<li>${n}</li>`).join('')}
                    </ul>
                </div>`;
        });
    }

    contentContainer.innerHTML = `
        <div class="bg-black bg-opacity-20 p-6 rounded-lg border border-gray-800">
            <div class="border-b-2 border-red-800 pb-4 mb-6">
                <h2 class="text-4xl font-bold text-red-500">${data.title}</h2>
                ${data.subtitle ? `<p class="text-gray-400 italic mt-1">${data.subtitle}</p>` : ''}
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-center bg-black bg-opacity-40 p-3 rounded-md">
                <div><strong class="block text-gray-500 text-sm">Tipo</strong> ${data.type}</div>
                <div><strong class="block text-gray-500 text-sm">Amenaza</strong> ${data.threat}</div>
                <div><strong class="block text-gray-500 text-sm">Resonancia</strong> ${data.resonance}</div>
                <div><strong class="block text-gray-500 text-sm">Afinidad</strong> ${data.affinity.join(', ')}</div>
            </div>
            <h3 class="text-2xl font-bold mb-2 text-red-500">Descripción General</h3>
            <p class="text-gray-300 leading-relaxed">${data.description}</p>
            ${powersHtml}
            ${ritualsHtml}
        </div>`;
}

function updateActiveButton() {
    document.querySelectorAll('#discipline-list button').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.discipline === currentDiscipline)
    );
}

function normalizeText(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filterAndRenderNav() {
    const term = normalizeText(searchBar.value);
    const clan = normalizeText(clanFilter.value);
    navContainer.querySelectorAll('li').forEach(li => {
        const key = li.querySelector('button').dataset.discipline;
        const d   = disciplines[key];
        const byClan   = clan === 'all' || d.affinity.some(c => normalizeText(c) === clan);
        const bySearch = normalizeText(d.title).includes(term)
            || d.powers.some(p => normalizeText(p.name).includes(term));
        li.style.display = (byClan && bySearch) ? '' : 'none';
    });
}

function populateClanFilter() {
    const clanSet = new Set();
    Object.values(disciplines).forEach(d => d.affinity.forEach(c => clanSet.add(c)));
    const sorted = Array.from(clanSet).sort();
    clanFilter.innerHTML = '<option value="all">Todos los Clanes</option>' +
        sorted.map(c => `<option value="${c}">${c}</option>`).join('');
}

function initialize() {
    const keys = Object.keys(disciplines).sort((a,b) =>
        disciplines[a].title.localeCompare(disciplines[b].title)
    );
    navContainer.innerHTML = '';
    keys.forEach(key => {
        const btn = document.createElement('button');
        btn.textContent = disciplines[key].title;
        btn.dataset.discipline = key;
        btn.className = 'w-full text-left p-3 rounded-md transition-colors duration-200 hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-700 discipline-btn border-l-4 border-transparent';
        btn.onclick = () => renderDiscipline(key);
        const li = document.createElement('li');
        li.append(btn);
        navContainer.append(li);
    });

    populateClanFilter();
    searchBar.addEventListener('input', filterAndRenderNav);
    clanFilter.addEventListener('change', filterAndRenderNav);

    navDisciplines.addEventListener('click', () => switchView('disciplines'));
    navCharCreation.addEventListener('click', () => switchView('char-creation'));
    navClanLore.addEventListener('click', () => switchView('clan-lore'));

    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('invisible', window.pageYOffset <= 300);
        backToTopButton.classList.toggle('opacity-0',   window.pageYOffset <= 300);
        backToTopButton.classList.toggle('opacity-100', window.pageYOffset > 300);
    });
    backToTopButton.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
    );

    if (keys.length) renderDiscipline(currentDiscipline || keys[0]);
}

function setupClanButtons() {
    const buttons = document.querySelectorAll('.clan-btn');
    const sections = document.querySelectorAll('.clan-content');
    const titleEl  = document.getElementById('clan-lore-title');

    function activate(id) {
        buttons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
        sections.forEach(s => s.classList.toggle('active', s.id === id));

        const active = Array.from(buttons).find(b => b.dataset.target === id);
        if (titleEl && active) {
            titleEl.textContent = `Lore de los Clanes: ${active.textContent}`;
        }
    }

    buttons.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.target)));
    if (buttons.length) activate(buttons[0].dataset.target);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('public/data/disciplines.json')
        .then(r => r.json())
        .then(data => { disciplines = data; initialize(); })
        .catch(err => console.error('Failed to load disciplines:', err));

    setupClanButtons();
});
