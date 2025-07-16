'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';

const contactLinks = [
  {
    name: 'Email',
    icon: <FaEnvelope />,
    link: 'mailto:sirprajwalneupane@gmail.com',
    color: 'text-red-400',
    hover:'hover:shadow-red-400'
  },
  {
    name: 'GitHub',
    icon: <FaGithub />,
    link: 'https://github.com/PrajwalNeupaneDgaf',
    color: 'text-white',
    hover:'hover:shadow-white'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    link: 'https://www.linkedin.com/in/prajwalneupane/',
    color: 'text-blue-500',
    hover:'hover:shadow-blue-500'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    link: 'https://instagram.com/the.prajwalll',
    color: 'text-pink-500',
    hover:'hover:shadow-pink-500'
  },
  {
    name: 'Facebook',
    icon: <FaFacebook />,
    link: 'https://facebook.com/PrajwaL.Tero.Daaiiii',
    color: 'text-blue-600',
    hover:'hover:shadow-blue-600'
  },
  {
    name: 'Whatsapp',
    icon: <FaWhatsapp />,
    link: 'https://wa.me/+9779817951575',
    color: 'text-green-600',
    hover:'hover:shadow-green-600'
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className=" text-white py-20 px-6 md:px-20 border-t-2 border-solid border-gray-200 bg-slate-950"
    >
      <motion.h2
        className="text-4xl font-bold mb-10 text-center text-blue-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Contact Me
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {contactLinks.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className={`bg-white/5 p-6 rounded-xl flex flex-col items-center gap-3 shadow-lg ${item.hover} transition`}
          >
            <div className={`text-3xl ${item.color}`}>{item.icon}</div>
            <p className="text-white font-semibold">{item.name}</p>
          </motion.a>
        ))}
      </motion.div>

      <motion.p
        className="mt-12 text-center text-gray-400 text-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        I'm always open to collaboration, freelancing, or just a friendly chat.
      </motion.p>
    </section>
  );
};

export default ContactSection;
