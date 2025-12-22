'use client';

import React from 'react';
import { GraduationCap, Users, BookOpen, Calendar, FileText, Settings, TrendingUp, Award, Clock } from 'lucide-react';

export default function TrainerDashboard() {


  const stats = [
    { title: 'إجمالي المتدربين', value: '245', icon: Users, color: 'from-[#98c34f] to-[#7da63f]', change: '+12%' },
    { title: 'البرامج النشطة', value: '18', icon: BookOpen, color: 'from-[#98c34f] to-[#7da63f]', change: '+5%' },
    { title: 'الجلسات القادمة', value: '8', icon: Calendar, color: 'from-[#98c34f] to-[#7da63f]', change: '+3' },
    { title: 'معدل الإنجاز', value: '87%', icon: TrendingUp, color: 'from-[#98c34f] to-[#7da63f]', change: '+8%' }
  ];

  const trainingPrograms = [
    { id: 1, name: 'برنامج القيادة الإدارية', trainees: 45, sessions: 12, status: 'نشط', progress: 75 },
    { id: 2, name: 'التحول الرقمي', trainees: 32, sessions: 8, status: 'نشط', progress: 60 },
    { id: 3, name: 'إدارة المشاريع', trainees: 28, sessions: 10, status: 'مكتمل', progress: 100 },
    { id: 4, name: 'تطوير الأعمال', trainees: 38, sessions: 15, status: 'نشط', progress: 45 },
  ];

  const upcomingSessions = [
    { id: 1, title: 'جلسة التخطيط الاستراتيجي', date: '2025-01-15', time: '10:00 ص', trainees: 25 },
    { id: 2, title: 'ورشة الابتكار', date: '2025-01-16', time: '02:00 م', trainees: 18 },
    { id: 3, title: 'إدارة الجودة', date: '2025-01-17', time: '11:00 ص', trainees: 22 },
  ];

  return (
    <div dir='rtl' className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#123247] to-[#1a4a6b] text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#98c34f] rounded-2xl flex items-center justify-center animate-pulse">
                <GraduationCap className="w-8 h-8 text-[#123247]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">لوحة مقدم التدريب</h1>
                <p className="text-white/80 mt-1">مرحباً بك، أحمد محمد</p>
              </div>
            </div>
          
          </div> 
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-2">{stat.title}</h3>
                  <p className="text-4xl font-bold text-[#123247]">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Programs Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#123247] flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-[#98c34f]" />
                البرامج التدريبية
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  الكل
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#98c34f] text-white hover:bg-[#7da63f] transition-colors">
                  نشط
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-right py-3 px-4 text-gray-600 font-bold">اسم البرنامج</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-bold">المتدربين</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-bold">الجلسات</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-bold">الحالة</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-bold">التقدم</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingPrograms.map((program, index) => (
                    <tr 
                      key={program.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#123247]">{program.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          {program.trainees}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{program.sessions}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          program.status === 'نشط' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {program.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${
                                program.progress === 100 
                                  ? 'from-blue-500 to-blue-600' 
                                  : 'from-[#98c34f] to-[#7da63f]'
                              } transition-all duration-1000`}
                              style={{ width: `${program.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-600 min-w-[45px]">
                            {program.progress}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold text-[#123247] flex items-center gap-3 mb-6">
              <Calendar className="w-7 h-7 text-[#98c34f]" />
              الجلسات القادمة
            </h2>

            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div 
                  key={session.id}
                  className="group p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-[#98c34f] transition-all duration-300 cursor-pointer hover:shadow-lg"
                  style={{
                    animation: `slideRight 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <h3 className="font-bold text-[#123247] mb-2 group-hover:text-[#98c34f] transition-colors">
                    {session.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {session.trainees} متدرب
                    </span>
                    <button className="px-4 py-1 bg-[#98c34f] text-white rounded-lg text-sm font-bold hover:bg-[#7da63f] transition-colors">
                      عرض
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-bold hover:border-[#98c34f] hover:text-[#98c34f] transition-colors">
              + إضافة جلسة جديدة
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {[
            { title: 'إدارة الحسابات', icon: Settings, color:  'from-[#98c34f] to-[#7da63f]' },
            { title: 'التقارير والإحصائيات', icon: FileText, color:  'from-[#98c34f] to-[#7da63f]'},
            { title: 'الشهادات والجوائز', icon: Award, color:  'from-[#98c34f] to-[#7da63f]'},
            { title: 'الإعدادات', icon: Settings, color:  'from-[#98c34f] to-[#7da63f]' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1 + 0.5}s both`
                }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform duration-500`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-center font-bold text-[#123247] group-hover:text-[#98c34f] transition-colors">
                  {action.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}