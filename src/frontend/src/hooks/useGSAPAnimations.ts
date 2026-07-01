import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations(reduced: boolean) {
  useLayoutEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {

      // Product category cards — rotate in from the side
      gsap.from('.phase-cat-card', {
        scrollTrigger: { trigger: '.products-section', start: 'top 76%', once: true },
        rotateY: -30,
        y: 55,
        opacity: 0,
        duration: 0.95,
        stagger: 0.2,
        ease: 'power3.out',
        transformPerspective: 1000,
        clearProps: 'all',
      });

      // Factory image slots — cinematic clip-path wipe
      gsap.from('.factory-img-slot', {
        scrollTrigger: { trigger: '.factory-section', start: 'top 73%', once: true },
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.1,
        stagger: 0.13,
        ease: 'power2.inOut',
        clearProps: 'clipPath',
      });

      // OEM process steps — pop in left to right
      gsap.from('.process-step', {
        scrollTrigger: { trigger: '.oem-section', start: 'top 76%', once: true },
        scale: 0.4,
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.09,
        ease: 'back.out(2)',
        clearProps: 'all',
      });

      // Workflow step circles — scale pop
      gsap.from('.hw-step-num', {
        scrollTrigger: { trigger: '.oem-section', start: 'top 80%', once: true },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.13,
        ease: 'back.out(2.5)',
        clearProps: 'all',
      });

      // Trust credential cards — flip in from face-down (rotateX)
      gsap.from('.trust-credential-card', {
        scrollTrigger: { trigger: '.trust-credential-section', start: 'top 76%', once: true },
        rotateX: -65,
        transformPerspective: 900,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: 'back.out(1.5)',
        clearProps: 'all',
      });

      // CTA section — dramatic upward reveal
      gsap.from('.inquiry-cta-section h2', {
        scrollTrigger: { trigger: '.inquiry-cta-section', start: 'top 82%', once: true },
        y: 65,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.inquiry-cta-section p', {
        scrollTrigger: { trigger: '.inquiry-cta-section', start: 'top 82%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.85,
        delay: 0.25,
        ease: 'power2.out',
      });
      gsap.from('.inquiry-cta-section .flex button', {
        scrollTrigger: { trigger: '.inquiry-cta-section', start: 'top 82%', once: true },
        y: 28,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.45,
        ease: 'back.out(1.5)',
      });
    });

    return () => ctx.revert();
  }, [reduced]);
}
