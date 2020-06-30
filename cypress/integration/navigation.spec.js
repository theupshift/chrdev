/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080')
  })

  it('about', () => {
    cy.get('body > nav').contains('about').click()

    cy.location('pathname').should('include', 'about')
  })
  it('archive', () => {
    cy.get('body > nav').contains('archive').click()

    cy.location('pathname').should('include', 'archive')
  })
  it('pocket', () => {
    cy.visit('http://127.0.0.1:8080/pocket')

    cy.get('body').contains('My Pocket reading list')
  })
  context('links', () => {
    it('social', () => {
      cy.get('body > footer').contains('twitter')
      cy.get('body > footer').contains('linkedin')
    })
    it('edit page', () => {
      cy.visit('http://127.0.0.1:8080/posts')

      cy.get('body > footer').contains('Edit this page on GitHub')
    })
  })
})
