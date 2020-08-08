import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'
import Button from '../FormElements/Button'

const Links = (props) => {
  const auth = useContext(AuthContext)

  return (
    <ul className="lg:flex items-center justify-between text-base text-font 0 pt-4 lg:pt-0">
      <li>
        <NavLink
          to="/"
          className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
          exact
        >
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink
            to={`/${auth.userId}/songs`}
            className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
          >
            My Songs
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink
            to="/songs/new"
            className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
          >
            Add Songs
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink
            to="/auth"
            className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
          >
            Authenticate
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button
            className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 h-10"
            onClick={auth.logout}
          >
            Logout
          </Button>
        </li>
      )}
    </ul>
  )
}

export default Links
