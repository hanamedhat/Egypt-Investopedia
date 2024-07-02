const images = [
    'images/what-investment-image-from-rawpixel-id-12592674-3-zu-2-.jpg.avif',
    'images/business-person-futuristic-business-environment-2.jpg', // Replace with your image paths
    'images/pexels-tima-miroshnichenko-7567565.jpg'
];

let currentIndex = 0;

function preloadImages(imageArray, index) {
    if (index < imageArray.length) {
        const img = new Image();
        img.src = imageArray[index];
        img.onload = () => {
            preloadImages(imageArray, index + 1);
        };
    }
}
function changeBackgroundImage() {
    const bgImage = document.querySelector('.bg-hero .bg-image');

    bgImage.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${images[currentIndex]})`;
    bgImage.style.opacity = '0';
    bgImage.style.transition = 'opacity 2s ease-in-out';

    setTimeout(() => {
        bgImage.style.opacity = '1';
    },0); // Delay to ensure smooth transition

    currentIndex = (currentIndex + 1) % images.length;
}

document.addEventListener('DOMContentLoaded', () => {
    preloadImages(images, 0);
    changeBackgroundImage();
    setInterval(changeBackgroundImage, 7740); // Change every 5 seconds
});
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    let currentIndex = 0;

    setInterval(() => {
        // Get the current card and the next card
        const currentCard = cards[currentIndex];
        const nextIndex = (currentIndex + 1) % cards.length;
        const nextCard = cards[nextIndex];

        // Remove highlight from the current card
        currentCard.classList.remove('highlight');

        // Add highlight to the next card
        nextCard.classList.add('highlight');

        // Move to the next card
        currentIndex = nextIndex;
    }, 2000); // Change the interval time as needed
});


// Function to animate counting effect for statistics numbers
function countStatistics(target, start, end, duration) {
    let current = start;
    const increment = Math.ceil((end - start) / (duration * 60)); // Increment per frame
    const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(interval);
        }
        target.textContent = current.toLocaleString(); // Format number with commas
    }, 1000 / 60); // 60 frames per second
}

// Get all stat-number elements
const statNumbers = document.querySelectorAll('.stat-number');

// Define target end numbers for each statistic
const targetNumbers = [60, 1000, 2000, 2000]; // Replace with your desired end numbers

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the index of the current stat-number element
            const index = Array.from(statNumbers).indexOf(entry.target);

            // Animate the counting effect
            countStatistics(entry.target, 0, targetNumbers[index], 3); // Duration is in seconds

            // Stop observing the current element after the animation starts
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});
statNumbers.forEach(statNumber => {
    observer.observe(statNumber);
});
// Iterate over each stat-number element and animate the counting effect
// statNumbers.forEach((statNumber, index) => {
//     countStatistics(statNumber, 0, targetNumbers[index], 3); // Duration is in seconds
// });

document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    let isSmallScreen = window.innerWidth <= 768;
    function showTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.remove('visible', 'exit-left', 'enter-right');
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(100%)';
        });

        testimonials[currentIndex].classList.add('exit-left');
        testimonials[currentIndex].style.transform = 'translateX(-100%)';
        testimonials[currentIndex].style.opacity = '0';

        const nextIndex = (currentIndex + 1) % testimonials.length;
        testimonials[nextIndex].classList.add('visible');
        testimonials[nextIndex].style.transform = 'translateX(0)';
        testimonials[nextIndex].style.opacity = '1';

        if (!isSmallScreen) {
        const afterNextIndex = (currentIndex + 2) % testimonials.length;
        testimonials[afterNextIndex].classList.add('enter-right');
        testimonials[afterNextIndex].style.transform = 'translateX(100%)';
        testimonials[afterNextIndex].style.opacity = '1';
        }
        currentIndex = nextIndex;
    }

    function nextTestimonial() {
        showTestimonials();
    }
    window.addEventListener('resize', () => {
        isSmallScreen = window.innerWidth <= 768;
        currentIndex = 0;  // Reset the index when screen size changes
        showTestimonials();
    });

    setInterval(nextTestimonial, 5000); // Adjust interval as necessary
    showTestimonials();
});
document.getElementById('investor-btn').addEventListener('mouseover', function() {
    document.getElementById('investor-steps').style.display = 'flex';
    document.getElementById('startup-steps').style.display = 'none';
    document.getElementById('investor-btn').classList.add('active');
    document.getElementById('startup-btn').classList.remove('active')
});

document.getElementById('startup-btn').addEventListener('mouseover', function() {
    document.getElementById('investor-steps').style.display = 'none';
    document.getElementById('startup-steps').style.display = 'flex';
    document.getElementById('startup-btn').classList.add('active');
    document.getElementById('investor-btn').classList.remove('active')
});

// Create an IntersectionObserver instance
const observerr = new IntersectionObserver((entries, observerr) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.visibility = 'visible';
            // Start the animation when the element is scrolled into view
            entry.target.classList.add('animate__animated', 'animate__fadeInDown');
            entry.target.addEventListener('animationend', () => {
                // Remove the animation classes
                entry.target.classList.remove('animate__animated', 'animate__fadeInDown', 'animation');
            }, { once: true });
            // Stop observing the current element after the animation starts
            observerr.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Get all elements you want to animate
const elementsToAnimate = document.querySelectorAll('.animation');

// Observe each element
elementsToAnimate.forEach(element => {
    observerr.observe(element);
});

// document.getElementById('menu-toggle').addEventListener('click', function() {
//     document.querySelector('.links-container').classList.toggle('show');
// });


