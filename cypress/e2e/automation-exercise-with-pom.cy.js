import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu from '../pages/menu'
import deletar from '../pages/deletar'
import assinatura from '../pages/assinatura'
import compra from '../pages/compra'

describe('Automation Exercise', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Test Case 1: Register User', () => {
    menu.irParaLoginCadastro();
    cadastro.preencherFormulario()
    cadastro.verificarSeCadastroFoiPreenchido();
    deletar.deletarUsuario();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    cy.get('.header-middle > .container > .row').should('contain', 'Home');

    menu.irParaLoginCadastro();

    cy.get('.signup-form > h2').should('be.visible');

    login.preencherLogin('tester1723083127376pgats@ymail.com', 'tester123')

    cy.contains('Logged in as Tester123');
    cy.get('i.fa-user').parent().should('contain', 'Tester123');
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.get('.header-middle > .container > .row').should('contain', 'Home');

    menu.irParaLoginCadastro();

    cy.get('.signup-form > h2').should('be.visible');

    login.preencherLogin('tester1723083127376pgats@ymail.com', 'tester1234')

    cy.get('.login-form form p').should(
      'contain',
      'Your email or password is incorrect!'
    );
  });

  it('Test Case 4: Logout User', () => {
    cy.get('.header-middle > .container > .row').should('contain', 'Home');

    menu.irParaLoginCadastro();

    cy.get('.signup-form > h2').should('be.visible');

    login.preencherLogin('tester1723083127376pgats@ymail.com', 'tester123')

    cy.contains('Logged in as Tester123');
    cy.get('i.fa-user').parent().should('contain', 'Tester123');

    login.deslogar();
    cy.url().should('contain', 'login');
  });

  it('Test Case 5: Register User with existing email', () => {
    menu.irParaLoginCadastro();
    cadastro.iniciarCadastro('tester1723083127376pgats@ymail.com');

    cy.get('.signup-form form p')
      .should('be.visible')
      .and('contain', 'Email Address already exist!');
  });

  it('Test Case 6: Contact Us Form', () => {
    menu.irParaContactar();
    cadastro.preencherFormularioParaContactar();

    cy.get('.status').should(
      'have.text',
      'Success! Your details have been submitted successfully.'
    );
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.irParaProdutos();

    cy.url().should('contain', 'products');

    cy.get('.title').should('be.visible').and('contain', 'All Products');

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1);

    cy.get('.single-products')
      .first()
      .parent()
      .contains('View Product')
      .click();

    cy.get('.product-information > h2').should('be.visible'); // Product name
    cy.get('.product-information p').should('be.visible').and('have.length', 4); // Product details like category, price, availability, etc.
    cy.get('.product-information span span').should('be.visible'); // Additional product details like price
  });

  it('Test Case 9: Search Product', () => {
    menu.irParaProdutos();
    cy.url().should('contain', 'products');

    cy.get('.title').should('be.visible').and('contain', 'All Products');

    cy.get('input#search_product').type('Shirt');
    cy.get('button#submit_search').click();

    cy.get('.title').should('be.visible').and('contain', 'Searched Products');

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1);
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    assinatura.assinar();

    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const timestamp = new Date().getTime(); // Generate a unique timestamp
    const nome = 'teste'+timestamp+'@ymail.com';

    cy.get('[href$="login"]').click();

    cadastro.iniciarCadastro(nome)

    cadastro.preencherCadastro();

    cy.get('b').should('contain', 'Account Created!');
    cy.url().should('include', 'account_created');

    cy.get('[data-qa="account-created"]').should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    cy.get('b').should('contain', "Tester QA");

    compra.adicionarAoCarrinho();

    compra.realizarCompra();

    cy.get('[data-qa="order-placed"]').should('be.visible');

    deletar.deletarUsuario();
  });
});