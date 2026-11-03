
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // Admin login
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('loggedInUser', JSON.stringify({
        email,
        role: 'admin'
      }))
      alert('Admin Login Successful!')
      navigate('/admin')
      return
    }

    // User login
    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify({
        email: user.email,
        role: 'user'
      }))
      alert('User Login Successful!')
      navigate('/')
    } else {
      alert('Invalid Email or Password')
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>Admin: admin@gmail.com / admin123</p>
    </div>
  )
}

export default Login
