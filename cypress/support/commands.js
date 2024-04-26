// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    cy.visit(Cypress.env('REACT_APP_API_URL')); // will use env variables to avoid hardcoded data and security vulnerability

    cy.get('.login_button').click(); 
  

    cy.origin('https://dev-crsl7fds3e2pp8gg.us.auth0.com', () => {
        cy.get('input[name="username"]').type('cse416.coordinatedcare@gmail.com');
        cy.get('input[name="password"]').type('cse416@coordinated');
        cy.get('button[type="submit"]').click();
    });
    
  });