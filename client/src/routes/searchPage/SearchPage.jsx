import { useSearchParams } from 'react-router'
import './searchPage.css'
import Gallery from '../../components/gallery/Gallery';
import { use } from 'react';
const SearchPage = () => {
  const [searchParams]=useSearchParams()
 const search=searchParams.get('search')
 const boardId=searchParams.get('boardId')
 console.log(boardId)
  
  return (
    <Gallery search={search} boardId={boardId}/>
  )
}

export default SearchPage