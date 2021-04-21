import './BooksBuy.css'
import React from 'react'
import PropTypes from 'prop-types'

function BooksBuy({ filterRef, handleFilter }) {
  return (
    <form className="BooksBuy" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="BooksBuy__filter">
        Rechercher des livres :&nbsp;
      </label>
      <input
        className="BooksBuy__filter"
        onChange={handleFilter}
        id="BooksBuy__filter"
        name="BooksBuy__filter"
        ref={filterRef}
        type="text"
      />

    </form>
  )
}

BooksBuy.propTypes = {
  filterRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleFilter: PropTypes.func.isRequired,
}

export default BooksBuy
