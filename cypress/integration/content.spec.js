/// <reference types="Cypress" />

context('Content', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('posts', () => {
    cy.get('body > header').contains('posts').click()

    cy.location('pathname').should('include', 'posts')

    cy.get('body').get('.post-link')
  })
  it('about', () => {
    cy.get('body > header').contains('about me').click()

    cy.location('pathname').should('include', 'about')
  })
})
