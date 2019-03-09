import React, { Component } from 'react'
import axios from 'axios'
const url = 'https://api.unsplash.com/search/photos'
const clientId = '5e74af5e15bf5862c6e660af09deabc1f561e27a64c3705a93d9936bc077bd88'

class App extends Component {
  constructor () {
    super()
    this.state = {
      search: '',
      photos: [],
      selected: ''
    }
  }

  componentDidMount () {
    axios
      .get(`${url}/?client_id=${clientId}&query=plants%20${this.state.search}`)
      .then(({ data }) => this.setState({ photos: data.results }))
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    axios
      .get(`${url}/?client_id=${clientId}&query=plants%20${this.state.search}`)
      .then(({ data }) => this.setState({ photos: data.results }))
  }

  handleClick = (e) => {
    this.setState({
      selected: e.target.src
    })
  }

  render () {
    return (
      <div className='App'>
        <div>
        <h4>Selected Image</h4>
          {this.state.selected && <img height='300' width='300' style={{ border: `2px solid hotpink` }} src={this.state.selected} />}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='search for a plant'
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        <ul>
          {this.state.photos &&
            this.state.photos.map((photo, index) => (
              <div key={index}>
                <img height='200' width='200' src={photo.urls.regular} onClick={this.handleClick} />
              </div>
            ))}
        </ul>
      </div>
    )
  }
}

export default App
