import {Link, useParams} from "react-router"
import Image from '../../components/Image/Image'
import PostInteractive from '../../components/postInteractive/PostInteractive'
import './postPage.css'
import Comments from "../../components/Comment/Comments"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "../../utils/apiRequest"
const fetchPin=async(id)=>{
  const data=await apiRequest.get(`/pins/${id}`)
  return data.data
}
const PostPage = () => {
  const {id}=useParams()
  const {data,isPending,error}=useQuery({
     queryKey:["pin",id
     ],
     queryFn:()=>fetchPin(id)
  })
  console.log(data,isPending,error)
  if(isPending) return <div>Loading...</div>
  if(error) return <div className="error">Error</div>
  return (
    <div className='postPage'>
       <svg
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
        onClick={()=>{window.history.back()}}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
      <div className="postContainer">
        <div className="postImg">
          <Image src={data?.media} w={data.height} h={data.width}  alt="pin1"/>
        </div>
        <div className="postDetails">
          <PostInteractive/>
          <Link to={`/${data.user.username}`} className="postUser">
            <Image src={data?.user?.img || '/general/noAvatar.png'}/>
            <span>{data?.user?.displayName}</span>
          </Link>
          <Comments id={data._id}/>
        </div>
      </div>
    </div>
  )
}

export default PostPage