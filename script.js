document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.display = 'none';
        });
    }

    // Hero Title Rotation
    const heroTitles = document.querySelectorAll('.hero-title');
    let currentTitleIndex = 0;

    function showNextTitle() {
        heroTitles[currentTitleIndex].classList.remove('opacity-100');
        heroTitles[currentTitleIndex].classList.add('opacity-0');
        
        currentTitleIndex = (currentTitleIndex + 1) % heroTitles.length;
        
        heroTitles[currentTitleIndex].classList.remove('opacity-0');
        heroTitles[currentTitleIndex].classList.add('opacity-100');
    }

    // Mostrar el primer título inmediatamente
    heroTitles[0].classList.add('opacity-100');

    // Cambiar título cada 5 segundos
    setInterval(showNextTitle, 5000);

    // Fade-in animation for sections
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => observer.observe(elem));

    // Top banner messages
    const bannerMessages = [
        "Bienvenidos a Runway Studio",
        "Agendá una reunión sin cargo",
        "Regístrate hoy y obtené un 10% de descuento en tu próximo servicio contratado"
    ];
    const bannerContainer = document.getElementById('banner-messages');
    let currentMessageIndex = 0;

    function rotateBannerMessage() {
        bannerContainer.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
            bannerContainer.innerHTML = `<p class="text-center w-full">${bannerMessages[currentMessageIndex]}</p>`;
            bannerContainer.style.transform = 'translateY(0)';
        }, 500);
    }

    setInterval(rotateBannerMessage, 5000);

    // Updated Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-highlight', 'text-black'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-800'));
            button.classList.add('active', 'bg-highlight', 'text-black');
            button.classList.remove('bg-gray-200', 'text-gray-800');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Reservation Modal
    const reservationBtn = document.getElementById('reservation-btn');
    const closeModal = document.getElementById('close-modal');
    const reservationModal = document.getElementById('reservation-modal');
    const reservationForm = document.getElementById('reservation-form');

    reservationBtn.addEventListener('click', () => {
        reservationModal.classList.remove('hidden');
        showNotification('Formulario de reserva abierto!');
    });

    closeModal.addEventListener('click', () => {
        reservationModal.classList.add('hidden');
    });

    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(reservationForm);

        try {
            const response = await fetch('https://formspree.io/f/your_formspree_id', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Reserva enviada con éxito!');
                reservationForm.reset();
                reservationModal.classList.add('hidden');
            } else {
                throw new Error('Error al enviar la reserva');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Hubo un error al enviar tu reserva. Por favor, intenta de nuevo.', 'error');
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(newsletterForm);

            try {
                const response = await fetch('https://formspree.io/f/your_formspree_id', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('¡Suscripción al boletín exitosa!');
                    newsletterForm.reset();
                } else {
                    throw new Error('Error en la suscripción al boletín');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Hubo un error al suscribirte al boletín. Por favor, intenta de nuevo.', 'error');
            }
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
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

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} transition-opacity duration-300`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initialize Instagram embed
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate services on scroll
    gsap.utils.toArray('#services .group').forEach((service, i) => {
        gsap.from(service, {
            scrollTrigger: {
                trigger: service,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // Animate gallery items on scroll
    gsap.utils.toArray('#gallery .gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            delay: i * 0.1
        });
    });

    // Animate FAQ items
    gsap.utils.toArray('#faq .bg-secondary\\/10').forEach((faq, i) => {
        gsap.from(faq, {
            scrollTrigger: {
                trigger: faq,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -50,
            duration: 0.5,
            delay: i * 0.2
        });
    });

    // Service Modal Functionality
    const serviceModalTriggers = document.querySelectorAll('.service-modal-trigger');
    const serviceModal = document.getElementById('service-modal');
    const closeServiceModal = document.getElementById('close-service-modal');
    const serviceModalTitle = document.getElementById('service-modal-title');
    const serviceModalDescription = document.getElementById('service-modal-description');

    const serviceDetails = {
        'branding': {
            title: 'Branding y Re-branding',
            description: 'Creamos y renovamos la identidad de tu marca para destacar en el mercado. Nuestro servicio incluye diseño de logotipos, paletas de colores, y guías de estilo completas.'
        },
        'production': {
            title: 'Producción y Estilismo',
            description: 'Creamos contenido visual impactante para tu marca. Desde sesiones fotográficas hasta videos promocionales, nos encargamos de todos los aspectos de la producción.'
        },
        'social-media': {
            title: 'Gestión de Contenido y Redes Sociales',
            description: 'Desarrollamos y gestionamos contenido visual y escrito que refleja la identidad de tu marca. Construyendo una presencia sólida y coherente en redes sociales. Nuestro enfoque es atraer, inspirar y conectar con tu audiencia a través de estrategias integrales que fortalecen cada interacción en los canales clave para tu negocio'
        },
        'community-manager': {
            title: 'Community Manager',
            description: 'Gestionamos tus comunidades online para fortalecer la relación con tus clientes. Respondemos a comentarios, moderamos discusiones y fomentamos la participación de tu audiencia.'
        },
        'paid-media': {
            title: 'Paid Media',
            description: 'Gestionamos la publicidad estratégica en plataformas clave, optimizando la visibilidad y alcance de tu marca a través de campañas dirigidas que maximicen el retorno de inversión.'
        },
        'website': {
            title: 'Website',
            description: 'Diseñamos y desarrollamos sitios web atractivos y funcionales que convierten visitantes en clientes. Nuestros sitios son responsivos, rápidos y optimizados para SEO.'
        }
    };

    serviceModalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const service = trigger.dataset.service;
            const details = serviceDetails[service];
            serviceModalTitle.textContent = details.title;
            serviceModalDescription.textContent = details.description;
            serviceModal.classList.remove('hidden');
        });
    });

    closeServiceModal.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
    });

    // Gallery Modal Functionality
    const galleryModalTriggers = document.querySelectorAll('.gallery-modal-trigger');
    const galleryModal = document.getElementById('gallery-modal');
    const closeGalleryModal = document.getElementById('close-gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const galleryModalTitle = document.getElementById('gallery-modal-title');
    const galleryModalDescription = document.getElementById('gallery-modal-description');
    const galleryModalLink = document.getElementById('gallery-modal-link');

    const galleryDetails = {
        'branding-1': {
            title: 'Proyecto de Branding 1',
            description: 'Rediseño completo de la identidad visual para una startup tecnológica.',
            link: '#'
        },
        'production-1': {
            title: 'Producción Fotográfica',
            description: 'Sesión de fotos para la nueva colección de una marca de moda local.',
            link: '#'
        },
        'social-media-1': {
            title: 'Campaña en Redes Sociales',
            description: 'Estrategia y contenido para el lanzamiento de un nuevo producto en Instagram.',
            link: '#'
        },
        'community-1': {
            title: 'Gestión de Comunidad',
            description: 'Estrategia de engagement y manejo de comunidad para una marca de lifestyle.',
            link: '#'
        },
        'paid-media-1': {
            title: 'Campaña de Paid Media',
            description: 'Estrategia y ejecución de campaña publicitaria en redes sociales para aumentar ventas.',
            link: '#'
        },
        'website-1': {
            title: 'Diseño de Sitio Web',
            description: 'Diseño y desarrollo de sitio web responsivo para una empresa de servicios.',
            link: '#'
        }
    };

    galleryModalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const project = trigger.dataset.project;
            const details = galleryDetails[project];
            galleryModalImage.src = trigger.src;
            galleryModalTitle.textContent = details.title;
            galleryModalDescription.textContent = details.description;
            galleryModalLink.href = details.link;
            galleryModal.classList.remove('hidden');
        });
    });

    closeGalleryModal.addEventListener('click', () => {
        galleryModal.classList.add('hidden');
    });

    // Dynamic Contact Form
    const contactForm = document.getElementById('contact-form');
    const contactFormFields = [
        { name: 'nombre', type: 'text', placeholder: 'Nombre completo *', required: true },
        { name: 'whatsapp', type: 'tel', placeholder: 'WhatsApp *', required: true },
        { name: 'sitio_web', type: 'url', placeholder: 'Sitio Web *', required: true },
        { name: 'pais', type: 'text', placeholder: 'País' },
        { name: 'servicios', type: 'select', placeholder: '¿En qué servicios estás interesado?', options: ['BRANDING', 'CREACIÓN DE CONTENIDO | PRODUCCIÓN & ESTILISMO', 'PAUTA PUBLICITARIA', 'TODOS'] },
        { name: 'anos_empresa', type: 'number', placeholder: '¿Cuántos años lleva la empresa en el mercado?' },
        { name: 'facturacion', type: 'select', placeholder: '¿Cuánto estás facturando por mes?', options: ['0-1000 USD', '1000USD A 3000USD', '3000USD A 5000USD', '5000USD -10.000USD'] },
        { name: 'inversion_previa', type: 'radio', placeholder: '¿Alguna vez invertiste en pauta publicitaria?', options: ['Sí', 'No'] },
        { name: 'monto_inversion', type: 'text', placeholder: '¿Qué monto estarías dispuesto a invertir en pauta publicitaria?' }
    ];

    contactFormFields.forEach(field => {
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-4';

        if (field.type === 'select') {
            const select = document.createElement('select');
            select.name = field.name;
            select.className = 'w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white';
            select.required = field.required;

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = field.placeholder;
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);

            field.options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                select.appendChild(option);
            });

            wrapper.appendChild(select);
        } else if (field.type === 'radio') {
            const fieldset = document.createElement('fieldset');
            fieldset.className = 'flex gap-4';
            const legend = document.createElement('legend');
            legend.textContent = field.placeholder;
            legend.className = 'mb-2 text-white';
            fieldset.appendChild(legend);

            field.options.forEach(optionText => {
                const label = document.createElement('label');
                label.className = 'flex items-center';
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = field.name;
                radio.value = optionText;
                radio.className = 'mr-2';
                label.appendChild(radio);
                label.appendChild(document.createTextNode(optionText));
                fieldset.appendChild(label);
            });

            wrapper.appendChild(fieldset);
        } else {
            const input = document.createElement('input');
            input.type = field.type;
            input.name = field.name;
            input.placeholder = field.placeholder;
            input.className = 'w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50';
            input.required = field.required;
            wrapper.appendChild(input);
        }

        contactForm.appendChild(wrapper);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'w-full bg-highlight text-secondary py-2 rounded-lg hover:bg-white/90 transition-colors duration-300 font-display';
    submitButton.textContent = 'Enviar Mensaje';
    contactForm.appendChild(submitButton);

    // Contact form submission
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
});

// Log a message to confirm the script has loaded
console.log('Runway Studio script loaded successfully');