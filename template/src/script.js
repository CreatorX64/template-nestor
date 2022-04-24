import PureCounter from "@srexi/purecounterjs";
import Swiper, { Autoplay, Pagination, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./vendor/modernizr-custom";

// Show & Hide loading screen. The loading screen is basically an absolutely
// positioned <div> element which inludes an SVG loading animation.

const elemLoadingScreen = document.querySelector(".loading-screen");
// Once our webpage loads, hide the loading screen
window.addEventListener("load", () => {
  // Remove the loading screen
  elemLoadingScreen.remove();
  // Enable scrolling once page is loaded
  document.body.classList.toggle("overflow-y-hidden");
  document.documentElement.classList.toggle("overflow-y-hidden");
});

//#region @Navigation - Sticky navigation logic

const header = document.querySelector(".main-header");
const stickyObservable = document.querySelector(".sticky-observable");

const observer = new IntersectionObserver(
  (entries) => {
    const observerEntry = entries[0];

    if (!observerEntry.isIntersecting) {
      // The hero section is out of the viewport, make nav sticky and add margin
      // on top of hero section to eliminate layout shift
      header.classList.add("sticky-nav");
      stickyObservable.classList.add("mt-16");
      stickyObservable.classList.add("lg:mt-20");
      stickyObservable.classList.add("xl:mt-24");
    } else {
      // The hero section is in the viewport, reverse the previous actions
      header.classList.remove("sticky-nav");
      stickyObservable.classList.remove("mt-16");
      stickyObservable.classList.remove("lg:mt-20");
      stickyObservable.classList.remove("xl:mt-24");
    }
  },
  {
    // Observe relative to the viewport, not to another element
    root: null,
    // Run the callback as soon as even 1px of the observed element is visible. The
    // callback is ran if the threshold is passed in one way or the another,
    // so it will also run when the hero section is completely out of view
    threshold: 0,
    // Add margin that is the same height with the nav so that nav doesn't cover
    // the important sections when it becomes sticky for the first time. If
    // you're unclear of what this line does, comment out the rootMargin property
    // and check the sticky margin behavior of the nav, then add back the
    // rootMargin to see the difference
    rootMargin: "-64px"
  }
);

observer.observe(stickyObservable);

// Mobile navigation logic

const mobileNavBtn = document.querySelector(".btn-mobile");
const mobileNav = document.querySelector(".nav-mobile");
const iconOpen = document.querySelector(".icon-open");
const iconClose = document.querySelector(".icon-close");

const toggleMobileNav = () => {
  // Reverse Tailwind classes. We use the toggle() method to make this handler
  // work for both opening & closing the mobile nav menu
  mobileNav.classList.remove("invisible");
  mobileNav.classList.toggle("translate-x-full");
  mobileNav.classList.toggle("translate-x-0");
  mobileNav.classList.toggle("opacity-0");
  mobileNav.classList.toggle("opacity-100");
  mobileNav.classList.toggle("pointer-events-none");
  mobileNav.classList.toggle("pointer-events-auto");
  iconOpen.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");

  // Disable/Enable scrolling when mobile nav menu is open/closed
  document.body.classList.toggle("overflow-y-hidden");
  document.documentElement.classList.toggle("overflow-y-hidden");
};

mobileNavBtn.addEventListener("click", () => {
  toggleMobileNav();
});

// Smooth scrolling

const allLinkElems = document.querySelectorAll("a:link");

allLinkElems.forEach((linkElem) => {
  const href = linkElem.getAttribute("href");

  if (href.startsWith("#") && !href.endsWith("!")) {
    linkElem.addEventListener("click", (event) => {
      event.preventDefault();

      if (href === "#") {
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (href.startsWith("#")) {
        // Scroll to other sections
        const targetElem = document.querySelector(href);
        targetElem?.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile nav after scroll (only when on mobile)
      const navEl = linkElem.closest(".nav-mobile");
      if (navEl && window.innerWidth < 768) {
        toggleMobileNav();
      }
    });
  }
});

//#endregion

//#region @How It Works - Tab logic

const tabsContainer = document.querySelector(".tabs");
const tabs = document.querySelectorAll(".tab");
const steps = document.querySelectorAll(".step");

tabsContainer?.addEventListener("click", (event) => {
  const tab = event.target.closest(".tab");

  if (!tab) return;

  // Deactivate all tabs
  tabs.forEach((tab) => {
    tab.classList.remove("active-tab");
  });

  // Activate selected tab
  tab.classList.add("active-tab");

  // Deactivate all steps
  steps.forEach((step) => {
    step.classList.add("inactive-step");
  });

  // Activate selected step
  const step = [...steps].find(
    (step) => step.dataset.step === tab.dataset.step
  );
  step.classList.remove("inactive-step");
});
//#endregion

//#region @Data Points - Initialize counters

// Users counter
new PureCounter({
  selector: ".pc-users",
  start: 0,
  end: 1200,
  duration: 2,
  once: true
});

// Downloads counter
new PureCounter({
  selector: ".pc-downloads",
  start: 0,
  end: 8000,
  duration: 2,
  once: true
});

// Coffee counter
new PureCounter({
  selector: ".pc-coffee",
  start: 0,
  end: 189,
  duration: 2,
  once: true
});

// Reviews counter
new PureCounter({
  selector: ".pc-reviews",
  start: 0,
  end: 430,
  duration: 2,
  once: true
});
//#endregion

//#region @Testimonials - Swiper logic

const testimonialsSwiper = new Swiper(".testimonials-swiper", {
  // Configure Swiper to use Navigation and Pagination
  modules: [Autoplay, Pagination],
  // Horizontal direction & loop after last slide
  direction: "horizontal",
  // Margin between slides
  spaceBetween: 24,
  centeredSlides: true,
  slidesPerView: "auto",
  // Enable pagination
  pagination: {
    el: ".testimonials-swiper-pagination",
    clickable: true
  },
  autoplay: {
    delay: 2200,
    disableOnInteraction: false
  }
});

const testimonialsSection = document.querySelector("#testimonials");
if (testimonialsSection) {
  // Only autoplay the swiper when testimonials section is visible
  const testimonialsObserver = new IntersectionObserver(
    (entries) => {
      const observerEntry = entries[0];

      if (observerEntry.isIntersecting) {
        testimonialsSwiper.autoplay.start();
      } else {
        testimonialsSwiper.autoplay.stop();
      }
    },
    {
      // Observe relative to the viewport, not to another element
      root: null,
      // Run the callback as soon as even 1px of the observed element is visible. The
      // callback is ran if the threshold is passed in one way or the another,
      // so it will also run when the hero section is completely out of view
      threshold: 0,
      // Add margin that is the same height with the nav so that nav doesn't cover
      // the important sections when it becomes sticky for the first time. If
      // you're unclear of what this line does, comment out the rootMargin property
      // and check the sticky margin behavior of the nav, then add back the
      // rootMargin to see the difference
      rootMargin: "-64px"
    }
  );
  testimonialsObserver.observe(testimonialsSection);
}

//#endregion

//#region @Pricing = Swiper logic

// We only want the swiper to be initialized below 768px (which is the "md"
// breakpoint in Tailwind CSS). If the viewport is larger than that, we want
// to disable the swiper logic because we want to show the pricing cards in
// a nice grid.

const swiperShowBreakpoint = window.matchMedia("(max-width: 767px)");
const swiperHideBreakpoint = window.matchMedia("(min-width: 768px)");

let pricingSwiper;
let pricingSwiperInitialized = false;

const initPricingSwiper = () => {
  if (swiperShowBreakpoint.matches) {
    if (!pricingSwiperInitialized) {
      pricingSwiperInitialized = true;

      // Initialize testimonials swiper (only on mobile & small tablet)
      pricingSwiper = new Swiper(".pricing-swiper", {
        // Configure Swiper to use FreeMode
        modules: [FreeMode],
        // No specific amount of slides per-view
        slidesPerView: "auto",
        // Margin between slides
        spaceBetween: 24,
        // More fun for pricing section!
        freeMode: true
      });
    }
  } else if (swiperHideBreakpoint.matches && pricingSwiperInitialized) {
    pricingSwiper.destroy();
    pricingSwiperInitialized = false;
  }
};

window.addEventListener("load", initPricingSwiper);
window.addEventListener("resize", initPricingSwiper);
//#endregion

//#region @Footer

// Set current year in footer
document.querySelector(".year").textContent = new Date().getFullYear();

//#endregion
