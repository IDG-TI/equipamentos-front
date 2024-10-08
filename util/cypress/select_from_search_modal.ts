/**
 * 
 * @param originalInput input que será clicado para abrir o modal de pesquisa
 * @param searchText texto que será digitado no input de pesquisa
 */

export function selectFromSearchModal(originalInput: string, searchText: string) {
    cy.get(originalInput).click();
    cy.get('input[type=search]').type(searchText);
    cy.get('[data-cy="submitSearchModal"]').click();
    cy.get('[data-cy="searchModalTr"]').eq(0).click();
  }