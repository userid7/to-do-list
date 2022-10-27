describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays two todo items by default", () => {
    cy.get("[id=todo-list-title]").should("have.length", 2);
    cy.get("[id=todo-list-title]")
      .first()
      .should("have.text", "Zoom meet with user");
    cy.get("[id=todo-list-title]")
      .last()
      .should("have.text", "Take a cooking lesson");
  });

  it("can add new todo items", () => {
    const newItem = "Feed the cat";
    cy.get("[id=todo-list-input]").type(`${newItem}{enter}`);
    cy.get("[id=todo-list-title]")
      .should("have.length", 3)
      .last()
      .should("have.text", newItem);
  });

  it("can delete todo items", () => {
    const newItem = "Feed the cat";
    cy.contains(newItem).parent().find("button").click();

    cy.get("[id=todo-list-title]").should("have.length", 2);

    cy.contains(newItem).should("not.exist");
  });

  context("with a checked task", () => {
    it("can mark task as complete", () => {
      cy.contains("Zoom meet with user")
        .parent()
        .find("input[type=checkbox]")
        .check();
    });

    it("can filter for active tasks", () => {
      cy.contains("Active").click();

      cy.get("[id=todo-list-title]")
        .should("have.length", 1)
        .first()
        .should("have.text", "Take a cooking lesson");

      cy.contains("Zoom meet with user").should("not.exist");
    });

    it("can filter for completed tasks", () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains("Complete").click();

      cy.get("[id=todo-list-title]")
        .should("have.length", 1)
        .first()
        .should("have.text", "Zoom meet with user");

      cy.contains("Taking a cooking lesson").should("not.exist");
    });
  });
});
