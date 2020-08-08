import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import { useHistory } from 'react-router-dom'

const NewSong = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [imageFile, setImageFile] = useState()

  const history = useHistory()

  return (
    <Card>
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
            const formData = new FormData()
            formData.append('image', imageFile)
            formData.append('name', values.name)
            formData.append('artists', values.artists)
            try {
              await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/songs`,
                'POST',
                formData,
                {
                  Authorization: 'Bearer ' + auth.token
                }
              )
              history.push('/')
            } catch (err) {}
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
            <ImageUpload
              onChange={(event) => {
                setImageFile(event.currentTarget.files[0])
              }}
              file={imageFile}
            />
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className="bg-secondary focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            />
            {errors.name && touched.name && errors.name}
            <input
              type="text"
              name="artists"
              placeholder="artists"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.artists}
              className="bg-secondary focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
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
              Add Song
            </Button>
          </form>
        )}
      </Formik>
    </Card>
  )
}

export default NewSong
