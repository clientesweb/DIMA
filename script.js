document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.display = 'none';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in animation for sections
    const fadeElems = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

    // Back to Top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                backToTopButton.classList.add('opacity-100');
                backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                backToTopButton.classList.remove('opacity-100');
                backToTopButton.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Reservation modal functionality
    const reservationBtn = document.getElementById('reservation-btn');
    const reservationModal = document.getElementById('reservation-modal');
    const closeModal = document.getElementById('close-modal');
    const reservationForm = document.getElementById('reservation-form');

    if (reservationBtn && reservationModal && closeModal && reservationForm) {
        reservationBtn.addEventListener('click', () => {
            reservationModal.classList.remove('hidden');
        });

        closeModal.addEventListener('click', () => {
            reservationModal.classList.add('hidden');
        });

        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Gracias por tu reserva. Te contactaremos pronto para confirmar.');
            reservationModal.classList.add('hidden');
        });
    }

    // Service modals
    const serviceModalTriggers = document.querySelectorAll('.service-modal-trigger');
    const serviceModal = document.getElementById('service-modal');
    const serviceModalTitle = document.getElementById('service-modal-title');
    const serviceModalDescription = document.getElementById('service-modal-description');
    const closeServiceModal = document.getElementById('close-service-modal');

    const serviceInfo = {
        'branding': {
            title: 'Branding y Re-branding',
            description: 'Nuestro servicio de branding y re-branding está diseñado para crear o renovar la identidad visual de tu marca. Trabajamos contigo para desarrollar un logotipo único, seleccionar una paleta de colores adecuada y crear una guía de estilo completa que refleje la esencia de tu negocio.'
        },
        'production': {
            title: 'Producción y Estilismo',
            description: 'Nuestro equipo de producción y estilismo se encarga de crear contenido visual impactante para tu marca. Desde sesiones fotográficas hasta videos promocionales, nos aseguramos de que cada pieza de contenido esté perfectamente alineada con tu identidad de marca y objetivos de marketing.'
        },
        'social-media': {
            title: 'Gestión de Contenido y Redes Sociales',
            description: 'Nuestro servicio de gestión de contenido y redes sociales está diseñado para aumentar tu presencia online y engagement con tu audiencia. Desarrollamos estrategias de contenido personalizadas, creamos y programamos publicaciones, y analizamos el rendimiento para optimizar continuamente tus resultados en redes sociales.'
        },
        'community-manager': {
            title: 'Community Manager',
            description: 'Nuestro servicio de Community Manager se encarga de gestionar y cultivar la comunidad en línea de tu marca. Interactuamos con tu audiencia, respondemos a comentarios y mensajes, y fomentamos la participación activa para construir una comunidad leal alrededor de tu marca.'
        },
        'paid-media': {
            title: 'Paid Media',
            description: 'Nuestro servicio de Paid Media se enfoca en crear y gestionar campañas publicitarias efectivas en plataformas digitales. Utilizamos estrategias de segmentación avanzadas y optimización continua para maximizar el retorno de tu inversión publicitaria.'
        },
        'website': {
            title: 'Diseño y Desarrollo Web',
            description: 'Creamos sitios web atractivos, funcionales y optimizados para convertir visitantes en clientes. Nuestro enfoque se centra en el diseño centrado en el usuario, la velocidad de carga y la optimización para motores de búsqueda para asegurar que tu sitio web sea una herramienta efectiva de marketing.'
        }
    };

    if (serviceModalTriggers.length && serviceModal && serviceModalTitle && serviceModalDescription && closeServiceModal) {
        serviceModalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const service = trigger.getAttribute('data-service');
                if (serviceInfo[service]) {
                    serviceModalTitle.textContent = serviceInfo[service].title;
                    serviceModalDescription.textContent = serviceInfo[service].description;
                    serviceModal.classList.remove('hidden');
                }
            });
        });

        closeServiceModal.addEventListener('click', () => {
            serviceModal.classList.add('hidden');
        });
    }

    // Gallery modals
    const galleryModalTriggers = document.querySelectorAll('.gallery-modal-trigger');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const galleryModalTitle = document.getElementById('gallery-modal-title');
    const galleryModalDescription = document.getElementById('gallery-modal-description');
    const galleryModalLink = document.getElementById('gallery-modal-link');
    const closeGalleryModal = document.getElementById('close-gallery-modal');

    const galleryInfo = {
        'branding-1': {
            title: 'Proyecto de Branding 1',
            description: 'Este proyecto de branding fue realizado para una startup tecnológica. Incluye el diseño de logotipo, paleta de colores y guía de estilo completa.',
            link: '#'
        },
        'production-1': {
            title: 'Proyecto de Producción 1',
            description: 'Esta sesión de fotos fue realizada para una marca de moda sostenible. Incluye fotografía de producto y lifestyle.',
            link: '#'
        },
        'social-media-1': {
            title: 'Campaña de Redes Sociales 1',
            description: 'Esta campaña de redes sociales fue desarrollada para un restaurante local. Incluye estrategia de contenido, creación de posts y gestión de comunidad.',
            link: '#'
        }
    };

    if (galleryModalTriggers.length && galleryModal && galleryModalImage && galleryModalTitle && galleryModalDescription && galleryModalLink && closeGalleryModal) {
        galleryModalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const project = trigger.getAttribute('data-project');
                if (galleryInfo[project]) {
                    galleryModalImage.src = trigger.src;
                    galleryModalTitle.textContent = galleryInfo[project].title;
                    galleryModalDescription.textContent = galleryInfo[project].description;
                    galleryModalLink.href = galleryInfo[project].link;
                    galleryModal.classList.remove('hidden');
                }
            });
        });

        closeGalleryModal.addEventListener('click', () => {
            galleryModal.classList.add('hidden');
        });
    }

    // Updated contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.innerHTML = `
            <div class="space-y-4">
                <input type="text" name="fullName" placeholder="Nombre completo *" required class="w-full p-2 bg-gray-800 text-white rounded">
                <input type="tel" name="whatsapp" placeholder="WhatsApp *" required class="w-full p-2 bg-gray-800 text-white rounded">
                <input type="url" name="website" placeholder="Sitio Web *" required class="w-full p-2 bg-gray-800 text-white rounded">
                <input type="text" name="country" placeholder="País" class="w-full p-2 bg-gray-800 text-white rounded">
                <select name="service" class="w-full p-2 bg-gray-800 text-white rounded">
                    <option value="">¿En qué servicios estás interesado? *</option>
                    <option value="BRANDING">BRANDING</option>
                    <option value="CREACIÓN DE CONTENIDO">CREACIÓN DE CONTENIDO | PRODUCCIÓN & ESTILISMO</option>
                    <option value="PAUTA PUBLICITARIA">PAUTA PUBLICITARIA</option>
                    <option value="TODOS">TODOS</option>
                </select>
                <input type="number" name="yearsInBusiness" placeholder="¿Cuántos años lleva la empresa en el mercado?" class="w-full p-2 bg-gray-800 text-white rounded">
                <select name="monthlyRevenue" class="w-full p-2 bg-gray-800 text-white rounded">
                    <option value="">¿Cuánto estás facturando por mes? *</option>
                    <option value="0-1000">0-1000 USD</option>
                    <option value="1000-3000">1000 USD A 3000 USD</option>
                    <option value="3000-5000">3000 USD A 5000 USD</option>
                    <option value="5000-10000">5000 USD - 10.000 USD</option>
                </select>
                <select name="advertisingExperience" class="w-full p-2 bg-gray-800 text-white rounded">
                    <option value="">¿Alguna vez invertiste en pauta publicitaria? *</option>
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                </select>
                <input type="number" name="advertisingBudget" placeholder="¿Qué monto estarías dispuesto a invertir en pauta publicitaria?" class="w-full p-2 bg-gray-800 text-white rounded">
                <button type="submit" class="w-full bg-highlight text-secondary font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors duration-300 flex items-center justify-center gap-2 font-display">
                    <i class="fas fa-paper-plane"></i>
                    Enviar Mensaje
                </button>
            </div>
        `;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/your_formspree_id', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('Mensaje enviado con éxito!');
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar el mensaje');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.', 'error');
            }
        });
    }

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `fixed bottom-4 left-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Hero title animation
    const heroTitles = [
        "Impulsá tu e-commerce hacia el éxito : hacemos que tu marca destaque y tus ventas aumenten",
        "Diseño y desarrollo web: creamos experiencias digitales que conviertan visitantes en clientes",
        "Estrategias de Marketing digital: potenciamos tu presencia online"
    ];
    let currentTitleIndex = 0;
    const heroTitle = document.getElementById('hero-title');

    function changeHeroTitle() {
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            setTimeout(() => {
                heroTitle.textContent = heroTitles[currentTitleIndex];
                heroTitle.style.opacity = '1';
                currentTitleIndex = (currentTitleIndex + 1) % heroTitles.length;
            }, 500);
        }
    }

    setInterval(changeHeroTitle, 5000);
    changeHeroTitle(); // Initial call to set the first title

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            try {
                // Replace with your actual newsletter subscription endpoint
                const response = await fetch('https://api.example.com/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    showNotification('¡Gracias por suscribirte a nuestro newsletter!');
                    newsletterForm.reset();
                } else {
                    throw new Error('Error al suscribirse al newsletter');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Hubo un error al suscribirte. Por favor, intenta de nuevo.', 'error');
            }
        });
    }

    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        gsap.utils.toArray('.fade-in').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate the banner messages
        const bannerMessages = [
            "Bienvenidos a Runway Studio",
            "Creatividad en Movimiento",
            "Transformamos Ideas en Realidad"
        ];
        let currentMessageIndex = 0;
        const bannerContainer = document.getElementById('banner-messages');

        function changeBannerMessage() {
            if (bannerContainer) {
                gsap.to(bannerContainer, {
                    y: -30,
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        bannerContainer.innerHTML = `<p class="text-center w-full font-display">${bannerMessages[currentMessageIndex]}</p>`;
                        currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
                        gsap.fromTo(bannerContainer, 
                            {y: 30, opacity: 0},
                            {y: 0, opacity: 1, duration: 0.5}
                        );
                    }
                });
            }
        }

        setInterval(changeBannerMessage, 5000);

        // Animate the floating buttons
        gsap.from("#reservation-btn", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 1,
            ease: "power3.out"
        });

        gsap.from("a[href='https://wa.me/543517323886']", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 1.2,
            ease: "power3.out"
        });
    }

    // Log a message to confirm the script has loaded
    console.log('Runway Studio script loaded successfully');
});

console.log('Script execution completed');