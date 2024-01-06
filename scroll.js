gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".revealUp").forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 80%",
    end: "bottom 20%",
    markers: true,
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto",
        }
      );
    },
    onLeave: function () {
      gsap.fromTo(
        elem,
        { autoAlpha: 1 },
        { autoAlpha: 0, overwrite: "auto" }
      );
    },
    onEnterBack: function () {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto",
        }
      );
    },
  });
});

// Add the ScrollTrigger to your text-wrapper-6
ScrollTrigger.create({
  trigger: ".rotable-homepage .text-wrapper-6",
  start: "top 80%",
  end: "bottom 20%",
  onEnter: function () {
    gsap.to(".rotable-homepage .text-wrapper-6", {
      duration: 1.25,
      opacity: 1,
      y: 0,
      ease: "back",
      overwrite: "auto",
    });
  },
  onLeave: function () {
    gsap.to(".rotable-homepage .text-wrapper-6", {
      duration: 1.25,
      opacity: 0,
      y: 100,
      ease: "back",
      overwrite: "auto",
    });
  },
  onEnterBack: function () {
    gsap.to(".rotable-homepage .text-wrapper-6", {
      duration: 1.25,
      opacity: 1,
      y: 0,
      ease: "back",
      overwrite: "auto",
    });
  },
});
