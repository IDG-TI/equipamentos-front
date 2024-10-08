import {signIn} from '@util/cypress/signIn';
import 'cypress-dotenv'

describe('Refresh token test', () => {

  beforeEach(() => {
    signIn()
  })

  it('should refresh token successfully', () => {
    signInRequestToSetCookie();
    cy.getCookie('auth-token').then((cookie) => refreshCookieRequestTest(cookie?.value))
  })
})

function signInRequestToSetCookie() {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/auth`,
    body: {
      user: Cypress.env('USER_ID'),
      password: Cypress.env('USER_PASSWORD')
    }
  }).then((response) => {
    cy.setCookie('auth-token', response.body.token)
  });
}

function refreshCookieRequestTest(authToken: string | undefined) {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('API_URL')}/refresh`,
    headers: {
      "Authorization": authToken,
    },
  })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.not.be.undefined
    })
}