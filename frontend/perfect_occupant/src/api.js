import useFetch from './useFetch'

export const useUserList = () => useFetch('http://localhost:8080/users')
export const useUserById = (id) => useFetch('http://localhost:8080/users/' + id)

export const login = async (nick_name, password) => {
  const ret = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nick_name, password })
  })
  const data = await ret.json()
  return data
}

export const register = async (nick_name, password, email) => {
  const ret = await fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nick_name, password, email })
  })
  const data = await ret.json()
  return data
}

export const edit = async (token, id, newUser) => {
  const ret = await fetch('http://localhost:8080/users/' + id, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  const data = await ret.json()
  return data
}
