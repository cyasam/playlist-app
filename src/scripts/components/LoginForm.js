import React, { Component } from 'react'

class LoginForm extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' className='form-control' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
        </div>
        <button className='btn btn-secondary' type='submit'>Login</button>
      </form>
    )
  }
}

export default LoginForm
