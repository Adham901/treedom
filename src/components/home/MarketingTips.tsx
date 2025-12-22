/* =======================
   💡 Marketing Tips
   ======================= */

import React from 'react';

const MarketingTips = () => (
  <section className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-[#1a1a1a] text-gray-300">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-white text-center">كيف تصل إلى العميل المناسب</h2>
      <p className="mt-3 text-gray-300 text-base text-center max-w-3xl mx-auto">نصائح عملية لبناء جمهورك وبداية تقديم خدماتك بسرعة.</p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'التواصل الشخصي', desc: 'ابدأ بعرض خدماتك مجانًا لأطباء في الكلية أو الزملاء لبناء بورتفوليو وتوصيات.' },
          { title: 'المحتوى التعليمي', desc: 'انشر فيديوهات قصيرة أثناء تعلمك — شرح أدوات أو خطوات تصميم لجذب انتباه الأطباء.' },
          { title: 'التعاون المجاني', desc: 'تعاون مع أطباء مشهورين محليًا على مشروع صغير — سيجلب لك عملاء جدد.' },
          { title: 'العروض المباشرة', desc: 'اعرض باكج شهري لوحدة عيادات: بوستات + ريلز مقابل سعر يغطي الدبلومة.' },
        ].map((t, i) => (
          <div key={i} className="bg-[#1f2937] p-5 rounded-lg border border-gray-700 hover:border-rose-500 transition">
            <div className="font-semibold text-white">{t.title}</div>
            <div className="text-sm text-gray-300 mt-2">{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MarketingTips