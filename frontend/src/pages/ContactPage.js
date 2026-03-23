import React from 'react';

const ContactPage = () => {
  return (
    <main className="container">
      <style>{`
        .resource-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .resource-header h2 {
          font-size: 2.5rem;
          margin: 0 0 10px 0;
          background: linear-gradient(135deg, #fff, var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .resource-header p {
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
        }

        .db-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 50px;
        }

        .db-card {
          background: rgba(15, 17, 26, 0.7);
          padding: 25px 30px; 
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .db-card:hover {
          transform: scale(1.02);
          border-color: rgba(255, 215, 0, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }

        .db-info {
          display: flex;
          flex-direction: column;
        }

        .db-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: white;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .db-desc {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          margin: 0;
        }

        .db-link {
          background: rgba(255,215,0,0.1);
          color: var(--gold);
          border: 1px solid var(--gold);
          padding: 10px 20px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: bold;
          font-size: 0.9rem;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .db-link:hover {
          background: var(--gold);
          color: black;
          box-shadow: 0 0 15px rgba(255,215,0,0.4);
        }

        /* Map specific styles */
        .map-card {
          padding: 15px; /* Less padding to let the map shine */
          flex-direction: column;
          align-items: stretch;
          cursor: default;
        }
        
        .map-card:hover {
          transform: none; /* Disable hover scale for map container */
        }

        .embed-map-container {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #000;
        }

        .embed-map-frame {
          width: 100% !important;
          height: 100% !important;
          filter: invert(90%) hue-rotate(180deg); /* Optional: Gives the map a dark mode theme! */
          transition: filter 0.3s;
        }

        .embed-map-frame:hover {
          filter: none; /* Show true colors on hover */
        }

        @media (max-width: 600px) {
          .db-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .db-link {
            width: 100%;
            text-align: center;
            box-sizing: border-box;
          }
          .embed-map-container {
            height: 300px; /* Slightly shorter on mobile */
          }
        }
      `}</style>

      <div className="resource-header">
        <h2>Cosmic Resources</h2>
        <p>Access our curated external databases for real-time telemetry and research.</p>
      </div>

      <div className="db-grid">
        <div className="db-card">
          <div className="db-info">
            <span className="db-title">🚀 NASA.gov</span>
            <p className="db-desc">The official gateway to U.S. space exploration and aeronautics research.</p>
          </div>
          <a href="#blank" className="db-link">Access Node</a>
        </div>

        <div className="db-card">
          <div className="db-info">
            <span className="db-title">🛰 ESA.int</span>
            <p className="db-desc">Europe's gateway to the stars, featuring distinct missions and satellite data.</p>
          </div>
          <a href="#blank" className="db-link">Access Node</a>
        </div>
      </div>

      {/* Observation Deck HQ / Map Section */}
      <div className="resource-header">
        <h2>Primary Observation Deck</h2>
        <p>Mauna Kea Observatories Headquarters</p>
      </div>

      <div className="db-card map-card">
        <div className="embed-map-container">
          <iframe 
            title="Observation Deck Location"
            className="embed-map-frame" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight="0" 
            marginWidth="0" 
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=19%C2%B049%2734.7%22N%20155%C2%B028%2722.8%22W&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          ></iframe>
          {/* Required link from the provided snippet, formatted for React inline styles */}
          <a 
            href="https://sprunkiretake.net" 
            style={{ 
              fontSize: '2px', 
              color: 'gray', 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              zIndex: 1, 
              maxHeight: '1px', 
              overflow: 'hidden' 
            }}
          >
            Sprunki
          </a>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;