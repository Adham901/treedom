'use client';

import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

/* =======================
   🚀 CTA Section
   ======================= */
const CTA = () => (
  <section
  dir='rtl'
    id="enroll"
    className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-red-600 text-white text-center sm:text-left"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-2xl text-right font-bold">جاهز تبني مهارات تربحك؟</h3>
        <p className="mt-2 text-right text-sm text-rose-100 max-w-xl">
          انضم لدبلومة PDS واحصل على أدوات تصميم وموشن وبرزنتيشن جاهزة للتطبيق في العيادات والمؤتمرات.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* 🔗 Instagram */}
        <a
          href="https://www.instagram.com/para_dental_school?igsh=bzRzdzU3N3o1ZjRi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-rose-600 px-5 py-3 rounded-md font-semibold hover:bg-gray-100 transition transform hover:scale-105"
        >
          <Instagram size={20} />
          <span>تابعنا على إنستجرام</span>
        </a>

        {/* 💬 WhatsApp */}
        <a
          href="https://wa.me/201559993392"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-md font-semibold hover:bg-green-600 transition transform hover:scale-105"
        >
          <MessageCircle size={20} />
          <span>تواصل عبر واتساب</span>
        </a>
      </div>
    </div>
  </section>
);

export default CTA;
