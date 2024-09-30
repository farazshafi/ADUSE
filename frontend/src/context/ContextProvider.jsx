import MyContext from "./MyContext"

const ContextProvider = ({children}) => {
    const testMsg = "this is a test message"
  return (
    <MyContext.Provider value={{testMsg}}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextProvider