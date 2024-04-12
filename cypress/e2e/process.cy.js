describe('Processes Screen', () => {
    beforeEach(() => {

      cy.visit('https://coordinated-care-cce88007d728.herokuapp.com')
    })
    it('should render table when processes is clicked', () => {
      cy.contains('.Processes').click();
      cy.get('#questionsButton').should('be.visible');
      
      it('should verify Searchbar element is visible', () => {
        cy.get('input#search').should('be.visible', { timeout: 5000 });
      });
    
      it('should verify Table element is visible', () => {
        cy.get('[component="Paper"]').should('be.visible', { timeout: 5000 });
      });
        
    });
  
  })