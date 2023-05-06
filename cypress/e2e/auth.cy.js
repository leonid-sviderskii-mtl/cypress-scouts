describe('Auth Tests', () => {
  const username = 'username'
  const password = 'password'
  const passwordBase64 = 'cGFzc3dvcmQ='

  it('Signs in via UI', () => {
    cy.loginByUi(username, password);

    cy.visit('/')

    cy.get('#logout2')
      .should('be.visible')

    cy.get('#nameofuser')
      .should('have.text', `Welcome ${username}`)
  })

  it('Signs in via API', () => {
    cy.loginByApi(username, passwordBase64)

    cy.visit('/')

    cy.get('#logout2')
      .should('be.visible')

    cy.get('#nameofuser')
      .should('have.text', `Welcome ${username}`)
  })
})
