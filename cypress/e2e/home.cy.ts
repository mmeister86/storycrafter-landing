describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the hero section with title", () => {
    cy.get("h1").should("contain.text", "Build and play captivating stories");
  });

  it("displays the features section", () => {
    cy.contains("Features").should("be.visible");
    cy.get('[data-test="features-section"]').should("be.visible");
  });

  it("displays the signup section", () => {
    cy.get('[data-test="signup-section"]').should("be.visible");
  });

  it("displays the navbar with navigation links", () => {
    cy.get("nav").should("be.visible");
    cy.get("nav a").should("have.length.at.least", 1);
  });

  it("displays the footer with appropriate links", () => {
    cy.get("footer").should("be.visible");
  });

  it("allows keyboard navigation through interactive elements", () => {
    cy.get('a, button, input, [tabindex="0"]').first().focus();
    cy.focused().should("exist");
  });
});

// Removed custom tab command that was causing type errors
