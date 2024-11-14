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
});

// Log a message to confirm the script has loaded
console.log('Runway Studio script loaded successfully');