import React from 'react'

const Button = (props) => {
  return (
    <button
      className={`
      ${
        (props.danger && 'bg-red-500 text-white') ||
        (props.success && 'bg-green-500 text-white') ||
        'bg-primary text-font'
      }
      hover:bg-gray-400 font-bold py-2 px-4 rounded  inline-flex items-center outline-none focus:outline-none 
      ${props.className}
      `}
      onClick={props.onClick}
      type={props.type}
    >
      <span>{props.children}</span>
    </button>
  )
}

export default Button
