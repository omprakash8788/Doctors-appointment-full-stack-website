import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
const App = () => {
  const {aToken}=useContext(AdminContext)
  console.log(aToken)
  const {dToken}=useContext(DoctorContext)

  return aToken || dToken ?  (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/> 
          {/*        <Route path='/' element={<></>}/>  - We will not display any UI if the doctor and admin is login*/}
          <Route path='/admin-dashboard' element={<Dashboard/>}/> 
          <Route path='/all-appointment' element={<AllAppointment/>}/> 
          <Route path='/add-doctor' element={<AddDoctor/>}/> 
          <Route path='/doctor-list' element={<DoctorsList/>}/> 
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}
export default App