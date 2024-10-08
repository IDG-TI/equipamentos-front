import 'cypress-dotenv';
import "cypress-real-events";
import { signIn } from '@util/cypress/signIn';
import { navigateToSection } from '@util/cypress/navigate_to_section';
import { selectFromSearchModal } from '@util/cypress/select_from_search_modal';
import { navigateToSidebar } from '@util/cypress/navigate_to_sidebar';

describe('Medição de Serviços de Terceiros test', () => {
  beforeEach(() => {
    signIn();
  });

  it('should navigate to section Cadastro / Medição de Serviços de Terceiros ', () => {
    navigateToSection('Medição', 'medicaoServicosTerceiros');
    cy.wait(3000);
    cy.get('[data-cy="componentMedicaoServicoTerceiros"]').should('be visible');
  });
  
  /* it('should navigate to section Cadastro / Medição de Serviços de Terceiros / Novo', () => {
    navigateToSection('Medição', 'medicaoServicosTerceiros');
    cy.get('[data-cy="componentMedicaoServicoTerceiros"]').should('be.visible');
    cy.get('[data-cy="optionCreateMedicaoServicosTerceiros"]').click();
    cy.get('[data-cy="componentCreateMedicaoServicoTerceiros"]').should('be.visible');
  });  */ 
});
  

/* it('Should submit Medição de Serviços de Terceiros', () => {
  navigateToSection('Medição', 'medicaoServicosTerceiros');
  cy.get('[data-cy="tableMedicaoServicosTerceirosContainer"]').should('be.visible');
  cy.get('[data-cy="periodo"]').should('be.visible');
  cy.get('[data-cy="periodo"]').should('have.value', '');
  cy.get('[data-cy="periodo"]').select(2, {force: true});
  cy.get('[data-cy="periodo"]').should('not.have.value', '');
  cy.get('[data-cy="solicitarAprovacaoButton"]').should('be.visible');
  cy.get('[data-cy="solicitarAprovacaoButton"]').click();
  cy.get('[data-cy="buttonAproveRequestModal"]').should('be.visible');
  cy.get('[data-cy="buttonAproveRequestModal"]').click();
})

nit ('Should showValueSolicitarAprovacao a skeleton', () => {
  navigateToSection('Medição', 'medicaoServicosTerceiros');
  cy.get('[data-cy="componentSolicitacaoAprovacao"]').should('be.visible');
  cy.get('[data-cy="tableMedicaoServicosTerceirosContainer"]').should("be.visible")
  cy.get('[data-cy="tableMedicaoServicosTerceirosContainer"]').scrollTo("right")
  cy.get('[data-cy="skeletonSolicitacaoAprovacao"]').should('be.visible');
  cy.get('[data-cy="buttonShowHideValueSolicitarAprovacao"]').should('be.visible');
  cy.get('[data-cy="buttonShowHideValueSolicitarAprovacao"]').click();
}) */