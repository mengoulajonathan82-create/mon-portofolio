/* ============================================
   PORTFOLIO CYBERSÉCURITÉ - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // BOOT SEQUENCE
    // ============================================
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    
    const bootLines = [
        'BIOS Date: 01/30/26 10:15:14 Ver 1.0.2',
        'CPU: Intel(R) Core(TM) i7-12700K @ 3.60GHz',
        'Memory Test: 32768MB OK',
        'Initializing USB Controllers .. Done.',
        'Detecting Primary Master ... None',
        'Detecting Primary Slave ... SSD 1TB',
        'Loading Operating System ...',
        '',
        '╔══════════════════════════════════════╗',
        '║     CYBERSEC PORTFOLIO SYSTEM v2.0   ║',
        '║         © 2024 Alex.Dev              ║',
        '╚══════════════════════════════════════╝',
        '',
        'Mounting file systems ...',
        'Loading kernel modules ...',
        'Starting network services ...',
        'Initializing security protocols ...',
        'System ready.',
        '',
        'Press any key to continue...',
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let bootComplete = false;

    function typeBootLine() {
        if (lineIndex >= bootLines.length) {
            bootComplete = true;
            return;
        }

        const currentLine = bootLines[lineIndex];
        
        if (charIndex < currentLine.length) {
            bootText.textContent += currentLine[charIndex];
            charIndex++;
            setTimeout(typeBootLine, 15);
        } else {
            bootText.textContent += '\n';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeBootLine, 80);
        }
    }

    // Start boot sequence
    typeBootLine();

    // Skip boot on interaction
    function skipBoot() {
        if (!bootComplete && bootScreen) {
            bootScreen.classList.add('hidden');
            bootComplete = true;
        }
    }

    document.addEventListener('keydown', skipBoot);
    document.addEventListener('click', skipBoot);

    // Auto-hide boot screen after animation
    setTimeout(() => {
        if (bootScreen && !bootComplete) {
            bootScreen.classList.add('hidden');
        }
    }, 6000);

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // HERO TYPEWRITER EFFECT
    // ============================================
    const typewriter = document.getElementById('typewriter');
    const heroDescription = document.getElementById('hero-description');
    
    const typewriterLines = [
        '[ÉTUDIANT EN CYBERSÉCURITÉ - NIVEAU 2]',
        'Sécurisons le monde numérique,',
        'une ligne de code à la fois.'
    ];

    let typeLineIndex = 0;
    let typeCharIndex = 0;

    function typeWriterEffect() {
        if (typeLineIndex >= typewriterLines.length) {
            // Show description after typing
            setTimeout(() => {
                if (heroDescription) {
                    heroDescription.classList.remove('hidden');
                    heroDescription.style.animation = 'fadeIn 0.5s ease';
                }
            }, 500);
            return;
        }

        const currentLine = typewriterLines[typeLineIndex];
        
        if (typeCharIndex < currentLine.length) {
            const lineElement = document.createElement('span');
            lineElement.className = 'typewriter-line';
            
            if (typeCharIndex === 0) {
                typewriter.appendChild(lineElement);
            } else {
                lineElement.textContent = currentLine.substring(0, typeCharIndex + 1);
                typewriter.lastChild.textContent = '> ' + currentLine.substring(0, typeCharIndex + 1);
            }
            
            typeCharIndex++;
            setTimeout(typeWriterEffect, 40);
        } else {
            typewriter.lastChild.innerHTML = '> ' + currentLine + '<span class="typewriter-cursor"></span>';
            typeLineIndex++;
            typeCharIndex = 0;
            setTimeout(() => {
                if (typewriter.lastChild) {
                    typewriter.lastChild.innerHTML = '> ' + currentLine;
                }
                typeWriterEffect();
            }, 400);
        }
    }

    // Start typewriter after boot
    setTimeout(typeWriterEffect, 1000);

    // ============================================
    // HERO STATS COUNTER
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ============================================
    // PARTICLE BACKGROUND
    // ============================================
    const particleCanvas = document.getElementById('particle-canvas');
    
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        let particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);

        function resizeCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * particleCanvas.width,
                    y: Math.random() * particleCanvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > particleCanvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > particleCanvas.height) particle.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 65, ${0.3 + particle.size / 10})`;
                ctx.fill();

                // Draw connections
                particles.forEach((other, j) => {
                    if (i === j) return;
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 255, 65, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }

    // ============================================
    // ABOUT SECTION - SOFT SKILLS COUNTER
    // ============================================
    const softSkillValues = document.querySelectorAll('.soft-skill-value');

    function animateSoftSkill(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    const softSkillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSoftSkill(entry.target);
                softSkillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    softSkillValues.forEach(stat => softSkillsObserver.observe(stat));

    // ============================================
    // SKILLS SECTION
    // ============================================
    
    // Skills Canvas Network Effect
    const skillsCanvas = document.getElementById('skills-canvas');
    
    if (skillsCanvas) {
        const ctx = skillsCanvas.getContext('2d');
        let skillParticles = [];

        function resizeSkillsCanvas() {
            const skillsSection = document.getElementById('skills');
            skillsCanvas.width = skillsSection.offsetWidth;
            skillsCanvas.height = skillsSection.offsetHeight;
        }

        function createSkillParticles() {
            skillParticles = [];
            const count = 25;
            for (let i = 0; i < count; i++) {
                skillParticles.push({
                    x: Math.random() * skillsCanvas.width,
                    y: Math.random() * skillsCanvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        }

        function drawSkillParticles() {
            ctx.clearRect(0, 0, skillsCanvas.width, skillsCanvas.height);

            skillParticles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > skillsCanvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > skillsCanvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 65, 0.5)';
                ctx.fill();

                skillParticles.forEach((other, j) => {
                    if (i === j) return;
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 255, 65, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(drawSkillParticles);
        }

        resizeSkillsCanvas();
        createSkillParticles();
        drawSkillParticles();

        window.addEventListener('resize', () => {
            resizeSkillsCanvas();
            createSkillParticles();
        });
    }

    // Skills Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter cards
            skillCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Animate skill bars on scroll
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target.closest('.skill-card');
                const level = card.dataset.level;
                entry.target.style.width = level + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillProgressBars.forEach(bar => skillObserver.observe(bar));

    // ============================================
    // PROJECTS CAROUSEL
    // ============================================
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselDots = document.querySelectorAll('.dot');
    const projectCards = document.querySelectorAll('.project-card');

    let currentSlide = 0;
    const totalSlides = projectCards.length;

    function updateCarousel() {
        // Update track position
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Update active card
        projectCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentSlide);
        });

        // Update dots
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-play carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const commandHistory = document.getElementById('command-history');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('.send').classList.add('hidden');
            submitBtn.querySelector('.loading').classList.remove('hidden');
            submitBtn.querySelector('.btn-text').textContent = 'Envoi en cours...';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Add to command history
            const commands = [
                `> send_message --name="${name}" --email="${email}"`,
                'Processing...',
                'Message encrypted successfully.',
                'Sending via secure channel...',
                'Message delivered!'
            ];

            commands.forEach((cmd, index) => {
                setTimeout(() => {
                    const p = document.createElement('p');
                    p.textContent = cmd;
                    p.style.color = cmd.includes('success') || cmd.includes('delivered') 
                        ? 'var(--cyber-green)' 
                        : 'var(--cyber-gray)';
                    commandHistory.appendChild(p);
                }, index * 300);
            });

            // Show success state
            setTimeout(() => {
                submitBtn.querySelector('.loading').classList.add('hidden');
                submitBtn.querySelector('.check').classList.remove('hidden');
                submitBtn.querySelector('.btn-text').textContent = 'Message envoyé !';
                submitBtn.style.background = 'var(--cyber-green)';
                submitBtn.style.color = 'var(--cyber-black)';

                // Reset form
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.check').classList.add('hidden');
                    submitBtn.querySelector('.send').classList.remove('hidden');
                    submitBtn.querySelector('.btn-text').textContent = 'Envoyer le message';
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    commandHistory.innerHTML = '';
                }, 3000);
            }, 2000);
        });
    }

    // ============================================
    // FOOTER LOGO SCRAMBLE EFFECT
    // ============================================
    const footerLogo = document.getElementById('footer-logo');
    const originalText = 'Alex.Dev';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    function scrambleText() {
        let iterations = 0;
        const maxIterations = 10;

        const interval = setInterval(() => {
            footerLogo.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (char === '.') return '.';
                    if (iterations > index) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            iterations++;
            if (iterations > maxIterations) {
                clearInterval(interval);
                footerLogo.textContent = originalText;
            }
        }, 50);
    }

    // Scramble every 5 seconds
    setInterval(scrambleText, 5000);

    // Initial scramble
    setTimeout(scrambleText, 1000);

    // ============================================
    // CURRENT YEAR
    // ============================================
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // MATRIX RAIN EFFECT IN FOOTER
    // ============================================
    const matrixBg = document.getElementById('matrix-bg');
    
    if (matrixBg) {
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        
        for (let i = 0; i < 15; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                left: ${i * 7}%;
                top: -100%;
                font-family: var(--font-mono);
                font-size: 12px;
                color: var(--cyber-green);
                writing-mode: vertical-rl;
                text-orientation: upright;
                animation: matrix-fall ${3 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: 0.3;
            `;
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += characters[Math.floor(Math.random() * characters.length)] + '\n';
            }
            column.textContent = text;
            matrixBg.appendChild(column);
        }
    }

    // Add matrix fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrix-fall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PARALLAX EFFECT ON HERO AVATAR
    // ============================================
    const heroAvatar = document.querySelector('.hero-avatar');
    
    if (heroAvatar && !window.matchMedia('(pointer: coarse)').matches) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            heroAvatar.style.transform = `
                perspective(1000px)
                rotateY(${xPercent * 5}deg)
                rotateX(${-yPercent * 5}deg)
                translateX(${xPercent * 10}px)
                translateY(${yPercent * 10}px)
            `;
        });
    }

    console.log('🚀 Portfolio Cybersécurité chargé avec succès!');
    console.log('💻 Système opérationnel - Bienvenue, visiteur!');
});
