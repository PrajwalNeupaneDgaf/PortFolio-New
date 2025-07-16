'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useMyContext } from '@/app/Context/AppContext';


const ProjectsPage = () => {
  const {Projects} = useMyContext()
  return (
    <div className="bg-black text-white min-h-screen px-6 py-16 md:px-20">
      <h1 className="text-4xl font-bold mb-12 text-center text-blue-500">
        All Projects
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {Projects.map((project, idx) => (
          <motion.div
            key={project._id}
            className="bg-white/10 rounded-xl shadow-lg overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.name}
              </h3>
              <p className="text-gray-300 text-sm flex-grow">{project.description}</p>

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
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-600 transition text-sm font-semibold"
                  >
                    Demo <FaExternalLinkAlt size={12} />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-300 hover:text-gray-100 transition text-sm font-semibold"
                  >
                    GitHub <FaGithub size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
