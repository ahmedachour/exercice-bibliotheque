import React from 'react'
import PropTypes from 'prop-types'

function Item({ item }) {
  return (
    <div className="Item  flex-container">
      <span className="w80  prs">{item.title}</span>
      <span className="w20  txtright">{item.amount}&nbsp;x&nbsp;{item.price}&nbsp;€</span>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}

export default Item
