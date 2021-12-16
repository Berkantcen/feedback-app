import { createContext, useState, useEffect } from 'react'
import React from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedbacks, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    const response = await fetch('/feedbacks?_sort=id&_order=desc')
    const feedbackData = await response.json()
    setFeedback(feedbackData)
    setIsLoading(false)
  }

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
  const feedbackDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await fetch(`/feedbacks/${id}`, { method: 'DELETE' })
      setFeedback(feedbacks.filter((item) => item.id !== id))
    }
  }

  // ADD FEEDBACK
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    setFeedback([data, ...feedbacks])
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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
