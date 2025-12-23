'use client';

import React from 'react';
import { X, Save } from 'lucide-react';

export type FormData = {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
};

export type FormErrors = Partial<FormData>;

type Props = {
  isEdit: boolean;
  formData: FormData;
  formErrors: FormErrors;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onClose: () => void;
  onSubmit: () => void;
};

export default function TrainerModal({
  isEdit,
  formData,
  formErrors,
  setFormData,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#123247]">
            {isEdit ? 'تعديل بيانات المدرب' : 'إضافة مدرب جديد'}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* مثال Input */}
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData(prev => ({ ...prev, name: e.target.value }))
          }
          className={`w-full px-4 py-2 border-2 rounded-lg text-gray-800 ${
            formErrors.name ? 'border-red-500' : 'border-green-400'
          }`}
          placeholder="الاسم الكامل"
        />

        {formErrors.name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
        )}

        <button
          onClick={onSubmit}
          className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Save size={18} />
          {isEdit ? 'حفظ التعديلات' : 'إضافة المدرب'}
        </button>
      </div>
    </div>
  );
}
