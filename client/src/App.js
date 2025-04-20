import logo from './logo.svg';
import './App.css';
import RegistrationPage from './Components/Registration/RegistrationPage';
import LoginPage from './Components/Registration/LoginPage';
import {Router,Route,Routes} from 'react-router-dom'
import CandidatesDashboard from './Components/Candidates/CandidatesDashboard';
import Employees from './Components/Employees/Employee';
import Attendance from './Components/Attendance/Attendance';
import Leaves from './Components/Leaves/Leaves';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<RegistrationPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/candidates' element={<CandidatesDashboard/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/leaves' element={<Leaves/>}/>
        </Routes>
    </div>
  );
}

export default App;
