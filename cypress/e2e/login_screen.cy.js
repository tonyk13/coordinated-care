import LoginButton from "../../client/src/c.c_components/Login/LoginButton.js";

describe("Login Screen", () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit("https://coordinated-care-cce88007d728.herokuapp.com");
	});
	it("should render coordinated care title", () => {
		cy.get(".login_app_name").should("exist");
		cy.get(".login_app_name").contains("Coordinated Care");
	});
	it("should render motto", () => {
		cy.get(".motto").should("exist");
	});
	it("should render login button", () => {
		cy.get(LoginButton).should("exist");
	});
});
