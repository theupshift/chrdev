/// <reference types="Cypress" />

context('Content', () => {
  it('about', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('body > nav').contains('About').click()

    cy.location('pathname').should('include', 'about')
  })

  it('visible featured posts', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('.featured-post')
  })

  describe('single post', () => {
    before(() => {
      cy.visit('http://127.0.0.1:8080')

      cy.get('.featured-post').eq(0).click()
    })

    it('navigates to /posts/{post-slug}', () => {
      cy.location('pathname').should('include', 'posts')
    })
    it('visible twitter share button', () => {
      cy.get('.twitter-share-button')
    })
  })
})
