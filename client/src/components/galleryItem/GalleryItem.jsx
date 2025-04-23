import { Link } from 'react-router'
import './galleryItem.css'
import Image from '../Image/Image'
const GalleryItem = ({item}) => {
  const {media,width,height}=item
  const optimizeHieght=(372*height)/width
  return (
    <div className='galleryItem' style={{gridRowEnd: `span ${Math.ceil(item.height/100)}`}}>
      <Image src={item.media} alt={item.title}  className='galleryItem__image' h={optimizeHieght} />
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className='saveButton'>Save</button>
      <div className="overlayIcons">
        <button>
          <img src='/general/share.svg' alt='share'/>
        </button>
        <button>
          <img src='/general/more.svg' alt='More'/>
        </button>
      </div>
    </div>
  )
}

export default GalleryItem