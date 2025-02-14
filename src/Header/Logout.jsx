// import React from 'react'
import { useDispatch } from "react-redux"
import authService from "../appwrite/authService"
import { logout } from "../store/auth"

function Logout() {
    const dispatch = useDispatch()
    const handlerLogout=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
   className="px-4 py-2 rounded-full hover:bg-red-900 duration-300 ease-in-out transition cursor-pointer"
    onClick={handlerLogout}
    >Logout
    </button>
  )
}

export default Logout