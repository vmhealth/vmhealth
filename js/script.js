// Año dinámico
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Menú hamburguesa
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

if (burger && menu) {
    burger.addEventListener('click', () => {
        const open = getComputedStyle(menu).display !== 'none';
        menu.style.display = open ? 'none' : 'flex';
        menu.style.flexDirection = 'column';
        menu.style.gap = '8px';
        burger.setAttribute('aria-expanded', String(!open));
    });

    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (window.innerWidth < 761) menu.style.display = 'none';
        });
    });
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Pequeño “magnet” en CTA
document.querySelectorAll('.magnet').forEach(btn => {
    let raf = null;

    btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);

        if (!raf) {
            raf = requestAnimationFrame(() => {
                btn.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
                raf = null;
            });
        }
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
    });
});

// Scroll suave para anclas
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const t = document.getElementById(id);

        if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===========================
// Convenios: hover en desktop, click en móvil
// ===========================
function isTouchDevice() {
    return window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth <= 760;
}

function closeAllAgreements() {
    document.querySelectorAll('.agreement-logo-wrap.is-open').forEach(card => {
        card.classList.remove('is-open');
        card.setAttribute('aria-expanded', 'false');
    });
}

function initAgreementCards() {
    const agreementCards = document.querySelectorAll('.agreement-logo-wrap');

    agreementCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');

        if (!card.dataset.bound) {
            card.addEventListener('click', (e) => {
                if (!isTouchDevice()) return;

                e.preventDefault();
                e.stopPropagation();

                const wasOpen = card.classList.contains('is-open');
                closeAllAgreements();

                if (!wasOpen) {
                    card.classList.add('is-open');
                    card.setAttribute('aria-expanded', 'true');
                }
            });

            card.addEventListener('keydown', (e) => {
                if (!isTouchDevice()) return;

                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const wasOpen = card.classList.contains('is-open');
                    closeAllAgreements();

                    if (!wasOpen) {
                        card.classList.add('is-open');
                        card.setAttribute('aria-expanded', 'true');
                    }
                }

                if (e.key === 'Escape') {
                    card.classList.remove('is-open');
                    card.setAttribute('aria-expanded', 'false');
                }
            });

            card.dataset.bound = 'true';
        }
    });

    document.addEventListener('click', (e) => {
        if (!isTouchDevice()) return;
        if (!e.target.closest('.agreement-logo-wrap')) {
            closeAllAgreements();
        }
    });
}

initAgreementCards();

window.addEventListener('resize', () => {
    if (!isTouchDevice()) {
        closeAllAgreements();
    }
});

// ===========================
// Language switch (ES / EN)
// ===========================
const i18n = {
    es: {
        title: "VM Health — Terapia Física & Ocupacional",
        nav: ["Inicio", "Nosotros", "Terapia Física", "Terapia Ocupacional", "Planes", "Convenios", "Equipo"],
        burgerLabel: "Abrir menú",
        toTopLabel: "Volver arriba",

        hero: {
            h1: "Cuidamos tu bienestar, impulsamos tu independencia",
            lead: "Promovemos la salud, la autonomía y la funcionalidad a través de la fisioterapia y la terapia ocupacional, con una atención personalizada y basada en evidencia.",
            btns: ["Terapia Física", "Terapia Ocupacional", "Terapia de Lenguaje"],
            bullets: ["Planes 100% personalizados", "Basados en evidencia", "Enfoque humano e inclusivo"],
            heroImgAlt: "Terapia física en acción"
        },

        agendaHero: {
            title: "Agenda con nosotros",
            whatsapp: "Escríbenos al WhatsApp",
            form: "Llenar el formulario"
        },

        about: {
            h2: "Sobre Nosotros",
            p1: "Somos un equipo de profesionales comprometidos con la rehabilitación integral y el bienestar funcional de cada persona.",
            p2: "Nuestro objetivo es ayudarte a recuperar tu independencia, mejorar tu calidad de vida y potenciar tus capacidades físicas y ocupacionales a través de un acompañamiento terapéutico humano, personalizado y basado en evidencia científica."
        },

        pt: {
            h2: "Servicios de Terapia Física",
            desc: "La terapia física se enfoca en restaurar el movimiento, aliviar el dolor y mejorar la función del cuerpo. A través de técnicas manuales, ejercicio terapéutico y programas personalizados, ayudamos a las personas a recuperar su bienestar físico y prevenir nuevas lesiones.",
            cards: [
                {
                    title: "Atención Geriátrica",
                    desc: "Preservar movilidad, prevenir caídas y mantener independencia funcional. Fortalecimiento, equilibrio, coordinación y control postural para una vida activa, segura y con calidad."
                },
                {
                    title: "Atención Cardiovascular",
                    desc: "Rehabilitación post-cardíaca con ejercicio controlado, educación en autocuidado y reentrenamiento al esfuerzo para mejorar resistencia, capacidad pulmonar y calidad de vida."
                },
                {
                    title: "Atención Deportiva",
                    desc: "Prevención de lesiones, optimización del rendimiento y readaptación segura. Valoración funcional y programas de fortalecimiento específicos según disciplina y nivel."
                },
                {
                    title: "Rehabilitación Postquirúrgica",
                    desc: "Recuperación de fuerza, movilidad y función tras cirugía musculoesquelética o articular, asegurando progresión segura y adaptada a cada intervención."
                },
                {
                    title: "Dolor Muscular y Articular",
                    desc: "Manejo de sobrecarga, malas posturas o patologías crónicas con técnicas manuales, estiramientos, ejercicios y educación postural para reducir dolor y mejorar movilidad."
                },
                {
                    title: "Alteraciones Neuromusculares",
                    desc: "Para afecciones del sistema nervioso (ACV, Parkinson, lesiones medulares). Mejora de control motor, fuerza y coordinación, promoviendo independencia en actividades cotidianas."
                }
            ]
        },

        ot: {
            h2: "Servicios de Terapia Ocupacional",
            desc: "La terapia ocupacional potencia la autonomía, la funcionalidad y la participación activa en todas las etapas de la vida.",
            cards: [
                {
                    title: "Atención Infantil",
                    desc: "Para dificultades en desarrollo motor, sensorial o cognitivo. Juego terapéutico, estimulación sensorial y estrategias de aprendizaje funcional para desarrollo, coordinación, atención e independencia."
                },
                {
                    title: "Rehabilitación Cognitiva y Funcional",
                    desc: "Para afectaciones neurológicas, deterioro cognitivo o lesiones cerebrales. Trabajo en memoria, atención, planificación, motricidad fina y AVD, favoreciendo participación en hogar y comunidad."
                },
                {
                    title: "Rehabilitación de Mano y Miembro Superior",
                    desc: "Lesiones traumáticas, quirúrgicas o degenerativas. Fortalecimiento, movilidad y coordinación para recuperar destreza y control funcional."
                },
                {
                    title: "Integración Sensorial",
                    desc: "Para hipersensibilidad, dificultades motoras o regulación emocional. Organizamos y procesamos estímulos del entorno para mejorar conducta, aprendizaje y autonomía."
                },
                {
                    title: "Entrenamiento en AVD",
                    desc: "Desarrollar o recuperar la capacidad de vestirse, alimentarse o desplazarse con independencia. Se adapta a capacidades individuales y promueve confianza y seguridad funcional."
                },
                {
                    title: "Adaptación del Entorno y Ayudas Técnicas",
                    desc: "Evaluación de hogar, escuela o trabajo para identificar barreras y proponer soluciones. Recomendación y entrenamiento en ayudas técnicas para movilidad, acceso y participación."
                }
            ]
        },

        plans: {
            h2: "Planes Terapéuticos",
            sub: "Contamos con planes estructurados por sesiones, diseñados según las metas terapéuticas de cada persona, su proceso de rehabilitación y el entorno en el que necesita desenvolverse con mayor independencia.",
            groups: [
                {
                    badge: "Terapia Física",
                    heading: "Planes enfocados en movimiento, rehabilitación y mantenimiento funcional",
                    cards: [
                        {
                            tag: "Plan Deportivo",
                            sessions: "10 sesiones",
                            title: "Terapia de Rehabilitación Deportiva",
                            desc: "Programa enfocado en personas con lesiones deportivas o en proceso de readaptación física. Incluye valoración funcional, control del dolor, fortalecimiento, movilidad y retorno progresivo a la actividad."
                        },
                        {
                            tag: "Adulto Mayor",
                            sessions: "10 sesiones",
                            title: "Sesiones de Mantenimiento Funcional",
                            desc: "Plan orientado a preservar la movilidad, el equilibrio, la fuerza y la autonomía del adulto mayor, favoreciendo la prevención de caídas y el mantenimiento de una vida activa y segura."
                        }
                    ]
                },
                {
                    badge: "Terapia Ocupacional",
                    heading: "Planes orientados a funcionalidad, participación y acompañamiento integral",
                    cards: [
                        {
                            tag: "Entorno Escolar",
                            sessions: "10 sesiones",
                            title: "Plan de Intervención Escolar",
                            desc: "Diseñado para fortalecer habilidades de participación en el contexto educativo, incluyendo atención, seguimiento de rutinas, autorregulación, organización y adaptación al entorno escolar."
                        },
                        {
                            tag: "Familia",
                            sessions: "10 sesiones",
                            title: "Plan de Manejo y Acompañamiento Familiar",
                            desc: "Enfocado en brindar estrategias prácticas a la familia para acompañar el proceso terapéutico, fortalecer rutinas en casa, mejorar la participación y favorecer la generalización de avances en la vida diaria."
                        },
                        {
                            tag: "Conductual",
                            sessions: "10 sesiones",
                            title: "Plan de Manejo Conductual",
                            desc: "Dirigido a apoyar procesos de regulación, conducta y participación funcional mediante estrategias terapéuticas individualizadas, promoviendo mayor adaptación en casa, escuela y comunidad."
                        }
                    ]
                }
            ]
        },

        agreements: {
            h2: "Nuestros Convenios",
            sub: "En VM Health contamos con convenios que fortalecen el acceso a nuestros servicios y favorecen una atención terapéutica más cercana, práctica y accesible para nuestros pacientes.",
            cards: [
                {
                    title: "PALIG",
                    desc: "Convenio disponible para facilitar el acceso de pacientes vinculados a PALIG a nuestros servicios terapéuticos, brindando atención profesional, personalizada y enfocada en su bienestar funcional.",
                    alt: "Logo convenio PALIG"
                },
                {
                    title: "ASSA",
                    desc: "Convenio orientado a apoyar a personas aseguradas o vinculadas con ASSA, promoviendo el acceso a procesos de rehabilitación y acompañamiento terapéutico según sus necesidades.",
                    alt: "Logo convenio ASSA"
                },
                {
                    title: "Saint Clare",
                    desc: "Convenio dirigido a estudiantes, familias y personal vinculado al Colegio Saint Clare, con el fin de facilitar el acceso a nuestros servicios de terapia física y terapia ocupacional mediante una atención profesional, cercana y orientada al bienestar integral.",
                    alt: "Logo convenio Saint Clare"
                },
                {
                    title: "MediSmart",
                    desc: "Convenio disponible para personas afiliadas a MediSmart, brindando acceso a procesos terapéuticos personalizados en terapia física y terapia ocupacional, enfocados en la prevención, rehabilitación y mejora de la funcionalidad.",
                    alt: "Logo convenio MediSmart"
                }
            ]
        },

        team: {
            h2: "Nuestro Equipo",
            members: [
                {
                    role: "Fisioterapeuta",
                    bio: "Con amplia formación y experiencia en el ámbito clínico, Aaron se especializa en procesos de rehabilitación física, prevención de lesiones y recuperación postquirúrgica. Su enfoque combina la valoración funcional detallada, la prescripción de ejercicio terapéutico y la educación del paciente como pilares de una terapia efectiva. Se distingue por su trato empático, profesionalismo y compromiso con resultados sostenibles que permitan al paciente retomar sus actividades con seguridad y confianza.",
                    imgAlt: "Aaron Villalobos"
                },
                {
                    role: "Terapeuta Ocupacional",
                    bio: "Profesional con sólida trayectoria en el área clínica, académica y de investigación. Jimena combina la práctica terapéutica con la visión innovadora en integración sensorial. Cuenta con formación avanzada en Neuropsicología y manejo conductual desde la perspectiva de la autorregulación aplicando estrategias centradas en la persona para favorecer la autonomía, la funcionalidad y la participación en las actividades diarias. Su experiencia incluye liderazgo en acreditaciones internacionales y colaboración interdisciplinaria en proyectos terapéuticos.",
                    imgAlt: "Jimena Mourraille"
                }
            ]
        },

        contact: {
            h2: "Contáctanos",
            sub: "Tu bienestar comienza aquí. Cada cita en VM Health es una oportunidad para avanzar hacia una vida más activa, independiente y sin dolor. Nos comprometemos a acompañarte en cada paso de tu proceso terapéutico, con empatía, profesionalismo y atención personalizada.",
            labels: {
                nombre: "Nombre",
                tel: "Teléfono",
                correo: "Correo",
                msg: "Mensaje"
            },
            placeholders: {
                nombre: "Tu nombre",
                tel: "+506 ...",
                correo: "tucorreo@ejemplo.com",
                msg: "Cuéntanos tu caso"
            },
            btn: "Enviar",
            sending: "Enviando...",
            sent: "Enviado ✔",
            error: "No se pudo enviar. Revisá tu conexión o bloqueadores y probá otra vez.",
            hoursTitle: "Horario de Atención",
            hours: [
                { day: "Lunes a Viernes", time: "7:00 a.m. – 9:00 p.m." },
                { day: "Sábado", time: "8:00 a.m. – 8:00 p.m." },
                { day: "Domingos y feriados", time: "Cerrado" }
            ],
            emailAria: "Correo electrónico",
            instagramAria: "Instagram",
            mapsAria: "Google Maps",
            mapTitle: "Mapa de ubicación"
        },

        footer: {
            text: "VM Health — Terapia Física & Ocupacional"
        }
    },

    en: {
        title: "VM Health — Physical & Occupational Therapy",
        nav: ["Home", "About", "Physical Therapy", "Occupational Therapy", "Plans", "Agreements", "Team"],
        burgerLabel: "Open menu",
        toTopLabel: "Back to top",

        hero: {
            h1: "We care for your well-being, we empower your independence",
            lead: "We promote health, autonomy, and functionality through physical and occupational therapy with personalized, evidence-based care.",
            btns: ["Physical Therapy", "Occupational Therapy", "Speech Therapy"],
            bullets: ["100% personalized plans", "Evidence-based", "Human & inclusive approach"],
            heroImgAlt: "Physical therapy in action"
        },

        agendaHero: {
            title: "Schedule with us",
            whatsapp: "Message us on WhatsApp",
            form: "Fill out the form"
        },

        about: {
            h2: "About Us",
            p1: "We are a team of professionals committed to comprehensive rehabilitation and each person’s functional well-being.",
            p2: "Our goal is to help you regain independence, improve quality of life, and enhance your physical and occupational abilities through a caring, personalized, evidence-based therapeutic approach."
        },

        pt: {
            h2: "Physical Therapy Services",
            desc: "Physical therapy focuses on restoring movement, relieving pain, and improving body function. Through manual techniques, therapeutic exercise, and personalized programs, we help people recover their well-being and prevent new injuries.",
            cards: [
                {
                    title: "Geriatric Care",
                    desc: "Preserve mobility, prevent falls, and maintain functional independence. Strength, balance, coordination, and postural control for an active, safe life with quality."
                },
                {
                    title: "Cardiovascular Care",
                    desc: "Post-cardiac rehabilitation with controlled exercise, self-care education, and graded reconditioning to improve endurance, lung capacity, and quality of life."
                },
                {
                    title: "Sports Care",
                    desc: "Injury prevention, performance optimization, and safe return-to-sport. Functional assessment and discipline-specific strengthening programs for every level."
                },
                {
                    title: "Post-Surgical Rehabilitation",
                    desc: "Recovery of strength, mobility, and function after musculoskeletal or joint surgery, ensuring safe and tailored progression for each procedure."
                },
                {
                    title: "Muscle & Joint Pain",
                    desc: "Management of overload, poor posture, or chronic conditions with manual therapy, stretching, exercise, and postural education to reduce pain and improve mobility."
                },
                {
                    title: "Neuromuscular Conditions",
                    desc: "For nervous system conditions (stroke, Parkinson’s, spinal cord injuries). Improve motor control, strength, and coordination, promoting independence in daily activities."
                }
            ]
        },

        ot: {
            h2: "Occupational Therapy Services",
            desc: "Occupational therapy enhances autonomy, functionality, and active participation throughout every stage of life.",
            cards: [
                {
                    title: "Pediatric Care",
                    desc: "For motor, sensory, or cognitive development challenges. Therapeutic play, sensory stimulation, and functional learning strategies to support development, coordination, attention, and independence."
                },
                {
                    title: "Cognitive & Functional Rehabilitation",
                    desc: "For neurological conditions, cognitive decline, or brain injuries. Work on memory, attention, planning, fine motor skills, and ADLs, supporting participation at home and in the community."
                },
                {
                    title: "Hand & Upper Limb Rehabilitation",
                    desc: "Traumatic, surgical, or degenerative injuries. Strength, mobility, and coordination to restore dexterity and functional control."
                },
                {
                    title: "Sensory Integration",
                    desc: "For hypersensitivity, motor difficulties, or emotional regulation. We organize and process environmental input to improve behavior, learning, and autonomy."
                },
                {
                    title: "ADL Training",
                    desc: "Develop or regain the ability to dress, eat, or move independently. Tailored to individual abilities and builds confidence and functional safety."
                },
                {
                    title: "Environment Adaptation & Assistive Devices",
                    desc: "Home, school, or workplace assessment to identify barriers and propose solutions. Recommendation and training in assistive devices for mobility, access, and participation."
                }
            ]
        },

        plans: {
            h2: "Therapeutic Plans",
            sub: "We offer session-based plans tailored to each person’s therapeutic goals, rehabilitation process, and the environment in which they need to function with greater independence.",
            groups: [
                {
                    badge: "Physical Therapy",
                    heading: "Plans focused on movement, rehabilitation, and functional maintenance",
                    cards: [
                        {
                            tag: "Sports Plan",
                            sessions: "10 sessions",
                            title: "Sports Rehabilitation Therapy",
                            desc: "A program designed for people with sports injuries or those going through physical reconditioning. It includes functional assessment, pain management, strengthening, mobility, and gradual return to activity."
                        },
                        {
                            tag: "Older Adults",
                            sessions: "10 sessions",
                            title: "Functional Maintenance Sessions",
                            desc: "A plan focused on preserving mobility, balance, strength, and independence in older adults, helping prevent falls and maintain an active and safe lifestyle."
                        }
                    ]
                },
                {
                    badge: "Occupational Therapy",
                    heading: "Plans focused on functionality, participation, and comprehensive support",
                    cards: [
                        {
                            tag: "School Environment",
                            sessions: "10 sessions",
                            title: "School Intervention Plan",
                            desc: "Designed to strengthen participation skills in educational settings, including attention, routine follow-through, self-regulation, organization, and adaptation to the school environment."
                        },
                        {
                            tag: "Family",
                            sessions: "10 sessions",
                            title: "Family Guidance and Support Plan",
                            desc: "Focused on providing practical strategies to help families support the therapeutic process, strengthen routines at home, improve participation, and encourage carryover into daily life."
                        },
                        {
                            tag: "Behavioral",
                            sessions: "10 sessions",
                            title: "Behavior Management Plan",
                            desc: "Aimed at supporting regulation, behavior, and functional participation through individualized therapeutic strategies, promoting better adaptation at home, school, and in the community."
                        }
                    ]
                }
            ]
        },

        agreements: {
            h2: "Our Agreements",
            sub: "At VM Health, we have agreements that strengthen access to our services and support a closer, more practical, and more accessible therapeutic experience for our patients.",
            cards: [
                {
                    title: "PALIG",
                    desc: "An available agreement that helps facilitate access for patients connected to PALIG, offering professional, personalized therapeutic care focused on their functional well-being.",
                    alt: "PALIG agreement logo"
                },
                {
                    title: "ASSA",
                    desc: "An agreement designed to support insured individuals or people connected to ASSA, promoting access to rehabilitation processes and therapeutic support according to their needs.",
                    alt: "ASSA agreement logo"
                },
                {
                    title: "Saint Clare",
                    desc: "An agreement for students, families, and staff linked to Saint Clare School, aimed at facilitating access to our physical and occupational therapy services through professional, approachable care focused on overall well-being.",
                    alt: "Saint Clare agreement logo"
                },
                {
                    title: "MediSmart",
                    desc: "An available agreement for MediSmart members, providing access to personalized physical and occupational therapy processes focused on prevention, rehabilitation, and improving functionality.",
                    alt: "MediSmart agreement logo"
                }
            ]
        },

        team: {
            h2: "Our Team",
            members: [
                {
                    role: "Physical Therapist",
                    bio: "With extensive training and clinical experience, Aaron specializes in physical rehabilitation processes, injury prevention, and post-surgical recovery. His approach combines detailed functional assessment, therapeutic exercise prescription, and patient education as pillars of effective therapy. He stands out for his empathy, professionalism, and commitment to sustainable results so patients can safely and confidently return to their daily activities.",
                    imgAlt: "Aaron Villalobos"
                },
                {
                    role: "Occupational Therapist",
                    bio: "A professional with a solid background in clinical practice, academia, and research. Jimena combines therapeutic practice with an innovative vision in sensory integration. She has advanced training in Neuropsychology and behavior management from a self-regulation perspective, applying person-centered strategies to support autonomy, functionality, and participation in daily activities. Her experience includes leadership in international accreditations and interdisciplinary collaboration in therapeutic projects.",
                    imgAlt: "Jimena Mourraille"
                }
            ]
        },

        contact: {
            h2: "Contact Us",
            sub: "Your well-being starts here. Every appointment at VM Health is an opportunity to move toward a more active, independent, pain-free life. We are committed to supporting you every step of the way with empathy, professionalism, and personalized care.",
            labels: {
                nombre: "Name",
                tel: "Phone",
                correo: "Email",
                msg: "Message"
            },
            placeholders: {
                nombre: "Your name",
                tel: "+506 ...",
                correo: "youremail@example.com",
                msg: "Tell us about your case"
            },
            btn: "Send",
            sending: "Sending...",
            sent: "Sent ✔",
            error: "Could not send your message. Please check your connection or blockers and try again.",
            hoursTitle: "Opening Hours",
            hours: [
                { day: "Monday to Friday", time: "8:00 a.m. – 7:00 p.m." },
                { day: "Saturday", time: "8:00 a.m. – 4:00 p.m." },
                { day: "Sundays & holidays", time: "Closed" }
            ],
            emailAria: "Email",
            instagramAria: "Instagram",
            mapsAria: "Google Maps",
            mapTitle: "Location map"
        },

        footer: {
            text: "VM Health — Physical & Occupational Therapy"
        }
    }
};

function applyLang(lang) {
    const t = i18n[lang] || i18n.es;
    document.documentElement.lang = lang;
    document.title = t.title;

    const navLinks = document.querySelectorAll(".menu a");
    if (navLinks.length >= 7) {
        navLinks.forEach((a, i) => {
            if (t.nav[i]) a.textContent = t.nav[i];
        });
    }

    const burgerBtn = document.querySelector(".burger");
    if (burgerBtn) burgerBtn.setAttribute("aria-label", t.burgerLabel);

    const heroH1 = document.querySelector("#inicio h1");
    if (heroH1) heroH1.textContent = t.hero.h1;

    const heroLead = document.querySelector("#inicio .lead");
    if (heroLead) heroLead.textContent = t.hero.lead;

    const heroBtns = document.querySelectorAll("#inicio .hero-actions .btn");
    if (heroBtns.length >= 3) {
        heroBtns[0].textContent = t.hero.btns[0];
        heroBtns[1].textContent = t.hero.btns[1];
        heroBtns[2].textContent = t.hero.btns[2];
    }

    const bullets = document.querySelectorAll("#inicio .hero-bullets li");
    if (bullets.length >= 3) {
        bullets[0].childNodes[1].nodeValue = " " + t.hero.bullets[0];
        bullets[1].childNodes[1].nodeValue = " " + t.hero.bullets[1];
        bullets[2].childNodes[1].nodeValue = " " + t.hero.bullets[2];
    }

    const heroImg = document.querySelector("#inicio .hero-img");
    if (heroImg) heroImg.alt = t.hero.heroImgAlt;

    const quickAgendaTitle = document.querySelector(".quick-agenda-title");
    if (quickAgendaTitle) quickAgendaTitle.textContent = t.agendaHero.title;

    const quickAgendaCards = document.querySelectorAll(".quick-agenda-card span");
    if (quickAgendaCards.length >= 2) {
        quickAgendaCards[0].textContent = t.agendaHero.whatsapp;
        quickAgendaCards[1].textContent = t.agendaHero.form;
    }

    const aboutH2 = document.querySelector("#sobre h2");
    if (aboutH2) aboutH2.textContent = t.about.h2;

    const aboutPs = document.querySelectorAll("#sobre .text-block p");
    if (aboutPs.length >= 2) {
        aboutPs[0].textContent = t.about.p1;
        aboutPs[1].textContent = t.about.p2;
    }

    const ptH2 = document.querySelector("#fisica .header-section .title");
    if (ptH2) ptH2.textContent = t.pt.h2;

    const ptDesc = document.querySelector("#fisica .header-section .description");
    if (ptDesc) ptDesc.textContent = t.pt.desc;

    const ptCards = document.querySelectorAll("#fisica .single-service");
    ptCards.forEach((card, idx) => {
        const c = t.pt.cards[idx];
        if (!c) return;

        const title = card.querySelector(".content .title");
        const desc = card.querySelector(".content .description");

        if (title) title.textContent = c.title;
        if (desc) desc.textContent = c.desc;
    });

    const otH2 = document.querySelector("#ocupacional .header-section .title");
    if (otH2) otH2.textContent = t.ot.h2;

    const otDesc = document.querySelector("#ocupacional .header-section .description");
    if (otDesc) otDesc.textContent = t.ot.desc;

    const otCards = document.querySelectorAll("#ocupacional .single-service");
    otCards.forEach((card, idx) => {
        const c = t.ot.cards[idx];
        if (!c) return;

        const title = card.querySelector(".content .title");
        const desc = card.querySelector(".content .description");

        if (title) title.textContent = c.title;
        if (desc) desc.textContent = c.desc;
    });

    const plansH2 = document.querySelector("#planes .section-head h2");
    if (plansH2) plansH2.textContent = t.plans.h2;

    const plansSub = document.querySelector("#planes .section-head .sub");
    if (plansSub) plansSub.textContent = t.plans.sub;

    const planGroups = document.querySelectorAll("#planes .plan-group");
    planGroups.forEach((group, groupIdx) => {
        const g = t.plans.groups[groupIdx];
        if (!g) return;

        const badge = group.querySelector(".plan-badge");
        const heading = group.querySelector(".plan-group-head h3");
        const cards = group.querySelectorAll(".plan-card");

        if (badge) {
            const icon = badge.querySelector("i");
            badge.innerHTML = "";
            if (icon) badge.appendChild(icon);
            badge.append(" " + g.badge);
        }

        if (heading) heading.textContent = g.heading;

        cards.forEach((card, cardIdx) => {
            const c = g.cards[cardIdx];
            if (!c) return;

            const tag = card.querySelector(".plan-tag");
            const sessions = card.querySelector(".plan-sessions");
            const title = card.querySelector("h4");
            const desc = card.querySelector("p");

            if (tag) tag.textContent = c.tag;
            if (sessions) sessions.textContent = c.sessions;
            if (title) title.textContent = c.title;
            if (desc) desc.textContent = c.desc;
        });
    });

    const agreementsH2 = document.querySelector("#convenios .section-head h2");
    if (agreementsH2) agreementsH2.textContent = t.agreements.h2;

    const agreementsSub = document.querySelector("#convenios .section-head .sub");
    if (agreementsSub) agreementsSub.textContent = t.agreements.sub;

    const agreementCards = document.querySelectorAll("#convenios .agreement-card");
    agreementCards.forEach((card, idx) => {
        const c = t.agreements.cards[idx];
        if (!c) return;

        const title = card.querySelector(".agreement-overlay h3");
        const desc = card.querySelector(".agreement-overlay p");
        const img = card.querySelector(".agreement-logo");

        if (title) title.textContent = c.title;
        if (desc) desc.textContent = c.desc;
        if (img) img.alt = c.alt;
    });

    const teamH2 = document.querySelector("#equipo h2");
    if (teamH2) teamH2.textContent = t.team.h2;

    const teamRoles = document.querySelectorAll("#equipo .team-info h4");
    const teamBios = document.querySelectorAll("#equipo .team-info p");
    const teamImgs = document.querySelectorAll("#equipo .avatar img");

    if (teamRoles.length >= 2) {
        teamRoles[0].textContent = t.team.members[0].role;
        teamRoles[1].textContent = t.team.members[1].role;
    }

    if (teamBios.length >= 2) {
        teamBios[0].textContent = t.team.members[0].bio;
        teamBios[1].textContent = t.team.members[1].bio;
    }

    if (teamImgs.length >= 2) {
        teamImgs[0].alt = t.team.members[0].imgAlt;
        teamImgs[1].alt = t.team.members[1].imgAlt;
    }

    const contactH2 = document.querySelector("#contacto h2");
    if (contactH2) contactH2.textContent = t.contact.h2;

    const contactSub = document.querySelector("#contacto .section-head .sub");
    if (contactSub) contactSub.textContent = t.contact.sub;

    const lblNombre = document.querySelector('label[for="nombre"]');
    const lblTel = document.querySelector('label[for="telefono"]');
    const lblCorreo = document.querySelector('label[for="correo"]');
    const lblMsg = document.querySelector('label[for="mensaje"]');

    if (lblNombre) lblNombre.textContent = t.contact.labels.nombre;
    if (lblTel) lblTel.textContent = t.contact.labels.tel;
    if (lblCorreo) lblCorreo.textContent = t.contact.labels.correo;
    if (lblMsg) lblMsg.textContent = t.contact.labels.msg;

    const inNombre = document.getElementById("nombre");
    const inTel = document.getElementById("telefono");
    const inCorreo = document.getElementById("correo");
    const inMsg = document.getElementById("mensaje");

    if (inNombre) inNombre.placeholder = t.contact.placeholders.nombre;
    if (inTel) inTel.placeholder = t.contact.placeholders.tel;
    if (inCorreo) inCorreo.placeholder = t.contact.placeholders.correo;
    if (inMsg) inMsg.placeholder = t.contact.placeholders.msg;

    const btnEnviar = document.getElementById("btnEnviar");
    if (btnEnviar && !btnEnviar.disabled) btnEnviar.textContent = t.contact.btn;

    const hoursH3 = document.querySelector("#contacto .hours h3");
    if (hoursH3) hoursH3.textContent = t.contact.hoursTitle;

    const hoursRows = document.querySelectorAll("#contacto .hours > div");
    if (hoursRows.length >= 3) {
        const d0 = hoursRows[0].querySelector("span:first-child");
        const t0 = hoursRows[0].querySelector("span:last-child");
        const d1 = hoursRows[1].querySelector("span:first-child");
        const t1 = hoursRows[1].querySelector("span:last-child");
        const d2 = hoursRows[2].querySelector("span:first-child");
        const t2 = hoursRows[2].querySelector("span:last-child");

        if (d0) d0.textContent = t.contact.hours[0].day;
        if (t0) t0.textContent = t.contact.hours[0].time;
        if (d1) d1.textContent = t.contact.hours[1].day;
        if (t1) t1.textContent = t.contact.hours[1].time;
        if (d2) d2.textContent = t.contact.hours[2].day;
        if (t2) t2.textContent = t.contact.hours[2].time;
    }

    const emailLink = document.querySelector('.contact-mini-item a[href^="mailto:"]');
    if (emailLink) emailLink.setAttribute("aria-label", t.contact.emailAria);

    const instagramLink = document.querySelector('.social-icon[aria-label="Instagram"]');
    if (instagramLink) instagramLink.setAttribute("aria-label", t.contact.instagramAria);

    const mapsLink = document.querySelector('.social-icon[aria-label="Google Maps"]');
    if (mapsLink) mapsLink.setAttribute("aria-label", t.contact.mapsAria);

    const mapIframe = document.querySelector("#contacto .map iframe");
    if (mapIframe) mapIframe.title = t.contact.mapTitle;

    const footerSmall = document.querySelector(".footer small");
    if (footerSmall) {
        footerSmall.innerHTML = `© <span id="year"></span> ${t.footer.text}`;
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    const toTop = document.querySelector(".to-top");
    if (toTop) toTop.setAttribute("aria-label", t.toTopLabel);

    localStorage.setItem("vmhealth_lang", lang);

    document.querySelectorAll(".lang-btn").forEach(b => {
        b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
}

function initLangBubble() {
    const saved = localStorage.getItem("vmhealth_lang") || "es";
    applyLang(saved);

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => applyLang(btn.dataset.lang));
    });
}

initLangBubble();

// ===========================
// Formspree AJAX
// ===========================
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("btnEnviar");

if (contactForm && sendBtn) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        sendBtn.disabled = true;
        const activeLangBeforeSubmit = localStorage.getItem("vmhealth_lang") || "es";
        const original = i18n[activeLangBeforeSubmit]?.contact?.btn || sendBtn.textContent;
        sendBtn.textContent = i18n[activeLangBeforeSubmit]?.contact?.sending || "Enviando...";

        try {
            const formData = new FormData(contactForm);

            const res = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (res.ok) {
                const activeLang = localStorage.getItem("vmhealth_lang") || "es";
                sendBtn.textContent = i18n[activeLang]?.contact?.sent || "Enviado ✔";
                contactForm.reset();

                setTimeout(() => {
                    sendBtn.disabled = false;
                    const currentLang = localStorage.getItem("vmhealth_lang") || "es";
                    sendBtn.textContent = i18n[currentLang]?.contact?.btn || original;
                }, 1500);
            } else {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Formspree rejected the submission.");
            }
        } catch (err) {
            console.error(err);
            const activeLang = localStorage.getItem("vmhealth_lang") || "es";
            alert(i18n[activeLang]?.contact?.error || "No se pudo enviar. Revisá tu conexión o bloqueadores y probá otra vez.");
            sendBtn.disabled = false;
            sendBtn.textContent = original;
        }
    });
}