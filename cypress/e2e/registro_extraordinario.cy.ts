import { signIn } from '@util/cypress/signIn';
import { navigateToSection } from '@util/cypress/navigate_to_section';
import 'cypress-dotenv'
import "cypress-real-events";
import { selectFromSearchModal } from '@util/cypress/select_from_search_modal';
import { navigateToSidebar } from '@util/cypress/navigate_to_sidebar';

describe('Registro Extraordinário test', () => {

  beforeEach(() => {
    signIn();
  })

  it('should navigate to section Registro Extraordinário', () => {
    navigateToSection('Apontamento', 'registroExtraordinario');
    cy.get('[data-cy="componentRegistroExtraordinario"]').should('be.visible');
  })

  it('should adicionar Registro Extraordinário sucessfully', () => {
    navigateToSection('Apontamento', 'registroExtraordinario');
    cy.get('[data-cy="optionCreateRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="optionCreateRegistroExtraordinario"]').click({ force: true });
    cy.get('[data-cy="inputModalColaboradorRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalColaboradorRegistroExtraordinario"]').should('have.value', '');
    selectFromSearchModal('[data-cy="inputModalColaboradorRegistroExtraordinario"]', 'gregory stevao');
    cy.get('[data-cy="inputModalColaboradorRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputModalTipoRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalTipoRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputModalTipoRegistroExtraordinario"]').select(1);
    cy.get('[data-cy="inputModalTipoRegistroExtraordinario"]').should('not.have.value', '');
    const [day, month, year] = new Date().toLocaleDateString().split('/');
    cy.get('[data-cy="inputModalDataInicioRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalDataInicioRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputModalDataInicioRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputModalDataInicioRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputModalDataFimRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalDataFimRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputModalDataFimRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputModalDataFimRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputModalHorasRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalHorasRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputModalHorasRegistroExtraordinario"]').type('99');
    cy.get('[data-cy="inputModalHorasRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputModalMinutosRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalMinutosRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputModalMinutosRegistroExtraordinario"]').type('59');
    cy.get('[data-cy="inputModalMinutosRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputModalValidadeRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalValidadeRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputModalValidadeRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputModalValidadeRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputModalJustificativaRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputModalJustificativaRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputModalJustificativaRegistroExtraordinario"]').type('Teste justificativa');
    cy.get('[data-cy="inputModalJustificativaRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="submitRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="submitRegistroExtraordinario"]').click();
  })

  it('should encerrar Registro Extraordinário sucessfully', () => {
    navigateToSection('Apontamento', 'registroExtraordinario');
    if(cy.get('tr').contains('Ativo')){
      cy.get('tr').contains('Ativo').click();
    }
    cy.get('[data-cy="optionTerminateRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="optionTerminateRegistroExtraordinario"]').click({ force: true });
    cy.get('tr').should('contain', 'Encerrado');
  })

  it('should export Registro Extraordinário sucessfully', () => {
  https://stackoverflow.com/questions/66478056/cypress-how-to-verify-if-a-file-is-downloaded
    navigateToSection('Apontamento', 'registroExtraordinario');
    cy.get('tr').eq(1).click();
    cy.get('[data-cy="optionExportRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="optionExportRegistroExtraordinario"]').click({ force: true });
  })

  it('should certify sidebar', () => {
    navigateToSection('Apontamento', 'registroExtraordinario');
    navigateToSidebar("sidebarContentRegistroExtraordinario");
    cy.get('[data-cy="sidebarContentRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputSidebarColaboradorRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputSidebarColaboradorRegistroExtraordinario"]').should('have.value', '');
    selectFromSearchModal('[data-cy="inputSidebarColaboradorRegistroExtraordinario"]', 'gregory stevao');
    cy.get('[data-cy="inputSidebarColaboradorRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputSidebarTipoRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputSidebarTipoRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarTipoRegistroExtraordinario"]').select(1);
    cy.get('[data-cy="inputSidebarTipoRegistroExtraordinario"]').should('not.have.value', '');
    const [day, month, year] = new Date().toLocaleDateString().split('/');
    cy.get('[data-cy="inputSidebarDataInicioRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputSidebarDataInicioRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarDataInicioRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputSidebarDataInicioRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputSidebarDataFimRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputSidebarDataFimRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarDataFimRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputSidebarDataFimRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputSidebarHorasRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputSidebarHorasRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarHorasRegistroExtraordinario"]').type('99');
    cy.get('[data-cy="inputSidebarHorasRegistroExtraordinario"]').should('not.have.value', '');
    cy.get('[data-cy="inputSidebarMinutosRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="inputSidebarMinutosRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarMinutosRegistroExtraordinario"]').type('59');
    cy.get('[data-cy="inputSidebarMinutosRegistroExtraordinario"]').should('not.have.value', '');
  })

  it('should filtrar Registro Extraordinário', () => {
    navigateToSection('Apontamento', 'registroExtraordinario');
    navigateToSidebar("sidebarContentRegistroExtraordinario");
    selectFromSearchModal('[data-cy="inputSidebarColaboradorRegistroExtraordinario"]', 'gregory stevao');
    cy.get('[data-cy="inputSidebarTipoRegistroExtraordinario"]').select(1);
    const [day, month, year] = new Date().toLocaleDateString().split('/');
    cy.get('[data-cy="inputSidebarDataInicioRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputSidebarDataFimRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputSidebarHorasRegistroExtraordinario"]').type('99');
    cy.get('[data-cy="inputSidebarMinutosRegistroExtraordinario"]').type('59');
    cy.get('[data-cy="sidebarContentFilterButtonRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="sidebarContentFilterButtonRegistroExtraordinario"]').click();
    cy.get('tr').should('have.length.at.least', 1);
  })

  it('should clear inputs sidebar Registro Extraordinário', () => {
    navigateToSection('Apontamento', 'registroExtraordinario');
    navigateToSidebar("sidebarContentRegistroExtraordinario");
    selectFromSearchModal('[data-cy="inputSidebarColaboradorRegistroExtraordinario"]', 'gregory stevao');
    cy.get('[data-cy="inputSidebarTipoRegistroExtraordinario"]').select(1);
    const [day, month, year] = new Date().toLocaleDateString().split('/');
    cy.get('[data-cy="inputSidebarDataInicioRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputSidebarDataFimRegistroExtraordinario"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="inputSidebarHorasRegistroExtraordinario"]').type('99');
    cy.get('[data-cy="inputSidebarMinutosRegistroExtraordinario"]').type('59');
    cy.get('[data-cy="sidebarContentClearButtonRegistroExtraordinario"]').should('be.visible');
    cy.get('[data-cy="sidebarContentClearButtonRegistroExtraordinario"]').click();
    cy.get('[data-cy="inputSidebarColaboradorRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarTipoRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarDataInicioRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarDataFimRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarHorasRegistroExtraordinario"]').should('have.value', '');
    cy.get('[data-cy="inputSidebarMinutosRegistroExtraordinario"]').should('have.value', '');
  })

})