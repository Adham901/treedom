"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = Array.from({ length: 15 }, (_, i) => `/${i + 1}.jpg`);

const Opinions = () => {
  return (
    <section
      id="opinions"
      className="py-16 bg-white text-center text-black overflow-hidden relative"
    >
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* ===== Title ===== */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
          آراء طلابنا
          <span className="block mx-auto w-20 h-1 bg-red-600 rounded-full mt-2"></span>
        </h2>

        {/* ===== Swiper ===== */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop
          className="rounded-2xl"
        >
          {testimonials.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-2xl overflow-hidden shadow-md border border-red-500/40 bg-white hover:border-red-500 transition-all duration-300">
                <Image
                  src={src}
                  alt={`testimonial-${index + 1}`}
                  width={500}
                  height={500}
                  className="object-contain w-full h-64 sm:h-72"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      
      </div>
    </section>
  );
};

export default Opinions;
