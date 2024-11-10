class Cadastro{
    preencherFormulario(){
        const timestamp = new Date().getTime();

        //cy.get('#slider-carousel > .carousel-inner').should('be.visible');
        //cy.get('.header-middle > .container > .row').should('contain', 'Home');

        cy.get('.signup-form > h2').should('be.visible');

        const signUpName = 'Tester123';

        Cypress.env('signUpName', signUpName)

        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'));
        cy.get('[data-qa="signup-email"]').type(
        `tester${timestamp}pgats@ymail.com`
        );

        cy.contains('button', 'Signup').click();

        cy.get(':nth-child(1) > b').should('be.visible');

        cy.get('#id_gender1').check();
        cy.get('[data-qa="password"]').type('tester123', { log: false });
        cy.get('[data-qa="days"]').select('1');
        cy.get('[data-qa="months"]').select('4');
        cy.get('[data-qa="years"]').select('1995');

        cy.get('#newsletter').check();

        cy.get('#optin').check();

        cy.get('[data-qa="first_name"]').type('Tester');
        cy.get('[data-qa="last_name"]').type('PGATS');
        cy.get('[data-qa="company"]').type('PGATS_AUTOMATION');
        cy.get('[data-qa="address"]').type('Av. Brazil');
        cy.get('[data-qa="address2"]').type('123123');
        cy.get('[data-qa="country"]').select('Canada');
        cy.get('[data-qa="state"]').type('Amazonas');
        cy.get('[data-qa="city"]').type('Manaus');
        cy.get('[data-qa="zipcode"]').type('123123');
        cy.get('[data-qa="mobile_number"]').type('123321123123');

        cy.get('[data-qa="create-account"]').click();

        cy.url().should('includes', 'account_created'); //https://www.automationexercise.com/account_created
        cy.get('[data-qa="account-created"]').should('be.visible');

        cy.get('[data-qa="continue-button"]').click();

        return this
    }

    iniciarCadastro(user){
        cy.get('[data-qa="signup-name"]').type('Tester QA');
        cy.get('[data-qa="signup-email"]').type(user);
        cy.contains('button', 'Signup').click();

        return this
    }

    preencherFormularioParaContactar(){
        cy.get('.contact-form h2')
      .should('be.visible')
      .and('have.text', 'Get In Touch');

        cy.get('[data-qa="name"]').type('Tester');
        cy.get('[data-qa="email"]').type('tester-qa@mail.com');
        cy.get('[data-qa="subject"]').type('Test Automation');
        cy.get('[data-qa="message"]').type('Learning Test Automation');

        cy.fixture('example.json').as('arquivo');
        cy.get('input[name="upload_file"]').selectFile('@arquivo');

        cy.get('[data-qa="submit-button"]').click();

        return this
    }

    verificarSeCadastroFoiPreenchido(){
        cy.contains(`Logged in as ${Cypress.env('signUpName')}`);

        return this
    }

    preencherCadastro(){
        cy.get('input[type="radio"]').eq(0).check(); // Select gender
        cy.get('[data-qa="password"]').type('teste123', { log: false }); // Set a password

        cy.get('[data-qa="days"]').select('25');
        cy.get('[data-qa="months"]').select('5'); // May
        cy.get('[data-qa="years"]').select('1989');

        cy.get('input[type="checkbox"]#newsletter').check();
        cy.get('input[type="checkbox"]#optin').check();

        cy.get('[data-qa="first_name"]').type('Tony');
        cy.get('[data-qa="last_name"]').type('Stark');
        cy.get('[data-qa="company"]').type('Stark Industries');
        cy.get('[data-qa="address"]').type('10880 Malibu Point');
        cy.get('[data-qa="address2"]').type('Suite 1');
        cy.get('[data-qa="country"]').select('United States');
        cy.get('[data-qa="state"]').type('California');
        cy.get('[data-qa="city"]').type('Los Angeles');
        cy.get('[data-qa="zipcode"]').type('90265');
        cy.get('[data-qa="mobile_number"]').type('378 98562-8781');

        cy.get('[data-qa="create-account"]').click();
    }

}
export default new Cadastro()