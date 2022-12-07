import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DisplayAllClosets from './components/DisplayAllClosets'
import ClosetDashboard from './components/ClosetDashboard';
import CreateCloset from './components/CreateCloset';
import DisplayLaundry from './components/DisplayLaundry';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayAllClosets />} />
          <Route path='/dashboard/:id' element={<ClosetDashboard />} />
          <Route path='/new' element={<CreateCloset />} />
          <Route path='/laundry/:id' element={<DisplayLaundry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
