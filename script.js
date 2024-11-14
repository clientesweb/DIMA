document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.display = 'none';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
        "Creatividad en movimiento para tu marca",
        "Transforma tu visión en realidad"
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

    // Service modal functions
    function openModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    function closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    // Attach event listeners to service modal buttons
    document.querySelectorAll('[onclick^="openModal"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
            openModal(modalId);
        });
    });

    document.querySelectorAll('[onclick^="closeModal"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
            closeModal(modalId);
        });
    });

    // Gallery modal functions
    function openGalleryModal(imageId) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('gallery-modal-image');
        const modalTitle = document.getElementById('gallery-modal-title');
        const modalDescription = document.getElementById('gallery-modal-description');
        const modalLink = document.getElementById('gallery-modal-link');

        // Set the image source
        modalImage.src = document.querySelector(`[onclick="openGalleryModal('${imageId}')"]`).src;

        // Set the title, description, and link (you'll need to customize this based on your data)
        modalTitle.textContent = "Proyecto: " + imageId;
        modalDescription.textContent = "Descripción del proyecto " + imageId + ". Aquí puedes agregar más detalles sobre el proyecto.";
        modalLink.href = "#"; // Set the actual project link here

        modal.classList.remove('hidden');
    }

    function closeGalleryModal() {
        document.getElementById('gallery-modal').classList.add('hidden');
    }

    // Attach event listeners to gallery modal buttons
    document.querySelectorAll('[onclick^="openGalleryModal"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const imageId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
            openGalleryModal(imageId);
        });
    });

    document.querySelector('[onclick="closeGalleryModal()"]').addEventListener('click', closeGalleryModal);

    // FAQ toggle function
    function toggleFAQ(element) {
        const content = element.nextElementSibling;
        const icon = element.querySelector('i');
        content.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }

    // Attach event listeners to FAQ buttons
    document.querySelectorAll('[onclick^="toggleFAQ"]').forEach(button => {
        button.addEventListener('click', () => toggleFAQ(button));
    });

    // Hero messages rotation
    const heroMessages = [
        "Impulsá tu e-commerce hacia el éxito: hacemos que tu marca destaque y tus ventas aumenten",
        "Diseño y desarrollo web: creamos experiencias digitales que conviertan visitantes en clientes",
        "Estrategias de Marketing digital: potenciamos tu presencia online"
    ];

    let currentHeroMessageIndex = 0;
    const heroMessagesElement = document.getElementById('hero-messages');

    function rotateHeroMessages() {
        heroMessagesElement.style.opacity = 0;
        setTimeout(() => {
            heroMessagesElement.textContent = heroMessages[currentHeroMessageIndex];
            heroMessagesElement.style.opacity = 1;
            currentHeroMessageIndex = (currentHeroMessageIndex + 1) % heroMessages.length;
        }, 500);
    }

    setInterval(rotateHeroMessages, 5000);
    rotateHeroMessages(); // Initial call to display the first message

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
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
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
    }
});

// Log a message to confirm the script has loaded
console.log('Runway Studio script loaded successfully');