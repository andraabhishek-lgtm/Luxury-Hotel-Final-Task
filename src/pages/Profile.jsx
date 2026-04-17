import { useState, useEffect, useCallback } from 'react'
import Button from '../components/UI/Button'
import { useBooking } from '../context/BookingContext'

function Profile() {
  const { bookings, userInfo, updateUserInfo, removeBooking, clearAllBookings } = useBooking()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userInfo)
  const [activeTab, setActiveTab] = useState('bookings')

  // Sync form data with context
  useEffect(() => {
    setFormData(userInfo)
  }, [userInfo])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSave = () => {
    updateUserInfo(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(userInfo)
    setIsEditing(false)
  }

  const calculateTotal = useCallback((booking) => {
    if (!booking.checkIn || !booking.checkOut) return booking.price
    const start = new Date(booking.checkIn)
    const end = new Date(booking.checkOut)
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return booking.price * nights
  }, [])

  return (
    <div className="profile-page">
      <section className="page-hero">
        <h1>My Profile</h1>
        <p>Manage your bookings and personal information</p>
      </section>

      <section className="profile-content">
        <div className="container">
          {/* Profile Tabs */}
          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              📋 My Bookings ({bookings.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              👤 Personal Info
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="bookings-section">
              {bookings.length > 0 ? (
                <>
                  <div className="bookings-header">
                    <h2>Your Reservations</h2>
                    <Button 
                      variant="outline" 
                      onClick={clearAllBookings}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="bookings-list">
                    {bookings.map(booking => (
                      <div key={booking.id} className="booking-card">
                        <div className="booking-image">
                          <img src={booking.roomImage} alt={booking.roomName} />
                        </div>
                        <div className="booking-details">
                          <h3>{booking.roomName}</h3>
                          <div className="booking-info">
                            <p>📅 Check-in: {booking.checkIn}</p>
                            <p>📅 Check-out: {booking.checkOut}</p>
                            <p>👥 Guests: {booking.guests}</p>
                          </div>
                          <div className="booking-price">
                            <span>Total: ${calculateTotal(booking)}</span>
                          </div>
                        </div>
                        <button
                          className="remove-booking"
                          onClick={() => removeBooking(booking.id)}
                          aria-label="Remove booking"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-bookings">
                  <span className="no-bookings-icon">📭</span>
                  <h3>No bookings yet</h3>
                  <p>Start exploring our rooms and make your first reservation!</p>
                  <Button variant="primary" onClick={() => window.location.href = '/rooms'}>
                    Browse Rooms
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Personal Info Tab */}
          {activeTab === 'info' && (
            <div className="info-section">
              <div className="info-header">
                <h2>Personal Information</h2>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    ✏️ Edit
                  </Button>
                )}
              </div>

              <form className="info-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="info-value">{userInfo.name || 'Not provided'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="info-value">{userInfo.email || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="info-value">{userInfo.phone || 'Not provided'}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="form-actions">
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Profile
