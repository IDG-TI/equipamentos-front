import { signIn } from '@util/cypress/signIn';
import { navigateToSection } from '@util/cypress/navigate_to_section';
import 'cypress-dotenv'
import "cypress-real-events";
import { selectFromSearchModal } from '@util/cypress/select_from_search_modal';
import { navigateToSidebar } from '@util/cypress/navigate_to_sidebar';

describe('Relatorio Geral test', () => {

  beforeEach(() => {
    signIn();
  })

  it('should navigate to section Relatórios / Relatório Geral', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
  })

  it('should add and remove Contrato sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    addItmeFromInnerTab('relatorioGeralTabContrato', 'filterTabComponentContrato', 'contratoFilterTab');
    selectFromSearchModal('[data-cy="contratoFilterTab"]', 'epj');
    cy.get('[data-cy="closeSearchModal"]').should('be.visible');
    cy.get('[data-cy="closeSearchModal"]').click();
    cy.get('[data-cy="deleteFilterTabItem"]').should('be.visible');
    cy.get('[data-cy="deleteFilterTabItem"]').click();
  })

  it('should add and remove Projeto sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    addItmeFromInnerTab('relatorioGeralTabProjeto', 'filterTabComponentProjeto', 'projetoFilterTab');
    selectFromSearchModal('[data-cy="projetoFilterTab"]', 'epj');
    cy.get('[data-cy="closeSearchModal"]').should('be.visible');
    cy.get('[data-cy="closeSearchModal"]').click();
    cy.get('[data-cy="deleteFilterTabItem"]').should('be.visible');
    cy.get('[data-cy="deleteFilterTabItem"]').click();
  })

  it('should add and remove Seções sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    addItmeFromInnerTab('relatorioGeralTabSeções', 'filterTabComponentSecao', 'secaoFilterTab');
    selectFromSearchModal('[data-cy="secaoFilterTab"]', '01');
    cy.get('[data-cy="closeSearchModal"]').should('be.visible');
    cy.get('[data-cy="closeSearchModal"]').click();
    cy.get('[data-cy="deleteFilterTabItem"]').should('be.visible');
    cy.get('[data-cy="deleteFilterTabItem"]').click();
  })

  it('should add and remove Funcionário sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    addItmeFromInnerTab('relatorioGeralTabFuncionário', 'filterTabComponentFuncionario', 'colaboradorFilterTab');
    selectFromSearchModal('[data-cy="colaboradorFilterTab"]', 'gregory stevao');
    cy.get('[data-cy="closeSearchModal"]').should('be.visible');
    cy.get('[data-cy="closeSearchModal"]').click();
    cy.get('[data-cy="deleteFilterTabItem"]').should('be.visible');
    cy.get('[data-cy="deleteFilterTabItem"]').click();
  })

  it('should add and remove Atividade sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    addItmeFromInnerTab('relatorioGeralTabAtividade', 'filterTabComponentAtividade', 'atividadeFilterTab');
    selectFromSearchModal('[data-cy="atividadeFilterTab"]', 'a');
    cy.get('[data-cy="closeSearchModal"]').should('be.visible');
    cy.get('[data-cy="closeSearchModal"]').click();
    cy.get('[data-cy="deleteFilterTabItem"]').should('be.visible');
    cy.get('[data-cy="deleteFilterTabItem"]').click();
  })

  it('should Configurar Relatório sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    cy.get('[data-cy="relatorioGeralTabConfigurar relatório"]').should('be.visible');
    cy.get('[data-cy="relatorioGeralTabConfigurar relatório"]').click();
    cy.get('[data-cy="filterTabComponentMultipleOptions"]').should('be.visible');
    cy.get('[data-cy="filterTabMultipleOptionsTable"]').should('be.visible');
    cy.get('[data-cy="filterTabMultipleOptionsCheckbox"]').should('be.visible');
    cy.get('[data-cy="filterTabMultipleOptionsCheckbox"]').click({multiple: true});
    cy.get('[data-cy="filterTabMultipleOptionsCheckbox"]').should('be.checked');
    cy.get('[data-cy="filterTabComponentRecursiveView"]').should('be.visible');
    cy.get('[data-cy="recursiveViewFirstItem"]').should('be.visible');
    cy.get('[data-cy="recursiveViewInnerUl"]').should('be.visible');
    cy.get('[data-cy="recursiveViewInnerLi"]').should('be.visible');
    cy.get('[data-cy="recursiveViewInnerUl"]').should('be.visible');
  })

  it('should Dashboard sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    cy.get('[data-cy="relatorioGeralTabDashboard"]').should('be.visible');
    cy.get('[data-cy="relatorioGeralTabDashboard"]').click();
    cy.get('[data-cy="filterTabComponentDashboard"]').should('be.visible');
    cy.get('[data-cy="filterTabDashboardCheckboxGrouper"]').should('be.visible');
    cy.get('[data-cy="filterTabDashboardCheckboxGrouper"]').eq(0).click();
    cy.get('[data-cy="filterTabDashboardCheckboxGrouper"]').eq(0).should('be.checked');
    cy.get('[data-cy="filterTabDashboardCheckboxGrouperMonth"]').should('be.visible');
    cy.get('[data-cy="filterTabDashboardCheckboxGrouperMonth"]').click();
    cy.get('[data-cy="filterTabDashboardCheckboxGrouperMonth"]').should('be.checked');
    cy.get('[data-cy="filterTabDashboardCheckboxFields"]').should('be.visible');
    cy.get('[data-cy="filterTabDashboardCheckboxFields"]').click({multiple: true});
    cy.get('[data-cy="filterTabDashboardCheckboxFields"]').should('be.checked');
  })

  it('should certify sidebar', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    navigateToSidebar("sidebarContentRelatorioGeral");
    cy.get('[data-cy="dataInicial"]').should('be.visible');
    cy.get('[data-cy="dataInicial"]').should('have.value', '');
    const [day, month, year] = new Date().toLocaleDateString().split('/');
    cy.get('[data-cy="dataInicial"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="dataFinal"]').should('be.visible');
    cy.get('[data-cy="dataFinal"]').should('have.value', '');
    cy.get('[data-cy="dataFinal"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="sidebarContentRelatorioGeralButtonDashboard"]').should('be.visible');
    cy.get('[data-cy="sidebarContentRelatorioGeralButtonRelatorio"]').should('be.visible');
    cy.get('[data-cy="sidebarContentRelatorioGeralButtonClean"]').should('be.visible');
    cy.get('[data-cy="sidebarContentRelatorioGeralButtonClean"]').wait(3500).click();
    cy.get('[data-cy="dataInicial"]').should('have.value', '');
    cy.get('[data-cy="dataFinal"]').should('have.value', '');
  })

  it('should generate Relatório and Dashboard sucessfully', () => {
    navigateToSection('Relatórios', 'relatorioGeral');
    cy.get('[data-cy="componentRelatorioGeral"]').should('be.visible');
    addItmeFromInnerTab('relatorioGeralTabContrato', 'filterTabComponentContrato', 'contratoFilterTab');
    selectFromSearchModal('[data-cy="contratoFilterTab"]', 'epj');
    cy.get('[data-cy="closeSearchModal"]').click();
    addItmeFromInnerTab('relatorioGeralTabProjeto', 'filterTabComponentProjeto', 'projetoFilterTab');
    selectFromSearchModal('[data-cy="projetoFilterTab"]', 'epj');
    cy.get('[data-cy="closeSearchModal"]').click();
    addItmeFromInnerTab('relatorioGeralTabSeções', 'filterTabComponentSecao', 'secaoFilterTab');
    selectFromSearchModal('[data-cy="secaoFilterTab"]', '01');
    cy.get('[data-cy="closeSearchModal"]').click();
    addItmeFromInnerTab('relatorioGeralTabFuncionário', 'filterTabComponentFuncionario', 'colaboradorFilterTab');
    selectFromSearchModal('[data-cy="colaboradorFilterTab"]', 'gregory stevao');
    cy.get('[data-cy="closeSearchModal"]').click();
    addItmeFromInnerTab('relatorioGeralTabAtividade', 'filterTabComponentAtividade', 'atividadeFilterTab');
    selectFromSearchModal('[data-cy="atividadeFilterTab"]', 'a');
    cy.get('[data-cy="closeSearchModal"]').click();
    cy.get('[data-cy="relatorioGeralTabConfigurar relatório"]').click();
    cy.get('[data-cy="filterTabMultipleOptionsCheckbox"]').click({ multiple: true });
    cy.get('[data-cy="relatorioGeralTabDashboard"]').click();
    cy.get('[data-cy="filterTabDashboardCheckboxGrouper"]').eq(0).click();
    cy.get('[data-cy="filterTabDashboardCheckboxFields"]').click({ multiple: true });
    navigateToSidebar("sidebarContentRelatorioGeral");
    const [day, month, year] = new Date().toLocaleDateString().split('/');
    cy.get('[data-cy="dataInicial"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="dataFinal"]').type(`${year}-${month}-${day}`);
    cy.get('[data-cy="sidebarContentRelatorioGeralButtonDashboard"]').click();
    cy.get('[data-cy="filterTabDashboardGraph"]').should('be.visible');
    cy.get('[data-cy="sidebarContentRelatorioGeralButtonRelatorio"]').click();
  })

})

function addItmeFromInnerTab(tabItemName: string, tabComponentName: string, tabInputName: string) {
  cy.get(`[data-cy="${tabItemName}"]`).should('be.visible');
  cy.get(`[data-cy="${tabItemName}"]`).click();
  cy.get(`[data-cy="${tabComponentName}"]`).should('be.visible');
  cy.get(`[data-cy="${tabInputName}"]`).should('be.visible');
  cy.get(`[data-cy="${tabInputName}"]`).should('have.value', '');
}