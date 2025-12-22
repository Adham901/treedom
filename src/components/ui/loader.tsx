'use client';

import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

export default function FreedomLoadingScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500);
          return 100;
        }
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full overflow-hidden bg-white">
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(18, 50, 71, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(18, 50, 71, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#123247]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#98c34f]/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      <div className="absolute w-64 h-64 bg-[#123247]/5 rounded-full blur-3xl animate-pulse animation-delay-500" />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-4 w-full animate-fadeIn">
        {/* Logo */}
        <div className="relative mb-12 animate-fadeZoom">
          {/* Rings */}
          <div className="absolute inset-0 w-80 h-80 sm:w-[22rem] sm:h-[22rem] flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border-4 border-[#98c34f]/20 animate-spin-slow" />
            <div className="absolute w-[90%] h-[90%] rounded-full border-4 border-t-[#98c34f] border-transparent animate-spin" />
          </div>

          {/* Center Circle */}
          <div className="relative w-80 h-80 sm:w-[22rem] sm:h-[22rem] rounded-full bg-gradient-to-br from-[#123247] via-[#1a4a6b] to-[#123247] flex items-center justify-center shadow-2xl animate-pulse-scale">
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#98c34f]/20 to-transparent blur-xl" />
            <GraduationCap className="w-32 h-32 sm:w-40 sm:h-40 text-[#98c34f]" />
          </div>

          {/* Floating dots */}
          <div className="absolute top-1/4 right-0 w-3 h-3 bg-[#98c34f] rounded-full animate-float" />
          <div className="absolute top-1/3 left-8 w-2 h-2 bg-[#123247] rounded-full animate-float animation-delay-500" />
          <div className="absolute bottom-1/4 right-12 w-4 h-4 bg-[#98c34f]/50 rounded-full animate-float animation-delay-1000" />
        </div>

        {/* Brand */}
        <h1 className="text-6xl sm:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-[#123247] via-[#98c34f] to-[#123247] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
            Treedom
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-12">
          نظام إدارة التدريب المتكامل
        </p>

        {/* Progress */}
        <div className="w-64 sm:w-80">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#123247] via-[#98c34f] to-[#123247] transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {Math.round(progress)}%
          </p>
        </div>

  
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeZoom {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10px, -20px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fadeZoom {
          animation: fadeZoom 1.2s ease-out forwards;
        }
        .animate-pulse-scale {
          animation: pulse-scale 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
