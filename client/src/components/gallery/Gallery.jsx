import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import GalleryItem from '../galleryItem/GalleryItem';
import './gallery.css'
import apiRequest from '../../utils/ApiRequest';
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchPins = async ({ pageParam, search, userId, boardId }) => {
  const res = await apiRequest.get(`/pins?cursor=${pageParam}&search=${
      search || ""
    }&userId=${userId || ""}&boardId=${boardId || ""}`)
  return res.data;
};
const Gallery = ({search,userId,boardId}) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["pins",search,userId,boardId],
    queryFn: ({ pageParam = 0 }) =>
    fetchPins({ pageParam,search ,userId,boardId}),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor
    },
  });
  if (status === "error") return <div className='error'>Error</div>
  if (status === "loading") return <div>Loading...</div>

  const allPins = data?.pages.map((page) => page.pins).flat() || []

  return (
    <InfiniteScroll
      dataLength={allPins?.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins</h4>}
      endMessage={<h3>All Posts Loaded!</h3>}
    >
      <div className="gallery">
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default Gallery