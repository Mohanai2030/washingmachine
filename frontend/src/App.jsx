
import './App.css'
import { Header } from './components/header/header'
import { Aligner } from './components/aligner/Aligner'
import { Home } from './components/home/home'
import { Route, Routes} from 'react-router-dom'
import { Pricing } from './components/pricing/pricing'
import { About } from './components/About/About'
import { Chat } from './components/chat/chat'
import { Notfound } from './components/notfound/notfound'
import { Unauthorized } from './components/unauthorized/unauthorized'
import Footer from './components/footer/footer'

function App() {
  
  return (
   <>
    <Header/>
      <Aligner>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<Notfound/>}/>
          <Route />
          <Route path='/unauthorized' element={<Unauthorized/>}/>
          <Route />
        </Routes>

      </Aligner>
   </>
  )
}

export default App
