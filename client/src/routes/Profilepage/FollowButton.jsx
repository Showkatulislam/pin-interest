import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiRequest from "../../utils/ApiRequest"

const followUser=async(username)=>{
    const res=await apiRequest.post(`/users/follow/${username}`)
    return res.data
}
const FollowButton = ({username,isFollowing}) => {

    const queryClient = useQueryClient()

    const mutation=useMutation({
        mutationFn:followUser,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["profile",username]})
        },
        onError:(error)=>{
            console.log(error)
        }   
    })

  return (
    <button onClick={()=>mutation.mutate(username)} className='profileButtons' disabled={mutation.isPending}>
        {isFollowing ? "Unfollow" : "Follow"}
    </button>
  )
}

export default FollowButton