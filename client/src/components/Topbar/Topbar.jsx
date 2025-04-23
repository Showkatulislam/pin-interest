import { useNavigate } from 'react-router'
import Image from '../Image/Image'
import UserButton from '../UserButton/UserButton'
import './topbar.css'
const Topbar = () => {
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    navigate(`/search?search=${e.target[0].value}`)
    e.target[0].value=''
  }
  return (
    <div className='topbar'>
      <form onSubmit={handleSubmit} className='search-form'>
        <Image path="/general/search.svg" alt="search" />
        <input type="text" placeholder='Search...' className='search' />
      </form>
      <UserButton/>
    </div>
  )
}

export default Topbar