import React, { useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'
import Button from '../../shared/components/FormElements/Button'
import { Formik } from 'formik'
import { useHttpClient } from '../../shared/hooks/http-hook'

const LoginForm = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        const errors = {}
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
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setSubmitting(false)
          clearError()
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/users/login`,
              'POST',
              JSON.stringify({
                email: values.email,
                password: values.password
              }),
              {
                'Content-Type': 'application/json'
              }
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
          <div>
            {isLoading && <div>loading</div>}
            {error}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            danger={errors.email || errors.password}
            success={!errors.email && !errors.password}
          >
            Login
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm
