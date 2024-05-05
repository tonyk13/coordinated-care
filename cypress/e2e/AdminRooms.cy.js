describe("Admin Rooms", () => {
	beforeEach(() => {
		cy.login();
	});
	it("Admin Rooms", () => {
		cy.get(".Rooms").click();

		cy.get("h2").contains("Rooms").should("be.visible");

		cy.get('input[type="search"]').should("have.id", "search");
		cy.get("#search").should("be.visible");

		cy.get("table").should("be.visible");
		cy.get("thead > tr").within(() => {
			cy.get("th").eq(0).should("contain", "Room Number");
			cy.get("th").eq(1).should("contain", "Status");
			cy.get("th").eq(2).should("contain", "Notes");
			cy.get("th").eq(3).should("contain", "Next Available");
		});

		cy.get("tbody > tr").its("length").should("be.gt", 0);
	});
});
