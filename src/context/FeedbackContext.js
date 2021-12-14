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
    {
      id: 2,
      text: 'This item is from context',
      rating: 4,
    },
    {
      id: 3,
      text: 'This item is from context',
      rating: 5,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Edit feedback
  const editFeedback = (feedback) => {
    setFeedbackEdit({
      item: feedback,
      edit: true,
    })
  }

  // UPDATE feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedbacks.map((feedback) => {
        if (feedback.id === id) {
          return {
            ...feedback,
            ...updItem,
          }
        }
        return feedback
      })
    )
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // DELETE feedback
  const feedbackDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedbacks.filter((item) => item.id !== id))
    }
  }

  // ADD FEEDBACK
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
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
