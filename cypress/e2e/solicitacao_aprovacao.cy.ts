import 'cypress-dotenv'
import "cypress-real-events"
import { navigateToSection } from "@util/cypress/navigate_to_section";
import { navigateToSidebar } from '@util/cypress/navigate_to_sidebar';
import { signIn } from "@util/cypress/signIn";
import typeInputHourMinutes from '@util/cypress/type_input_hour_minutes';

describe('Solicitacao de Aprovacao test', () => {

  beforeEach(() => {
    signIn()
  })

  it('Should navigate to section Solicitação de Aprovacao', () => {
    navigateToSection('Medição', 'solicitacaoAprovacao');
    cy.get('[data-cy="componentSolicitacaoAprovacao"]').should('be.visible');
  })

  it('Should submit Solicitacao de Aprovacao', () => {
    navigateToSection('Medição', 'solicitacaoAprovacao');
    cy.get('[data-cy="tableSolicitarAprovacaoContainer"]').should('be.visible');
    cy.get('[data-cy="periodo"]').should('be.visible');
    cy.get('[data-cy="periodo"]').should('have.value', '');
    cy.get('[data-cy="periodo"]').select(2, {force: true});
    cy.get('[data-cy="periodo"]').should('not.have.value', '');
    cy.get('[data-cy="solicitarAprovacaoButton"]').should('be.visible');
    cy.get('[data-cy="solicitarAprovacaoButton"]').click();
    cy.get('[data-cy="buttonAproveRequestModal"]').should('be.visible');
    cy.get('[data-cy="buttonAproveRequestModal"]').click();
  })

  it ('Should showValueSolicitarAprovacao a skeleton', () => {
    navigateToSection('Medição', 'solicitacaoAprovacao');
    cy.get('[data-cy="componentSolicitacaoAprovacao"]').should('be.visible');
    cy.get('[data-cy="tableSolicitarAprovacaoContainer"]').should("be.visible")
    cy.get('[data-cy="tableSolicitarAprovacaoContainer"]').scrollTo("right")
    cy.get('[data-cy="skeletonSolicitacaoAprovacao"]').should('be.visible');
    cy.get('[data-cy="buttonShowHideValueSolicitarAprovacao"]').should('be.visible');
    cy.get('[data-cy="buttonShowHideValueSolicitarAprovacao"]').click();
  })

  it('Should clear sidebar', () => {
    navigateToSection('Medição', 'solicitacaoAprovacao');
    navigateToSidebar("sidebarContentSolicitacaoAprovacao");
    typeInputHourMinutes("inputSidebarHorasSolicitacaoAprovacao", '999', 'inputSidebarMinutosSolicitacaoAprovacao', '30');
    cy.get('[data-cy="inputValorSolicitarAprovacao"]').should('be.visible');
    cy.get('[data-cy="inputValorSolicitarAprovacao"]').should('have.value', '');
    cy.get('[data-cy="inputValorSolicitarAprovacao"]').type('10,00');
    cy.get('[data-cy="inputStatusSolicitarAprovacao"]').should('be.visible');
    cy.get('[data-cy="inputStatusSolicitarAprovacao"]').select(1);
    cy.get('[data-cy="sidebarContentCleanButtonSolicitacaoAprovacao"]').should('be.visible');
    cy.get('[data-cy="sidebarContentCleanButtonSolicitacaoAprovacao"]').click();
    cy.get('[data-cy="inputStatusSolicitarAprovacao"]').should('be.visible');
    cy.get('[data-cy="inputValorSolicitarAprovacao"]').should('have.value', '');
    cy.get('[data-cy="inputStatusSolicitarAprovacao"]').should('be.visible');
    cy.get('[data-cy="inputStatusSolicitarAprovacao"]').should('have.value', '');
    navigateToSidebar("sidebarContentSolicitacaoAprovacao");

  })

  it('Should filter sidebar', () => {
    navigateToSection('Medição', 'solicitacaoAprovacao');
    navigateToSidebar("sidebarContentSolicitacaoAprovacao");
    typeInputHourMinutes("inputSidebarHorasSolicitacaoAprovacao", '100', 'inputSidebarMinutosSolicitacaoAprovacao', '20');
    cy.get('[data-cy="inputValorSolicitarAprovacao"]').should('be.visible');
    cy.get('[data-cy="inputValorSolicitarAprovacao"]').should('have.value', '');
    cy.get('[data-cy="inputValorSolicitarAprovacao"]').type('0,00');
    cy.get('[data-cy="inputStatusSolicitarAprovacao"]').should('be.visible');
    cy.get('[data-cy="inputStatusSolicitarAprovacao"]').select(4);
    cy.get('[data-cy="sidebarContentFilterButtonSolicitacaoAprovacao"]').should('be.visible');
    cy.get('[data-cy="sidebarContentFilterButtonSolicitacaoAprovacao"]').click();
    navigateToSidebar("sidebarContentSolicitacaoAprovacao");

  })

  
})

