"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

interface artisticcouterprops {
  number: number;
  title: string;
}

const ArtisticCounter = ({ number, title }: artisticcouterprops) => {
  const [counted, setCounted] = useState(false);

  // Intersection Observer hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when the component is in view
    threshold: 0.5, // Trigger when 50% of the component is visible
  });

  // Animation setup with react-spring
  const props = useSpring({
    number: counted ? number : 0, // Start from 0 to the given number
    from: { number: 0 },
    config: { duration: 2000 }, // Animation duration (2 seconds)
    onRest: () => setCounted(true), // Set counted state to true when animation ends
  });

  // Trigger the animation when the component comes into view
  if (inView && !counted) {
    setCounted(true);
  }

  return (
    <div
      ref={ref}
      className={`py-16 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center shadow-xl transform transition-opacity duration-300 ease-in-out m-2 my-8 md:my-0 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide">
        {title}
      </h2>
      <animated.div className="text-6xl font-extrabold uppercase font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-500 animate-pulse">
        {props.number.to((n: any) => n.toFixed(0))}
      </animated.div>
    </div>
  );
};

export default ArtisticCounter;
