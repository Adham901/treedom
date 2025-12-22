/* =======================
   🎓 Diploma Features Section (Red Identity)
   ======================= */

'use client';
import React from 'react';

const DiplomaFeatures = () => (
  <section
    id="features"
    className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-white text-black"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* العنوان */}
      <h2
        dir="rtl"
        className="relative text-3xl sm:text-4xl font-extrabold text-center mb-10 text-black tracking-wide"
      >
        مميزات الدبلومة
        <span className="block mx-auto w-20 h-1 bg-red-600 mt-3 rounded-full"></span>
      </h2>

      {/* الكروت */}
      <div className="flex flex-wrap justify-center gap-6">
        {[
          {
            title: 'مشاهدة حسب وقتك',
            desc: 'محتوى مسجّل بالكامل يمكنك مشاهدته في أي وقت وبأي ترتيب، مدى الحياة.',
          },
          {
            title: 'دعم ومتابعة',
            desc: 'فريق دعم للرد على أي استفسار أو مشكلة تواجهك أثناء التعلم.',
          },
          {
            title: 'مجتمع تعليمي نشط',
            desc: 'يجمعك مع طلاب وأطباء من مختلف الدول لتبادل الخبرات والمعرفة.',
          },
          {
            title: 'تعلم تطبيقي',
            desc: 'تركيز على المهارات العملية بدون حشو نظري.',
          },
          {
            title: 'تحديثات مستمرة',
            desc: 'تحديثات مجانية لجميع المحتويات التي تمتلكها.',
          },
          {
            title: 'كورسات إضافية مجانًا',
            desc: 'تشمل التصوير الطبي، البراند الشخصي، والإعلانات الممولة مستقبلًا.',
          },
        ].map((item, i) => (
          <div
            key={i}
            dir="rtl"
            className="bg-gray-100 p-6 rounded-lg text-center shadow border border-gray-200 hover:border-red-600 transition w-full sm:w-[300px]"
          >
            <div className="font-semibold text-black text-lg">{item.title}</div>
            <div className="text-sm text-gray-700 mt-3 leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DiplomaFeatures;
