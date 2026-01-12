// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contactForm');
    
    // State
    let isDarkTheme = false;
    const typedText = document.getElementById('typed-text');
    const typedStrings = [
        'Full-Stack MERN Developer',
        'Blockchain Developer',
        'React Specialist',
        'Web Developer'
    ];
    let typedIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    // Initialize everything
    init();
    
    function init() {
        console.log('Initializing portfolio...');
        
        // Load theme preference
        loadTheme();
        
        // Initialize typed text
        initTypedText();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize skill bars animation
        initSkillBars();
        
        // Set up event listeners
        setupEventListeners();
        
        // Update active nav on load
        updateActiveNav();
        
        // Show all sections immediately
        showAllSections();
        
        // Mark body as loaded
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    }
    
    function showAllSections() {
        // Make all sections visible immediately
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('visible');
        });
    }
    
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Theme toggles
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => {
                toggleTheme();
                closeMobileMenu();
            });
        }
        
        // Mobile menu
        if (menuToggle) {
            menuToggle.addEventListener('click', openMobileMenu);
        }
        if (closeMenu) {
            closeMenu.addEventListener('click', closeMobileMenu);
        }
        
        // Close mobile menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Back to top button
        window.addEventListener('scroll', handleScroll);
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Nav link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                scrollToSection(targetId);
                setActiveNav(link);
            });
        });
        
        // Mobile nav link clicks
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                scrollToSection(targetId);
                setActiveMobileNav(link);
            });
        });
        
        console.log('Event listeners set up');
    }
    
    function loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dark') {
            isDarkTheme = true;
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeButtons();
        }
    }
    
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('portfolio-theme', 'light');
        }
        
        updateThemeButtons();
    }
    
    function updateThemeButtons() {
        const icon = themeToggle ? themeToggle.querySelector('i') : null;
        const mobileIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;
        
        if (isDarkTheme) {
            if (icon) icon.className = 'fas fa-sun';
            if (mobileIcon) mobileIcon.className = 'fas fa-sun';
        } else {
            if (icon) icon.className = 'fas fa-moon';
            if (mobileIcon) mobileIcon.className = 'fas fa-moon';
        }
    }
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function initTypedText() {
        if (!typedText) return;
        
        const type = () => {
            const currentString = typedStrings[typedIndex];
            
            if (isDeleting) {
                // Deleting text
                typedText.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typedText.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Check if current string is completed
            if (!isDeleting && charIndex === currentString.length) {
                // Pause at the end
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next string
                isDeleting = false;
                typedIndex = (typedIndex + 1) % typedStrings.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        };
        
        // Start typing effect
        setTimeout(type, 1000);
    }
    
    function initScrollAnimations() {
        console.log('Initializing scroll animations...');
        
        // Create Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
    
    function initSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    function initSkillBars() {
        // Animate skill bars when they come into view
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target;
                    const width = skillProgress.getAttribute('data-width');
                    
                    // Animate the skill bar
                    setTimeout(() => {
                        skillProgress.style.width = `${width}%`;
                    }, 300);
                    
                    // Unobserve after animation
                    skillObserver.unobserve(skillProgress);
                }
            });
        }, {
            threshold: 0.5
        });
        
        // Observe all skill progress bars
        document.querySelectorAll('.skill-progress').forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    function setActiveNav(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    function setActiveMobileNav(activeLink) {
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    function updateActiveNav() {
        // Update active nav based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    function handleScroll() {
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // In a real application, you would send this data to a server
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    }
    
    console.log('Portfolio initialized successfully!');
});

// Add loading animation
window.addEventListener('load', () => {
    console.log('Window loaded');
    // Remove loading class if exists
    document.body.classList.add('loaded');
});