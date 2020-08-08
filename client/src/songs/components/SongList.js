import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import SongItem from './SongItem'

const SongList = (props) => {
  if (props.items.length === 0) {
    return <Card className="p-10">No songs found. Maybe create one?</Card>
  }
  return (
    <ul>
      {props.items.map((song) => (
        <SongItem
          key={song.id}
          id={song.id}
          image={song.image}
          name={song.name}
          artists={song.artists}
          owner={song.owner}
          onDelete={props.onDeleteSong}
        />
      ))}
    </ul>
  )
}

export default SongList
