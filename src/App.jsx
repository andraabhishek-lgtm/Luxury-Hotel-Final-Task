import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {/* Nested Routing for Rooms */}
        <Route path="rooms">
          <Route index element={<Rooms />} />
          <Route path=":roomId" element={<RoomDetails />} />
        </Route>
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
