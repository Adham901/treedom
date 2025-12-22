/* =======================
   💡 Golden Idea & Structure Section (Red Identity)
   ======================= */

'use client';
import React from 'react';
import { Clock, FileText, Globe } from 'lucide-react';

const GoldenIdeaSection = () => {
  const highlights = [
    {
      icon: <Clock className="w-6 h-6 text-red-600 mb-1" />,
      title: 'المدة',
      desc: 'متابعة ذاتية (Self-paced) – توصية: 6–8 أسابيع.',
      bg: 'from-red-500 to-red-600',
    },
    {
      icon: <FileText className="w-6 h-6 text-red-600 mb-1" />,
      title: 'الآلية',
      desc: 'مشاهدة مسجلة + ملفات قابلة للتحميل + تمارين تطبيقية + مراجعات دورية (لايف/مجتمع).',
      bg: 'from-red-600 to-red-500',
    },
    {
      icon: <Globe className="w-6 h-6 text-red-600 mb-1" />,
      title: 'الوصول واللغة',
      desc: 'الوصول: مدى الحياة + تحديثات مستقبلية. اللغة: عربي مع مصطلحات إنجليزية متخصصة.',
      bg: 'from-red-500 to-red-600',
    },
  ];

  return (
    <section
      id="golden-idea"
      className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-white text-black"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* العنوان */}
        <h2
          dir="rtl"
          className="relative text-3xl sm:text-4xl font-extrabold text-center mb-12 text-black tracking-wide"
        >
          الفكرة الذهبية 
          <span className="block mx-auto w-20 h-1 bg-red-600 mt-3 rounded-full"></span>
        </h2>

        {/* ✅ الفكرة الذهبية المميزة */}
        <div
          dir="rtl"
          className="mb-12 bg-gradient-to-r from-red-600 to-red-500 text-white p-6 rounded-2xl shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold mb-3">الفكرة الذهبية 💡</h3>
          <p className="text-gray-100 text-base leading-relaxed">
            نفّذ مشروعين صغيرين بسعر معقول من مهاراتك الجديدة = استرجاع استثمارك بالكامل. ثم كل مشروع إضافي = أرباح.
          </p>
        </div>



         <h2
          dir="rtl"
          className="relative text-3xl sm:text-4xl font-extrabold text-center mb-12 text-black tracking-wide"
        >
          هيكل الدبلومة  
          <span className="block mx-auto w-20 h-1 bg-red-600 mt-3 rounded-full"></span>
        </h2>

        {/* باقي الكروت */}
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {highlights.map((item, i) => (
            <div
              key={i}
              dir="rtl"
              className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200 hover:border-red-600 transition flex flex-col items-center text-center"
            >
              {item.icon}
              <h3 className="text-black font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoldenIdeaSection;
