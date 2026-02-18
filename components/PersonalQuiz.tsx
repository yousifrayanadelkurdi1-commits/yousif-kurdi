
import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  icon: string;
}

const PersonalQuiz: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      question: "ما هو اسم بطل هذا الملف؟",
      options: ["أحمد", "يوسف", "فيصل", "خالد"],
      correctAnswer: "يوسف",
      icon: "👤"
    },
    {
      id: 2,
      question: "كم عمر يوسف المبدع؟",
      options: ["11 سنة", "12 سنة", "13 سنة", "14 سنة"],
      correctAnswer: "13 سنة",
      icon: "🎂"
    },
    {
      id: 3,
      question: "ما هو النادي الذي يشجعه يوسف؟",
      options: ["الهلال", "النصر", "الأهلي", "الاتحاد"],
      correctAnswer: "الأهلي",
      icon: "⚽"
    },
    {
      id: 4,
      question: "ما هي الهواية التي يمارسها يوسف لبناء قوته؟",
      options: ["الركض", "السباحة", "كرة القدم", "التنس"],
      correctAnswer: "السباحة",
      icon: "💪"
    },
    {
      id: 5,
      question: "ما هو اللقب الذي فاز به يوسف في المدرسة؟",
      options: ["أفضل رسام", "أفضل لاعب", "أفضل شاعر", "أفضل مبرمج"],
      correctAnswer: "أفضل شاعر",
      icon: "✍️"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-emerald-100 overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white text-center">
          <h2 className="text-4xl font-black mb-2 tracking-widest">تحدي 🧠</h2>
          <p className="text-emerald-100 opacity-90">هل قرأت الملف جيداً؟ اختبر معلوماتك الآن!</p>
        </div>

        <div className="p-8 md:p-12">
          {!showResult ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                <span>السؤال {currentQuestion + 1} من {questions.length}</span>
                <span className="text-emerald-600">النقاط: {score}</span>
              </div>

              <div className="text-center space-y-4">
                <div className="text-6xl animate-bounce mb-4">
                  {questions[currentQuestion].icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, idx) => {
                  let buttonClass = "w-full py-4 px-6 text-lg font-bold rounded-2xl border-2 transition-all flex items-center justify-between ";
                  
                  if (selectedAnswer === option) {
                    buttonClass += isCorrect 
                      ? "bg-emerald-500 border-emerald-500 text-white scale-105 shadow-lg" 
                      : "bg-red-500 border-red-500 text-white scale-95 shadow-lg";
                  } else if (selectedAnswer !== null && option === questions[currentQuestion].correctAnswer) {
                    buttonClass += "bg-emerald-100 border-emerald-500 text-emerald-700";
                  } else {
                    buttonClass += "bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 active:scale-95";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={buttonClass}
                    >
                      <span>{option}</span>
                      {selectedAnswer === option && (
                        <span>{isCorrect ? "✅" : "❌"}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
              <div className="text-8xl">
                {score === questions.length ? "🏆" : score >= questions.length / 2 ? "🌟" : "😊"}
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-slate-800">انتهى التحدي!</h3>
                <p className="text-2xl text-slate-500 font-bold">
                  لقد حصلت على <span className="text-emerald-600">{score}</span> من أصل <span className="text-slate-800">{questions.length}</span>
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl text-slate-600 font-medium">
                {score === questions.length 
                  ? "مذهل! أنت تعرف يوسف حق المعرفة! أنت صديق رائع ✨"
                  : "أحسنت! يبدو أنك تعرف الكثير عن يوسف، تابع استكشاف الملف 🌟"}
              </div>
              <button 
                onClick={resetQuiz}
                className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95"
              >
                إعادة التحدي 🔄
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalQuiz;
