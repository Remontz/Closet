import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DisplayAllClosets from './components/DisplayAllClosets'
import ClosetDashboard from './components/ClosetDashboard';
import CreateCloset from './components/CreateCloset';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayAllClosets />} />
          <Route path='/dashboard/:id' element={<ClosetDashboard />} />
          <Route path='/new' element={<CreateCloset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
