
/* =======================
   🎯 Audience
   ======================= */
import React from 'react';
const Audience = () => (
  <section className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-[#1a1a1a] text-gray-300 text-center">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-white">لمن هذه الدبلومة؟</h2>
      <p className="mt-2 text-gray-300 text-base max-w-2xl mx-auto">طلاب طب الأسنان، أطباء، فنيين، وأصحاب عيادات — دبلومة تبني مهارات عملية لتحويلها لخدمات قابلة للبيع.</p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {['طلاب طب الأسنان', 'أطباء عامون', 'أصحاب العيادات', 'فنيين معامل الأسنان'].map((t, i) => (
          <div key={i} className="bg-[#1f2937] p-6 rounded-lg border border-gray-700 hover:border-rose-500 transition">
            <div className="font-semibold text-white">{t}</div>
            <div className="text-sm text-gray-400 mt-2">استفادة عملية وسرعة في توليد دخل إضافي</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Audience;
