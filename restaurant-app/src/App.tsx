import React from 'react';
import { MainPage } from './components/pages/main-page';
import { AdminPanel } from './components/pages/admin-panel';
import { BrowserRouter as Router, Routes, Route, useSearchParams} from 'react-router-dom';

function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const isAdminPage = searchParams.get('administrator') !== null;
  return (
    <div className="App">
      {isAdminPage ? <AdminPanel /> : <MainPage />}
    </div>
  );
}

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Page />}/>
      </Routes>
    </Router>
  );
}

export default App;
