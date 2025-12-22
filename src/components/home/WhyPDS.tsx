/* =======================
   ❓ Why PDS
   ======================= */

'use client';
import React from 'react';
import { Check } from 'lucide-react';


 const WhyPDS = () => (
  <section className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-[#1a1a1a] text-gray-300">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
      <div className="bg-[#1f2937] p-6 rounded-xl shadow border border-gray-700">
        <h3 className="text-2xl font-bold text-white">لماذا دبلومة PDS؟</h3>
        <p className="mt-3 text-gray-300 text-base">دبلومة مهنية مخصصة لطلاب وأطباء طب الأسنان: تصميم، براندينج، وعرض احترافي مع تطبيق عملي على حالات حقيقية.</p>
        <ul className="mt-5 space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-3"><Check className="w-4 h-4 text-rose-400 mt-1" /> نتائج عملية + بورتفوليو</li>
          <li className="flex items-start gap-3"><Check className="w-4 h-4 text-rose-400 mt-1" /> مرونة التعلم + وصول مدى الحياة</li>
          <li className="flex items-start gap-3"><Check className="w-4 h-4 text-rose-400 mt-1" /> تأثير مهني فوري</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-[#1f2937] to-[#111827] p-6 rounded-xl shadow border border-gray-700">
        <h3 className="text-2xl font-bold text-white">نتائج سريعة — كيف تسترد استثمارك؟</h3>
        <p className="mt-3 text-gray-300 text-base">
          تنفيذ مشاريع بسيطة للزملاء أو العيادة، حزم محتوى شهرية، أو تقديم خدمات تصميم كمدخل دخل إضافي.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { role: 'طالب', desc: 'تصميم 5 فيديوهات أو 3 عروض = استرجاع التكلفة' },
            { role: 'طبيب عيادة', desc: 'حزمة محتوى شهري تغطي تكاليف الدبلومة' },
            { role: 'فني معمل', desc: 'باكيدجات تصميم للمعمل لتحويلها لعملاء' },
          ].map((r, i) => (
            <div key={i} className="p-4 bg-[#2d3748] rounded-lg shadow-sm text-center border border-gray-700 hover:border-rose-400 transition">
              <div className="font-semibold text-white">{r.role}</div>
              <div className="text-sm mt-2 text-gray-300">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyPDS