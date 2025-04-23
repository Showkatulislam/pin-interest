import { useNavigate } from 'react-router'
import IKmage from '../../components/Image/Image'
import useAuthStore from '../../utils/authStore'
import './createPage.css'
import { useEffect, useRef, useState } from 'react'
import Editor from '../../components/Editor/Editor'
import useEditStore from '../../utils/EitorStore'
import apiRequest from '../../utils/ApiRequest'
const CreatePage = () => {
  const [file, setFile] = useState(null)
  const [isEditing, setEditing] = useState(false)
  const formRef=useRef()
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  })
  const { currentUser } = useAuthStore()
  const {textOptions,canvasOptions}=useEditStore()
  const navigate = useNavigate()
  console.log(file)

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);


  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);
  const handleSubmit=async()=>{
    console.log(formRef)
    if(isEditing){
      setEditing(false)
    }else{
      const formData = new FormData(formRef.current);
      console.log(formData)
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      await apiRequest.post('/pins',formData)
    }
  }
  return (
    <div className='createPage'>
      <div className="createTop">
        <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>
      {
        isEditing ? (
          <Editor previewImg={previewImg} />
        )
          : (<div className='createBottom'>
            {
              previewImg.url ? (
                <div className='preview'>
                  <IKmage
                    src={previewImg.url} />
                  <div className="editorIcon" onClick={() => setEditing(true)}>
                    <IKmage path={"/general/edit.svg"} />
                  </div>
                </div>
              ) : (<>
                <label htmlFor="file" className='upload'>
                  <div className="uploadTitle">
                    <IKmage path="/general/upload.svg" alt={"upload"} />
                    <span>Choose a File</span>
                  </div>
                  <div className="uploadInfo">
                    We recommend using high quality .jpg files less than 20 MB or
                    .mp4 files less than 200 MB.
                  </div>
                </label>
                <input type="file" name="" id="file" onChange={(e) => setFile(e.target.files[0])} hidden />
              </>)
            }
            <form className="createForm" ref={formRef}>
              <div className="createFormItem">
                <label className='title'>Title</label>
                <input type="text"
                  placeholder='Add a title'
                  name='title'
                  id="title"
                />
              </div>
              <div className="createFormItem">
                <label className='description'>Description</label>
                <textarea
                  rows={6}
                  type="text"
                  placeholder="Add a detailed description"
                  name="description"
                  id="description"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  placeholder="Add a link"
                  name="link"
                  id="link"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="board">Board</label>
                <select name='board' id="board">
                  <option value="board1">Board 1</option>
                  <option value="board2">Board 2</option>
                  <option value="board3">Board 3</option>
                  <option value="board4">Board 4</option>
                </select>
              </div>
              <div className="createFormItem">
                <label htmlFor="tags">tags</label>
                <input
                  type="text"
                  placeholder="Add tags"
                  name="tags"
                  id="tags"
                />
                <small>Don&apos;t worry, people won&apos;t see your tags</small>
              </div>
            </form>
          </div>
          )
      }

    </div>
  )
}

export default CreatePage