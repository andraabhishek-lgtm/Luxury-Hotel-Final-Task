import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from '../../context/ThemeContext'

function Layout() {
  const { isDarkMode } = useTheme()

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
