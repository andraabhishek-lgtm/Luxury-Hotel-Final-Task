import { useState, useEffect } from 'react'

function About() {
  const [stats, setStats] = useState({
    rooms: 0,
    guests: 0,
    years: 0,
    awards: 0
  })

  // useEffect for animation
  useEffect(() => {
    const targets = { rooms: 150, guests: 50000, years: 25, awards: 30 }
    const duration = 2000
    const steps = 50
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setStats({
        rooms: Math.round(targets.rooms * progress),
        guests: Math.round(targets.guests * progress),
        years: Math.round(targets.years * progress),
        awards: Math.round(targets.awards * progress)
      })

      if (currentStep >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const team = [
    { name: 'Sarah Johnson', role: 'General Manager', image: '👩‍💼' },
    { name: 'Michael Chen', role: 'Head Chef', image: '👨‍🍳' },
    { name: 'Emily Brown', role: 'Spa Director', image: '👩‍⚕️' },
    { name: 'David Wilson', role: 'Concierge Lead', image: '🧑‍💼' }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <h1>About LuxeStay</h1>
        <p>A legacy of luxury hospitality since 1999</p>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 1999, LuxeStay has been redefining luxury hospitality for over two decades. 
                What started as a single boutique hotel has grown into a symbol of elegance and 
                exceptional service.
              </p>
              <p>
                Our commitment to excellence drives everything we do - from the carefully curated 
                amenities in each room to the personalized service our guests receive from the 
                moment they arrive.
              </p>
              <p>
                We believe that true luxury lies in the details, and our dedicated team works 
                tirelessly to ensure every stay exceeds expectations.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" 
                alt="LuxeStay Hotel"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.rooms}+</span>
              <span className="stat-label">Luxury Rooms</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.guests.toLocaleString()}+</span>
              <span className="stat-label">Happy Guests</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.years}+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.awards}+</span>
              <span className="stat-label">Awards Won</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">✨</span>
              <h3>Excellence</h3>
              <p>We strive for perfection in every detail of your experience.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">💝</span>
              <h3>Hospitality</h3>
              <p>Genuine warmth and care in every interaction.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🌱</span>
              <h3>Sustainability</h3>
              <p>Committed to eco-friendly practices and responsible luxury.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🔒</span>
              <h3>Integrity</h3>
              <p>Transparency and honesty in everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.image}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
