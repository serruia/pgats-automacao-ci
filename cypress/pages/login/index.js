class Login{
    preencherLogin(user, password){
        cy.get('[data-qa="login-email"]').type(user);
        cy.get('[data-qa="login-password"]').type(password, { log: false });
        cy.get('[data-qa="login-button"]').click();
    }

    deslogar(){
        cy.contains('Logout').click();
    }
}
export default new Login()