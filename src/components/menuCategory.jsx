import MenuItem from './menuItem'

function MenuCategory({ category, items, onAddToCart }) {
  return (
    <div className="menu-category">
      <h2>{category}</h2>
      <div className="items-container">
        {items.map(item => (
          <MenuItem 
            key={item.id}
            item={item}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuCategory