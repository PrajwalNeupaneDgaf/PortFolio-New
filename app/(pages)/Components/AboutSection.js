'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaDocker,
} from 'react-icons/fa';
import {
  SiNestjs,
  SiExpress,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiReact,
  SiMongoose,
  SiPrisma,
} from 'react-icons/si';

const skills = [
  {
    category: 'Frontend',
    techs: [
      { name: 'React', icon: <FaReact className="text-cyan-400" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" /> },
      { name: 'Redux', icon: <SiRedux className="text-purple-600" /> },
      { name: 'Zustand', icon: <SiReact className="text-pink-600" /> },
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
    ],
  },
  {
    category: 'Backend',
    techs: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express.js', icon: <SiExpress className="text-gray-600" /> },
      { name: 'NestJS', icon: <SiNestjs className="text-red-600" /> },
    ],
  },
  {
    category: 'Databases',
    techs: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" /> },
      { name: 'Mongoose', icon: <SiMongoose className="text-blue-500" /> },
      { name: 'Prisma', icon: <SiPrisma className="text-green-500" /> },
    ],
  },
  {
    category: 'DevOps & Tools',
    techs: [
      { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
      { name: 'Docker', icon: <FaDocker className="text-blue-400" /> },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-gray-950 text-white pt-4 px-6 pb-12 border-t-2 border-gray-700"
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center text-blue-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        About Me & My Skills
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-gray-300 mb-12 text-center text-lg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        I am a professional Full Stack Developer passionate about building
        scalable and performant web applications. I specialize in modern
        JavaScript frameworks and backend architectures, delivering clean,
        maintainable code.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {skills.map(({ category, techs }, i) => (
          <motion.div
            key={category}
            className="bg-white/10 rounded-lg p-6 shadow-lg"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              {category}
            </h3>
            <ul className="space-y-3">
              {techs.map(({ name, icon }) => (
                <motion.li
                  key={name}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition cursor-default"
                  title={name}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-lg">{name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
