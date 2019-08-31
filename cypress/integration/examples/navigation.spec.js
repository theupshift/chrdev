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
    it('work', () => {
      cy.get('body > header').contains('pomodoro.cc')
      cy.get('body > header').contains('wonderflow')
    })
    it('social', () => {
      cy.get('body > header').contains('twitter')
      cy.get('body > header').contains('linkedin')
    })
    it.skip('edit page', () => {
      cy.get('body > header').contains('Edit this page on GitHub')
    })
  })
})
