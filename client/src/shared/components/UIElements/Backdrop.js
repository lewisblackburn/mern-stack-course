import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
  const content = (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-10"
      onClick={props.onClick}
    />
  )
  return ReactDOM.createPortal(
    content,
    document.getElementById('backdrop-hook')
  )
}

export default Backdrop
