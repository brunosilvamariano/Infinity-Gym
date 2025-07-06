// Main JavaScript for Infinity Gym Landing Page
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.display = "none";
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const body = document.body;
    
    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Update aria-expanded attribute
            const isExpanded = navbarMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navbarMenu.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // WhatsApp Float Button Animation
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        // Pulse animation
        setInterval(() => {
            whatsappFloat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappFloat.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
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
    
    // Form Validation and Interaction
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
            console.log('Form submitted');
        });
    });
    
    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Performance Optimization
    let ticking = false;
    
    function updateOnScroll() {
        highlightActiveNav();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
});

// Calculadora de Planos com Personal Trainer
let selectedPersonal = null;
let personalPrices = {
    robsom: {
        name: 'Robsom',
        pricePerSession: 80,
        specialties: ['Musculação', 'Emagrecimento', 'Força']
    },
    jessica: {
        name: 'Jessica', 
        pricePerSession: 75,
        specialties: ['Funcional', 'Pilates', 'Reabilitação']
    }
};

// Seleção de Personal Trainer
document.addEventListener('DOMContentLoaded', function() {
    const personalOptions = document.querySelectorAll('.personal-option');
    
    personalOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove seleção anterior
            personalOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Adiciona seleção atual
            this.classList.add('selected');
            selectedPersonal = this.dataset.personal;
            
            // Atualiza o nome do personal no botão
            const selectedPersonalSpan = document.getElementById('selectedPersonal');
            if (selectedPersonalSpan) {
                selectedPersonalSpan.textContent = personalPrices[selectedPersonal].name;
            }
            
            // Recalcula se já tiver dados preenchidos
            if (document.getElementById('objetivo').value && 
                document.getElementById('frequencia').value && 
                document.getElementById('periodo').value) {
                calcularPlano();
            }
        });
    });
});

function calcularPlano() {
    const objetivo = document.getElementById('objetivo').value;
    const frequencia = document.getElementById('frequencia').value;
    const periodo = document.getElementById('periodo').value;
    
    if (!selectedPersonal) {
        alert('Por favor, escolha um personal trainer primeiro.');
        return;
    }
    
    if (!objetivo || !frequencia || !periodo) {
        alert('Por favor, preencha todos os campos para calcular seu plano ideal.');
        return;
    }
    
    const personal = personalPrices[selectedPersonal];
    let planoRecomendado = '';
    let precoBase = '';
    let sessoesPorSemana = 0;
    let beneficios = [];
    let valorPersonal = 0;
    let valorTotal = 0;
    
    // Determina sessões por semana baseado na frequência
    switch(frequencia) {
        case '2-3':
            sessoesPorSemana = 2;
            break;
        case '4-5':
            sessoesPorSemana = 3;
            break;
        case '6-7':
            sessoesPorSemana = 4;
            break;
    }
    
    // Calcula valor do personal por mês (4 semanas)
    valorPersonal = sessoesPorSemana * 4 * personal.pricePerSession;
    
    // Lógica de recomendação baseada nas respostas
    if (periodo === 'anual') {
        planoRecomendado = 'Plano Anual + Personal';
        precoBase = 99;
        beneficios = [
            'Acesso ilimitado à academia',
            `Personal ${personal.name} ${sessoesPorSemana}x/semana`,
            'Avaliação física mensal',
            'Aulas coletivas ilimitadas',
            'App exclusivo',
            'Nutricionista incluso',
            'Desconto de 15% no personal'
        ];
        // Desconto de 15% no personal para plano anual
        valorPersonal = valorPersonal * 0.85;
    } else if (periodo === 'trimestral') {
        planoRecomendado = 'Plano Trimestral + Personal';
        precoBase = 129;
        beneficios = [
            'Acesso ilimitado à academia',
            `Personal ${personal.name} ${sessoesPorSemana}x/semana`,
            'Avaliação física',
            'Aulas coletivas ilimitadas',
            'App exclusivo',
            'Desconto de 10% no personal'
        ];
        // Desconto de 10% no personal para plano trimestral
        valorPersonal = valorPersonal * 0.90;
    } else {
        planoRecomendado = 'Plano Mensal + Personal';
        precoBase = 149;
        beneficios = [
            'Acesso ilimitado à academia',
            `Personal ${personal.name} ${sessoesPorSemana}x/semana`,
            'Avaliação física',
            'Aulas coletivas ilimitadas',
            'App exclusivo'
        ];
    }
    
    valorTotal = precoBase + valorPersonal;
    
    // Recomendação baseada no objetivo
    let recomendacaoObjetivo = '';
    switch(objetivo) {
        case 'emagrecimento':
            recomendacaoObjetivo = `Perfeito para emagrecimento! ${personal.name} tem experiência comprovada em treinos para queima de gordura.`;
            break;
        case 'hipertrofia':
            recomendacaoObjetivo = `Ideal para ganho de massa muscular! ${personal.name} vai te ajudar a maximizar seus resultados.`;
            break;
        case 'condicionamento':
            recomendacaoObjetivo = `Excelente para condicionamento físico! ${personal.name} criará treinos específicos para sua meta.`;
            break;
        case 'reabilitacao':
            recomendacaoObjetivo = `Perfeito para reabilitação! ${personal.name} tem experiência em treinos terapêuticos.`;
            break;
        case 'bem-estar':
            recomendacaoObjetivo = `Ideal para bem-estar geral! ${personal.name} focará em treinos equilibrados e sustentáveis.`;
            break;
    }
    
    // Mostrar resultado
    const resultDiv = document.getElementById('calcResult');
    const planDiv = document.getElementById('recommendedPlan');
    
    planDiv.innerHTML = `
        <div class="plan-recommendation">
            <h4>${planoRecomendado}</h4>
            <div class="plan-pricing">
                <div class="price-breakdown">
                    <div class="price-item">
                        <span class="price-label">Plano Academia:</span>
                        <span class="price-value">R$ ${precoBase}/mês</span>
                    </div>
                    <div class="price-item">
                        <span class="price-label">Personal ${personal.name}:</span>
                        <span class="price-value">R$ ${Math.round(valorPersonal)}/mês</span>
                    </div>
                    <div class="price-total">
                        <span class="price-label">Total:</span>
                        <span class="price-value">R$ ${Math.round(valorTotal)}/mês</span>
                    </div>
                </div>
            </div>
            <div class="personal-info">
                <h5>Seu Personal Trainer: ${personal.name}</h5>
                <div class="personal-specialties">
                    ${personal.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>
            </div>
            <ul class="plan-benefits">
                ${beneficios.map(beneficio => `<li><i class="fas fa-check"></i> ${beneficio}</li>`).join('')}
            </ul>
            <p class="plan-description">
                ${recomendacaoObjetivo}
            </p>
            <div class="frequency-info">
                <i class="fas fa-calendar-alt"></i>
                <span>Treinos com personal: ${sessoesPorSemana}x por semana (${sessoesPorSemana * 4} sessões/mês)</span>
            </div>
        </div>
    `;
    
    // Atualiza o link do WhatsApp
    const whatsappLink = document.querySelector('.result-actions .btn-primary');
    if (whatsappLink) {
        const message = `Olá! Gostaria de contratar o ${planoRecomendado} por R$ ${Math.round(valorTotal)}/mês com o personal ${personal.name}. Frequência: ${sessoesPorSemana}x por semana. Objetivo: ${objetivo}.`;
        whatsappLink.href = `https://wa.me/5547988890781?text=${encodeURIComponent(message)}`;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetCalculadora() {
    // Reset form
    document.getElementById('objetivo').value = '';
    document.getElementById('frequencia').value = '';
    document.getElementById('periodo').value = '';
    
    // Reset personal selection
    document.querySelectorAll('.personal-option').forEach(opt => opt.classList.remove('selected'));
    selectedPersonal = null;
    
    // Hide result
    document.getElementById('calcResult').style.display = 'none';
    
    // Scroll back to form
    document.querySelector('.calc-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            otherAnswer.style.maxHeight = '0';
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        faqAnswer.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

