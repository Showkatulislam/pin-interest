import Image from '../Image/Image'
import './postInteractive.css'
const PostInteractive = () => {
  return (
    <div className='postInteractive'>
      <div className="interactiveIcons">
        <Image path="/general/react.svg" />
        <span>21</span>
        <Image path="/general/share.svg" />
        <Image path="/general/more.svg" />
      </div>
      <button>
        Save
      </button>
    </div>
  )
}

export default PostInteractive