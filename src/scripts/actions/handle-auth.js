import firebase from 'firebase'

export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILED = 'AUTH_FAILED'

export default (email, password, history) => dispatch => {
  dispatch({
    type: AUTH_LOADING
  })

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: user
      })

      history.push('/')
    })
    .catch((error) => {
      dispatch({
        type: AUTH_FAILED,
        payload: 'Authentication failed.'
      })

      throw error
    })
}
