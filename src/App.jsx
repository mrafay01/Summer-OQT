import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/Shared/loginsignup.jsx';
import Dashboard from './Components/Shared/dashboard.jsx';
import TeacherExtraSignup from './Components/TeacherComponents/TeacherExtraSignup.jsx';
import SetStudentSchedule from './Components/Student Components/SetStudentSchedule.jsx';
import AllCourses from './Components/Shared/AllCourses.jsx';
import FilteredTeachers from './Components/Student Components/FilteredTeachers.jsx';
import TeacherCourses from './Components/TeacherComponents/TeacherCourses.jsx';
import TeacherStudents from './Components/TeacherComponents/TeacherStudents.jsx';
import TeacherSchedule from './Components/TeacherComponents/TeacherSchedule.jsx';
import StudentSchedule from './Components/Student Components/StudentSchedule.jsx';
import HadithBooks from './Components/Shared/HadithBooks.jsx';
import ViewLessons from './Components/Shared/ViewLessons.jsx';
import QuranText from './Components/Shared/QuranText.jsx';
import AttachChild from './Components/Parent Components/AttachChild.jsx';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/:role/:username/dashboard" element={<Dashboard />} />
        <Route path="/teacherextrasignup" element={<TeacherExtraSignup />} />
        <Route path="/set-student-schedule" element={<SetStudentSchedule />} />
        <Route path="/Student/schedule" element={<StudentSchedule />} />
        <Route path='/Student-courses' element={<AllCourses />} />
        <Route path='/Teacher-courses' element={<TeacherCourses/>} />
        <Route path='/browse-teachers' element={<FilteredTeachers />} />
        <Route path='/Teacher/students' element={<TeacherStudents />} />
        <Route path='/Teacher/schedule' element={<TeacherSchedule />} />
        <Route path='/hadith-books' element={<HadithBooks />} />
        <Route path='/view-lessons' element={<ViewLessons />} />
        <Route path='/view-quran-lesson-text' element={<QuranText />} />
        <Route path='/my-kids' element={<AttachChild />} />        
      </Routes>
    </Router>
  )
}

export default App
