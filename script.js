gsap.registerPlugin(ScrollTrigger);

const seal = document.querySelector(".seal");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const envelopeScreen = document.getElementById("envelope-screen");
const website = document.getElementById("website");

const tl = gsap.timeline({ paused: true });

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
    duration: 0.8,
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

/* OPTIONAL: section reveal */
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section.children, {
    scrollTrigger: {
      trigger: section,
      start: "top 75%"
    },
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1
  });
});
