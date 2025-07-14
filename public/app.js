// Application logic moved from index.html

const navContainer = document.getElementById('discipline-list');
const contentContainer = document.getElementById('discipline-content');
const searchBar = document.getElementById('search-bar');
const clanFilter = document.getElementById('clan-filter');
const backToTopButton = document.getElementById('back-to-top');

const disciplinesView = document.getElementById('disciplines-view');
const charCreationView = document.getElementById('character-creation-view');
const clanLoreView = document.getElementById('clan-lore-view');
const navDisciplines = document.getElementById('nav-disciplines');
const navCharCreation = document.getElementById('nav-char-creation');
const navClanLore = document.getElementById('nav-clan-lore');
let disciplines = {};

let currentDiscipline = null;

function switchView(viewName) {
    if (viewName === 'disciplines') {
        disciplinesView.classList.add('active');
        charCreationView.classList.remove('active');
        clanLoreView.classList.remove('active');
        navDisciplines.classList.add('active');
        navCharCreation.classList.remove('active');
        navClanLore.classList.remove('active');
    } else if (viewName === 'char-creation') {
        disciplinesView.classList.remove('active');
        charCreationView.classList.add('active');
        clanLoreView.classList.remove('active');
        navDisciplines.classList.remove('active');
        navCharCreation.classList.add('active');
        navClanLore.classList.remove('active');
    } else if (viewName === 'clan-lore') {
        disciplinesView.classList.remove('active');
        charCreationView.classList.remove('active');
        clanLoreView.classList.add('active');
        navDisciplines.classList.remove('active');
        navCharCreation.classList.remove('active');
        navClanLore.classList.add('active');
    }
}

function renderDiscipline(disciplineName) {
    const data = disciplines[disciplineName];
    if (!data) {
        contentContainer.innerHTML = `<div class="text-center text-gray-500 bg-black bg-opacity-20 p-10 rounded-lg border border-gray-800"><p>Disciplina no encontrada.</p></div>`;
        return;
    }

    currentDiscipline = disciplineName;
    updateActiveButton();

    let powersHtml = '';
    for (let i = 1; i <= 5; i++) {
        const levelPowers = data.powers.filter(p => p.level === i);
        if (levelPowers.length > 0) {
            powersHtml += `<h3 class="text-3xl font-bold mt-8 mb-4 text-red-500 border-b border-red-800 pb-2">Nivel ${i}</h3>`;
            levelPowers.forEach(power => {
                powersHtml += `
                    <div class="mb-6 bg-black bg-opacity-30 p-4 rounded-lg border border-gray-800 shadow-lg">
                        <h4 class="text-2xl font-bold text-yellow-400">${power.name}</h4>
                        <p class="mb-3 italic text-gray-400">${power.effect}</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <p><strong class="text-gray-500 block">Costo:</strong> ${power.cost}</p>
                            <p><strong class="text-gray-500 block">Prerequisito:</strong> ${power.prerequisite}</p>
                            <p><strong class="text-gray-500 block">Amalgama:</strong> ${power.amalgam}</p>
                            <p><strong class="text-gray-500 block">Duración:</strong> ${power.duration}</p>
                            <p><strong class="text-gray-500 block">Reserva de Dados:</strong> ${power.dice}</p>
                            <p><strong class="text-gray-500 block">Reserva Opuesta:</strong> ${power.opposing}</p>
                        </div>
                        <p class="mt-3 text-sm text-gray-500 border-t border-gray-700 pt-2"><strong class="text-gray-400">Notas:</strong> ${power.notes}</p>
                        <p class="mt-2 text-xs text-right text-gray-600">${power.source}</p>
                    </div>
                `;
            });
        }
    }

    let ritualsHtml = '';
    if (data.rituals && data.rituals.length > 0) {
        ritualsHtml += `<h3 class="text-3xl font-bold mt-8 mb-4 text-red-500 border-b border-red-800 pb-2">Rituales</h3>`;
        data.rituals.forEach(ritualLevel => {
            ritualsHtml += `
                <div class="mb-4 bg-black bg-opacity-30 p-4 rounded-lg border border-gray-800">
                    <h4 class="text-xl font-bold text-yellow-400">Nivel ${ritualLevel.level}</h4>
                    <ul class="list-disc list-inside text-gray-400 mt-2">
                        ${ritualLevel.names.map(name => `<li>${name}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    }

    contentContainer.innerHTML = `
        <div class="bg-black bg-opacity-20 p-6 rounded-lg border border-gray-800">
            <div class="border-b-2 border-red-800 pb-4 mb-6">
                <h2 class="text-4xl font-bold text-red-500">${data.title}</h2>
                <p class="text-gray-400 italic mt-1">${data.subtitle}</p>
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
        </div>
    `;
}

function updateActiveButton() {
    document.querySelectorAll('#discipline-list li button').forEach(button => {
        button.classList.toggle('active', button.dataset.discipline === currentDiscipline);
    });
}

function normalizeText(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filterAndRenderNav() {
    const searchTerm = normalizeText(searchBar.value);
    const selectedClan = normalizeText(clanFilter.value);
    const listItems = navContainer.querySelectorAll('li');

    listItems.forEach(item => {
        const disciplineKey = item.querySelector('button').dataset.discipline;
        const discipline = disciplines[disciplineKey];

        const clanMatch = selectedClan === 'all' || discipline.affinity.some(clan => normalizeText(clan) === selectedClan);

        const searchMatch = normalizeText(discipline.title).includes(searchTerm) ||
                            discipline.powers.some(power => normalizeText(power.name).includes(searchTerm));

        if (clanMatch && searchMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function populateClanFilter() {
    const clans = new Set();
    Object.values(disciplines).forEach(d => {
        d.affinity.forEach(clan => clans.add(clan));
    });

    const sortedClans = Array.from(clans).sort();

    clanFilter.innerHTML = '<option value="all">Todos los Clanes</option>';
    sortedClans.forEach(clan => {
        const option = document.createElement('option');
        option.value = clan;
        option.textContent = clan;
        clanFilter.appendChild(option);
    });
}

function initialize() {
    const navList = document.getElementById('discipline-list');
    const sortedKeys = Object.keys(disciplines).sort((a, b) => disciplines[a].title.localeCompare(disciplines[b].title));

    navList.innerHTML = '';
    sortedKeys.forEach(key => {
        const discipline = disciplines[key];
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = discipline.title;
        button.dataset.discipline = key;
        button.className = 'w-full text-left p-3 rounded-md transition-colors duration-200 hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-700 discipline-btn border-l-4 border-transparent';
        button.onclick = () => renderDiscipline(key);
        li.appendChild(button);
        navList.appendChild(li);
    });

    populateClanFilter();

    searchBar.addEventListener('input', filterAndRenderNav);
    clanFilter.addEventListener('change', filterAndRenderNav);

    navDisciplines.addEventListener('click', () => switchView('disciplines'));
    navCharCreation.addEventListener('click', () => switchView('char-creation'));
    navClanLore.addEventListener('click', () => switchView('clan-lore'));

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (sortedKeys.length > 0) {
        renderDiscipline(currentDiscipline || sortedKeys[0]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('public/data/disciplines.json')
        .then(r => r.json())
        .then(data => { disciplines = data; initialize(); })
        .catch(err => console.error('Failed to load disciplines:', err));
    setupClanButtons();
});

function setupClanButtons() {
    const buttons = document.querySelectorAll('.clan-btn');
    const sections = document.querySelectorAll('.clan-content');

    function activate(targetId) {
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.target === targetId);
        });
        sections.forEach(sec => {
            sec.classList.toggle('active', sec.id === targetId);
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => activate(btn.dataset.target));
    });

    if (buttons.length > 0) {
        activate(buttons[0].dataset.target);
    }
}
