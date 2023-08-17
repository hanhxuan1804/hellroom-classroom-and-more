import React from 'react'

const ErrorPage = (props) => {
  return (
    <>
        <h1>404</h1>
        <h2>Page not found</h2>
        <h3>Sorry, the page you are looking for does not exist.</h3>
        <>{props.error}</>
    </>
  )
}

export default ErrorPage