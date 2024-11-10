import { faker } from '@faker-js/faker'

class Comprar{
    adicionarAoCarrinho(){
        cy.contains('Add to cart').click();
        cy.contains('View Cart').click();
    }

    realizarCompra(){
        cy.get('.btn-default.check_out').should('be.visible').click();

        cy.get('.heading').first().should('have.text', 'Address Details');

        cy.get('.heading').last().should('have.text', 'Review Your Order');

        cy.get('.form-control').type('378 98562-8781');

        cy.get('.btn-default.check_out').click();

        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
        cy.get('[data-qa="expiry-month"]').type('12');
        cy.get('[data-qa="expiry-year"]').type('2035');

        cy.get('[data-qa="pay-button"]').click();
    }
}
export default new Comprar();