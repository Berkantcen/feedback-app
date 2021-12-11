import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
// COMPONENTS
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackForm from './components/FeedbackForm'
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import AboutPage from './components/pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'

const App = () => {
  const [feedbacks, setFeedback] = useState(FeedbackData)

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
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedbacks={feedbacks} />
                <FeedbackList
                  feedbacks={feedbacks}
                  handleDelete={feedbackDelete}
                />
              </>
            }
          ></Route>

          <Route path='/about' element={<AboutPage />} />
        </Routes>

        <AboutIconLink />
      </div>
    </Router>
  )
}

export default App
