import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const { ipcRenderer } = require('electron');

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState('Unknown');
  const [cardReceived, setCardReceived] = useState(null);

  useEffect(() => {
    ipcRenderer.on('deviceActivated', (_, dvcName) => {
      setDeviceName(dvcName);
      setIsConnected(true);
    });

    ipcRenderer.on('deviceDeactivated', () => {
      setIsConnected(false);
    });

    ipcRenderer.on('cardReceived', (_, rfid) => {
      if (!isConnected) setIsConnected(true);
      setCardReceived(rfid);
      setTimeout(() => {
        setCardReceived(null);
      }, 1000);
    });

    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  return (
    <div className="container">
      <div className="container-status" style={{
        'background-color': isConnected ? '#1DB866' : '#FF0030',
      }}>
        <span>{isConnected ? 'Connection established' : 'Disconnected'}</span>
      </div>
      <div className="container-header-title">
        <span>IUT NFC Reader</span>
      </div>
      <div className="container-body-form">
        <div className="container-body-list-item">
          <div>Device name: </div>
          <div>{deviceName.slice(0, 26)}</div>
        </div>
        <div className="container-body-list-item">
          <div>Port number: </div>
          <div>3002</div>
        </div>
        <div className="container-body-button">
          <button type="button" style={cardReceived && {
            'background-color': '#12AA36',
            boxShadow: '1px 1px 50px #37FF4B',
            'border-color': '#29FF54',
          }}><span>{cardReceived && 'RFID'}</span></button>
        </div>
        <div className="flexer">
          <span>{cardReceived || 'Indicator'}</span>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
