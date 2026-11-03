
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const navigate = useNavigate()

  const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    if (!user || user.role !== 'user') {
      alert('Please login as a user!')
      navigate('/login')
      return
    }

    if (cart.length === 0) {
      alert('Your cart is empty!')
      navigate('/cart')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const customer = users.find(u => u.email === user.email)

    const orders = JSON.parse(localStorage.getItem('orders')) || []

    const newOrder = {
      id: Date.now(),
      customer: customer?.name || user.email,
      email: user.email,
      products: cart,
      amount: cart.reduce((sum, p) => sum + Number(p.price), 0),
      status: 'Pending',
      date: new Date().toLocaleDateString()
    }

    orders.push(newOrder)

    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.removeItem('cart')

    alert('Order Placed Successfully!')
    navigate('/')
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <p>Confirm your order.</p>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  )
}

export default Checkout
