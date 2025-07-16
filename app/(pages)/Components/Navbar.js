'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaArrowLeft,
  FaPhone,
  FaPhoneAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <FaHome /> },
    { name: 'About', href: '#about', icon: <FaUser /> },
    { name: 'Projects', href: '#projects', icon: <FaProjectDiagram /> },
    { name: 'Contact', href: '#contact', icon: <FaPhoneAlt/> },
  ];

  const isProjectsPage = pathname === '/projects';

  return (
    <nav className="bg-black text-white fixed w-full z-50 shadow-md  py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold select-none bg-gradient-to-r bg-clip-text text-transparent from-gray-600 to-pink-500 via-yellow-500">Prajwal Neupane</div>

        {/* Desktop Menu */}
        {!isProjectsPage && (
          <ul className="hidden md:flex space-x-8">
            {navLinks.map(({ name, href, icon }) => (
              <li key={name}>
                <a
                  href={href}
                  className="flex items-center gap-1 hover:text-blue-400 transition"
                >
                  {icon && <span className="text-lg">{icon}</span>} {name}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Return Button on /projects */}
        {isProjectsPage && (
          <button
            onClick={() => router.push('/')}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <FaArrowLeft />
            <span >
              Return
            </span>
          </button>
        )}

        {/* Mobile Hamburger */}
        {!isProjectsPage && (
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {!isProjectsPage && isOpen && (
        <ul className="md:hidden bg-black px-6 pb-4 space-y-3 border-t border-gray-700">
          {navLinks.map(({ name, href, icon }) => (
            <li key={name}>
              <a
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-white hover:text-blue-400 transition"
              >
                {icon && <span className="text-xl">{icon}</span>} {name}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile Return Button */}
      {isProjectsPage && (
        <div className="md:hidden px-6 pb-4 border-t border-gray-700 mt-2">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition"
          >
            <FaArrowLeft className="text-lg" />
            Return Home
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
