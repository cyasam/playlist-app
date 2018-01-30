import React, { Component } from 'react'

export const Loadmore = (Component, fetchFunction) => {
  return class Loadmore extends Component {
    render () {
      return Component ? <Component { ...props } /> : null
    }
  }
}