
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))

    if (!user || user.role !== 'admin') {
      alert('Admin Login Required!')
      navigate('/login')
      return
    }

    setProducts(JSON.parse(localStorage.getItem('products')) || [])
    setOrders(JSON.parse(localStorage.getItem('orders')) || [])
  }, [navigate])

  const addProduct = (e) => {
    e.preventDefault()

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price)
    }

    const updated = [...products, newProduct]

    setProducts(updated)
    localStorage.setItem('products', JSON.stringify(updated))

    setName('')
    setPrice('')

    alert('Product Added Successfully!')
  }

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id)

    setProducts(updated)
    localStorage.setItem('products', JSON.stringify(updated))
  }

  const updateOrder = (id, status) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    )

    setOrders(updated)
    localStorage.setItem('orders', JSON.stringify(updated))
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/login')
  }

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <h2>Add Product</h2>

      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="1"
          required
        />

        <button type="submit">Add Product</button>
      </form>

      <h2>Manage Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name} - ₹{product.price}</span>
          <button onClick={() => deleteProduct(product.id)}>
            Delete
          </button>
        </div>
      ))}

      <h2>Customer Orders</h2>

      {orders.length === 0 && <p>No orders available.</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>Customer: {order.customer}</p>
          <p>Email: {order.email}</p>
          <p>Amount: ₹{order.amount}</p>
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) => updateOrder(order.id, e.target.value)}
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  )
}

export default AdminDashboard
