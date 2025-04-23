import { Link } from 'react-router'
import './board.css'
import Image from '../Image/Image'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/ApiRequest'
import { format } from "timeago.js";
const Boards = ({userId}) => {
  const { data, isPending, error } = useQuery({
    queryKey:["boards",userId],
    queryFn:()=>apiRequest.get(`/boards/${userId}`).then((res)=>res.data)
  })
  console.log(data)
  return (
    <div className='boards'>
      {
        data?.map(board=>(
          <Link
          key={board._id}
          to={`/search?boardId=${board._id}`}
          className='board'>
            <Image src={board.firstPin.media}/>
            <div className="boardinfo">
              <h1>{board.title}</h1>
              <span>
              {board.pinCount} Pins · {format(board.createdAt)}
              </span>
            </div>
        </Link>
        ))
      }
    </div>
  )
}

export default Boards