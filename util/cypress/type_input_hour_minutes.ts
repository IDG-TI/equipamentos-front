/***
 * @param datacyInputHour datacy for input hour
 * @param inputHourValue value to be typed as input hour
 * @param datacyInputMinutes datacy for input minute
 * @param inputMinutesValue value to be typed as input minute
 */

export default function typeInputHourMinutes(datacyInputHour: string, inputHourValue: string, datacyInputMinutes: string, inputMinutesValue: string) {
    cy.get(`[data-cy=${datacyInputHour}]`).should("be.visible");
    cy.get(`[data-cy=${datacyInputHour}]`).should("have.value", '');
    cy.get(`[data-cy=${datacyInputHour}]`).type(inputHourValue);
    cy.get(`[data-cy=${datacyInputHour}]`).should("not.have.value", '');
    cy.get(`[data-cy=${datacyInputMinutes}]`).should("be.visible");
    cy.get(`[data-cy=${datacyInputMinutes}]`).should("have.value", '');
    cy.get(`[data-cy=${datacyInputMinutes}]`).type(inputMinutesValue);
    cy.get(`[data-cy=${datacyInputMinutes}]`).should("not.have.value", '');

}