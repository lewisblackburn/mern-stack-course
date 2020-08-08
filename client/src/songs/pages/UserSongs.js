import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SongList from '../components/SongList'
import { useHttpClient } from '../../shared/hooks/http-hook'

const UserSongs = (props) => {
  const [loadedSongs, setLoadedSongs] = useState()
  const { isLoading, error, sendRequest } = useHttpClient()

  const userId = useParams().userId

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/songs/user/${userId}`
        )
        setLoadedSongs(responseData.songs)
      } catch (err) {}
    }
    fetchSongs()
  }, [sendRequest, userId])

  const songDeletedHanlder = (deleteSongId) => {
    setLoadedSongs((prevSongs) =>
      prevSongs.filter((song) => song.id !== deleteSongId)
    )
  }

  return (
    <>
      {!isLoading && loadedSongs && (
        <SongList items={loadedSongs} onDeleteSong={songDeletedHanlder} />
      )}
      <div>
        {isLoading && <div>loading</div>}
        {error}
      </div>
    </>
  )
}

export default UserSongs
