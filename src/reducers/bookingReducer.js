export const initialState = {
  bookings: [],
  userInfo: {
    name: '',
    email: '',
    phone: '',
    preferences: []
  }
}

export function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, { ...action.payload, id: Date.now() }]
      }
    
    case 'REMOVE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload)
      }
    
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload }
      }
    
    case 'CLEAR_ALL_BOOKINGS':
      return {
        ...state,
        bookings: []
      }
    
    default:
      return state
  }
}
