/// <reference types="Cypress" />

context('Content', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('about', () => {
    cy.get('body > header').contains('about').click()

    cy.location('pathname').should('include', 'about')
  })

  it('visible featured posts', () => {
    cy.get('body').contains('Featured blog posts')
  })

  describe('single post', () => {
    beforeEach(() => {
      cy.get('.post-item a').eq(0).click()
    })
    it('navigates to /posts/{post-slug}', () => {
      cy.location('pathname').should('include', 'posts')
    })
    it('visible title', () => {
      cy.get('article .title')
    })
    it('visible article tags', () => {
      cy.get('article .tags')
      cy.get('[href="/tags/post"]')
    })
    it('visible ad', () => {
      cy.get('#carbonads-container')
    })
    it('visible twitter share button', () => {
      cy.get('#twitter-widget-0')
    })
  })
})
