describe('[shopify-theme] search header', () => {
  it ('returns result upon search', () => {
    cy.visit('http://localhost:3000')

    cy.get('.sf-search-bar__input').type('blouse')

    cy.get('.results-listing').children().should('have.length', 2)
  })
})