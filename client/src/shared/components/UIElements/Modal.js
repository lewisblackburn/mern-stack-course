import React from 'react'
import ReactDOM from 'react-dom'
import Backdrop from './Backdrop'

import './Modal.css'

const ModalOverlay = (props) => {
  const content = (
    <div
      className={`
      modal
      bg-white text-font font-semibold m-10 p-10
      ${props.showModal ? 'block' : 'hidden'}
      ${props.className}
      `}
    >
      <header className={`${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`${props.contentClass}`}>{props.children}</div>
      </form>
      <footer className={`flex justify-end ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = (props) => {
  return (
    <>
      {props.showModal && <Backdrop onClick={props.onClose} />}
      <ModalOverlay {...props} />
    </>
  )
}

export default Modal
