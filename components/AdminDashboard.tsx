
import React, { useState } from 'react';
import { db } from '../firebase.ts';
import { doc, updateDoc } from "firebase/firestore";

interface AdminDashboardProps {
  data: any;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onClose }) => {
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "site", "content"), formData);
      alert("تم حفظ التعديلات بنجاح في قاعدة البيانات! ✨");
      onClose();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحفظ.");
    }
    setSaving(false);
  };

  const addAchievement = () => {
    const newItems = [...formData.achievements, { title: "إنجاز جديد", description: "وصف الإنجاز", icon: "🏆", tag: "عام", color: "bg-blue-100 text-blue-800 border-blue-200" }];
    setFormData({...formData, achievements: newItems});
  };

  const removeAchievement = (index: number) => {
    const newItems = formData.achievements.filter((_: any, i: number) => i !== index);
    setFormData({...formData, achievements: newItems});
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">لوحة تحكم المسؤول 🛠️</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">إغلاق ✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto bg-slate-50">
          {['general', 'achievements', 'hobbies'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-bold transition-colors ${activeTab === tab ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab === 'general' ? 'إعدادات عامة' : tab === 'achievements' ? 'الإنجازات' : 'الهوايات'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">اسم الطالب</label>
                <input type="text" className="w-full p-3 border rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">رابط الصورة الشخصية</label>
                <input type="text" className="w-full p-3 border rounded-xl" value={formData.heroImage} onChange={e => setFormData({...formData, heroImage: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">نبذة عني</label>
                <textarea rows={3} className="w-full p-3 border rounded-xl" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">نص الطموح المستقبلي</label>
                <textarea rows={3} className="w-full p-3 border rounded-xl" value={formData.futureText} onChange={e => setFormData({...formData, futureText: e.target.value})} />
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              {formData.achievements.map((item: any, idx: number) => (
                <div key={idx} className="p-4 border rounded-2xl bg-slate-50 relative group">
                  <button onClick={() => removeAchievement(idx)} className="absolute top-2 left-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">حذف</button>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="العنوان" className="p-2 border rounded-lg" value={item.title} onChange={e => {
                      const newArr = [...formData.achievements];
                      newArr[idx].title = e.target.value;
                      setFormData({...formData, achievements: newArr});
                    }} />
                    <input type="text" placeholder="أيقونة" className="p-2 border rounded-lg" value={item.icon} onChange={e => {
                      const newArr = [...formData.achievements];
                      newArr[idx].icon = e.target.value;
                      setFormData({...formData, achievements: newArr});
                    }} />
                  </div>
                  <textarea placeholder="الوصف" className="w-full mt-2 p-2 border rounded-lg" value={item.description} onChange={e => {
                    const newArr = [...formData.achievements];
                    newArr[idx].description = e.target.value;
                    setFormData({...formData, achievements: newArr});
                  }} />
                </div>
              ))}
              <button onClick={addAchievement} className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-colors">+ إضافة إنجاز</button>
            </div>
          )}

          {activeTab === 'hobbies' && (
            <div className="text-center py-10 text-slate-400">
               (يمكنك تعديل الهوايات بنفس الطريقة - قيد التطوير للتنسيق)
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-slate-50 flex gap-4">
          <button 
            disabled={saving}
            onClick={handleSave}
            className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg"
          >
            {saving ? 'جاري الحفظ...' : 'حفظ كافة التغييرات'}
          </button>
          <button onClick={onClose} className="px-8 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300">إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
