import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DisplayAllClosets from './components/DisplayAllClosets'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayAllClosets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
