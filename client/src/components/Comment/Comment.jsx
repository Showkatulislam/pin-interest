import Image from '../Image/Image'
import './comment.css'
import {format} from 'timeago.js'
const Comment = ({comment}) => {
  console.log(comment)
  return (
    <div className='comment'>
      <Image  src={comment?.user?.img || '/general/noAvatar.png'}/>
      <div className="commentContent">
        <span className='commentContentUserName'>{comment?.user?.displayName}</span>
        <p className='des'>
         {comment?.description}
        </p>
        <span>{format(comment.createdAt)}</span>
      </div>
    </div>
  )
}

export default Comment