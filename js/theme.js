// Theme Toggle System
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    getStoredTheme() {
        return localStorage.getItem('infinity-gym-theme');
    }
    
    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('infinity-gym-theme', theme);
        this.updateThemeIcon(theme);
        this.updateThemeColors(theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation to the toggle button
        this.animateToggle();
    }
    
    updateThemeIcon(theme) {
        if (this.themeIcon) {
            if (theme === 'dark') {
                this.themeIcon.className = 'fas fa-sun';
            } else {
                this.themeIcon.className = 'fas fa-moon';
            }
        }
    }
    
    updateThemeColors(theme) {
        // Update meta theme-color for mobile browsers
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        if (theme === 'dark') {
            metaThemeColor.content = '#0A0A0A';
        } else {
            metaThemeColor.content = '#FFFFFF';
        }
    }
    
    animateToggle() {
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

// Theme-aware animations
class ThemeAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth transitions when theme changes
        this.addThemeTransitions();
        
        // Theme-specific particle effects
        this.initParticleEffects();
    }
    
    addThemeTransitions() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                           color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                           border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                           box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            .theme-toggle {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    initParticleEffects() {
        // Create subtle floating particles for dark theme
        this.createFloatingParticles();
    }
    
    createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'theme-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 107, 53, 0.3);
                border-radius: 50%;
                animation: float ${5 + Math.random() * 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
        
        // Show particles only in dark theme
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            particleContainer.style.opacity = isDark ? '1' : '0';
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
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
        `;
        document.head.appendChild(style);
    }
}

// Theme-based content adjustments
class ThemeContentManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeThemeChanges();
    }
    
    observeThemeChanges() {
        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            this.adjustContentForTheme(currentTheme);
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Initial adjustment
        const currentTheme = document.documentElement.getAttribute('data-theme');
        this.adjustContentForTheme(currentTheme);
    }
    
    adjustContentForTheme(theme) {
        // Adjust image filters for dark theme
        this.adjustImageFilters(theme);
        
        // Adjust video overlays
        this.adjustVideoOverlays(theme);
        
        // Update social media icons
        this.updateSocialIcons(theme);
    }
    
    adjustImageFilters(theme) {
        const images = document.querySelectorAll('img:not(.logo):not(.footer-logo)');
        images.forEach(img => {
            if (theme === 'dark') {
                img.style.filter = 'brightness(0.9) contrast(1.1)';
            } else {
                img.style.filter = 'none';
            }
        });
    }
    
    adjustVideoOverlays(theme) {
        const overlays = document.querySelectorAll('.hero-overlay');
        overlays.forEach(overlay => {
            if (theme === 'dark') {
                overlay.style.background = `linear-gradient(
                    135deg,
                    rgba(255, 107, 53, 0.9) 0%,
                    rgba(255, 140, 0, 0.7) 50%,
                    rgba(10, 10, 10, 0.95) 100%
                )`;
            } else {
                overlay.style.background = `linear-gradient(
                    135deg,
                    rgba(255, 107, 53, 0.8) 0%,
                    rgba(255, 140, 0, 0.6) 50%,
                    rgba(10, 10, 10, 0.9) 100%
                )`;
            }
        });
    }
    
    updateSocialIcons(theme) {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            if (theme === 'dark') {
                link.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            } else {
                link.style.borderColor = 'var(--border-color)';
            }
        });
    }
}

// Theme persistence and sync across tabs
class ThemeSync {
    constructor() {
        this.init();
    }
    
    init() {
        // Listen for storage changes (theme changes in other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'infinity-gym-theme') {
                const newTheme = e.newValue;
                if (newTheme) {
                    document.documentElement.setAttribute('data-theme', newTheme);
                    this.updateThemeIcon(newTheme);
                }
            }
        });
    }
    
    updateThemeIcon(theme) {
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }
}

// Initialize theme system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ThemeManager();
    new ThemeAnimations();
    new ThemeContentManager();
    new ThemeSync();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, ThemeAnimations, ThemeContentManager, ThemeSync };
}

