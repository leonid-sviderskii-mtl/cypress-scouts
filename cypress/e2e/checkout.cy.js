describe('Checkout Tests', () => {
    it('Successfully purchases a product', () => {
        // open website
        cy.visit('/');

        cy.contains('.card-title a', 'Samsung galaxy s6').click();

        cy.url().should('include', '/prod.html');

        // add product to cart
        cy.contains('.btn', 'Add to cart').click();

        // go to cart
        cy.contains('#cartur', 'Cart').click();

        // click Place Order button
        cy.contains('.btn', 'Place Order').click();

        // fill all text fields
        const name = 'testName';
        const country = 'Norway';
        const city = 'Bergen';
        const card = '1111222233334444';
        const month = '07';
        const year = '2025';

        cy.get('#name').invoke('val', name);
        cy.get('#country').invoke('val', country);
        cy.get('#city').invoke('val', city);
        cy.get('#card').invoke('val', card);
        cy.get('#month').invoke('val', month);
        cy.get('#year').invoke('val', year);

        // click Purchase button
        cy.contains('.btn', 'Purchase').click();

        /* wait is set here because the "success tick" animation should be finished or something else before "OK" button is clicked,
        otherwise Place order modal winow is not closed, and there is no redirection to ~/index.html page */
        cy.wait(1000);

        // click OK button
        cy.get('button.confirm').contains('OK').click();

        // check if redirect to home page has happened
        cy.url().should('eq', Cypress.config().baseUrl + '/index.html');
    })
})
