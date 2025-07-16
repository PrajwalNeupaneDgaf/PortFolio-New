'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { useMyContext } from '@/app/Context/AppContext';



const ProjectsSection = () => {

  const {Projects} = useMyContext()
  return (
    <section
      id="projects"
      className="bg-black text-white py-20 px-6 md:px-20 "
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center text-blue-500"
      >
        My Projects
      </motion.h2>

      <div className="grid gap-12 md:grid-cols-3">
        {Projects.slice(0,3).map((project, idx) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-blue-500/20 transition duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full bg-gray-950 shadow-2xl h-48 object-cover hover:scale-105 transition-transform border-none outline-none duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-white">
                {project.name}
              </h3>
              <p className="text-gray-300 flex-grow text-sm">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStacks.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-4">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition font-semibold text-sm"
                  >
                    Demo <FaExternalLinkAlt />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition font-semibold text-sm"
                  >
                    GitHub <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show All Projects Button */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link href="/projects">
          <button className="px-6 py-3 border border-blue-500 text-blue-500 font-medium rounded-full hover:bg-blue-600 hover:text-white transition duration-300">
            Show All Projects
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
