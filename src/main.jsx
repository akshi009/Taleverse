
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Authentication from './components/Authentication.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import './index.css'
import AllPost from './pages/AllJokePost.jsx'
import AddPost from './pages/JokeAddPost.jsx'
import JokeEditor from './pages/JokeEditor.jsx'
import JokePost from './pages/JokePost.jsx'
import store from './store/store.js'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
     { path:'/',
      element:<Home/>},
      {
        path: '/login',
        element:(
          <Authentication authentication={false}>
            <Login/>
          </Authentication>
        )
      },
      {
        path: '/signup',
        element:(
          <Authentication authentication={false}>
            <Signup/>
          </Authentication>
        )
      },
      {
        path: '/allpost',
        element:(
          <Authentication authentication={true}>
            <AllPost/>
          </Authentication>
        )
      },
      {
        path: '/addpost',
        element:(
          <Authentication authentication={true}>
            <AddPost/>
          </Authentication>
        )
      },
      {
        path: "/edit-post/:slug",
        element:(
        <Authentication>
          {" "}
          <JokeEditor/>
        </Authentication>)
      },
      {
              path: "/post/:slug",
              element: <JokePost />,
            },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
