import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Page entrance animations
export const pageEntranceAnimation = (elements) => {
  const tl = gsap.timeline();
  tl.from(elements, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });
  return tl;
};

// Fade in from bottom
export const fadeInUp = (element, delay = 0) => {
  gsap.fromTo(element, 
    { y: 60, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

// Fade in from left
export const fadeInLeft = (element, delay = 0) => {
  gsap.fromTo(element,
    { x: -60, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

// Fade in from right
export const fadeInRight = (element, delay = 0) => {
  gsap.fromTo(element,
    { x: 60, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

// Scale animation
export const scaleIn = (element, delay = 0) => {
  gsap.fromTo(element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

// Stagger animation for multiple elements
export const staggerAnimation = (elements, direction = 'up') => {
  const fromProps = direction === 'up' ? { y: 60, opacity: 0 } : 
                   direction === 'left' ? { x: -60, opacity: 0 } : { x: 60, opacity: 0 };
  
  gsap.fromTo(elements, fromProps, {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
};

// Button hover animation
export const buttonHover = (button) => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
};

// Card hover animation
export const cardHover = (card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
  });
};