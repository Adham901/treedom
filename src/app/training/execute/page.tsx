'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Play, Square, Upload, Link2, Users, FileText, AlertCircle, CheckCircle, Video } from 'lucide-react';

type Session = {
  id: number;
  title: string;
  trainer: string;
  date: string;
  time: string;
  startTime: string;
  mode: string;
  location: string;
  status: 'Scheduled' | 'InProgress' | 'Completed';
  trainees: number;
  company: string;
  actualStartTime?: string;
  actualEndTime?: string;
};

type Notification = {
  message: string;
  type: 'success' | 'error';
};

export default function TrainingDelivery() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      title: 'تدريب البرمجة المتقدمة',
      trainer: 'أحمد محمد',
      date: '2025-12-22',
      time: '10:00 - 12:00',
      startTime: '10:00',
      mode: 'حضوري',
      location: 'قاعة A',
      status: 'Scheduled',
      trainees: 25,
      company: 'شركة التقنية'
    },
    {
      id: 2,
      title: 'إدارة المشاريع الاحترافية',
      trainer: 'سارة أحمد',
      date: '2025-12-22',
      time: '14:00 - 16:00',
      startTime: '14:00',
      mode: 'عن بعد',
      location: 'Zoom',
      status: 'Scheduled',
      trainees: 30,
      company: 'شركة الابتكار'
    },
    {
      id: 3,
      title: 'تطوير الويب الكامل',
      trainer: 'محمد علي',
      date: '2025-12-22',
      time: '09:00 - 11:00',
      startTime: '09:00',
      mode: 'حضوري',
      location: 'قاعة B',
      status: 'Completed',
      trainees: 20,
      company: 'شركة البرمجيات',
      actualStartTime: '09:05',
      actualEndTime: '11:10'
    }
  ]);

  const [activeSession, setActiveSession] = useState<number | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [presentationLink, setPresentationLink] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const canStartSession = (session: Session) => {
    if (session.status !== 'Scheduled') return false;
    const now = new Date();
    const sessionDate = new Date(session.date + 'T' + session.startTime);
    const timeDiff = (sessionDate.getTime() - now.getTime()) / (1000 * 60);
    return timeDiff <= 15;
  };

  const handleStartSession = (session: Session) => {
    if (session.status !== 'Scheduled') {
      showNotification('لا يمكن بدء جلسة غير مجدولة', 'error');
      return;
    }
    if (!canStartSession(session)) {
      showNotification('لا يمكن بدء الجلسة قبل موعدها بأكثر من 15 دقيقة', 'error');
      return;
    }
    const startTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: false });
    setSessions(sessions.map(s => s.id === session.id ? { ...s, status: 'InProgress', actualStartTime: startTime } : s));
    setActiveSession(session.id);
    showNotification('تم بدء الجلسة وتسجيل وقت البدء', 'success');
  };

  const handleEndSession = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session || session.status !== 'InProgress') {
      showNotification('لا يمكن إنهاء جلسة غير مبدوءة', 'error');
      return;
    }
    const endTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: false });
    setSessions(sessions.map(s => s.id === sessionId ? { ...s, status: 'Completed', actualEndTime: endTime } : s));
    setActiveSession(null);
    setPresentationLink('');
    setUploadedFiles([]);
    showNotification('تم إنهاء الجلسة. يمكنك الآن إدخال بيانات الحضور', 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
    showNotification(`تم رفع ${files.length} ملف بنجاح`, 'success');
  };

  const handleShareLink = () => {
    if (presentationLink.trim()) {
      showNotification('تم مشاركة رابط العرض التقديمي مع المتدربين', 'success');
    }
  };

  const getStatusColor = (status: Session['status']) => {
    switch(status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'InProgress':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Session['status']) => {
    switch(status) {
      case 'Scheduled':
        return 'مجدولة';
      case 'InProgress':
        return 'جارية';
      case 'Completed':
        return 'تم تنفيذها';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#123247' }}>جلسات اليوم</h1>
          <p className="text-gray-600">إدارة وتنفيذ الجلسات التدريبية المجدولة لهذا اليوم</p>
          <div className="mt-3 text-sm text-gray-500">
            الوقت الحالي: {currentTime.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
            {notification.type === 'success' ? <CheckCircle className="text-green-600" size={24} /> : <AlertCircle className="text-red-600" size={24} />}
            <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>{notification.message}</span>
          </div>
        )}

        {/* Sessions Grid */}
        <div className="space-y-6">
          {sessions.map((session) => (
            <div key={session.id} className={`bg-white rounded-xl shadow-md border-2 transition-all ${session.status === 'InProgress' ? 'border-green-400 shadow-lg' : 'border-transparent hover:shadow-lg'}`}>
              <div className="p-6">
                {/* Session Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#123247' }}>{session.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2"><User size={16} />{session.trainer}</div>
                      <div className="flex items-center gap-2"><Calendar size={16} />{session.date}</div>
                      <div className="flex items-center gap-2"><Clock size={16} />{session.time}</div>
                      <div className="flex items-center gap-2">{session.mode === 'عن بعد' ? <Video size={16} /> : <MapPin size={16} />}{session.mode} - {session.location}</div>
                    </div>
                  </div>
                  <div className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>{getStatusText(session.status)}</div>
                </div>

                {/* Session Info */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600"><Users size={16} /><span>عدد المتدربين: {session.trainees}</span></div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{session.company}</span>
                </div>

                {/* Time Tracking */}
                {(session.actualStartTime || session.actualEndTime) && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="flex gap-6">
                      {session.actualStartTime && <div><span className="text-gray-500">وقت البدء الفعلي: </span><span className="font-medium" style={{ color: '#123247' }}>{session.actualStartTime}</span></div>}
                      {session.actualEndTime && <div><span className="text-gray-500">وقت الانتهاء الفعلي: </span><span className="font-medium" style={{ color: '#123247' }}>{session.actualEndTime}</span></div>}
                    </div>
                  </div>
                )}

                {/* Active Session Controls */}
                {session.status === 'InProgress' && activeSession === session.id && (
                  <div className="mb-4 p-4 border-2 rounded-lg" style={{ borderColor: '#98c34f' }}>
                    <h4 className="font-bold mb-3" style={{ color: '#123247' }}>أدوات إدارة الجلسة</h4>
                    
                    {/* Presentation Link */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-2 text-gray-700">رابط العرض التقديمي</label>
                      <div className="flex gap-2">
                        <input type="text" value={presentationLink} onChange={(e) => setPresentationLink(e.target.value)} placeholder="https://presentation-link.com" className="flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none  text-gray-800" style={{ borderColor: '#98c34f' }} />
                        <button onClick={handleShareLink} className="px-4 py-2 text-white rounded-lg flex items-center gap-2 hover:opacity-90" style={{ backgroundColor: '#98c34f' }}>
                          <Link2 size={18} /> مشاركة
                        </button>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-2 text-gray-700">رفع الملفات</label>
                      <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#98c34f' }}>
                        <Upload size={18} style={{ color: '#98c34f' }} />
                        <span className="text-sm" style={{ color: '#123247' }}>اضغط لرفع الملفات</span>
                        <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                      </label>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText size={14} />
                              <span>{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Attendance Management */}
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                      <Users size={18} /> إدارة الحضور
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {session.status === 'Scheduled' && (
                    <button onClick={() => handleStartSession(session)} disabled={!canStartSession(session)} className={`px-6 py-3 text-white rounded-lg font-medium flex items-center gap-2 transition-all ${canStartSession(session) ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'}`} style={{ backgroundColor: '#98c34f' }}>
                      <Play size={18} /> بدء الجلسة
                    </button>
                  )}

                  {session.status === 'InProgress' && (
                    <button onClick={() => handleEndSession(session.id)} className="px-6 py-3 text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#123247' }}>
                      <Square size={18} /> إنهاء الجلسة
                    </button>
                  )}

                  {session.status === 'Completed' && (
                    <button className="px-6 py-3 text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#98c34f' }}>
                      <Users size={18} /> إدخال الحضور
                    </button>
                  )}

                  {!canStartSession(session) && session.status === 'Scheduled' && (
                    <div className="text-sm text-orange-600 flex items-center gap-2">
                      <AlertCircle size={16} />
                      يمكن بدء الجلسة قبل موعدها بـ 15 دقيقة فقط
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
