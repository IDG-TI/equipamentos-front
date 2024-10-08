/**
 * 
 * @param sidebarContent identificador do conteúdo da sidebar
 */

export function navigateToSidebar(sidebarContent: string) {
    cy.get('[data-cy="sidebarActionBar"]').should('be.visible')
    cy.get('[data-cy="sidebarActionBar"]').click()
    cy.get(`[data-cy=${sidebarContent}]`).should('be.visible')
    
}