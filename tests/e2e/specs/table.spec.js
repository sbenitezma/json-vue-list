describe("Display Voice Apps Favourite section", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#favApps").click();
  });

  context("First access to Favourites section", () => {
    it("Current Active tab is Favourite Voice Apps", () => {
      cy.get(".v-tabs")
        .find(".v-tab.v-tab--active")
        .should("have.text", " Favourites Voice Apps ");
    });

    it("Display Favourites Voice Apps title", () => {
      cy.get(".v-window-item--active")
        .find(".v-card__title")
        .should("have.text", " Favourites Voice Apps ");
    });

    it("Display search Apps by name box", () => {
      cy.get(".v-window-item--active")
        .find("#searchAppNameTable")
        .should("be.visible");
      cy.get(".v-window-item--active")
        .find("#searchIconTable")
        .should("be.visible");
      cy.get(".v-window-item--active")
        .find("#searchCloseTable")
        .should("be.visible");
    });

    it("Display favourites datatable", () => {
      cy.get(".v-window-item--active")
        .find(".v-data-table")
        .should("be.visible");
    });

    it("Validate Datatable headers (Active, Favourite, App Icon, Name, Tags)", () => {
      cy.get("thead")
        .find("th")
        .should("have.length", 5)
        .each(($el, index) => {
          switch (($el, index)) {
            case index === 0:
              cy.wrap($el).should("have.text", " Active ");
              break;
            case index === 1:
              cy.wrap($el).should("have.text", " Favourite ");
              break;
            case index === 2:
              cy.wrap($el).should("have.text", " App Icon ");
              break;
            case index === 3:
              cy.wrap($el).should("have.text", " Name ");
              break;
            case index === 4:
              !cy.wrap($el).find("text").not.should;
              break;
            default:
              break;
          }
        });
    });
  });

  context("Test Voice App table with 0 results", () => {
    it("Datatable rows should be two (Headers and No data available)", () => {
      cy.get(".v-data-table").find("tr").should("have.length", 2);
      cy.get(".v-data-table").find("thead").should("be.visible");
    });

    it("Validate datatable content with no results", () => {
      cy.get(".v-data-table__empty-wrapper").should("be.visible");
      cy.get(".v-data-table__empty-wrapper")
        .find("td")
        .should("have.text", "No data available");
    });

    it("Validate visible datatable footer and disabled pagination actions", () => {
      cy.get(".v-data-footer").should("be.visible");
      cy.get(".v-data-footer__select")
        .should("be.visible")
        .should("have.text", "Rows per page:10");
      cy.get(".v-data-footer__pagination").should("be.visible");
      cy.get(".v-data-footer__icons-before")
        .should("be.visible")
        .find("button")
        .should("have.attr", "disabled", "disabled");
      cy.get(".v-data-footer__icons-after")
        .should("be.visible")
        .find("button")
        .should("have.attr", "disabled", "disabled");
    });
  });

  context("Test Voice App with selected Favourites", () => {
    it("Select favourite first and third Voice App and filter in Favourite voice apps Section", () => {
      cy.get(".v-tabs").find(".v-tab").not(".v-tab--active").click();
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
      cy.get("#searchAppNameTable").click().type("{selectall}2");
      cy.get(".v-data-table").find("tr").should("have.length", 2);
    });
  });
});
