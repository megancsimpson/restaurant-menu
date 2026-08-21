import { useState } from 'react'
import Button from '@mui/material/Button'
import styles from './menuItem.module.css'
import { Link } from 'react-router-dom'


function MenuItem({ item, name, price, description, onAddToCart }) {

  const [yumCount, setYumCount] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  return (

    <div
      className={`${styles.menuItem} ${isHovering ? styles.hovering : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      <div className={styles.itemHeader}>

        <h3><Link to={`/menu/${item.id}`}>{name}</Link></h3>

        <span className="price">${price}</span>

      </div>

      <p className="description">{description}</p>
    
      <Button variant="text" onClick={() => setYumCount(yumCount + 1)}>

        😋 Yum! ({yumCount})

      </Button>

      <Button variant="text" onClick={() => onAddToCart(item)}>

        Add to Cart

      </Button>

    </div>

  )
}
export default MenuItem