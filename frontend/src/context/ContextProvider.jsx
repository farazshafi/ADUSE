import { useEffect, useState } from "react"
import MyContext from "./MyContext"

const ContextProvider = ({children}) => {
    const testMsg = "this is a test message"
    const [user,setUser] = useState(null)

    useEffect(()=>{
     
    })
  return (
    <MyContext.Provider value={{testMsg,user,setUser}}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextProvider