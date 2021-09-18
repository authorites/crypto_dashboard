
import './App.css';
import CandlestickChart from './candlestickChart.js';
import DropDown from './DropDown'

function App() {

  return (
    <div className="App">
      <DropDown />
      <h3>BNB/BUSD 1H</h3>
      <CandlestickChart />
    </div>
  );
}

export default App;
