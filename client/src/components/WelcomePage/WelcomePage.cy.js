import React from 'react'
import WelcomePage from './WelcomePage'

describe('<WelcomePage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WelcomePage />)
  })
})