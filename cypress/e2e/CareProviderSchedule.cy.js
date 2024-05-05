describe("Admin Patients", () => {
	beforeEach(() => {
		cy.care_provider_login();
	});
	it("Care Provider Patients", () => {
		cy.get(".MuiListItem-root").contains("Schedule").click();
        cy.get('.DpCalendar').should('exist');
		cy.get('.DpCalendar').should('be.visible');
	});
});
