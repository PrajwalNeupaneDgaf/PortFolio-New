'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaJsSquare,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiMongodb,
  SiNextdotjs,
  SiExpress,
  SiNestjs,
} from 'react-icons/si';

const techIcons = [
  { icon: <FaReact className="text-cyan-400" />, name: 'React' },
  { icon: <SiNextdotjs className="text-white" />, name: 'Next.js' },
  { icon: <FaNodeJs className="text-green-500" />, name: 'Node.js' },
  { icon: <SiExpress className="text-gray-600" />, name: 'Express.js' },
  { icon: <SiNestjs className="text-red-600" />, name: 'NestJS' },
  { icon: <SiMongodb className="text-green-400" />, name: 'MongoDB' },
  { icon: <SiTailwindcss className="text-sky-400" />, name: 'Tailwind' },
  { icon: <FaGithub className="text-white" />, name: 'GitHub' },
];

const HeroSection = () => {
  return (
    <div
      id="home"
      className="bg-black text-white min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Hi, I'm <span className="text-blue-500">Prajwal Neupane</span>
          </h1>
          <h2 className="mt-3 text-xl md:text-2xl text-gray-300">
            <span className="text-blue-300">
              <Typewriter
                words={[
                  'Full Stack Web Developer',
                  'MERN Stack Enthusiast',
                  'API Developer With NEST',
                  'UI/UX Focused',
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1200}
              />
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            I build scalable web apps with clean code, great UI, and robust backend logic. From REST APIs to animations, I do it all.
          </p>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap mt-6 gap-4">
            {techIcons.map((tech, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-3 rounded-full hover:scale-110 transition"
                title={tech.name}
              >
                {tech.icon}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-900 transition"
            >
              Contact Me
            </a>
            <a
              href="/resume.docx"
              download
              className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="/Home.jpg"
            alt="Developer"
            className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
