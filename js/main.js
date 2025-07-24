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
});
