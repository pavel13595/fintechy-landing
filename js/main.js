// main.js
// Language support and form handling

// Language translations
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.features': 'Features', 
        'nav.how_it_works': 'How it works',
        'nav.contact': 'Contact',
        'hero.title': 'Your Money Under Control',
        'hero.subtitle': 'Invest. Save. Manage. All in one place.',
        'hero.cta': 'Open Account',
        'features.title': 'Why Choose FinTechy?',
        'features.smart_investing': 'Smart Investing',
        'features.smart_investing_desc': 'AI-powered portfolio management with personalized recommendations',
        'features.secure_platform': 'Secure Platform',
        'features.secure_platform_desc': 'Bank-level security with multi-factor authentication',
        'features.real_time': 'Real-time Analytics',
        'features.real_time_desc': 'Live market data and performance tracking',
        'how_it_works.title': 'How it works',
        'how_it_works.step1': 'Sign Up',
        'how_it_works.step1_desc': 'Create an account in 2 minutes, verify your identity, and get access to all platform features.',
        'how_it_works.step2': 'Set Goals',
        'how_it_works.step2_desc': 'Define your financial goals and let our AI create a personalized plan to achieve them.',
        'how_it_works.step3': 'Control Expenses',
        'how_it_works.step3_desc': 'Track your spending in real time, get notifications, and optimize your budget.',
        'contact.title': 'Ready to start?',
        'contact.subtitle': 'Join thousands of users already managing their finances with FinTechy',
        'contact.placeholder': 'Your email address',
        'contact.button': 'Create Account',
        'testimonials.title': 'What Our Clients Say',
        'testimonials.subtitle': 'Real feedback from investors and partners',
        'footer.company': 'Company',
        'footer.support': 'Support',
        'footer.product': 'Product'
    },
    es: {
        'nav.home': 'Inicio',
        'nav.features': 'Características',
        'nav.how_it_works': 'Cómo funciona',
        'nav.contact': 'Contacto',
        'hero.title': 'Tu Dinero Bajo Control',
        'hero.subtitle': 'Invierte. Ahorra. Gestiona. Todo en un lugar.',
        'hero.cta': 'Abrir Cuenta',
        'features.title': '¿Por qué elegir FinTechy?',
        'features.smart_investing': 'Inversión Inteligente',
        'features.smart_investing_desc': 'Gestión de cartera impulsada por IA con recomendaciones personalizadas',
        'features.secure_platform': 'Plataforma Segura',
        'features.secure_platform_desc': 'Seguridad de nivel bancario con autenticación multifactor',
        'features.real_time': 'Análisis en Tiempo Real',
        'features.real_time_desc': 'Datos de mercado en vivo y seguimiento de rendimiento',
        'how_it_works.title': 'Cómo funciona',
        'how_it_works.step1': 'Regístrate',
        'how_it_works.step1_desc': 'Crea una cuenta en 2 minutos, verifica tu identidad y obtén acceso a todas las funciones de la plataforma.',
        'how_it_works.step2': 'Establece Objetivos',
        'how_it_works.step2_desc': 'Define tus objetivos financieros y deja que nuestra IA cree un plan personalizado para alcanzarlos.',
        'how_it_works.step3': 'Controla Gastos',
        'how_it_works.step3_desc': 'Rastrea tus gastos en tiempo real, recibe notificaciones y optimiza tu presupuesto.',
        'contact.title': '¿Listo para empezar?',
        'contact.subtitle': 'Únete a miles de usuarios que ya gestionan sus finanzas con FinTechy',
        'contact.placeholder': 'Tu dirección de correo',
        'contact.button': 'Crear Cuenta',
        'testimonials.title': 'Lo que dicen nuestros clientes',
        'testimonials.subtitle': 'Comentarios reales de inversores y socios',
        'footer.company': 'Empresa',
        'footer.support': 'Soporte',
        'footer.product': 'Producto'
    }
};

let currentLanguage = 'en';

// Language switching function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const flag = document.getElementById('currentFlag');
    const langCode = document.getElementById('currentLang');
    
    if (currentLanguage === 'en') {
        flag.src = 'images/flag-us.png';
        flag.alt = 'English';
        langCode.textContent = 'EN';
    } else {
        flag.src = 'images/flag-es.png';
        flag.alt = 'Español';
        langCode.textContent = 'ES';
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system
    updateLanguage();
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Спасибо за регистрацию, ${email}!`);
                form.reset();
            }
        });
    }
    
    // Modern testimonials slider
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const leftBtn = document.querySelector('.slider-arrow.left');
    const rightBtn = document.querySelector('.slider-arrow.right');
    const pagination = document.querySelector('.testimonials-pagination');
    let current = 0;
    let visible = 3;
    function getVisibleCount() {
        if (window.innerWidth < 600) return 1;
        if (window.innerWidth < 900) return 2;
        return 3;
    }
    function updateSlider() {
        visible = getVisibleCount();
        cards.forEach((card, i) => {
            card.style.display = (i >= current && i < current + visible) ? 'flex' : 'none';
        });
        // Update dots
        if (pagination) {
            pagination.innerHTML = '';
            for (let i = 0; i <= cards.length - visible; i++) {
                const dot = document.createElement('span');
                dot.className = 'testimonials-dot' + (i === current ? ' active' : '');
                dot.addEventListener('click', () => {
                    current = i;
                    updateSlider();
                });
                pagination.appendChild(dot);
            }
        }
    }
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            current = (current + 1 > cards.length - visible) ? 0 : current + 1;
            updateSlider();
        }, 5000);
    }
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    if (track && cards.length > 0 && leftBtn && rightBtn) {
        updateSlider();
        startAutoSlide();
        leftBtn.addEventListener('click', function() {
            current = (current - 1 < 0) ? cards.length - visible : current - 1;
            updateSlider();
        });
        rightBtn.addEventListener('click', function() {
            current = (current + 1 > cards.length - visible) ? 0 : current + 1;
            updateSlider();
        });
        track.addEventListener('mouseenter', stopAutoSlide);
        track.addEventListener('mouseleave', startAutoSlide);
        window.addEventListener('resize', function() {
            updateSlider();
        });
    }
});
