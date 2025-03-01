
import './App.css'
import { Header } from './components/header/header'
import { Aligner } from './components/aligner/Aligner'
import { Home } from './components/home/home'
import { Route, Routes} from 'react-router-dom'
import { Pricing } from './components/pricing/pricing'
import { About } from './components/About/About'
import { Chat } from './components/chat/chat'

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
        </Routes>
      </Aligner>
   </>
  )
}

export default App
