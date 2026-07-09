import './App.css';
import { Calculator as CalculatorIcon } from 'lucide-react';
import Calculator from './main/Calculator';

function App() {
  return (
    <div className="App">
      <div className="app-shell">
        <div className="app-title">
          <CalculatorIcon size={24} color="#2563eb" />
          <span>Calculadora</span>
        </div>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
