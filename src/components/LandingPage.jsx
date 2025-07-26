import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.from(titleRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2
    });

    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <h1 ref={titleRef} className="text-4xl font-bold text-indigo-700 text-center mb-10">
        Welcome to the Department of Justice AI Assistant
      </h1>

      <section ref={sectionRef} className="bg-white rounded-xl p-8 shadow-xl max-w-3xl text-center">
        <p className="text-gray-700 text-lg mb-4">
          This AI-powered chatbot helps citizens access legal support, RTI, and more. Tap below to explore:
        </p>
        <a href="#chatbot" className="inline-block mt-4 px-6 py-3 text-white bg-indigo-600 rounded-xl shadow hover:bg-indigo-700 transition">
          Launch Chatbot
        </a>
      </section>
    </div>
  );
};

export default LandingPage;
