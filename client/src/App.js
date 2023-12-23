import React from 'react'
import Routers from './Routers'
import { ContextProvider } from './GlobalContext'

function App() {
  return (
    <ContextProvider>
      <Routers />
    </ContextProvider>
  )
}

export default App