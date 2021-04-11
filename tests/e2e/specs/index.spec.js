describe("Display Voice Apps Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should render Navbar", () => {
    cy.get("#voicemodLogo").should("be.visible");
  });

  it("Should render Tabs Menu", () => {
    cy.get(".v-tabs").should("be.visible");
    cy.get(".v-tab.v-tab--active").should("be.visible");
    cy.get(".v-window-item--active").should("be.visible");
  });

  it("Current Active tab should be Active Voice App", () => {
    cy.get(".v-card__title.headline").should("be.visible");
    cy.contains("#activeVoiceAppTitle", "Active Voice App");
  });

  it("Current Active tab should be Active Voice App", () => {
    cy.contains("#activeVoiceAppText", "No active app selected");
  });

  it("Display how many apps are showing Title", () => {
    cy.contains("#showingAppsText", "Showing (89/89)");
  });

  it("Display filters section", () => {
    cy.get("#filtersSectionGrid").should("be.visible");
    cy.get("#activeApp").should("not.exist");
  });

  it("Display Apps section and validate it renders 89 Voice Apps", () => {
    cy.get("#showAppsGrid").should("be.visible");
    cy.get("#showAppsGrid")
      .find(".col-sm-4.col-md-2")
      .should("have.length", "89");
  });
});
