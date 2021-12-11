import React from 'react'

const FeedbackStats = ({ feedbacks }) => {
  // CALCULATE RATINGS AVERAGE
  let average = (
    feedbacks.reduce((acc, cur) => {
      return acc + cur.rating
    }, 0) / feedbacks.length
  ).toFixed(1)

  return (
    <div className='feedback-stats'>
      <h4> {feedbacks.length} Reviews</h4>
      <h4> Average Rating : {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats
