import { Route, Routes } from 'react-router-dom';
import './App.css';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';

import CrmDashboard from './pages/CrmDashboard';
import TechnicalDashboard from './pages/TechnicalDashboard';
import MasterDashboard from './pages/MasterDashboard';

function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <Routes>
          <Route path="/ihb/crm_dashboard" element={<CrmDashboard />} />
          <Route path="/ihb/technical_dashboard" element={<TechnicalDashboard />} />
          <Route path="/ihb/master/master_dashboard" element={<MasterDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
