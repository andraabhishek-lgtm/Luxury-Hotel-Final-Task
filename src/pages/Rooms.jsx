import { useState, useEffect, useMemo, useCallback } from 'react'
import RoomCard from '../components/common/RoomCard'
import { roomsData } from '../data/roomsData'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')

  // useEffect for fetching rooms
  useEffect(() => {
    const loadRooms = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setRooms(roomsData)
      setIsLoading(false)
    }
    loadRooms()
  }, [])

  // useCallback for filter handler
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  // useMemo for filtered and sorted rooms
  const filteredAndSortedRooms = useMemo(() => {
    let result = [...rooms]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply price filter
    if (filter === 'budget') {
      result = result.filter(room => room.price < 300)
    } else if (filter === 'mid') {
      result = result.filter(room => room.price >= 300 && room.price < 500)
    } else if (filter === 'luxury') {
      result = result.filter(room => room.price >= 500)
    }

    // Apply sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [rooms, filter, sortBy, searchQuery])

  const priceFilters = [
    { value: 'all', label: 'All Rooms' },
    { value: 'budget', label: 'Under $300' },
    { value: 'mid', label: '$300 - $500' },
    { value: 'luxury', label: '$500+' }
  ]

  return (
    <div className="rooms-page">
      <section className="page-hero">
        <h1>Our Rooms</h1>
        <p>Find your perfect accommodation</p>
      </section>

      <section className="rooms-content">
        <div className="container">
          {/* Filters */}
          <div className="rooms-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Price Range:</label>
              <div className="filter-buttons">
                {priceFilters.map(f => (
                  <button
                    key={f.value}
                    className={`filter-btn ${filter === f.value ? 'active' : ''}`}
                    onClick={() => handleFilterChange(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sort-group">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="rooms-results">
            <p className="results-count">
              {filteredAndSortedRooms.length} room{filteredAndSortedRooms.length !== 1 ? 's' : ''} found
            </p>

            {isLoading ? (
              <div className="loading">Loading rooms...</div>
            ) : filteredAndSortedRooms.length > 0 ? (
              <div className="rooms-grid">
                {filteredAndSortedRooms.map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No rooms found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Rooms
