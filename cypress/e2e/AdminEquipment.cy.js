describe("Admin Equipment", () => {
	beforeEach(() => {
		cy.login();
	});
	it("Admin Equipment", () => {
		// cy.get('#continueAsAdmintempButton').click();
		cy.get(".Equipment").click();
		cy.contains("button", "Request").should("be.visible");
		cy.contains("button", "Save").should("be.visible");
		cy.contains("button", "Cancel").should("be.visible");
	});
});
