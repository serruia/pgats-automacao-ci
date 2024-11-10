class Menu{
    irParaProdutos(){
        cy.contains('Products').click();
    }

    irParaLoginCadastro(){
        cy.contains('Signup').click();
    }

    irParaContactar(){
        cy.contains('Contact us').click();
    }
}
export default new Menu()