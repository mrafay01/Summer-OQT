import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/Shared/loginsignup.jsx';
import Dashboard from './Components/Shared/dashboard.jsx';
import TeacherExtraSignup from './Components/TeacherComponents/TeacherExtraSignup.jsx';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/:role/dashboard" element={<Dashboard />} />
        <Route path="/teacherextrasignup" element={<TeacherExtraSignup />} />
      </Routes>
    </Router>
  )
}

export default App
