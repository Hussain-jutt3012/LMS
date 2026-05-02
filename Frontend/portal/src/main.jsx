import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router"
import Signup from './Component/Signup/Signup.jsx'
import Dashboard from './Component/Dashboard/Dashboard.jsx'
import Login from './Component/Login/Login.jsx'
import Teacher from "./Component/Teacher/MarksAttendance.jsx"
import EditAttendance from './Component/Teacher/EditAttendance.jsx'
import ResultMarks from './Component/Teacher/ResultMarks.jsx'
import EditMarks from './Component/Teacher/EditMarks.jsx'
import FetchAllStudent from './Component/Admin/fetchAllStudent.jsx'
import BlockStudent from './Component/Admin/blockStudent.jsx'
import Allstudent from './Component/Admin/Allstudent.jsx'
import DeleteStudent from './Component/Admin/DeleteStudent.jsx'
import GetAttendance from './Component/Student/GetAttendance.jsx'
import GetStudentResult from './Component/Student/GetStudentResult.jsx'
import GetStudent from './Component/Admin/GetStudent.jsx'
import StudentEnrollement from './Component/Admin/StudentEnrollement.jsx'
import GetStudentEnrolled from './Component/Student/GetStudentEnrolled.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/:userId/signup' element={<Signup />} />
      <Route path='/dash/:userId' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/:userId/attendance-mark' element={<Teacher />} />
      <Route path='/:teacherId/:studentId/edit-attendance' element={<EditAttendance />} />
      <Route path='/:userId/result-remarks' element={<ResultMarks />} />
      <Route path='/:teacherId/:studentId/update-attendance' element={<EditMarks />} />
      <Route path='/:userId/block-portal' element={<FetchAllStudent />} />
      <Route path='/:userId/:studentid/portal-block' element={<BlockStudent />} />
      <Route path='/:userId/find-student' element={<Allstudent />} />
      <Route path='/:userId/:studentId/delte-Student' element={<DeleteStudent />} />
      <Route path='/get-attendance-data' element={<GetAttendance />} />
      <Route path='/get-result' element={<GetStudentResult />} />
      <Route path='/:userId/get-studentData' element={<GetStudent />} />
      <Route path='/:userId/:studentId/get-enrolled-student' element={<StudentEnrollement />} />
      <Route path='/get-enrolled-data' element={<GetStudentEnrolled/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
