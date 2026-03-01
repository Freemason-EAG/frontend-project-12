import { removeUser } from '../slices/authSlice'

const authMiddleware = store => next => (action) => {
  if (action.type.endsWith('rejected')) {
    if (action.error.message.includes('401')
      || action.payload?.status === 401) {
      store.dispatch(removeUser())
      window.location.href = '/login'
    }
  }
  return next(action)
}

export default authMiddleware
