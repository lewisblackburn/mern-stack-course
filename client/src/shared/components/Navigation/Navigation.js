import React from 'react'
import { Link } from 'react-router-dom'

import Header from './Header'
import Links from './Links'
import './Links.css'

const Navigation = (props) => {
  return (
    <Header>
      <div className="flex-1 flex justify-between items-center">
        <Link to="/" className="font-semibold text-xl tracking-tight text-font">
          The Song Database
        </Link>

        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-font"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav className="p-4">
            <Links />
          </nav>
          <button
            className="bg-primary hover:bg-gray-400 text-font font-bold py-2 px-4 rounded inline-flex items-center outline-none focus:outline-none"
            onClick={props.setTheme}
          >
            <span>{props.theme ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </Header>
  )
}

export default Navigation
