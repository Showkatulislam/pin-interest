import { useQuery } from '@tanstack/react-query'
import Comment from './Comment'
import CommentForm from './CommentForm'
import './comments.css'
import apiRequest from '../../utils/apiRequest'
const Comments = ({id}) => {
  const {data,isPending,error}=useQuery({
    queryKey:["comments",id],
    queryFn:()=>apiRequest.get(`/comments/${id}`).then(res=>res.data)
  })
  if(isPending) return <div>Loading...</div>
  if(error) return <div>{error.message}</div>
  console.log(data)
  return (
    <div className='comments'>
        <div className="commentList">
          <span>{data.length} comment</span>
          {
            data?.map((comment)=>(
              <Comment key={comment._id} comment={comment} />
            ))
          }
        </div>
        <CommentForm id={id}/>
    </div>
  )
}

export default Comments