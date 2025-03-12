// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation
const scrollElements = document.querySelectorAll('.timeline-item, .education-item, .skills-category, .achievement-item');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementHeight = el.offsetHeight;
    const windowHeight = window.innerHeight;
    
    return (
        elementTop <= windowHeight * (percentageScroll / 100) &&
        elementTop + elementHeight >= 0
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scroll-animation');
    element.classList.add('active');
};

const hideScrollElement = (element) => {
    element.classList.remove('active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// Initialize elements with scroll-animation class
scrollElements.forEach((el) => {
    el.classList.add('scroll-animation');
});

// Add scroll event listener
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Handle initial state
handleScrollAnimation();

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.style.display = 'none');
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
            <button class="btn btn-primary" id="resetForm">Send Another Message</button>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Add event listener to reset form
        document.getElementById('resetForm').addEventListener('click', function() {
            // Remove success message
            successMessage.remove();
            
            // Reset form
            contactForm.reset();
            
            // Show form elements again
            formGroups.forEach(group => group.style.display = 'block');
            submitButton.style.display = 'block';
        });
    });
}

// Add CSS for success message
const style = document.createElement('style');
style.textContent = `
    .success-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-message i {
        font-size: 3rem;
        color: var(--success-color);
        margin-bottom: 1rem;
    }
    
    .success-message h3 {
        margin-bottom: 1rem;
        color: var(--success-color);
    }
    
    .success-message p {
        margin-bottom: 2rem;
    }
`;
document.head.appendChild(style); 
