import logo from './logo.svg';
import './App.css';
import { DigitalWatch } from 'react-digital-watch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Digital Watch</h1>
        <h4>(Only Time)</h4>
        <div style={{ border: "1px solid yellow" }}>
          <DigitalWatch showDate={false} bengaliDate={false} />
        </div>

        <h4>(Time and Date)</h4>
        <div style={{ border: "1px solid yellow" }}>
          <DigitalWatch showDate={true} bengaliDate={false} />
        </div>
        <h4>(Time and Bangla Date)</h4>
        <div style={{ border: "1px solid yellow" }}>
          <DigitalWatch showDate={true} bengaliDate={true} />
        </div>

      </header>
    </div>
  );
}

export default App;
