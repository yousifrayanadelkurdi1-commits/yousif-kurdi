
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Hobbies from './components/Hobbies.tsx';
import Achievements from './components/Achievements.tsx';
import TeacherComments from './components/TeacherComments.tsx';
import Future from './components/Future.tsx';
import Footer from './components/Footer.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import { db } from './firebase.ts';
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "site", "content"), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        const initialData = {
          name: "يوسف",
          heroImage: "https://picsum.photos/seed/yousef/150/150",
          bio: "اسمي يوسف، وأنا طالب مجتهد وأسعى دائماً للنجاح والتطور. أكره التنمر لأنه يؤذي الآخرين وأؤمن بأهمية الاحترام والتعاون بين الجميع.",
          futureText: "أتمنى أن أنتظم في الدراسة وأكمل تعليمي في المرحلة المتوسطة وأحقق النجاح بإذن الله.",
          achievements: [
            { title: "لقب أفضل شاعر", description: "الفوز بلقب أفضل شاعر في مسابقة المدرسة السنوية بجدارة وإبداع.", icon: "✍️", tag: "مسابقة المدرسة", color: "bg-teal-100 text-teal-800 border-teal-200" },
            { title: "التفوق الدراسي المثالي", description: "الحصول على معدل 100% في الصف السادس الابتدائي، محققاً العلامة الكاملة.", icon: "⭐", tag: "الصف السادس", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }
          ],
          hobbies: [
            { name: "السباحة", icon: "🏊‍♂️", description: "أحب السباحة لأنها تبني القوة والثقة بالنفس.", longDesc: "السباحة هي ملاذي الآمن ومكاني المفضل لتجديد الطاقة...", imageUrl: "https://images.unsplash.com/photo-1530549387634-e7a015056a9f?q=80&w=800&auto=format&fit=crop", color: "bg-teal-500" },
            { name: "الغناء", icon: "🎤", description: "التعبير عن مشاعري من خلال الألحان الجميلة.", longDesc: "الغناء بالنسبة لي هو لغة القلب...", imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop", color: "bg-emerald-500" },
            { name: "ألعاب الفيديو", icon: "🎮", description: "الاستمتاع بعوالم خيالية وتطوير مهارات التفكير السريع.", longDesc: "أعشق ألعاب الفيديو لأنها تأخذني في مغامرات مثيرة وتساعدني على التفكير الاستراتيجي وحل المشكلات بطرق إبداعية.", imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop", color: "bg-indigo-500" },
            { name: "الأكل", icon: "🍔", description: "اكتشاف نكهات جديدة والاستمتاع بالأطباق اللذيذة.", longDesc: "الأكل بالنسبة لي ليس مجرد طاقة، بل هو تجربة لاكتشاف ثقافات العالم من خلال مطابخهم المتنوعة ونكهاتهم الفريدة.", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop", color: "bg-orange-500" }
          ]
        };
        setDoc(doc(db, "site", "content"), initialData);
        setData(initialData);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-emerald-700 font-bold">جاري تحميل ملف إنجاز يوسف...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* واجهة تسجيل الدخول المخصصة */}
      {showLogin && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-sm transform transition-all ${loginError ? 'animate-bounce' : ''}`}>
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">تسجيل دخول المسؤول 🔐</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input 
                  type="password"
                  autoFocus
                  placeholder="كلمة المرور"
                  className={`w-full px-5 py-4 rounded-2xl border ${loginError ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-center text-xl`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {loginError && <p className="text-red-500 text-center text-sm mt-2 font-bold">كلمة المرور غير صحيحة!</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
              >
                دخول
              </button>
              <button 
                type="button"
                onClick={() => { setShowLogin(false); setLoginError(false); setPassword(''); }}
                className="w-full py-2 text-slate-400 hover:text-slate-600 text-sm font-medium"
              >
                إلغاء
              </button>
            </form>
          </div>
        </div>
      )}

      {isAdmin && (
        <AdminDashboard 
          data={data} 
          onClose={() => setIsAdmin(false)} 
        />
      )}
      
      <Hero name={data.name} image={data.heroImage} />
      
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        <About bio={data.bio} />
        
        <Achievements items={data.achievements} />
        
        <Hobbies items={data.hobbies} />

        {/* تمت إزالة ركن الشاعر بناءً على طلب المستخدم */}

        <TeacherComments />
        
        <Future text={data.futureText} />
      </main>

      <Footer onAdminAuth={() => setShowLogin(true)} />
    </div>
  );
};

export default App;
