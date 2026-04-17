import { useNavigate } from 'react-router-dom'
import Card from '../UI/Card'
import Button from '../UI/Button'

function RoomCard({ room }) {
  const navigate = useNavigate()

  return (
    <Card className="room-card">
      <div className="room-image">
        <img src={room.image} alt={room.name} loading="lazy" />
        <span className="room-rating">⭐ {room.rating}</span>
      </div>
      <div className="room-info">
        <h3>{room.name}</h3>
        <p className="room-description">{room.description}</p>
        <div className="room-details">
          <span>👥 {room.capacity} Guests</span>
          <span>📐 {room.size}</span>
        </div>
        <div className="room-footer">
          <div className="room-price">
            <span className="price">${room.price}</span>
            <span className="per-night">/ night</span>
          </div>
          <Button 
            variant="primary"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default RoomCard
