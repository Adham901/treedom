"use client"

import React, { useState, ChangeEvent } from 'react';
import { Eye, EyeOff, CheckCircle2, Mail, Phone, Lock, User, AlertCircle } from 'lucide-react';

interface FormData {
  tradeName: string;
  email: string;
  phone: string;
  password: string;
}

interface Errors {
  tradeName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface PasswordStrength {
  valid: boolean;
  message: string;
}

export default function ProviderRegistration() {
  const [step, setStep] = useState<'register' | 'pending' | 'verified'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tradeName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ valid: false, message: '' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): PasswordStrength => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasMinLength) {
      return { valid: false, message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' };
    }
    if (!hasNumber) {
      return { valid: false, message: 'يجب أن تحتوي على أرقام' };
    }
    if (!hasSymbol) {
      return { valid: false, message: 'يجب أن تحتوي على رموز خاصة' };
    }
    return { valid: true, message: 'كلمة مرور قوية' };
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
    
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    const newErrors: Errors = {};

    if (!formData.tradeName.trim()) {
      newErrors.tradeName = 'الاسم التجاري مطلوب';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب';
    }
    if (!passwordStrength.valid) {
      newErrors.password = passwordStrength.message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // حفظ الحساب بحالة Pending
    setStep('pending');
  };

  const handleVerification = () => {
    setStep('verified');
  };

  if (step === 'verified') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white" >
        <div className="bg-white p-8 w-full text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#98c34f' }}>
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#123247' }}>
              تم التحقق من الحساب بنجاح!
            </h2>
            <p className="text-gray-600 text-lg">
              حسابك الآن نشط ويمكنك البدء في استخدام المنصة
            </p>
          </div>
          
          <div className="space-y-3 mb-6 text-right">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">الاسم التجاري:</span>
              <span className="font-semibold" style={{ color: '#123247' }}>{formData.tradeName}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">البريد الإلكتروني:</span>
              <span className="font-semibold" style={{ color: '#123247' }}>{formData.email}</span>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-lg text-white font-semibold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#98c34f' }}
            onClick={() => alert('الانتقال إلى لوحة التحكم')}
          >
            الانتقال إلى لوحة التحكم
          </button>
        </div>
      </div>
    );
  }

  if (step === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#123247' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Mail className="w-20 h-20 mx-auto mb-4" style={{ color: '#98c34f' }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#123247' }}>
              تحقق من بريدك الإلكتروني
            </h2>
            <p className="text-gray-600 text-lg">
              تم إنشاء حسابك بنجاح! قمنا بإرسال رابط التفعيل إلى:
            </p>
            <p className="font-semibold mt-2" style={{ color: '#98c34f' }}>
              {formData.email}
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-right">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">ملاحظة هامة:</p>
                <p>يرجى التحقق من صندوق البريد الوارد أو مجلد الرسائل غير المرغوب فيها (Spam)</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleVerification}
              className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#98c34f' }}
            >
              محاكاة التفعيل (اضغط هنا)
            </button>
            
            <button
              className="w-full py-3 rounded-lg font-semibold transition-all hover:bg-gray-100"
              style={{ color: '#123247', border: '2px solid #123247' }}
              onClick={() => alert('تم إعادة إرسال رابط التفعيل')}
            >
              إعادة إرسال رابط التفعيل
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" >
      <div className="bg-white rounded-2xl shadow-2xl p-8  w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#98c34f' }}>
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#123247' }}>
            إنشاء حساب مقدم خدمة
          </h1>
          <p className="text-gray-600">املأ البيانات للبدء في تقديم خدمات التدريب</p>
        </div>

        <div className="space-y-5">
          {/* الاسم التجاري */}
          <div>
            <label className="block text-right font-semibold mb-2" style={{ color: '#123247' }}>
              الاسم التجاري *
            </label>
            <div className="relative">
              <User className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="tradeName"
                value={formData.tradeName}
                onChange={handleInputChange}
                className="w-full pr-10 pl-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-80 transition-colors text-right"
                style={{ borderColor: errors.tradeName ? '#ef4444' : '#123247' }}
                placeholder="أدخل الاسم التجاري"
              />
            </div>
            {errors.tradeName && (
              <p className="text-red-500 text-sm mt-1 text-right">{errors.tradeName}</p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <label className="block text-right font-semibold mb-2" style={{ color: '#123247' }}>
              البريد الإلكتروني *
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pr-10 pl-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-80 transition-colors text-right"
                style={{ borderColor: errors.email ? '#ef4444' : '#123247' }}
                placeholder="example@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 text-right">{errors.email}</p>
            )}
          </div>

          {/* رقم الجوال */}
          <div>
            <label className="block text-right font-semibold mb-2" style={{ color: '#123247' }}>
              رقم الجوال *
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pr-10 pl-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-80 transition-colors text-right"
                style={{ borderColor: errors.phone ? '#ef4444' : '#123247' }}
                placeholder="05XXXXXXXX"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 text-right">{errors.phone}</p>
            )}
          </div>

          {/* كلمة المرور */}
          <div>
            <label className="block text-right font-semibold mb-2" style={{ color: '#123247' }}>
              كلمة المرور *
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pr-10 pl-12 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-80 transition-colors text-right"
                style={{ borderColor: errors.password ? '#ef4444' : '#123247' }}
                placeholder="أدخل كلمة المرور"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.password && (
              <div className={`text-sm mt-2 text-right ${passwordStrength.valid ? 'text-green-600' : 'text-red-500'}`}>
                {passwordStrength.message}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2 text-right">
              يجب أن تحتوي على 8 أحرف على الأقل، أرقام ورموز خاصة
            </p>
          </div>

          {/* زر الإنشاء */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg text-white font-bold text-lg transition-all hover:opacity-90 mt-6"
            style={{ backgroundColor: '#98c34f' }}
          >
            إنشاء حساب
          </button>
        </div>
      </div>
    </div>
  );
}
