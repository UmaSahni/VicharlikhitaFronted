import React, { createContext, useState } from 'react'

export const Authcontext = createContext()

const AuthContextProvier = ({children}) => {
    const [Isauth, setIsAuth] = useState(false)
    const[token, setToken] = useState("")
    const [userID, setUserId] = useState("")
  return (
    <Authcontext.Provider value={{Isauth,userID, setUserId, setIsAuth, token, setToken}} > {children} </Authcontext.Provider>
  )
}

export default AuthContextProvier