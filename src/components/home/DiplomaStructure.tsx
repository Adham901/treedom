/* =======================
   🧱 Diploma Structure
   ======================= */

import React from 'react';


const DiplomaStructure = () => (
  <section className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-[#1a1a1a] text-gray-300">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-white text-center">هيكل الدبلومة والمدة المقترحة</h2>
      <p className="mt-3 text-gray-300 text-base text-center max-w-3xl mx-auto">
        المدة: متابعة ذاتية (Self-paced) — التوصية: 6–8 أسابيع. الآلية: فيديوهات مسجلة، ملفات قابلة للتحميل، تمارين تطبيقية، مراجعات دورية (لايف/مجتمع).
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'الأسابيع 1–2', desc: 'أساسيات التصميم والموشن، مشاريع صغيرة سريعة' },
          { title: 'الأسابيع 3–5', desc: 'مشروعات تطبيقية على حالات حقيقية وبناء بورتفوليو' },
          { title: 'الأسبوع 6–8', desc: 'تحسين المشاريع، نصائح تسويق، وتسليم البورتفوليو' },
        ].map((b, i) => (
          <div key={i} className="bg-[#1f2937] p-5 rounded-lg text-center border border-gray-700 hover:border-rose-500 transition">
            <div className="font-semibold text-white">{b.title}</div>
            <div className="text-sm mt-2 text-gray-300">{b.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#1f2937] p-5 rounded-lg border border-gray-700">
          <div className="font-semibold text-white">ماذا ستتعلم عمليًا؟</div>
          <ul className="mt-3 text-sm text-gray-300 space-y-1">
            <li>إنتاج فيديو موشن لحالة سريرية</li>
            <li>بناء عرض تقديمي احترافي للحالات والمؤتمرات</li>
            <li>تصميم محتوى سوشيال وتحويل المتابعين لمرضى</li>
          </ul>
        </div>

        <div className="bg-[#1f2937] p-5 rounded-lg border border-gray-700">
          <div className="font-semibold text-white">الوصول والتحديثات</div>
          <div className="text-sm text-gray-300 mt-2">وصول مدى الحياة + تحديثات مستقبلية مجانية ودعم مجتمعي</div>
        </div>
      </div>
    </div>
  </section>
);


export default DiplomaStructure