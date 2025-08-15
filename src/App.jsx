import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/Shared/loginsignup.jsx';
import Dashboard from './Components/Shared/dashboard.jsx';
import TeacherExtraSignup from './Components/TeacherComponents/TeacherExtraSignup.jsx';
import StudentSchedule from './Components/Student Components/StudentSchedule.jsx';
import AllCourses from './Components/Shared/AllCourses.jsx';
import FilteredTeachers from './Components/Student Components/FilteredTeachers.jsx';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/:role/:username/dashboard" element={<Dashboard />} />
        <Route path="/teacherextrasignup" element={<TeacherExtraSignup />} />
        <Route path="/student-schedule" element={<StudentSchedule />} />
        <Route path='/:role/courses' element={<AllCourses />} />
        <Route path='/browse-teachers' element={<FilteredTeachers />} />
      </Routes>
    </Router>
  )
}

export default App
