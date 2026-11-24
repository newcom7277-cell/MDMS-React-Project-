import React from 'react'
import { useUser } from '../../../shared/context/UserContext'
export const EndUser = () => {

     const { user } = useUser();
  return (
    <div>
         <h2>Welcome, {user?.name}</h2>
      <p>{user?.email}</p>
         </div>
  )
}
