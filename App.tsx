
import React from 'react';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Hobbies from './components/Hobbies.tsx';
import Achievements from './components/Achievements.tsx';
import TeacherComments from './components/TeacherComments.tsx';
import Future from './components/Future.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <Hero name="يوسف" />
      
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        <About 
          bio="اسمي يوسف، وأنا طالب مجتهد وأسعى دائماً للنجاح والتطور. أكره التنمر لأنه يؤذي الآخرين وأؤمن بأهمية الاحترام والتعاون بين الجميع."
        />
        
        <Achievements />
        
        <Hobbies />

        <TeacherComments />
        
        <Future />
      </main>

      <Footer />
    </div>
  );
};

export default App;
