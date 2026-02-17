// Logo click animation
const logo = document.getElementById('logo');
const landingPage = document.getElementById('landing-page');
const eventsSection = document.getElementById('events-section');
const footer = document.getElementById('footer');

logo.addEventListener('click', () => {
    // Slide up landing page
    landingPage.classList.add('slide-up');
    
    // Show events section after animation
    setTimeout(() => {
        landingPage.classList.add('hidden');
        eventsSection.classList.remove('hidden');
        eventsSection.classList.add('show');
        footer.classList.remove('hidden');
        footer.classList.add('show');
    }, 800);
});

// Modal functionality
const modal = document.getElementById('signup-modal');
const signupForm = document.getElementById('signup-form');
const successMessage = document.getElementById('success-message');
const modalEventTitle = document.getElementById('modal-event-title');
const eventNameInput = document.getElementById('event-name');

function openModal(eventName) {
    modal.style.display = 'block';
    modalEventTitle.textContent = eventName;
    eventNameInput.value = eventName;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    signupForm.reset();
    successMessage.classList.add('hidden');
    signupForm.classList.remove('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Form submission handling
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(signupForm);
    
    try {
        const response = await fetch(signupForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            signupForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            alert('Es gab ein Problem. Bitte versuche es erneut.');
        }
    } catch (error) {
        alert('Es gab ein Problem. Bitte versuche es erneut.');
    }
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Optional: Add parallax effect to events
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});
