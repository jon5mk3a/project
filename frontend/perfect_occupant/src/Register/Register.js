import { useState } from 'react'
import { useSetUser, useUser } from '../UserContext'
import { register } from '../api'
import './Register.css';
import { Redirect } from 'react-router-dom';


function Register() {
  const setMe = useSetUser()
  const me = useUser();

  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nick_name, setNick_name] = useState('');
  const [password, setPassword] = useState('');
  const [information, setInformation] = useState('');
  const [isError, setError] = useState(false);

  if (me) return <Redirect to='/' />

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await register(photo, name, surname, address, phone, email, nick_name, password, information)
    if (data.token) {
      setMe(data)
    } else {
      setError(true)
    }
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
      <label>
          Photo:
          <input type='file' name='button' src='' value={photo} onChange={e => setPhoto(e.target.value)} />
        </label>
        <label>
          Name:
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Surname:
          <input value={surname} onChange={e => setSurname(e.target.value)} />
        </label>
        <label>
          Address:
          <input value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type='number' value={phone} onChange={e => setPhone(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Nickname:
          <input value={nick_name} onChange={e => setNick_name(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Information:
          <input value={information} onChange={e => setInformation(e.target.value)} />
        </label>
        {isError &&
          <div className="error">
            Register error
          </div>
        }
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
