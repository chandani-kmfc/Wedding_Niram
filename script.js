gsap.registerPlugin(ScrollTrigger, SplitText);

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
        // markers: true
    }
});

// Each next card slides up and covers the previous one
sections.forEach((section, i) => {
    const heading = section.querySelector("h2");
    const content = section.querySelector(".content");

    if (!heading) return;

    const split = new SplitText(heading, {type: "chars"});

    if (i !== 0) {
        tl1.to(section, {
            y: 0,
            duration: 1,
            ease: "power2.out"
        });

        tl1.from(split.chars, {
            y: 80,
            autoAlpha: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "power3.out"
        }, "<0.2");

        if (content) {
            tl1.from(content, {
                x: -60,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "<0.5");
        }
    }
});
