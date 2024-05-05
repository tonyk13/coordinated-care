describe("Faculty Info", () => {
	beforeEach(() => {
		cy.login();
	});
	it("faculty-page", () => {
		// cy.get('#continueAsAdmintempButton').click();
		cy.get(".Faculty-Staff").click();
		cy.contains("button", "Add New Faculty/Staff").should("be.visible");
	});
});
