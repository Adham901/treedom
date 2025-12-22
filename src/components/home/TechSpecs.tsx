/* =======================
   ⚙️ Tech Specs Section
   ======================= */

import React from 'react';


const TechSpecs = () => (
  <section className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-[#111827] text-gray-300">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <h3 className="text-3xl font-bold text-white text-center">متطلبات الجهاز (لكورس الموشن)</h3>
      <div className="mt-8 max-w-3xl mx-auto text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'المعالج (CPU)', value: 'يفضل: Intel i7/i9 (جيل 11+) أو AMD Ryzen 7/9' },
          { label: 'الذاكرة (RAM)', value: 'الحد الأدنى: 16GB — الموصى به: 32GB' },
          { label: 'كارت الشاشة (GPU)', value: 'يفضل: NVIDIA RTX 3060 أو أعلى — يدعم CUDA/Metal للتسريع' },
          { label: 'التخزين (SSD)', value: 'يفضل: 512GB SSD أو أعلى — نظام + ملفات مشاريع منفصلة' },
        ].map((spec, i) => (
          <div key={i} className="p-4 bg-[#1f2937] rounded-lg border border-gray-700 hover:border-rose-500 transition">
            <div className="font-semibold text-white">{spec.label}</div>
            <div className="mt-1 text-gray-300">{spec.value}</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-gray-400 text-center">
        * المتطلبات ضرورية فقط للكورس على اللابتوب — نسخة الهاتف لا تحتاج مواصفات عالية.
      </p>
    </div>
  </section>
);
 
export default  TechSpecs