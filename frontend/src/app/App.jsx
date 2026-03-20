import React from 'react'
import { useAuth } from '../features/auth/hook/useAuth'
import { useEffect } from 'react'

const App = () => {

  const auth = useAuth()

  useEffect(() => {
    auth.handleGetme()
  }, [])
  return (

    <div>App</div>
  )
}

export default App