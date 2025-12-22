'use client';
import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, Save, Lock, AlertCircle, Search, Filter, Calendar, Clock, MapPin } from 'lucide-react';

type Session = {
  id: number;
  title: string;
  trainer: string;
  date: string;
  time: string;
  actualStartTime: string;
  actualEndTime: string;
  mode: string;
  location: string;
  status: 'Completed' | 'Pending' | 'Canceled';
  isLocked: boolean;
  company: string;
};

type Trainee = {
  id: number;
  name: string;
  email: string;
  company: string;
  program: string;
  attendance: 'present' | 'absent' | null;
  isRegistered: boolean;
};

type Notification = {
  message: string;
  type: 'success' | 'error';
} | null;

export default function AttendanceEntry() {
  const [session] = useState<Session>({
    id: 1,
    title: 'تدريب البرمجة المتقدمة',
    trainer: 'أحمد محمد',
    date: '2025-12-22',
    time: '10:00 - 12:00',
    actualStartTime: '10:05',
    actualEndTime: '12:10',
    mode: 'حضوري',
    location: 'قاعة A',
    status: 'Completed',
    isLocked: false,
    company: 'شركة التقنية'
  });

  const [trainees, setTrainees] = useState<Trainee[]>([
    { id: 1, name: 'محمد أحمد علي', email: 'mohammed@email.com', company: 'شركة التقنية', program: 'برنامج البرمجة المتقدمة', attendance: null, isRegistered: true },
    { id: 2, name: 'سارة محمود حسن', email: 'sarah@email.com', company: 'شركة التقنية', program: 'برنامج البرمجة المتقدمة', attendance: null, isRegistered: true },
    { id: 3, name: 'أحمد خالد محمد', email: 'ahmed@email.com', company: 'شركة التقنية', program: 'برنامج البرمجة المتقدمة', attendance: null, isRegistered: true },
    { id: 4, name: 'فاطمة علي أحمد', email: 'fatima@email.com', company: 'شركة التقنية', program: 'برنامج البرمجة المتقدمة', attendance: null, isRegistered: true },
    { id: 5, name: 'عمر حسن محمد', email: 'omar@email.com', company: 'شركة التقنية', program: 'برنامج البرمجة المتقدمة', attendance: null, isRegistered: true },
    { id: 6, name: 'نور الدين يوسف', email: 'nour@email.com', company: 'شركة التقنية', program: 'برنامج البرمجة المتقدمة', attendance: null, isRegistered: true },
    { id: 7, name: 'ليلى عبدالله', email: 'layla@email.com', company: 'شركة التقنية', program: 'برنامج البرمجة المتقدمة', attendance: null, isRegistered: true },
    { id: 8, name: 'يوسف إبراهيم', email: 'youssef@email.com', company: 'شركة الابتكار', program: 'برنامج آخر', attendance: null, isRegistered: false }
  ]);

  const [notification, setNotification] = useState<Notification>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent' | 'unmarked'>('all');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAttendanceChange = (traineeId: number, status: 'present' | 'absent') => {
    if (session.isLocked) {
      showNotification('لا يمكن تعديل الحضور بعد إغلاق الجلسة', 'error');
      return;
    }

    const trainee = trainees.find(t => t.id === traineeId);
    if (!trainee?.isRegistered) {
      showNotification('لا يمكن تسجيل حضور لمتدرب غير مسجل في البرنامج', 'error');
      return;
    }

    setTrainees(trainees.map(t => 
      t.id === traineeId ? { ...t, attendance: status } : t
    ));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    if (session.isLocked) {
      showNotification('لا يمكن تعديل الحضور بعد إغلاق الجلسة', 'error');
      return;
    }

    setTrainees(trainees.map(t => 
      t.isRegistered ? { ...t, attendance: status } : t
    ));
    showNotification(`تم تحديد الجميع كـ ${status === 'present' ? 'حاضر' : 'غائب'}`, 'success');
  };

  const validateAttendance = (): boolean => {
    const registeredTrainees = trainees.filter(t => t.isRegistered);
    const unMarkedTrainees = registeredTrainees.filter(t => t.attendance === null);
    
    if (unMarkedTrainees.length > 0) {
      showNotification(`يجب تحديد حالة جميع المتدربين (${unMarkedTrainees.length} متدرب لم يتم تحديد حالته)`, 'error');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (session.isLocked) {
      showNotification('لا يمكن حفظ الحضور بعد إغلاق الجلسة', 'error');
      return;
    }

    if (!validateAttendance()) return;

    setShowConfirmDialog(true);
  };

  const confirmSave = () => {
    const presentCount = trainees.filter(t => t.attendance === 'present' && t.isRegistered).length;
    const absentCount = trainees.filter(t => t.attendance === 'absent' && t.isRegistered).length;
    
    setShowConfirmDialog(false);
    showNotification(`تم حفظ بيانات الحضور بنجاح. الحضور: ${presentCount} | الغياب: ${absentCount}`, 'success');
    
    setTimeout(() => {
      showNotification('يمكنك الآن الانتقال إلى مرحلة "نتائج التدريب"', 'success');
    }, 2000);
  };

  const filteredTrainees: Trainee[] = trainees.filter(trainee => {
    const matchesSearch = trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch && trainee.isRegistered;
    if (filterStatus === 'present') return matchesSearch && trainee.attendance === 'present';
    if (filterStatus === 'absent') return matchesSearch && trainee.attendance === 'absent';
    if (filterStatus === 'unmarked') return matchesSearch && trainee.attendance === null && trainee.isRegistered;
    
    return matchesSearch;
  });

  const stats = {
    total: trainees.filter(t => t.isRegistered).length,
    present: trainees.filter(t => t.attendance === 'present' && t.isRegistered).length,
    absent: trainees.filter(t => t.attendance === 'absent' && t.isRegistered).length,
    unmarked: trainees.filter(t => t.attendance === null && t.isRegistered).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#123247' }}>
            إدخال بيانات الحضور
          </h1>
          <p className="text-gray-600">
            تسجيل حضور وغياب المتدربين في الجلسة التدريبية
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <AlertCircle className="text-red-600" size={24} />
            )}
            <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {notification.message}
            </span>
          </div>
        )}

        {/* Session Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#123247' }}>
                {session.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {session.trainer}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {session.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {session.actualStartTime} - {session.actualEndTime}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {session.mode} - {session.location}
                </div>
              </div>
            </div>
            {session.isLocked && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
                <Lock size={18} />
                <span className="font-medium">الجلسة مغلقة</span>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border-r-4" style={{ borderColor: '#123247' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي المتدربين</p>
                <p className="text-3xl font-bold" style={{ color: '#123247' }}>{stats.total}</p>
              </div>
              <Users size={32} style={{ color: '#123247' }} className="opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border-r-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">حاضر</p>
                <p className="text-3xl font-bold text-green-600">{stats.present}</p>
              </div>
              <CheckCircle size={32} className="text-green-500 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border-r-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">غائب</p>
                <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <XCircle size={32} className="text-red-500 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border-r-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">غير محدد</p>
                <p className="text-3xl font-bold text-orange-600">{stats.unmarked}</p>
              </div>
              <AlertCircle size={32} className="text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="البحث عن متدرب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border-2 rounded-lg focus:outline-none text-gray-800"
                style={{ borderColor: '#98c34f' }}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'present' | 'absent' | 'unmarked')}
                className="px-4 py-2 border-2 rounded-lg focus:outline-none text-gray-800"
                style={{ borderColor: '#98c34f' }}
              >
                <option value="all">الكل</option>
                <option value="present">حاضر</option>
                <option value="absent">غائب</option>
                <option value="unmarked">غير محدد</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => handleMarkAll('present')}
              disabled={session.isLocked}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle size={18} />
              تحديد الجميع حاضر
            </button>
            <button
              onClick={() => handleMarkAll('absent')}
              disabled={session.isLocked}
              className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle size={18} />
              تحديد الجميع غائب
            </button>
          </div>
        </div>

        {/* Trainees List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#123247' }}>
                <tr>
                  <th className="px-6 py-4 text-right text-white font-medium">#</th>
                  <th className="px-6 py-4 text-right text-white font-medium">اسم المتدرب</th>
                  <th className="px-6 py-4 text-right text-white font-medium">البريد الإلكتروني</th>
                  <th className="px-6 py-4 text-right text-white font-medium">الشركة</th>
                  <th className="px-6 py-4 text-center text-white font-medium">الحضور</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainees.map((trainee, index) => (
                  <tr key={trainee.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium" style={{ color: '#123247' }}>
                        {trainee.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{trainee.email}</td>
                    <td className="px-6 py-4 text-gray-600">{trainee.company}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleAttendanceChange(trainee.id, 'present')}
                          disabled={session.isLocked || !trainee.isRegistered}
                          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            trainee.attendance === 'present'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                          }`}
                        >
                          <CheckCircle size={16} />
                          حاضر
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(trainee.id, 'absent')}
                          disabled={session.isLocked || !trainee.isRegistered}
                          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            trainee.attendance === 'absent'
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                          }`}
                        >
                          <XCircle size={16} />
                          غائب
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={session.isLocked}
            className="px-8 py-3 text-white rounded-lg font-medium text-lg flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#98c34f' }}
          >
            <Save size={20} />
            حفظ بيانات الحضور
          </button>
        </div>

        {/* Confirm Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowConfirmDialog(false)}>
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#123247' }}>
                تأكيد حفظ بيانات الحضور
              </h3>
              <div className="mb-6 space-y-2 text-gray-700">
                <p>هل أنت متأكد من حفظ بيانات الحضور؟</p>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <div>الحاضرون: <span className="font-bold text-green-600">{stats.present}</span></div>
                  <div>الغائبون: <span className="font-bold text-red-600">{stats.absent}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={confirmSave}
                  className="flex-1 px-4 py-2 text-white rounded-lg font-medium hover:opacity-90"
                  style={{ backgroundColor: '#98c34f' }}
                >
                  تأكيد
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
