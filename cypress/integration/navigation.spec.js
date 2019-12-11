/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('about', () => {
    cy.get('body > header').contains('about').click()

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
  context('tags', () => {
    it('#featured', () => {
      cy.contains('#featured').click()
      cy.get('main > h1').contains('#featured')
    })
    it('#general', () => {
      cy.contains('#general').click()
      cy.get('main > h1').contains('#general')
    })
    it('#js', () => {
      cy.contains('#js').click()
      cy.get('main > h1').contains('#js')
    })
    it('#tutorial', () => {
      cy.contains('#tutorial').click()
      cy.get('main > h1').contains('#tutorial')
    })
    it('#angularjs', () => {
      cy.contains('#angularjs').click()
      cy.get('main > h1').contains('#angularjs')
    })
    it('#crypto', () => {
      cy.contains('#crypto').click()
      cy.get('main > h1').contains('#crypto')
    })
  })
})
