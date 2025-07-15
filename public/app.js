document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded. Initializing app...');

    // --- Data Definitions (Simulated API/Database) ---
    // En una aplicación real, estos datos probablemente vendrían de una API o una fuente de datos más robusta.
    const disciplinesData = [
        {
            id: 'animalism',
            name: 'Animalismo',
            clans: ['Nosferatu', 'Gangrel'],
            description: 'La Disciplina del Animalismo permite a los Vástagos comunicarse, controlar y manipular animales, así como sentir sus emociones y su presencia. Es una conexión primordial con la Bestia interior y el mundo natural.',
            powers: [
                { level: 1, name: 'Llamar a la Bestia', cost: '1 Hambre', effect: 'Invoca a un animal cercano para que se acerque al vampiro.' },
                { level: 2, name: 'Sentir la Bestia', cost: 'Ninguno', effect: 'Percibe la presencia de animales y otros Vástagos en un radio cercano.' },
                { level: 3, name: 'Dominar al Animal', cost: '1 Hambre', effect: 'Controla la mente y las acciones de un animal.' },
                { level: 4, name: 'Comunión Animal', cost: 'Ninguno', effect: 'Entabla una conversación telepática con cualquier animal.' },
                { level: 5, name: 'Rebaño de Guerra', cost: '2 Hambre', effect: 'Invoca y controla un grupo de animales para que actúen como una extensión de la voluntad del vampiro.' }
            ]
        },
        {
            id: 'auspex',
            name: 'Auspex',
            clans: ['Malkavian', 'Tremere', 'Toreador'],
            description: 'Auspex agudiza los sentidos del vampiro a niveles sobrenaturales, permitiéndole percibir lo oculto, leer auras, vislumbrar el futuro o el pasado, y comunicarse telepáticamente.',
            powers: [
                { level: 1, name: 'Sentidos Agudizados', cost: 'Ninguno', effect: 'Mejora la vista, el oído y el olfato a niveles sobrehumanos.' },
                { level: 2, name: 'Aura de Percepción', cost: 'Ninguno', effect: 'Permite al vampiro ver el aura de los seres vivos, revelando su estado emocional y su naturaleza sobrenatural.' },
                { level: 3, name: 'La Tercera Ojo', cost: '1 Hambre', effect: 'Otorga visiones del pasado o futuro, o la capacidad de percibir lo oculto y lo invisible.' },
                { level: 4, name: 'Proyección Psíquica', cost: '1 Hambre', effect: 'Permite al vampiro proyectar su conciencia fuera de su cuerpo para explorar su entorno.' },
                { level: 5, name: 'Mente en Blanco', cost: 'Ninguno', effect: 'Protege la mente del vampiro de intrusiones psíquicas y de la lectura de mentes.' }
            ]
        },
        {
            id: 'celerity',
            name: 'Celeridad',
            clans: ['Toreador', 'Brujah'],
            description: 'Celeridad es la Disciplina de la velocidad sobrenatural. Permite a los Vástagos moverse con una rapidez asombrosa, esquivar ataques y realizar acciones en un abrir y cerrar de ojos.',
            powers: [
                { level: 1, name: 'Ráfaga de Velocidad', cost: '1 Hambre', effect: 'Permite al vampiro realizar una acción adicional o moverse a una velocidad increíble.' },
                { level: 2, name: 'Esquiva Sobrehumana', cost: 'Ninguno', effect: 'Aumenta la capacidad del vampiro para esquivar ataques.' },
                { level: 3, name: 'Movimiento Borroso', cost: '1 Hambre', effect: 'El vampiro se mueve tan rápido que su imagen se vuelve borrosa, dificultando que lo golpeen.' },
                { level: 4, name: 'Golpe Relámpago', cost: '1 Hambre', effect: 'Permite al vampiro realizar múltiples ataques en un solo turno.' },
                { level: 5, name: 'Flujo de Tiempo', cost: '2 Hambre', effect: 'El vampiro se mueve tan rápido que el tiempo parece detenerse para los demás.' }
            ]
        },
        {
            id: 'dominate',
            name: 'Dominación',
            clans: ['Malkavian', 'Tremere', 'Ventrue'],
            description: 'Dominación es la Disciplina de la manipulación mental y el control de la voluntad. Permite a los Vástagos imponer su voluntad sobre los mortales y vampiros más débiles, forzándolos a obedecer sus órdenes.',
            powers: [
                { level: 1, name: 'Mirada Imperiosa', cost: 'Ninguno', effect: 'Obliga a un objetivo a obedecer una orden simple.' },
                { level: 2, name: 'Amnesia', cost: '1 Hambre', effect: 'Borra recuerdos recientes de la mente de un objetivo.' },
                { level: 3, name: 'La Voz del Amo', cost: '1 Hambre', effect: 'Permite al vampiro dar órdenes más complejas y duraderas.' },
                { level: 4, name: 'Condicionar', cost: '1 Hambre', effect: 'Implanta una sugerencia o un comportamiento en la mente de un objetivo que se activa bajo ciertas condiciones.' },
                { level: 5, name: 'Manipulación de Masas', cost: '2 Hambre', effect: 'Controla a un grupo de personas a la vez, haciéndolas actuar según la voluntad del vampiro.' }
            ]
        },
        {
            id: 'fortitude',
            name: 'Fortaleza',
            clans: ['Ventrue', 'Gangrel'],
            description: 'Fortaleza es la Disciplina de la resistencia sobrenatural. Concede a los Vástagos una piel endurecida, una increíble tolerancia al dolor y la capacidad de soportar daños que destruirían a un mortal.',
            powers: [
                { level: 1, name: 'Resistencia', cost: 'Ninguno', effect: 'Reduce el daño recibido de ataques físicos.' },
                { level: 2, name: 'Dureza', cost: 'Ninguno', effect: 'Ignora penalizaciones por heridas leves o moderadas.' },
                { level: 3, name: 'Blindaje de Sangre', cost: '1 Hambre', effect: 'La piel del vampiro se vuelve tan dura como la piedra, reduciendo drásticamente el daño.' },
                { level: 4, name: 'Desafiar el Dolor', cost: 'Ninguno', effect: 'El vampiro puede seguir actuando a pesar de heridas graves que normalmente lo incapacitarían.' },
                { level: 5, name: 'Inquebrantable', cost: '2 Hambre', effect: 'El vampiro se vuelve casi invulnerable a la mayoría de las formas de daño, excepto las más extremas.' }
            ]
        },
        {
            id: 'obfuscate',
            name: 'Ofuscación',
            clans: ['Nosferatu', 'Malkavian'],
            description: 'Ofuscación es la Disciplina del ocultamiento y la invisibilidad. Permite a los Vástagos manipular las mentes de los demás para que no los vean, los ignoren o los olviden, haciéndolos maestros del sigilo y el engaño.',
            powers: [
                { level: 1, name: 'Máscara de las Mil Caras', cost: 'Ninguno', effect: 'Cambia sutilmente la apariencia del vampiro para que pase desapercibido o parezca otra persona.' },
                { level: 2, name: 'Capa de Sombras', cost: '1 Hambre', effect: 'Hace al vampiro invisible a simple vista, aunque puede ser detectado por otros sentidos o por Disciplinas.' },
                { level: 3, name: 'Silencio de la Mente', cost: 'Ninguno', effect: 'Protege la mente del vampiro de la detección telepática y de la lectura de auras.' },
                { level: 4, name: 'Olvido', cost: '1 Hambre', effect: 'Borra la memoria de la presencia del vampiro de la mente de un objetivo.' },
                { level: 5, name: 'Velo de la Noche', cost: '2 Hambre', effect: 'Extiende la invisibilidad del vampiro a un área, ocultando a otros o a objetos.' }
            ]
        },
        {
            id: 'potence',
            name: 'Potencia',
            clans: ['Nosferatu', 'Brujah'],
            description: 'Potencia es la Disciplina de la fuerza sobrenatural. Otorga a los Vástagos una fuerza física increíble, permitiéndoles realizar hazañas de poder que superan con creces las capacidades humanas.',
            powers: [
                { level: 1, name: 'Golpe Potente', cost: 'Ninguno', effect: 'Aumenta la fuerza del vampiro en combate o al realizar tareas físicas.' },
                { level: 2, name: 'Salto Asombroso', cost: 'Ninguno', effect: 'Permite al vampiro saltar distancias y alturas increíbles.' },
                { level: 3, name: 'Puño de Acero', cost: '1 Hambre', effect: 'Los golpes del vampiro se vuelven tan devastadores que pueden romper huesos y destrozar objetos.' },
                { level: 4, name: 'Fuerza del Titán', cost: '1 Hambre', effect: 'El vampiro puede levantar y lanzar objetos de gran peso con facilidad.' },
                { level: 5, name: 'Demolición', cost: '2 Hambre', effect: 'El vampiro puede derribar estructuras o romper materiales increíblemente resistentes con sus manos.' }
            ]
        },
        {
            id: 'presence',
            name: 'Presencia',
            clans: ['Ventrue', 'Toreador', 'Brujah'],
            description: 'Presencia es la Disciplina del carisma y la seducción sobrenatural. Permite a los Vástagos inspirar amor, miedo, lealtad o admiración en los demás, convirtiéndolos en figuras magnéticas e influyentes.',
            powers: [
                { level: 1, name: 'Awe', cost: 'Ninguno', effect: 'Hace que los mortales se sientan atraídos o intimidados por el vampiro.' },
                { level: 2, name: 'Dread Gaze', cost: '1 Hambre', effect: 'Infunde un miedo paralizante en un objetivo, forzándolo a huir o congelarse.' },
                { level: 3, name: 'Entrancement', cost: '1 Hambre', effect: 'El vampiro puede encantar a un objetivo, haciéndolo devoto y leal.' },
                { level: 4, name: 'Majesty', cost: 'Ninguno', effect: 'Cualquiera que se oponga directamente al vampiro sufre una penalización.' },
                { level: 5, name: 'Summon', cost: '2 Hambre', effect: 'El vampiro puede convocar a cualquier persona que haya conocido previamente, y esta sentirá una compulsión irresistible de acercarse a él.' }
            ]
        },
        {
            id: 'blood-sorcery',
            name: 'Taumaturgia (Blood Sorcery)',
            clans: ['Tremere'],
            description: 'La Taumaturgia, o Magia de Sangre, es la Disciplina arcana de los Tremere. Permite a los Vástagos manipular la vitae y el mundo a través de rituales complejos y sendas místicas, invocando efectos elementales, curativos o destructivos.',
            powers: [
                { level: 1, name: 'Aura of Decay', cost: '1 Hambre', effect: 'Causa que los objetos inorgánicos se deterioren rápidamente al contacto.' },
                { level: 2, name: 'Corrosive Blood', cost: '1 Hambre', effect: 'El vampiro puede hacer que su sangre se vuelva corrosiva, dañando a quienes la ingieren o tocan.' },
                { level: 3, name: 'Theft of Vitae', cost: '1 Hambre', effect: 'Roba Puntos de Sangre de otro vampiro o mortal a distancia.' },
                { level: 4, name: 'Scry the Soul', cost: '2 Hambre', effect: 'Permite al vampiro ver la verdadera naturaleza de un individuo, revelando sus secretos más profundos y su estado de humanidad.' },
                { level: 5, name: 'Blood Boil', cost: '3 Hambre', effect: 'Hace que la sangre de un objetivo hierva en sus venas, causando un dolor insoportable y daño severo.' }
            ]
        }
        // Agrega más disciplinas aquí siguiendo la misma estructura
    ];

    const clansData = [
        { id: 'nosferatu', name: 'Nosferatu' },
        { id: 'malkavian', name: 'Malkavian' },
        { id: 'tremere', name: 'Tremere' },
        { id: 'ventrue', name: 'Ventrue' },
        { id: 'toreador', name: 'Toreador' },
        { id: 'gangrel', name: 'Gangrel' },
        { id: 'brujah', name: 'Brujah' },
        // Agrega más clanes si expandes la sección de lore
    ];

    // --- DOM Elements ---
    const navButtons = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const disciplineList = document.getElementById('discipline-list');
    const disciplineContent = document.getElementById('discipline-content');
    const searchBar = document.getElementById('search-bar');
    const clanFilter = document.getElementById('clan-filter');
    const clanLoreButtons = document.querySelectorAll('.clan-btn');
    const clanLoreContents = document.querySelectorAll('.clan-content');
    const backToTopButton = document.getElementById('back-to-top');

    // Verifica si los elementos esenciales se encuentran. Si no, registra un error y detiene la ejecución.
    if (!disciplineList || !disciplineContent || !searchBar || !clanFilter || !backToTopButton) {
        console.error('Error: No se encontraron uno o más elementos DOM esenciales. Revisa los IDs en el HTML.');
        // Si no se encuentran elementos esenciales, el script no puede funcionar, así que salimos.
        return;
    }
    console.log('Todos los elementos DOM esenciales encontrados.');

    // --- State Variables ---
    let activeDisciplineId = null; // Para mantener un registro de la disciplina actualmente mostrada

    // --- Helper Functions ---

    /**
     * Muestra una sección de contenido específica y oculta las demás.
     * @param {string} sectionId - El ID de la sección a mostrar.
     */
    const showSection = (sectionId) => {
        console.log(`Mostrando sección: ${sectionId}`);
        contentSections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
            // Desplázate al inicio de la sección para una mejor experiencia de usuario en la navegación
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn(`Sección con ID ${sectionId} no encontrada.`);
        }
    };

    /**
     * Actualiza el estado activo de los botones de navegación.
     * @param {HTMLElement} activeBtn - El botón a establecer como activo.
     */
    const updateNavButtons = (activeBtn) => {
        console.log('Actualizando botones de navegación.');
        navButtons.forEach(btn => btn.classList.remove('active'));
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    };

    /**
     * Genera y muestra la lista de disciplinas basándose en los filtros.
     */
    const renderDisciplineList = () => {
        console.log('Renderizando lista de disciplinas...');
        disciplineList.innerHTML = ''; // Limpia la lista existente
        const searchTerm = searchBar.value.toLowerCase();
        const selectedClan = clanFilter.value;

        const filteredDisciplines = disciplinesData.filter(discipline => {
            const matchesSearch = discipline.name.toLowerCase().includes(searchTerm) ||
                                  discipline.powers.some(power => power.name.toLowerCase().includes(searchTerm));
            const matchesClan = selectedClan === '' || discipline.clans.includes(selectedClan);
            return matchesSearch && matchesClan;
        }).sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente

        if (filteredDisciplines.length === 0) {
            disciplineList.innerHTML = '<li class="text-gray-500 text-center py-4">No se encontraron disciplinas.</li>';
            disciplineContent.innerHTML = `
                <div class="text-center text-gray-500 bg-black bg-opacity-25 p-10 rounded-xl border border-gray-700 shadow-lg min-h-[400px] flex items-center justify-center">
                    <p class="text-lg">No se encontraron disciplinas que coincidan con tu búsqueda y filtros.</p>
                </div>
            `;
            activeDisciplineId = null; // Reinicia la disciplina activa si ninguna coincide
            console.log('No se encontraron disciplinas que coincidan con los filtros.');
            return;
        }

        filteredDisciplitudes.forEach(discipline => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add(
                'w-full', 'text-left', 'px-4', 'py-2', 'rounded-md',
                'hover:bg-red-900/50', 'transition-colors', 'duration-200', 'ease-in-out',
                'focus:outline-none', 'focus:ring-2', 'focus:ring-red-600'
            );
            button.textContent = discipline.name;
            button.dataset.disciplineId = discipline.id;

            // Establece la clase activa si esta es la disciplina actualmente mostrada
            if (discipline.id === activeDisciplineId) {
                button.classList.add('bg-red-800'); // Estilo del botón de disciplina activa
            }

            button.addEventListener('click', () => {
                console.log(`Botón de disciplina clicado: ${discipline.id}`);
                displayDisciplineDetails(discipline.id);
                // Elimina la clase activa de todos los botones de disciplina
                document.querySelectorAll('#discipline-list button').forEach(btn => {
                    btn.classList.remove('bg-red-800');
                });
                // Añade la clase activa al botón clicado
                button.classList.add('bg-red-800');
            });

            listItem.appendChild(button);
            disciplineList.appendChild(listItem);
        });

        // Si no hay disciplina actualmente activa, o la activa está filtrada, muestra la primera
        if (!activeDisciplineId || !filteredDisciplines.some(d => d.id === activeDisciplineId)) {
            console.log('No hay disciplina activa o la activa está filtrada. Mostrando la primera disciplina filtrada.');
            displayDisciplineDetails(filteredDisciplines[0].id);
            // Establece el primer botón como activo
            const firstButton = disciplineList.querySelector('button');
            if (firstButton) {
                firstButton.classList.add('bg-red-800');
            }
        }
    };

    /**
     * Muestra la información detallada de una disciplina seleccionada.
     * @param {string} disciplineId - El ID de la disciplina a mostrar.
     */
    const displayDisciplineDetails = (disciplineId) => {
        console.log(`Mostrando detalles para la disciplina: ${disciplineId}`);
        const discipline = disciplinesData.find(d => d.id === disciplineId);
        if (!discipline) {
            disciplineContent.innerHTML = `
                <div class="text-center text-gray-500 bg-black bg-opacity-25 p-10 rounded-xl border border-gray-700 shadow-lg min-h-[400px] flex items-center justify-center">
                    <p class="text-lg">Disciplina no encontrada.</p>
                </div>
            `;
            activeDisciplineId = null;
            console.warn(`Disciplina con ID ${disciplineId} no encontrada en los datos.`);
            return;
        }

        activeDisciplineId = discipline.id; // Actualiza el ID de la disciplina activa

        let powersHtml = discipline.powers.map(power => `
            <div class="mb-4">
                <h4 class="text-xl font-semibold text-red-400 mb-1">Nivel ${power.level}: ${power.name}</h4>
                <p class="text-gray-400 text-sm mb-1">Costo: ${power.cost}</p>
                <p>${power.effect}</p>
            </div>
        `).join('');

        const clansHtml = discipline.clans.map(clan =>
            `<span class="inline-block bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full mr-2 mb-2">${clan}</span>`
        ).join('');

        disciplineContent.innerHTML = `
            <div class="bg-black bg-opacity-25 p-6 md:p-8 rounded-xl border border-gray-700 shadow-lg">
                <h3 class="text-3xl md:text-4xl font-bold text-red-500 mb-4 border-b-2 border-red-800 pb-3 font-cinzel-decorative">${discipline.name}</h3>
                <p class="mb-4 text-gray-300 leading-relaxed text-lg">${discipline.description}</p>
                <div class="mb-6">
                    <h4 class="text-xl font-bold text-yellow-400 mb-2">Clanes Afines:</h4>
                    ${clansHtml}
                </div>
                <div class="space-y-6">
                    <h4 class="text-xl font-bold text-yellow-400 mb-2">Poderes:</h4>
                    ${powersHtml}
                </div>
            </div>
        `;
        // Desplázate al inicio del área de contenido cuando se muestra una nueva disciplina
        disciplineContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    /**
     * Rellena el menú desplegable de filtro de clan dinámicamente.
     */
    const populateClanFilter = () => {
        console.log('Rellenando filtro de clan...');
        const uniqueClans = new Set();
        disciplinesData.forEach(d => {
            d.clans.forEach(clan => uniqueClans.add(clan));
        });

        // Agrega la opción "Todos los Clanes" primero
        clanFilter.innerHTML = '<option value="">Todos los Clanes</option>';

        Array.from(uniqueClans).sort().forEach(clan => {
            const option = document.createElement('option');
            option.value = clan;
            option.textContent = clan;
            clanFilter.appendChild(option);
        });
    };

    /**
     * Muestra un contenido de lore de clan específico y oculta los demás.
     * @param {string} clanId - El ID del contenido de clan a mostrar (ej. 'lore-nosferatu').
     */
    const showClanLore = (clanId) => {
        console.log(`Mostrando lore de clan: ${clanId}`);
        clanLoreContents.forEach(content => {
            content.classList.add('hidden');
        });
        const targetContent = document.getElementById(clanId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        } else {
            console.warn(`Contenido de lore de clan con ID ${clanId} no encontrado.`);
        }
    };

    /**
     * Actualiza el estado activo de los botones de lore de clan.
     * @param {HTMLElement} activeBtn - El botón a establecer como activo.
     */
    const updateClanLoreButtons = (activeBtn) => {
        console.log('Actualizando botones de lore de clan.');
        clanLoreButtons.forEach(btn => btn.classList.remove('active'));
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    };

    // --- Event Listeners ---

    // Botones de navegación (Disciplinas, Creación de Personaje, Lore de Clanes)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.id.replace('nav-', '') + '-view';
            updateNavButtons(button);
            showSection(targetId);
        });
    });

    // Búsqueda y filtro de disciplinas
    searchBar.addEventListener('input', renderDisciplineList);
    clanFilter.addEventListener('change', renderDisciplineList);

    // Botones de lore de clan
    clanLoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            updateClanLoreButtons(button);
            showClanLore(targetId);
        });
    });

    // Funcionalidad del botón "Volver arriba"
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Muestra el botón después de desplazarse 300px
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Configuración inicial al cargar la página ---
    // Rellena el menú desplegable de filtro de clan
    populateClanFilter();

    // Renderiza la lista inicial de disciplinas y muestra la primera
    renderDisciplineList();

    // Establece el lore de clan activo inicial (Nosferatu por defecto)
    const initialClanLoreButton = document.querySelector('.clan-btn[data-target="lore-nosferatu"]');
    if (initialClanLoreButton) {
        updateClanLoreButtons(initialClanLoreButton);
        showClanLore('lore-nosferatu');
    }
    console.log('Inicialización de la aplicación completa.');
});
