
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const PoetryCorner: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePoem = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أنت شاعر ملهم تساعد الطالب يوسف، الملقب بأفضل شاعر في المدرسة، على كتابة بيتين من الشعر الجميل والملهم حول موضوع: ${topic}. اجعل الأبيات مناسبة لعمره كطالب متميز يحب النجاح.`,
      });
      setPoem(response.text || '');
    } catch (error) {
      console.error("Error generating poem:", error);
      setPoem("حدث خطأ ما، حاول مرة أخرى لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">ركن الشاعر يوسف ✍️</h2>
          <p className="text-emerald-200">بما أنني "أفضل شاعر"، دعنا نكتب بعض الأبيات معاً!</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="اكتب موضوعاً (مثلاً: النجاح، الأم، الوطن...)"
            className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-slate-400 text-white"
          />
          <button 
            onClick={generatePoem}
            disabled={loading}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-colors disabled:opacity-50"
          >
            {loading ? 'جاري الإلهام...' : 'ألهمني بالأبيات'}
          </button>
        </div>

        {poem && (
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-fade-in">
            <pre className="whitespace-pre-wrap font-serif text-xl md:text-2xl italic leading-loose text-emerald-100">
              {poem}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};

export default PoetryCorner;
