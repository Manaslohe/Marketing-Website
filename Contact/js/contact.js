document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.contact-form__input');

    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.parentElement.classList[this.value ? 'add' : 'remove']('has-value');
        });
    });

    // Form validation and submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            showSuccessMessage('Message sent successfully! We\'ll get back to you soon.');
            this.reset();
        } catch (error) {
            showError(null, 'Something went wrong. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Scroll animations for contact info items
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.contact-info__item').forEach(item => {
        observer.observe(item);
    });

    // Enhanced error handling
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (input) {
            const parent = input.parentElement;
            if (!parent.querySelector('.error-message')) {
                parent.appendChild(errorDiv);
            }
        } else {
            contactForm.insertAdjacentElement('beforeend', errorDiv);
        }

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Enhanced success message
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        contactForm.insertAdjacentElement('afterend', successDiv);

        // Add animation
        successDiv.style.animation = 'slideIn 0.5s ease forwards';

        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => successDiv.remove(), 500);
        }, 5000);
    }
});
