import { useReducer, useState } from 'react'
import '../App.css'
import MenuCategory from '../components/menuCategory'
import menuData from '../menuData'
import DailySpecial from '../components/DailySpecial'

// cartReducer function to manage the cart state based on dispatched actions
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item]
    case 'REMOVE_ITEM':
      return state.filter((item, index) => {
        if (typeof action.index === 'number') {
          return index !== action.index
        }
        return item.id !== action.id
      })
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

// useState to manage the search term and filter the menu items based on the search input
function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [note, setNote] = useState('')
  const [confirmedNote, setConfirmedNote] = useState('')
  const [cart, dispatch] = useReducer(cartReducer, [])

  function handleAddToCart(item) {
    dispatch({ type: 'ADD_ITEM', item })
  }

  function handleRemoveFromCart(id) {
    dispatch({ type: 'REMOVE_ITEM', id })
  }

  function handleClearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  function handleNoteSubmit(e) {
    e.preventDefault()
    setConfirmedNote(note)
    setNote('') 
  }

  const filteredMenuData = menuData
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(category => category.items.length > 0) 

  const cartTotal = cart.reduce((total, item) => total + Number(item.price || 0), 0)

  return (
    <div className="App">
      <header>
        <h1>Megan's Munch Lounge</h1>
        <p>Delicious munchies for your enjoyment</p>
        <DailySpecial onAddToCart={handleAddToCart} />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <input
          type="text"
          placeholder="Table number"
          value={tableNumber}
          onChange={e => setTableNumber(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              console.log(`Table ${tableNumber} confirmed`)
            }

            if (e.key === 'Escape') {
              setTableNumber('')
            }
          }}
        />
        {tableNumber && <p>Ordering for Table {tableNumber}</p>}
        <form onSubmit={handleNoteSubmit}>
          <input
            type="text"
            placeholder="Any allergies or requests?"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <button type="submit">Send to Kitchen</button>
        </form>
        {confirmedNote && <p>Kitchen note sent: "{confirmedNote}"</p>}
      </header>
      
      <main className="menu-container">
        {filteredMenuData.map(category => (
          <MenuCategory 
            key={category.category}
            category={category.category}
            items={category.items}
            onAddToCart={handleAddToCart}
          />
        ))}

        <section>
          <h2>Cart ({cart.length})</h2>
          {cart.length === 0 && <p>No items in cart yet.</p>}
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <p>
                {item.name} - ${Number(item.price).toFixed(2)} | Table: {item.tableNumber} | Allergens: {item.allergens}
              </p>
              <button type="button" onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
          <p>Total: ${cartTotal.toFixed(2)}</p>
          {cart.length > 0 && (
            <button type="button" onClick={handleClearCart}>
              Clear Cart
            </button>
          )}
        </section>
      </main>
    </div>
  )
}

export default Home 