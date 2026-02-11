
import React, { useState, useEffect } from 'react';
import { db } from '../firebase.ts';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

interface Comment {
  id: string;
  name: string;
  subject: string;
  text: string;
  date: string;
  createdAt: any;
}

const TeacherComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray: Comment[] = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(commentsArray);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching comments: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject || !formData.text) return;

    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "comments"), {
        name: formData.name,
        subject: formData.subject,
        text: formData.text,
        date: new Date().toLocaleDateString('ar-SA'),
        createdAt: serverTimestamp()
      });

      setFormData({ name: '', subject: '', text: '' });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding comment: ", error);
      setIsSubmitting(false);
      alert("حدث خطأ أثناء إرسال التعليق. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <section id="comments" className="scroll-mt-24 space-y-16">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">كلمات المعلمين</h2>
        <p className="text-slate-500 text-lg">آراء المعلمين والمدربين في مسيرة يوسف المتميزة (محفوظة في قاعدة البيانات)</p>
        <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full mt-4"></div>
      </div>

      {/* Add Comment Form */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-emerald-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">📝</span>
            إضافة تعليق جديد
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 mr-2">اسم المعلم</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="أ. خالد العلي"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 mr-2">التخصص / المادة</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="العلوم، الاجتماعيات..."
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 mr-2">التعليق</label>
              <textarea 
                required
                rows={4}
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                placeholder="اكتب تعليقك هنا..."
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري الحفظ في فاير ستور...
                </>
              ) : (
                'إرسال التعليق'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">جاري تحميل التعليقات من قاعدة البيانات...</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div 
              key={comment.id}
              className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-50 relative flex flex-col justify-between hover:shadow-xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="absolute top-0 left-8 transform -translate-y-1/2">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  "
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-slate-700 text-lg leading-relaxed italic mb-8">
                  {comment.text}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl">
                  {comment.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{comment.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 text-sm font-medium">{comment.subject}</span>
                    <span className="text-slate-300 text-xs">•</span>
                    <span className="text-slate-400 text-xs">{comment.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 opacity-50">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-xl">لا توجد تعليقات حتى الآن. كن أول من يكتب ليوسف!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherComments;
