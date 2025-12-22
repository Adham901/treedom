"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Upload,
  FileText,
  Image,
  Presentation,
  CheckCircle,
  Clock,
  Plus,
  X,
  AlertCircle,
  BookOpen,
  Target,
  Calendar,
  Award,
} from "lucide-react";

type Program = {
  id: number;
  name: string;
  status: "approved" | "pending";
  date: string;
};

type FormData = {
  name: string;
  description: string;
  category: string;
  objectives: string;
  days: string;
  hours: string;
};

type FileItem = {
  id: number;
  name: string;
  size: string;
  type: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function TrainingProgramUpload() {
  const [view, setView] = useState<"list" | "add" | "pending" | "approved">(
    "list"
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "",
    objectives: "",
    days: "",
    hours: "",
  });
  const [files, setFiles] = useState<FileItem[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [programs] = useState<Program[]>([
    { id: 1, name: "برنامج القيادة الإدارية", status: "approved", date: "2024-12-15" },
    { id: 2, name: "مهارات التواصل الفعال", status: "pending", date: "2024-12-20" },
  ]);

  const categories = [
    "تطوير الذات",
    "القيادة والإدارة",
    "المهارات التقنية",
    "المهارات البيعية",
    "الموارد البشرية",
    "التسويق الرقمي",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files);
    const newFiles: FileItem[] = uploadedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-6 h-6 text-red-500" />;
    if (type.includes("presentation") || type.includes("powerpoint"))
      return <Presentation className="w-6 h-6 text-orange-500" />;
    if (type.includes("image"))
      return <Image className="w-6 h-6 text-blue-500" />;
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  const handleSubmit = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "اسم البرنامج مطلوب";
    if (!formData.description.trim()) newErrors.description = "الوصف التفصيلي مطلوب";
    if (!formData.category) newErrors.category = "الفئة مطلوبة";
    if (!formData.objectives.trim()) newErrors.objectives = "الأهداف التعليمية مطلوبة";
    if (!formData.days) newErrors.days = "عدد الأيام مطلوب";
    if (!formData.hours) newErrors.hours = "عدد الساعات مطلوب";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setView("pending");
  };

  const getStatusBadge = (status: "approved" | "pending") => {
    if (status === "approved") {
      return (
        <span
          className="px-5 py-2 rounded-full text-lg font-bold flex items-center gap-2"
          style={{ backgroundColor: "#98c34f", color: "white" }}
        >
          <CheckCircle className="w-6 h-6" />
          معتمد
        </span>
      );
    }
    return (
      <span className="px-5 py-2 bg-yellow-100 text-yellow-700 rounded-full text-lg font-bold flex items-center gap-2">
        <Clock className="w-6 h-6" />
        قيد المراجعة
      </span>
    );
  };

  // ===== View: Approved =====
  if (view === "approved") {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: "#f8f9fa" }} dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div
              className="mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-8"
              style={{ backgroundColor: "#98c34f" }}
            >
              <Award className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-5xl font-bold mb-5" style={{ color: "#123247" }}>
              تم اعتماد البرنامج بنجاح!
            </h2>
            <p className="text-gray-600 text-2xl mb-8 leading-relaxed">
              البرنامج التدريبي &quot;{formData.name}&quot; أصبح الآن متاح للنشر للشركات والمتدربين
            </p>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 text-right">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" />
                <div className="text-base text-green-800">
                  <p className="font-bold text-xl mb-2">البرنامج جاهز للنشر</p>
                  <p className="text-lg">يمكنك الآن نشر البرنامج ومتابعة التسجيلات من لوحة التحكم</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 py-4 text-xl rounded-xl font-bold transition-all hover:bg-gray-100"
                style={{ color: "#123247", border: "3px solid #123247" }}
                onClick={() => alert("نشر البرنامج")}
              >
                نشر البرنامج الآن
              </button>
              <button
                onClick={() => setView("list")}
                className="flex-1 py-4 text-xl rounded-xl text-white font-bold transition-all hover:opacity-90"
                style={{ backgroundColor: "#98c34f" }}
              >
                العودة للبرامج
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== View: Pending =====
  if (view === "pending") {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: "#f8f9fa" }} dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <Clock className="w-28 h-28 mx-auto mb-6 text-yellow-500" />
            <h2 className="text-5xl font-bold mb-5" style={{ color: "#123247" }}>
              تم إرسال البرنامج للمراجعة
            </h2>
            <p className="text-gray-600 text-2xl mb-8 leading-relaxed">
              البرنامج &quot;{formData.name}&quot; قيد المراجعة من إدارة المنصة
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-right">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-base text-blue-800">
                  <p className="font-bold text-xl mb-2">ماذا يحدث الآن؟</p>
                  <p className="text-lg leading-relaxed">
                    سيتم مراجعة المحتوى التدريبي والتأكد من جودته ومطابقته لمعايير المنصة.
                    ستصلك إشعار عند اعتماد البرنامج.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-right bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-2xl mb-4" style={{ color: "#123247" }}>
                تفاصيل البرنامج المرسل:
              </h3>
              <div className="flex justify-between py-3 border-b-2 text-lg">
                <span className="text-gray-600 font-semibold">اسم البرنامج:</span>
                <span className="font-bold">{formData.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b-2 text-lg">
                <span className="text-gray-600 font-semibold">الفئة:</span>
                <span className="font-bold">{formData.category}</span>
              </div>
              <div className="flex justify-between py-3 text-lg">
                <span className="text-gray-600 font-semibold">المدة:</span>
                <span className="font-bold">
                  {formData.days} أيام / {formData.hours} ساعات
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setView("list")}
                className="flex-1 py-4 text-xl rounded-xl font-bold transition-all hover:bg-gray-100"
                style={{ color: "#123247", border: "3px solid #123247" }}
              >
                العودة للقائمة
              </button>
              <button
                onClick={() => setView("approved")}
                className="flex-1 py-4 text-xl rounded-xl text-white font-bold transition-all hover:opacity-90"
                style={{ backgroundColor: "#98c34f" }}
              >
                محاكاة الموافقة
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== View: Add Program =====
  if (view === "add") {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: "#f8f9fa" }} dir="rtl">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold" style={{ color: "#123247" }}>
                إضافة برنامج تدريبي جديد
              </h1>
              <button onClick={() => setView("list")} className="text-gray-600 hover:text-gray-800">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-7">
              {/* اسم البرنامج */}
              <div>
                <label className="block text-right font-bold mb-3 text-xl" style={{ color: "#123247" }}>
                  <BookOpen className="w-6 h-6 inline ml-2" />
                  اسم البرنامج *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none text-right"
                  style={{ borderColor: errors.name ? "#ef4444" : "#123247" }}
                  placeholder="مثال: برنامج القيادة الإدارية المتقدمة"
                />
                {errors.name && <p className="text-red-500 text-base mt-2 text-right">{errors.name}</p>}
              </div>

              {/* الفئة */}
              <div>
                <label className="block text-right font-bold mb-3 text-xl" style={{ color: "#123247" }}>
                  الفئة *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none text-right"
                  style={{ borderColor: errors.category ? "#ef4444" : "#123247" }}
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-base mt-2 text-right">{errors.category}</p>}
              </div>

              {/* الوصف التفصيلي */}
              <div>
                <label className="block text-right font-bold mb-3 text-xl" style={{ color: "#123247" }}>
                  الوصف التفصيلي *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none text-right"
                  style={{ borderColor: errors.description ? "#ef4444" : "#123247" }}
                  placeholder="اكتب وصف شامل للبرنامج التدريبي..."
                />
                {errors.description && <p className="text-red-500 text-base mt-2 text-right">{errors.description}</p>}
              </div>

              {/* الأهداف التعليمية */}
              <div>
                <label className="block text-right font-bold mb-3 text-xl" style={{ color: "#123247" }}>
                  <Target className="w-6 h-6 inline ml-2" />
                  الأهداف التعليمية *
                </label>
                <textarea
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none text-right"
                  style={{ borderColor: errors.objectives ? "#ef4444" : "#123247" }}
                  placeholder="ما هي الأهداف التي سيحققها المتدرب؟"
                />
                {errors.objectives && <p className="text-red-500 text-base mt-2 text-right">{errors.objectives}</p>}
              </div>

              {/* المدة */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-right font-bold mb-3 text-xl" style={{ color: "#123247" }}>
                    <Calendar className="w-6 h-6 inline ml-2" />
                    عدد الأيام *
                  </label>
                  <input
                    type="number"
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none text-right"
                    style={{ borderColor: errors.days ? "#ef4444" : "#123247" }}
                    placeholder="5"
                  />
                  {errors.days && <p className="text-red-500 text-base mt-2 text-right">{errors.days}</p>}
                </div>
                <div>
                  <label className="block text-right font-bold mb-3 text-xl" style={{ color: "#123247" }}>
                    عدد الساعات *
                  </label>
                  <input
                    type="number"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none text-right"
                    style={{ borderColor: errors.hours ? "#ef4444" : "#123247" }}
                    placeholder="25"
                  />
                  {errors.hours && <p className="text-red-500 text-base mt-2 text-right">{errors.hours}</p>}
                </div>
              </div>

              {/* رفع الملفات */}
              <div>
                <label className="block text-right font-bold mb-4 text-xl" style={{ color: "#123247" }}>
                  <Upload className="w-6 h-6 inline ml-2" />
                  المحتوى التدريبي
                </label>
                <div className="border-3 border-dashed rounded-xl p-8 text-center" style={{ borderColor: "#123247" }}>
                  <Upload className="w-16 h-16 mx-auto mb-4" style={{ color: "#98c34f" }} />
                  <p className="text-gray-600 text-lg mb-3">اسحب الملفات هنا أو</p>
                  <label
                    className="inline-block px-8 py-3 text-lg rounded-xl cursor-pointer text-white font-bold hover:opacity-90 transition"
                    style={{ backgroundColor: "#98c34f" }}
                  >
                    اختر الملفات
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.ppt,.pptx,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-base text-gray-500 mt-3">PDF, PowerPoint, صور (حد أقصى 10 ملفات)</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-5 space-y-3">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4">
                          {getFileIcon(file.type)}
                          <div className="text-right">
                            <p className="font-bold text-base">{file.name}</p>
                            <p className="text-gray-500 text-sm">{file.size}</p>
                          </div>
                        </div>
                        <button onClick={() => removeFile(file.id)} className="text-red-500 hover:text-red-700">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 text-xl rounded-xl text-white font-bold transition-all hover:opacity-90"
                  style={{ backgroundColor: "#98c34f" }}
                >
                  إرسال للمراجعة
                </button>
                <button
                  onClick={() => setView("list")}
                  className="flex-1 py-4 text-xl rounded-xl font-bold transition-all hover:bg-gray-100"
                  style={{ color: "#123247", border: "3px solid #123247" }}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== View: List =====
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f8f9fa" }} dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold" style={{ color: "#123247" }}>
            البرامج التدريبية
          </h1>
          <button
            onClick={() => setView("add")}
            className="flex items-center gap-3 px-6 py-3 text-xl rounded-xl text-white font-bold hover:opacity-90 transition"
            style={{ backgroundColor: "#98c34f" }}
          >
            <Plus className="w-6 h-6" /> إضافة برنامج جديد
          </button>
        </div>

        <div className="space-y-5">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center cursor-pointer hover:shadow-2xl transition"
              onClick={() => setView(program.status === "approved" ? "approved" : "pending")}
            >
              <div>
                <h3 className="font-bold text-2xl mb-2" style={{ color: "#123247" }}>
                  {program.name}
                </h3>
                <p className="text-gray-500 text-lg">تاريخ الإضافة: {program.date}</p>
              </div>
              {getStatusBadge(program.status)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}