import './Basket.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

class Basket extends Component {

  state = {
    totalPrice: 0,
    bestOffer: 0,
  }

  componentDidMount() {
    this.calculerPrix(this.props.basket)
  }

  componentWillReceiveProps({ basket }) {
    this.calculerPrix(basket)
  }

  calculerPrix(basket) {
    /* calculate the total price */
    var totalPrice = 0
    Object.keys(basket).forEach((key) => {
      const item = basket[key]
      totalPrice += (item.amount * item.price)
    })
    this.setState({ totalPrice })

    /* calculate the best offer */
    fetch(`https://henri-potier.techx.fr/books/${Object.keys(basket).join()}/commercialOffers`)
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        const bestOffer = this.calculerMeilleurPrix(totalPrice, myJson.offers)
        this.setState({ bestOffer })
      })
  }

  calculerMeilleurPrix(price, offers) {
    const proposedOffers = []
    offers.forEach((offer) => {
      if (offer.type === 'percentage') {
        proposedOffers.push(price - (price * offer.value / 100))
      } else if (offer.type === 'minus') {
        proposedOffers.push(price - offer.value)
      }
      else if (offer.type === 'slice') {
        const slices = Math.floor(price / offer.sliceValue)
        proposedOffers.push(price - slices * offer.value)
      }
    })
    return Math.min(...proposedOffers)
  }

  render() {
    return (
      <aside className="Basket">
        <h1>Mon panier</h1>
        <ul className="Basket__list">
          {Object.keys(this.props.basket).map((key) =>
            <li key={key}>
              <Item item={this.props.basket[key]} />
            </li>
          )}
        </ul>
        <div>
          Total : {this.state.bestOffer}&nbsp;€
        </div>
        <div>
          <button className="Basket__buy">Payer {this.state.bestOffer}&nbsp;€</button>
        </div>
        <div>
        au lieu de <span>{this.state.totalPrice}&nbsp;€</span>
        </div>
      </aside>
    )
  }
}

Basket.propTypes = {
  basket: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default Basket
