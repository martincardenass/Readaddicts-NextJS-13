import { memo } from 'react'
import Image from 'next/image'

// Memoizing the component so it does not change unless its props change
const ImageMemo = memo(({ imageBlob, index }) => (
  <Image
    src={URL.createObjectURL(imageBlob)}
    alt={`Image ${index}`}
    width={100}
    height={100}
  />
))

export default ImageMemo
