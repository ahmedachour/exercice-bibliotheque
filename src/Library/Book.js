import './Book.css'

import React from 'react'
import PropTypes from 'prop-types'

function Book({ book, handleAddToBasket }) {
  return (
    <article className="Book">
      <img className="Book__cover" src={book.cover} alt="" />
      <div className="Book__content">
        <h2 className="h3-like">{book.title}</h2>
        <h4>{book.price} €</h4>
        <button className="Book__button" type="button" onClick={() => handleAddToBasket(book)}>Acheter</button>
      </div>
    </article>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  handleAddToBasket: PropTypes.func.isRequired,
}

export default Book
