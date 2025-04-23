import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import './commentForm.css'
import apiRequest from '../../utils/apiRequest';
const addComment=async(comment)=>{
  const res=await apiRequest.post("/comments",comment)
  console.log(res.data)
  return res.data
}
const CommentForm = ({id}) => {
  const [open, setOpen] = useState(false)
  const [desc,setDesc]=useState('')
  const haldleClickEmoji = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  }
  const queryClient = useQueryClient()
  const mutation=useMutation({
    mutationKey: ['addComment'],
    mutationFn: addComment,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ['comments',id]})
    }
  })
  const handleSubmit =async (e) => {
    e.preventDefault()
    mutation.mutate({
      description: desc,
      pin: id
    })
    setDesc('')
  } 
  return (
    <form onSubmit={handleSubmit} className='commentForm'>
      <input 
      type="text" 
      value={desc} 
      placeholder='Add Comment'
      onChange={(e) => setDesc(e.target.value)}
       />
      <div className="emoji">
        <div onClick={() => setOpen(pre => !pre)}>😊</div>
        {
          open &&
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={haldleClickEmoji} />

          </div>
        }
      </div>
    </form>
  )
}

export default CommentForm