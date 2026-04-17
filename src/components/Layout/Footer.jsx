import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🏨 LuxeStay</h3>
          <p>Experience luxury and comfort at its finest. Your perfect getaway awaits.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/rooms">Rooms</NavLink>
            <NavLink to="/services">Services</NavLink>
          </nav>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 123 Luxury Avenue, Paradise City</p>
          <p>📞 +1 (555) 123-4567</p>
          <p>✉️ info@luxestay.com</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">📺</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 LuxeStay Hotel. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
