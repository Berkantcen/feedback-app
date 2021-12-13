import { createContext, useState } from 'react'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context',
      rating: 10,
    },
  ])

  const feedbackDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedbacks.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedbacks])
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        feedbackDelete,
        addFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
