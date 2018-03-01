export default (state = {
  authenticated: false,
  user: [],
  books: [],
  users: []
  },action) => {
    switch (action.type) {
      case 'UPDATE_AUTH_STATUS':
        return {
          ...state,
          authenticated: action.authenticated
        }
      case 'UPDATE_BOOKS':
        return {
          ...state,
          books: action.books
        }
      case 'UPDATE_USER':
        console.log(action.user)
        return {
          ...state,
          user: action.user
        }
      case 'UPDATE_USERS':
        return {
          ...state,
          users: action.users
        }
      default:
        return state
    }
}