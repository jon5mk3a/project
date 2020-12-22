import useFetch from './useFetch';

export const useUserList = () => useFetch('http://localhost:8080/users')
export const useUserById = (id) => useFetch('http://localhost:8080/users/' + id)

export const login = async (nick_name, password) => {
  const ret = await fetch('http://localhost:8080/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nick_name, password })
  })
  const data = await ret.json()
  return data
}

export const register = async (photo, name, surname, address, phone, email, nick_name, password, information) => {
  const ret = await fetch('http://localhost:8080/api/users/createUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ photo, name, surname, address, phone, email, nick_name, password, information })
  })
  const data = await ret.json()
  return data
}

export const edit = async (token, id, newUser) => {
  const ret = await fetch('http://localhost:8080/users/:id/editUser' + id, {
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
