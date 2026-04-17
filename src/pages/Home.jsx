import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import RoomCard from '../components/common/RoomCard'
import { roomsData } from '../data/roomsData'

function Home() {
  const navigate = useNavigate()
  const [featuredRooms, setFeaturedRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // useEffect for fetching data
  useEffect(() => {
    const loadFeaturedRooms = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setFeaturedRooms(roomsData.slice(0, 3))
      setIsLoading(false)
    }
    loadFeaturedRooms()
  }, [])

  // useCallback for memoized handler
  const handleExploreRooms = useCallback(() => {
    navigate('/rooms')
  }, [navigate])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1696594935764-ba33fd73d012?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to LuxeStay</h1>
          <p>Experience luxury and comfort like never before</p>
          <div className="hero-buttons">
            <Button variant="primary" size="large" onClick={handleExploreRooms}>
              Explore Rooms
            </Button>
            <Button variant="outline" size="large" onClick={() => navigate('/about')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose LuxeStay?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌟</span>
              <h3>Premium Quality</h3>
              <p>Top-notch amenities and world-class service</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📍</span>
              <h3>Prime Location</h3>
              <p>Located in the heart of the city with stunning views</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🍽️</span>
              <h3>Fine Dining</h3>
              <p>Exquisite culinary experiences await you</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🧖</span>
              <h3>Spa & Wellness</h3>
              <p>Rejuvenate your body and mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="featured-rooms">
        <div className="container">
          <h2>Featured Rooms</h2>
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="rooms-grid">
              {featuredRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
          <div className="section-cta">
            <Button variant="outline" onClick={handleExploreRooms}>
              View All Rooms
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready for an Unforgettable Stay?</h2>
          <p>Book your perfect room today and create lasting memories</p>
          <Button variant="primary" size="large" onClick={handleExploreRooms}>
            Book Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home
