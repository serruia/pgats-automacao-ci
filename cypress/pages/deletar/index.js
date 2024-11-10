class Deletar{
    deletarUsuario(){
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
        cy.get('b').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();

        return this
    }
}
export default new Deletar()