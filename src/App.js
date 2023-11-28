import './App.css';
import EmployeState from './context/employee';
import EmployeList from './components/EmployeeList';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter

import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <EmployeState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </EmployeState>
  );
}

export default App;
