// Intro Screen Animation
document.addEventListener('DOMContentLoaded', function () {
    const introScreen = document.getElementById('introScreen');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const enterBtn = document.getElementById('enterBtn');

    // ===================================
    // MATRIX CODE RAIN
    // ===================================
    const matrixCanvas = document.getElementById('matrixCanvas');
    const matrixCtx = matrixCanvas.getContext('2d');

    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const matrixChars = '01';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        matrixCtx.fillStyle = 'rgba(10, 17, 40, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixCtx.fillStyle = '#d4af37';
        matrixCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    // ===================================
    // GEOMETRIC GRID
    // ===================================
    const gridCanvas = document.getElementById('gridCanvas');
    const gridCtx = gridCanvas.getContext('2d');

    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;

    let gridOffset = 0;
    const gridSize = 50;

    function drawGrid() {
        gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        gridCtx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
        gridCtx.lineWidth = 1;

        // Vertical lines
        for (let x = gridOffset; x < gridCanvas.width; x += gridSize) {
            gridCtx.beginPath();
            gridCtx.moveTo(x, 0);
            gridCtx.lineTo(x, gridCanvas.height);
            gridCtx.stroke();
        }

        // Horizontal lines
        for (let y = gridOffset; y < gridCanvas.height; y += gridSize) {
            gridCtx.beginPath();
            gridCtx.moveTo(0, y);
            gridCtx.lineTo(gridCanvas.width, y);
            gridCtx.stroke();
        }

        gridOffset = (gridOffset + 0.5) % gridSize;
        requestAnimationFrame(drawGrid);
    }

    drawGrid();

    // ===================================
    // PROGRESS BAR ANIMATION
    // ===================================
    let progress = 0;
    const duration = 2500;
    const interval = 30;
    const increment = (100 / (duration / interval));

    const progressInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                enterBtn.classList.add('visible');
            }, 300);
        }
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
    }, interval);

    // ===================================
    // SKILL CAROUSEL
    // ===================================
    const skillItems = document.querySelectorAll('.skill-item');
    let currentSkill = 0;

    function rotateSkills() {
        if (skillItems.length === 0) return;
        skillItems[currentSkill].classList.remove('active');
        currentSkill = (currentSkill + 1) % skillItems.length;
        skillItems[currentSkill].classList.add('active');
    }

    if (skillItems.length > 0) {
        skillItems[currentSkill].classList.add('active');
    }

    setInterval(rotateSkills, 2000);

    // ===================================
    // MAGNETIC BUTTON EFFECT
    // ===================================
    enterBtn.addEventListener('mousemove', (e) => {
        const rect = enterBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = x * strength * 0.3;
            const moveY = y * strength * 0.3;

            enterBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            enterBtn.classList.add('magnetic-active');
        }
    });

    enterBtn.addEventListener('mouseleave', () => {
        enterBtn.style.transform = '';
        enterBtn.classList.remove('magnetic-active');
    });

    // ===================================
    // BUTTON CLICK SOUND
    // ===================================
    function playClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // ===================================
    // ENTER BUTTON HANDLER
    // ===================================
    enterBtn.addEventListener('click', () => {
        playClickSound();
        introScreen.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Prevent body scroll during intro
    document.body.style.overflow = 'hidden';

    // Resize handlers
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        gridCanvas.width = window.innerWidth;
        gridCanvas.height = window.innerHeight;
    });
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId} `) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .education-card, .about-text, .experience-card, .section-title, .contact-link');

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1} s`;
        observer.observe(el);
    });

    // Stagger animation for project tags
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, cardIndex) => {
        const tags = card.querySelectorAll('.tag');
        tags.forEach((tag, tagIndex) => {
            tag.classList.add('fade-in');
            tag.style.animationDelay = `${(cardIndex * 0.1) + (tagIndex * 0.05)} s`;
        });
    });

    // Animate skill tags
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, catIndex) => {
        const skillTags = category.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, tagIndex) => {
            tag.classList.add('fade-in');
            tag.style.animationDelay = `${(catIndex * 0.15) + (tagIndex * 0.03)} s`;
            observer.observe(tag);
        });
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth reveal animation for hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Typing effect handled below in TYPING ANIMATION FOR HERO SUBTITLE section

// Dynamic year in footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
}

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Enhanced scroll reveal for sections
const revealSections = () => {
    const reveals = document.querySelectorAll('.fade-in');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSections);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightNavigation();
    revealSections();
});

// Stats Counter Animation
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });

    statsAnimated = true;
}

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Social Sidebar - hide on mobile scroll
let lastScrollTop = 0;
const socialSidebar = document.querySelector('.social-sidebar');

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            socialSidebar.style.transform = 'translateY(-50%) translateX(-100px)';
        } else {
            socialSidebar.style.transform = 'translateY(-50%) translateX(0)';
        }

        lastScrollTop = scrollTop;
    }
}, false);

// ===================================
// TYPING ANIMATION FOR HERO SUBTITLE
// ===================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const subtitlePhrases = [
        'AI & ML Engineer',
        'Building Intelligent Systems',
        'LLMs & RAG Architectures',
        'PyTorch & Deep Learning',
        'Production MLOps & Distributed Systems'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = subtitlePhrases[phraseIndex];

        if (isDeleting) {
            heroSubtitle.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % subtitlePhrases.length;
            typeSpeed = 400;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    setTimeout(typeLoop, 1500);
}

// ===================================
// PROJECT CATEGORY FILTERS
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInScale 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===================================
// PROJECT MODAL (REMOVED - Using direct links now)
// ===================================
// Modal functionality removed since Live Demo buttons now redirect to actual deployed sites

// ===================================
// CUSTOM CURSOR
// ===================================
const cursor = document.querySelector('.custom-cursor');
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;

    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animateGlow);
}

animateGlow();

// Add hover effect for links and buttons
document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering-link');
    });

    elem.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering-link');
    });
});
