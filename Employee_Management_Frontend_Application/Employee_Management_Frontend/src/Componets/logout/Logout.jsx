import {  useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Logout() {
  const navigate=useNavigate()
  sessionStorage.clear()
  navigate("/home")
  return (
    <div>
    <ToastContainer></ToastContainer>
    </div>
  )
}

export default Logout
