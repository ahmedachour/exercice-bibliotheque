import './App.css'
import React, { Component } from 'react'
import Basket from '../Basket/Basket'
import Library from '../Library/Library'
import BooksBuy from '../Library/BooksBuy'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredBooks: [],
      basket: {},
    }
    this.books = []
    this.filter = React.createRef();
  }

  componentDidMount() {
    fetch('https://henri-potier.techx.fr/books')
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        this.books = myJson
        this.setState({ filteredBooks: myJson })
      })
  }

  handleAddToBasket = (book) => {
    const basket = this.state.basket
    if (book.isbn in this.state.basket) {
      basket[book.isbn].amount += 1
    } else {
      basket[book.isbn] = {
        title: book.title,
        price: book.price,
        cover: book.cover,
        amount: 1,
      }
    }
    this.setState({
      basket: basket,
    })
  }

  handleFilter = () => {
    const filter = this.filter.current.value

    var regex = RegExp(`.*${filter}.*`, 'i')

    const books = this.books.filter((book) => {
      return regex.test(book.title)
        || regex.test(book.synopsis.join())
    })

    this.setState({
      filteredBooks: books,
    })
  }

  render() {
    return (
      <div className="App  flex-container">
        <Library books={this.state.filteredBooks} handleAddToBasket={this.handleAddToBasket}>
          <BooksBuy filterRef={this.filter} handleFilter={this.handleFilter} />
        </Library>
        {Object.entries(this.state.basket).length > 0 && <Basket basket={this.state.basket} />}
      </div>
    )
  }
}

export default App
