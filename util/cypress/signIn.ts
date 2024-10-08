export function signIn() {
    cy.visit(Cypress.env('BASE_URL'))
    cy.get('[data-cy="userId"]').type(Cypress.env('USER_ID'))
    cy.get('[data-cy="userPassword"]').type(Cypress.env('USER_PASSWORD'))
    cy.get('[data-cy="submitLogin"]').click()
}