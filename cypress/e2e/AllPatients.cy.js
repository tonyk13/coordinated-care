describe("All Patients", () => {
	beforeEach(() => {
		cy.login();
	});
	it("All Patients", () => {
		// cy.get("#continueAsAdmintempButton").click();

		cy.get(".Patients").click();

		// cy.contains("button", "Add new Patient").should("be.visible");

		cy.get("#search").type("search");
	});
});
