gsap.registerPlugin(ScrollTrigger);

const seal = document.querySelector(".seal");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const envelopeScreen = document.getElementById("envelope-screen");
const website = document.getElementById("website");

const tl = gsap.timeline({paused: true});

tl
    .to(seal, {
        scale: 0,
        duration: 0.25,
        ease: "back.in"
    })
    .to(flap, {
        rotateX: -180,
        duration: 1,
        ease: "power2.inOut"
    })
    .to(letter, {
        y: -40,
        opacity: 1,
        duration: 3,
        ease: "power3.out"
    })
    .to(envelopeScreen, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .set(envelopeScreen, {
        display: "none"
    })
    .to(website, {
        opacity: 1,
        duration: 1
    });

seal.addEventListener("click", () => {
    tl.play();
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('February 10, 2026 16:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // Add subtle animation to countdown numbers
        gsap.fromTo('.countdown-number',
            {scale: 1},
            {scale: 1.1, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1}
        );
    } else {
        document.querySelector('.countdown').innerHTML = '<div class="countdown-ended">🎉 We\'re married! 🎉</div>';
    }
}

// Initialize countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll animations
const sections = gsap.utils.toArray(".section");
const vh = window.innerHeight;

// Initial state: first card visible, others below viewport
gsap.set(sections, {
    y: (i) => (i === 0 ? 0 : vh + 100),
    scale: 1,
    zIndex: (i) => i,
    autoAlpha: 1
});

const tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#website",
        start: "top top",
        end: `+=${(sections.length - 1) * 100}%`,
        pin: true,
        scrub: 2,
    }
});

// Each next card slides up and covers the previous one
sections.forEach((section, i) => {
    if (i === 0) return;

    tl1.to(section, {
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Add text animations for each section
sections.forEach((section, i) => {
    const content = section.querySelector('.section-content') || section.querySelector('.hero-content');
    if (content) {
        gsap.from(content.children, {
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: 1
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1
        });
    }
});

// Add animation for timeline items
const timelineEvents = document.querySelectorAll('.timeline-event');
timelineEvents.forEach((event, index) => {
    gsap.fromTo(event,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: event,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Auto-scroll timeline to top when section becomes active
ScrollTrigger.create({
    trigger: ".events",
    start: "top center",
    onEnter: () => {
        // Scroll to the top of the timeline section
        const eventsSection = document.querySelector('.events');
        if (eventsSection) {
            eventsSection.scrollTop = 0;
        }
    }
});