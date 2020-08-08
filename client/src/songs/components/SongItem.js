import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import { AuthContext } from '../../shared/context/auth-context'
import { Link } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

const SongItem = (props) => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest } = useHttpClient()
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const openRemoveModalHandler = () => {
    setShowRemoveModal(true)
  }
  const closeRemoveModalHanlder = () => setShowRemoveModal(false)

  const removeSongHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/songs/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      )
      props.onDelete(props.id)
    } catch (err) { }
  }

  return (
    <>
      <Modal
        showModal={showRemoveModal}
        header={`This will remove ${props.name}`}
        onClose={closeRemoveModalHanlder}
        footer={
          <div>
            <Button onClick={closeRemoveModalHanlder} danger>
              Close
            </Button>
            <Button onClick={removeSongHandler} className="ml-5" success>
              Confirm
            </Button>
          </div>
        }
      ></Modal>
      <li>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                alt={props.name}
                className="m-10 w-32 rounded-full"
              />
              <div className="block ml-16">
                <h1 className="text-lg font-bold">{props.name}</h1>
                <span>{props.artists}</span>
              </div>
            </div>
            {auth.userId === props.owner && (
              <div className="flex justify-between pr-10">
                <Link to={`/songs/${props.id}`} className="mr-2">
                  Edit
                </Link>
                <Button
                  className="ml-2"
                  onClick={openRemoveModalHandler}
                  danger
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
          <div>
            {isLoading && <div>loading</div>}
            {error}
          </div>
        </Card>
      </li>
    </>
  )
}

export default SongItem
