describe('First e2e tests', () => {
  it('Signs in', () => {
    cy.intercept('/config.json').as('config')
    cy.visit('/')
    cy.wait('@config').then((response) => {
      const { API_URL } = response.response.body;
      cy.log(API_URL)
    })

    cy.get('#login2').click();

    cy.get('#loginusername')
      .type('username')
    cy.get('#loginpassword')
      .type('password')

    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
        .click()

    cy.get('#logout2')
      .should('be.visible')
  })
})
