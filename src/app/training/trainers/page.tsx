'use client';
import React, { useState } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Search,
  Phone,
  Briefcase,
  Award,
  AlertCircle,
  CheckCircle,
  Mail,
} from 'lucide-react';

/* ===================== TYPES ===================== */
type Trainer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  activeSessions: number;
  completedSessions: number;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
};

type FormErrors = Partial<FormData>;

type Notification = {
  message: string;
  type: 'success' | 'error';
};

/* ===================== COMPONENT ===================== */
export default function TrainersManagement() {
  const [trainers, setTrainers] = useState<Trainer[]>([
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed.mohamed@email.com',
      phone: '+966501234567',
      specialization: 'البرمجة وتطوير الويب',
      experience: '8 سنوات',
      activeSessions: 3,
      completedSessions: 25,
    },
    {
      id: 2,
      name: 'سارة أحمد حسن',
      email: 'sarah.ahmed@email.com',
      phone: '+966507654321',
      specialization: 'إدارة المشاريع',
      experience: '5 سنوات',
      activeSessions: 2,
      completedSessions: 18,
    },
    {
      id: 3,
      name: 'محمد علي خالد',
      email: 'mohamed.ali@email.com',
      phone: '+966509876543',
      specialization: 'الأمن السيبراني',
      experience: '10 سنوات',
      activeSessions: 0,
      completedSessions: 40,
    },
    {
      id: 4,
      name: 'فاطمة عبدالله',
      email: 'fatima.abdullah@email.com',
      phone: '+966502468135',
      specialization: 'تحليل البيانات',
      experience: '6 سنوات',
      activeSessions: 1,
      completedSessions: 22,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  /* ===================== HELPERS ===================== */
  const showNotification = (message: string, type: Notification['type']) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
    });
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) errors.name = 'الاسم مطلوب';

    if (!formData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'رقم الجوال مطلوب';
    } else if (!/^(\+966|00966|0)?5[0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'رقم الجوال غير صحيح';
    }

    if (!formData.specialization.trim()) errors.specialization = 'التخصص مطلوب';
    if (!formData.experience.trim()) errors.experience = 'سنوات الخبرة مطلوبة';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ===================== CRUD ===================== */
  const handleAddTrainer = () => {
    if (!validateForm()) {
      showNotification('يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح', 'error');
      return;
    }

    const newTrainer: Trainer = {
      id: Date.now(),
      ...formData,
      activeSessions: 0,
      completedSessions: 0,
    };

    setTrainers(prev => [...prev, newTrainer]);
    setShowAddModal(false);
    resetForm();
    showNotification('تم إضافة المدرب بنجاح', 'success');
  };

  const handleEditClick = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setFormData({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      specialization: trainer.specialization,
      experience: trainer.experience,
    });
    setShowEditModal(true);
  };

  const handleUpdateTrainer = () => {
    if (!selectedTrainer) return;

    if (!validateForm()) {
      showNotification('يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح', 'error');
      return;
    }

    setTrainers(prev =>
      prev.map(t =>
        t.id === selectedTrainer.id ? { ...t, ...formData } : t
      )
    );

    setShowEditModal(false);
    setSelectedTrainer(null);
    resetForm();
    showNotification('تم تحديث بيانات المدرب بنجاح', 'success');
  };

  const handleDeleteClick = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setShowDeleteDialog(true);
  };

  const handleDeleteTrainer = () => {
    if (!selectedTrainer) return;

    if (selectedTrainer.activeSessions > 0) {
      showNotification(
        `لا يمكن حذف المدرب لأنه مرتبط بـ ${selectedTrainer.activeSessions} جلسة نشطة`,
        'error'
      );
      setShowDeleteDialog(false);
      setSelectedTrainer(null);
      return;
    }

    setTrainers(prev => prev.filter(t => t.id !== selectedTrainer.id));
    setShowDeleteDialog(false);
    setSelectedTrainer(null);
    showNotification('تم حذف المدرب بنجاح', 'success');
  };

  /* ===================== FILTER ===================== */
  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const TrainerModal = ({ isEdit = false }) => {
    const title = isEdit ? 'تعديل بيانات المدرب' : 'إضافة مدرب جديد';
    const handleSubmit = isEdit ? handleUpdateTrainer : handleAddTrainer;
    const handleClose = () => {
      if (isEdit) {
        setShowEditModal(false);
        setSelectedTrainer(null);
      } else {
        setShowAddModal(false);
      }
      resetForm();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClose}>
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold" style={{ color: '#123247' }}>
              {title}
            </h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full  text-gray-800 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                  formErrors.name ? 'border-red-500' : ''
                }`}
                style={{ borderColor: formErrors.name ? '#ef4444' : '#98c34f' }}
                placeholder="أدخل اسم المدرب"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full  text-gray-800 pr-10 pl-4 py-2 border-2 rounded-lg focus:outline-none ${
                    formErrors.email ? 'border-red-500' : ''
                  }`}
                  style={{ borderColor: formErrors.email ? '#ef4444' : '#98c34f' }}
                  placeholder="trainer@example.com"
                />
              </div>
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                رقم الجوال <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full  text-gray-800 pr-10 pl-4 py-2 border-2 rounded-lg focus:outline-none ${
                    formErrors.phone ? 'border-red-500' : ''
                  }`}
                  style={{ borderColor: formErrors.phone ? '#ef4444' : '#98c34f' }}
                  placeholder="+966501234567"
                />
              </div>
              {formErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
              )}
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                التخصص <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Award className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className={`w-full  text-gray-800 pr-10 pl-4 py-2 border-2 rounded-lg focus:outline-none ${
                    formErrors.specialization ? 'border-red-500' : ''
                  }`}
                  style={{ borderColor: formErrors.specialization ? '#ef4444' : '#98c34f' }}
                  placeholder="مثال: البرمجة وتطوير الويب"
                />
              </div>
              {formErrors.specialization && (
                <p className="text-red-500 text-sm mt-1">{formErrors.specialization}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#123247' }}>
                سنوات الخبرة <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className={`w-full  text-gray-800 pr-10 pl-4 py-2 border-2 rounded-lg focus:outline-none ${
                    formErrors.experience ? 'border-red-500' : ''
                  }`}
                  style={{ borderColor: formErrors.experience ? '#ef4444' : '#98c34f' }}
                  placeholder="مثال: 5 سنوات"
                />
              </div>
              {formErrors.experience && (
                <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3  text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#98c34f' }}
            >
              <Save size={20} />
              {isEdit ? 'حفظ التعديلات' : 'إضافة المدرب'}
            </button>
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#123247' }}>
            إدارة المدربين
          </h1>
          <p className="text-gray-600">
            إضافة وتعديل وحذف المدربين في مركز التدريب
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-r-4" style={{ borderColor: '#123247' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي المدربين</p>
                <p className="text-3xl font-bold" style={{ color: '#123247' }}>{trainers.length}</p>
              </div>
              <Users size={40} style={{ color: '#123247' }} className="opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-r-4" style={{ borderColor: '#98c34f' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">جلسات نشطة</p>
                <p className="text-3xl font-bold" style={{ color: '#98c34f' }}>
                  {trainers.reduce((sum, t) => sum + t.activeSessions, 0)}
                </p>
              </div>
              <Briefcase size={40} style={{ color: '#98c34f' }} className="opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">جلسات مكتملة</p>
                <p className="text-3xl font-bold text-blue-600">
                  {trainers.reduce((sum, t) => sum + t.completedSessions, 0)}
                </p>
              </div>
              <CheckCircle size={40} className="text-blue-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="flex-1 w-full relative">
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="البحث عن مدرب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border-2 rounded-lg focus:outline-none  text-gray-800"
                style={{ borderColor: '#98c34f' }}
              />
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ backgroundColor: '#98c34f' }}
            >
              <Plus size={20} />
              إضافة مدرب جديد
            </button>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
            <div key={trainer.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: '#123247' }}>
                      {trainer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#123247' }}>
                        {trainer.name}
                      </h3>
                      <p className="text-sm text-gray-500">{trainer.specialization}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span className="truncate">{trainer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{trainer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{trainer.experience}</span>
                  </div>
                </div>

                <div className="flex gap-4 mb-4 text-sm">
                  <div className="flex-1 text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-green-600 font-bold">{trainer.activeSessions}</p>
                    <p className="text-gray-600">جلسات نشطة</p>
                  </div>
                  <div className="flex-1 text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-blue-600 font-bold">{trainer.completedSessions}</p>
                    <p className="text-gray-600">جلسات مكتملة</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(trainer)}
                    className="flex-1 px-4 py-2 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#123247' }}
                  >
                    <Edit2 size={16} />
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDeleteClick(trainer)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainers.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Users size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold mb-2 text-gray-700">لا يوجد مدربين</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'لم يتم العثور على مدربين بهذا الاسم' : 'ابدأ بإضافة مدرب جديد'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2 text-white rounded-lg font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#98c34f' }}
              >
                <Plus size={20} />
                إضافة مدرب جديد
              </button>
            )}
          </div>
        )}

        {/* Modals */}
        {showAddModal && <TrainerModal />}
        {showEditModal && <TrainerModal isEdit={true} />}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && selectedTrainer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowDeleteDialog(false)}>
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#123247' }}>
                  تأكيد الحذف
                </h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                هل أنت متأكد من حذف المدرب <span className="font-bold">{selectedTrainer.name}</span>؟
              </p>

              {selectedTrainer.activeSessions > 0 && (
                <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    تحذير: هذا المدرب مرتبط بـ {selectedTrainer.activeSessions} جلسة نشطة
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleDeleteTrainer}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  حذف
                </button>
                <button
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setSelectedTrainer(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
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