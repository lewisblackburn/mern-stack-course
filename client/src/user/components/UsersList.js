import React from 'react'
import UserItem from './UserItem'
import Card from '../../shared/components/UIElements/Card'

const UsersList = (props) => {
  if (props.items.length === 0) {
    return <Card className="p-10">no users found</Card>
  }
  return (
    <ul>
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            songCount={user.songs.length}
          />
        )
      })}
    </ul>
  )
}

export default UsersList
