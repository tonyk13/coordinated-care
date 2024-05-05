describe("Processes Page", () => {
	beforeEach(() => {
		cy.login();
	});

	it("should display the processes table and interact with elements", () => {
		cy.get(".Home").click();

		cy.get("#search").should("be.visible");
		cy.get("button").contains("Create New Process").should("be.visible");

		cy.get("table").should("be.visible");
		cy.get("thead > tr").find("th").as("headers").should("have.length", 9);
		cy.get("@headers").eq(0).should("contain", "Name");
		cy.get("@headers").eq(1).should("contain", "Date of Birth");

		cy.get("@headers").eq(0).click();
		cy.get("@headers").eq(0).click();

		cy.get(".MuiPagination-root").should("be.visible");

		cy.get("tbody > tr").first().find("td").first().click();

		cy.get("#search").should("be.visible");
		cy.get("button").contains("Create New Process").should("be.visible");
		cy.get("table").should("be.visible");
	});
});
