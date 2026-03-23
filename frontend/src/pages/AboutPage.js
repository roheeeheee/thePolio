import React, { useState } from 'react';

const AboutPage = () => {
  const [quiz, setQuiz] = useState({ started: false, current: 0, score: 0, done: false });
  const questions = [
    { q: "Which planet is known as the Red Planet?", a: ["Venus", "Mars", "Jupiter"], c: 1 },
    { q: "What is the closest star to Earth?", a: ["Proxima Centauri", "Sirius", "The Sun"], c: 2 },
    { q: "What galaxy is Earth located in?", a: ["Andromeda", "Milky Way", "Sombrero"], c: 1 }
  ];

  const handleAnswer = (idx) => {
    const isCorrect = idx === questions[quiz.current].c;
    if (quiz.current + 1 < questions.length) {
      setQuiz({ ...quiz, current: quiz.current + 1, score: quiz.score + (isCorrect ? 1 : 0) });
    } else {
      setQuiz({ ...quiz, done: true, score: quiz.score + (isCorrect ? 1 : 0) });
    }
  };

  return (
    <main className="container">
      <style>{`
        .pro-card {
          background: rgba(15, 17, 26, 0.7);
          padding: 40px; 
          border-radius: 24px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          margin-bottom: 30px;
        }

        .pro-card h2, .pro-card h3 {
          margin-top: 0;
          background: linear-gradient(135deg, #fff, var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pro-card p {
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .quiz-container {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          padding: 25px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .quiz-btn-pro {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          padding: 15px 20px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          text-align: left;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .quiz-btn-pro:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: var(--gold);
          transform: translateX(5px);
        }

        .quiz-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        .action-btn {
          background: linear-gradient(135deg, var(--gold), #e6c200);
          color: #000;
          border: none;
          padding: 14px 30px;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 12px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 15px rgba(255, 215, 0, 0.2);
          display: inline-block;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(255, 215, 0, 0.3);
        }

        .progress-text {
          font-size: 0.85rem;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: bold;
          margin-bottom: 10px;
          display: block;
        }
      `}</style>

      <div className="pro-card">
        <h2>My Passion for the Stars</h2>
        <p>It started with an illustrated book in elementary school given by my mother. Looking up at the night sky, I realized how incredibly vast our universe is. Astronomy is a humbling reminder that no matter how much we discover, there is always something more to learn in the great unknown.</p>
      </div>

      <div className="pro-card">
        <h3>Mission Briefing: Trivia</h3>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>Test your knowledge of the cosmos before deployment.</p>
        
        <div className="quiz-container">
          {!quiz.started ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <button className="action-btn" onClick={() => setQuiz({ ...quiz, started: true })}>Initiate Assessment</button>
            </div>
          ) : quiz.done ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ fontSize: '1.8rem', color: 'var(--gold)', margin: '0 0 10px 0' }}>Simulation Complete!</h4>
              <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Final Score: <strong>{quiz.score} / {questions.length}</strong></p>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '25px' }}>
                Assigned Rank: <span style={{ color: 'white' }}>{quiz.score === questions.length ? 'Commander' : quiz.score > 0 ? 'Astronaut' : 'Stargazer'}</span>
              </p>
              <button className="action-btn" onClick={() => setQuiz({started: false, current: 0, score: 0, done: false})}>Restart Simulation</button>
            </div>
          ) : (
            <div>
              <span className="progress-text">Question {quiz.current + 1} of {questions.length}</span>
              <p style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0' }}>{questions[quiz.current].q}</p>
              <div className="quiz-grid">
                {questions[quiz.current].a.map((ans, i) => (
                  <button key={i} className="quiz-btn-pro" onClick={() => handleAnswer(i)}>
                    <span style={{ opacity: 0.5, marginRight: '15px' }}>{String.fromCharCode(65 + i)}</span> 
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AboutPage;