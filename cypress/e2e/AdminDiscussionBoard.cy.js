describe("Admin Discussion Board", () => {
	beforeEach(() => {
		cy.login();
	});
	it("Admin Discussion Board", () => {
		// cy.get('#continueAsAdmintempButton').click();
		cy.get(".Discussion-Board").click();
		cy.contains("button", "Add Post").should("be.visible");
	});
});
