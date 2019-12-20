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
    cy.get('body > header').contains('about').click()

    cy.location('pathname').should('include', 'about')
  })

  describe('single post', () => {
    beforeEach(() => {
      cy.get('.post-link').eq(0).click()
    })

    it('navigates to /posts/{post-slug}', () => {
      cy.location('pathname').should('include', 'posts')
    })
    it('visible title', () => {
      cy.get('article > .title')
    })
    it('visible article info', () => {
      cy.get('article > .info')
    })
    it('visible article tags', () => {
      cy.get('article > .tags')
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
