import firebase from 'firebase'

export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILED = 'AUTH_FAILED'

export const submitLogin = (email, password, history) => dispatch => {
  dispatch(authLoading())

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(authSuccess(user))

      setTimeout(() => history.push('/'), 1000)
    })
    .catch((error) => {
      dispatch(authError('Authentication failed.'))

      throw error
    })
}

export const checkAuth = () => dispatch => {
  dispatch(authLoading())

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(authSuccess(user))
    } else {
      dispatch(authError())
    }
  })
}

export const authLoading = () => ({
  type: AUTH_LOADING
})

export const authSuccess = user => ({
  type: AUTH_SUCCESS,
  payload: user
})

export const authError = error => ({
  type: AUTH_FAILED,
  payload: error
})
