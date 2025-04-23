import { Link } from 'react-router'
import './leftbar.css'
import Image from '../Image/Image'
const Leftbar = () => {
  return (
    <div className='leftbar'>
        <div className="menuIcons">
            <Link to="/" className="menuIcon">
                <Image path="/general/logo.png" alt="home" className="logo"  />
            </Link>
            <Link to="/" className="menuIcon">
                <Image path="/general/home.svg" alt="home" />
            </Link>
            <Link to="/create" className="menuIcon">
                <Image path="/general/create.svg" alt="create" />
            </Link>
            <Link to="/" className="menuIcon">
          <Image path="/general/updates.svg" alt="updates" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/messages.svg" alt="messages" />
        </Link>
        </div>
        <Link to="/settings" className="menuIcon">
          <Image path="/general/settings.svg" alt="settings" />
        </Link>
    </div>
  )
}

export default Leftbar