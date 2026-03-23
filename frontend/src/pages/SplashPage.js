import React, { useEffect, useState } from 'react';

const SplashPage = ({ setPage }) => {
  const [loadingText, setLoadingText] = useState('Initializing Systems');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev.endsWith('...')) return 'Initializing Systems';
        return prev + '.';
      });
    }, 400);

    const timeout = setTimeout(() => {
      // Added a safety check to ensure setPage exists before calling it.
      // This prevents the app from crashing if the SplashPage is previewed 
      // independently without the App component passing the setPage prop.
      if (typeof setPage === 'function') {
        setPage('home');
      } else {
        console.log("Loading complete. (setPage prop not provided)");
      }
    }, 3500); // 3.5 seconds

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timeout);
    };
  }, [setPage]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: '#050505', // Deep solid black for contrast
      zIndex: 9999,
      position: 'relative'
    }}>
      <style>{`
        .splash-title {
          font-size: 4.5rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff, var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 8px;
          animation: glow 2s ease-in-out infinite alternate;
        }

        .splash-text {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 3px;
          font-family: 'Courier New', Courier, monospace;
          text-transform: uppercase;
        }

        @keyframes glow {
          from { filter: drop-shadow(0 0 10px rgba(255,215,0,0.2)); }
          to { filter: drop-shadow(0 0 30px rgba(255,215,0,0.6)); }
        }

        .loader-line {
          width: 200px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          margin-top: 30px;
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }

        .loader-line::after {
          content: '';
          position: absolute;
          left: -50%;
          height: 100%;
          width: 50%;
          background: var(--gold);
          animation: slide 1.5s ease-in-out infinite;
          box-shadow: 0 0 10px var(--gold);
        }

        @keyframes slide {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `}</style>

      <h1 className="splash-title">ROHAN</h1>
      <h1 className="splash-title" style={{ fontSize: '3rem', marginTop: '-30px' }}>COSMO</h1>
      
      <div className="loader-line"></div>
      <p className="splash-text" style={{ marginTop: '20px' }}>{loadingText}</p>
    </div>
  );
};

export default SplashPage;