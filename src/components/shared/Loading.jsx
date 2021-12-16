import React from 'react'
import loading from '../../assets/loading.gif'

const Loading = () => {
  return (
    <img
      src={loading}
      alt=''
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
  )
}

export default Loading
