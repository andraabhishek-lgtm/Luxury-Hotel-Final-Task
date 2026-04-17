import { useState } from 'react'
import Card from '../components/UI/Card'
import { servicesData } from '../data/roomsData'

function Services() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <div className="services-page">
      <section className="page-hero">
        <h1>Our Services</h1>
        <p>Discover world-class amenities and experiences</p>
      </section>

      <section className="services-content">
        <div className="container">
          <div className="services-grid">
            {servicesData.map(service => (
              <Card 
                key={service.id} 
                className={`service-card ${selectedService === service.id ? 'expanded' : ''}`}
                onClick={() => setSelectedService(
                  selectedService === service.id ? null : service.id
                )}
              >
                {service.image && (
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="service-image"
                    loading="lazy"
                  />
                )}
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                
                {selectedService === service.id && (
                  <div className="service-features">
                    <h4>Features:</h4>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <span className="expand-hint">
                  {selectedService === service.id ? 'Click to collapse' : 'Click for details'}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="offers-section">
        <div className="container">
          <h2>Special Packages</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <h3>🎉 Weekend Getaway</h3>
              <p>2 nights + Spa treatment + Dinner for two</p>
              <span className="offer-price">From $599</span>
            </div>
            <div className="offer-card">
              <h3>💑 Romantic Escape</h3>
              <p>Sunset cruise + Couples massage + Private dining</p>
              <span className="offer-price">From $899</span>
            </div>
            <div className="offer-card">
              <h3>👨‍👩‍👧‍👦 Family Fun</h3>
              <p>Family suite + Kids activities + Pool access</p>
              <span className="offer-price">From $699</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
