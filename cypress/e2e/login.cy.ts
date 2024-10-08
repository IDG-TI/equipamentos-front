import 'cypress-dotenv'

describe('Login test', () => {
  it('should login successfully', () => {
    cy.visit(Cypress.env('BASE_URL'))
    cy.get('[data-cy="userId"]').type(Cypress.env('USER_ID'))
    cy.get('[data-cy="userPassword"]').type(Cypress.env('USER_PASSWORD'))
    signInRequestTest()
    cy.get('[data-cy="submitLogin"]').click()
    cy.contains('Apontamento de Horas').should('be.visible')
  })
})

function signInRequestTest() {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/auth`,
    body: {
      user: Cypress.env('USER_ID'),
      password: Cypress.env('USER_PASSWORD')
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.token).to.not.be.undefined
    expect(response.body.roles).to.not.be.undefined
    expect(response.body.idRede).to.not.be.undefined
  })
}