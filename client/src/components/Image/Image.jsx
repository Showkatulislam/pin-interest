import { IKImage } from 'imagekitio-react'
const Image = ({ src, alt ,className,w,h,path}) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      path={path}
      src={src}
      className={className}
      alt={alt}
      transformation={[{
        height: w,
        width: h
      }]}
      loading='lazy'
    />
  )
}

export default Image