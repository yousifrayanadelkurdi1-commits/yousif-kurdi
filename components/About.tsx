
import React from 'react';

interface AboutProps {
  bio: string;
}

const About: React.FC<AboutProps> = ({ bio }) => {
  return (
    <section className="scroll-mt-20">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-emerald-900 border-r-4 border-emerald-600 pr-4">من أنا؟</h2>
            <p className="text-xl leading-relaxed text-slate-700">
              {bio}
            </p>
            <div className="p-4 bg-rose-50 rounded-xl border-r-4 border-rose-500 text-rose-800 italic">
              "لا للتنمر.. نعم للاحترام والتعاون"
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-6 rounded-2xl text-center shadow-sm">
                   <div className="text-3xl mb-2">🤝</div>
                   <div className="font-bold text-emerald-900">تعاون</div>
                </div>
                <div className="bg-teal-50 p-6 rounded-2xl text-center shadow-sm">
                   <div className="text-3xl mb-2">🌟</div>
                   <div className="font-bold text-teal-900">طموح</div>
                </div>
                <div className="bg-cyan-50 p-6 rounded-2xl text-center shadow-sm">
                   <div className="text-3xl mb-2">💖</div>
                   <div className="font-bold text-cyan-900">احترام</div>
                </div>
                <div className="bg-lime-50 p-6 rounded-2xl text-center shadow-sm">
                   <div className="text-3xl mb-2">📚</div>
                   <div className="font-bold text-lime-900">اجتهاد</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
