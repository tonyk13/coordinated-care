describe('Admin Patients', () => {
    beforeEach(() => {
      cy.login();
    })
    it('Care Provider Patients', () => {
        cy.get('#continueAsCPtempButton').click();
        cy.get('.MuiListItem-root').contains('Patients').click();
        cy.contains('button', 'Add new Patient').should('be.visible');
    });
  })