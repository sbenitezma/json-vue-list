describe("Display Voice Apps Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  context("Voices Apps Rendering validation", () => {
    it("Each card should contain base Voice App info", () => {
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "89");
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .each(($el, $id) => {
          if ($id < 10) {
            cy.wrap($el).find(".v-avatar").should("be.visible");
            cy.wrap($el)
              .find(".v-avatar")
              .find(".v-image")
              .should("have.class", "custom-icon");
            cy.wrap($el)
              .find(".v-avatar")
              .find(".v-image")
              .should("have.attr", "id");
            cy.wrap($el).find(".v-card__title").should("be.visible");
            cy.wrap($el).find(".v-card__title").should("be.visible");
            cy.wrap($el).find(".v-card__subtitle").should("be.visible");
            cy.wrap($el)
              .find(".v-image")
              .should("be.visible")
              .should("have.css", "background-image");
          }
        });
    });
  });
  context("Voices Apps Rendering validation", () => {
    it("Select favourite first and third Voice App and validate in Favourite voice apps Section", () => {
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "89");
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .each(($el, $id) => {
          if ($id === 0) {
            cy.wrap($el).find("#favouriteOffGrid-2x1").click();
          }
          if ($id === 2) {
            cy.wrap($el).find("#favouriteOffGrid-adult-to-children").click();
          }
        });
      cy.get("#favApps").click();
      cy.get(".v-data-table").find("tr").should("have.length", 3);
    });
  });
  context("Voices Apps Rendering validation", () => {
    it("Select active first app and validate app is set to Active Voice apps", () => {
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "89");
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .each(($el, $id) => {
          if ($id === 0) {
            cy.wrap($el).click();
          }
        });
      cy.get("#activeApp")
        .should("be.visible")
        .find(".v-card__title")
        .should("be.visible")
        .contains("2x1");
    });
  });
});
