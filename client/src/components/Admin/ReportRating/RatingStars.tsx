import { Rating, StickerStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React from 'react'

interface props {
  rating: number
  setRating: (rating: number) => void
}

export const RatingStars: React.FC<props> = ({ rating, setRating }) => {

  const myStyles = {
    itemShapes: StickerStar,
    activeFillColor: '#410052',
    inactiveFillColor: 'rgba(171, 127, 182, 0.4)'
  }

  return (
    <div className='my-4'>
      <Rating isRequired style={{ maxWidth: 180 }} itemStyles={myStyles} value={rating} onChange={setRating} />
    </div>
  )
}