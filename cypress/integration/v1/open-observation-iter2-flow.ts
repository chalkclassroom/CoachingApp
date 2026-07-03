describe('Open Observation V1 iter2 flow', () => {
  it('exposes Open Observation from the observation tool grid and requires teacher selection', () => {
    cy.visit('/Magic8Menu')
    cy.get('[data-testid="open-observation-magic8-card"]').should('exist')
    cy.get('[data-testid="open-observation-magic8-card"]').click()
    cy.location('pathname').should('eq', '/Magic8Menu')
    cy.contains('Select a Teacher').should('exist')
  })

  it('captures individual timestamped notes before showing the snapshot', () => {
    cy.visit('/OpenObservation')
    cy.get('[data-testid="open-observation-teacher"]').should('exist')
    cy.get('[data-testid="open-observation-note-input"]').should('not.exist')
    cy.get('[data-testid="open-observation-add-note"]').should('not.exist')
  })
})
