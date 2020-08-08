import React from 'react'

const Card = (props) => {
  return (
    <div
      className={`
        bg-secondary text-font font-semibold m-10 
        ${props.hover && 'hover:opacity-75'}
        ${props.className}
    `}
    >
      {props.children}
    </div>
  )
}

export default Card
