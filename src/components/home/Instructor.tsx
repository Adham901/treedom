/* =======================
   👨‍🏫 Instructor (Glass Card on White Background)
   ======================= */
'use client';
import React from 'react';
import Image from 'next/image';

const Instructor = () => (
  <section className="slide-section opacity-0 transform transition-all duration-700 py-16 bg-white text-black">
    <div className="max-w-3xl mx-auto px-4 text-center">
      {/* ===== Title ===== */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-wide mb-8">
        About Me
        <span className="block mx-auto w-20 h-1 bg-red-600 rounded-full mt-2"></span>
      </h2>

      {/* ===== Image ===== */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-red-600">
        <Image
          src="/loading2.jpg"
          alt="Profile"
          fill
          className="object-cover rounded-full"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* ===== Glass Card ===== */}
     <div className="mt-10 bg-white/10 backdrop-blur-xl text-black rounded-2xl shadow-lg border border-red-500/40 p-6 sm:p-8 text-left space-y-6 relative overflow-hidden">
  {/* لمعان خفيف فوق الخلفية */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-30 pointer-events-none rounded-2xl"></div>

  {/* About */}
  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-black mb-2 border-b border-red-600 pb-1 inline-block">
      About
    </h3>
    <p className="text-sm sm:text-base leading-relaxed text-gray-800">
      A visual designer and the founder of <span className="text-black font-semibold">Para Dental School</span> — 
      the first platform in the Middle East focused on teaching visual and media skills for dental professionals.
      <br />
      Specialized in integrating creative tools into dental communication and marketing.
    </p>
  </div>

  {/* Skills */}
  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-black mb-2 border-b border-red-600 pb-1 inline-block">
      Skills
    </h3>
    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:text-base text-gray-800">
      <p>• Graphic Design</p>
      <p>• Motion Graphics</p>
      <p>• 3D & CGI Design</p>
      <p>• Presentation Design</p>
      <p>• UI/UX Design</p>
      <p>• Videography</p>
      <p>• Video Editing</p>
      <p>• Media Buying</p>
    </div>
  </div>

  {/* Entrepreneur */}
  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-black mb-2 border-b border-red-600 pb-1 inline-block">
      Entrepreneur
    </h3>
    <ul className="text-sm sm:text-base leading-relaxed text-gray-800 space-y-1">
      <li>• Founder of Para Dental School (PDS) – The first hub to teach Dental Motion Design in the Middle East.</li>
      <li>• Founder of ZED – A specialized dental marketing agency.</li>
      <li>• Founder of Five Slash – One of the largest cafés in Mansoura, Egypt.</li>
    </ul>
  </div>
</div>

    </div>
  </section>
);

export default Instructor;
