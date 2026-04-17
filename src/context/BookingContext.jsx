import { createContext, useContext, useReducer, useCallback } from 'react'
import { bookingReducer, initialState } from '../reducers/bookingReducer'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  // useCallback to memoize functions
  const addBooking = useCallback((booking) => {
    dispatch({ type: 'ADD_BOOKING', payload: booking })
  }, [])

  const removeBooking = useCallback((id) => {
    dispatch({ type: 'REMOVE_BOOKING', payload: id })
  }, [])

  const updateUserInfo = useCallback((info) => {
    dispatch({ type: 'UPDATE_USER_INFO', payload: info })
  }, [])

  const clearAllBookings = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_BOOKINGS' })
  }, [])

  return (
    <BookingContext.Provider value={{
      bookings: state.bookings,
      userInfo: state.userInfo,
      addBooking,
      removeBooking,
      updateUserInfo,
      clearAllBookings
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider')
  }
  return context
}
