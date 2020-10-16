import React from 'react'
import './TextArea.css'

const Textarea = (props) => {
  const { value, onChange, isReadonly, buttonName, header, onClick } = props
  console.log(props)

  return (
    <React.Fragment>
      <h4>{header}</h4>
      <button onClick={() => {onClick(value)}}
      >{buttonName}</button>
      <textarea
        value={value}
        onChange={onChange}
        readOnly={isReadonly}
      />
    </React.Fragment>
  )
}

export default Textarea