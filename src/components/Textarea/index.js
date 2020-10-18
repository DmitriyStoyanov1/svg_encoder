import React from 'react'
import './TextArea.css'

const Textarea = (props) => {
  const { value, onChange, isReadonly } = props

  return (
    <textarea
      value={value}
      onChange={onChange}
      readOnly={isReadonly}
    />
  )
}

export default Textarea