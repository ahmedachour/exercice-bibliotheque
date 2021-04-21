import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function Library({ books, handleAddToBasket, children }) {
  return (
    <main role="main" className="Library">
      <h1>La bibliothèque d'Henri Potier</h1>
      {children}
      <ul>
        {books.map((book) =>
          <li key={book.isbn}>
            <Book book={book} handleAddToBasket={handleAddToBasket} />
          </li>
        )}
      </ul>
    </main>
  )
}

Library.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleAddToBasket: PropTypes.func.isRequired,
}

export default Library
