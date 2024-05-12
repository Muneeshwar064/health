import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './component/auth/login/loginPage';
import Dashboard from './component/pages/admin/dashboard';
import Patient_client from './component/pages/patient/patient_client';
import Hospital from './component/pages/hospital/hospital';


function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  sessionStorage.getItem("isLoggedIn");
  const logoff =()=>{
    setLoggedIn(false);
    window.location.reload();
    sessionStorage.clear();
    
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={<LoginPage loggedIn={() => setLoggedIn(true)} />}
        />
        {/* <Route path='/card' element={<HospiatlCard />} /> */}
        <Route path='/Hospital' element={sessionStorage.getItem("isLoggedIn") === "true" ? <Hospital loggedOFF={logoff} /> : <Navigate to="/login" />} />
        <Route path='/Dashboard' element={sessionStorage.getItem("isLoggedIn") === "true" ? <Dashboard loggedOFF={logoff}  /> : <Navigate to="/login" />} />
        <Route path='/Patient' element={sessionStorage.getItem("isLoggedIn") === "true" ? <Patient_client loggedOFF={logoff}  /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </>
  );
}

export default App;
