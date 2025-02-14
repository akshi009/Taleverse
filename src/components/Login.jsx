import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/authService'
import { login as authLogin } from '../store/auth'
import Input from './Input'

function Login() {
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const [error,setError]=useState('')
    const{register,handleSubmit}=useForm()

    const login = async (data)=>{
        setError('')
        console.log(data)
        try {
            const session = await authService.login(data) 
            if(session)
            {
                const userData = await authService.getUser()
                if(userData) dispatch(authLogin(userData)) 
                    navigate('/') //navigate to home page
                 }

                 else
                 {
                    setError("Invalid credentials. Please try again.");
                 }
            }
         catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

  return (
    <section className="py-10 my-30">
  <div className="flex flex-col items-center justify-center px-6 text-white mx-auto py-10 lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleSubmit(login)} className='mt-8'>
                  <div>
                  <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                 className="bg-gray-50 border border-gray-300 text-black  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                  </div>
                  <div className='mt-5'>
                  <Input
                label="Password: "
                type="password"
                  className="bg-gray-50 border border-gray-300 text-black  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                           
                          </div>
                         
                      </div>
                      {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                  </div>
                  <button
          type="submit"
          className="text-white w-full cursor-pointer my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log In
        </button>

                  {error && <p className="text-red-500  text-center text-sm mb-5">{error}</p>}    
                  <p className="text-sm font-light mt-2 text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? 
                    
                      <Link 
                      to='/signup'
                      className="font-medium text-primary-600 hover:underline cursor-pointer dark:text-primary-500"
                      >
                         Sign Up
                      </Link>
                  </p>
                 

              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login