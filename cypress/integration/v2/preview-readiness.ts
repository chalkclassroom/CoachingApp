describe('CHALK 2.0 preview readiness', () => {
  const routes = [
    '/v2/home',
    '/v2/teachers',
    '/v2/plans',
    '/v2/messages',
    '/v2/resources',
    '/v2/reports',
    '/v2/admin',
    '/v2/leader',
    '/v2/training',
    '/v2/account'
  ]
  const viewports: Array<[number, number]> = [
    [390, 844],
    [1440, 900]
  ]

  for (const [width, height] of viewports) {
    for (const route of routes) {
      it(`does not expose ${route} to anonymous visitors at ${width}x${height}`, () => {
        cy.viewport(width, height)
        cy.visit(route, { failOnStatusCode: false })
        cy.location('pathname', { timeout: 20000 }).should('eq', '/')
        cy.get('.v2-root').should('not.exist')
      })
    }
  }
})
