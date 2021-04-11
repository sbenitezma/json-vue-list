describe("Display and change between Voice Apps tabs menu", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Validate tabs navigation rendered", () => {
    // Render tabs and active tab
    cy.get(".v-tabs").should("be.visible");
  });
  it("Validate first tab is active", () => {
    cy.get(".v-tabs")
      .find(".v-tab")
      .should("have.length", "2")
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).should("have.class", "v-tab--active");
          cy.wrap($el).should("have.text", " Voice Apps ");
          // Render Header of current active tab
          cy.get(".v-card__title.headline").should("be.visible");
        } else {
          if (index === 1) {
            cy.wrap($el).should("not.have.class", "v-tab--active");
            cy.wrap($el).should("have.text", " Favourites Voice Apps ");
          }
        }
      });
  });
  it("Change current active tab to Favourites Voice Apps ", () => {
    cy.get(".v-tabs").find(".v-tab").not(".v-tab--active").click();
    cy.get(".v-tabs")
      .find(".v-tab.v-tab--active")
      .should("have.text", " Favourites Voice Apps ");
    cy.get(".v-tabs")
      .find(".v-tab")
      .not(".v-tab--active")
      .should("have.text", " Voice Apps ");
  });
});
