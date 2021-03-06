import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import { submitLogin } from '../actions/handle-auth'

export class LoginForm extends Component {
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

    const { history } = this.props
    const { email, password } = this.state
    this.props.submitLogin(email, password, history)
  }

  renderLoginSuccess () {
    return (
      <div className='success-message alert alert-success' role='alert'>You have logged in successfully.</div>
    )
  }

  renderLoginError (error) {
    return (
      <div className='error-message alert alert-danger' role='alert'>{ error }</div>
    )
  }

  render () {
    const { loading, auth, error } = this.props
    return (
      <Fragment>
        { loading && <Loading /> }
        <form onSubmit={this.handleSubmit} style={{ display: loading ? 'none' : 'block' }}>
          { auth && this.renderLoginSuccess() }
          { error && this.renderLoginError(error) }
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
      </Fragment>
    )
  }
}

export const mapStateToProps = state => ({
  loading: state.authentication.loading,
  auth: state.authentication.auth,
  error: state.authentication.error
})

LoginForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object,
  error: PropTypes.string,
  submitLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, { submitLogin })(LoginForm))
