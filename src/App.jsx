import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const { ipcRenderer } = require('electron');

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState('Unknown');

  useEffect(() => {
    ipcRenderer.on('deviceActivated', (event, dvcName) => {
      setDeviceName(dvcName);
      setIsConnected(true);
    });

    ipcRenderer.on('deviceDeactivated', () => {
      setIsConnected(false);
    });

    ipcRenderer.on('cardReceived', (event, rfid) => {
      // deviceNameField.textContent = rfid;
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
          <div>
            <input spellCheck="false" id="input-port" type="text" />
          </div>
        </div>
        <div className="container-body-button">
          <button type="button"><span>ON</span></button>
        </div>
        <div className="flexer">
          <span>Click to switch on</span>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
