import React, { useContext, useState } from 'react'

import { AuthContext } from '../../shared/context/auth-context'
import Button from '../../shared/components/FormElements/Button'
import { Formik } from 'formik'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

const SignupForm = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [imageFile, setImageFile] = useState()

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', passwordCheck: '' }}
      validate={(values) => {
        const errors = {}
        if (!imageFile) {
          errors.imageFile = 'Required'
        }
        if (!values.name) {
          errors.name = 'Required'
        }
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        if (values.password !== values.passwordCheck) {
          errors.passwordCheck = 'Passwords must be the same'
        }
        if (values.password.length < 6) {
          errors.password = 'password must be >= 6 characters'
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
          formData.append('email', values.email)
          formData.append('password', values.password)
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
              'POST',
              formData
            )
            auth.login(responseData.userId, responseData.token)
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
          <ImageUpload
            onChange={(event) => {
              setImageFile(event.currentTarget.files[0])
            }}
            file={imageFile}
          />
          {errors.imageFile && touched.imageFile && errors.imageFile}
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
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="bg-secondary focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className="bg-secondary focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
          {errors.password && touched.password && errors.password}
          <input
            type="password"
            name="passwordCheck"
            placeholder="repeat password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.passwordCheck}
            className="bg-secondary focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
          {errors.passwordCheck &&
            touched.passwordCheck &&
            errors.passwordCheck}
          <div>
            {isLoading && <div>loading</div>}
            {error}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            danger={errors.email || errors.password || errors.passwordCheck}
            success={!errors.email && !errors.password && !errors.passwordCheck}
          >
            Create Account
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default SignupForm
