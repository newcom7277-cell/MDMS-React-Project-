import React from 'react'

import { useUser } from '../../../shared/context/userContext'
export const Enterprise = () => {
    const {user}=useUser();
  return (
    <>
  
    <div>This is Enterprise</div>
    <p> name is {user.name}</p>
      </>
  )
}
