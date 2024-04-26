describe('Admin Patients', () => {
    beforeEach(() => {
      cy.login();
    })
    it('Admin Patients', () => {
        cy.get('#continueAsAdmintempButton').click();
        cy.get('.Patients').click();
        cy.contains('button', 'Add new Patient').should('be.visible');
    });
  })