describe("Admin Rooms", () => {
	beforeEach(() => {
		cy.login();
	});
	it("Admin Rooms", () => {
		// cy.get('#continueAsAdmintempButton').click();
		cy.get(".Rooms").click();
		cy.contains("button", "Request").should("be.visible");
		cy.contains("button", "Edit").should("be.visible");
		cy.contains("button", "Cancel").should("be.visible");
	});
});
