describe("Display Voice Apps Application", () => {
  beforeEach(() => {
    // visit Voices App
    cy.visit("/");
  });
  it("Should render voices app", () => {
    // Render navbar
    cy.get("#voicemodLogo").should("be.visible");
    // Render tabs and active tab
    cy.get(".v-tabs").should("be.visible");
    cy.get(".v-tab.v-tab--active").should("be.visible");
    cy.get(".v-window-item--active").should("be.visible");
    // Render Header of current active tab
    cy.get(".v-card__title.headline").should("be.visible");
    cy.contains("#activeVoiceAppTitle", "Active Voice App");
    cy.contains("#activeVoiceAppText", "No active app selected");
    // Render showing all apps number
    cy.contains("#showingAppsText", "Showing (89/89)");
    // Render filters with icons
    cy.get("#searchAppByNameGrid").should("be.visible");
    cy.get("#searchIconGrid").should("be.visible");
    cy.get("#searchCloseGrid").should("be.visible");
    cy.get("#searchByTagGrid").should("be.visible");
    cy.get("#filterIconGrid").should("be.visible");
    cy.get("#selectArrowTagsGrid").should("be.visible");
    cy.get("#sortAppsGrid").should("be.visible");
    cy.get("#orderIconGrid").should("be.visible");
    cy.get("#selectArrowSortGrid").should("be.visible");
    cy.get("#selectRandomApp").should("be.visible");
    cy.get("#showAppsGrid").should("be.visible");
  });

  //cy.get('.datatable').find('tr').should('have.length', 4)
});
