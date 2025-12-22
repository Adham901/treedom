'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap, Building2, Users, LayoutDashboard } from 'lucide-react';

export default function DashboardSelector() {
  const router = useRouter();

  const dashboards = [
    {
      id: 1,
      title: 'لوحة مقدم التدريب',
      description: 'إدارة البرامج التدريبية والمحتوى التعليمي',
      icon: GraduationCap,
      path: '/training',
    },
    {
      id: 2,
      title: 'لوحة الشركة المستفيدة',
      description: 'متابعة الموظفين والبرامج التدريبية',
      icon: Building2,
      path: '/company',
    },
    {
      id: 3,
      title: 'لوحة المتدرب',
      description: 'متابعة التقدم والدورات المسجلة',
      icon: Users,
      path: '/student',
    },
    {
      id: 4,
      title: 'لوحة الإدارة العامة',
      description: 'إدارة شاملة لجميع الأنظمة والمستخدمين',
      icon: LayoutDashboard,
      path: '/admin',
    },
  ];

  return (
    <div dir='rtl' className="min-h-screen bg-gradient-to-br from-[#0f2b3d] to-[#123247] flex items-center justify-center px-4 ">
      <div className="w-full max-w-6xl my-2">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            نظام إدارة التدريب
          </h1>
          <p className="text-[#98c34f] text-lg">
            اختر لوحة التحكم المناسبة
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => router.push(item.path)}
                className="
                  cursor-pointer
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  p-6
                  transition-all
                  duration-300
                  hover:border-[#98c34f]
                  hover:-translate-y-1
                "
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#98c34f]/10 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[#98c34f]" />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h2>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Action */}
                <div className="text-[#98c34f] font-medium text-sm">
                  الدخول للوحة 
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
