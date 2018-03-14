import React from 'react'
import DocumentTitle from 'react-document-title'
import { setDocumentTitle } from '../helpers'
import LoginForm from '../components/LoginForm'

export const Loginpage = () => {
  const title = setDocumentTitle(`Login`)
  return (
    <DocumentTitle title={title}>
      <LoginForm />
    </DocumentTitle>
  )
}

export default {
  component: Loginpage
}
