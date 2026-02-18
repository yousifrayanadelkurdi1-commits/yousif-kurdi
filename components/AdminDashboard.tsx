
import React, { useState } from 'react';
import { db } from '../firebase.ts';
import { doc, updateDoc } from "firebase/firestore";

interface AdminDashboardProps {
  data: any;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onClose }) => {
  // استخدام طريقة نسخ آمنة وبسيطة لتجنب تكرار الكائنات في الذاكرة
  const [formData, setFormData] = useState(() => {
    const cleanData = { ...data };
    if (cleanData.achievements) cleanData.achievements = cleanData.achievements.map((a: any) => ({ ...a }));
    if (cleanData.hobbies) cleanData.hobbies = cleanData.hobbies.map((h: any) => ({ ...h }));
    return cleanData;
  });
  
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async () => {
    setSaving(true);
    try {
      // نرسل فقط البيانات النظيفة لفايرستور
      const dataToSave = {
        name: formData.name,
        heroImage: formData.heroImage,
        bio: formData.bio,
        futureText: formData.futureText,
        achievements: formData.achievements,
        hobbies: formData.hobbies
      };
      await updateDoc(doc(db, "site", "content"), dataToSave);
      alert("تم حفظ التغييرات بنجاح! ✨");
      onClose();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحفظ.");
    }
    setSaving(false);
  };

  const addItem = (type: 'achievements' | 'hobbies') => {
    const newItem = type === 'achievements' 
      ? { title: "إنجاز جديد", description: "وصف الإنجاز", icon: "🏆", tag: "عام", color: "bg-blue-100 text-blue-800 border-blue-200" }
      : { name: "هواية جديدة", icon: "🎨", description: "وصف قصير", longDesc: "وصف تفصيلي", imageUrl: "https://picsum.photos/seed/new/800/600", color: "bg-purple-500" };
    
    setFormData({
      ...formData,
      [type]: [...formData[type], newItem]
    });
  };

  const removeItem = (type: 'achievements' | 'hobbies', index: number) => {
    const newList = [...formData[type]];
    newList.splice(index, 1);
    setFormData({ ...formData, [type]: newList });
  };

  const updateItem = (type: 'achievements' | 'hobbies', index: number, field: string, value: string) => {
    const newList = [...formData[type]];
    newList[index] = { ...newList[index], [field]: value };
    setFormData({ ...formData, [type]: newList });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 bg-emerald-600 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🛠️</span>
            <h2 className="text-2xl font-bold">لوحة تحكم يوسف</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors text-2xl">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-slate-50 shrink-0 text-right">
          {['general', 'achievements', 'hobbies'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-bold transition-all border-b-2 ${
                activeTab === tab 
                  ? 'text-emerald-600 border-emerald-600 bg-white' 
                  : 'text-slate-400 border-transparent hover:bg-slate-100'
              }`}
            >
              {tab === 'general' ? 'إعدادات عامة' : tab === 'achievements' ? 'الإنجازات' : 'الهوايات'}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30 text-right">
          {activeTab === 'general' && (
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4 text-right">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">الاسم</label>
                  <input type="text" className="w-full p-3 rounded-xl border text-right" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">رابط الصورة الشخصية</label>
                  <input type="text" className="w-full p-3 rounded-xl border text-left" dir="ltr" value={formData.heroImage} onChange={e => setFormData({...formData, heroImage: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">نبذة عني</label>
                <textarea rows={4} className="w-full p-3 rounded-xl border text-right" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">نص الطموح المستقبلي</label>
                <textarea rows={3} className="w-full p-3 rounded-xl border text-right" value={formData.futureText} onChange={e => setFormData({...formData, futureText: e.target.value})} />
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6 text-right">
              {formData.achievements.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm relative group">
                  <button onClick={() => removeItem('achievements', idx)} className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <input placeholder="العنوان" className="p-2 border rounded-lg text-right" value={item.title} onChange={e => updateItem('achievements', idx, 'title', e.target.value)} />
                    <input placeholder="الأيقونة" className="p-2 border rounded-lg text-center" value={item.icon} onChange={e => updateItem('achievements', idx, 'icon', e.target.value)} />
                    <input placeholder="التصنيف" className="p-2 border rounded-lg text-right" value={item.tag} onChange={e => updateItem('achievements', idx, 'tag', e.target.value)} />
                  </div>
                  <textarea placeholder="الوصف" className="w-full p-2 border rounded-lg text-right" value={item.description} onChange={e => updateItem('achievements', idx, 'description', e.target.value)} />
                </div>
              ))}
              <button onClick={() => addItem('achievements')} className="w-full py-4 border-2 border-dashed border-emerald-300 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all">+ إضافة إنجاز جديد</button>
            </div>
          )}

          {activeTab === 'hobbies' && (
            <div className="space-y-6 text-right">
              {formData.hobbies.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm relative group">
                  <button onClick={() => removeItem('hobbies', idx)} className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <input placeholder="اسم الهواية" className="p-2 border rounded-lg text-right" value={item.name} onChange={e => updateItem('hobbies', idx, 'name', e.target.value)} />
                    <input placeholder="الأيقونة" className="p-2 border rounded-lg text-center" value={item.icon} onChange={e => updateItem('hobbies', idx, 'icon', e.target.value)} />
                    <input placeholder="رابط الصورة" className="p-2 border rounded-lg text-left" dir="ltr" value={item.imageUrl} onChange={e => updateItem('hobbies', idx, 'imageUrl', e.target.value)} />
                  </div>
                  <input placeholder="وصف قصير" className="w-full p-2 border rounded-lg mb-2 text-right" value={item.description} onChange={e => updateItem('hobbies', idx, 'description', e.target.value)} />
                  <textarea placeholder="الوصف التفصيلي" className="w-full p-2 border rounded-lg text-right" value={item.longDesc} onChange={e => updateItem('hobbies', idx, 'longDesc', e.target.value)} />
                </div>
              ))}
              <button onClick={() => addItem('hobbies')} className="w-full py-4 border-2 border-dashed border-emerald-300 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all">+ إضافة هواية جديدة</button>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t bg-white flex gap-4 shrink-0">
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "💾"}
            حفظ كافة التغييرات
          </button>
          <button onClick={onClose} className="px-8 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300">إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
