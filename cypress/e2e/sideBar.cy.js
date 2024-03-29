describe('Side bar', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('https://coordinated-care-cce88007d728.herokuapp.com')
    })
    it('should render side bar when guest button is clicked', () => {
      cy.get('.guestButton').click();

      cy.get('#questionsButton').should('be.visible');
      cy.get('#tagsButton').should('be.visible');
      cy.get('#userProfileButton').should('be.visible');
        
    });
  
  })