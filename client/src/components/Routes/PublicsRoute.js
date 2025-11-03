import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicsRoute = ({children}) => {
  if (localStorage.getItem('token')){
    return <Navigate to="/"/>
  }
    else{
       return children
    }
  
}

export default PublicsRoute
