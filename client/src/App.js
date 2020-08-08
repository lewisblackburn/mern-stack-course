import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import './App.css'
import Navigation from './shared/components/Navigation/Navigation'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import { useTheme } from './shared/hooks/theme-hook'

import Users from './user/pages/Users'
const NewSong = React.lazy(() => import('./songs/pages/NewSong'))
const UserSongs = React.lazy(() => import('./songs/pages/UserSongs'))
const UpdateSong = React.lazy(() => import('./songs/pages/UpdateSong'))
const Auth = React.lazy(() => import('./user/pages/Auth'))

const App = () => {
  const { token, login, logout, userId } = useAuth()
  const { theme, themeHandler } = useTheme()

  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/songs" exact>
          <UserSongs />
        </Route>
        <Route path="/songs/new" exact>
          <NewSong />
        </Route>
        <Route path="/songs/:songId" exact>
          <UpdateSong />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/songs" exact>
          <UserSongs />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <div
      className={`App h-screen w-screen bg-primary ${
        theme ? 'dark-theme' : 'light-theme'
        }`}
    >
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <Router>
          <Navigation theme={theme} setTheme={themeHandler} />
          <Suspense fallback={<div>loading</div>}>
            {routes}
          </Suspense>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
