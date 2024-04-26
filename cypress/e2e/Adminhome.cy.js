describe('Admin Home', () => {
    beforeEach(() => {
      cy.login();
    })
    it('Admin Home', () => {
        cy.get('#continueAsAdmintempButton').click();
        cy.get('.Home').click();
        cy.contains('button', 'Create New Process').should('be.visible');
    });
  })