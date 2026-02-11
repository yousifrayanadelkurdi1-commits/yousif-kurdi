
import React, { useState, useEffect } from 'react';
import { Hobby } from '../types';

const Hobbies: React.FC = () => {
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);

  const hobbies: Hobby[] = [
    { 
      name: "السباحة", 
      icon: "🏊‍♂️", 
      description: "أحب السباحة لأنها تبني القوة والثقة بالنفس.", 
      longDesc: "السباحة هي ملاذي الآمن ومكاني المفضل لتجديد الطاقة. بدأت تعلمها منذ أن كنت صغيراً، وأصبحت الآن أجيد عدة أنواع من السباحة. تساعدني هذه الرياضة على التركيز وتمنحني نفساً طويلاً يساعدني أيضاً في هواية الغناء.",
      imageUrl: "https://images.unsplash.com/photo-1530549387634-e7a015056a9f?q=80&w=800&auto=format&fit=crop",
      color: "bg-teal-500" 
    },
    { 
      name: "الغناء", 
      icon: "🎤", 
      description: "التعبير عن مشاعري من خلال الألحان الجميلة.", 
      longDesc: "الغناء بالنسبة لي هو لغة القلب. أحب أداء الأناشيد التي تحمل رسائل إيجابية، وقد شاركت في العديد من حفلات المدرسة. ساعدني الغناء على تطوير مخارج الحروف لدي وزاد من شجاعتي في مواجهة الجمهور بكل ثقة.",
      imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
      color: "bg-emerald-500" 
    },
    { 
      name: "ألعاب الفيديو", 
      icon: "🎮", 
      description: "تنمية مهارات التفكير الاستراتيجي والسرعة.", 
      longDesc: "أقضي أوقات فراغي في استكشاف عوالم افتراضية مذهلة. ألعاب الفيديو ليست مجرد تسلية، بل هي وسيلة لتعلم حل المشكلات المعقدة والعمل ضمن فريق مع أصدقائي عبر الإنترنت. أحب الألعاب التي تتطلب ذكاءً وسرعة بديهة.",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
      color: "bg-cyan-500" 
    },
    { 
      name: "الأكل", 
      icon: "🍕", 
      description: "استكشاف النكهات وتجربة الأطباق اللذيذة.", 
      longDesc: "أنا متذوق للطعام بامتياز! أحب تجربة الأطباق من مختلف الثقافات، خاصة الأطباق الشعبية التي تحكي قصص الشعوب. أهتم دائماً بمعرفة المكونات الصحية التي تمدني بالطاقة اللازمة لممارسة رياضتي المفضلة ودراستي.",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
      color: "bg-lime-500" 
    },
  ];

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedHobby(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="hobbies" className="scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">هواياتي واهتماماتي</h2>
        <p className="text-slate-500 text-lg">اضغط على أي هواية لاستكشاف المزيد من التفاصيل</p>
        <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full mt-4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {hobbies.map((hobby, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedHobby(hobby)}
            className="group flex flex-col items-center p-8 bg-white rounded-3xl shadow-lg border border-slate-100 transition-all hover:scale-105 hover:shadow-2xl text-right w-full appearance-none"
            aria-label={`معرفة المزيد عن ${hobby.name}`}
          >
            <div className={`w-24 h-24 ${hobby.color} rounded-2xl flex items-center justify-center text-5xl text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
              {hobby.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{hobby.name}</h3>
            <p className="text-slate-500 text-center text-base leading-relaxed">
              {hobby.description}
            </p>
            <div className="mt-6 text-emerald-600 font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>اقرأ القصة</span>
              <span>✨</span>
            </div>
          </button>
        ))}
      </div>

      {/* Hobby Detail Modal */}
      {selectedHobby && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedHobby(null)}
        >
          <div 
            className="bg-white rounded-[2.5rem] overflow-hidden max-w-2xl w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                src={selectedHobby.imageUrl} 
                alt={selectedHobby.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <button 
                onClick={() => setSelectedHobby(null)}
                className="absolute top-6 left-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="إغلاق"
              >
                ✕
              </button>
              <div className="absolute bottom-6 right-8 flex items-end gap-4">
                <div className={`w-16 h-16 ${selectedHobby.color} rounded-xl flex items-center justify-center text-3xl text-white shadow-xl`}>
                  {selectedHobby.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{selectedHobby.name}</h3>
              </div>
            </div>
            
            <div className="p-8 md:p-10 space-y-6">
              <div className="space-y-4">
                <h4 className="text-emerald-600 font-bold text-lg">لماذا أحب هذه الهواية؟</h4>
                <p className="text-slate-700 text-xl leading-relaxed">
                  {selectedHobby.longDesc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-emerald-50 rounded-full text-emerald-600 text-sm font-medium">#يوسف_المبدع</span>
                <span className="px-4 py-2 bg-teal-50 rounded-full text-teal-600 text-sm font-medium">#شغف</span>
                <span className="px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-medium">#تطوير_الذات</span>
              </div>
              
              <button 
                onClick={() => setSelectedHobby(null)}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors shadow-lg"
              >
                فهمت، شكراً لك!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hobbies;
