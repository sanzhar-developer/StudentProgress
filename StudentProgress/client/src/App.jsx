import './App.css'
import { Routes, Route } from 'react-router-dom'

import StudentPage from './pages/StudentPage'
import NotFound from './pages/NotFound'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'




function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path='/student' element={<StudentPage />} />
      
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      {/* <Route path='/dashboard' element={<Dashboard />}> /dashboard
        <Route path='profile' element={<Profile />} /> /dashboard/profile
      </Route> */}
    </Routes>
  )
}

export default App
