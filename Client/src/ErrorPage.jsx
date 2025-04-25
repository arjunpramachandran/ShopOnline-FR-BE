import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError()
    
    return (
      <div>
          <h1>Oops</h1>
          <p>Sorry For The trouble!</p>
          {error?(
              <p>{error.statusText || error.message 
              }</p>
          ):(
              <p>No specific error</p>
          )}
      </div>
    )
}

export default ErrorPage