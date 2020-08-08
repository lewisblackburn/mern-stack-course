import React, { useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'
import Button from '../../shared/components/FormElements/Button'
import { Formik } from 'formik'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useParams, useHistory } from 'react-router-dom'

const UpdateSong = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const songId = useParams().songId

  const history = useHistory()

  return (
    <Formik
      initialValues={{ name: '', artists: '' }}
      validate={(values) => {
        const errors = {}
        if (!values.name) {
          errors.name = 'Required'
        }
        if (!values.artists) {
          errors.artists = 'Required'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setSubmitting(false)
          clearError()
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/songs/${songId}`,
              'PATCH',
              JSON.stringify({
                name: values.name,
                artists: values.artists
              }),
              {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
              }
            )
            history.push(`/${auth.userId}/songs`)
          } catch (error) {}
        }, 400)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="bg-primary p-10">
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className="bg-secondary text-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
          {errors.name && touched.name && errors.name}
          <input
            type="text"
            name="artists"
            placeholder="artists"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.artists}
            className="bg-secondary text-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
          {errors.artists && touched.artists && errors.artists}
          <div>
            {isLoading && <div>loading</div>}
            {error}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            danger={errors.name || errors.artists}
            success={!errors.name && !errors.artists}
          >
            Update Song
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default UpdateSong
