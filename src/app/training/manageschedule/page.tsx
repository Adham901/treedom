'use client';
import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Edit2, X, Save, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

type Session = {
  id: number;
  title: string;
  trainer: string;
  date: string;
  time: string;
  mode: string;
  location: string;
  status: 'مجدولة' | 'منتهية' | 'جارية' | 'ملغاة';
  trainees: number;
  company: string;
};

type Notification = {
  message: string;
  type: 'success' | 'error';
};

export default function ScheduleManagement() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      title: 'تدريب البرمجة المتقدمة',
      trainer: 'أحمد محمد',
      date: '2025-01-15',
      time: '10:00 - 12:00',
      mode: 'حضوري',
      location: 'قاعة A',
      status: 'مجدولة',
      trainees: 25,
      company: 'شركة التقنية'
    },
    {
      id: 2,
      title: 'إدارة المشاريع الاحترافية',
      trainer: 'سارة أحمد',
      date: '2025-01-16',
      time: '14:00 - 16:00',
      mode: 'عن بعد',
      location: 'Zoom',
      status: 'مجدولة',
      trainees: 30,
      company: 'شركة الابتكار'
    },
    {
      id: 3,
      title: 'تطوير الويب الكامل',
      trainer: 'محمد علي',
      date: '2025-01-14',
      time: '09:00 - 11:00',
      mode: 'حضوري',
      location: 'قاعة B',
      status: 'منتهية',
      trainees: 20,
      company: 'شركة البرمجيات'
    }
  ]);

  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleEdit = (session: Session) => {
    if (session.status === 'منتهية') {
      showNotification('لا يمكن تعديل جلسة منتهية', 'error');
      return;
    }
    setEditingSession({ ...session });
  };

  const handleCancel = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;
    if (session.status === 'منتهية') {
      showNotification('لا يمكن إلغاء جلسة منتهية', 'error');
      return;
    }
    if (session.status === 'جارية') {
      showNotification('لا يمكن إلغاء جلسة بدأت بالفعل', 'error');
      return;
    }
    setSessions(sessions.filter(s => s.id !== sessionId));
    showNotification('تم إلغاء الجلسة وإرسال إشعارات للمتدربين والشركات', 'success');
  };

  const checkConflict = (updatedSession: Session) => {
    return sessions.some(s =>
      s.id !== updatedSession.id &&
      s.date === updatedSession.date &&
      s.trainer === updatedSession.trainer &&
      s.status !== 'ملغاة'
    );
  };

  const handleSave = () => {
    if (!editingSession) return;
    if (checkConflict(editingSession)) {
      showNotification('يوجد تعارض مع جلسة أخرى للمدرب في نفس التاريخ', 'error');
      return;
    }
    setSessions(sessions.map(s =>
      s.id === editingSession.id ? editingSession : s
    ));
    setEditingSession(null);
    showNotification('تم حفظ التعديلات وإرسال إشعارات للمتدربين والشركات', 'success');
  };

  const handleReorder = (index: number, direction: 'up' | 'down') => {
    const newSessions = [...sessions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSessions.length) {
      [newSessions[index], newSessions[targetIndex]] = [newSessions[targetIndex], newSessions[index]];
      setSessions(newSessions);
      showNotification('تم إعادة ترتيب الجلسات بنجاح', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#123247' }}>
            إدارة الجدول الزمني
          </h1>
          <p className="text-gray-600">
            تعديل وإلغاء وإعادة ترتيب الجلسات التدريبية
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

        {/* Sessions Grid */}
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className={`bg-white rounded-xl shadow-md border-2 transition-all ${
                session.status === 'منتهية'
                  ? 'border-gray-300 opacity-75'
                  : 'border-transparent hover:shadow-lg'
              }`}
            >
              {editingSession?.id === session.id ? (
                // Edit Mode
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                        عنوان الجلسة
                      </label>
                      <input
                        type="text"
                        value={editingSession.title}
                        onChange={(e) => setEditingSession({ ...editingSession, title: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#98c34f' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                        المدرب
                      </label>
                      <input
                        type="text"
                        value={editingSession.trainer}
                        onChange={(e) => setEditingSession({ ...editingSession, trainer: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#98c34f' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                        التاريخ
                      </label>
                      <input
                        type="date"
                        value={editingSession.date}
                        onChange={(e) => setEditingSession({ ...editingSession, date: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#98c34f' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                        الوقت
                      </label>
                      <input
                        type="text"
                        value={editingSession.time}
                        onChange={(e) => setEditingSession({ ...editingSession, time: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#98c34f' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                        نمط التدريب
                      </label>
                      <select
                        value={editingSession.mode}
                        onChange={(e) => setEditingSession({ ...editingSession, mode: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#98c34f' }}
                      >
                        <option>حضوري</option>
                        <option>عن بعد</option>
                        <option>مختلط</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                        المكان
                      </label>
                      <input
                        type="text"
                        value={editingSession.location}
                        onChange={(e) => setEditingSession({ ...editingSession, location: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#98c34f' }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#98c34f' }}
                    >
                      <Save size={18} />
                      حفظ التغييرات
                    </button>
                    <button
                      onClick={() => setEditingSession(null)}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#123247' }}>
                        {session.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          {session.trainer}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {session.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {session.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {session.mode} - {session.location}
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-1 rounded-full text-sm font-medium ${
                      session.status === 'مجدولة'
                        ? 'bg-blue-100 text-blue-700'
                        : session.status === 'منتهية'
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {session.status}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <span>عدد المتدربين: {session.trainees}</span>
                    <span>•</span>
                    <span>{session.company}</span>
                  </div>

                  {session.status !== 'منتهية' && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleEdit(session)}
                        className="px-4 py-2 text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#123247' }}
                      >
                        <Edit2 size={16} />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleCancel(session.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                        إلغاء الجلسة
                      </button>
                      <button
                        onClick={() => handleReorder(index, 'up')}
                        disabled={index === 0}
                        className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-40"
                        style={{ backgroundColor: '#98c34f', color: 'white' }}
                      >
                        <RefreshCw size={16} />
                        تقديم
                      </button>
                      <button
                        onClick={() => handleReorder(index, 'down')}
                        disabled={index === sessions.length - 1}
                        className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-40"
                        style={{ backgroundColor: '#98c34f', color: 'white' }}
                      >
                        <RefreshCw size={16} className="rotate-180" />
                        تأخير
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
