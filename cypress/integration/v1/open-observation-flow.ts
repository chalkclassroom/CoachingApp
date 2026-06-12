describe('V1 Open Observation auth gate', () => {
  it('redirects anonymous users away from Open Observation', () => {
    cy.visit('/OpenObservation')
    cy.location('pathname').should('eq', '/')
  })
})

describe.skip('V1 Open Observation authenticated flow', () => {
  // Pending until the V1 Cypress harness can sign in with a seeded coach and teacher.
  // The previous version of this spec visited a protected route anonymously and
  // asserted on in-session controls before starting an observation, so it did not
  // prove the feature worked.
  beforeEach(() => {
    cy.visit('/OpenObservation')
  })

  it('persists free-form notes through refresh', () => {
    cy.get('[data-testid=open-observation-teacher]').click()
    cy.get('[role=option]').first().click()
    cy.get('[data-testid=open-observation-type]').click()
    cy.contains('Transition Time').click()
    cy.get('[data-testid=open-observation-start]').click()
    cy.get('[data-testid=open-observation-notes]').type('Free-form classroom note')
    cy.reload()
    cy.get('[data-testid=open-observation-notes]').should('contain.value', 'Free-form classroom note')
  })

  it('requires final Magic 9 alignment before saving', () => {
    cy.get('[data-testid=open-observation-teacher]').click()
    cy.get('[role=option]').first().click()
    cy.get('[data-testid=open-observation-type]').click()
    cy.contains('Transition Time').click()
    cy.get('[data-testid=open-observation-start]').click()
    cy.get('[data-testid=open-observation-end]').click()
    cy.contains('Choose final alignment')
    cy.get('[data-testid=open-observation-save]').should('be.disabled')
  })

  it('saves the final alignment type rather than the provisional start type', () => {
    cy.get('[data-testid=open-observation-teacher]').click()
    cy.get('[role=option]').first().click()
    cy.get('[data-testid=open-observation-type]').click()
    cy.contains('Transition Time').click()
    cy.get('[data-testid=open-observation-start]').click()
    cy.get('[data-testid=open-observation-notes]').type('Started as transition')
    cy.get('[data-testid=open-observation-end]').click()
    cy.get('[data-testid=open-observation-final-type]').click()
    cy.contains('Classroom Climate').click()
    cy.get('[data-testid=open-observation-save]').click()
    cy.window().its('openObservationLastSavedType').should('eq', 'climate')
  })
})
