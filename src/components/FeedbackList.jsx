import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import PropTypes from 'prop-types'

const FeedbackList = ({ feedbacks, handleDelete }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <p>No Feedback Available</p>
  }

  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem
              feedback={feedback}
              key={feedback.id}
              handleDelete={handleDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

FeedbackList.propTypes = {
  feedbacks: PropTypes.array.isRequired,
}

export default FeedbackList
