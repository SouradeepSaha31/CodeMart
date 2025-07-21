import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BuyersSignup from './Components/Signup/BuyersSignup.jsx'
import SellersSignup from './Components/Signup/SellersSignup.jsx'
import Login from './Components/Login/Login.jsx'
import BuyersProfile from './Components/Profile/BuyersProfile.jsx'
import SellersProfile from './Components/Profile/SellersProfile.jsx'
import IsLoggedIn from "./Components/middleware/IsLoggedIn.jsx"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<BuyersSignup />}/>
      <Route path="/sellerssignup" element={<SellersSignup />}/>
      <Route path="/login" element={<Login />}/>
      <Route path='/' element = {<App/>}>
        <Route path = "/buyersprofile" element = {<IsLoggedIn Page = {BuyersProfile}/>}/>
        <Route path="sellersprofile" element =  {<IsLoggedIn Page = {SellersProfile}/>}/>
      </Route>
    </>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
