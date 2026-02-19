
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

type Mode = 'tdee' | 'food';

const CalorieCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Mode>('tdee');
  
  // TDEE State
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.2);
  const [result, setResult] = useState<number | null>(null);

  // Food Search State
  const [foodQuery, setFoodQuery] = useState('');
  const [foodResult, setFoodResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const calculateCalories = () => {
    if (!weight || !height || !age) {
      alert("يرجى إكمال جميع الحقول");
      return;
    }
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    if (gender === 'male') bmr += 5;
    else bmr -= 161;
    setResult(Math.round(bmr * activity));
  };

  const searchFoodCalories = async () => {
    if (!foodQuery) return;
    setIsSearching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أعطني السعرات الحرارية التقريبية لـ "${foodQuery}". 
        أريد الإجابة بصيغة JSON فقط كالتالي: 
        {
          "food": "اسم الأكلة العام",
          "restaurant": "اسم المطعم الشهير المرتبط بالطلب (إن وجد، وإلا اكتب 'عام')",
          "dish": "اسم الوجبة المحددة كما تظهر في القائمة",
          "calories": "عدد السعرات",
          "serving": "حجم الحصة",
          "tip": "نصيحة صحية قصيرة ومحفزة من يوسف"
        }.
        يجب أن تكون النصوص باللغة العربية.`,
      });
      
      const text = response.text || '{}';
      const cleanJson = text.replace(/```json|```/g, '').trim();
      setFoodResult(JSON.parse(cleanJson));
    } catch (error) {
      console.error("Error searching food:", error);
      alert("حدث خطأ أثناء البحث، حاول مرة أخرى.");
    } finally {
      setIsSearching(false);
    }
  };

  const activityLevels = [
    { label: "خامل (قليل جداً من الحركة)", value: 1.2 },
    { label: "نشاط خفيف (تمارين 1-3 أيام/أسبوع)", value: 1.375 },
    { label: "نشاط متوسط (تمارين 3-5 أيام/أسبوع)", value: 1.55 },
    { label: "نشاط عالي (تمارين يومية)", value: 1.725 },
    { label: "نشاط فائق (تمارين شاقة مرتين يومياً)", value: 1.9 },
  ];

  return (
    <section id="calories" className="py-8">
      <div className="bg-white rounded-[3rem] p-6 md:p-12 shadow-2xl border-4 border-orange-50 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-3xl text-4xl mb-4 shadow-inner">🍎</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">الصحة والرشاقة مع يوسف</h2>
          <p className="text-slate-500 font-medium italic">"جسمك أمانة، فحافظ عليه باختياراتك الذكية"</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-2 rounded-[2rem] max-w-md mx-auto mb-12 relative z-10 shadow-inner">
          <button 
            onClick={() => setActiveTab('tdee')}
            className={`flex-1 py-4 rounded-[1.5rem] font-black transition-all ${activeTab === 'tdee' ? 'bg-white text-orange-600 shadow-md' : 'text-slate-400'}`}
          >
            حساب الاحتياج 🔥
          </button>
          <button 
            onClick={() => setActiveTab('food')}
            className={`flex-1 py-4 rounded-[1.5rem] font-black transition-all ${activeTab === 'food' ? 'bg-white text-orange-600 shadow-md' : 'text-slate-400'}`}
          >
            سعرات الوجبات 🍔
          </button>
        </div>

        {activeTab === 'tdee' ? (
          <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10 animate-in fade-in zoom-in-95 duration-500">
            {/* TDEE Inputs */}
            <div className="space-y-6 bg-slate-50/50 p-6 md:p-8 rounded-[2.5rem] border border-slate-100">
              <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-lg font-bold transition-all ${gender === 'male' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400'}`}>ذكر 👨</button>
                <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-lg font-bold transition-all ${gender === 'female' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400'}`}>أنثى 👩</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 mr-2">الوزن</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="كجم" className="w-full p-4 rounded-xl border-2 border-slate-100 text-center font-bold focus:border-orange-400 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 mr-2">الطول</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="سم" className="w-full p-4 rounded-xl border-2 border-slate-100 text-center font-bold focus:border-orange-400 outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 mr-2">العمر</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="سنة" className="w-full p-4 rounded-xl border-2 border-slate-100 text-center font-bold focus:border-orange-400 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 mr-2">مستوى النشاط</label>
                <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="w-full p-4 rounded-xl border-2 border-slate-100 text-right font-bold focus:border-orange-400 outline-none">
                  {activityLevels.map((l, i) => <option key={i} value={l.value}>{l.label}</option>)}
                </select>
              </div>
              <button onClick={calculateCalories} className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xl rounded-2xl shadow-lg transition-all active:scale-95">احسب سعراتي 🔥</button>
            </div>

            {/* TDEE Result */}
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              {result ? (
                <div className="text-center space-y-4 bg-orange-50 p-10 rounded-[3rem] w-full border border-orange-100 animate-in zoom-in">
                  <h3 className="text-xl font-bold text-orange-900">تحتاج يومياً إلى:</h3>
                  <div className="text-7xl font-black text-orange-600">{result}</div>
                  <p className="text-orange-800/60 font-bold uppercase tracking-widest">سعرة حرارية</p>
                  <div className="pt-4 text-sm text-orange-700 font-medium">
                    هذا هو المقدار الذي يحتاجه جسمك ليحافظ على وزنه الحالي مع نشاطك المختار.
                  </div>
                </div>
              ) : (
                <div className="text-center opacity-20"><span className="text-9xl">⚖️</span></div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Food Search UI */}
            <div className="relative group">
              <input 
                type="text" 
                value={foodQuery}
                onChange={(e) => setFoodQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchFoodCalories()}
                placeholder="ابحث عن أكلة أو وجبة من مطعم..."
                className="w-full p-6 pr-16 rounded-3xl border-4 border-slate-100 focus:border-orange-500 focus:outline-none text-2xl font-bold transition-all shadow-xl"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl">🔍</span>
              <button 
                onClick={searchFoodCalories}
                disabled={isSearching}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all disabled:opacity-50"
              >
                {isSearching ? 'يتم التحليل...' : 'اكتشف'}
              </button>
            </div>

            {/* Food Result Card - UPDATED */}
            {foodResult && (
              <div className="bg-white p-8 md:p-10 rounded-[3rem] border-2 border-orange-100 shadow-2xl animate-in slide-in-from-bottom-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-orange-500 text-white font-black rounded-bl-3xl shadow-md">
                  {foodResult.calories} سعرة
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center text-7xl shadow-inner shrink-0">
                    {foodResult.restaurant !== 'عام' ? '🏪' : '🍲'}
                  </div>
                  
                  <div className="flex-1 space-y-6 text-center md:text-right">
                    <div>
                      <h3 className="text-4xl font-black text-slate-900 mb-1">{foodResult.dish}</h3>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center">
                        <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full font-bold text-sm">
                          {foodResult.food}
                        </span>
                        {foodResult.restaurant !== 'عام' && (
                          <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full font-black text-sm flex items-center gap-2">
                            <span>📍 المطعم:</span>
                            <span>{foodResult.restaurant}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-slate-400 text-xs font-bold mb-1">حجم الحصة</div>
                        <div className="text-slate-800 font-black">{foodResult.serving}</div>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800">
                        <div className="text-emerald-600/50 text-xs font-bold mb-1">نصيحة يوسف الذكية 💡</div>
                        <div className="font-bold leading-tight">{foodResult.tip}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!foodResult && !isSearching && (
              <div className="text-center py-12 space-y-6">
                <div className="flex justify-center gap-6 text-6xl opacity-20">
                  <span className="animate-bounce" style={{ animationDelay: '0s' }}>🍔</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🍕</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🍗</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🥤</span>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-slate-300">ماذا أكلت اليوم؟</p>
                  <p className="text-slate-400">اكتب اسم الوجبة أو المطعم وسأخبرك بالتفاصيل!</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CalorieCalculator;
