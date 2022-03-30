import React from 'react';
import { MainPage } from './components/pages/main-page';
import { AdminPanel } from './components/pages/admin-panel';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App () {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/administrator' element={<AdminPanel/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
