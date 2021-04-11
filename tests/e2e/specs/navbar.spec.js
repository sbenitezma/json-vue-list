describe("Display Voice Apps Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should render a Logo Header", () => {
    // Render navbar with logo
    cy.get(".v-app-bar").should("have.class", "theme--dark");
    cy.get("#voicemodLogo").should("be.visible");
    cy.get(".v-image__image").should("have.css", "background-image");
  });
});
