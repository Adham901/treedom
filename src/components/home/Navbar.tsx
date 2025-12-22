/* =======================
   🔝 Navbar Component
   ======================= */

'use client';
import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 animate-fadeDown bg-white text-black"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <a href="#" className="font-extrabold text-2xl sm:text-3xl tracking-wide">
          <span className="text-red-600">PDS</span>
          <span className="text-black">chool</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#vision" className="hover:text-red-600 transition">الرؤية</a>
          <a href="#courses" className="hover:text-red-600 transition">الدورات</a>
          <a href="#faq" className="hover:text-red-600 transition">الأسئلة</a>
          <a href="#enroll" className="hover:text-red-600 transition">تسجيل</a>
          <a
            href="#enroll"
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm font-semibold"
          >
            ابدأ الآن
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black p-2 rounded hover:bg-gray-200 transition"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Drawer */}
        {open && (
          <div className="absolute top-full right-0 bg-white text-black rounded-bl-xl w-48 py-3 px-4 shadow-lg transition-all duration-500">
            <a href="#vision" onClick={() => setOpen(false)} className="block py-2 hover:text-red-600">الرؤية</a>
            <a href="#courses" onClick={() => setOpen(false)} className="block py-2 hover:text-red-600">الدورات</a>
            <a href="#faq" onClick={() => setOpen(false)} className="block py-2 hover:text-red-600">الأسئلة</a>
            <a href="#enroll" onClick={() => setOpen(false)} className="block py-2 hover:text-red-600">تسجيل</a>
            <a
              href="#enroll"
              className="mt-2 inline-block w-full text-center bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700"
            >
              ابدأ الآن
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
