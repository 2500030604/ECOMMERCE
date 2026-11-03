
import { useState } from 'react'

function Home() {
  const [products] = useState(() => {
    const saved = localStorage.getItem('products')

    if (saved) return JSON.parse(saved)

    const initialProducts = [
      { id: 1, name: 'Laptop', price: 45000 },
      { id: 2, name: 'Smartphone', price: 20000 },
      { id: 3, name: 'Headphones', price: 1500 },
      { id: 4, name: 'Smart Watch', price: 3000 }
    ]

    localStorage.setItem('products', JSON.stringify(initialProducts))
    return initialProducts
  })

  const [search, setSearch] = useState('')

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    cart.push(product)

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Product added to cart!')
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="home">
      <h1>Welcome to ShopEasy</h1>
      <h2>Our Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="products">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && <p>No products found.</p>}
    </div>
  )
}

export default Home
