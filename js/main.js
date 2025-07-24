// main.js
// Здесь можно добавить JS-функционал, например, обработку формы

document.addEventListener('DOMContentLoaded', function() {
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
