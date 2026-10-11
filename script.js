/**
 * PORTOFOLIO ELECTRONIC ENGINEER - INTERACTIVE SCRIPT
 * File: script.js
 * Fitur:
 * 1. Mobile Hamburger Menu Toggle & Auto-Close
 * 2. Active Section Spy on Scroll
 * 3. Filter Interaktif Proyek (Semua, Hardware, Sirkuit, Web)
 * 4. Header Shadow on Scroll
 * 5. Simulasi Pengiriman Pesan Kontak
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu (Hamburger) ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close mobile menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu if clicked outside
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });

        // Close menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        navMenu.classList.add('open');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMobileMenu() {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // --- 2. Header Style on Scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.backgroundColor = 'rgba(10, 12, 16, 0.96)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(10, 12, 16, 0.92)';
            header.style.boxShadow = 'none';
        }
    });

    // --- 3. Scroll Spy (Active Navigation Item) ---
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    // --- 4. Project Category Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state of buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter cards with transition effect
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 200);
                    }
                });
            });
        });
    }

    // --- 5. Contact Form Simulation Handler ---
    const contactForm = document.getElementById('contactForm');
    const formNotification = document.getElementById('formNotification');

    if (contactForm && formNotification) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const senderName = document.getElementById('senderName').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Button state during submit
            submitBtn.disabled = true;
            submitBtn.textContent = 'Mengirim Pesan...';

            setTimeout(() => {
                // Notification success display
                formNotification.className = 'form-notification success';
                formNotification.innerHTML = `Terima kasih, <strong>${escapeHtml(senderName)}</strong>! Pesan Anda telah disimulasikan terkirim. Untuk komunikasi langsung, silakan gunakan nomor WhatsApp atau Email yang tertera.`;
                
                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Kirim Pesan';

                // Auto dismiss notification after 8 seconds
                setTimeout(() => {
                    formNotification.className = 'form-notification';
                    formNotification.innerHTML = '';
                }, 8000);
            }, 800);
        });
    }

    // Utility: Simple XSS protection for input reflection
    function escapeHtml(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
