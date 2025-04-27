
import './App.css'
import { Header } from './components/header/header'
import { Aligner } from './components/aligner/Aligner'
import { Home } from './components/home/home'
import { Route, Routes} from 'react-router-dom'
import { Pricing } from './components/pricing/pricing'
import { Chat } from './components/chat/chat'
import { Notfound } from './components/notfound/notfound'
import { Unauthorized } from './components/unauthorized/unauthorized'
import Footer from './components/footer/footer'
import { Profile } from './components/profile/profile'
import Login from './components/login/login'
import { HeaderAlignerWrapper } from './wrappers/headerAlignerContainer'
import { Signup } from './components/Signup/Signup'
import { Billing } from './components/billing/billing'

function App() {
  
  return (
   <>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<HeaderAlignerWrapper/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/pricing' element={<Pricing/>}/>
              <Route path='/chat' element={<Chat/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='*' element={<Notfound/>}/>
              <Route path='/unauthorized' element={<Unauthorized/>}/>
              <Route path='/billing' element={<Billing/>}/>
        </Route>
        
    </Routes>
   </>
  )
}

export default App
