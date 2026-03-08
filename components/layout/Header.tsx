'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from '../common/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <Logo className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/films">Films</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/testimonials">Reviews</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          <NavLink href="/contact">Book Us</NavLink>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-gray-900 mb-1" />
          <div className="w-6 h-0.5 bg-gray-900 mb-1" />
          <div className="w-6 h-0.5 bg-gray-900" />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <NavLink href="/" mobile>Home</NavLink>
              <NavLink href="/about" mobile>About</NavLink>
              <NavLink href="/gallery" mobile>Gallery</NavLink>
              <NavLink href="/films" mobile>Films</NavLink>
              <NavLink href="/pricing" mobile>Pricing</NavLink>
              <NavLink href="/testimonials" mobile>Reviews</NavLink>
              <NavLink href="/faq" mobile>FAQ</NavLink>
              <NavLink href="/contact" mobile>Book Us</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children, mobile = false }: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`font-medium text-gray-900 hover:text-gray-600 transition-colors ${
        mobile ? 'py-2' : ''
      }`}
    >
      {children}
    </Link>
  );
}