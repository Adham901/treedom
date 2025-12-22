"use client";


import React, { useState } from 'react';
import {  Calendar, Settings, BookOpen, Users, ClipboardList, Upload, Award, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState(0);
  const router = useRouter();

  const [sidebarOpen] = useState(true);

const menuItems = [
  { id: 1, text: 'الصفحه الرئيسيه', icon: GraduationCap, path: '/training' },
//   { id: 2, text: 'تسجيل وتوثيق حساب مقدم التدريب', icon: UserPlus, path: '/training/addaccount' },
  { id: 3, text: 'تأكيد الجدول الزمني النهائي', icon: Calendar, path: '/training/schedule' },
  { id: 4, text: 'إدارة الجدول', icon: Settings, path: '/training/manageschedule' },
  { id: 5, text: 'تنفيذ التدريب', icon: BookOpen, path: '/training/execute' },
  { id: 6, text: 'إدخال بيانات الحضور', icon: ClipboardList, path: '/training/attendance' },
  { id: 11, text: 'إدارة المدربين', icon: Users, path: '/training/trainers' },
  { id: 8, text: 'رفع النتائج', icon: Upload, path: '/training/results' },
  { id: 9, text: 'رفع التقييمات', icon: Award, path: '/training/evaluations' },
  
];

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-[#123247] transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
        
          {sidebarOpen && (
            <h1 className="text-white text-xl font-bold">نظام التدريب</h1>
          )}
        </div>

        {/* Menu Items */}
        <nav dir='ltr' className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                   onClick={() => {
    setActiveItem(index);
    router.push(item.path);
  }}
                    className={`w-full flex items-center gap-1 p-4 rounded-lg transition-all duration-200 ${
                      activeItem === index
                        ? 'bg-[#98c34f] text-[#123247] shadow-lg transform scale-105'
                        : 'text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={22} className="flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-sm font-medium flex-1 text-right">
                        {item.text}
                      </span>
                    )}
                    
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        
      </div>

      {/* Main Content Area - Children will be rendered here */}
      <div className="flex-1  overflow-y-auto bg-gray-100">
        {children}
      </div>
    </div>
  );
}