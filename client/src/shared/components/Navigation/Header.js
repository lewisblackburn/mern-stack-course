import React from 'react'

const Header = (props) => {
  return (
    <header className="lg:px-8 px-6 bg-secondary flex flex-wrap items-center lg:py-0 py-2">
      {props.children}
    </header>
  )
}

export default Header
