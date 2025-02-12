import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Authentication({children,authentication=true}) {
    const navigate = useNavigate()
    const authStatus = useSelector((state)=> state.auth.status)
    const [loader,setLoader] = useState(true)

    useEffect(()=>{
        if (authentication && authStatus!==authentication)
        {
            navigate('/login')
        }
        else if(!authentication && authStatus!== authentication)
        {
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
  return loader? <h1> Loding... </h1>:<>
  {children}</>
}

export default Authentication