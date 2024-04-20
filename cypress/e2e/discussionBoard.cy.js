describe("Discussion Board", () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit("https://coordinated-care-cce88007d728.herokuapp.com");
	});
	it("should render discussion board header", () => {
		cy.get(".discussionBoardHeader").should("exist");
		cy.get(".discussionBoardHeader").contains("Discussion Board");
	});
	it("should render add post button", () => {
		cy.get(".addPostButton").should("exist");
	});
	it("should render posts header", () => {
		cy.get(".postsHeader").should("exist");
		cy.get(".postsHeader").contains("Posts");
	});
	it("should render list of discussion posts", () => {
		cy.get(".listOfDiscussionPosts").should("exist");
	});
});
