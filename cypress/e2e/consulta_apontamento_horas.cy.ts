import 'cypress-dotenv'
import "cypress-real-events"
import { navigateToSection } from "@util/cypress/navigate_to_section";
import { navigateToSidebar } from '@util/cypress/navigate_to_sidebar';
import { signIn } from "@util/cypress/signIn";
import { selectFromSearchModal } from '@util/cypress/select_from_search_modal';

describe('Consulta Apontamento de Horas test', () => {

    beforeEach(() => {
        signIn()
    })

    it('Should navigate to section Consulta Apontamento de Horas', () => {
        navigateToSection('Apontamento', 'consultaApontamentoHoras');
        cy.get('[data-cy="componentConsultaApontHoras"]').should('be.visible');
    })

    it('Should clean inputs', () => {
        navigateToSection('Apontamento', 'consultaApontamentoHoras');
        navigateToSidebar('sidebarContentConsultaApontHoras');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarColaboradorConsultaApontHoras"]', 'Pedro Antonio');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('not.have.value', '');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarSecaoConsulaApontHoras"]', 'TI INFRA');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('not.have.value', '');

        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarProjetoConsulaApontHoras"]', '9000');
        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('not.have.value', '');

        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').click({ force: true });
        cy.get('[data-cy="submitSearchModal"]').should('be.visible');
        cy.get('[data-cy="submitSearchModal"]').click();
        if (cy.get('tr').contains('26/02/2024')) {
            cy.get('tr').contains('26/02/2024').click();
        }
        cy.get('[data-cy="inputSidebarAtividadeConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarAtividadeConsultaApontHoras"]').select(2);
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').type('10');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').type('10');

        cy.get('[data-cy="sidebarContentCleanButtonConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="sidebarContentCleanButtonConsultaApontHoras"]').click();

        navigateToSidebar('sidebarContentConsultaApontHoras');
    })

    it('Should filter inputs', () => {
        navigateToSection('Apontamento', 'consultaApontamentoHoras');
        navigateToSidebar('sidebarContentConsultaApontHoras');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarColaboradorConsultaApontHoras"]', 'Pedro Antonio');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('not.have.value', '');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarSecaoConsulaApontHoras"]', 'ADMINISTRATIVO - MATRIZ');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('not.have.value', '');

        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarProjetoConsulaApontHoras"]', '9000');
        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('not.have.value', '');

        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').click({ force: true });
        cy.get('[data-cy="submitSearchModal"]').should('be.visible');
        cy.get('[data-cy="submitSearchModal"]').click();
        if (cy.get('tr').contains('26/02/2024')) {
            cy.get('tr').contains('26/02/2024').click();
        }
        cy.get('[data-cy="inputSidebarAtividadeConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarAtividadeConsultaApontHoras"]').select(12);
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').type('8');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').type('30');

        cy.get('[data-cy="sidebarContentFilterButtonConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="sidebarContentFilterButtonConsultaApontHoras"]').click();

        navigateToSidebar('sidebarContentConsultaApontHoras');

        navigateToSidebar('sidebarContentConsultaApontHoras');
        cy.get('[data-cy="sidebarContentCleanButtonConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="sidebarContentCleanButtonConsultaApontHoras"]').click();

        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarColaboradorConsultaApontHoras"]', 'Pedro Antonio');
        cy.get('[data-cy="inputSidebarColaboradorConsultaApontHoras"]').should('not.have.value', '');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarSecaoConsulaApontHoras"]', 'TI INFRA');
        cy.get('[data-cy="inputSidebarSecaoConsulaApontHoras"]').should('not.have.value', '');

        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSidebarProjetoConsulaApontHoras"]', '9000');
        cy.get('[data-cy="inputSidebarProjetoConsulaApontHoras"]').should('not.have.value', '');

        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarPeriodoConsulaApontHoras"]').click({ force: true });
        cy.get('[data-cy="submitSearchModal"]').should('be.visible');
        cy.get('[data-cy="submitSearchModal"]').click();
        if (cy.get('tr').contains('26/01/2024')) {
            cy.get('tr').contains('26/01/2024').click();
        }
        cy.get('[data-cy="inputSidebarAtividadeConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarAtividadeConsultaApontHoras"]').select(2);
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarHorasConsultaApontHoras"]').type('10');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').should('have.value', '');
        cy.get('[data-cy="inputSidebarMinutosConsultaApontHoras"]').type('10');

        cy.get('[data-cy="sidebarContentFilterButtonConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="sidebarContentFilterButtonConsultaApontHoras"]').click();

        cy.get('[data-cy="sidebarContentCleanButtonConsultaApontHoras"]').should('be.visible');
        cy.get('[data-cy="sidebarContentCleanButtonConsultaApontHoras"]').click();
        navigateToSidebar('sidebarContentConsultaApontHoras');
    })
})

