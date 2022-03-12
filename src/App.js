import './App.css';
import MainMenu from './components/MainMenu';
import Switches from './utils/Switches';

function App() {
  return (
    <div className="App">
      <div>
        <MainMenu></MainMenu>
      </div>
      <Switches />
    </div>
  );
}

export default App;
