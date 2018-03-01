export const updateAuthStatus = (boolean) => ({
  type: 'UPDATE_AUTH_STATUS',
  authenticated: boolean
})

export const updateUser = (array) => ({
  type: 'UPDATE_USER',
  user: array
})

export const updateUsers = (array) => ({
  type: 'UPDATE_USERS',
  users: array
})

export const updateBooks = (array) => ({
  type: 'UPDATE_BOOKS',
  books: array
})

export const updateProfile = (array) => ({
  type: 'UPDATE_PROFILE',
  profile: user
})
