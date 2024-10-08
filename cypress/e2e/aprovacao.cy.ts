import 'cypress-dotenv'
import "cypress-real-events"
import { navigateToSection } from "@util/cypress/navigate_to_section";
import { navigateToSidebar } from '@util/cypress/navigate_to_sidebar';
import { signIn } from "@util/cypress/signIn";
import { selectFromSearchModal } from '@util/cypress/select_from_search_modal';

describe('Solicitacao de Aprovacao test', () => {

    beforeEach(() => {
        signIn()
    })

      it('Should navigate to section Solicitacao de Aprovacao', () => {
        navigateToSection('Medição', 'aprovacao');
        cy.get('[data-cy="componentAprovacao"]').should('be.visible');
      })

    it('Aprove  a measurement request', () => {
        navigateToSection('Medição', 'aprovacao');
        if (cy.get('tr').contains('Yan')) {
            cy.get('tr').contains('Yan').click();
        }
        cy.get('[data-cy="tableAprovacaoContainer"]').should('be.visible');
        cy.get('[data-cy="tableAprovacaoContainer"]').click();
        cy.get('[data-cy="buttonAprovarMedicao"]').should('be.visible');
        cy.get('[data-cy="buttonAprovarMedicao"]').click();
        cy.get('[data-cy="modalConfirmDeclineButton"]').should('be.visible');
        cy.get('[data-cy="modalConfirmDeclineButton"]').click();
        cy.get('[data-cy="buttonAprovarMedicao"]').should('be.visible');
        cy.get('[data-cy="buttonAprovarMedicao"]').click();
        cy.get('[data-cy="modalConfirmAcceptButton"]').should('be.visible');
        cy.get('[data-cy="modalConfirmAcceptButton"]').click();
        cy.get('[data-cy="modalConfirmDeclineButton"]').click();
    })

    it('Cancel approve with discount  a measurement request', () => {
        navigateToSection('Medição', 'aprovacao');
        if (cy.get('tr').contains('Yan')) {
            cy.get('tr').contains('Yan').click();
        }
        cy.get('[data-cy="tableAprovacaoContainer"]').should('be.visible');
        cy.get('[data-cy="tableAprovacaoContainer"]').click();
        cy.get('[data-cy="buttonAprovarMedicaoDesconto"]').should('be.visible');
        cy.get('[data-cy="buttonAprovarMedicaoDesconto"]').click({force: true});
        cy.get('[data-cy="modalDiscountInputMoney"]').should('be.visible');
        cy.get('[data-cy="modalDiscountInputMoney"]').should('have.value', '');
        cy.get('[data-cy="modalDiscountInputMoney"]').type('10,00');
        cy.get('[data-cy="modalDiscountJustificativa"]').should('be.visible');
        cy.get('[data-cy="modalDiscountJustificativa"]').should('have.value', '');
        cy.get('[data-cy="modalDiscountJustificativa"]').type('Teste data-cy, pai é brabo!');
        cy.get('[data-cy="modalConfirmDeclineButton"]').should('be.visible');
        cy.get('[data-cy="modalConfirmDeclineButton"]').click();
    })

    it('Approve with discount  a measurement request', () => {
        navigateToSection('Medição', 'aprovacao');
        if (cy.get('tr').contains('Yan')) {
            cy.get('tr').contains('Yan').click();
        }
        cy.get('[data-cy="tableAprovacaoContainer"]').should('be.visible');
        cy.get('[data-cy="tableAprovacaoContainer"]').click();
        cy.get('[data-cy="buttonAprovarMedicaoDesconto"]').should('be.visible');
        cy.get('[data-cy="buttonAprovarMedicaoDesconto"]').click({force: true});
        cy.get('[data-cy="modalDiscountInputMoney"]').should('be.visible');
        cy.get('[data-cy="modalDiscountInputMoney"]').should('have.value', '');
        cy.get('[data-cy="modalDiscountInputMoney"]').type('10,00');
        cy.get('[data-cy="modalDiscountJustificativa"]').should('be.visible');
        cy.get('[data-cy="modalDiscountJustificativa"]').should('have.value', '');
        cy.get('[data-cy="modalDiscountJustificativa"]').type('Teste data-cy, pai é brabo!');
        cy.get('[data-cy="modalConfirmAcceptButton"]').should('be.visible');
        cy.get('[data-cy="modalConfirmAcceptButton"]').click();


        cy.get('[data-cy="modalConfirmDeclineButton"]').should('be.visible');
        cy.get('[data-cy="modalConfirmDeclineButton"]').click();
    })

    it('Cancel Reprove  a measurement request', () => {
        navigateToSection('Medição', 'aprovacao');
        if (cy.get('tr').contains('Yan')) {
            cy.get('tr').contains('Yan').click();
        }
        cy.get('[data-cy="tableAprovacaoContainer"]').should('be.visible');
        cy.get('[data-cy="tableAprovacaoContainer"]').click();
        cy.get('[data-cy="buttonReprovarMedicao"]').should('be.visible');
        cy.get('[data-cy="buttonReprovarMedicao"]').click({force: true});
        cy.get('[data-cy="modalReproveInputTextarea"]').should('be.visible');
        cy.get('[data-cy="modalReproveInputTextarea"]').should('have.value', '');
        cy.get('[data-cy="modalReproveInputTextarea"]').type('Teste data-cy, pai é brabo!');
        cy.get('[data-cy="modalReproveDeclineButton"]').should('be.visible');
        cy.get('[data-cy="modalReproveDeclineButton"]').click({force: true});
    })

    it('Reprove  a measurement request', () => {
        navigateToSection('Medição', 'aprovacao');
        if (cy.get('tr').contains('Yan')) {
            cy.get('tr').contains('Yan').click();
        }
        cy.get('[data-cy="tableAprovacaoContainer"]').should('be.visible');
        cy.get('[data-cy="tableAprovacaoContainer"]').click();
        cy.get('[data-cy="buttonReprovarMedicao"]').should('be.visible');
        cy.get('[data-cy="buttonReprovarMedicao"]').click({ force: true });
        cy.get('[data-cy="modalReproveInputTextarea"]').should('be.visible');
        cy.get('[data-cy="modalReproveInputTextarea"]').should('have.value', '');
        cy.get('[data-cy="modalReproveInputTextarea"]').type('Teste data-cy, pai é brabo!');
        cy.get('[data-cy="modalReproveAcceptButton"]').should('be.visible');
        cy.get('[data-cy="modalReproveAcceptButton"]').click();

        cy.get('[data-cy="modalReproveDeclineButton"]').should('be.visible');
        cy.get('[data-cy="modalReproveDeclineButton"]').click();
    })

    it ('Should showValueAprovacao a skeleton', () => {
        navigateToSection('Medição', 'aprovacao');
        cy.get('[data-cy="componentAprovacao"]').should('be.visible');
        cy.get('[data-cy="tableAprovacaoContainer"]').should("be.visible")
        cy.get('[data-cy="tableAprovacaoContainer"]').scrollTo("right")
        cy.get('[data-cy="skeletonAprovacao"]').should('be.visible');
        cy.get('[data-cy="buttonShowHideValueAprovacao"]').should('be.visible');
        cy.get('[data-cy="buttonShowHideValueAprovacao"]').click({force: true});
      })

      it('Export a measurement', () => {
            navigateToSection('Medição', 'aprovacao');
            if (cy.get('tr').contains('Yan')) {
                cy.get('tr').contains('Yan').click();
            }
            cy.get('[data-cy="tableAprovacaoContainer"]').should('be.visible');
            cy.get('[data-cy="tableAprovacaoContainer"]').click();
            cy.get('[data-cy="buttoExportMedicao"]').should('be.visible');
            cy.get('[data-cy="buttoExportMedicao"]').click();
        })

    it('Should clean inputs', () => {
        navigateToSection('Medição', 'aprovacao');
        navigateToSidebar('sidebarAprovacao');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputColaboradorAprovacao"]', 'Pedro Antonio');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputAprovadorPrimarioAprovacao"]', 'Gregory');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputAprovadorSecundarioAprovacao"]', 'João Vitor');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSecaoAprovacao"]', 'TI INFRA');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputValorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputValorAprovacao"]').should('have.value', '');
        cy.get('[data-cy="inputValorAprovacao"]').type('99,00');
        cy.get('[data-cy="inputStatusAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputStatusAprovacao"]').select(2);
        cy.get('[data-cy="sidebarContentCleanButtonAprovacao"]').should('be.visible');
        cy.get('[data-cy="sidebarContentCleanButtonAprovacao"]').click();
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('have.value', '');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('have.value', '');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('have.value', '');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('have.value', '');
        cy.get('[data-cy="inputValorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputValorAprovacao"]').should('have.value', '');
        cy.get('[data-cy="inputStatusAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputStatusAprovacao"]').should('have.value', '');
        cy.get('[data-cy="sidebarContentCleanButtonAprovacao"]').should('be.visible');
        cy.get('[data-cy="sidebarContentCleanButtonAprovacao"]').click();
        navigateToSidebar('sidebarAprovacao');

    })  


    it('Should search inputs', () => {
        navigateToSection('Medição', 'aprovacao');
        navigateToSidebar('sidebarAprovacao');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputColaboradorAprovacao"]', 'Gregory');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputAprovadorPrimarioAprovacao"]', 'Yan Roger');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputAprovadorSecundarioAprovacao"]', 'João Vitor');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('have.value', '');
        selectFromSearchModal('[data-cy="inputSecaoAprovacao"]', 'TI INFRA');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputValorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputValorAprovacao"]').should('have.value', '');
        cy.get('[data-cy="inputValorAprovacao"]').type('900,00');
        cy.get('[data-cy="inputStatusAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputStatusAprovacao"]').select(3);
        cy.get('[data-cy="sidebarContentFilterButtonAprovacao"]').should('be.visible');
        cy.get('[data-cy="sidebarContentFilterButtonAprovacao"]').click();
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputColaboradorAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorPrimarioAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputAprovadorSecundarioAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputSecaoAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputValorAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputValorAprovacao"]').should('not.have.value', '');
        cy.get('[data-cy="inputStatusAprovacao"]').should('be.visible');
        cy.get('[data-cy="inputStatusAprovacao"]').should('not.have.value', '');
        navigateToSidebar('sidebarAprovacao');

    })

})