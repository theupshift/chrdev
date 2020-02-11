/// <reference types="Cypress" />

context('Content', () => {
  it('about', () => {
    cy.visit('http://localhost:8080')

    cy.get('body > header').contains('about').click()

    cy.location('pathname').should('include', 'about')
  })

  it('visible featured posts', () => {
    cy.visit('http://localhost:8080')

    cy.get('body').contains('Featured blog posts')
  })

  describe('single post', () => {
    before(() => {
      cy.visit('http://localhost:8080')

      cy.get('.featured-post').eq(0).click()
    })

    it('navigates to /posts/{post-slug}', () => {
      cy.location('pathname').should('include', 'posts')
    })
    it('visible ad', () => {
      cy.get('#carbonads-container')
    })
    it('visible twitter share button', () => {
      cy.get('#twitter-widget-0')
    })
  })
})
