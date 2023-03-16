import { useContext, useEffect } from "react"
import { authContext,USERLOCALSTORAGE } from "./contexts/authContext/AuthProvider"
import Home from "./pages/home/Home"

function App() {
  const userCtx=useContext(authContext)
    // NOTE: Update localStorage when authContext refreshed
    useEffect(()=>{
      localStorage.setItem(USERLOCALSTORAGE,JSON.stringify(userCtx.state.user))
    },[userCtx.state])
  return (
    <div className="bg-black text-white min-h-screen w-screen">
      <Home/>
    </div>
  )
}

export default App
