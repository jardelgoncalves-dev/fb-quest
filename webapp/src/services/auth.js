export const TOKEN_KEY = '@fb-quest/token'
export const USER_AUTH = '@fb-quest/user'

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setUserAndToken = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_AUTH, JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email
  }))
}

export const removeUserAndToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_AUTH)
}

export const getUser = () =>  JSON.parse(localStorage.getItem(USER_AUTH)) || {}
