/* =======================
   🌍 Vision & Why PDS Section
   ======================= */

'use client';
import React from 'react';

const Vision = () => (
  <section
    id="vision"
    className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-white text-black"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* لماذا دبلومة PDS؟ */}
      <div className="mb-20">
  <h2
    className="relative text-3xl sm:text-4xl font-extrabold text-center mb-6 tracking-wide"
  >
    لماذا دبلومة <span dir="ltr" className="inline-block text-black">PDS</span>
    <span className="block mx-auto w-20 h-1 bg-red-600 mt-3 rounded-full"></span>
  </h2>

  {[
    {
      title: 'دبلومة مهارية متخصصة:',
      desc: 'مصممة للأطباء وطلاب طب الأسنان لامتلاك أدوات العصر: التصميم، البراندينج، والعرض الاحترافي.',
    },
    {
      title: 'نتائج عملية:',
      desc: 'تطبيق مباشر على حالات/عيادات حقيقية + مشاريع بورتفوليو قابلة للنشر.',
    },
    {
      title: 'مرونة كاملة:',
      desc: 'كورسات مسجلة، دخول مدى الحياة، تحديثات مستمرة، وشهادة إنهاء.',
    },
    {
      title: 'تأثير مهني فوري:',
      desc: 'تحسين قبول الحالات، رفع ثقة المريض، وتسريع نمو العيادة والسمعة الأكاديمية.',
    },
  ].map((item, i) => (
    <div key={i} dir="rtl" className="mt-6 max-w-3xl mx-auto text-right">
      <p className="font-semibold text-black text-lg sm:text-xl">{item.title}</p>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-1">{item.desc}</p>
    </div>
  ))}
</div>


      {/* رؤيتنا في PDS */}
      <h2
        dir="rtl"
        className="relative text-3xl sm:text-4xl font-extrabold text-center mb-6 tracking-wide"
      >
        رؤيتنا في <span dir="ltr" className="inline-block text-black">PDS</span>
        <span className="block mx-auto w-20 h-1 bg-red-600 mt-3 rounded-full"></span>
      </h2>

      <p
        dir="rtl"
        className="mt-4 text-gray-700 text-base sm:text-lg max-w-3xl mx-auto text-center leading-relaxed"
      >
        نؤمن بأن طالب طب الأسنان ليس مضطرًا لانتظار التخرج لبدء العمل. تهدف دبلومتنا إلى تمكين الطلاب
        والأطباء بمهارات عملية تفتح أمامهم فرص عمل حقيقية، وتمنحهم قدرة على بناء علامة شخصية ومشاريع
        جانبية مربحة.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'تمكين مهني', desc: 'مهارات قابلة للبيع فورًا' },
          { title: 'تعليم تطبيقي', desc: 'مشاريع بورتفوليو على حالات حقيقية' },
          { title: 'دعم طويل الأمد', desc: 'مجتمع وتحديثات مجانية مدى الحياة' },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gray-100 p-6 rounded-lg text-center shadow border border-gray-200 hover:border-red-600 transition"
          >
            <div className="font-semibold text-black text-lg">{item.title}</div>
            <div className="text-sm text-gray-700 mt-2">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Vision;
