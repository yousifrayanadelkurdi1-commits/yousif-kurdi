
import React from 'react';

const Future: React.FC = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-16 text-white text-center shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-4xl font-extrabold">طموحي ورؤيتي للمستقبل</h2>
          <p className="text-2xl max-w-2xl mx-auto leading-relaxed text-emerald-50 font-medium">
            "أتمنى أن أنتظم في الدراسة وأكمل تعليمي في المرحلة المتوسطة وأحقق النجاح بإذن الله."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
              <div className="text-3xl mb-2">🏫</div>
              <h4 className="font-bold mb-1">المرحلة المتوسطة</h4>
              <p className="text-sm opacity-80 text-emerald-100">خطوتي القادمة نحو المجد</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-bold mb-1">الاستمرار في التفوق</h4>
              <p className="text-sm opacity-80 text-emerald-100">المحافظة على معدل 100%</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
              <div className="text-3xl mb-2">🎖️</div>
              <h4 className="font-bold mb-1">خدمة المجتمع</h4>
              <p className="text-sm opacity-80 text-emerald-100">أن أكون فرداً نافعاً ومحترماً</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;
