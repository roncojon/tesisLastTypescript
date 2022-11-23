import React from 'react'
// import { User } from '../container/CreateExam'



const EUsersTransferList = ({users,loadingUsers}/* : User */) => {
  console.log(users);
  return (
    <>
    {loadingUsers ? 
    <div>Cargando...</div> :
users ? 
users.map((user)=><>{user.ci}</>)
:
"No hay data"
  }
    </>
  )
}

export default EUsersTransferList