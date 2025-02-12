import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { login } from "../store/auth";
import Input from './Input';


function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const session = await authService.Signup(data);
      if (session) {
        const userData = await authService.getUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(signup)} className="max-w-sm mb-10 mx-auto bg-gray-900 p-10 rounded text-white">
        <div className="mb-5">
        <h1 className="text-xl mb-5 text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up to your account
              </h1>
          <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
            required
          />
        </div>
        <div className="mb-5">
          
          <Input
           label="Email: "
           placeholder="Enter your email"
           type="email"
           {...register("email", {
               required: true,
               validate: {
                   matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                   "Email address must be a valid address",
               }
           })}
            id="email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
           
            required
          />
        </div>
        <div className="mb-5">
          
          <Input
            label="Password: "
            placeholder="Enter Password"
            {...register("password", {
              required: true,
            })}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-black  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      
      <p className="mt-2 text-center text-base ">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          log In
        </Link>

      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    </form>
    </div>

  );
}

export default Signup;
