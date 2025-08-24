import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/Shared/loginsignup.jsx';
import Dashboard from './Components/Shared/dashboard.jsx';
import TeacherExtraSignup from './Components/TeacherComponents/TeacherExtraSignup.jsx';
import SetStudentSchedule from './Components/Student Components/SetStudentSchedule.jsx';
import AllCourses from './Components/Shared/AllCourses.jsx';
import FilteredTeachers from './Components/Student Components/FilteredTeachers.jsx';
import TeacherCourses from './Components/TeacherComponents/TeacherCourses.jsx';
import TeacherStudents from './Components/TeacherComponents/TeacherStudents.jsx';
import TeacherStudentsbyCourse from './Components/TeacherComponents/TeacherStudentsbyCourse.jsx';
import TeacherSchedule from './Components/TeacherComponents/TeacherSchedule.jsx';
import StudentSchedule from './Components/Student Components/StudentSchedule.jsx';
import HadithBooks from './Components/Shared/HadithBooks.jsx';
import ViewQuranLessons from './Components/Shared/ViewQuranLessons.jsx';
import QuranText from './Components/Shared/QuranText.jsx';
import AttachChild from './Components/Parent Components/AttachChild.jsx';
import JoinSession from './Components/Student Components/JoinSession.jsx';
import ChildCourses from './Components/Parent Components/ChildCourses.jsx';
import ViewChild from './Components/Parent Components/ViewChild.jsx';
import ViewSession from './Components/Parent Components/ViewSession.jsx';
import StudentCourses from './Components/Student Components/StudentCourses.jsx';
import ViewHadithLessons from './Components/Shared/ViewHadithLessons.jsx';
import ViewHadiths from './Components/Shared/Hadiths.jsx';
import ViewHadithText from './Components/Shared/HadithText.jsx'
import ViewQuran from './Components/Shared/Quran.jsx'

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
        <Route path='/Teacher/students-by-course' element={<TeacherStudentsbyCourse />} />
        <Route path='/Teacher/schedule' element={<TeacherSchedule />} />
        <Route path='/hadith-books' element={<HadithBooks />} />
        <Route path='/view-quran-lessons' element={<ViewQuranLessons />} />
        <Route path='/view-hadith-lessons' element={<ViewHadithLessons />} />
        <Route path='/view-hadith-text' element={<ViewHadiths />} />
        <Route path='/view-hadith-lesson-text' element={<ViewHadithText />} />
        <Route path='/view-quran-lesson-text' element={<QuranText />} />
        <Route path='/view-quran-text' element={<ViewQuran />} />
        <Route path='/my-kids' element={<AttachChild />} />        
        <Route path='/join-session' element={<JoinSession />} />
        <Route path='/view-kids-courses' element={<ChildCourses />} />
        <Route path='/kids-schedule' element={<ViewChild />} />
        <Route path='/view-session' element={<ViewSession />} />
        <Route path='/view-courses-progress' element={<StudentCourses />} />
      </Routes>
    </Router>
  )
}

export default App
