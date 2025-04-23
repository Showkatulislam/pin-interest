import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Image from '../Image/Image'
import './userbutton.css'
import apiRequest from '../../utils/ApiRequest'
import useAuthStore from '../../utils/authStore'
const UserButton = () => {
  const [open, setOpen] = useState(false)
  const { removeCurrentUser, currentUser } = useAuthStore()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await apiRequest.post("/users/auth/logout")
    navigate("/auth")

    removeCurrentUser(null)
  }
  console.log(currentUser)
  return (
    <div className='userButton'>
      <Image path="/general/noAvatar.png" alt="noAvatar" />
      {
        currentUser ? (<div onClick={() => setOpen((pre) => !pre)} className='userName'>
          <Image path="/general/arrow.svg" alt="arrowDown" className="arrow" />
        </div>) : (
          <Link to="/auth" className='userName'>
            Login/Register
          </Link>
        )
      }
      {
        open && (
          <div className='userOptions'>
            <Link to={`/${currentUser.username}`} className='userOption'>Profile</Link>
            <Link to="/settings" className='userOption'>Settings</Link>
            <div className='userOption' onClick={handleLogout}>
              logOut
            </div>
          </div>
        )
      }
    </div>
  )
}

export default UserButton