import React from 'react'

const Avatar = (props) => {
  return (
    <div className={`m-10 ${props.className}`}>
      <img className="rounded-full" src={props.image} alt={props.alt} />
    </div>
  )
}

export default Avatar
