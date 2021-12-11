import { useState, useEffect } from 'react'
import React from 'react'
// COMPONENTS
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

const FeedbackForm = ({ handleAdd }) => {
  const [rating, setRating] = useState(10)
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const changeText = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage('')
    } else if (text !== '' && text.trim().length <= 9) {
      setBtnDisabled(true)
      setMessage('Please enter at least 10 characters')
    } else {
      setBtnDisabled(false)
      setMessage('')
    }
  }, [text])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 9) {
      const newFeedback = {
        text,
        rating,
      }
      handleAdd(newFeedback)
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us ?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={changeText}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled} version='secondary'>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
