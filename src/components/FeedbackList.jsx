import React from 'react'
import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'
import Loading from './shared/Loading'

const FeedbackList = () => {
  const { feedbacks, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedbacks || feedbacks.length === 0)) {
    return <p>No Feedback Available</p>
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem feedback={feedback} key={feedback.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList
