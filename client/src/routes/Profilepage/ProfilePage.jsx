import { useState } from "react"
import Image from "../../components/Image/Image"
import './profilePage.css'
import Gallery from "../../components/gallery/Gallery"
import Boards from "../../components/boards/Boards"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "../../utils/ApiRequest"
import FollowButton from "./FollowButton"
const ProfilePage = () => {
  const { username } = useParams()
  const [type, setType] = useState("created")
  const { data, isPending, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data)
  })
  if (isPending) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error</div>
 
  return (

    <div className='profilePage'>
      <Image  src={data?.img|| "/general/noAvatar.png"} alt="NoAvatar" className="avatar" />
      <h1 className="profileName">{data?.displayName}</h1>
      <span className="profileUsername">@{data?.username}</span>
      <div className="followCounts">
        {data.followerCount} followers · {data.followingCount} followings
      </div>
      <div className="postInteractive">
        <Image path={"/general/share.svg"} alt={"upload"} />
        <div className="interactiveBtn">
          <button>Message</button>
          <FollowButton username={username} isFollowing={data.isFollowing}/>
        </div>
        <Image path={"/general/more.svg"} alt={"more"} />
      </div>
      <div className="profileOptions">
        <span className={type === "created" ? "active" : ""} onClick={() => setType("created")}>Created</span>
        <span className={type === "saved" ? "active" : ""} onClick={() => setType("saved")}>Saved</span>
      </div>
      {
        type === "created" ? (
          <Gallery userId={data?._id} />
        ) : <Boards userId={data?._id} />
      }
    </div>
  )
}

export default ProfilePage