/* =======================
   🎯 Hero Section
   ======================= */
'use client';
import React from 'react';
import { Play, Users, BookOpen } from 'lucide-react';

const Hero = () => (
  <section className="bg-white text-black min-h-screen flex items-center pt-32 pb-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-start lg:items-center">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug">
          Para Dental School — <span className="text-red-600">مهارات بصرية</span> لطلاب وأطباء طب الأسنان
        </h1>
        <p className="mt-5 text-base sm:text-lg max-w-xl text-gray-700">
          دبلومة تطبيقية في الموشن، الجرافيك، والبرزنتيشن مخصصة لقطاع الأسنان. تطبيق عملي، بورتفوليو جاهز، وفرص دخل حقيقي.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="#enroll"
            className="inline-flex justify-center items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-md shadow-lg hover:bg-red-700 text-sm sm:text-base transition"
          >
            ابدأ الآن <Play className="w-4 h-4" />
          </a>
          <a
            href="#courses"
            className="inline-flex justify-center items-center gap-3 border border-red-600 text-red-600 px-5 py-3 rounded-md hover:bg-red-100 hover:text-red-700 transition text-sm sm:text-base"
          >
            استعرض الدورات
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-semibold text-black">مجتمع تعليمي</div>
              <div className="text-xs text-gray-600">دعم ومتابعة ومشاركات طلاب</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-semibold text-black">محتوى مسجل</div>
              <div className="text-xs text-gray-600">وصول مدى الحياة + تحديثات مجانية</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-6 lg:mt-0">
        <div className="bg-gray-100 rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-200">
          <div
            className="h-56 sm:h-64 md:h-72 rounded-xl border border-gray-200 flex items-center justify-center bg-center bg-cover relative overflow-hidden"
            style={{
              backgroundImage: "url('/Homepage.jpg')",
            }}
          ></div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-gray-100 rounded-lg text-gray-700">
              <div className="font-semibold text-black">مدة مقترحة</div>
              <div className="text-xs">6–8 أسابيع (Self-paced)</div>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg text-gray-700">
              <div className="font-semibold text-black">الأسعار</div>
              <div className="text-xs">خطة دفع مرنة & عروض مبكرة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
