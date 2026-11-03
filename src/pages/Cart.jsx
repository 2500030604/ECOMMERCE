
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
  }, [])

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index)

    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const total = cart.reduce(
    (sum, product) => sum + Number(product.price), 0
  )

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>

            <button onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Total: ₹{total}</h2>

      {cart.length > 0 && (
        <button onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
      )}
    </div>
  )
}

export default Cart
