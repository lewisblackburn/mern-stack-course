import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = (props) => {
  const [loadedUsers, setLoadedUsers] = useState()
  const { isLoading, error, sendRequest } = useHttpClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/`
        )
        setLoadedUsers(responseData.users)
      } catch (error) { }
    }
    fetchUsers()
  }, [sendRequest])
  return (
    <>
      {isLoading && <div>loading users</div>}
      {error && <div>{error}</div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  )
}

export default Users
