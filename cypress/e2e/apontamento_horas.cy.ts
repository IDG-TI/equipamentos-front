import { signIn } from '@util/cypress/signIn';
import { navigateToSection } from '@util/cypress/navigate_to_section';
import 'cypress-dotenv'
import "cypress-real-events";
import { selectFromSearchModal } from '@util/cypress/select_from_search_modal';
import { navigateToSidebar } from '@util/cypress/navigate_to_sidebar';


describe('Apontamento Horas test', () => {

  beforeEach(() => {
    signIn()
  })

  it('should navigate to section Cadastro / Apontamento de Horas ', () => {
    navigateToSection('Apontamento', 'apontamentoHoras');
    cy.get('[data-cy="componentApontamentoHoras"]').should('be.visible');
  })

  it('should submit Cadastro de Horas sucessfully', () => {
    navigateToSection('Apontamento', 'apontamentoHoras')
    cy.get('[data-cy="componentApontamentoHoras"]').should('be.visible');
    cy.getCookie('auth-token').then((cookie) => {
      apontamentoHoras(cookie?.value);
    })
  })

  it('should delete Aponta Horas sucessfully', () => {
    navigateToSection('Apontamento', 'apontamentoHoras')
    cy.get('[data-cy="componentApontamentoHoras"]').should('be.visible');
    cy.getCookie('auth-token').then((cookie) => {
      deleteApontamento();
    })
  })

  it('should change date sucessfully ', () => {
    navigateToSection('Apontamento', 'apontamentoHoras')
    cy.get('[data-cy="componentApontamentoHoras"]').should('be.visible');
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembo", "Outubro", "Novembro", "Dezembro"];

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();


    checkDate(true, day, month, year, monthNames)
    cy.get('[data-cy="carouselLeftButton"]').should('be.visible')
    cy.get('[data-cy="carouselLeftButton"]').wait(2000).click()
    cy.get('[data-cy="carouselMonth"]').should('be.visible')
    cy.get('[data-cy="carouselMonth"]').should('have.length', 2)
    cy.get('[data-cy="carouselMonth"]').should((element) => {
      const className = element[1].className
      expect(className).to.match(/carousel-month-new--right/)
    })
    cy.wait(2000)
    cy.get('[data-cy="carouselMonth"]').should('have.length', 1)
    cy.get('[data-cy="data"]').should('be.visible')
    cy.get('[data-cy="data"]').should('have.value', '')
    checkDate(false, day, month - 1, year, monthNames)
    cy.get('[data-cy="carouselLeftButton"]').should('be.visible')
    cy.get('[data-cy="carouselRightButton"]').should('be.visible')
    cy.get('[data-cy="carouselRightButton"]').wait(2000).click()
    cy.get('[data-cy="carouselMonth"]').should('be.visible')
    cy.get('[data-cy="carouselMonth"]').should((element) => {
      const className = element[1].className
      expect(className).to.match(/carousel-month-new--left/)
    })
    cy.wait(2000)
    cy.get('[data-cy="carouselMonth"]').should('have.length', 1)
    cy.get('[data-cy="data"]').should('be.visible')
    cy.get('[data-cy="data"]').should('have.value', '')
    checkDate(false, day, month, year, monthNames)

    cy.get('[data-cy="dayBox"]').should('be.visible')
    let randomDay = Math.floor(Math.random() * 27) + 1
    cy.get('[data-cy="dayBox"]').eq(randomDay - 1).click({ force: true })
    cy.get('[data-cy="data"]').should('have.value', `${year}-${String(month + 1).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`)

  })

  it('should certify sidebar', () => {
    navigateToSection('Apontamento', 'apontamentoHoras');
    cy.get('[data-cy="componentApontamentoHoras"]').should('be.visible');
    navigateToSidebar("sidebarContentApontamentoHoras");
  })
})

function apontamentoHoras(authToken: string | undefined) {

  cy.request({
    method: 'GET',
    headers: {
      "Authorization": authToken,
    },
    url: `${Cypress.env('API_URL')}/apontamento/ultimo`,
  }).then((response) => {

    expect(response.status).to.eq(200)

    if (Object.keys(response.body).length === 0) {
      cy.get('[data-cy="nomeColaborador"]').should('be.visible')
      cy.get('[data-cy="nomeColaborador"]').should('not.have.value', '')
      cy.get('[data-cy="projeto"]').should('be.visible')
      cy.get('[data-cy="projeto"]').should('have.value', '')
      selectFromSearchModal('[data-cy="projeto"]', '9000')
      cy.get('[data-cy="atividade"]').should('be.visible')
      cy.get('[data-cy="atividade"]').should('have.value', '')
      selectFromSearchModal('[data-cy="codigoSecao"]', 'a')
      cy.get('[data-cy="atividade"]').should('be.visible')
      cy.get('[data-cy="atividade"]').should('have.value', '')
      cy.get('[data-cy="atividade"]').select(1)
      cy.get('[data-cy="horas"]').should('be.visible')
      cy.get('[data-cy="horas"]').should('have.value', '00:00')
      cy.get('[data-cy="horas"]').type('01:00')
      cy.get('[data-cy="data"]').should('be.visible')
      cy.get('[data-cy="data"]').should('not.have.value', '')
      cy.get('[data-cy="observacoes"]').should('be.visible')
      cy.get('[data-cy="observacoes"]').should('have.value', '')
      cy.get('[data-cy="observacoes"]').type('Teste')
      cy.get('[data-cy="documento"]').should('be.visible')
      cy.get('[data-cy="documento"]').should('have.value', '')
      // selectFromSearchModal('[data-cy="documento"]', '')
      cy.get('[data-cy="ld"]').should('be.visible')
      cy.get('[data-cy="ld"]').should('not.be.checked')
      cy.get('[data-cy="ld"]').check()
      cy.get('[data-cy="ld"]').should('be.checked')
      cy.get('[data-cy="submitApontamento"]').click()
    }
    else {
      cy.get('[data-cy="nomeColaborador"]').should('be.visible')
      cy.get('[data-cy="nomeColaborador"]').should('not.have.value', '')
      cy.get('[data-cy="codigoSecao"]').should('be.visible')
      cy.get('[data-cy="codigoSecao"]').should('not.have.value', '')
      cy.get('[data-cy="projeto"]').should('be.visible')
      cy.get('[data-cy="projeto"]').should('not.have.value', '')
      cy.get('[data-cy="atividade"]').should('be.visible')
      cy.get('[data-cy="atividade"]').should('not.have.value', '')
      cy.get('[data-cy="data"]').should('be.visible')
      cy.get('[data-cy="data"]').should('not.have.value', '')
      cy.get('[data-cy="horas"]').should('be.visible')
      cy.get('[data-cy="horas"]').should('not.have.value', '')
      cy.get('[data-cy="observacoes"]').should('be.visible')
      cy.get('[data-cy="observacoes"]').should('not.have.value', '')
      cy.get('[data-cy="documento"]').should('be.visible')
      // cy.get('[data-cy="documento"]').should('not.have.value', '')
      cy.get('[data-cy="ld"]').should('be.visible')
      cy.get('[data-cy="ld"]').should('not.be.checked')
      cy.get('[data-cy="ld"]').check()
      cy.get('[data-cy="ld"]').should('be.checked')
      cy.get('[data-cy="submitApontamento"]').click()
    }
  });
}

function deleteApontamento() {
  cy.get('[data-cy="deleteApontamentoButton"]').should('be.visible')
  cy.get('[data-cy="deleteApontamentoButton"]').eq(0).click()
  cy.get('[data-cy="modalConfirmAcceptButton"]').should('be.visible')
  cy.get('[data-cy="modalConfirmAcceptButton"]').click()
}


function checkDate(hasDay: boolean = false, day: number, month: number, year: number, monthNames: string[]) {
  cy.get('[data-cy="dateCarouselHeader"]').should('be.visible')
  cy.get('[data-cy="dateCarouselHeader"]').should('have.text', `${hasDay ? day : "-"}/${monthNames[getMonth(month)].toUpperCase()}/${year}`)
}

function getMonth(month: number) {
  let actualMonth: number;
  if (month > 11) {
    actualMonth = 0
  }
  else if (month < 0) {
    actualMonth = 11
  }
  else {
    actualMonth = month
  }
  return actualMonth
}
