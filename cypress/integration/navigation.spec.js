/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('about', () => {
    cy.get('body > header').contains('about me').click()

    cy.location('pathname').should('include', 'about')
  })
  it('posts', () => {
    cy.get('body > header').contains('posts').click()

    cy.location('pathname').should('include', 'posts')
  })
  context('links', () => {
    it('social', () => {
      cy.get('body > footer').contains('twitter')
      cy.get('body > footer').contains('linkedin')
    })
    it('edit page', () => {
      cy.visit('http://localhost:8080/posts')

      cy.get('body > footer').contains('Edit this page on GitHub')
    })
  })
})
