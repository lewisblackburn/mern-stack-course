import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'

const UserItem = (props) => {
  return (
    <li>
      <Card hover>
        <Link className="flex items-center" to={`/${props.id}/songs`}>
          <Avatar
            image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            alt={props.name}
            className="w-32"
          />
          <div className="block ml-16">
            <h1 className="text-lg font-bold">{props.name}</h1>
            <h3 className="text-md">
              {props.songCount} {props.songCount === 1 ? 'Song' : 'Songs'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default UserItem
