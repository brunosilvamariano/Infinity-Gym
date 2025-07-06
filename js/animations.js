// Advanced Animations and Interactions for Infinity Gym
class AnimationController {
    constructor() {
        this.observers = [];
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initLoadingAnimations();
        this.initParallaxEffects();
        this.initCounterAnimations();
        this.initTextAnimations();
        this.initButtonEffects();
        this.initCardAnimations();
    }
    
    // Scroll-triggered animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(`
            .diferencial-card,
            .modalidade-card,
            .plano-card,
            .produto-card,
            .personal-card,
            .info-item,
            .section-title,
            .section-subtitle
        `);
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transitionDelay = `${index * 0.1}s`;
            scrollObserver.observe(element);
        });
        
        this.observers.push(scrollObserver);
    }
    
    triggerScrollAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add specific animations based on element type
        if (element.classList.contains('plano-card')) {
            element.style.transform = 'translateY(0) scale(1)';
            if (element.classList.contains('plano-popular')) {
                setTimeout(() => {
                    element.style.transform = 'translateY(0) scale(1.05)';
                }, 300);
            }
        }
    }
    
    // Hover effects
    initHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll(`
            .diferencial-card,
            .modalidade-card,
            .plano-card,
            .produto-card,
            .personal-card
        `);
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.animateButtonHover(button, true);
            });
            
            button.addEventListener('mouseleave', () => {
                this.animateButtonHover(button, false);
            });
        });
    }
    
    animateButtonHover(button, isHover) {
        if (isHover) {
            button.style.transform = 'translateY(-2px) scale(1.05)';
            
            // Create glow effect
            if (button.classList.contains('btn-primary')) {
                button.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.4)';
            }
        } else {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        }
    }
    
    // Loading animations
    initLoadingAnimations() {
        // Stagger animation for hero elements
        const heroElements = document.querySelectorAll(`
            .hero-badge,
            .hero-title,
            .hero-subtitle,
            .hero-actions,
            .hero-stats
        `);
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 1500 + (index * 200));
        });
    }
    
    // Parallax effects
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.3;
                if (scrolled < window.innerHeight) {
                    element.style.transform = `translateY(${rate}px) scale(1.1)`;
                }
            });
        });
        
        // Parallax for floating elements
        const floatingElements = document.querySelectorAll('.card-icon');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            floatingElements.forEach((element, index) => {
                const rate = Math.sin(scrolled * 0.001 + index) * 5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Counter animations
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
        
        this.observers.push(counterObserver);
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 60; // 60 frames for smooth animation
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
                
                // Add completion effect
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 200);
            }
        };
        
        updateCounter();
    }
    
    // Text animations
    initTextAnimations() {
        // Text reveal animation (removido typing effect)
        const textElements = document.querySelectorAll('.section-title');
        textElements.forEach(element => {
            this.prepareTextReveal(element);
        });
    }
    
    typeWriter(element) {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.opacity = '1';
        
        let i = 0;
        const speed = 50;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    prepareTextReveal(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            element.appendChild(span);
        });
        
        // Trigger animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
        this.observers.push(observer);
    }
    
    // Button effects
    initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Ripple effect
            button.addEventListener('click', (e) => {
                this.createRipple(e);
            });
            
            // Magnetic effect
            button.addEventListener('mousemove', (e) => {
                this.magneticEffect(e, button);
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }
    
    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        // Add ripple styles
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(255, 255, 255, 0.3)';
        circle.style.transform = 'scale(0)';
        circle.style.animation = 'ripple 0.6s linear';
        circle.style.pointerEvents = 'none';
        
        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
        
        // Remove ripple after animation
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    magneticEffect(event, button) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    // Card animations
    initCardAnimations() {
        // Stagger animation for card grids
        const cardGrids = document.querySelectorAll('.grid');
        
        cardGrids.forEach(grid => {
            const cards = grid.querySelectorAll(`
                .diferencial-card,
                .modalidade-card,
                .plano-card,
                .produto-card
            `);
            
            const gridObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.staggerCardAnimation(cards);
                        gridObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            gridObserver.observe(grid);
            this.observers.push(gridObserver);
        });
    }
    
    staggerCardAnimation(cards) {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                
                // Add bounce effect
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px) scale(1.02)';
                    setTimeout(() => {
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 150);
                }, 300);
            }, index * 100);
        });
    }
    
    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
    }
}

// Floating elements animation
class FloatingElements {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        this.createFloatingShapes();
        this.animateFloatingElements();
    }
    
    createFloatingShapes() {
        const container = document.createElement('div');
        container.className = 'floating-shapes';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        // Create floating shapes
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 20 + 10;
            const isCircle = Math.random() > 0.5;
            
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(255, 140, 0, 0.1));
                border-radius: ${isCircle ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-shape ${10 + Math.random() * 20}s infinite linear;
                animation-delay: ${Math.random() * 10}s;
            `;
            
            container.appendChild(shape);
            this.elements.push(shape);
        }
        
        document.body.appendChild(container);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-shape {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    animateFloatingElements() {
        // Mouse interaction with floating elements
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            this.elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementX = rect.left + rect.width / 2;
                const elementY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
                );
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
                    const moveX = Math.cos(angle) * force * 20;
                    const moveY = Math.sin(angle) * force * 20;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    element.style.transform = '';
                }
            });
        });
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        this.init();
    }
    
    init() {
        this.measureFPS();
        this.optimizeAnimations();
    }
    
    measureFPS() {
        const measure = (currentTime) => {
            this.frameCount++;
            
            if (currentTime - this.lastTime >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastTime = currentTime;
                
                // Adjust animation quality based on FPS
                if (this.fps < 30) {
                    this.reduceAnimationQuality();
                } else if (this.fps > 50) {
                    this.increaseAnimationQuality();
                }
            }
            
            requestAnimationFrame(measure);
        };
        
        requestAnimationFrame(measure);
    }
    
    reduceAnimationQuality() {
        document.documentElement.style.setProperty('--transition-normal', '0.2s');
        document.documentElement.style.setProperty('--transition-slow', '0.3s');
    }
    
    increaseAnimationQuality() {
        document.documentElement.style.setProperty('--transition-normal', '0.3s');
        document.documentElement.style.setProperty('--transition-slow', '0.5s');
    }
    
    optimizeAnimations() {
        // Reduce animations on mobile devices
        if (window.innerWidth < 768) {
            document.documentElement.classList.add('reduced-motion');
        }
        
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-motion');
        }
    }
}
