/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080')
  })

  it('about', () => {
    cy.get('body > nav').contains('About').click()

    cy.location('pathname').should('include', 'about')
  })
  it('posts', () => {
    cy.get('body > nav').contains('Posts').click()

    cy.location('pathname').should('include', 'posts')
  })
  context('links', () => {
    it('social', () => {
      cy.get('body > footer').contains('twitter')
    })
    it('edit page', () => {
      cy.visit('http://127.0.0.1:8080/posts')

      cy.get('body > footer').contains('Edit this page on GitHub')
    })
  })
})
