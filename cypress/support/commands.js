Cypress.Commands.add('loginByUi', (username, password) => {
    // cy.session(`UI Login: ${username}`, () => {
        cy.visit('/')

        cy.get('#login2').click();

        cy.get('#loginusername')
            .invoke('val', username)

        cy.get('#loginpassword')
            .invoke('val', password)

        cy.intercept('/login').as('login');
        
        cy.wait(2000)

        cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
            .click()

        cy.wait('@login')

        cy.get('#nameofuser')
            .should('have.text', `Welcome ${username}`)

        cy.getCookie('tokenp_')
            .should('exist');
    // }, {
    //         validate() {
    //             cy.request('/')
    //             cy.getCookie('tokenp_')
    //                 .should('exist')
    //         },
    //         cacheAcrossSpecs: true,
    //     });
});

Cypress.Commands.add('loginByApi', (username, password) => {
    cy.session(`API Login: ${username}`, () => {
        cy.request({
            url: 'https://api.demoblaze.com/login',
            method: 'POST',
            body: {
                username,
                password
            },
        }).then((response) => {
                cy.log(response.body)
                const body = response.body
                const token = body.replace(/Auth_token: /, '')
                cy.setCookie('tokenp_', token)
            })

            cy.request('/')
            cy.getCookie('tokenp_')
                .should('exist')
    }, {
            validate() {
                cy.request('/')
                cy.getCookie('tokenp_')
                    .should('exist')
            },
            cacheAcrossSpecs: true,
        });
});
