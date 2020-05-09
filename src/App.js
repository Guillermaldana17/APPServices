import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

class App extends Component {
  state = {
    user: [],
    movie: [],
    isFeching: false
  }

  getUser = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json()
        .then(users => this.setState({ user: users })))
  }
  componentDidMount() {
    this.getUser();
  }
  handleSubmit = async (e) => {
    
    e.preventDefault();
    this.setState({ isFeching: true })
    const title = e.target[0].value;
    const URI = 'http://www.omdbapi.com/?i=tt3896198&apikey=5fb8797e';

    /*  const result = await axios.get(URI, {
       params: {
         t: title
       }
     })
     this.setState({
       movie: result.data,
       isFeching:false
     }) */

    const result = await fetch(URI + '&t' + title)
    const movie = await result.json()

    this.setState({
      movie: movie,
      isFeching: false
    })
  }
  handleChange = (event) => {
    event.preventDefault();
    const q = event.target.value;
    const result = this.state.user.filter(
      elem => { return elem.email.toLowerCase().indexOf(q) > -1 }
    )
    this.setState({ user: result })
  }
  render() {
    const { movie, isFeching } = this.state;
    return (
      <div className="App">
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 mt-2 text-center'>
              <h2>Servicios - Peticiones HTTP</h2>
              <hr></hr>
            </div>
            <div className='col-sm-6'>
              <h2>Mis usuarios</h2>
              <form>
                <input
                  onChange={this.handleChange}
                  type='text'
                  name='search'
                  placeholder='Emails'
                  className='form-control'
                >
                </input>

              </form>
              <ul className='mt-2'>
                {this.state.user.map(item => (
                  <li key={item.id}>{item.email}</li>
                )
                )}
              </ul>
            </div>
            <div className='col-sm-6'>
              <div className=''>
                <h2>Buscador de peliculas</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Nombre de peliculas'
                      className='form-control'
                    >
                    </input>
                  </div>
                  <div className='form-group'>
                    <button className='btn btn-success'>
                      Buscar
                  </button>
                  </div>

                </form>
              </div>
              {
                isFeching && (
                  <h1>Cargando...</h1>
                )
              }
              {movie.Title && !isFeching && (
                <div className='card-body'>
                  <h3>{movie.Title}</h3>
                  <p>{movie.Plot}</p>
                  <img src={movie.Poster} alt='Poster' />
                </div>
              )}

            </div>


          </div>
        </div>
      </div>
    )
  }

}

export default App;
