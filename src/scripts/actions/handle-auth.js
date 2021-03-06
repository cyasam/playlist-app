import firebase from 'firebase'
import axios from 'axios'
import cookie from 'js-cookie'

export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILED = 'AUTH_FAILED'

export const submitLogin = (email, password, history) => dispatch => {
  dispatch(authLoading())

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      axios.post('/api/login', { user }).then(response => {
        dispatch(authSuccess(response.data.auth))

        firebase.auth().currentUser.getIdToken(true)
          .then(idToken => {
            cookie.set('token', idToken, { expires: new Date(new Date().getTime() + 60 * 60 * 1000) })
          })

        setTimeout(() => history.push('/'), 1000)
      })
    })
    .catch((error) => {
      let errorMessage = 'Authentication failed.'
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
        errorMessage = 'Wrong Username or Password.'
      }

      dispatch(authError(errorMessage))

      throw error
    })
}

export const signOut = () => dispatch => {
  dispatch(authLoading())

  firebase.auth().signOut()
    .then(() => {
      dispatch(authSuccess(null))
      cookie.remove('token')
    }).catch(error => {
      dispatch(authError())
      throw error
    })
}

export const authLoading = () => ({
  type: AUTH_LOADING
})

export const authSuccess = auth => ({
  type: AUTH_SUCCESS,
  payload: auth
})

export const authError = error => ({
  type: AUTH_FAILED,
  payload: error
})
