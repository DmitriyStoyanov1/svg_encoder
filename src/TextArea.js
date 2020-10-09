import React from 'react'
import './TextArea.css'

const Textarea = (props) => {
  console.log(props)
  return (
    <div className="textarea-wrapper">

      <div className="textarea-container">
        <textarea onChange={props.onChange}></textarea>
      </div>

      <div className="textarea-container">
        <textarea value={props.inputState.inputValue1}></textarea>
      </div>

      <div className="textarea-container">
        <textarea value={props.inputState.inputValue2}></textarea>
      </div>

      <div className="textarea-container">
        <div style={{backgroundImage: props.inputState.inputValue2}}></div>
      </div>

    </div>
  )
}

export default Textarea