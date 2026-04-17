import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import { useBooking } from '../context/BookingContext'
import { roomsData } from '../data/roomsData'

function RoomDetails() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { addBooking } = useBooking()
  
  const [room, setRoom] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  })
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    const loadRoom = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 300))
      const foundRoom = roomsData.find(r => r.id === parseInt(roomId))
      setRoom(foundRoom)
      setIsLoading(false)
    }
    loadRoom()
  }, [roomId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleBooking = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }

    addBooking({
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      price: room.price,
      ...bookingData
    })

    setBookingSuccess(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setBookingSuccess(false)
      setBookingData({ checkIn: '', checkOut: '', guests: 1 })
    }, 2000)
  }

  if (isLoading) {
    return <div className="loading-page">Loading...</div>
  }

  if (!room) {
    return (
      <div className="not-found">
        <h2>Room not found</h2>
        <Button onClick={() => navigate('/rooms')}>Back to Rooms</Button>
      </div>
    )
  }

  return (
    <div className="room-details-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/rooms')}>
          ← Back to Rooms
        </button>

        <div className="room-details-content">
          <div className="room-gallery">
            <img src={room.image} alt={room.name} className="main-image" />
          </div>

          <div className="room-info-section">
            <div className="room-header">
              <h1>{room.name}</h1>
              <div className="room-rating">⭐ {room.rating}</div>
            </div>

            <p className="room-description">{room.description}</p>

            <div className="room-specs">
              <div className="spec">
                <span className="spec-icon">👥</span>
                <span>Up to {room.capacity} guests</span>
              </div>
              <div className="spec">
                <span className="spec-icon">📐</span>
                <span>{room.size}</span>
              </div>
            </div>

            <div className="room-amenities">
              <h3>Amenities</h3>
              <ul className="amenities-list">
                {room.amenities.map((amenity, index) => (
                  <li key={index}>✓ {amenity}</li>
                ))}
              </ul>
            </div>

            <div className="booking-section">
              <div className="price-display">
                <span className="price">${room.price}</span>
                <span className="per-night">/ night</span>
              </div>
              <Button 
                variant="primary" 
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={bookingSuccess ? 'Booking Confirmed!' : `Book ${room.name}`}
      >
        {bookingSuccess ? (
          <div className="booking-success">
            <span className="success-icon">✓</span>
            <p>Your booking has been added successfully!</p>
            <p>Check your profile for booking details.</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleInputChange}
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <select
                name="guests"
                value={bookingData.guests}
                onChange={handleInputChange}
              >
                {[...Array(room.capacity)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="booking-summary">
              <p><strong>Room:</strong> {room.name}</p>
              <p><strong>Price:</strong> ${room.price} / night</p>
            </div>
            <Button variant="primary" size="large" onClick={handleBooking}>
              Confirm Booking
            </Button>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default RoomDetails
