/* =======================
   👩‍⚕️ Target Audience Section (Red Identity)
   ======================= */

'use client';
import React from 'react';

const DiplomaAudience = () => (
  <section
    id="audience"
    className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-white text-black"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* العنوان */}
      <h2
        dir="rtl"
        className="relative text-3xl sm:text-4xl font-extrabold text-center mb-10 text-black tracking-wide"
      >
        لمن هذه الدبلومة
        <span className="block mx-auto w-20 h-1 bg-red-600 mt-3 rounded-full"></span>
      </h2>

      {/* الكروت */}
      <div className="flex flex-wrap justify-center gap-6">
        {[
          {
            title: 'طلاب طب الأسنان',
            desc: 'تجهيز بورتفوليو قوي وفرص تدريب مميزة قبل التخرج.',
          },
          {
            title: 'الأطباء العامون',
            desc: 'تسويق ذكي لحالاتك بدون الاعتماد على وكالات خارجية.',
          },
          {
            title: 'أصحاب العيادات',
            desc: 'نظام محتوى دائم يعزز الثقة ويزيد من التحويلات.',
          },
          {
            title: 'الأساتذة والمحاضرون',
            desc: 'عروض علمية جذابة ومنظمة لشرح الحالات والأبحاث.',
          },
          {
            title: 'فنيّو معامل الأسنان',
            desc: 'تسويق ذكي لخدمات المعمل والتعاون مع العيادات لتقديم خدمات مشتركة.',
          },
        ].map((item, i) => (
          <div
            key={i}
            dir="rtl"
            className="bg-gray-100 p-6 rounded-lg text-center shadow border border-gray-200 hover:border-red-600 transition w-full sm:w-[280px]"
          >
            <div className="font-semibold text-black text-lg">{item.title}</div>
            <div className="text-sm text-gray-700 mt-3 leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DiplomaAudience;
