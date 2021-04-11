describe("Voice Apps Application Filters", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Voice App Section Filters", () => {
    it("Display search App by name filter", () => {
      cy.get("#searchAppByNameGrid").should("be.visible");
      cy.get("#searchIconGrid").should("be.visible");
      cy.get("#searchCloseGrid").should("be.visible");
    });

    it("Display search App by tag filter", () => {
      cy.get("#searchByTagGrid").should("be.visible");
      cy.get("#filterIconGrid").should("be.visible");
      cy.get("#selectArrowTagsGrid").should("be.visible");
    });

    it("Display sort App by name", () => {
      cy.get("#sortAppsGrid").should("be.visible");
      cy.get("#orderIconGrid").should("be.visible");
      cy.get("#selectArrowSortGrid").should("be.visible");
    });

    it("Display set active random App", () => {
      cy.get("#selectRandomApp").should("be.visible");
    });

    it("Display Apps Grid", () => {
      cy.get("#showAppsGrid").should("be.visible");
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "89");
    });
  });

  context("Change Voice App Filters Independent", () => {
    it("Set Voice name filter", () => {
      cy.get("#searchAppByNameGrid").click().type("{selectall}ma");
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "7");
    });

    it("Set Tag filter", () => {
      cy.get("#filtersSectionGrid").find("#selectArrowTagsGrid").click();
      cy.get("[id=searchByTagGrid]").type("robotic{enter}", { force: true });

      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "6");
    });

    it("Set Sort filter", () => {
      cy.get("#filtersSectionGrid").find("#selectArrowSortGrid").click();
      cy.get("[id=sortAppsGrid]").type("DES{enter}", { force: true });

      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .each(($el, $id) => {
          if ($id === 0) {
            cy.wrap($el)
              .find(".v-card__title")
              .should("be.visible")
              .contains("Zombie");
          }
        });
    });
  });
  context("Make a multiple Voice App Filter", () => {
    it("Set Voice name filter + tag filter + sort filter", () => {
      cy.get("#searchAppByNameGrid").click().type("{selectall}m");
      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "18");

      cy.get("#filtersSectionGrid").find("#selectArrowTagsGrid").click();
      cy.get("[id=searchByTagGrid]").type("human{enter}", { force: true });

      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .should("have.length", "3");
      cy.get("#filtersSectionGrid").find("#selectArrowSortGrid").click();
      cy.get("[id=sortAppsGrid]").type("DES{enter}", { force: true });

      cy.get("#showAppsGrid")
        .find(".col-sm-4.col-md-2")
        .each(($el, $id) => {
          if ($id === 0) {
            cy.wrap($el)
              .find(".v-card__title")
              .should("be.visible")
              .contains("Woman to man");
          }
        });
    });
  });
  context("Set Random Active App", () => {
    it("Select random active app and validate it appears on Active App section", () => {
      cy.get("#selectRandomApp").click();
      cy.get("#activeApp").should("be.visible");
    });
  });
});
