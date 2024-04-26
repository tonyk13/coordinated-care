describe('Admin Patients', () => {
    beforeEach(() => {
      cy.login();
    })
    it('Care Provider Patients', () => {
        cy.get('#continueAsCPtempButton').click();
        cy.get('.MuiListItem-root').contains('Procedures').click();
        cy.get('button').contains('Create New Procedure').click();
        cy.contains('h4', 'Create New Procedure').should('be.visible');
        cy.contains('button', 'Save').should('be.visible');
        cy.contains('button', 'Cancel').should('be.visible');
    });
  })