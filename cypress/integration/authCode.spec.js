/// <reference types="cypress" />

context("AuthCode", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("should perform auth code flow", () => {
    authCodeFlow();
    cy.get("div")
      .contains("Auth code:")
      .invoke("text")
      .then((text) => {
        expect(text.split(":")[1].length !== 0).to.be.true;
      });
  });

  it("should get access token", () => {
    authCodeFlow();
    cy.get("button").contains("Get token").click();
    cy.contains("access_token");
  });
});

const authCodeFlow = () => {
  cy.get("button").contains("Authorize").click();
  cy.location("pathname", { timeout: 6000 }).should("include", "/signin");
  cy.get("input").eq(0).type("s");
  cy.get("input").eq(1).type("s");

  cy.get("button").contains("Sign in").click();
  cy.location("pathname", { timeout: 6000 }).should("include", "/allow");
  cy.get("button").contains("Allow").click();
};
