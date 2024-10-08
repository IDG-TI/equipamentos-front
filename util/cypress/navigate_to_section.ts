/**
 * 
 * @param navbarOption nome da opção do navbar 
 * @param dropdownOption nome da opção do dropdown
 */

export function navigateToSection(navbarOption: string, dropdownOption: string) {
    cy.get(`[data-cy="${navbarOption}"]`).should('be.visible')
    cy.get(`[data-cy="${navbarOption}"]`).realHover()
    cy.get(`[data-cy="${dropdownOption}"]`).should('be.visible')
    cy.get(`[data-cy="${dropdownOption}"]`).click()
}